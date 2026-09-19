import React, { useState } from 'react';
import { Globe, Check, Volume2, Sparkles, Mic, Sprout } from 'lucide-react';
import { Language } from '../types';
import { VoiceAssistantManager } from '../services/voiceService';

interface LanguageModalProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  currentLanguage,
  onSelectLanguage,
  onClose
}) => {
  const [selected, setSelected] = useState<Language>(currentLanguage);

  const handlePreviewAudio = (lang: Language) => {
    if (lang === 'ta') {
      VoiceAssistantManager.speak('வணக்கம்! உழவர் பிளஸ் செயலிக்கு தங்களை வரவேற்கிறோம். பேசுங்கள், கற்போம், விளைவிப்போம், விற்போம்.', 'ta');
    } else {
      VoiceAssistantManager.speak('Welcome to Uzhavar Plus. Speak, Learn, Grow, and Sell.', 'en');
    }
  };

  const handleConfirm = () => {
    onSelectLanguage(selected);
    handlePreviewAudio(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-center relative overflow-hidden">
        {/* Top Decorative Graphic */}
        <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4 shadow-inner">
          <Sprout className="w-9 h-9" />
        </div>

        <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
          வணக்கம்! Welcome to Uzhavar+
        </h2>
        <p className="text-sm font-medium text-emerald-700 mt-1">
          Speak. Learn. Grow. Sell.
        </p>
        <p className="text-xs text-stone-500 mt-2">
          விவசாயிகளுக்கான நவீன குரல் வழி செயலி • Smart AI agricultural companion
        </p>

        {/* Question */}
        <div className="mt-6 mb-4">
          <label className="text-sm font-bold text-stone-800 flex items-center justify-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Choose your language / உங்கள் மொழியை தேர்வு செய்க</span>
          </label>
        </div>

        {/* Language Selection Buttons */}
        <div className="grid grid-cols-2 gap-3.5 my-4">
          <button
            type="button"
            onClick={() => {
              setSelected('ta');
              handlePreviewAudio('ta');
            }}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 cursor-pointer ${
              selected === 'ta'
                ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 shadow-md ring-2 ring-emerald-600/20'
                : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/50'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-emerald-700 border border-emerald-200">
                முதன்மை
              </span>
              {selected === 'ta' && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <span className="text-2xl font-extrabold font-serif">தமிழ்</span>
            <span className="text-xs text-stone-500 font-medium">Tamil</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelected('en');
              handlePreviewAudio('en');
            }}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 cursor-pointer ${
              selected === 'en'
                ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 shadow-md ring-2 ring-emerald-600/20'
                : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/50'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-stone-600 border border-stone-200">
                English
              </span>
              {selected === 'en' && <Check className="w-4 h-4 text-emerald-600" />}
            </div>
            <span className="text-2xl font-extrabold">English</span>
            <span className="text-xs text-stone-500 font-medium">ஆங்கிலம்</span>
          </button>
        </div>

        {/* Voice Feature Callout */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/70 text-left flex items-center gap-3 my-4">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div className="text-xs text-amber-900">
            <p className="font-bold">
              {selected === 'ta' ? '🎙️ முழுமையான குரல் வழி உதவி' : '🎙️ Complete Voice Support'}
            </p>
            <p className="text-[11px] text-amber-800">
              {selected === 'ta'
                ? 'எழுத்தறிவு தேவையில்லை, நேரடியாக பேசி தகவல்களை பெறலாம்.'
                : 'Speak naturally in Tamil or English without typing.'}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleConfirm}
          id="confirm-language-btn"
          className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-emerald-700/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>
            {selected === 'ta' ? 'தொடங்குக (Continue)' : 'Get Started'}
          </span>
          <Sparkles className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-stone-400 mt-4">
          {selected === 'ta' 
            ? 'அமைப்புகளில் எப்போது வேண்டுமானாலும் மொழியை மாற்றிக்கொள்ளலாம்'
            : 'You can change language anytime from Settings'}
        </p>
      </div>
    </div>
  );
};
