import React from 'react';
import {
  Home,
  Mic,
  TrendingUp,
  Store,
  Users,
  GraduationCap,
  Building2,
  CloudSun,
  Calculator,
  Truck,
  FileSpreadsheet,
  Settings,
  Sparkles,
  Package,
  Sprout,
  Bell,
  LineChart
} from 'lucide-react';
import { Language } from '../types';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  language
}) => {
  const navItems = [
    {
      id: 'home',
      labelTa: 'முகப்பு பலகை',
      labelEn: 'Dashboard',
      icon: Home,
    },
    {
      id: 'price_prediction',
      labelTa: 'AI விலை கணிப்பு',
      labelEn: 'AI Price Forecast',
      icon: LineChart,
      highlight: true,
      badge: 'AI'
    },
    {
      id: 'market',
      labelTa: 'மண்டி சந்தை நிலவரம்',
      labelEn: 'Mandi Market Prices',
      icon: TrendingUp,
      badge: language === 'ta' ? 'முக்கியம்' : 'Core'
    },
    {
      id: 'crop_advisory',
      labelTa: 'பயிர் ஆலோசனை & பணிகள்',
      labelEn: 'Crop Advisory & Tasks',
      icon: Sprout,
    },
    {
      id: 'price_alert',
      labelTa: 'விலை எச்சரிக்கை அமைப்பு',
      labelEn: 'Price Alerts',
      icon: Bell,
    },
    {
      id: 'marketplace',
      labelTa: 'நேரடி விற்பனை & வாங்குவோர்',
      labelEn: 'Direct Sell & Buyers',
      icon: Store,
    },
    {
      id: 'farm_services',
      labelTa: 'விதை & இடுபொருட்கள்',
      labelEn: 'Seeds & Inputs',
      icon: Package,
    },
    {
      id: 'weather',
      labelTa: 'வானிலை ஆலோசனை',
      labelEn: 'Weather & Irrigation',
      icon: CloudSun,
    },
    {
      id: 'profit_calc',
      labelTa: 'லாப கால்குலேட்டர்',
      labelEn: 'Profit Planner',
      icon: Calculator,
    },
    {
      id: 'transport',
      labelTa: 'சரக்கு போக்குவரத்து',
      labelEn: 'Smart Transport',
      icon: Truck,
    },
    {
      id: 'community',
      labelTa: 'உழவர் சமூகம்',
      labelEn: 'Farmer Community',
      icon: Users,
    },
    {
      id: 'learning',
      labelTa: 'விவசாயம் கற்போம்',
      labelEn: 'Learn Farming',
      icon: GraduationCap,
    },
    {
      id: 'government',
      labelTa: 'அரசு சேவைகள் & மானியம்',
      labelEn: 'Govt Schemes',
      icon: Building2,
    },
    {
      id: 'future_ai',
      labelTa: 'AI மையம் & டூல்ஸ்',
      labelEn: 'Gemini AI Studio',
      icon: Sparkles,
      tag: '8 Tools Live'
    },
    {
      id: 'reports',
      labelTa: 'பண்ணை அறிக்கை & கணக்கு',
      labelEn: 'Farmer Report & Accounts',
      icon: FileSpreadsheet,
    },
    {
      id: 'settings',
      labelTa: 'அமைப்புகள் & பாதுகாப்பு',
      labelEn: 'Settings & Trust',
      icon: Settings,
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white border-r border-stone-200 min-h-[calc(100vh-65px)] sticky top-[65px] p-4 select-none shrink-0">
      <div className="space-y-1 overflow-y-auto pr-1 flex-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                  : item.highlight
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-600' : 'text-stone-500'}`} />
                <span className="truncate">
                  {language === 'ta' ? item.labelTa : item.labelEn}
                </span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.badge}
                </span>
              )}
              {item.tag && (
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                }`}>
                  {item.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Trust & Voice Banner in Sidebar */}
      <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-100 text-left">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{language === 'ta' ? 'குரல் வழி பயன்பாடு' : 'Voice-First Companion'}</span>
        </div>
        <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
          {language === 'ta' 
            ? 'டைப் செய்ய தேவையில்லை. எப்போது வேண்டுமானாலும் மைக் பட்டனை அழுத்தி தமிழில் பேசலாம்.'
            : 'No need to type. Tap the mic anytime and speak in Tamil or English.'}
        </p>
      </div>
    </aside>
  );
};
