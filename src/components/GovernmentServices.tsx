import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  FileText,
  PhoneCall,
  Search,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  X,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Tractor,
  GraduationCap
} from 'lucide-react';
import { GovernmentService, Language } from '../types';
import { mockGovernmentServices } from '../data/mockData';

interface GovernmentServicesProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const GovernmentServices: React.FC<GovernmentServicesProps> = ({
  language,
  onNavigate
}) => {
  const [services] = useState<GovernmentService[]>(mockGovernmentServices);
  const [selectedService, setSelectedService] = useState<GovernmentService | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices = (services || []).filter(s => {
    const title = s.title || '';
    const desc = s.description || '';
    const titleTamil = s.titleTamil || '';
    const query = (searchQuery || '').toLowerCase();

    const matchesSearch = !query ||
      title.toLowerCase().includes(query) ||
      titleTamil.includes(searchQuery) ||
      desc.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyService = (service: GovernmentService) => {
    setSelectedService(service);
    setApplicationSuccess(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'அரசு நலத்திட்டங்கள் & மானியங்கள்' : 'Government Agricultural Schemes Hub'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'விவசாயிகளுக்கான அரசு சலுகைகள்' : 'Welfare Schemes, Subsidies & Officers'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'PM-கிசான், சொட்டுநீர் பாசன 100% மானியம், பயிர்க் காப்பீடு மற்றும் வட்டார வேளாண் அலுவலக தொடர்புகள் ஒரே இடத்தில்.'
              : 'Direct access to PM-KISAN instalments, drip irrigation subsidies, crop insurance claim portals, and local block agri officers.'}
          </p>
        </div>

        {/* Toll-Free Agri Helpline Card */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-3.5 border border-white/20 text-xs text-emerald-100 max-w-xs shrink-0">
          <span className="font-bold block text-white flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-emerald-300" />
            <span>Kisan Call Centre (இலவசம்)</span>
          </span>
          <span className="text-base font-extrabold text-white block mt-1">1800-180-1551</span>
          <p className="text-[11px] text-emerald-200 mt-0.5">24x7 Toll-Free Farmer Support in Tamil</p>
        </div>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'all', labelTa: 'அனைத்தும்', labelEn: 'All Schemes' },
            { id: 'subsidies', labelTa: 'மானியங்கள்', labelEn: 'Subsidies' },
            { id: 'insurance', labelTa: 'காப்பீடு', labelEn: 'Crop Insurance' },
            { id: 'schemes', labelTa: 'திட்டங்கள்', labelEn: 'Welfare Schemes' },
            { id: 'officers', labelTa: 'அலுவலர் தொடர்பு', labelEn: 'Agri Officers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {language === 'ta' ? tab.labelTa : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'ta' ? 'திட்டம் அல்லது மானியம் தேட...' : 'Search schemes, subsidies...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                  {service.category}
                </span>
                {service.badge && (
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                    {service.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-stone-900 text-base leading-snug">
                  {language === 'ta' ? service.titleTamil : service.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {language === 'ta' ? service.descriptionTamil : service.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-stone-700 block text-[11px] uppercase tracking-wider mb-1">
                    {language === 'ta' ? 'பயனாளி தகுதி:' : 'Eligibility:'}
                  </span>
                  <p className="text-stone-600 text-[11px] flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{language === 'ta' ? service.eligibilityTamil : service.eligibility}</span>
                  </p>
                </div>

                <div>
                  <span className="font-bold text-stone-700 block text-[11px] uppercase tracking-wider mb-0.5">
                    {language === 'ta' ? 'இலக்கு விவசாயிகள்:' : 'Beneficiaries:'}
                  </span>
                  <p className="text-stone-500 text-[11px]">
                    {language === 'ta' ? service.targetBeneficiariesTamil : service.targetBeneficiaries}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-stone-100 flex items-center gap-2">
              <button
                onClick={() => handleApplyService(service)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{language === 'ta' ? service.actionTextTamil : service.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Local Block Agriculture Office Contact Directory */}
      <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200">
        <h3 className="font-bold text-stone-900 text-base mb-2 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-700" />
          <span>{language === 'ta' ? 'உங்கள் பகுதி வட்டார வேளாண் அலுவலர் முகவரி' : 'Local Block Agriculture Office'}</span>
        </h3>
        <p className="text-xs text-stone-600 mb-4">
          Vadipatti Block, Madurai District, Tamil Nadu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200">
            <span className="text-stone-400 block text-[11px]">வேளாண் அலுவலர் (AO)</span>
            <span className="font-bold text-stone-900 text-sm">Thiru. K. Murugesan</span>
            <p className="text-emerald-700 font-semibold mt-1">+91 94433 12450</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-stone-200">
            <span className="text-stone-400 block text-[11px]">தோட்டக்கலை அலுவலர் (HO)</span>
            <span className="font-bold text-stone-900 text-sm">Tmt. S. Kavitha</span>
            <p className="text-emerald-700 font-semibold mt-1">+91 94433 12451</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-stone-200">
            <span className="text-stone-400 block text-[11px]">உழவர் உதவி மையம் (AEC)</span>
            <span className="font-bold text-stone-900 text-sm">Vadipatti Agri Extension Centre</span>
            <p className="text-emerald-700 font-semibold mt-1">04543-254120</p>
          </div>
        </div>
      </div>

      {/* Scheme Application Simulation Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">
                {applicationSuccess
                  ? (language === 'ta' ? 'விண்ணப்பம் பதிவானது!' : 'Application Submitted!')
                  : (language === 'ta' ? 'திட்ட விண்ணப்ப சரிபார்ப்பு' : 'Scheme Application Verification')}
              </h3>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!applicationSuccess ? (
              <div className="space-y-4 mt-4 text-xs">
                <div className="p-3 bg-emerald-50 rounded-2xl">
                  <h4 className="font-bold text-emerald-950 text-sm">
                    {language === 'ta' ? selectedService.titleTamil : selectedService.title}
                  </h4>
                  <p className="text-emerald-800 text-xs font-semibold mt-0.5">
                    {selectedService.targetBeneficiaries}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-stone-700 block">
                    {language === 'ta' ? 'விவசாயி விவரம் (தானாக இணைக்கப்பட்டது):' : 'Farmer Credentials (Pre-filled):'}
                  </span>
                  <div className="p-3 bg-stone-50 rounded-xl space-y-1 text-stone-600">
                    <p><strong className="text-stone-800">Name:</strong> Ramesh Sundaram</p>
                    <p><strong className="text-stone-800">Aadhaar:</strong> XXXX-XXXX-7840</p>
                    <p><strong className="text-stone-800">Survey No:</strong> 128/2A, Vadipatti</p>
                    <p><strong className="text-stone-800">Bank Account:</strong> Indian Bank (XXXX4590)</p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                  <p className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'நேரடி மானிய பரிமாற்றம் (DBT)' : 'Direct Benefit Transfer'}</span>
                  </p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    {language === 'ta'
                      ? 'அங்கீகரிக்கப்பட்ட மானிய தொகை நேரடியாக உங்கள் ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கில் வரவு வைக்கப்படும்.'
                      : 'Sanctioned subsidy is deposited directly into your Aadhaar-linked bank account.'}
                  </p>
                </div>

                <button
                  onClick={() => setApplicationSuccess(true)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
                >
                  {language === 'ta' ? 'விண்ணப்பத்தை சமர்ப்பிக்க' : 'Submit Application'}
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-extrabold text-stone-900">
                  {language === 'ta' ? 'விண்ணப்ப எண்: TN-AGRI-84219' : 'Application Ref: TN-AGRI-84219'}
                </h4>
                <p className="text-xs text-stone-500">
                  {language === 'ta'
                    ? 'உங்கள் விண்ணப்பம் வட்டார வேளாண் அலுவலருக்கு அனுப்பப்பட்டது. கள ஆய்வுக்கு 3 நாட்களில் தொடர்பு கொள்வர்.'
                    : 'Your application has been routed to Vadipatti AEC for field verification within 3 business days.'}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                  >
                    {language === 'ta' ? 'முடிந்தது' : 'Done'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
