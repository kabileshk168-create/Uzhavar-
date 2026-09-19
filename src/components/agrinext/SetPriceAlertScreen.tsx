import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Bell,
  Check,
  CheckCircle2,
  Trash2,
  Sparkles,
  Smartphone,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Percent,
  Plus
} from 'lucide-react';
import { Language } from '../../types';
import { agriCropsList, initialAlerts, PriceAlertConfig } from './AgriNextData';

interface SetPriceAlertScreenProps {
  language: Language;
  onBack?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const SetPriceAlertScreen: React.FC<SetPriceAlertScreenProps> = ({
  language,
  onBack,
  onNavigateTab
}) => {
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [selectedCondition, setSelectedCondition] = useState<
    'rises_above' | 'falls_below' | 'any_change'
  >('rises_above');

  const [risesAboveValue, setRisesAboveValue] = useState<number>(30);
  const [fallsBelowValue, setFallsBelowValue] = useState<number>(20);
  const [anyChangeValue, setAnyChangeValue] = useState<number>(5);

  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<PriceAlertConfig[]>(initialAlerts);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sendSms, setSendSms] = useState<boolean>(true);
  const [sendWhatsapp, setSendWhatsapp] = useState<boolean>(true);

  const selectedCrop =
    agriCropsList.find((c) => c.id === selectedCropId) || agriCropsList[0];

