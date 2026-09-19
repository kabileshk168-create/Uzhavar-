import React from 'react';
import {
  Mic,
  TrendingUp,
  Store,
  Package,
  Camera,
  GraduationCap,
  Building2,
  Truck,
  Calculator,
  CloudSun,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Play,
  Sprout,
  Users,
  LineChart,
  Bell
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { mockCropsData, mockWeatherData } from '../data/mockData';

interface HomeScreenProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenVoice: () => void;
  onOpenVoiceWithQuery: (query: string) => void;
  onStartDemoJourney: () => void;
  currentRole: UserRole;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onNavigate,
  onOpenVoice,
  onOpenVoiceWithQuery,
  onStartDemoJourney,
  currentRole
}) => {
  const weather = mockWeatherData;

  const quickActions = [
    {
      id: 'price_prediction',
      titleTa: 'AI விலை கணிப்பு & முன்கணிப்பு',
      titleEn: 'AI Price Forecasting',
      subtitleTa: 'அடுத்த 7-30 நாட்கள் விலை போக்கு கணிப்பு',
      subtitleEn: 'Predictive trajectories & harvest timing',
      icon: LineChart,
      color: 'bg-emerald-50 text-[#14532d] border-emerald-200',
      badge: 'AI Model'
    },
    {
      id: 'market',
      titleTa: 'இன்றைய சந்தை விலை',
      titleEn: 'Market Prices',
      subtitleTa: 'அருகாமை & மாநில மண்டி நிலவரம்',
      subtitleEn: 'Real-time APMC Mandi Rates',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badge: language === 'ta' ? 'அதிக லாபம்' : 'Best Returns'
    },
    {
      id: 'crop_advisory',
      titleTa: 'பயிர் ஆலோசனை & பணிகள்',
      titleEn: 'Crop Stage Advisory',
      subtitleTa: 'பயிர் வளர்ச்சி நிலை மற்றும் உரம், நீர் பணிகள்',
      subtitleEn: 'Agronomic guidance tailored to growth stage',
      icon: Sprout,
      color: 'bg-teal-50 text-teal-900 border-teal-200',
    },
    {
      id: 'price_alert',
      titleTa: 'விலை எச்சரிக்கை அமைப்பு',
      titleEn: 'Set Price Alerts',
      subtitleTa: 'விலை மாற்றங்களை SMS/WhatsApp-ல் அறியுங்கள்',
      subtitleEn: 'Automated SMS & WhatsApp triggers',
      icon: Bell,
      color: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    {
      id: 'marketplace',
      titleTa: 'நேரடி விற்பனை & வாங்குவோர்',
      titleEn: 'Direct Buyers & Sell',
      subtitleTa: 'இடைத்தரகர்கள் இல்லாத நேரடி வியாபாரம்',
      subtitleEn: 'Zero Middlemen Trade',
      icon: Store,
      color: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      id: 'farm_services',
      titleTa: 'விதை & இடுபொருட்கள்',
      titleEn: 'Seeds & Inputs Store',
      subtitleTa: 'சான்றளித்த விதைகள் & உயிரி உரங்கள்',
      subtitleEn: 'Certified High-Yield Seeds',
      icon: Package,
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      id: 'future_ai',
      titleTa: 'Gemini AI மல்டிமாடல் மையம்',
      titleEn: 'Gemini AI Studio',
      subtitleTa: 'சாட்பாட், நேரடி வரைபடம், Veo வீடியோ, Lyria இசை',
      subtitleEn: 'Chatbot, Maps Grounding, Veo Video, Lyria Music',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-900 border-purple-200',
      badge: language === 'ta' ? '8 AI கருவிகள்' : '8 Models Live'
    },
    {
      id: 'ai_crop_doctor',
      titleTa: 'பயிர் மருத்துவர் (AI Photo)',
      titleEn: 'AI Crop Doctor',
      subtitleTa: 'இலை படம் எடுத்து நோய் அறியுங்கள்',
      subtitleEn: 'Leaf Photo Diagnostics',
      icon: Camera,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      tag: 'AI Photo'
    },
    {
      id: 'learning',
      titleTa: 'விவசாயம் கற்போம்',
      titleEn: 'Learn Farming',
      subtitleTa: 'ஆரம்பநிலை படிப்பினைகள் & வீடியோ',
      subtitleEn: 'Beginner Video Guides',
      icon: GraduationCap,
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      id: 'government',
      titleTa: 'அரசு நலத்திட்டங்கள்',
      titleEn: 'Govt Schemes',
      subtitleTa: 'PM-கிசான், மானியம் & அலுவலர் எண்',
      subtitleEn: 'Subsidies & Agri Officers',
      icon: Building2,
      color: 'bg-rose-50 text-rose-800 border-rose-200',
    },
    {
      id: 'profit_calc',
      titleTa: 'லாப கால்குலேட்டர்',
      titleEn: 'Profit Planner',
      subtitleTa: 'உற்பத்தி செலவு & நிகர லாபம் கணக்கிடுக',
      subtitleEn: 'Farm Budget & Net Margin',
      icon: Calculator,
      color: 'bg-lime-50 text-lime-900 border-lime-200',
    },
    {
      id: 'transport',
      titleTa: 'சரக்கு & லாரி வசதி',
      titleEn: 'Smart Transport',
      subtitleTa: 'பகிர்வு லாரி மூலம் 40% சேமிப்பு',
      subtitleEn: 'Mandi Freight & Pooling',
      icon: Truck,
      color: 'bg-orange-50 text-orange-900 border-orange-200',
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Hero Card with Prominent Voice Trigger */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-emerald-100 text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-emerald-300" />
              <span>UZHAVAR+ • Speak. Learn. Grow. Sell.</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              {language === 'ta' ? 'வணக்கம், Ramesh!' : 'Vanakkam, Ramesh!'}
            </h1>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-100 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                Vadipatti, Madurai
              </span>
              <span>•</span>
              <span
                onClick={() => onNavigate('weather')}
                className="flex items-center gap-1 hover:underline cursor-pointer"
              >
                <CloudSun className="w-3.5 h-3.5 text-emerald-300" />
                {weather.temperature}°C Part-cloudy
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg pt-1">
              {language === 'ta'
                ? 'விவசாயிகளுக்கான குரல் வழி வழிகாட்டி. சந்தை விலை, வாங்குவோர் மற்றும் சாகுபடி ஆலோசனைகளை நேரடியாக பேசி அறியலாம்.'
                : 'Your voice-first agricultural companion. Compare mandi net returns, connect directly with buyers, and learn modern farming.'}
            </p>
          </div>

          {/* Big Voice Assistant Action Center Button */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
            <p className="text-xs font-bold text-emerald-100 uppercase tracking-wider mb-2">
              {language === 'ta' ? 'குரல் வழி பயன்பாடு' : 'Voice-First Assistant'}
            </p>

            <button
              onClick={onOpenVoice}
              id="hero-voice-assistant-btn"
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all flex items-center justify-center shadow-2xl shadow-black/20 cursor-pointer group relative"
            >
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400/40 animate-ping opacity-60 pointer-events-none" />
              <Mic className="w-10 h-10 sm:w-11 sm:h-11 group-hover:scale-110 transition-transform text-emerald-600" />
            </button>

            <span className="text-xs font-extrabold text-white mt-2.5">
              {language === 'ta' ? '🎙️ "பேசுங்கள்..."' : '🎙️ "Tap and Speak"'}
            </span>
            <span className="text-[10px] text-emerald-200 mt-0.5">
              {language === 'ta' ? 'தமிழில் பேசலாம்' : 'Tamil & English Supported'}
            </span>
          </div>
        </div>

        {/* Quick Voice Prompt Chips inside Hero */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-emerald-200 shrink-0">
            {language === 'ta' ? 'கேட்டுப்பாருங்கள்:' : 'Try saying:'}
          </span>
          {[
            { qTa: 'இன்னைக்கு தக்காளி விலை என்ன?', qEn: 'What is today tomato price?' },
            { qTa: 'எங்கே விற்றா நல்ல விலை கிடைக்கும்?', qEn: 'Where to sell for highest profit?' },
            { qTa: 'எனக்கு விதை வேண்டும்', qEn: 'I need certified seeds' },
            { qTa: 'நான் புதுசா farming ஆரம்பிக்கிறேன்', qEn: 'I am a beginner in farming' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onOpenVoiceWithQuery(language === 'ta' ? item.qTa : item.qEn)}
              className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs whitespace-nowrap transition-colors cursor-pointer border border-white/10"
            >
              🎙️ "{language === 'ta' ? item.qTa : item.qEn}"
            </button>
          ))}
        </div>
      </div>

      {/* 1-Click Interactive Demo Flow Launcher Banner (Section 30) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-sm shrink-0">
            <Play className="w-5 h-5 ml-0.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                Prototype Walkthrough
              </span>
              <span className="text-xs text-amber-800 font-semibold">
                {language === 'ta' ? 'முழுமையான மாதிரி பயணம்' : 'Complete User Flow'}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-stone-900 mt-1">
              {language === 'ta' ? '1-கிளிக் நேரடி செயல்விளக்கம் (Voice → Market → Buyer → Listing)' : '1-Click End-to-End Demo Journey'}
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              {language === 'ta'
                ? 'குரல் கேள்வி → சந்தை விலை ஒப்பீடு → நேரடி வாங்குவோர் தேர்வு → விளைபொருளை பதிவிடுதல் முழு சுழற்சியை ஒரே தட்டலில் இயக்கி பாருங்கள்.'
                : 'Runs the core flow: Tomato voice query -> Chennai vs Madurai comparison -> Verified buyer selection -> Live listing.'}
            </p>
          </div>
        </div>

        <button
          onClick={onStartDemoJourney}
          id="start-demo-journey-btn"
          className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <span>{language === 'ta' ? 'செயல்விளக்கத்தை தொடங்கு' : 'Launch Demo Journey'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Real-Time Market Commodity Snapshot Ticker */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="font-bold text-stone-900 text-sm sm:text-base">
              {language === 'ta' ? 'நேரடி சந்தை விலை சுருக்கம்' : 'Live Commodity Price Ticker'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('market')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'ta' ? 'அனைத்து சந்தைகளையும் காண்க' : 'Compare All Markets'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {mockCropsData.map(crop => (
            <div
              key={crop.id}
              onClick={() => onNavigate('market')}
              className="p-3.5 rounded-2xl bg-stone-50 hover:bg-emerald-50/50 border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">
                  {language === 'ta' ? crop.cropNameTamil : crop.cropName}
                </span>
                <span className={`text-[11px] font-bold ${crop.changePercent >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {crop.changePercent >= 0 ? `+${crop.changePercent}%` : `${crop.changePercent}%`}
                </span>
              </div>
              <div className="text-lg font-black text-stone-900">
                ₹{crop.currentPrice}
                <span className="text-xs font-normal text-stone-500">/{crop.unit}</span>
              </div>
              <p className="text-[10px] text-stone-500 truncate">
                High: {crop.highestMarket.split(' ')[0]} (₹{crop.markets[1].price})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Grid (Section 6) */}
      <div>
        <h2 className="font-bold text-stone-900 text-base mb-3">
          {language === 'ta' ? 'முக்கிய சேவைகள் (Quick Actions)' : 'Farming Services & Modules'}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => {
                  if (action.id === 'ai_crop_doctor') {
                    onNavigate('ai_crop_doctor');
                  } else {
                    onNavigate(action.id);
                  }
                }}
                className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between hover:shadow-md hover:scale-102 ${action.color}`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-2xl bg-white shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    {action.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-700 text-white px-2 py-0.5 rounded-full">
                        {action.badge}
                      </span>
                    )}
                    {action.tag && (
                      <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                        {action.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                    {language === 'ta' ? action.titleTa : action.titleEn}
                  </h3>
                </div>

                <p className="text-[11px] text-stone-600 mt-2 line-clamp-2">
                  {language === 'ta' ? action.subtitleTa : action.subtitleEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farmer Active Harvest Snapshot Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              {language === 'ta' ? 'உங்கள் பண்ணை நிலை' : 'Your Harvest Status'}
            </span>
            <span className="text-xs text-stone-400">Thai Pattam Season</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900">
            {language === 'ta' ? '1,800 கிலோ தக்காளி அறுவடைக்கு தயார்' : '1,800 kg Shivam Tomato Ready for Harvest'}
          </h3>
          <p className="text-xs text-stone-600">
            {language === 'ta'
              ? 'சென்னை கோயம்பேடு சந்தையில் ₹30.8/kg நிகர லாபம் (போக்குவரத்து கழித்த பின்). மதுரை சந்தையை விட ₹2.8/kg கூடுதல் லாபம்.'
              : 'Estimated net return is ₹30.8/kg in Chennai Mandi after logistics. Gain +₹2.8/kg over local Madurai Mandi.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('market')}
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs cursor-pointer"
          >
            {language === 'ta' ? 'சந்தை ஒப்பீடு' : 'View Mandis'}
          </button>
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            {language === 'ta' ? 'விற்பனை செய்' : 'Sell to Buyer'}
          </button>
        </div>
      </div>
    </div>
  );
};
