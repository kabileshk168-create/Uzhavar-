import React, { useState } from 'react';
import {
  ArrowLeft,
  Sprout,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ShieldAlert,
  Droplet,
  Sparkles,
  Camera,
  Calendar,
  CloudSun,
  X
} from 'lucide-react';
import { Language } from '../../types';

interface CropAdvisoryScreenProps {
  language: Language;
  onBack?: () => void;
  onOpenCropDoctor?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export const CropAdvisoryScreen: React.FC<CropAdvisoryScreenProps> = ({
  language,
  onBack,
  onOpenCropDoctor,
  onNavigateTab
}) => {
  const [completedTasks, setCompletedTasks] = useState<{ [key: number]: boolean }>({
    0: true,
    1: false,
    2: false,
  });

  const [showFullGuideModal, setShowFullGuideModal] = useState<boolean>(false);
  const [activeCrop, setActiveCrop] = useState<'paddy' | 'tomato' | 'cotton'>('paddy');

  const toggleTask = (index: number) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const tasks = [
    {
      id: 0,
      titleEn: 'Apply urea (2-3 kg per acre)',
      titleTa: 'யூரியா உரமிடுதல் (ஏக்கருக்கு 2-3 கிலோ)',
      subEn: 'Top dressing during active tillering stage to boost vegetative branching.',
      subTa: 'தூர்கட்டும் பருவத்தில் கிளைகளை அதிகரிக்க மேலுரமாக இடவும்.',
      tag: 'Fertilizer'
    },
    {
      id: 1,
      titleEn: 'Ensure proper drainage (avoid waterlogging)',
      titleTa: 'சரியான வடிகால் வசதி (தேங்கி நிற்கும் நீரை அகற்றவும்)',
      subEn: 'Maintain 2-3 cm shallow water level; drain excess after heavy rain.',
      subTa: 'வயலில் 2-3 செ.மீ சீரான நீர்மட்டம் பேணவும்; மழைநீர் தேங்காமல் வடிக்கவும்.',
      tag: 'Water'
    },
    {
      id: 2,
      titleEn: 'Monitor for leaf folder pests & stem borers',
      titleTa: 'இலை சுருட்டு புழுக்கள் & தண்டு துளைப்பான் கண்காணிப்பு',
      subEn: 'Inspect leaf tips for pale webbing and shoot discoloration.',
      subTa: 'இலை விளிம்புகளில் சுருட்டை வலைகள் மற்றும் தண்டு வாட்டத்தை கண்காணிக்கவும்.',
      tag: 'Pest Alert'
    },
    {
      id: 3,
      titleEn: 'Foliar spray of micronutrient zinc sulfate (0.5%)',
      titleTa: 'துத்தநாக சல்பேட் நுண்ணூட்ட தெளிப்பு (0.5%)',
      subEn: 'Prevent Khaira disease and yellowing in early stage foliage.',
      subTa: 'இலைகளில் மஞ்சள் நிறம் படர்வதை தடுத்து செழிப்பை கூட்டவும்.',
      tag: 'Nutrition'
    }
  ];

  const completedCount = Object.values(completedTasks).filter(Boolean).length;

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
              <Sprout className="w-3 h-3 text-emerald-600" />
              <span>{language === 'ta' ? 'அறிவார்ந்த வேளாண் வழிகாட்டல்' : 'Agronomic Advisory'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'ta' ? 'பயிர் ஆலோசனை & பருவக்கால பணிகள்' : 'Crop Stage Advisory & Management'}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'ta'
                ? 'உங்கள் நிலத்தின் தற்போதைய வளர்ச்சி நிலைக்கான பிரத்யேக வேளாண் வழிகாட்டல்'
                : 'Actionable agronomic guidance tailored to your active crop growth stage'}
            </p>
          </div>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveCrop('paddy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCrop === 'paddy'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'ta' ? 'நெல்' : 'Paddy'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCrop('tomato')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCrop === 'tomato'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'ta' ? 'தக்காளி' : 'Tomato'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCrop('cotton')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCrop === 'cotton'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'ta' ? 'பருத்தி' : 'Cotton'}
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Active Field Banner & Task Checklist */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Field Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden shadow-xs border border-stone-200 h-48 sm:h-56 group">
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&auto=format&fit=crop&q=80"
              alt="Lush Paddy field"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-200 inline-block mb-1.5">
                  {language === 'ta' ? 'செயலில் உள்ள பயிர் • தாய் பட்டம்' : 'Active Field Crop • Thai Pattam'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {activeCrop === 'paddy'
                    ? language === 'ta' ? 'நெல் (CR 1009 Sub 1)' : 'Paddy (CR 1009 Sub 1)'
                    : activeCrop === 'tomato'
                    ? language === 'ta' ? 'தக்காளி (சிவம் ஹைபிரிட்)' : 'Shivam Hybrid Tomato'
                    : language === 'ta' ? 'பருத்தி (சுபிக்ஷா)' : 'Cotton (Subhiksha)'}
                </h3>
                <p className="text-xs text-emerald-100/90 mt-0.5">
                  {language === 'ta' ? 'வளர்ச்சி நிலை: தூர்கட்டும் பருவம் (Day 38)' : 'Growth Stage: Active Tillering (Day 38 of 125)'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shrink-0">
                <div className="flex justify-between text-[11px] font-bold text-white mb-1">
                  <span>{language === 'ta' ? 'பருவ முன்னேற்றம்' : 'Crop Cycle'}</span>
                  <span>45%</span>
                </div>
                <div className="w-32 sm:w-36 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[45%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Tasks Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-stone-900">
                  {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட களப்பணிகள்' : 'Recommended Field Tasks'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'ta'
                    ? `${tasks.length} பணிகளில் ${completedCount} முடிக்கப்பட்டுள்ளது`
                    : `${completedCount} of ${tasks.length} tasks completed`}
                </p>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-[#14532d]">
                {Math.round((completedCount / tasks.length) * 100)}% {language === 'ta' ? 'முடிந்தது' : 'Done'}
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task, idx) => {
                const isChecked = completedTasks[idx];
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(idx)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-stone-50/60 border-stone-200 hover:border-emerald-200 hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-[#14532d] text-white'
                          : 'border-2 border-stone-300 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p
                          className={`text-xs sm:text-sm font-bold transition-all ${
                            isChecked
                              ? 'line-through text-stone-400'
                              : 'text-stone-900'
                          }`}
                        >
                          {language === 'ta' ? task.titleTa : task.titleEn}
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-200/80 text-stone-700">
                          {task.tag}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        {language === 'ta' ? task.subTa : task.subEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Health, Weather & AI Doctor CTAs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick AI Crop Doctor Photo Diagnosis Trigger */}
          <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 backdrop-blur rounded-xl">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                    {language === 'ta' ? 'AI பயிர் மருத்துவர்' : 'AI Plant Doctor'}
                  </span>
                  <h3 className="text-base font-extrabold leading-tight">
                    {language === 'ta' ? 'இலை நோய்களை படம் எடுத்து அறிக' : 'Instant Leaf Photo Diagnostics'}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-amber-100 leading-relaxed">
                {language === 'ta'
                  ? 'பயிரில் மஞ்சள் புள்ளி, இலை சுருட்டு அல்லது வாடல் உள்ளதா? கேமரா மூலம் படம் எடுத்து உடனடியாக தீர்வு பெறுங்கள்.'
                  : 'Take a photo of any spotted or wilting leaves to receive instant AI diagnosis with organic & chemical treatment options.'}
              </p>

              <button
                type="button"
                onClick={() => {
                  if (onOpenCropDoctor) onOpenCropDoctor();
                  else if (onNavigateTab) onNavigateTab('ai_crop_doctor');
                }}
                className="w-full py-3 px-4 rounded-2xl bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4 text-amber-700" />
                <span>{language === 'ta' ? 'படம் எடுத்து பரிசோதிக்க' : 'Scan Crop Leaf Photo'}</span>
              </button>
            </div>
          </div>

          {/* Irrigation & Weather Advisory Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-blue-600" />
              <span>{language === 'ta' ? 'பாசன & மண் ஈரப்பதம் வழிகாட்டல்' : 'Irrigation & Soil Moisture'}</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                <span className="text-[10px] text-blue-700 font-bold block uppercase">
                  {language === 'ta' ? 'மண் ஈரப்பதம்' : 'Soil Moisture'}
                </span>
                <span className="text-lg font-black text-blue-950">68%</span>
                <span className="text-[10px] text-blue-700 block">
                  {language === 'ta' ? 'போதுமானது' : 'Adequate'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[10px] text-emerald-700 font-bold block uppercase">
                  {language === 'ta' ? 'அடுத்த பாசனம்' : 'Next Irrigation'}
                </span>
                <span className="text-lg font-black text-emerald-950">
                  {language === 'ta' ? '2 நாட்கள்' : 'In 2 Days'}
                </span>
                <span className="text-[10px] text-emerald-700 block">
                  {language === 'ta' ? 'குறைந்த நீர்' : 'Light watering'}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed pt-1">
              {language === 'ta'
                ? 'நாளை லேசான மழை வாய்ப்பு உள்ளதால் இன்று அதிக நீர் பாய்ச்சுவதை தவிர்க்கவும்.'
                : 'Light rain expected tomorrow evening. Avoid flood irrigation today to prevent root rot.'}
            </p>

            <button
              type="button"
              onClick={() => setShowFullGuideModal(true)}
              className="w-full py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-stone-600" />
              <span>{language === 'ta' ? 'முழுமையான வேளாண் கையேடு' : 'View Full Agronomy Guide'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Agronomy Guide Modal */}
      {showFullGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-stone-900">
                  {language === 'ta' ? 'நெல் சாகுபடி முழுமையான வழிகாட்டல்' : 'Paddy Agronomy Management Guide'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFullGuideModal(false)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <h4 className="font-bold text-[#14532d] mb-1">
                  1. {language === 'ta' ? 'தூர்கட்டும் பருவம் (Tillering Stage - Days 20 to 45)' : 'Active Tillering (Days 20 to 45)'}
                </h4>
                <p>
                  {language === 'ta'
                    ? 'இந்த பருவத்தில் ஒரு தூரில் 15 முதல் 20 பலமான கிளைகளை உருவாக்குவதே இலக்கு. ஏக்கருக்கு 25 கிலோ யூரியா மற்றும் 10 கிலோ பொட்டாஷ் உரங்களை சீராக இடவும்.'
                    : 'Goal is 15–20 productive tillers per hill. Apply 25 kg urea and 10 kg potash split-dose top dressing with 2 cm shallow standing water.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-1">
                  2. {language === 'ta' ? 'நீர் மேலாண்மை (AWD System)' : 'Water Management (Alternate Wetting & Drying)'}
                </h4>
                <p>
                  {language === 'ta'
                    ? 'தொடர்ந்து அதிக நீர் தேக்குவதை தவிர்த்து, 2 செ.மீ நீர் வற்றி நிலத்தில் சிறிய கீறல் விழுந்ததும் அடுத்த நீர் பாய்ச்சவும். இது வேர்களுக்கு பிராணவாயுவை கொடுக்கும்.'
                    : 'Allow water to drop naturally below soil surface before re-irrigating to boost root aeration and reduce methane emissions by 30%.'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100">
                <h4 className="font-bold text-amber-900 mb-1">
                  3. {language === 'ta' ? 'இயற்கை பூச்சி விரட்டி (Neem Oil Spray)' : 'Organic Pest Management'}
                </h4>
                <p>
                  {language === 'ta'
                    ? 'இலைசுருட்டு புழு தென்பட்டால் 1 லிட்டர் நீருக்கு 5 மி.லி வேப்பெண்ணெய் மற்றும் காதி சோப்பு கரைசல் கலந்து மாலை வேளையில் தெளிக்கவும்.'
                    : 'At first sign of leaf webbing, spray cold-pressed 10,000 ppm Azadirachtin (Neem Oil) at 3 ml/liter in evening hours.'}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowFullGuideModal(false)}
                className="w-full py-3 rounded-2xl bg-[#14532d] hover:bg-[#166534] text-white font-bold text-xs cursor-pointer"
              >
                {language === 'ta' ? 'புரிந்தது, மூடு' : 'Got it, Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
