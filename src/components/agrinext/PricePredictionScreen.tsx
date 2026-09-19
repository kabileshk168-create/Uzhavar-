import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Lightbulb,
  Check,
  TrendingUp,
  Store,
  Calendar,
  Sparkles,
  Bell,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Language } from '../../types';
import { agriCropsList, AgriCropTrend } from './AgriNextData';

interface PricePredictionScreenProps {
  language: Language;
  onBack?: () => void;
  onNavigateScreen?: (screenId: string) => void;
  onNavigateTab?: (tabId: string) => void;
}

export const PricePredictionScreen: React.FC<PricePredictionScreenProps> = ({
  language,
  onBack,
  onNavigateScreen,
  onNavigateTab
}) => {
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [timeRange, setTimeRange] = useState<'7days' | '1month' | '3months'>('1month');
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState<boolean>(false);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const selectedCrop: AgriCropTrend =
    agriCropsList.find((c) => c.id === selectedCropId) || agriCropsList[0];

  const currentChart = selectedCrop.chartData[timeRange];

  // Responsive SVG Chart Dimensions
  const chartWidth = 540;
  const chartHeight = 180;
  const paddingX = 45;
  const paddingY = 30;

  const minPrice = 10;
  const maxPrice = 45;

  const getX = (index: number) => {
    return paddingX + (index / (currentChart.length - 1)) * (chartWidth - paddingX * 2);
  };

  const getY = (price: number) => {
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    return chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
  };

  const points = currentChart.map((d, i) => `${getX(i)},${getY(d.price)}`).join(' ');

  // Last point for tooltip badge
  const lastIndex = currentChart.length - 1;
  const lastPoint = currentChart[lastIndex];
  const lastX = getX(lastIndex);
  const lastY = getY(lastPoint.price);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Breadcrumb & Title Bar */}
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
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{language === 'ta' ? 'AI சந்தை கணிப்பு' : 'AI Market Forecasting'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'ta' ? 'விலை கணிப்பு & சந்தை முன்கணிப்பு' : 'Commodity Price Prediction'}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'ta'
                ? 'வரலாற்று தரவுகள், பருவமழை மற்றும் மண்டி வரத்து அடிப்படையிலான நம்பகமான முன்கணிப்பு'
                : 'Predictive price trajectories based on APMC arrivals, seasonal rainfall, and historical patterns'}
            </p>
          </div>
        </div>

        {/* Quick Horizon Pills */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimeRange('7days')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              timeRange === '7days'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'ta' ? '7 நாட்கள்' : '7 Days'}
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('1month')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              timeRange === '1month'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'ta' ? '1 மாதம்' : '1 Month'}
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('3months')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              timeRange === '3months'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'ta' ? '3 மாதங்கள்' : '3 Months'}
          </button>
        </div>
      </div>

      {/* Commodity Selection Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {agriCropsList.map((crop) => {
          const isSelected = crop.id === selectedCropId;
          return (
            <button
              key={crop.id}
              type="button"
              onClick={() => setSelectedCropId(crop.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-300 shadow-2xs text-[#14532d] ring-1 ring-emerald-400/40'
                  : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700'
              }`}
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="w-7 h-7 rounded-xl object-cover border border-stone-200/80"
              />
              <div className="text-left">
                <span className="text-xs font-bold block leading-tight">
                  {language === 'ta' ? crop.nameTamil : crop.name}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  ₹{crop.price}/{crop.unit}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ml-1 ${
                  crop.changePercent >= 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {crop.changePercent >= 0 ? `+${crop.changePercent}%` : `${crop.changePercent}%`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Interactive Chart & Forecast Trajectory */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-100 shrink-0">
                  <img
                    src={selectedCrop.image}
                    alt={selectedCrop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">
                    {language === 'ta' ? selectedCrop.nameTamil : selectedCrop.name}{' '}
                    <span className="text-sm font-normal text-stone-500">
                      ({selectedCrop.category})
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{language === 'ta' ? 'தற்போதைய சராசரி மண்டி விலை' : 'Current Mandi Average'}:</span>
                    <span className="font-extrabold text-[#14532d] text-sm">
                      ₹{selectedCrop.price} /{selectedCrop.unit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+{selectedCrop.changePercent}% {language === 'ta' ? 'முன்கணிப்பு உயர்வு' : 'Forecast'}</span>
                </span>
              </div>
            </div>

            {/* Responsive Scalable Line Chart Card */}
            <div className="relative w-full bg-gradient-to-b from-emerald-50/40 via-stone-50/50 to-white rounded-2xl p-3 sm:p-4 border border-emerald-100/60 overflow-hidden">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-48 sm:h-64 overflow-visible"
              >
                {/* Defs for Linear Gradients */}
                <defs>
                  <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines & Y-Axis Labels */}
                {[40, 30, 20, 10].map((val) => {
                  const y = getY(val);
                  return (
                    <g key={val}>
                      <text
                        x="12"
                        y={y + 4}
                        fill="#9ca3af"
                        fontSize="10"
                        fontWeight="600"
                        className="font-mono select-none"
                      >
                        ₹{val}
                      </text>
                      <line
                        x1="38"
                        y1={y}
                        x2={chartWidth - 10}
                        y2={y}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    </g>
                  );
                })}

                {/* Shaded Area Under Line */}
                <polygon
                  points={`${getX(0)},${chartHeight - paddingY} ${points} ${getX(lastIndex)},${chartHeight - paddingY}`}
                  fill="url(#predictionGradient)"
                />

                {/* Main Connected Trend Polyline */}
                <polyline
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />

                {/* Data Points on Line */}
                {currentChart.map((d, i) => {
                  const cx = getX(i);
                  const cy = getY(d.price);
                  const isHovered = hoveredPointIndex === i;
                  return (
                    <g
                      key={i}
                      onMouseEnter={() => setHoveredPointIndex(i)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? '6' : '4.5'}
                        fill="#ffffff"
                        stroke="#059669"
                        strokeWidth="2.5"
                        className="transition-all"
                      />
                      {/* Price Label above point on hover or peak */}
                      {(isHovered || i === lastIndex) && (
                        <g transform={`translate(${cx - 24}, ${cy - 28})`}>
                          <rect
                            width="48"
                            height="20"
                            rx="6"
                            fill="#065f46"
                            className="shadow-md"
                          />
                          <text
                            x="24"
                            y="13"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            ₹{d.price}/kg
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* X-Axis Dates */}
                {currentChart.map((d, i) => (
                  <text
                    key={i}
                    x={getX(i)}
                    y={chartHeight - 8}
                    fill="#6b7280"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                    className="select-none"
                  >
                    {d.label}
                  </text>
                ))}
              </svg>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-200/60 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  {language === 'ta' ? 'கணிப்பு மாதிரி: ARIMA + நரம்பியல் வலைப்பின்னல்' : 'Forecast Model: ARIMA + Agricultural Neural Engine'}
                </span>
                <span className="font-semibold text-emerald-800">
                  {language === 'ta' ? 'துல்லியம்: 92.4%' : 'Confidence: 92.4%'}
                </span>
              </div>
            </div>

            {/* Nearby Mandi Benchmarks */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'ta' ? 'அருகிலுள்ள நேரடி மண்டி விலைகள்' : 'Nearby Direct Mandi Benchmarks'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">Koyambedu Wholesale</span>
                    <span className="text-[10px] text-stone-500">Chennai Mandi</span>
                  </div>
                  <span className="text-sm font-black text-[#14532d]">₹32 /kg</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">Thiruvallur Regulated</span>
                    <span className="text-[10px] text-stone-500">Local APMC</span>
                  </div>
                  <span className="text-sm font-black text-[#14532d]">₹28 /kg</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">Kanchipuram Sandhai</span>
                    <span className="text-[10px] text-stone-500">Uzhavar Sandhai</span>
                  </div>
                  <span className="text-sm font-black text-[#14532d]">₹29 /kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: AI Advisory, Actions & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Decision Recommendation */}
          <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 backdrop-blur rounded-xl">
                  <Lightbulb className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                    {language === 'ta' ? 'உழவர்+ AI பரிந்துரை' : 'Uzhavar+ AI Recommendation'}
                  </span>
                  <h3 className="text-base font-extrabold leading-tight">
                    {language === 'ta' ? 'அறுவடையை 1 வாரம் தள்ளி வைக்கலாம்' : 'Hold Harvest for 7–10 Days'}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {language === 'ta'
                  ? selectedCrop.predictionInsightTamil
                  : selectedCrop.predictionInsight}
              </p>

              <div className="p-3 rounded-2xl bg-black/20 border border-white/10 space-y-1 text-xs">
                <div className="flex justify-between text-emerald-200">
                  <span>{language === 'ta' ? 'இன்றைய விலை' : 'Today Price'}:</span>
                  <span className="font-bold text-white">₹{selectedCrop.price}/kg</span>
                </div>
                <div className="flex justify-between text-emerald-200">
                  <span>{language === 'ta' ? 'எதிர்பார்க்கப்படும் உச்சம்' : 'Expected Peak'}:</span>
                  <span className="font-black text-amber-300">₹{selectedCrop.price + 6}/kg</span>
                </div>
                <div className="flex justify-between text-emerald-200">
                  <span>{language === 'ta' ? 'கூடுதல் வருவாய்' : 'Est. Extra Return'}:</span>
                  <span className="font-black text-emerald-300">+₹10,800 (per ton)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              {language === 'ta' ? 'அடுத்த கட்ட நடவடிக்கைகள்' : 'Decision Actions'}
            </h4>

            {/* Set Price Alert Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateTab) onNavigateTab('price_alert');
                else if (onNavigateScreen) onNavigateScreen('price_alert');
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-[#14532d] font-bold text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-emerald-700" />
                <span>{language === 'ta' ? 'இந்த பயிருக்கு விலை எச்சரிக்கை அமை' : 'Set Price Alert for this Crop'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </button>

            {/* Compare All Mandis */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateTab) onNavigateTab('market');
                else if (onNavigateScreen) onNavigateScreen('market_trends');
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-stone-600" />
                <span>{language === 'ta' ? 'அனைத்து சந்தைகளையும் ஒப்பிடுக' : 'Compare Rates Across Mandis'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>

            {/* Connect Direct Buyers */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateTab) onNavigateTab('marketplace');
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200/80 text-teal-900 font-bold text-xs transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-teal-700" />
                <span>{language === 'ta' ? 'நேரடி வாங்குவோருக்கு விற்பனை செய்' : 'Sell to Verified Direct Buyers'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
