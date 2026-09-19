import React, { useState } from 'react';
import {
  Wifi,
  Battery,
  Signal,
  Home,
  Tag,
  Sprout,
  User,
  Smartphone,
  LayoutGrid,
  Maximize2,
  Sparkles,
  Layers,
  ChevronRight,
  Globe
} from 'lucide-react';
import { Language } from '../../types';
import { WelcomeScreen } from './WelcomeScreen';
import { HomeScreenAgri } from './HomeScreenAgri';
import { PricePredictionScreen } from './PricePredictionScreen';
import { MarketTrendsScreen } from './MarketTrendsScreen';
import { WeatherScreen } from './WeatherScreen';
import { CropAdvisoryScreen } from './CropAdvisoryScreen';
import { SetPriceAlertScreen } from './SetPriceAlertScreen';
import { ProfileScreen } from './ProfileScreen';
import { FutureAIFeatures } from '../FutureAIFeatures';

interface AgriNextDeviceViewProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenVoice: () => void;
  onNavigateToFullApp?: (tab: string) => void;
}

export type AgriScreenType =
  | 'welcome'
  | 'home'
  | 'price_prediction'
  | 'market_trends'
  | 'weather_view'
  | 'crop_advisory'
  | 'price_alert'
  | 'profile'
  | 'future_ai';

