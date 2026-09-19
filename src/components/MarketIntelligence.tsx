import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Truck,
  ArrowRight,
  Sparkles,
  Info,
  Scale,
  DollarSign,
  Calendar,
  Store,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CropPrice, Language } from '../types';
import { mockCropsData } from '../data/mockData';

interface MarketIntelligenceProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenVoiceWithQuery?: (query: string) => void;
}

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({
  language,
  onNavigate,
  onOpenVoiceWithQuery
}) => {
  const [selectedCropId, setSelectedCropId] = useState<string>('crop_tomato');
  const [trendRange, setTrendRange] = useState<'7days' | '30days'>('7days');
  const [compareAllModal, setCompareAllModal] = useState<boolean>(false);

  const currentCrop = mockCropsData.find(c => c.id === selectedCropId) || mockCropsData[0];

  // Best net return calculation
  const sortedMarketsByNet = [...currentCrop.markets].sort(
    (a, b) => b.estimatedNetReturn - a.estimatedNetReturn
  );
  const bestMarket = sortedMarketsByNet[0];
  const localMarket = currentCrop.markets[0];
  const netGainDifference = (bestMarket.estimatedNetReturn - localMarket.estimatedNetReturn).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'சந்தை நுண்ணறிவு & வழிகாட்டல்' : 'Core Decision-Support Module'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'ta' ? 'விவசாய சந்தை விலை நுண்ணறிவு' : 'Agricultural Market Intelligence'}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
              {language === 'ta'
                ? 'நேரடி சந்தை விலை, அருகாமை மண்டி ஒப்பீடு, போக்குவரத்து கழித்த நிகர வருவாய் & சிறந்த விற்பனை முடிவுகள்.'
                : 'Real-time commodity mandi prices, multi-market comparison, transport deductions, and data-driven selling intelligence.'}
            </p>
          </div>

          {/* Decision Support Badge */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-3.5 text-xs text-emerald-50 max-w-xs shrink-0">
            <div className="flex items-center gap-1.5 font-bold text-white mb-1">
              <Info className="w-4 h-4 text-emerald-300" />
              <span>{language === 'ta' ? 'முடிவு ஆதரவு முறைமை' : 'Decision Support System'}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-100/90">
              {language === 'ta'
                ? 'விலைகள் உத்தேச மதிப்பீடுகள் (Estimated) மட்டுமே. சந்தை வரத்து அடிப்படையில் மாறுபடலாம்.'
                : 'Estimates based on current mandi arrivals and logistics rates. Decision support only.'}
            </p>
          </div>
        </div>

        {/* Commodity Horizontal Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 scrollbar-none">
          {mockCropsData.map(crop => {
            const isSelected = crop.id === selectedCropId;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-emerald-900 shadow-lg shadow-black/10 scale-102'
                    : 'bg-emerald-900/50 hover:bg-emerald-900/80 text-white border border-emerald-600/40'
                }`}
              >
                <span>{language === 'ta' ? crop.cropNameTamil : crop.cropName}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-800/80 text-emerald-200'
                }`}>
                  ₹{crop.currentPrice}/{crop.unit}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Price Insight Card (Section 8) */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0 mt-0.5">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-md">
                {language === 'ta' ? 'AI விலை நுண்ணறிவு' : 'AI Price Insight'}
              </span>
              <span className="text-xs text-amber-800 font-semibold">
                {currentCrop.changePercent > 0 ? `+${currentCrop.changePercent}% this week` : `${currentCrop.changePercent}% this week`}
              </span>
            </div>
            <p className="text-sm font-semibold text-stone-900 mt-1.5 leading-snug">
              {language === 'ta' ? currentCrop.aiInsightTamil : currentCrop.aiInsight}
            </p>
            <p className="text-xs text-stone-600 mt-1">
              {language === 'ta'
                ? `உங்கள் அருகாமை சந்தை (${localMarket.marketNameTamil}) விட ${bestMarket.marketNameTamil} சந்தையில் போக்குவரத்து செலவு கழித்த பின்னும் கிலோவுக்கு ₹${netGainDifference} கூடுதல் லாபம் கிடைக்கும்.`
                : `After deducting transport, ${bestMarket.marketName} provides an estimated extra net gain of ₹${netGainDifference}/kg compared to your nearest local mandi.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('marketplace')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{language === 'ta' ? 'விற்பனை செய்ய' : 'Sell Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Multi-Market Comparison & Price Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Multi-Market Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                <span>{language === 'ta' ? 'சந்தைகள் ஒப்பீடு & நிகர வருவாய்' : 'Market Price Comparison & Net Return'}</span>
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'ta' ? 'விவசாயி இடம்: வாடிப்பட்டி, மதுரை' : 'Your Farm Location: Vadipatti, Madurai'}
              </p>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg">
              {currentCrop.markets.length} {language === 'ta' ? 'சந்தைகள்' : 'Markets'}
            </span>
          </div>

          {/* Market Cards */}
          <div className="space-y-3">
            {currentCrop.markets.map((market, idx) => {
              const isBest = market.marketName === bestMarket.marketName;
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isBest
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-sm ring-1 ring-emerald-400/40'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                          {language === 'ta' ? market.marketNameTamil : market.marketName}
                        </h3>
                        {isBest && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {language === 'ta' ? 'அதிக நிகர வருவாய்' : 'Best Net Return'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          {market.distanceKm} km {language === 'ta' ? 'தூரம்' : 'away'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-stone-400" />
                          {language === 'ta' ? 'போக்குவரத்து:' : 'Transport:'} ₹{market.transportCostPerKg}/kg
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg sm:text-xl font-extrabold text-stone-900">
                        ₹{market.price}
                        <span className="text-xs font-normal text-stone-500">/{currentCrop.unit}</span>
                      </div>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mt-0.5 ${
                        market.demandLevel === 'High'
                          ? 'bg-emerald-100 text-emerald-800'
                          : market.demandLevel === 'Moderate'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {language === 'ta' ? market.demandLevelTamil : `${market.demandLevel} Demand`}
                      </span>
                    </div>
                  </div>

                  {/* Transport & Estimated Net Return Breakdown */}
                  <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs bg-white/70 p-2.5 rounded-xl">
                    <div className="text-stone-600">
                      <span className="font-medium text-stone-500">{language === 'ta' ? 'கணக்கீடு:' : 'Formula:'} </span>
                      <span>₹{market.price} (விலை) - ₹{market.transportCostPerKg} (சரக்கு)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-500 text-[11px] mr-1.5">{language === 'ta' ? 'நிகர லாபம்:' : 'Net Return:'}</span>
                      <span className="font-extrabold text-sm text-emerald-800">
                        ₹{market.estimatedNetReturn.toFixed(1)}/{currentCrop.unit}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Decision Action Row */}
          <div className="p-4 bg-stone-100/80 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>
                {language === 'ta'
                  ? 'பகிர்வு லாரி வசதி மூலம் போக்குவரத்து செலவை 40% குறைக்கலாம்.'
                  : 'Reduce transport expenses up to 40% via shared vehicle pooling.'}
              </span>
            </div>
            <button
              onClick={() => onNavigate('transport')}
              className="font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'ta' ? 'வாகனம் தேடு' : 'Find Transport'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Historical Price Trend Chart & Decision Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-stone-900 text-sm">
                  {language === 'ta' ? 'வரலாற்று விலை போக்கு' : 'Price Trend & Movement'}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {language === 'ta' ? 'கடந்த நாட்களின் விலை ஏற்ற இறக்கம்' : 'Historical Mandi Rates'}
                </p>
              </div>

              {/* Range Toggle */}
              <div className="flex p-1 bg-stone-100 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setTrendRange('7days')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    trendRange === '7days' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setTrendRange('30days')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    trendRange === '30days' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  30 Days
                </button>
              </div>
            </div>

            {/* Custom SVG Price Chart */}
            <div className="my-5">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>{language === 'ta' ? 'விலை (₹/கிலோ)' : 'Price (₹/kg)'}</span>
                <span className="font-bold text-emerald-700">
                  {language === 'ta' ? 'தற்போதைய விலை: ' : 'Current: '}₹{currentCrop.currentPrice}/kg
                </span>
              </div>

              {/* Responsive SVG Chart with interactive hover points */}
              <div className="h-44 w-full bg-stone-50/70 rounded-2xl p-3 border border-stone-100 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between text-[10px] text-stone-400 border-b border-dashed border-stone-200 pb-1">
                  <span>High: ₹{Math.max(...(trendRange === '7days' ? currentCrop.history7Days : currentCrop.history30Days).map(d => d.price))}</span>
                  <span>Low: ₹{Math.min(...(trendRange === '7days' ? currentCrop.history7Days : currentCrop.history30Days).map(d => d.price))}</span>
                </div>

                {/* Bars / Curve */}
                <div className="flex items-end justify-between gap-2 h-28 pt-2 px-1">
                  {(trendRange === '7days' ? currentCrop.history7Days : currentCrop.history30Days).map((pt, i) => {
                    const maxVal = Math.max(...(trendRange === '7days' ? currentCrop.history7Days : currentCrop.history30Days).map(d => d.price)) * 1.15;
                    const heightPercent = (pt.price / maxVal) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                        {/* Tooltip on hover */}
                        <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm pointer-events-none whitespace-nowrap z-20">
                          ₹{pt.price}
                        </div>
                        <div
                          className="w-full max-w-[28px] bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-lg group-hover:from-emerald-700 group-hover:to-teal-600 transition-all shadow-xs"
                          style={{ height: `${heightPercent}%` }}
                        />
                        <span className="text-[10px] text-stone-500 truncate w-full text-center">
                          {pt.date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Market Decision Action Grid */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => onNavigate('marketplace')}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-emerald-700/20 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>{language === 'ta' ? 'நேரடி மொத்த வியாபாரிகளை காண்க' : 'Find Direct Wholesale Buyers'}</span>
              </button>

              <button
                onClick={() => onNavigate('profit_calc')}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ta' ? 'பண்ணை லாப திட்டமிடல் (Profit Calculator)' : 'Calculate Farm Net Profit'}</span>
              </button>
            </div>
          </div>

          {/* Location & Transport Summary Box */}
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/60 text-xs text-stone-700 space-y-2">
            <div className="flex items-center justify-between font-bold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                {language === 'ta' ? 'உங்கள் பகுதி நிலவரம்' : 'Your Mandi Overview'}
              </span>
              <span className="text-emerald-700">Madurai Mandi</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 bg-white rounded-lg border border-emerald-100">
                <p className="text-stone-400">{language === 'ta' ? 'அதிகபட்ச சந்தை' : 'Highest Mandi'}</p>
                <p className="font-bold text-stone-900 truncate">{currentCrop.highestMarket}</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-100">
                <p className="text-stone-400">{language === 'ta' ? 'குறைந்தபட்ச சந்தை' : 'Lowest Mandi'}</p>
                <p className="font-bold text-stone-900 truncate">{currentCrop.lowestMarket}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
