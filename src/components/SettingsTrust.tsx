import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Lock,
  Globe,
  Database,
  User,
  RotateCcw,
  Check,
  FileCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';

interface SettingsTrustProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onOpenLanguageModal: () => void;
  onNavigate: (tab: string) => void;
}

export const SettingsTrust: React.FC<SettingsTrustProps> = ({
  language,
  onSelectLanguage,
  onOpenLanguageModal,
  onNavigate
}) => {
  const [farmerName, setFarmerName] = useState('Ramesh Sundaram');
  const [phoneNumber, setPhoneNumber] = useState('+91 98421 76540');
  const [village, setVillage] = useState('Vadipatti, Madurai');
  const [acres, setAcres] = useState('3.5');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'நம்பகத்தன்மை & பாதுகாப்பு' : 'Trust, Privacy & Settings'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'அமைப்புகள் & தரவு பாதுகாப்பு' : 'Farmer Data Sovereignty & Controls'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'உங்கள் நிலத்து தரவுகள் உங்களுக்கே சொந்தம். வெளிப்படையான சந்தை ஆதாரங்கள் மற்றும் பாதுகாப்பு உத்தரவாதம்.'
              : 'Complete farmer control over field records, transparent mandi attribution, and privacy safeguards.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Farm Profile & Language (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Profile Form */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'விவசாயி சுயவிவரம்' : 'Farmer Profile'}</span>
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'ta' ? 'முழுப் பெயர்' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {language === 'ta' ? 'கைபேசி எண்' : 'Mobile Phone'}
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {language === 'ta' ? 'நிலப்பரப்பு (ஏக்கர்)' : 'Land Area (Acres)'}
                  </label>
                  <input
                    type="text"
                    value={acres}
                    onChange={(e) => setAcres(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'ta' ? 'கிராமம் & மாவட்டம்' : 'Village & District'}
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
              >
                {savedSuccess
                  ? (language === 'ta' ? 'சுயவிவரம் சேமிக்கப்பட்டது!' : 'Profile Saved!')
                  : (language === 'ta' ? 'சேமிக்க (Save Profile)' : 'Save Profile')}
              </button>
            </form>
          </div>

          {/* Language Selection Setting */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'பயன்பாட்டு மொழி தேர்வு' : 'Application Language'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onSelectLanguage('ta')}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  language === 'ta'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="text-lg font-serif block">தமிழ்</span>
                <span className="text-[11px] text-stone-500">Tamil</span>
              </button>

              <button
                onClick={() => onSelectLanguage('en')}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  language === 'en'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="text-lg font-bold block">English</span>
                <span className="text-[11px] text-stone-500">ஆங்கிலம்</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Trust, Attribution & Privacy Statements (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{language === 'ta' ? 'வெளிப்படையான தரவு நெறிமுறைகள்' : 'Data Transparency Principles'}</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'ta' ? 'விவசாயி தரவு இறையாண்மை (Farmer Ownership):' : 'Farmer Data Ownership:'}
                </span>
                <p>
                  {language === 'ta'
                    ? 'உங்கள் நிலம், உற்பத்தி மற்றும் விற்பனைத் தகவல்கள் உங்கள் அனுமதியின்றி எந்த மூன்றாம் தரப்பினருக்கும் பகிரப்பட மாட்டாது.'
                    : 'Your farm coordinates, yields, and pricing agreements belong solely to you. Zero unauthorized advertising brokers.'}
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'ta' ? 'சந்தை விலை ஆதாரங்கள் (Data Attribution):' : 'Transparent Mandi Attribution:'}
                </span>
                <p>
                  {language === 'ta'
                    ? 'சந்தை விலைகள் தமிழ்நாடு உழவர் சந்தை, ஒழுங்குமுறை விற்பனைக்கூடங்கள் (APMC), e-NAM மற்றும் சரிபார்க்கப்பட்ட நேரடி வியாபாரிகளிடமிருந்து பெறப்படுகின்றன.'
                    : 'Mandi pricing is synthesized from Tamil Nadu Uzhavar Sandhai arrivals, regulated APMC market committee bulletins, and verified wholesale buyer quotations.'}
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'ta' ? 'முடிவு ஆதரவு அறிவிப்பு (Decision Support):' : 'Decision Support Clarification:'}
                </span>
                <p>
                  {language === 'ta'
                    ? 'AI வழங்கும் ஆலோசனைகள் மற்றும் நிகர வருவாய் எண்கள் முடிவெடுக்க உதவும் வழிகாட்டல் மட்டுமே. இறுதி முடிவை விவசாயிகளே சுயமாக எடுக்க வேண்டும்.'
                    : 'All net margin calculations and crop insights are decision-support estimates. Actual realizations depend on perishable grade and daily arrival volatility.'}
                </p>
              </div>
            </div>
          </div>

          {/* Prototype Reset Controls */}
          <div className="p-4 bg-stone-100 rounded-3xl text-xs flex items-center justify-between text-stone-600">
            <div>
              <span className="font-bold block text-stone-800">
                {language === 'ta' ? 'முன்மாதிரி மீட்டமைப்பு (Prototype Demo Reset)' : 'Reset Prototype State'}
              </span>
              <span className="text-[11px] text-stone-500">
                {language === 'ta' ? 'ஆரம்ப மொழி தேர்வு மற்றும் மாதிரி தரவுகளை மீண்டும் துவக்கலாம்.' : 'Restore default mock data state and launch screen.'}
              </span>
            </div>
            <button
              onClick={onOpenLanguageModal}
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-700 hover:bg-stone-50 cursor-pointer flex items-center gap-1 shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === 'ta' ? 'மொழி மாற்று' : 'Switch Lang'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
