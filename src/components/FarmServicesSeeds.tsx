import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  ShoppingCart,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Truck,
  ArrowRight,
  Plus,
  Minus,
  X,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { SeedInputProduct, Language } from '../types';
import { mockSeedProducts } from '../data/mockData';
import confetti from 'canvas-confetti';

interface FarmServicesSeedsProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const FarmServicesSeeds: React.FC<FarmServicesSeedsProps> = ({
  language,
  onNavigate
}) => {
  const [products] = useState<SeedInputProduct[]>(mockSeedProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart / Order modal
  const [selectedProduct, setSelectedProduct] = useState<SeedInputProduct | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [paymentMode, setPaymentMode] = useState<'cod' | 'upi'>('cod');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>('');

  const categories = [
    'All',
    'Certified Seeds',
    'Fertilizers & Nutrients',
    'Organic Pest Control',
    'Farm Equipment',
    'Irrigation & Drip'
  ];

  const filteredProducts = (products || []).filter(p => {
    const category = p.category || '';
    const matchesCat = selectedCategory === 'All' ||
      category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(category.toLowerCase());

    const prodName = p.name || `${p.crop || ''} - ${p.variety || ''}`;
    const prodNameTamil = p.nameTamil || '';
    const cropType = p.cropType || p.crop || '';
    const query = (searchQuery || '').toLowerCase();

    const matchesSearch = !query ||
      prodName.toLowerCase().includes(query) ||
      prodNameTamil.includes(searchQuery) ||
      cropType.toLowerCase().includes(query) ||
      (p.brand || '').toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  const handleOpenOrder = (prod: SeedInputProduct) => {
    setSelectedProduct(prod);
    setOrderQuantity(1);
    setOrderConfirmed(false);
  };

  const handleConfirmOrder = () => {
    const generatedId = `UZH-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingId(generatedId);
    setOrderConfirmed(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Ignored
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'சான்றளிக்கப்பட்ட விதை & இடுபொருட்கள்' : 'Certified Farm Inputs & Supplies'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'உயர் விளைச்சல் விதைகள் & பண்ணை பொருட்கள்' : 'High-Yield Seeds & Input Store'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'TNAU மற்றும் அரசு சான்றளித்த விதைகள், உயிரி உரங்கள் மற்றும் சொட்டுநீர் சாதனங்கள் நேரடியாக உங்கள் தோட்டத்திற்கே.'
              : 'Direct doorstep delivery of certified high-germination seeds, organic bio-inputs, and farm supplies.'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-xs text-emerald-100 max-w-xs shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-white mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>{language === 'ta' ? '96% முளைப்புத்திறன் உத்தரவாதம்' : '96% Germination Verified'}</span>
          </div>
          <p className="text-[11px] text-emerald-100/90">
            {language === 'ta' ? 'அனைத்து விதைகளும் ஆய்வக பரிசோதனை செய்யப்பட்டு QR சான்றிதழுடன் வழங்கப்படுகின்றன.' : 'Certified by state seed certification authority.'}
          </p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'ta' ? 'விதை அல்லது உரம் தேட...' : 'Search seeds, inputs...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isCertified && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur text-white text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {language === 'ta' ? 'சான்றளிக்கப்பட்டது' : 'Certified'}
                  </span>
                )}
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur text-white text-[11px] font-bold">
                  {product.germinationRate} Germination
                </span>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                  {product.brand}
                </span>

                <h3 className="font-bold text-stone-900 text-sm leading-snug">
                  {language === 'ta'
                    ? (product.nameTamil || `${product.crop} (${product.variety})`)
                    : (product.name || `${product.crop} - ${product.variety}`)}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {language === 'ta'
                    ? (product.descriptionTamil || `${product.crop} உயர் விளைச்சல் ரகம், சான்றளிக்கப்பட்ட விதை.`)
                    : (product.description || `Certified high-yielding ${product.crop} seed variety by ${product.brand}.`)}
                </p>

                <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">{language === 'ta' ? 'அறுவடை காலம்:' : 'Harvest Duration:'}</span>
                    <span className="font-semibold text-stone-800">{product.maturityDays || '65-75 days'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">{language === 'ta' ? 'விதை விகிதம் / தரம்:' : 'Quality & Purity:'}</span>
                    <span className="font-semibold text-stone-800">{product.suitableSoil || '98% Physical Purity'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="flex items-center justify-between pb-3">
                <div>
                  <span className="text-lg font-extrabold text-stone-900">₹{product.price}</span>
                  <span className="text-xs text-stone-400"> / {product.unit || (product.weightKg ? `${product.weightKg} kg` : 'Pack')}</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700">In Stock</span>
              </div>

              <button
                onClick={() => handleOpenOrder(product)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'ஆர்டர் செய்ய (Buy Now)' : 'Order Now'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Flow Simulation Modal (User Journey 3) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">
                {orderConfirmed
                  ? (language === 'ta' ? 'ஆர்டர் உறுதிப்படுத்தப்பட்டது!' : 'Order Confirmed!')
                  : (language === 'ta' ? 'விதைகள் கொள்முதல்' : 'Checkout Seed Order')}
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!orderConfirmed ? (
              <div className="space-y-4 mt-4 text-xs">
                {/* Product Summary */}
                <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name || selectedProduct.crop}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {language === 'ta'
                        ? (selectedProduct.nameTamil || `${selectedProduct.crop} (${selectedProduct.variety})`)
                        : (selectedProduct.name || `${selectedProduct.crop} - ${selectedProduct.variety}`)}
                    </h4>
                    <p className="text-stone-500 font-medium">₹{selectedProduct.price} / {selectedProduct.unit || (selectedProduct.weightKg ? `${selectedProduct.weightKg} kg` : 'Pack')}</p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl">
                  <span className="font-bold text-stone-700">
                    {language === 'ta' ? 'எண்ணிக்கை (Packets):' : 'Quantity (Packets):'}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-extrabold text-sm w-6 text-center">{orderQuantity}</span>
                    <button
                      onClick={() => setOrderQuantity(orderQuantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {language === 'ta' ? 'வழங்கும் முகவரி (Delivery Farm Address):' : 'Delivery Address:'}
                  </label>
                  <p className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 font-medium">
                    Ramesh Sundaram, 14/2 North Street, Vadipatti Taluk, Madurai - 625218. (+91 98421 76540)
                  </p>
                </div>

                {/* Payment Options */}
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {language === 'ta' ? 'பணம் செலுத்தும் முறை (Payment Mode):' : 'Payment Mode:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('cod')}
                      className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                        paymentMode === 'cod'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      💵 {language === 'ta' ? 'பொருள் வந்ததும் பணம் (COD)' : 'Cash on Delivery'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('upi')}
                      className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                        paymentMode === 'upi'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      📱 UPI / Google Pay
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="p-3 bg-emerald-50 rounded-xl flex items-center justify-between font-bold text-emerald-950">
                  <span>{language === 'ta' ? 'மொத்த தொகை (Total Bill):' : 'Total Amount:'}</span>
                  <span className="text-base font-extrabold">₹{selectedProduct.price * orderQuantity}</span>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
                >
                  {language === 'ta' ? 'ஆர்டரை உறுதிப்படுத்துக' : 'Place Order'}
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-extrabold text-stone-900">
                  {language === 'ta' ? 'ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!' : 'Order Placed Successfully!'}
                </h4>
                <p className="text-xs text-stone-500">
                  {language === 'ta'
                    ? `உங்கள் கண்காணிப்பு எண்: ${trackingId}. உங்கள் பண்ணை முகவரிக்கு 2 நாட்களில் வந்தடையும்.`
                    : `Your tracking ID is ${trackingId}. Estimated farm delivery within 48 hours.`}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedProduct(null)}
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
