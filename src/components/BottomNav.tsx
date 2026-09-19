import React from 'react';
import { Home, TrendingUp, Store, Users, Mic, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenVoice: () => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  onOpenVoice,
  language
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200 px-3 py-2">
      <div className="flex items-center justify-around relative max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'home' ? 'text-emerald-700' : 'text-stone-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{language === 'ta' ? 'முகப்பு' : 'Home'}</span>
        </button>

        {/* Market */}
        <button
          onClick={() => onNavigate('market')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'market' ? 'text-emerald-700' : 'text-stone-500'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>{language === 'ta' ? 'சந்தை' : 'Market'}</span>
        </button>

        {/* Center Floating Mic Button */}
        <div className="relative -top-5">
          <button
            onClick={onOpenVoice}
            id="mobile-floating-mic-btn"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 active:scale-90 transition-transform cursor-pointer border-4 border-white"
            title="Speak / பேசுங்கள்"
          >
            <Mic className="w-6 h-6 animate-pulse" />
          </button>
        </div>

        {/* Sell / Marketplace */}
        <button
          onClick={() => onNavigate('marketplace')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'marketplace' ? 'text-emerald-700' : 'text-stone-500'
          }`}
        >
          <Store className="w-5 h-5" />
          <span>{language === 'ta' ? 'விற்பனை' : 'Sell'}</span>
        </button>

        {/* Community or AI */}
        <button
          onClick={() => onNavigate('community')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
            activeTab === 'community' ? 'text-emerald-700' : 'text-stone-500'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>{language === 'ta' ? 'சமூகம்' : 'Community'}</span>
        </button>
      </div>
    </div>
  );
};
