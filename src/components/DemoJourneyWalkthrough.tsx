import React, { useState } from 'react';
import {
  Sparkles,
  Mic,
  TrendingUp,
  Store,
  CheckCircle2,
  ArrowRight,
  X,
  Truck,
  DollarSign,
  Play
} from 'lucide-react';
import { Language } from '../types';
import { VoiceAssistantManager } from '../services/voiceService';
import confetti from 'canvas-confetti';

interface DemoJourneyWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigate: (tab: string) => void;
}

export const DemoJourneyWalkthrough: React.FC<DemoJourneyWalkthroughProps> = ({
  isOpen,
  onClose,
  language,
  onNavigate
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep === 1) {
      VoiceAssistantManager.speak(
        language === 'ta'
          ? 'இன்று உங்கள் பகுதியில் தக்காளியின் சராசரி விலை ₹28/kg. சென்னை கோயம்பேடு சந்தையில் ₹33/kg. போக்குவரத்தை கழித்தாலும் சென்னையில் ₹30.80 நிகர லாபம் கிடைக்கும்.'
          : 'Today average tomato price in Madurai is ₹28/kg and Chennai Koyambedu is ₹33/kg. After transport, Chennai offers ₹30.80 net return.',
        language
      );
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignored
      }
      onClose();
      onNavigate('marketplace');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-amber-900 rounded-xl">
              <Play className="w-4 h-4 fill-amber-700" />
            </span>
            <div>
              <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                {language === 'ta' ? 'உழவர்+ முழுமையான மாதிரி பயணம்' : 'Uzhavar+ End-to-End Demo Walkthrough'}
              </h3>
              <p className="text-[11px] text-stone-500">
                Step {currentStep} of 4 • Voice → Mandi → Net Profit → Buyer Trade
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center gap-2 my-4">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all ${
                s <= currentStep ? 'bg-emerald-600' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Voice Query */}
        {currentStep === 1 && (
          <div className="space-y-4 py-2">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <Mic className="w-8 h-8" />
              </div>
              <h4 className="text-base font-extrabold text-emerald-950">
                {language === 'ta' ? 'படி 1: விவசாயி குரலில் கேட்கிறார்' : 'Step 1: Farmer Speaks Query'}
              </h4>
              <p className="text-sm font-bold text-stone-800 italic bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
                "இன்னைக்கு தக்காளி விலை என்ன?"
              </p>
              <p className="text-xs text-stone-500">
                {language === 'ta'
                  ? 'விவசாயி தட்டச்சு செய்யத் தேவையில்லை. தன் தாய்மொழியில் நேரடியாகக் கேட்கிறார்.'
                  : 'Zero typing required. Speaks in natural Tamil to query today\'s tomato rates.'}
              </p>
            </div>
          </div>
        )}

        {/* Step 2: AI Voice Intelligence Response */}
        {currentStep === 2 && (
          <div className="space-y-4 py-2">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>{language === 'ta' ? 'படி 2: AI குரல் பதில்' : 'Step 2: AI Voice Intelligence'}</span>
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === 'ta'
                  ? '“இன்று உங்கள் பகுதியில் தக்காளியின் சராசரி விலை ₹28/kg. ஆனால் சென்னை கோயம்பேடு சந்தையில் ₹33/kg.”'
                  : '“Today average tomato price in your area is ₹28/kg. However, Chennai Koyambedu is trading at ₹33/kg.”'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'ta'
                  ? 'உடனடியாக சந்தை ஒப்பீடு மற்றும் முடிவெடுக்கும் பொத்தான்களை திரையில் காண்பிக்கிறது.'
                  : 'Instantly renders multi-mandi transport comparison and suggested decision paths.'}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Market Comparison & Logistics Deduction */}
        {currentStep === 3 && (
          <div className="space-y-3 py-2">
            <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {language === 'ta' ? 'படி 3: சந்தை விலை & போக்குவரத்து கழிப்பு' : 'Step 3: Mandi Net Return Comparison'}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-800">Madurai Mandi (22 km)</span>
                <p className="text-stone-500">Price: ₹28.0/kg</p>
                <p className="text-stone-500">Transport: -₹0.8/kg</p>
                <div className="pt-1 border-t font-extrabold text-stone-900">
                  Net Return: ₹27.2/kg
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 ring-1 ring-emerald-400 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">Chennai Mandi (450 km)</span>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">Best</span>
                </div>
                <p className="text-emerald-800">Price: ₹33.0/kg</p>
                <p className="text-emerald-800">Transport: -₹2.2/kg</p>
                <div className="pt-1 border-t border-emerald-200 font-black text-emerald-900 text-sm">
                  Net Return: ₹30.8/kg (+₹3.6)
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-500 italic text-center">
              1,800 kg yield x +₹3.6/kg gain = ₹6,480 extra income for Ramesh!
            </p>
          </div>
        )}

        {/* Step 4: Buyer Selection & List Produce */}
        {currentStep === 4 && (
          <div className="space-y-3 py-2">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{language === 'ta' ? 'படி 4: நேரடி வியாபாரி தேர்வு & விற்பனை' : 'Step 4: Connect with Wholesale Buyer'}</span>
              </div>
              <h4 className="text-base font-extrabold text-stone-900">
                Chennai Fresh Agri Wholesale
              </h4>
              <p className="text-xs text-stone-600">
                Seeking 2,000 kg Grade A Tomato @ ₹32.0/kg. Verified buyer with farm-gate pickup & prompt settlement.
              </p>
              <div className="p-2.5 bg-white rounded-xl text-xs font-bold text-emerald-800 flex items-center justify-between">
                <span>Ramesh 1,800 kg Produce Listing:</span>
                <span className="text-emerald-700 font-extrabold">Ready to Sell</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 mt-auto border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800"
          >
            {language === 'ta' ? 'மூடுக' : 'Close'}
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>
              {currentStep === 4
                ? (language === 'ta' ? 'சந்தையில் நேரடியாக காண்க' : 'Go to Marketplace')
                : (language === 'ta' ? 'அடுத்த கட்டம்' : 'Next Step')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
