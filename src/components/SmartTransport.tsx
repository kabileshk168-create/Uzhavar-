import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Users,
  Clock,
  Phone,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  X
} from 'lucide-react';
import { TransportOption, Language } from '../types';
import { mockTransportOptions } from '../data/mockData';
import confetti from 'canvas-confetti';

interface SmartTransportProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const SmartTransport: React.FC<SmartTransportProps> = ({
  language,
  onNavigate
}) => {
  const [vehicles] = useState<TransportOption[]>(mockTransportOptions);
  const [selectedVehicle, setSelectedVehicle] = useState<TransportOption | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [pickupTime, setPickupTime] = useState('Today 4:00 PM');
  const [destinationMandi, setDestinationMandi] = useState('Chennai Koyambedu Mandi');

  const handleBookVehicle = (v: TransportOption) => {
    setSelectedVehicle(v);
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
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
            <Truck className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'சரக்கு & லாரி வசதி' : 'Smart Farm Logistics'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'பண்ணை முதல் சந்தை வரை சரக்கு போக்குவரத்து' : 'Direct Farm-to-Mandi Transport'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'தனியாக லாரி பிடிப்பதை விட பகிர்வு வாகனம் (Shared Pooling) மூலம் கிலோவுக்கு 40% சரக்கு கட்டணத்தை மிச்சப்படுத்துங்கள்.'
              : 'Book dedicated or shared agricultural freight vehicles to transport harvests safely with transparent per-kg rates.'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-xs text-emerald-100 max-w-xs shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-white mb-1">
            <Users className="w-4 h-4 text-emerald-300" />
            <span>{language === 'ta' ? 'பகிர்வு லாரி சேமிப்பு' : 'Shared Pooling Benefit'}</span>
          </div>
          <p className="text-[11px] text-emerald-100/90">
            {language === 'ta' ? 'அருகாமை உழவர்களுடன் வாகனத்தை பகிர்ந்து கொண்டு போக்குவரத்து செலவை குறைக்கலாம்.' : 'Pool cargo capacity with neighbor farmers along the same mandi corridor.'}
          </p>
        </div>
      </div>

      {/* Available Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {vehicles.map(v => (
          <div
            key={v.id}
            className={`bg-white rounded-3xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
              v.isSharedPool
                ? 'border-emerald-300 bg-emerald-50/20 ring-1 ring-emerald-400/40'
                : 'border-stone-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {v.vehicleType}
                  </span>
                  <h3 className="font-extrabold text-stone-900 text-base mt-1.5">
                    {v.driverName}
                  </h3>
                  <p className="text-xs text-stone-500">{v.currentRoute}</p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-emerald-700">₹{v.ratePerKg}</span>
                  <span className="text-xs text-stone-400"> / kg</span>
                  <p className="text-[10px] text-stone-500">{v.departureDate}</p>
                </div>
              </div>

              {v.isSharedPool && (
                <div className="p-2.5 bg-emerald-100/80 rounded-xl text-[11px] text-emerald-900 font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'ta' ? `பகிர்வு வாகனம் (${v.sharedFarmersCount} உழவர்கள் இணைந்துள்ளனர்)` : `Shared Pooling (${v.sharedFarmersCount} Farmers Pooled)`}</span>
                </div>
              )}

              <div className="p-3 bg-stone-50 rounded-2xl text-xs space-y-1 text-stone-600">
                <div className="flex items-center justify-between">
                  <span>{language === 'ta' ? 'ஏற்றுமதி கொள்ளளவு:' : 'Load Capacity:'}</span>
                  <strong className="text-stone-900">{v.capacityKg.toLocaleString()} kg</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === 'ta' ? 'கையிருப்பு இடம்:' : 'Available Space:'}</span>
                  <span className="text-emerald-800 font-semibold">{v.availableCapacityKg.toLocaleString()} kg</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-stone-100 flex items-center gap-2">
              <button
                onClick={() => handleBookVehicle(v)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'முன்பதிவு செய்ய' : 'Book Vehicle'}</span>
              </button>
              <a
                href={`tel:${v.contactNumber}`}
                className="p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
                title="Call Driver"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">
                {bookingConfirmed
                  ? (language === 'ta' ? 'சரக்கு வாகனம் உறுதியானது!' : 'Vehicle Booking Confirmed!')
                  : (language === 'ta' ? 'சரக்கு வாகனம் முன்பதிவு' : 'Confirm Transport Booking')}
              </h3>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!bookingConfirmed ? (
              <div className="space-y-4 mt-4 text-xs">
                <div className="p-3 bg-stone-50 rounded-2xl space-y-1">
                  <span className="font-bold text-stone-900 text-sm">{selectedVehicle.driverName}</span>
                  <p className="text-stone-500">Route: {selectedVehicle.currentRoute} ({selectedVehicle.contactNumber})</p>
                  <p className="text-emerald-700 font-bold">₹{selectedVehicle.ratePerKg}/kg • Available Space: {selectedVehicle.availableCapacityKg} kg</p>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {language === 'ta' ? 'செல்ல வேண்டிய சந்தை' : 'Destination Mandi'}
                  </label>
                  <select
                    value={destinationMandi}
                    onChange={(e) => setDestinationMandi(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 font-semibold"
                  >
                    <option value="Chennai Koyambedu Mandi">Chennai Koyambedu Mandi (450 km)</option>
                    <option value="Madurai Paravai Mandi">Madurai Paravai Mandi (22 km)</option>
                    <option value="Dindigul Mandi">Dindigul Mandi (42 km)</option>
                    <option value="Coimbatore Wholesale Mandi">Coimbatore Mandi (195 km)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {language === 'ta' ? 'பண்ணைக்கு வர வேண்டிய நேரம்' : 'Pickup Time'}
                  </label>
                  <input
                    type="text"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 font-semibold"
                  />
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
                >
                  {language === 'ta' ? 'வாகனத்தை உறுதிப்படுத்துக' : 'Confirm Logistics Booking'}
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-extrabold text-stone-900">
                  {language === 'ta' ? 'ஓட்டுநர் ஒப்புதல் அளித்துள்ளார்' : 'Driver Dispatched'}
                </h4>
                <p className="text-xs text-stone-500">
                  {language === 'ta'
                    ? `${selectedVehicle.driverName} குறிப்பிட்ட நேரத்தில் உங்கள் தோட்டத்திற்கு வந்து அடைவார்.`
                    : `${selectedVehicle.driverName} will arrive at your Vadipatti farm at ${pickupTime}.`}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                  >
                    {language === 'ta' ? 'சரி' : 'Done'}
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
