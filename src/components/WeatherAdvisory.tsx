import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  AlertTriangle,
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types';
import { mockWeatherData } from '../data/mockData';

interface WeatherAdvisoryProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({
  language,
  onNavigate
}) => {
  const weather = mockWeatherData;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Weather Header */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
              <CloudSun className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'வானிலை & பண்ணை ஆலோசனை' : 'Agro-Meteorological Advisory'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {weather.city}, {weather.district}
            </h1>
            <p className="text-teal-100 text-xs sm:text-sm mt-1">
              {language === 'ta' ? weather.conditionTamil : weather.condition}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div className="text-4xl sm:text-5xl font-black">{weather.temperature}°C</div>
              <div className="text-xs text-teal-100 space-y-1">
                <p className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-teal-300" />
                  {language === 'ta' ? 'ஈரப்பதம்:' : 'Humidity:'} {weather.humidityPercent}%
                </p>
                <p className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-teal-300" />
                  {language === 'ta' ? 'காற்று வேகம்:' : 'Wind Speed:'} {weather.windSpeedKmh} km/h
                </p>
              </div>
            </div>
          </div>

          {/* AI Smart Advisory Card (Section 17) */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 max-w-sm">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ta' ? 'AI வேளாண் வானிலை ஆலோசனை' : 'Smart Actionable Advisory'}</span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              {language === 'ta' ? weather.alerts[0]?.messageTamil : weather.alerts[0]?.message}
            </p>
          </div>
        </div>
      </div>

      {/* 5-Day Agro Forecast Cards */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{language === 'ta' ? '7 நாட்கள் பண்ணை முன்னறிவிப்பு' : '7-Day Farm Weather Forecast'}</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.forecast.map((fc, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-2xl border border-stone-200 text-center space-y-1.5 shadow-xs"
            >
              <span className="text-xs font-bold text-stone-700 block">
                {language === 'ta' ? fc.dayTamil : fc.day}
              </span>
              <div className="text-xl font-black text-stone-900">{fc.tempMax}°C</div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-blue-600 font-semibold">
                <Droplets className="w-3 h-3" />
                <span>{fc.rainProb}% Rain</span>
              </div>
              <p className="text-[10px] text-stone-500 line-clamp-1">
                {fc.condition}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Alerts & Soil Moisture Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weather.alerts.map((al, idx) => (
          <div key={idx} className="p-5 bg-white rounded-3xl border border-stone-200 space-y-2">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{language === 'ta' ? al.titleTamil : al.title}</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'ta' ? al.messageTamil : al.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
