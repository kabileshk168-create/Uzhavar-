import React from 'react';
import { ArrowRight, Sprout, Sparkles } from 'lucide-react';
import { Language } from '../../types';

interface WelcomeScreenProps {
  language: Language;
  onGetStarted: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onGetStarted,
  onLogin,
}) => {
  return (
    <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-[#ebf7ee] via-[#e2f4e7] to-[#d6efdc] overflow-hidden select-none">
      {/* Soft Ambient Foliage Background Accents */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-emerald-300/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-12 w-56 h-56 rounded-full bg-green-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/4 w-60 h-60 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

      {/* Top Branding Section */}
      <div className="relative z-10 flex flex-col items-center text-center mt-6">
        {/* Emblem Logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 shadow-lg shadow-emerald-900/10 border-2 border-emerald-100 flex items-center justify-center p-3 mb-4 backdrop-blur-sm group hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-[#14532d] flex items-center justify-center text-white shadow-inner">
            <Sprout className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14532d] tracking-tight">
          AgriNext
        </h1>

        {/* Tagline */}
        <p className="mt-2 text-base sm:text-lg font-semibold text-[#1f4a33]">
          {language === 'ta' ? 'சிறந்த விலை. பிரகாசமான எதிர்காலம்.' : 'Better Prices. Brighter Future.'}
        </p>

        {/* Subtext */}
        <p className="mt-3 text-xs sm:text-sm text-[#406a4f] max-w-xs leading-relaxed font-normal">
          {language === 'ta'
            ? 'நிகழ்நேர சந்தை நுண்ணறிவு, ஸ்மார்ட் விலை கணிப்பு மற்றும் அனைத்து விவசாயிகளுக்குமான முழு ஆதரவு.'
            : 'Real-time market insights, smart price prediction and support for every farmer.'}
        </p>
      </div>

      {/* Center Plant Art Illustration */}
      <div className="relative z-10 my-auto flex justify-center items-center py-4">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-xl shadow-emerald-950/5 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&auto=format&fit=crop&q=80"
            alt="Young green sprout growing in rich soil"
            className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-90 hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Bottom Call to Action Section */}
      <div className="relative z-10 space-y-3 pb-2">
        <button
          type="button"
          onClick={onGetStarted}
          className="w-full bg-[#14532d] hover:bg-[#166534] active:bg-[#0f3d21] text-white py-3.5 sm:py-4 px-6 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer transition-all hover:gap-3 active:scale-[0.98]"
        >
          <span>{language === 'ta' ? 'தொடங்குங்கள்' : 'Get Started'}</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <p className="text-center text-xs text-[#406a4f]">
          {language === 'ta' ? 'ஏற்கனவே கணக்கு உள்ளதா?' : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={onLogin}
            className="font-bold text-[#14532d] hover:underline cursor-pointer ml-1"
          >
            {language === 'ta' ? 'உள்நுழைக' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};
