import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Filter,
  Sparkles,
  ArrowUpRight,
  Store
} from 'lucide-react';
import { Language } from '../../types';
import { agriCropsList, AgriCropTrend } from './AgriNextData';

interface MarketTrendsScreenProps {
  language: Language;
  onBack?: () => void;
  onSelectCrop?: (cropId: string) => void;
  onNavigateTab?: (tabId: string) => void;
}

export const MarketTrendsScreen: React.FC<MarketTrendsScreenProps> = ({
  language,
  onBack,
  onSelectCrop,
  onNavigateTab
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'vegetables' | 'fruits' | 'grains'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCrops = agriCropsList.filter((crop) => {
    const matchesCategory = activeCategory === 'all' || crop.category === activeCategory;
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.nameTamil.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Helper to render responsive sparkline SVG
  const renderSparkline = (data: number[], isPositive: boolean) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 28;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 8) - 4;
        return `${x},${y}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#059669' : '#e11d48';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors cursor-pointer shrink-0"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#14532d] text-[11px] font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>{language === 'ta' ? 'நேரடி சந்தை நிலவரம்' : 'Live Commodity Trends'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'ta' ? 'விவசாய பொருட்கள் விலை போக்கு' : 'Agricultural Market Trends'}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'ta'
                ? 'தமிழ்நாடு மற்றும் முக்கிய சந்தைகளின் தினசரி விலை மாற்றங்கள் மற்றும் 7 நாள் போக்கு'
                : 'Real-time price trends, 24h percentage swings, and 7-day sparklines across Tamil Nadu mandis'}
            </p>
          </div>
        </div>

        {/* Search Field */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder={language === 'ta' ? 'பயிரைத் தேடுங்கள்...' : 'Search crop or commodity...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-xs rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#14532d] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          {language === 'ta' ? 'அனைத்து பயிர்கள்' : 'All Commodities'}
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('vegetables')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategory === 'vegetables'
              ? 'bg-[#14532d] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          {language === 'ta' ? 'காய்கறிகள்' : 'Vegetables'}
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('fruits')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategory === 'fruits'
              ? 'bg-[#14532d] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          {language === 'ta' ? 'பழங்கள்' : 'Fruits'}
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('grains')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategory === 'grains'
              ? 'bg-[#14532d] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          {language === 'ta' ? 'தானியங்கள்' : 'Grains'}
        </button>
      </div>

      {/* Multi-Column Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => {
              if (onSelectCrop) onSelectCrop(crop.id);
              else if (onNavigateTab) onNavigateTab('price_prediction');
            }}
            className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between gap-4"
          >
            {/* Top row: Image, Name, Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200 group-hover:scale-105 transition-transform">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    {crop.category}
                  </span>
                  <h3 className="text-base font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {language === 'ta' ? crop.nameTamil : crop.name}
                  </h3>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                  crop.isPositive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {crop.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{crop.isPositive ? `+${crop.changePercent}%` : `${crop.changePercent}%`}</span>
              </span>
            </div>

            {/* Middle row: Price & Sparkline */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <div>
                <span className="text-[10px] text-stone-500 block font-medium">
                  {language === 'ta' ? 'சராசரி மண்டி விலை' : 'Mandi Avg Price'}
                </span>
                <span className="text-lg font-black text-stone-900">
                  ₹{crop.price} <span className="text-xs font-normal text-stone-500">/{crop.unit}</span>
                </span>
              </div>
              <div>{renderSparkline(crop.sparkline, crop.isPositive)}</div>
            </div>

            {/* Bottom row: AI Forecast snippet & Action Link */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-stone-500 text-[11px] truncate max-w-[200px]">
                {language === 'ta' ? crop.predictionInsightTamil : crop.predictionInsight}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 shrink-0 group-hover:underline">
                <span>{language === 'ta' ? 'கணிப்பு' : 'Forecast'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