export const AgriNextDeviceView: React.FC<AgriNextDeviceViewProps> = ({
  language,
  onToggleLanguage,
  onOpenVoice,
  onNavigateToFullApp,
}) => {
  const [currentScreen, setCurrentScreen] = useState<AgriScreenType>('home');
  const [viewMode, setViewMode] = useState<'phone' | 'board' | 'responsive'>('phone');
  const [selectedCropIdForPrediction, setSelectedCropIdForPrediction] = useState<string>('tomato');

  // Bottom Navigation helper
  const isBottomNavVisible =
    currentScreen !== 'welcome' &&
    currentScreen !== 'future_ai';

  const getActiveBottomTab = () => {
    if (currentScreen === 'home') return 'home';
    if (currentScreen === 'price_prediction' || currentScreen === 'market_trends') return 'prices';
    if (currentScreen === 'crop_advisory' || currentScreen === 'weather_view') return 'advisory';
    if (currentScreen === 'profile' || currentScreen === 'price_alert') return 'profile';
    return 'home';
  };

  const renderScreenContent = (screen: AgriScreenType) => {
    switch (screen) {
      case 'welcome':
        return (
          <WelcomeScreen
            language={language}
            onGetStarted={() => setCurrentScreen('home')}
            onLogin={() => setCurrentScreen('home')}
          />
        );
      case 'home':
        return (
          <HomeScreenAgri
            language={language}
            onNavigateScreen={(scr) => setCurrentScreen(scr as AgriScreenType)}
          />
        );
      case 'price_prediction':
        return (
          <PricePredictionScreen
            language={language}
            onBack={() => setCurrentScreen('home')}
            onNavigateScreen={(scr) => setCurrentScreen(scr as AgriScreenType)}
          />
        );
      case 'market_trends':
        return (
          <MarketTrendsScreen
            language={language}
            onBack={() => setCurrentScreen('home')}
            onSelectCrop={(cropId) => {
              setSelectedCropIdForPrediction(cropId);
              setCurrentScreen('price_prediction');
            }}
          />
        );
      case 'weather_view':
        return (
          <WeatherScreen
            language={language}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'crop_advisory':
        return (
          <CropAdvisoryScreen
            language={language}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'price_alert':
        return (
          <SetPriceAlertScreen
            language={language}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            language={language}
            onBack={() => setCurrentScreen('home')}
            onToggleLanguage={onToggleLanguage}
            onNavigateScreen={(scr) => setCurrentScreen(scr as AgriScreenType)}
          />
        );
      case 'future_ai':
        return (
          <div className="p-4 bg-emerald-50/50 min-h-full">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <button
                type="button"
                onClick={() => setCurrentScreen('home')}
                className="text-xs font-bold text-[#14532d] hover:underline"
              >
                ← {language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Back to Home'}
              </button>
              <span className="text-xs font-bold text-[#14532d] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Gemini AI Studio
              </span>
            </div>
            <FutureAIFeatures
              language={language}
              onNavigate={(tab) => {
                if (onNavigateToFullApp) onNavigateToFullApp(tab);
              }}
            />
          </div>
        );
      default:
        return (
          <HomeScreenAgri
            language={language}
            onNavigateScreen={(scr) => setCurrentScreen(scr as AgriScreenType)}
          />
        );
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Experience Control Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#14532d] tracking-tight flex items-center gap-2">
              <span>AgriNext Mobile UI Experience</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-[#14532d] px-2 py-0.5 rounded-full">
                Design Match
              </span>
            </h2>
            <p className="text-xs text-[#52796f]">
              {language === 'ta'
                ? 'வடிவமைப்பிலுள்ள அனைத்து 8 திரைகளும் நேரடி செயல்பாட்டில் உள்ளன'
                : 'All 8 screens from the design mockup are fully live and interactive'}
            </p>
          </div>
        </div>

        {/* Center & Right Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-emerald-50/90 p-1 rounded-2xl border border-emerald-100">
            <button
              type="button"
              onClick={() => setViewMode('phone')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'phone'
                  ? 'bg-[#14532d] text-white shadow-xs'
                  : 'text-[#52796f] hover:text-[#14532d]'
              }`}
              title="Interactive Phone Device"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'மொபைல்' : 'Phone'}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-[#14532d] text-white shadow-xs'
                  : 'text-[#52796f] hover:text-[#14532d]'
              }`}
              title="All 8 Screens Board"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? '8 திரைகள்' : 'All 8 Screens'}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('responsive')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'responsive'
                  ? 'bg-[#14532d] text-white shadow-xs'
                  : 'text-[#52796f] hover:text-[#14532d]'
              }`}
              title="Full Width View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'முழுத்திரை' : 'Full Screen'}</span>
            </button>
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="px-3 py-1.5 rounded-2xl border border-emerald-200 bg-white text-[#14532d] text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
          </button>
        </div>
      </div>

      {/* Screen Selection Quick Pills (Jump directly to any of the 8 screens) */}
      <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-2 border border-emerald-100/80 shadow-2xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-[#52796f] px-2 uppercase tracking-wider shrink-0">
          {language === 'ta' ? 'திரைகள்:' : 'Screens:'}
        </span>
        {[
          { id: 'welcome', labelEn: '1. Welcome', labelTa: '1. வரவேற்பு' },
          { id: 'home', labelEn: '2. Home', labelTa: '2. முகப்பு' },
          { id: 'price_prediction', labelEn: '3. Price Prediction', labelTa: '3. விலை கணிப்பு' },
          { id: 'market_trends', labelEn: '4. Market Trends', labelTa: '4. சந்தை நிலவரம்' },
          { id: 'weather_view', labelEn: '5. Weather', labelTa: '5. வானிலை' },
          { id: 'crop_advisory', labelEn: '6. Crop Advisory', labelTa: '6. பயிர் ஆலோசனை' },
          { id: 'price_alert', labelEn: '7. Set Price Alert', labelTa: '7. விலை எச்சரிக்கை' },
          { id: 'profile', labelEn: '8. Profile', labelTa: '8. சுயவிவரம்' },
          { id: 'future_ai', labelEn: '✨ Gemini AI Hub', labelTa: '✨ AI மையம்' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCurrentScreen(item.id as AgriScreenType);
              if (viewMode === 'board') setViewMode('phone');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              currentScreen === item.id
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-[#52796f] hover:bg-emerald-50 hover:text-[#14532d]'
            }`}
          >
            {language === 'ta' ? item.labelTa : item.labelEn}
          </button>
        ))}
      </div>

      {/* VIEW MODE 1: Single Interactive Phone Device */}
      {viewMode === 'phone' && (
        <div className="flex justify-center items-center py-4">
          <div className="relative w-full max-w-[390px] min-h-[780px] bg-white rounded-[46px] shadow-[0_25px_60px_-15px_rgba(20,83,45,0.25)] border-[10px] border-stone-800 ring-1 ring-stone-900/20 overflow-hidden flex flex-col justify-between">
            {/* Top Device Notch & Status Bar */}
            <div className="bg-gradient-to-b from-[#edf7ed] to-[#edf7ed] pt-2 pb-1 px-7 flex items-center justify-between z-40 select-none">
              <span className="text-xs font-bold text-[#14532d] font-mono">9:41</span>

              {/* Dynamic Island / Speaker */}
              <div className="w-20 h-4 bg-stone-900 rounded-full mx-auto shadow-inner" />

              <div className="flex items-center gap-1.5 text-[#14532d]">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Screen Content Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#edf7ed] relative">
              {renderScreenContent(currentScreen)}
            </div>

            {/* Authentic AgriNext Bottom Navigation Bar */}
            {isBottomNavVisible && (
              <div className="bg-white/95 backdrop-blur-md border-t border-emerald-100 py-2 px-4 flex items-center justify-around z-30 select-none shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                {/* Home */}
                <button
                  type="button"
                  onClick={() => setCurrentScreen('home')}
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                    getActiveBottomTab() === 'home'
                      ? 'text-[#14532d]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>{language === 'ta' ? 'முகப்பு' : 'Home'}</span>
                </button>

                {/* Prices */}
                <button
                  type="button"
                  onClick={() => setCurrentScreen('price_prediction')}
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                    getActiveBottomTab() === 'prices'
                      ? 'text-[#14532d]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <Tag className="w-5 h-5" />
                  <span>{language === 'ta' ? 'விலைகள்' : 'Prices'}</span>
                </button>

                {/* Advisory */}
                <button
                  type="button"
                  onClick={() => setCurrentScreen('crop_advisory')}
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                    getActiveBottomTab() === 'advisory'
                      ? 'text-[#14532d]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <Sprout className="w-5 h-5" />
                  <span>{language === 'ta' ? 'ஆலோசனை' : 'Advisory'}</span>
                </button>

                {/* Profile */}
                <button
                  type="button"
                  onClick={() => setCurrentScreen('profile')}
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                    getActiveBottomTab() === 'profile'
                      ? 'text-[#14532d]'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>{language === 'ta' ? 'சுயவிவரம்' : 'Profile'}</span>
                </button>
              </div>
            )}

            {/* Bottom Home Indicator Bar */}
            <div className="bg-white py-1 flex justify-center">
              <div className="w-32 h-1 bg-stone-300 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: All 8 Screens Board (Exact Layout as in Uploaded Design Mockup) */}
      {viewMode === 'board' && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
            <h3 className="text-sm font-bold text-[#14532d]">
              {language === 'ta'
                ? 'அனைத்து 8 திரைகளின் நேரடி வடிவமைப்பு காட்சி பலகை'
                : 'All 8 Screens Design Artboard (Direct Replica of Mockup Image)'}
            </h3>
            <p className="text-xs text-[#52796f] mt-0.5">
              {language === 'ta'
                ? 'எந்தவொரு திரையையும் கிளிக் செய்து நேரடியாக பெரிதாக்கலாம்'
                : 'Click any screen to open and interact in full device mode'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Screen 1: Welcome */}
            <div
              onClick={() => {
                setCurrentScreen('welcome');
                setViewMode('phone');
              }}
              className="bg-white rounded-[36px] border-[6px] border-stone-800 shadow-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-400 transition-all group relative"
            >
              <div className="bg-emerald-800 text-white text-[10px] font-bold text-center py-1">
                Screen 1: Welcome Splash
              </div>
              <div className="h-[520px] overflow-hidden pointer-events-none scale-95 origin-top">
                <WelcomeScreen
                  language={language}
                  onGetStarted={() => {}}
                  onLogin={() => {}}
                />
              </div>
            </div>

            {/* Screen 2: Home */}
            <div
              onClick={() => {
                setCurrentScreen('home');
                setViewMode('phone');
              }}
              className="bg-white rounded-[36px] border-[6px] border-stone-800 shadow-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-400 transition-all group relative"
            >
              <div className="bg-emerald-800 text-white text-[10px] font-bold text-center py-1">
                Screen 2: Home Dashboard
              </div>
              <div className="h-[520px] overflow-hidden pointer-events-none scale-95 origin-top">
                <HomeScreenAgri
                  language={language}
                  onNavigateScreen={() => {}}
                />
              </div>
            </div>

            {/* Screen 3: Price Prediction */}
            <div
              onClick={() => {
                setCurrentScreen('price_prediction');
                setViewMode('phone');
              }}
              className="bg-white rounded-[36px] border-[6px] border-stone-800 shadow-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-400 transition-all group relative"
            >
              <div className="bg-emerald-800 text-white text-[10px] font-bold text-center py-1">
                Screen 3: Price Prediction
              </div>
              <div className="h-[520px] overflow-hidden pointer-events-none scale-95 origin-top">
                <PricePredictionScreen
                  language={language}
                  onBack={() => {}}
                />
              </div>
            </div>

            {/* Screen 4: Market Trends */}
            <div
              onClick={() => {
                setCurrentScreen('market_trends');
                setViewMode('phone');
              }}
              className="bg-white rounded-[36px] border-[6px] border-stone-800 shadow-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-400 transition-all group relative"
            >
              <div className="bg-emerald-800 text-white text-[10px] font-bold text-center py-1">
                Screen 4: Market Trends
              </div>
              <div className="h-[520px] overflow-hidden pointer-events-none scale-95 origin-top">
                <MarketTrendsScreen
                  language={language}
                  onBack={() => {}}
                />
              </div>
            </div>

            {/* Screen 5: Weather */}
            <div
              onClick={() => {
                setCurrentScreen('weather_view');
                setViewMode('phone');
              }}
              className="bg-white rounded-[36px] border-[6px] border-stone-800 shadow-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-400 transition-all group relative"
            >
              <div className="bg-emerald-800 text-white text-[10px] font-bold text-center py-1">
                Screen 5: Weather
              </div>
              <div className="h-[520px] overflow-hidden pointer-events-none scale-95 origin-top">
                <WeatherScreen
                  language={language}
                  onBack={() => {}}
                />
              </div>
            </div>

            {/* Screen 6: Crop Advisory */}
            <div
              onClick={() => {
                setCurrentScreen('crop_advisory');
                setViewMode('phone');
              }}
              className="bg-white rounded-[36px] border-[6px] border-stone-800 shadow-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-400 transition-all group relative"
            >
              <div className="bg-emerald-800 text-white text-[10px] font-bold text-center py-1">
                Screen 6: Crop Advisory
              </div>
              <div className="h-[520px] overflow-hidden pointer-events-none scale-95 origin-top">
                <CropAdvisoryScreen
                  language={language}
                  onBack={() => {}}
                />
              </div>
            </div>

            {/* Screen 7: Set Price Alert */}
            <div
              onClick={() => {
                setCurrentScreen('price_alert');
                setViewMode('phone');
              }}
              className="bg-white rounded-[36px] border-[6px] border-stone-800 shadow-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-400 transition-all group relative"
            >
              <div className="bg-emerald-800 text-white text-[10px] font-bold text-center py-1">
                Screen 7: Set Price Alert
              </div>
              <div className="h-[520px] overflow-hidden pointer-events-none scale-95 origin-top">
                <SetPriceAlertScreen
                  language={language}
                  onBack={() => {}}
                />
              </div>
            </div>

            {/* Screen 8: Profile */}
            <div
              onClick={() => {
                setCurrentScreen('profile');
                setViewMode('phone');
              }}
              className="bg-white rounded-[36px] border-[6px] border-stone-800 shadow-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-emerald-400 transition-all group relative"
            >
              <div className="bg-emerald-800 text-white text-[10px] font-bold text-center py-1">
                Screen 8: Profile
              </div>
              <div className="h-[520px] overflow-hidden pointer-events-none scale-95 origin-top">
                <ProfileScreen
                  language={language}
                  onBack={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: Responsive Full Width Dashboard */}
      {viewMode === 'responsive' && (
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-6 max-w-4xl mx-auto overflow-hidden">
          {renderScreenContent(currentScreen)}
        </div>
      )}
    </div>
  );
};
