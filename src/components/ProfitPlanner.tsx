import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Save,
  Check,
  RefreshCw,
  Info,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import confetti from 'canvas-confetti';

interface ProfitPlannerProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const ProfitPlanner: React.FC<ProfitPlannerProps> = ({
  language,
  onNavigate
}) => {
  const [crop, setCrop] = useState<string>('Tomato');
  const [landAcres, setLandAcres] = useState<number>(1);
  const [expectedYieldKg, setExpectedYieldKg] = useState<number>(8000);
  const [expectedPricePerKg, setExpectedPricePerKg] = useState<number>(28);

  // Costs
  const [seedCost, setSeedCost] = useState<number>(3500);
  const [fertilizerCost, setFertilizerCost] = useState<number>(12000);
  const [labourCost, setLabourCost] = useState<number>(18000);
  const [waterCost, setWaterCost] = useState<number>(4000);
  const [transportCost, setTransportCost] = useState<number>(6500);
  const [otherCost, setOtherCost] = useState<number>(3000);

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Calculations
  const totalCost = (seedCost + fertilizerCost + labourCost + waterCost + transportCost + otherCost) * landAcres;
  const totalYield = expectedYieldKg * landAcres;
  const estimatedRevenue = totalYield * expectedPricePerKg;
  const estimatedNetReturn = estimatedRevenue - totalCost;
  const netReturnPerAcre = landAcres > 0 ? estimatedNetReturn / landAcres : 0;
  const costPerKg = totalYield > 0 ? totalCost / totalYield : 0;

  const handleSaveReport = () => {
    setSavedSuccess(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // Ignored
    }
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const handleApplyPreset = (cropName: string) => {
    setCrop(cropName);
    if (cropName === 'Tomato') {
      setExpectedYieldKg(8000);
      setExpectedPricePerKg(28);
      setSeedCost(3500);
      setFertilizerCost(12000);
      setLabourCost(18000);
      setWaterCost(4000);
      setTransportCost(6500);
      setOtherCost(3000);
    } else if (cropName === 'Paddy') {
      setExpectedYieldKg(2400);
      setExpectedPricePerKg(42);
      setSeedCost(2000);
      setFertilizerCost(8000);
      setLabourCost(14000);
      setWaterCost(3000);
      setTransportCost(3000);
      setOtherCost(2000);
    } else if (cropName === 'Chilli') {
      setExpectedYieldKg(3500);
      setExpectedPricePerKg(62);
      setSeedCost(4500);
      setFertilizerCost(14000);
      setLabourCost(22000);
      setWaterCost(5000);
      setTransportCost(4500);
      setOtherCost(3500);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Title Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'பண்ணை லாப திட்டமிடல்' : 'Farm Profit Planner'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'ta' ? 'பயிர் செலவு & லாப கால்குலேட்டர்' : 'Crop Economics & Net Return Calculator'}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
              {language === 'ta'
                ? 'விதை முதல் அறுவடை வரை உள்ள அனைத்து செலவுகளையும் உள்ளிட்டு எதிர்பார்க்கும் நிகர லாபத்தை முன்கூட்டியே கணக்கிடுங்கள்.'
                : 'Plan input expenditures, labour, irrigation, and logistics to simulate your expected farm gate net profit.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-xs text-emerald-100 max-w-xs">
            <span className="font-bold block text-white">
              {language === 'ta' ? 'உத்தேச மதிப்பீடு (Estimated)' : 'Decision Support / Estimated'}
            </span>
            <span className="text-[11px]">
              {language === 'ta' 
                ? 'சந்தை விலை ஏற்ற இறக்கங்கள் மற்றும் வானிலைக்கு ஏற்ப உண்மையான லாபம் மாறுபடலாம்.'
                : 'Subject to natural weather factors and real-time mandi price fluctuations.'}
            </span>
          </div>
        </div>

        {/* Quick Crop Presets */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-emerald-200 shrink-0">
            {language === 'ta' ? 'மாதிரி பயிர்கள்:' : 'Presets:'}
          </span>
          {['Tomato', 'Paddy', 'Chilli'].map((c) => (
            <button
              key={c}
              onClick={() => handleApplyPreset(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                crop === c
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              {c === 'Tomato' ? (language === 'ta' ? '🍅 தக்காளி' : '🍅 Tomato') :
               c === 'Paddy' ? (language === 'ta' ? '🌾 நெல்' : '🌾 Paddy') :
               (language === 'ta' ? '🌶️ மிளகாய்' : '🌶️ Chilli')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="font-bold text-stone-900 text-base">
              {language === 'ta' ? 'உள்ளீடுகள் & செலவு விவரங்கள்' : 'Farm Inputs & Cost Breakdown'}
            </h2>
            <button
              onClick={() => handleApplyPreset('Tomato')}
              className="text-xs font-semibold text-stone-500 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{language === 'ta' ? 'மீட்டமைக்க' : 'Reset'}</span>
            </button>
          </div>

          {/* Basic Farm Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'ta' ? 'பயிர் பெயர்' : 'Crop'}
              </label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'ta' ? 'நிலப்பரப்பு (ஏக்கர்)' : 'Land Area (Acres)'}
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={landAcres}
                onChange={(e) => setLandAcres(Math.max(0.1, parseFloat(e.target.value) || 1))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'ta' ? 'மகசூல் (கிலோ/ஏக்கர்)' : 'Yield (Kg / Acre)'}
              </label>
              <input
                type="number"
                value={expectedYieldKg}
                onChange={(e) => setExpectedYieldKg(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>
          </div>

          {/* Expected Selling Price */}
          <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200/70 flex items-center justify-between gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-950">
                {language === 'ta' ? 'எதிர்பார்க்கும் விற்பனை விலை (₹/கிலோ)' : 'Expected Selling Price (₹/kg)'}
              </label>
              <span className="text-[11px] text-emerald-800">
                {language === 'ta' ? 'தற்போதைய சந்தை விலை அடிப்படையில்' : 'Based on current market averages'}
              </span>
            </div>
            <div className="w-32">
              <input
                type="number"
                value={expectedPricePerKg}
                onChange={(e) => setExpectedPricePerKg(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white font-extrabold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right"
              />
            </div>
          </div>

          {/* Costs Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
              {language === 'ta' ? 'ஏக்கருக்கான செலவுகள் (₹)' : 'Expenditure per Acre (₹)'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  🌱 {language === 'ta' ? 'விதை & நாற்று செலவு' : 'Seed & Nursery Cost'}
                </label>
                <input
                  type="number"
                  value={seedCost}
                  onChange={(e) => setSeedCost(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  🧪 {language === 'ta' ? 'உரம் & பூச்சி மேலாண்மை' : 'Fertilizers & Bio-Inputs'}
                </label>
                <input
                  type="number"
                  value={fertilizerCost}
                  onChange={(e) => setFertilizerCost(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  👥 {language === 'ta' ? 'உழவு & ஆட்கள் கூலி' : 'Labour & Tillage'}
                </label>
                <input
                  type="number"
                  value={labourCost}
                  onChange={(e) => setLabourCost(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  💧 {language === 'ta' ? 'பாசனம் & மின்சாரம்' : 'Irrigation & Electricity'}
                </label>
                <input
                  type="number"
                  value={waterCost}
                  onChange={(e) => setWaterCost(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  🚚 {language === 'ta' ? 'சரக்கு & போக்குவரத்து' : 'Transport to Mandi'}
                </label>
                <input
                  type="number"
                  value={transportCost}
                  onChange={(e) => setTransportCost(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">
                  📦 {language === 'ta' ? 'சிப்பம் & பிற செலவுகள்' : 'Packaging & Other'}
                </label>
                <input
                  type="number"
                  value={otherCost}
                  onChange={(e) => setOtherCost(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Calculation Summary Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-sm pb-2 border-b border-stone-100 flex items-center justify-between">
              <span>{language === 'ta' ? 'கணக்கீட்டு முடிவு' : 'Economic Summary'}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {landAcres} {language === 'ta' ? 'ஏக்கர்' : 'Acre(s)'}
              </span>
            </h3>

            {/* Total Cost Card */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 font-medium">
                  {language === 'ta' ? 'மொத்த உற்பத்தி செலவு' : 'Total Production Cost'}
                </span>
                <p className="text-[11px] text-stone-400">
                  {language === 'ta' ? `கிலோவுக்கு ₹${costPerKg.toFixed(1)} அடக்க விலை` : `₹${costPerKg.toFixed(1)} cost / kg`}
                </p>
              </div>
              <span className="text-lg font-extrabold text-stone-800">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Gross Revenue Card */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-900 font-medium">
                  {language === 'ta' ? 'எதிர்பார்க்கும் மொத்த வருவாய்' : 'Gross Farm Revenue'}
                </span>
                <p className="text-[11px] text-blue-700">
                  {totalYield.toLocaleString()} kg @ ₹{expectedPricePerKg}/kg
                </p>
              </div>
              <span className="text-lg font-extrabold text-blue-900">
                ₹{estimatedRevenue.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Net Return Highlight Box */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              estimatedNetReturn >= 0
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400'
                : 'bg-red-50 border-red-300'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  {language === 'ta' ? 'எதிர்பார்க்கும் நிகர லாபம்' : 'Estimated Net Profit'}
                </span>
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 my-1">
                ₹{estimatedNetReturn.toLocaleString('en-IN')}
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 pt-2 border-t border-emerald-200/80 mt-2">
                <span>{language === 'ta' ? 'ஏக்கருக்கு லாபம்:' : 'Net Return / Acre:'}</span>
                <span>₹{Math.round(netReturnPerAcre).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleSaveReport}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'ta' ? 'அறிக்கை சேமிக்கப்பட்டது!' : 'Report Saved!'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{language === 'ta' ? 'அறிக்கையை சேமிக்க' : 'Save Report'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate('marketplace')}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>{language === 'ta' ? 'இப்போதே வாங்குபவர்களை தேடுங்கள்' : 'Find Matching Buyers Now'}</span>
                <ArrowRight className="w-4 h-4 text-stone-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
