import React, { useState } from 'react';
import {
  Store,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  MessageCircle,
  Phone,
  CheckCircle2,
  Send,
  X,
  Upload,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ProduceListing, BuyerRequirement, Language } from '../types';
import { mockProduceListings, mockBuyerRequirements } from '../data/mockData';

interface FarmerBuyerMarketplaceProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const FarmerBuyerMarketplace: React.FC<FarmerBuyerMarketplaceProps> = ({
  language,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'requirements'>('listings');
  const [listings, setListings] = useState<ProduceListing[]>(mockProduceListings);
  const [requirements] = useState<BuyerRequirement[]>(mockBuyerRequirements);
  const [searchQuery, setSearchQuery] = useState('');

  // Add Produce Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCrop, setNewCrop] = useState('Tomato');
  const [newVariety, setNewVariety] = useState('Shivam Hybrid');
  const [newQuantity, setNewQuantity] = useState(1500);
  const [newGrade, setNewGrade] = useState<'Grade A (Export/Premium)' | 'Grade B (Standard)' | 'Grade C (Bulk/Processing)'>('Grade A (Export/Premium)');
  const [newPrice, setNewPrice] = useState(30);
  const [newDate, setNewDate] = useState('Tomorrow');
  const [newDescription, setNewDescription] = useState('Freshly harvested Grade A stock.');

  // Direct Chat Modal
  const [chattingWith, setChattingWith] = useState<{ name: string; crop: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'other'; text: string; time: string }[]>([
    { sender: 'other', text: 'வணக்கம்! உங்கள் தக்காளி ஸ்டாக் இன்னும் விற்பனைக்கு உள்ளதா? (Hello, is your tomato stock available?)', time: '10:15 AM' },
    { sender: 'user', text: 'ஆம், 1,800 கிலோ தரம் A தக்காளி அறுவடைக்கு தயாராக உள்ளது. (Yes, 1,800 kg Grade A is ready for harvest.)', time: '10:18 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handlePublishListing = (e: React.FormEvent) => {
    e.preventDefault();
    const item: ProduceListing = {
      id: `listing_${Date.now()}`,
      farmerId: 'farmer_01',
      farmerName: 'Ramesh Sundaram',
      farmerPhone: '+91 98421 76540',
      farmerLocation: 'Vadipatti, Madurai',
      cropName: newCrop,
      cropNameTamil: newCrop === 'Tomato' ? 'தக்காளி' : newCrop,
      variety: newVariety,
      quantityKg: newQuantity,
      grade: newGrade,
      expectedPricePerKg: newPrice,
      availableDate: newDate,
      image: newCrop === 'Tomato'
        ? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
      description: newDescription,
      createdAt: 'Just now',
      isVerified: true
    };
    setListings([item, ...listings]);
    setShowAddModal(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, { sender: 'user', text: inputMsg, time: 'Just now' }]);
    setInputMsg('');
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'other',
          text: language === 'ta'
            ? 'நன்றி! எங்கள் வாகனம் வந்து எடைபோட்டு உடனடியாக பணம் வழங்க ஏற்பாடு செய்கிறோம்.'
            : 'Great! We will arrange farm-gate weighing and prompt digital payment settlement.',
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  const filteredListings = (listings || []).filter(l => {
    const cropName = l.cropName || '';
    const cropNameTamil = l.cropNameTamil || '';
    const loc = l.farmerLocation || '';
    const query = (searchQuery || '').toLowerCase();

    return !query ||
      cropName.toLowerCase().includes(query) ||
      cropNameTamil.includes(searchQuery) ||
      loc.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'நேரடி விவசாயி - வியாபாரி சந்தை' : 'Direct Farmer-to-Buyer Marketplace'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'இடைத்தரகர்கள் இல்லாத நேரடி விற்பனை' : 'Fair Price Direct Trade Hub'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'உங்கள் விளைபொருளை நேரடியாக பதிவு செய்து, சரிபார்க்கப்பட்ட மொத்த வியாபாரிகளிடம் நல்ல விலைக்கு விற்கலாம்.'
              : 'Post your harvest directly, eliminate middlemen cuts, and connect with verified buyers across Tamil Nadu.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 text-emerald-700" />
          <span>{language === 'ta' ? '+ விளைபொருளை பதிவிட' : '+ List My Produce'}</span>
        </button>
      </div>

      {/* Navigation Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex p-1 bg-stone-100 rounded-2xl max-w-md">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'listings' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            {language === 'ta' ? 'விவசாயிகள் விளைபொருட்கள்' : 'Farmer Produce Listings'}
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'requirements' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            {language === 'ta' ? 'வியாபாரிகள் தேவைகள்' : 'Buyer Requirements'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'ta' ? 'பயிர் அல்லது ஊர் பெயர் தேட...' : 'Search crop or location...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* TAB 1: Produce Listings */}
      {activeTab === 'listings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map(listing => (
            <div
              key={listing.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Crop Photo Preview */}
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.cropName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'ta' ? 'சரிபார்க்கப்பட்ட உழவர்' : 'Verified Farmer'}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-sm shadow-sm">
                    ₹{listing.expectedPricePerKg}/kg
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        {language === 'ta' ? listing.cropNameTamil : listing.cropName}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">{listing.variety}</p>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                      {listing.grade.split(' ')[0]} {listing.grade.split(' ')[1]}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {listing.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">{language === 'ta' ? 'கையிருப்பு:' : 'Quantity:'}</span>
                      <span className="font-extrabold text-stone-900">{listing.quantityKg.toLocaleString()} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {language === 'ta' ? 'இடம்:' : 'Location:'}
                      </span>
                      <span className="font-semibold text-stone-800">{listing.farmerLocation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {language === 'ta' ? 'கிடைக்கும் நாள்:' : 'Available:'}
                      </span>
                      <span className="font-medium text-emerald-800">{listing.availableDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setChattingWith({ name: listing.farmerName, crop: listing.cropName })}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'ta' ? 'நேரடி அரட்டை (Chat)' : 'Direct Chat'}</span>
                </button>
                <a
                  href={`tel:${listing.farmerPhone}`}
                  className="p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
                  title="Call Farmer"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Buyer Requirements (Section 10 Requirement Example) */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {language === 'ta' 
                  ? 'மொத்த வியாபாரிகள் இடும் தேவைகள் கீழே உள்ளன. உங்களிடம் இருப்பு இருந்தால் உடனே தொடர்பு கொள்ளலாம்.'
                  : 'Bulk procurement requirements posted by verified buyers. Connect directly if you have matching produce.'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.map(req => (
              <div
                key={req.id}
                className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs hover:border-emerald-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {req.matchingListingsCount} {language === 'ta' ? 'பொருந்தும் உழவர்கள்' : 'Matching Farmers'}
                      </span>
                      {req.isVerified && (
                        <span className="text-[10px] font-bold text-blue-700 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          {language === 'ta' ? 'சரிபார்க்கப்பட்ட வாங்குபவர்' : 'Verified Buyer'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-stone-900 text-lg mt-1">
                      {req.buyerCompany}
                    </h3>
                    <p className="text-xs text-stone-500">{req.buyerName} • {req.buyerLocation}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-emerald-700">
                      ₹{req.targetPricePerKg}
                      <span className="text-xs font-normal text-stone-500">/kg</span>
                    </span>
                    <p className="text-[10px] text-stone-400">{language === 'ta' ? 'கொள்முதல் விலை' : 'Target Offer'}</p>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">{language === 'ta' ? 'தேவைப்படும் பயிர்:' : 'Required Crop:'}</span>
                    <span className="font-bold text-stone-900">{req.cropName} ({language === 'ta' ? req.cropNameTamil : ''})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">{language === 'ta' ? 'அளவு:' : 'Quantity:'}</span>
                    <span className="font-extrabold text-stone-900">{req.quantityRequiredKg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">{language === 'ta' ? 'தரம்:' : 'Grade:'}</span>
                    <span className="font-semibold text-emerald-800">{req.grade}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">{language === 'ta' ? 'தேவைப்படும் நாள்:' : 'Required by:'}</span>
                    <span className="font-semibold text-stone-800">{req.requiredByDate}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic">
                  "{req.notes}"
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setChattingWith({ name: req.buyerName, crop: req.cropName })}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'ta' ? 'என்னிடம் இருப்பு உள்ளது (Chat)' : 'I Have Matching Stock'}</span>
                  </button>
                  <button
                    onClick={() => onNavigate('transport')}
                    className="p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer text-xs font-semibold"
                    title="View Transport"
                  >
                    {language === 'ta' ? 'சரக்கு' : 'Transport'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Produce Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">
                {language === 'ta' ? 'விளைபொருளை விற்பனைக்கு பதிவிட' : 'Add Produce for Sale'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishListing} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {language === 'ta' ? 'பயிர்' : 'Crop'}
                  </label>
                  <select
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-semibold"
                  >
                    <option value="Tomato">Tomato (தக்காளி)</option>
                    <option value="Chilli">Green Chilli (மிளகாய்)</option>
                    <option value="Paddy">Paddy / Rice (நெல்)</option>
                    <option value="Onion">Onion (வெங்காயம்)</option>
                    <option value="Cotton">Cotton (பருத்தி)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {language === 'ta' ? 'ரகம்' : 'Variety'}
                  </label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {language === 'ta' ? 'அளவு (கிலோ)' : 'Quantity (Kg)'}
                  </label>
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    {language === 'ta' ? 'எதிர்பார்க்கும் விலை (₹/கிலோ)' : 'Expected Price (₹/kg)'}
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {language === 'ta' ? 'தரம் / கிரேடு' : 'Quality Grade'}
                </label>
                <select
                  value={newGrade}
                  onChange={(e: any) => setNewGrade(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 font-semibold"
                >
                  <option value="Grade A (Export/Premium)">Grade A (Export/Premium)</option>
                  <option value="Grade B (Standard)">Grade B (Standard Mandi)</option>
                  <option value="Grade C (Bulk/Processing)">Grade C (Bulk/Processing)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {language === 'ta' ? 'கிடைக்கும் நாள்' : 'Available Date'}
                </label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. Ready Tomorrow / இந்த வெள்ளிக்கிழமை"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {language === 'ta' ? 'விளக்கம் & விவரங்கள்' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 text-center cursor-pointer hover:bg-emerald-50/50">
                <Upload className="w-5 h-5 mx-auto text-stone-400 mb-1" />
                <span className="text-[11px] text-stone-500 font-medium">
                  {language === 'ta' ? 'பயிரின் புகைப்படத்தை இணைக்க' : 'Upload crop harvest photo'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
              >
                {language === 'ta' ? 'பதிவை வெளியிடுக (Publish Listing)' : 'Publish Listing'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Direct Chat Simulation Modal */}
      {chattingWith && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-stone-200 flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  {chattingWith.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{chattingWith.name}</h4>
                  <p className="text-[11px] text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • {chattingWith.crop} Trade
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChattingWith(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Thread */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-stone-100 text-stone-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-stone-100 flex gap-2">
              <input
                type="text"
                placeholder={language === 'ta' ? 'செய்தி தட்டச்சு செய்க...' : 'Type a message...'}
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
