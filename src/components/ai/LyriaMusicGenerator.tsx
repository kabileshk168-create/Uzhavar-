import React, { useState, useRef } from 'react';
import {
  Music,
  Play,
  Pause,
  Upload,
  Download,
  Loader2,
  Sparkles,
  AlertCircle,
  Volume2,
  Radio,
  Clock,
  RotateCcw
} from 'lucide-react';
import { Language } from '../../types';
import { callMusicGeneration } from '../../services/geminiClient';

interface LyriaMusicGeneratorProps {
  language: Language;
}

export const LyriaMusicGenerator: React.FC<LyriaMusicGeneratorProps> = ({ language }) => {
  const [prompt, setPrompt] = useState('');
  const [durationType, setDurationType] = useState<'clip' | 'full'>('clip');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');

  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setMimeType(file.type || 'image/jpeg');

    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setImagePreview(b64);
      setImageBase64(b64);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMsg(
        language === 'ta' ? 'இசைக்கான குறிப்பை உள்ளிடவும்.' : 'Please enter a music style or theme.'
      );
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setAudioUrl(null);
    setLyrics('');
    setIsPlaying(false);

    try {
      const res = await callMusicGeneration({
        prompt: prompt.trim(),
        durationType,
        imageBase64: imageBase64 || undefined,
        mimeType,
      });

      setLyrics(res.lyrics);

      if (res.audioBase64) {
        // Create audio data URL
        const audioSrc = `data:${res.mimeType || 'audio/mp3'};base64,${res.audioBase64}`;
        setAudioUrl(audioSrc);
      }
    } catch (err: any) {
      console.error('Lyria music error:', err);
      setErrorMsg(
        err?.message ||
          'Music generation failed. Lyria requires GEMINI_API_KEY with preview access in Settings > Secrets.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const sampleMusicStyles = language === 'ta'
    ? [
        'பாரம்பரிய தமிழ் கிராமிய ஏர்முனை உழவுப் பாடல் (நாடோடி தாளம் & புல்லாங்குழல்)',
        'வடகிழக்கு பருவமழை பெய்யும் வயல்வெளியின் அமைதியான தியான இசை',
        'பொங்கல் அறுவடை திருவிழா மேள தாள உத்வேக நாட்டுப்புற இசை'
      ]
    : [
        'Traditional South Indian rural farm folk song with acoustic flute and parai rhythms',
        'Peaceful monsoon rain acoustic meditation music with ambient nature sounds',
        'Energetic harvest festival celebration melody with nadaswaram and percussion'
      ];

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-stone-900">
              {language === 'ta' ? 'AI விவசாய இசை உருவாக்கம் (Lyria)' : 'Farm Music Generation'}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 flex items-center gap-1">
              <Music className="w-3.5 h-3.5 text-amber-700" />
              {durationType === 'clip' ? 'lyria-3-clip-preview' : 'lyria-3-pro-preview'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {language === 'ta'
              ? 'கூகுள் Lyria இசை மாதிரி மூலம் வயல்வெளி பாடல்கள், கிராமிய தாளங்கள் மற்றும் பருவமழை இசையை உருவாக்கலாம்.'
              : 'Generate custom agricultural melodies, rural folk beats, and rain ambient soundtracks with Google Lyria.'}
          </p>
        </div>

        {/* Clip vs Pro Switcher */}
        <div className="flex items-center gap-1.5 bg-stone-200/80 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setDurationType('clip')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              durationType === 'clip'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'ta' ? 'குறும் இசை (30 வினாடி)' : '30s Clip'}</span>
          </button>

          <button
            type="button"
            onClick={() => setDurationType('full')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              durationType === 'full'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'ta' ? 'முழு இசைப் பாடல்' : 'Full Track (Pro)'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {language === 'ta' ? 'இசை பாணி அல்லது பின்னணி விளக்கம்' : 'Music Theme & Instruments'}
            </label>

            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                language === 'ta'
                  ? 'எ.கா: பாரம்பரிய கிராமிய புல்லாங்குழல் மற்றும் தாளத்துடன் கூடிய நெல் அறுவடை பாட்டு...'
                  : 'E.g., Uplifting rural acoustic melody with bamboo flute, gentle rain drops, and joyful village rhythm...'
              }
              className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-stone-900 resize-none"
            />

            <div className="flex flex-wrap gap-1.5 pt-1">
              {sampleMusicStyles.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(s)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-900 transition-colors text-left truncate max-w-full"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Inspiration Photo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {language === 'ta' ? 'உத்வேக புகைப்படம் (விருப்பம்)' : 'Inspiration Photo (Optional)'}
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-2xl p-3 text-center cursor-pointer transition-all bg-stone-50 hover:bg-amber-50/20"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {imagePreview ? (
                <div className="flex items-center gap-3 justify-center">
                  <img
                    src={imagePreview}
                    alt="Inspiration"
                    className="w-14 h-14 rounded-lg object-cover shadow-2xs"
                  />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-amber-900">
                      {language === 'ta' ? 'படம் இணைக்கப்பட்டுள்ளது' : 'Photo Attached'}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {language === 'ta' ? 'மாற்ற கிளிக் செய்யவும்' : 'Click to replace'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-stone-500 text-xs">
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span>{language === 'ta' ? 'வயல்வெளியின் புகைப்படத்தை சேர்க்கலாம்' : 'Add farm photo as visual mood'}</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{language === 'ta' ? 'Lyria இசை உருவாக்குகிறது...' : 'Generating with Lyria AI...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{language === 'ta' ? 'இசையை உருவாக்கு' : 'Generate Music'}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output: Player & Lyrics */}
        <div className="flex flex-col justify-center items-center p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-stone-100 to-amber-500/5 border border-stone-200 min-h-[320px] relative overflow-hidden">
          {isGenerating && (
            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 animate-pulse">
                <Music className="w-7 h-7 animate-spin" />
              </div>
              <p className="text-sm font-bold text-stone-800">
                {language === 'ta' ? 'கிராமிய இசை உருவாக்கப்படுகிறது...' : 'Synthesizing musical arrangement...'}
              </p>
              <p className="text-xs text-stone-500 max-w-xs">
                {language === 'ta'
                  ? 'Lyria தாளங்கள், மெலடி மற்றும் இசைக்கருவிகளை ஒத்திசைக்கிறது.'
                  : 'Harmonizing acoustic instruments and vocal motifs.'}
              </p>
            </div>
          )}

          {!isGenerating && audioUrl && (
            <div className="w-full space-y-5 animate-in zoom-in-95">
              {/* Disc Graphic */}
              <div className="flex items-center justify-center">
                <div
                  className={`w-24 h-24 rounded-full bg-stone-900 border-4 border-amber-400/50 flex items-center justify-center shadow-xl ${
                    isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-stone-900">
                    <Music className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Audio Element */}
              <audio
                ref={audioRef}
                src={audioUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-10"
                controls
              />

              {lyrics && (
                <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 max-h-28 overflow-y-auto leading-relaxed shadow-2xs whitespace-pre-wrap">
                  <span className="font-bold text-amber-900 block mb-1">
                    {language === 'ta' ? 'இசைப் பாடல் வரிகள் / குறிப்புகள்:' : 'Composition Theme & Lyrics:'}
                  </span>
                  {lyrics}
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                <a
                  href={audioUrl}
                  download="uzhavar-lyria-music.mp3"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'ta' ? 'ஆடியோவை பதிவிறக்கு' : 'Download Audio'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setAudioUrl(null);
                    setPrompt('');
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'புதிய இசை' : 'New Music'}</span>
                </button>
              </div>
            </div>
          )}

          {!isGenerating && !audioUrl && (
            <div className="text-center space-y-2 text-stone-400 p-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-amber-600">
                <Music className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-600">
                {language === 'ta' ? 'இசை இன்னும் உருவாக்கப்படவில்லை' : 'No Music Generated Yet'}
              </p>
              <p className="text-xs text-stone-400 max-w-xs">
                {language === 'ta'
                  ? 'குறிப்பை உள்ளிட்டு "இசையை உருவாக்கு" பொத்தானை அழுத்தவும்.'
                  : 'Enter a music theme and click Generate to produce custom farming audio with Lyria.'}
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="absolute bottom-3 left-3 right-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
