import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CloudRain,
  Droplets,
  Wind,
  Sun,
  CloudSun
} from 'lucide-react';
import { Language } from '../../types';

interface WeatherScreenProps {
  language: Language;
  onBack: () => void;
}

export const WeatherScreen: React.FC<WeatherScreenProps> = ({
  language,
  onBack,
}) => {
  return (
    <div className="w-full h-full min-h-[580px] flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-b from-[#edf7ed] via-[#f4fbf5] to-[#ebf6ee] text-[#1b4332] select-none">
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/90 border border-emerald-100 flex items-center justify-center text-[#14532d] shadow-xs hover:bg-emerald-50 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-[#14532d] tracking-tight">
            {language === 'ta' ? 'வானிலை தகவல்' : 'Weather'}
          </h2>
        </div>

        {/* Location & Date Subheader */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#14532d]">
            <MapPin className="w-4 h-4 text-[#2d6a4f]" />
            <span>{language === 'ta' ? 'திருவள்ளூர், TN' : 'Thiruvallur, TN'}</span>
          </div>
          <div className="text-xs font-semibold text-[#52796f]">
            {language === 'ta' ? 'இன்று, 12 செப்' : 'Today, 12 Sep'}
          </div>
        </div>

        {/* Hero Weather Display Card */}
        <div className="bg-white/95 rounded-3xl p-6 border border-emerald-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Weather Icon Graphic */}
          <div className="relative w-28 h-28 flex items-center justify-center my-1">
            <div className="absolute w-20 h-20 rounded-full bg-amber-200/50 blur-xl animate-pulse" />
            <div className="relative flex items-center justify-center">
              {/* Stylized Sun */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                <Sun className="w-10 h-10 text-white animate-spin duration-10000" />
              </div>
              {/* Cloud overlapping Sun */}
              <div className="absolute -bottom-2 -right-3 w-18 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-sky-100">
                <CloudSun className="w-8 h-8 text-sky-500" />
              </div>
            </div>
          </div>

          {/* Temperature & Condition */}
          <div className="space-y-1 mt-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#14532d] tracking-tight">
              28°C
            </h1>
            <p className="text-sm sm:text-base font-bold text-[#52796f]">
              {language === 'ta' ? 'பகுதி மேகமூட்டம்' : 'Partly Cloudy'}
            </p>
          </div>
        </div>

        {/* 3 Weather Parameters Bar */}
        <div className="bg-white/95 rounded-2xl p-4 border border-emerald-100 shadow-sm grid grid-cols-3 divide-x divide-emerald-100 text-center">
          {/* Rainfall */}
          <div className="flex flex-col items-center gap-1.5 px-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-[#52796f]">
              <CloudRain className="w-3.5 h-3.5 text-sky-600" />
              <span>{language === 'ta' ? 'மழை' : 'Rainfall'}</span>
            </div>
            <span className="text-sm font-extrabold text-[#14532d]">2 mm</span>
          </div>

          {/* Humidity */}
          <div className="flex flex-col items-center gap-1.5 px-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-[#52796f]">
              <Droplets className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'ta' ? 'ஈரப்பதம்' : 'Humidity'}</span>
            </div>
            <span className="text-sm font-extrabold text-[#14532d]">78%</span>
          </div>

          {/* Wind */}
          <div className="flex flex-col items-center gap-1.5 px-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-[#52796f]">
              <Wind className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'ta' ? 'காற்று' : 'Wind'}</span>
            </div>
            <span className="text-sm font-extrabold text-[#14532d]">12 km/h</span>
          </div>
        </div>

        {/* 3-Day Forecast Cards */}
        <div>
          <h4 className="text-xs font-bold text-[#52796f] uppercase tracking-wider mb-2.5 px-1">
            {language === 'ta' ? '3 நாள் முன்னறிவிப்பு' : '3-Day Forecast'}
          </h4>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Today */}
            <div className="bg-white/95 rounded-2xl p-3 border border-emerald-100 shadow-sm flex flex-col items-center text-center gap-2 hover:border-emerald-300 transition-colors">
              <span className="text-xs font-semibold text-[#52796f]">
                {language === 'ta' ? 'இன்று' : 'Today'}
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <CloudSun className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-[#14532d]">28°/24°</span>
            </div>

            {/* Tomorrow */}
            <div className="bg-white/95 rounded-2xl p-3 border border-emerald-100 shadow-sm flex flex-col items-center text-center gap-2 hover:border-emerald-300 transition-colors">
              <span className="text-xs font-semibold text-[#52796f]">
                {language === 'ta' ? 'நாளை' : 'Tomorrow'}
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-[#14532d]">29°/24°</span>
            </div>

            {/* Day After */}
            <div className="bg-white/95 rounded-2xl p-3 border border-emerald-100 shadow-sm flex flex-col items-center text-center gap-2 hover:border-emerald-300 transition-colors">
              <span className="text-xs font-semibold text-[#52796f] whitespace-nowrap">
                {language === 'ta' ? 'மறுநாள்' : 'Day After'}
              </span>
              <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                <CloudRain className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-[#14532d]">30°/25°</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 text-center text-xs text-[#52796f]">
        {language === 'ta'
          ? 'இந்திய வானிலை ஆய்வு மையம் (IMD) நேரடி அறிக்கை'
          : 'Grounded by India Meteorological Department (IMD) alerts'}
      </div>
    </div>
  );
};
