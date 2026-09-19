import React from 'react';
import {
  Menu,
  Bell,
  ChevronDown,
  TrendingUp,
  Leaf,
  CloudSun,
  Store,
  Sparkles,
  Sprout,
  ArrowUpRight
} from 'lucide-react';
import { Language } from '../../types';

interface HomeScreenAgriProps {
  language: Language;
  onNavigateScreen: (screenId: string) => void;
  onOpenLocationSelect?: () => void;
  unreadCount?: number;
}

export const HomeScreenAgri: React.FC<HomeScreenAgriProps> = ({
  language,
  onNavigateScreen,
  onOpenLocationSelect,
  unreadCount = 2,
}) => {
  return (
    <div className="w-full h-full min-h-[580px] flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-b from-[#edf7ed] via-[#f4fbf5] to-[#ebf6ee] text-[#1b4332] select-none">
      <div className="space-y-4">
        {/* Top Header Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateScreen('profile')}
              className="w-10 h-10 rounded-full bg-white/90 border border-emerald-100 flex items-center justify-center text-[#14532d] shadow-xs hover:bg-emerald-50 transition-colors cursor-pointer"
              title="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-bold text-[#14532d] tracking-tight">
                  {language === 'ta' ? 'வணக்கம், ரமேஷ் 👋' : 'Hello, Ramesh 👋'}
                </h2>
              </div>
              <p className="text-xs text-[#52796f] font-medium">
                {language === 'ta' ? 'இணைந்து முன்னேறுவோம்' : "Let's grow together"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateScreen('price_alert')}
            className="relative w-10 h-10 rounded-full bg-white/90 border border-emerald-100 flex items-center justify-center text-[#14532d] shadow-xs hover:bg-emerald-50 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
            )}
          </button>
        </div>

        {/* Location Selector Card */}
        <div
          onClick={onOpenLocationSelect}
          className="bg-white/95 rounded-2xl p-3 sm:p-3.5 border border-emerald-100/90 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100/80 flex items-center justify-center text-[#14532d]">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#52796f] block uppercase tracking-wider">
                {language === 'ta' ? 'உங்கள் இருப்பிடம்' : 'Your Location'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#14532d] flex items-center gap-1">
                {language === 'ta' ? 'திருவள்ளூர், தமிழ்நாடு' : 'Thiruvallur, Tamil Nadu'}
                <ChevronDown className="w-3.5 h-3.5 text-[#52796f]" />
              </span>
            </div>
          </div>
        </div>

        {/* Today's Predicted Price Hero Card */}
        <div
          onClick={() => onNavigateScreen('price_prediction')}
          className="relative bg-white/95 rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-md shadow-emerald-950/5 overflow-hidden cursor-pointer hover:border-emerald-300 transition-all group"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1.5 max-w-[62%]">
              <span className="text-xs font-semibold text-[#52796f] block">
                {language === 'ta' ? 'இன்றைய கணிக்கப்பட்ட விலை' : "Today's Predicted Price"}
              </span>

              <h3 className="text-base sm:text-lg font-bold text-[#14532d]">
                {language === 'ta' ? 'தக்காளி' : 'Tomato'}
              </h3>

              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#14532d] tracking-tight">
                  ₹ 28
                </span>
                <span className="text-xs text-[#52796f] font-medium">/kg</span>

                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  ↑ 12%
                </span>
              </div>

              <span className="text-[11px] text-[#52796f] font-medium block pt-0.5">
                {language === 'ta' ? '(கடந்த வாரத்தை விட)' : '(vs. last week)'}
              </span>
            </div>

            {/* Fresh Tomato Image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center bg-emerald-50/50 shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80"
                alt="Fresh Tomatoes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Quick Action Cards (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          {/* 1. Price Prediction */}
          <button
            type="button"
            onClick={() => onNavigateScreen('price_prediction')}
            className="bg-white/95 rounded-2xl p-4 border border-emerald-100/90 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-[#14532d] group-hover:bg-[#14532d] group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#14532d]">
              {language === 'ta' ? 'விலை கணிப்பு' : 'Price Prediction'}
            </span>
          </button>

          {/* 2. Crop Advisory */}
          <button
            type="button"
            onClick={() => onNavigateScreen('crop_advisory')}
            className="bg-white/95 rounded-2xl p-4 border border-emerald-100/90 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-[#14532d] group-hover:bg-[#14532d] group-hover:text-white transition-colors">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#14532d]">
              {language === 'ta' ? 'பயிர் ஆலோசனை' : 'Crop Advisory'}
            </span>
          </button>

          {/* 3. Weather */}
          <button
            type="button"
            onClick={() => onNavigateScreen('weather_view')}
            className="bg-white/95 rounded-2xl p-4 border border-emerald-100/90 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-[#14532d] group-hover:bg-[#14532d] group-hover:text-white transition-colors">
              <CloudSun className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#14532d]">
              {language === 'ta' ? 'வானிலை' : 'Weather'}
            </span>
          </button>

          {/* 4. Market Trends */}
          <button
            type="button"
            onClick={() => onNavigateScreen('market_trends')}
            className="bg-white/95 rounded-2xl p-4 border border-emerald-100/90 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-[#14532d] group-hover:bg-[#14532d] group-hover:text-white transition-colors">
              <Store className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#14532d]">
              {language === 'ta' ? 'சந்தை நிலவரம்' : 'Market Trends'}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle Gemini AI Bar */}
      <div className="mt-4 pt-2">
        <button
          type="button"
          onClick={() => onNavigateScreen('future_ai')}
          className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-900 to-[#14532d] text-white flex items-center justify-between text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
            <span>
              {language === 'ta' ? 'Gemini AI குரல் & மல்டிமாடல் மையம்' : 'Gemini AI Multimodal & Live Voice'}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
