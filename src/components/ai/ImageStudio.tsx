import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Upload,
  Download,
  Loader2,
  AlertCircle,
  Wand2,
  Ratio,
  Maximize2,
  RotateCcw,
  Check
} from 'lucide-react';
import { Language } from '../../types';
import { callImageCreateEdit } from '../../services/geminiClient';

interface ImageStudioProps {
  language: Language;
}

export const ImageStudio: React.FC<ImageStudioProps> = ({ language }) => {
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedMime, setUploadedMime] = useState<string>('image/jpeg');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setUploadedMime(file.type || 'image/jpeg');

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMsg(language === 'ta' ? 'விளக்க உரையை உள்ளிடவும்.' : 'Please enter an image prompt.');
      return;
    }

    if (mode === 'edit' && !uploadedImage) {
      setErrorMsg(
        language === 'ta'
          ? 'திருத்த வேண்டிய புகைப்படத்தை பதிவேற்றவும்.'
          : 'Please upload an image to edit.'
      );
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setGeneratedImage(null);
    setCaption('');

    try {
      const res = await callImageCreateEdit({
        prompt: prompt.trim(),
        imageBase64: mode === 'edit' ? uploadedImage || undefined : undefined,
        mimeType: uploadedMime,
        aspectRatio,
      });

      if (res.imageUrl) {
        setGeneratedImage(res.imageUrl);
        setCaption(res.caption || '');
      } else {
        throw new Error('Image model did not return image bytes. Please try refining your prompt.');
      }
    } catch (err: any) {
      console.error('Image generation/edit error:', err);
      setErrorMsg(err?.message || 'Failed to generate image. Check GEMINI_API_KEY in Secrets.');
    } finally {
      setIsGenerating(false);
    }
  };

  const createPresets = language === 'ta'
    ? [
        'சொட்டு நீர் பாசனத்துடன் செழிப்பாக வளர்ந்த தக்காளி பயிர் வயல்',
        'மழை பெய்யும் காவிரி டெல்டா நெல் வயலில் சூரிய அஸ்தமன காட்சி',
        'அதிக மகசூல் தரும் இயற்கை உரமிட்ட செம்மண் நிலத்தில் பலா மற்றும் தென்னை'
      ]
    : [
        'Micro drip irrigation system delivering nutrient water to thriving tomato plants in red soil',
        'Lush golden paddy fields in Cauvery delta during a scenic evening sunset',
        'High-density organic dragon fruit and moringa orchard with mulched soil'
      ];

  const editPresets = language === 'ta'
    ? [
        'இலையில் உள்ள பூச்சி பாதிப்பை தெளிவாக வட்டம் இட்டு காட்டி இயற்கை பூச்சி மருந்து தெளிப்பை விளக்கு',
        'இந்த பயிர் நிலத்தை பருவமழை பெய்து தண்ணீர் நிறைந்த செழிப்பான காட்சியாக மாற்று',
        'செடிகளின் வேர் பகுதியில் இயற்கை மண்புழு உரம் பரப்பப்பட்டதை சேர்'
      ]
    : [
        'Highlight the leaf blight fungus marks with high contrast and show bio-fungicide treatment',
        'Transform this farm background into a vibrant rainy monsoon season with fresh green hues',
        'Add organic vermicompost mulching layer around the base of the crop stalks'
      ];

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-4 sm:p-6 space-y-6">
      {/* Header with Model Badge & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-stone-900">
              {language === 'ta' ? 'AI விவசாய படக்கூடம் (Image Studio)' : 'Agricultural Image Studio'}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
              gemini-3.1-flash-image
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {language === 'ta'
              ? 'விளக்க உரை மூலம் புதிய படங்களை உருவாக்கலாம் அல்லது உங்கள் பயிர் புகைப்படத்தை எளிதாக திருத்தலாம்.'
              : 'Create realistic agricultural visuals from text prompts or edit existing farm photos using Gemini 3.1 Flash Image.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-stone-200/80 p-1 rounded-xl text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('create');
              setPrompt('');
              setGeneratedImage(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'create'
                ? 'bg-white text-pink-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>{language === 'ta' ? 'புதிய படம் உருவாக்கு' : 'Create Image'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('edit');
              setPrompt('');
              setGeneratedImage(null);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'edit'
                ? 'bg-white text-pink-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Wand2 className="w-4 h-4 text-pink-600" />
            <span>{language === 'ta' ? 'படத்தை திருத்து' : 'Edit Photo'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Form */}
        <div className="space-y-4">
          {mode === 'edit' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                {language === 'ta' ? 'திருத்த வேண்டிய புகைப்படத்தை பதிவேற்றவும்' : 'Upload Image to Edit'}
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-pink-500 rounded-2xl p-4 text-center cursor-pointer transition-all bg-stone-50 hover:bg-pink-50/20"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                {uploadedImage ? (
                  <div>
                    <img
                      src={uploadedImage}
                      alt="Uploaded for edit"
                      className="max-h-40 mx-auto rounded-xl object-cover shadow-2xs"
                    />
                    <p className="mt-2 text-xs font-semibold text-pink-700">
                      {language === 'ta' ? 'படத்தை மாற்ற கிளிக் செய்யவும்' : 'Click to replace photo'}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-stone-500">
                    <Upload className="w-6 h-6 text-pink-600" />
                    <p className="text-xs font-medium">
                      {language === 'ta' ? 'பயிரின் புகைப்படத்தை இங்கே தேர்வு செய்யவும்' : 'Select crop photo to edit'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Aspect ratio */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Ratio className="w-4 h-4 text-stone-500" />
              <span>{language === 'ta' ? 'பட விகிதம் (Aspect Ratio)' : 'Aspect Ratio'}</span>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {[
                { id: '1:1', label: '1:1 Square' },
                { id: '16:9', label: '16:9 Wide' },
                { id: '4:3', label: '4:3 Standard' },
                { id: '9:16', label: '9:16 Mobile' }
              ].map((ar) => (
                <button
                  key={ar.id}
                  type="button"
                  onClick={() => setAspectRatio(ar.id)}
                  className={`py-2 px-1.5 text-xs rounded-xl border text-center font-medium transition-all ${
                    aspectRatio === ar.id
                      ? 'border-pink-600 bg-pink-50 text-pink-900 font-bold shadow-2xs'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {mode === 'create'
                ? language === 'ta'
                  ? 'படத்துக்கான விளக்க உரை (Prompt)'
                  : 'Image Prompt Description'
                : language === 'ta'
                ? 'என்ன திருத்தம் செய்ய வேண்டும்?'
                : 'Editing Instructions'}
            </label>

            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'create'
                  ? language === 'ta'
                    ? 'எ.கா: சொட்டுநீர் பாசனத்துடன் செழிப்பான தக்காளி செடிகள்...'
                    : 'E.g., High-yield drip irrigated tomato farm in fertile soil during golden hour...'
                  : language === 'ta'
                  ? 'எ.கா: இலையில் உள்ள பூச்சி பாதிப்பை வட்டமிட்டு காட்டி இயற்கை பூச்சி மருந்தை பரிந்துரை...'
                  : 'E.g., Highlight pest spots on the leaf and add natural neem spray droplet effects...'
              }
              className="w-full p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-stone-900 resize-none"
            />

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(mode === 'create' ? createPresets : editPresets).map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-pink-100 text-stone-600 hover:text-pink-900 transition-colors text-left truncate max-w-full"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim() || (mode === 'edit' && !uploadedImage)}
            className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{language === 'ta' ? 'படம் தயாராகிறது...' : 'Generating Image with Gemini...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {mode === 'create'
                    ? language === 'ta'
                      ? 'புதிய படத்தை உருவாக்கு'
                      : 'Generate Image'
                    : language === 'ta'
                    ? 'படத்தை திருத்து'
                    : 'Apply Image Edits'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Right Output View */}
        <div className="flex flex-col justify-center items-center p-4 rounded-2xl bg-stone-100 border border-stone-200 min-h-[320px] relative overflow-hidden">
          {isGenerating && (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <p className="text-sm font-bold text-stone-800">
                {language === 'ta' ? 'படம் வரையப்படுகிறது...' : 'Gemini is generating your image...'}
              </p>
              <p className="text-xs text-stone-500">
                {language === 'ta' ? '1K உயர்தர ரெசல்யூஷனில் ரெண்டர் செய்யப்படுகிறது.' : 'Rendering in 1K high resolution.'}
              </p>
            </div>
          )}

          {!isGenerating && generatedImage && (
            <div className="w-full flex flex-col items-center space-y-3 animate-in zoom-in-95">
              <img
                src={generatedImage}
                alt="Generated result"
                className="max-h-[360px] w-auto rounded-xl object-contain shadow-md"
              />

              {caption && (
                <p className="text-xs text-stone-600 text-center italic max-w-sm px-2">
                  {caption}
                </p>
              )}

              <div className="flex items-center gap-2">
                <a
                  href={generatedImage}
                  download="uzhavar-gemini-image.png"
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'ta' ? 'படத்தை பதிவிறக்கு' : 'Download Image'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setGeneratedImage(null);
                    setPrompt('');
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'புதியது' : 'New'}</span>
                </button>
              </div>
            </div>
          )}

          {!isGenerating && !generatedImage && (
            <div className="text-center space-y-2 text-stone-400 p-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-stone-400">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-600">
                {language === 'ta' ? 'படம் இன்னும் உருவாக்கப்படவில்லை' : 'No Image Generated Yet'}
              </p>
              <p className="text-xs text-stone-400 max-w-xs">
                {language === 'ta'
                  ? 'விளக்கத்தை உள்ளிட்டு உருவாக்கு பட்டனை அழுத்தவும்.'
                  : 'Enter a prompt or upload an image and click Generate to see the result.'}
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="absolute bottom-3 left-3 right-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
