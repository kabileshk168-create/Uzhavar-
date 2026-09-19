import React, { useState, useRef } from 'react';
import {
  Video,
  Upload,
  Sparkles,
  Loader2,
  Play,
  Download,
  CheckCircle2,
  AlertCircle,
  Film,
  RotateCcw,
  Smartphone,
  Tv
} from 'lucide-react';
import { Language } from '../../types';
import { startVeoVideo, pollVeoVideoStatus, downloadVeoVideoBlob } from '../../services/geminiClient';

interface VeoVideoGeneratorProps {
  language: Language;
}

export const VeoVideoGenerator: React.FC<VeoVideoGeneratorProps> = ({ language }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');

  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setMimeType(file.type || 'image/jpeg');

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !imageBase64) {
      setErrorMsg(language === 'ta' ? 'விளக்க உரை அல்லது புகைப்படத்தை உள்ளிடவும்.' : 'Please provide a prompt or upload an image.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setVideoUrl(null);
    setProgressPercent(10);
    setStatusMessage(
      language === 'ta'
        ? 'Veo வீடியோ அனிமேஷன் துவக்கப்படுகிறது...'
        : 'Initiating Veo video generation pipeline...'
    );

    try {
      const { operationName } = await startVeoVideo({
        prompt: prompt.trim() || 'Animate this farm scene vividly with natural motion, swaying leaves, and ambient light',
        imageBase64: imageBase64 || undefined,
        mimeType,
        aspectRatio,
      });

      setStatusMessage(
        language === 'ta'
          ? 'வீடியோ பிரேம்கள் உருவாக்கப்படுகின்றன (720p HD)...'
          : 'Synthesizing scene dynamics and rendering 720p HD frames...'
      );
      setProgressPercent(30);

      // Polling loop
      let attempts = 0;
      const maxAttempts = 60; // 3-4 minutes max
      let isDone = false;

      while (!isDone && attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, 6000));
        attempts++;
        const pollProgress = Math.min(30 + attempts * 2, 90);
        setProgressPercent(pollProgress);

        if (attempts > 3 && attempts < 8) {
          setStatusMessage(
            language === 'ta'
              ? 'ஒளி அமைப்பு மற்றும் பயிர் அசைவுகள் சரிசெய்யப்படுகின்றன...'
              : 'Simulating lighting dynamics and crop plant motion physics...'
          );
        } else if (attempts >= 8) {
          setStatusMessage(
            language === 'ta'
              ? 'இறுதி வீடியோ தொகுப்பு மற்றும் என்கோடிங் நடைபெறுகிறது...'
              : 'Finalizing temporal consistency and encoding video stream...'
          );
        }

        const statusRes = await pollVeoVideoStatus(operationName);
        if (statusRes.error) {
          throw new Error(statusRes.error);
        }
        if (statusRes.done) {
          isDone = true;
          break;
        }
      }

      if (!isDone) {
        throw new Error('Video generation is taking longer than expected. Please retry shortly.');
      }

      setStatusMessage(language === 'ta' ? 'வீடியோ பதிவிறக்கப்படுகிறது...' : 'Downloading completed video...');
      setProgressPercent(95);

      const blob = await downloadVeoVideoBlob(operationName);
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setProgressPercent(100);
      setStatusMessage(language === 'ta' ? 'வீடியோ தயார்!' : 'Video successfully generated!');
    } catch (err: any) {
      console.error('Veo video generation error:', err);
      setErrorMsg(err?.message || 'Failed to generate video with Veo. Check GEMINI_API_KEY in Secrets.');
    } finally {
      setIsGenerating(false);
    }
  };

  const samplePrompts = language === 'ta'
    ? [
        'காலை பனித்துளியுடன் சூரிய ஒளியில் மெதுவாக அசையும் தக்காளி செடிகள்',
        'மழை பெய்யும் போது பசுமையான நெல் வயலில் வீசும் தென்றல் காற்று',
        'பருத்தி வயலில் பூக்கள் பூத்து மலரும் வேக அனிமேஷன் (Time-lapse)'
      ]
    : [
        'Sunlight filtering through morning dew drops on lush tomato plant leaves with a gentle breeze',
        'Wind rustling through golden paddy field under dramatic monsoon clouds',
        'Macro time-lapse of cotton flower blooming in fertile red soil'
      ];

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-stone-900">
              {language === 'ta' ? 'புகைப்படத்தை வீடியோவாக மாற்றுதல் (Veo)' : 'Animate Images into Video'}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
              veo-3.1-fast-generate-preview
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {language === 'ta'
              ? 'பண்ணை அல்லது பயிர் புகைப்படங்களை பதிவேற்றி கூகுள் Veo AI மூலம் உயிருள்ள வீடியோ காட்சிகளாக உருவாக்கலாம்.'
              : 'Upload farm or crop photos and generate cinematic animated videos using Google Veo AI video models.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Inputs */}
        <div className="space-y-4">
          {/* Photo Upload Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {language === 'ta' ? '1. புகைப்படத்தை பதிவேற்று (விருப்பம்)' : '1. Upload Starting Photo (Optional)'}
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-purple-500 rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all bg-stone-50/60 hover:bg-purple-50/20 group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative group/img">
                  <img
                    src={imagePreview}
                    alt="Uploaded starting frame"
                    className="max-h-48 mx-auto rounded-xl object-cover shadow-xs"
                  />
                  <div className="mt-2 text-xs font-semibold text-purple-700">
                    {language === 'ta' ? 'படத்தை மாற்ற கிளிக் செய்யவும்' : 'Click to change photo'}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-stone-500 group-hover:text-purple-700">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-stone-200 flex items-center justify-center text-purple-600">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium">
                    {language === 'ta' ? 'பயிரின் புகைப்படத்தை இங்கே பதிவேற்றவும்' : 'Click or drop crop photo here'}
                  </p>
                  <p className="text-[11px] text-stone-400">JPG, PNG, WebP</p>
                </div>
              )}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {language === 'ta' ? '2. வீடியோ பரிமாணம் (Aspect Ratio)' : '2. Select Aspect Ratio'}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  aspectRatio === '16:9'
                    ? 'border-purple-600 bg-purple-50/70 text-purple-900 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Tv className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-xs font-bold">16:9 Landscape</div>
                  <div className="text-[11px] text-stone-500">YouTube, TV, Display</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  aspectRatio === '9:16'
                    ? 'border-purple-600 bg-purple-50/70 text-purple-900 font-bold shadow-xs'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Smartphone className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-xs font-bold">9:16 Portrait</div>
                  <div className="text-[11px] text-stone-500">Shorts, Reels, Status</div>
                </div>
              </button>
            </div>
          </div>

          {/* Prompt input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {language === 'ta' ? '3. அனிமேஷன் வழிகாட்டல் (Animation Prompt)' : '3. Motion & Dynamics Prompt'}
            </label>

            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                language === 'ta'
                  ? 'எ.கா: பனித்துளிகள் விழும் போது தென்றல் காற்றில் மெதுவாக அசையும் நெற்பயிர்...'
                  : 'E.g., Gentle breeze waving through golden paddy crops with realistic ambient light and morning mist...'
              }
              className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-stone-900 resize-none"
            />

            <div className="flex flex-wrap gap-1.5 pt-1">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-purple-100 text-stone-600 hover:text-purple-800 transition-colors text-left truncate max-w-full"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || (!prompt.trim() && !imageBase64)}
            className="w-full py-3.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{language === 'ta' ? 'வீடியோ உருவாக்கப்படுகிறது...' : 'Generating Veo Video...'}</span>
              </>
            ) : (
              <>
                <Film className="w-4 h-4" />
                <span>{language === 'ta' ? 'Veo வீடியோ உருவாக்கு' : 'Generate Veo Video'}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Video Output & Live Preview */}
        <div className="flex flex-col justify-center items-center p-6 rounded-2xl bg-stone-900 text-white min-h-[320px] relative overflow-hidden">
          {isGenerating && (
            <div className="text-center space-y-4 max-w-xs z-10 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-purple-300 animate-pulse">
                <Film className="w-8 h-8 animate-spin" />
              </div>

              <div>
                <p className="font-bold text-sm text-purple-200">{statusMessage}</p>
                <p className="text-xs text-stone-400 mt-1">
                  {language === 'ta'
                    ? 'வீடியோ தயாரிப்பு 1-2 நிமிடங்கள் ஆகலாம். தயவுசெய்து காத்திருக்கவும்.'
                    : 'High-quality generation typically takes 1-2 minutes.'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden border border-stone-700">
                <div
                  className="bg-purple-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {!isGenerating && videoUrl && (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 animate-in zoom-in-95">
              <video
                src={videoUrl}
                controls
                autoPlay
                loop
                className={`rounded-xl shadow-2xl max-h-[360px] w-auto ${
                  aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'
                }`}
              />

              <div className="flex items-center gap-3">
                <a
                  href={videoUrl}
                  download="uzhavar-veo-animated-video.mp4"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'ta' ? 'MP4 வீடியோவை பதிவிறக்கு' : 'Download MP4 Video'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setVideoUrl(null);
                    setImagePreview(null);
                    setImageBase64(null);
                    setPrompt('');
                  }}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'புதிய வீடியோ' : 'New Video'}</span>
                </button>
              </div>
            </div>
          )}

          {!isGenerating && !videoUrl && (
            <div className="text-center space-y-3 text-stone-400 p-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-stone-800 flex items-center justify-center text-stone-500">
                <Video className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold text-stone-300">
                {language === 'ta' ? 'வீடியோ காட்சி தயாராக இல்லை' : 'Ready for Video Animation'}
              </p>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                {language === 'ta'
                  ? 'புகைப்படத்தை பதிவேற்றி அல்லது விளக்க உரையை எழுதி "Veo வீடியோ உருவாக்கு" என்பதை கிளிக் செய்யவும்.'
                  : 'Upload an image or enter a prompt to create animated farming and crop videos in 720p HD.'}
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="absolute bottom-3 left-3 right-3 p-3 bg-amber-950/90 border border-amber-600/50 rounded-xl text-xs text-amber-200 flex items-center gap-2 z-20">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
