import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  User,
  Bell,
  Bookmark,
  Globe,
  HelpCircle,
  Settings,
  LogOut,
  MapPin,
  Check
} from 'lucide-react';
import { Language } from '../../types';

interface ProfileScreenProps {
  language: Language;
  onBack: () => void;
  onToggleLanguage?: () => void;
  onNavigateScreen?: (screenId: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  language,
  onBack,
  onToggleLanguage,
  onNavigateScreen,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'farm_details',
      labelEn: 'My Farm Details',
      labelTa: 'எனது பண்ணை விவரங்கள்',
      icon: MapPin,
      badge: language === 'ta' ? '3.5 ஏக்கர்' : '3.5 Acres',
    },
    {
      id: 'price_alerts',
      labelEn: 'Price Alerts',
      labelTa: 'விலை எச்சரிக்கைகள்',
      icon: Bell,
      badge: '2 Active',
      action: () => onNavigateScreen && onNavigateScreen('price_alert'),
    },
    {
      id: 'saved_crops',
      labelEn: 'Saved Crops',
      labelTa: 'சேமிக்கப்பட்ட பயிர்கள்',
      icon: Bookmark,
      badge: 'Tomato, Paddy',
    },
    {
      id: 'language',
      labelEn: 'Language',
      labelTa: 'மொழி',
      icon: Globe,
      value: language === 'ta' ? 'தமிழ்' : 'English',
      action: onToggleLanguage,
    },
    {
      id: 'help',
      labelEn: 'Help & Support',
      labelTa: 'உதவி மற்றும் ஆதரவு',
      icon: HelpCircle,
      action: () => setActiveModal('help'),
    },
    {
      id: 'settings',
      labelEn: 'Settings',
      labelTa: 'அமைப்புகள்',
      icon: Settings,
      action: () => setActiveModal('settings'),
    },
  ];

  return (
    <div className="w-full h-full min-h-[580px] flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-b from-[#edf7ed] via-[#f4fbf5] to-[#ebf6ee] text-[#1b4332] select-none">
      <div className="space-y-5">
        {/* Top Header */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/90 border border-emerald-100 flex items-center justify-center text-[#14532d] shadow-xs hover:bg-emerald-50 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-[#14532d] tracking-tight">
            {language === 'ta' ? 'சுயவிவரம்' : 'Profile'}
          </h2>
        </div>

        {/* Farmer Profile Header Card */}
        <div className="bg-white/95 rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-sm flex items-center gap-4">
          {/* Avatar with farmer hat */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md shrink-0 bg-emerald-50">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
              alt="Ramesh Kumar"
              className="w-full h-full object-cover"
            />
            {/* Verified badge */}
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white">
              <Check className="w-3 h-3" />
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#14532d]">
              {language === 'ta' ? 'ரமேஷ் குமார்' : 'Ramesh Kumar'}
            </h3>
            <p className="text-xs font-semibold text-[#52796f]">
              {language === 'ta' ? 'விவசாயி • திருவள்ளூர்' : 'Farmer • Thiruvallur'}
            </p>
          </div>
        </div>

        {/* Menu List Options */}
        <div className="bg-white/95 rounded-3xl border border-emerald-100 shadow-sm divide-y divide-emerald-50 overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.action || (() => setActiveModal(item.id))}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between hover:bg-emerald-50/50 transition-colors cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-[#14532d] group-hover:bg-[#14532d] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#14532d]">
                    {language === 'ta' ? item.labelTa : item.labelEn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[11px] font-bold text-[#52796f] bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.value && (
                    <span className="text-xs font-bold text-[#14532d]">
                      {item.value}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#14532d] group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => setActiveModal('logout')}
          className="w-full py-3 px-4 rounded-full border border-rose-200 text-rose-700 bg-white hover:bg-rose-50 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{language === 'ta' ? 'வெளியேறுக' : 'Logout'}</span>
        </button>
      </div>

      {/* Simple Details Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-emerald-100 space-y-3">
            <h4 className="font-bold text-[#14532d] text-sm capitalize">
              {activeModal.replace('_', ' ')}
            </h4>
            <p className="text-xs text-[#52796f]">
              {language === 'ta'
                ? 'உங்கள் தகவல்கள் கிளவுட் சர்வரில் பாதுகாப்பாக சேமிக்கப்பட்டுள்ளன.'
                : 'Your profile preferences and sync status are active and verified.'}
            </p>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full bg-[#14532d] text-white py-2 rounded-full font-semibold text-xs cursor-pointer"
            >
              {language === 'ta' ? 'சரி' : 'Done'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
