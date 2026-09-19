import React, { useState } from 'react';
import {
  Sprout,
  Mic,
  Globe,
  Bell,
  CheckCircle2,
  X,
  UserCheck,
  ShieldCheck,
  Building2,
  ArrowRight
} from 'lucide-react';
import { Language, UserRole, UserProfile, NotificationItem } from '../types';
import { initialUser } from '../data/mockData';

interface HeaderProps {
  language: Language;
  onToggleLanguage?: () => void;
  onSelectLanguage?: (lang: Language) => void;
  onOpenLanguageModal?: () => void;
  userRole?: UserRole;
  currentRole?: UserRole;
  onChangeRole?: (role: UserRole) => void;
  onRoleChange?: (role: UserRole) => void;
  userProfile?: UserProfile;
  notifications?: NotificationItem[];
  onMarkNotificationRead?: (id: string) => void;
  onOpenVoice: () => void;
  onNavigate: (tab: string) => void;
  activeTab?: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onSelectLanguage,
  onOpenLanguageModal,
  userRole = 'farmer',
  currentRole,
  onChangeRole,
  onRoleChange,
  userProfile = initialUser,
  notifications = [],
  onMarkNotificationRead = (_id?: string) => {},
  onOpenVoice,
  onNavigate,
  activeTab
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const effectiveRole = currentRole || userRole || 'farmer';
  const handleRoleChange = onRoleChange || onChangeRole || (() => {});
  const handleToggleLang = onOpenLanguageModal || onToggleLanguage || (() => {});
  const profile = userProfile || initialUser;
  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const unreadCount = safeNotifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="header-brand-logo"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900">
                UZHAVAR<span className="text-emerald-600">+</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 rounded-md">
                {language === 'ta' ? 'உழவர்+' : 'PROTOTYPE'}
              </span>
            </div>
            <p className="text-xs font-medium text-stone-500 hidden sm:block">
              {language === 'ta' ? 'பேசுங்கள் • கற்போம் • விளைவிப்போம் • விற்போம்' : 'Speak. Learn. Grow. Sell.'}
            </p>
          </div>
        </div>

        {/* Quick Nav Links on Desktop */}
        <div className="hidden xl:flex items-center gap-2">
          <button
            onClick={() => onNavigate('price_prediction')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'price_prediction'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {language === 'ta' ? 'விலை கணிப்பு' : 'Price Prediction'}
          </button>
          <button
            onClick={() => onNavigate('market')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'market'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {language === 'ta' ? 'மண்டி விலை' : 'Mandi Rates'}
          </button>
          <button
            onClick={() => onNavigate('marketplace')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'marketplace'
                ? 'bg-[#14532d] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {language === 'ta' ? 'நேரடி விற்பனை' : 'Direct Marketplace'}
          </button>
        </div>

        {/* Action Controls: Voice, Lang, Notifications, Role, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Quick Voice Bar Button */}
          <button
            onClick={onOpenVoice}
            id="header-voice-mic-btn"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-full shadow-sm shadow-emerald-700/30 transition-all cursor-pointer"
            title={language === 'ta' ? 'பேச தட்டவும்' : 'Tap to speak'}
          >
            <div className="relative flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
            </div>
            <span className="hidden md:inline">
              {language === 'ta' ? 'பேசுங்கள்...' : 'Speak'}
            </span>
          </button>

          {/* Language Switcher Pill */}
          <button
            onClick={handleToggleLang}
            id="header-language-toggle"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
            title="Switch Language / மொழி மாற்றுக"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span className={language === 'ta' ? 'text-emerald-700 font-bold' : 'text-stone-600'}>தமிழ்</span>
            <span className="text-stone-300">/</span>
            <span className={language === 'en' ? 'text-emerald-700 font-bold' : 'text-stone-600'}>ENG</span>
          </button>

          {/* Notification Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              id="header-notifications-btn"
              className="relative p-2 rounded-full text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Modal / Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">
                      {language === 'ta' ? 'அறிவிப்புகள்' : 'Smart Alerts'}
                    </span>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} {language === 'ta' ? 'புதியது' : 'new'}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-stone-400 hover:text-stone-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto mt-2">
                  {safeNotifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        onMarkNotificationRead(notif.id);
                        if (notif.actionTarget) {
                          onNavigate(notif.actionTarget);
                          setShowNotifications(false);
                        }
                      }}
                      className={`py-2.5 px-2 rounded-lg cursor-pointer transition-colors ${
                        notif.isRead ? 'opacity-70 hover:bg-stone-50' : 'bg-emerald-50/50 hover:bg-emerald-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900">
                          {language === 'ta' ? notif.titleTamil : notif.title}
                        </h4>
                        <span className="text-[10px] text-stone-400 whitespace-nowrap">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {language === 'ta' ? notif.messageTamil : notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Prototype Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              id="header-role-switcher-btn"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
            >
              {effectiveRole === 'farmer' && <Sprout className="w-3.5 h-3.5 text-emerald-600" />}
              {effectiveRole === 'buyer' && <Building2 className="w-3.5 h-3.5 text-blue-600" />}
              {effectiveRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />}
              <span className="capitalize">
                {effectiveRole === 'farmer' ? (language === 'ta' ? 'விவசாயி' : 'Farmer') :
                 effectiveRole === 'buyer' ? (language === 'ta' ? 'வியாபாரி' : 'Buyer') :
                 (language === 'ta' ? 'நிர்வாகி' : 'Admin')}
              </span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  {language === 'ta' ? 'பயனர் முறை தேர்வு' : 'Select Prototype Mode'}
                </div>
                <button
                  onClick={() => { handleRoleChange('farmer'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-stone-50 ${effectiveRole === 'farmer' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-stone-700'}`}
                >
                  <span>👨‍🌾 {language === 'ta' ? 'விவசாயி முறை (Farmer)' : 'Farmer Experience'}</span>
                  {effectiveRole === 'farmer' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => { handleRoleChange('buyer'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-stone-50 ${effectiveRole === 'buyer' ? 'text-blue-700 font-bold bg-blue-50' : 'text-stone-700'}`}
                >
                  <span>🏪 {language === 'ta' ? 'வியாபாரி முறை (Buyer)' : 'Buyer Portal'}</span>
                  {effectiveRole === 'buyer' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </button>
                <button
                  onClick={() => { handleRoleChange('admin'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-stone-50 ${effectiveRole === 'admin' ? 'text-amber-700 font-bold bg-amber-50' : 'text-stone-700'}`}
                >
                  <span>🛡️ {language === 'ta' ? 'நிர்வாக முறை (Admin)' : 'Admin Dashboard'}</span>
                  {effectiveRole === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </button>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div 
            onClick={() => onNavigate('reports')} 
            className="hidden sm:flex items-center gap-2 pl-2 border-l border-stone-200 cursor-pointer hover:opacity-85 transition-opacity"
            id="header-user-profile-pill"
          >
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt="Farmer Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              {profile.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  <UserCheck className="w-3 h-3 text-emerald-600" />
                </div>
              )}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-stone-900 line-clamp-1">
                {language === 'ta' ? profile.nameTamil : profile.name}
              </p>
              <p className="text-[10px] text-stone-500">
                {language === 'ta' ? profile.locationTamil : profile.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