  const handleSaveAlert = () => {
    let targetVal = risesAboveValue;
    let unit = '₹ /kg';

    if (selectedCondition === 'falls_below') {
      targetVal = fallsBelowValue;
      unit = '₹ /kg';
    } else if (selectedCondition === 'any_change') {
      targetVal = anyChangeValue;
      unit = '%';
    }

    const newAlert: PriceAlertConfig = {
      id: `alert-${Date.now()}`,
      cropId: selectedCrop.id,
      cropName: selectedCrop.name,
      condition: selectedCondition,
      targetValue: targetVal,
      unit,
      createdAt: 'Just now',
      isActive: true,
    };

    setAlerts((prev) => [newAlert, ...prev]);

    const msg =
      language === 'ta'
        ? `${selectedCrop.nameTamil} விலை எச்சரிக்கை வெற்றிகரமாக சேமிக்கப்பட்டது!`
        : `Price alert for ${selectedCrop.name} successfully saved!`;

    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-12 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#14532d] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in slide-in-from-top duration-300 border border-emerald-400/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

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
              <Bell className="w-3 h-3 text-emerald-600" />
              <span>{language === 'ta' ? 'தானியங்கி எச்சரிக்கை' : 'Instant Market Triggers'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'ta' ? 'விலை எச்சரிக்கை அமைப்பு' : 'Set Mandi Price Alerts'}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'ta'
                ? 'உங்கள் பயிர் விலை நிர்ணயிக்கப்பட்ட அளவை எட்டும்போது SMS அல்லது WhatsApp மூலம் உடனடியாக அறியுங்கள்'
                : 'Receive automated SMS and WhatsApp alerts whenever APMC mandi prices cross your chosen threshold'}
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Grid: Left (Form) & Right (Active Alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Alert Configuration Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-5">
            <h3 className="text-base font-extrabold text-stone-900">
              {language === 'ta' ? 'புதிய எச்சரிக்கை உருவாக்குக' : 'Configure New Alert'}
            </h3>

            {/* Crop Selector Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                {language === 'ta' ? 'பயிரைத் தேர்ந்தெடுக்கவும்' : 'Select Commodity'}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)}
                  className="w-full bg-stone-50 rounded-2xl p-3 border border-stone-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-stone-200">
                      <img
                        src={selectedCrop.image}
                        alt={selectedCrop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-bold text-stone-900 block">
                        {language === 'ta' ? selectedCrop.nameTamil : selectedCrop.name}
                      </span>
                      <span className="text-xs text-stone-500">
                        {language === 'ta' ? 'தற்போதைய விலை' : 'Current Rate'}: ₹{selectedCrop.price}/{selectedCrop.unit}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform ${
                      isCropDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isCropDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-30 space-y-1 max-h-56 overflow-y-auto">
                    {agriCropsList.map((crop) => (
                      <button
                        key={crop.id}
                        type="button"
                        onClick={() => {
                          setSelectedCropId(crop.id);
                          setIsCropDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                          crop.id === selectedCropId
                            ? 'bg-emerald-50 text-[#14532d]'
                            : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={crop.image}
                            alt={crop.name}
                            className="w-6 h-6 rounded-lg object-cover"
                          />
                          <span>{language === 'ta' ? crop.nameTamil : crop.name}</span>
                        </div>
                        <span className="text-stone-500 font-mono">₹{crop.price}/{crop.unit}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Condition Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                {language === 'ta' ? 'எச்சரிக்கை நிபந்தனை' : 'Trigger Condition'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCondition('rises_above')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedCondition === 'rises_above'
                      ? 'bg-emerald-50 border-emerald-400 text-[#14532d] ring-1 ring-emerald-400/40'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                  <span className="text-xs font-bold block leading-tight">
                    {language === 'ta' ? 'விலை உயர்ந்தால்' : 'Rises Above'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCondition('falls_below')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedCondition === 'falls_below'
                      ? 'bg-rose-50 border-rose-400 text-rose-900 ring-1 ring-rose-400/40'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <TrendingDown className="w-4 h-4 mx-auto mb-1 text-rose-600" />
                  <span className="text-xs font-bold block leading-tight">
                    {language === 'ta' ? 'விலை குறைந்தால்' : 'Falls Below'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCondition('any_change')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedCondition === 'any_change'
                      ? 'bg-amber-50 border-amber-400 text-amber-900 ring-1 ring-amber-400/40'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <Percent className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                  <span className="text-xs font-bold block leading-tight">
                    {language === 'ta' ? 'திடீர் மாற்றம்' : '% Surge'}
                  </span>
                </button>
              </div>
            </div>

            {/* Target Value Slider / Numeric Adjuster */}
            <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                <span>{language === 'ta' ? 'இலக்கு விலை நிர்ணயம்' : 'Target Threshold'}</span>
                <span className="text-base font-black text-[#14532d]">
                  {selectedCondition === 'any_change'
                    ? `±${anyChangeValue}%`
                    : `₹ ${selectedCondition === 'rises_above' ? risesAboveValue : fallsBelowValue} /kg`}
                </span>
              </div>

              {selectedCondition === 'rises_above' && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="1"
                    value={risesAboveValue}
                    onChange={(e) => setRisesAboveValue(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>₹15/kg</span>
                    <span>₹60/kg</span>
                  </div>
                </div>
              )}

              {selectedCondition === 'falls_below' && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min="10"
                    max="45"
                    step="1"
                    value={fallsBelowValue}
                    onChange={(e) => setFallsBelowValue(Number(e.target.value))}
                    className="w-full accent-rose-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>₹10/kg</span>
                    <span>₹45/kg</span>
                  </div>
                </div>
              )}

              {selectedCondition === 'any_change' && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min="3"
                    max="25"
                    step="1"
                    value={anyChangeValue}
                    onChange={(e) => setAnyChangeValue(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>3% shift</span>
                    <span>25% shift</span>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Delivery Channels */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                {language === 'ta' ? 'அறிவிப்பு சேனல்கள்' : 'Alert Channels'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendSms}
                    onChange={(e) => setSendSms(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <Smartphone className="w-4 h-4 text-stone-600" />
                  <span className="text-xs font-bold text-stone-800">SMS Alert</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendWhatsapp}
                    onChange={(e) => setSendWhatsapp(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-stone-800">WhatsApp</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSaveAlert}
              className="w-full bg-[#14532d] hover:bg-[#166534] text-white py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-950/15 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ta' ? 'எச்சரிக்கையை சேமிக்க' : 'Save Price Alert'}</span>
            </button>
          </div>
        </div>

        {/* Right 6 Cols: Active Price Alerts List */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-extrabold text-stone-900">
                {language === 'ta' ? 'செயலில் உள்ள எச்சரிக்கைகள்' : 'Active Price Alerts'}
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#14532d]">
                {alerts.filter((a) => a.isActive).length} {language === 'ta' ? 'செயலில்' : 'Active'}
              </span>
            </div>

            <div className="space-y-3">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  {language === 'ta' ? 'எந்த எச்சரிக்கைகளும் இல்லை' : 'No active alerts currently set.'}
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      alert.isActive
                        ? 'bg-stone-50/80 border-stone-200'
                        : 'bg-stone-100/60 border-stone-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-[#14532d] flex items-center justify-center font-bold text-xs shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-stone-900">
                            {alert.cropName}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              alert.condition === 'rises_above'
                                ? 'bg-emerald-100 text-emerald-800'
                                : alert.condition === 'falls_below'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {alert.condition === 'rises_above'
                              ? '≥ Rises'
                              : alert.condition === 'falls_below'
                              ? '≤ Falls'
                              : '± Change'}
                          </span>
                        </div>
                        <p className="text-xs text-[#14532d] font-black">
                          {alert.condition === 'any_change'
                            ? `±${alert.targetValue}%`
                            : `₹${alert.targetValue} /kg`}
                        </p>
                        <span className="text-[10px] text-stone-500">
                          {language === 'ta' ? 'சேமிக்கப்பட்டது' : 'Created'}: {alert.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(alert.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          alert.isActive
                            ? 'bg-emerald-100 text-[#14532d]'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {alert.isActive
                          ? language === 'ta' ? 'செயலில்' : 'ON'
                          : language === 'ta' ? 'முடக்கு' : 'OFF'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
