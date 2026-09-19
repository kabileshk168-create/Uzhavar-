import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  Download,
  Volume2,
  TrendingUp,
  Award,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Language } from '../types';
import { VoiceAssistantManager } from '../services/voiceService';

interface FarmerReportProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const FarmerReport: React.FC<FarmerReportProps> = ({
  language,
  onNavigate
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleListenReport = () => {
    setIsPlayingAudio(true);
    const text = language === 'ta'
      ? 'வணக்கம் Ramesh. இந்த பருவத்தில் நீங்கள் 3.5 ஏக்கரில் தக்காளி மற்றும் நெல் சாகுபடி செய்துள்ளீர்கள். மொத்த மகசூல் 24,000 கிலோ. உத்தேச மொத்த விற்பனை மதிப்பு 6 லட்சத்து 24 ஆயிரம் ரூபாய். சென்னை கோயம்பேடு உங்களுக்கு அதிக நிகர வருவாய் தந்த சந்தையாக உள்ளது.'
      : 'Hello Ramesh. This season you have cultivated 3.5 acres of Tomato and Paddy with 24,000 kg harvest. Gross revenue stands at ₹6,24,000. Chennai Koyambedu has been your highest net return market.';
    VoiceAssistantManager.speak(text, language);
    setTimeout(() => setIsPlayingAudio(false), 8000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12 print:p-0">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'முழுமையான பண்ணை அறிக்கை' : 'Farmer Seasonal Report'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'பண்ணை செயல்திறன் & வருவாய் அறிக்கை' : 'Farm Economics & Performance Dossier'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'உங்கள் நிலத்தின் மகசூல், விற்பனை வரவு செலவு மற்றும் சந்தை செயல்திறனை எளிமையாக அச்சிடலாம் அல்லது குரலில் கேட்கலாம்.'
              : 'Printable executive summary of yields, farm expenditures, mandi returns, and economic profit margins.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleListenReport}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
              isPlayingAudio ? 'bg-amber-400 text-stone-900' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{language === 'ta' ? 'அறிக்கையை கேட்க' : 'Listen Report'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>{language === 'ta' ? 'அச்சிடுக (Print / PDF)' : 'Print Dossier'}</span>
          </button>
        </div>
      </div>

      {/* Main Printable Report Dossier Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Farm & Farmer Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded">
              Uzhavar+ Smart Farm Card
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-2">
              Ramesh Sundaram (உழவர் ID: UZH-TN-482)
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Vadipatti Taluk, Madurai District, Tamil Nadu • Survey No: 128/2A
            </p>
          </div>

          <div className="text-left sm:text-right text-xs space-y-0.5">
            <span className="text-stone-400">{language === 'ta' ? 'பருவம்:' : 'Season:'} Rabi / Thai Pattam 2026</span>
            <p className="font-bold text-stone-700">{language === 'ta' ? 'மொத்த நிலப்பரப்பு:' : 'Total Land:'} 3.5 Acres</p>
            <p className="text-emerald-700 font-semibold">{language === 'ta' ? 'சரிபார்க்கப்பட்ட பண்ணை' : 'Verified Farm'}</p>
          </div>
        </div>

        {/* 4 Core Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
            <span className="text-xs text-stone-500">{language === 'ta' ? 'மொத்த மகசூல்' : 'Total Harvest'}</span>
            <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">24,000 kg</div>
            <p className="text-[11px] text-emerald-700 mt-0.5 font-medium">+12% vs last season</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
            <span className="text-xs text-stone-500">{language === 'ta' ? 'மொத்த உற்பத்தி செலவு' : 'Total Inputs Cost'}</span>
            <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">₹1,68,000</div>
            <p className="text-[11px] text-stone-500 mt-0.5">Seeds, fertilizers, labour</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
            <span className="text-xs text-stone-500">{language === 'ta' ? 'விற்பனை மதிப்பு' : 'Gross Farm Sales'}</span>
            <div className="text-xl sm:text-2xl font-black text-blue-900 mt-1">₹6,24,000</div>
            <p className="text-[11px] text-blue-700 mt-0.5 font-medium">Avg ₹26/kg</p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300">
            <span className="text-xs font-bold text-emerald-900">{language === 'ta' ? 'நிகர லாபம் (Net Return)' : 'Net Farm Profit'}</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-900 mt-1">₹4,56,000</div>
            <p className="text-[11px] text-emerald-800 mt-0.5 font-semibold">₹1,30,285 / Acre</p>
          </div>
        </div>

        {/* Crops Details Table */}
        <div>
          <h3 className="font-bold text-stone-900 text-sm mb-3">
            {language === 'ta' ? 'பயிர்கள் வாரியான செயல்திறன்' : 'Crop Breakdown & Mandi Allocation'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
              <thead className="bg-stone-100 font-bold text-stone-700">
                <tr>
                  <th className="p-3">Crop (பயிர்)</th>
                  <th className="p-3">Area (ஏக்கர்)</th>
                  <th className="p-3">Harvest Yield</th>
                  <th className="p-3">Top Market</th>
                  <th className="p-3">Realized Price</th>
                  <th className="p-3">Net Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700 font-medium">
                <tr>
                  <td className="p-3 font-bold text-stone-900">Shivam Hybrid Tomato (தக்காளி)</td>
                  <td className="p-3">2.0 Acres</td>
                  <td className="p-3">18,000 kg</td>
                  <td className="p-3 text-emerald-800 font-semibold">Chennai Koyambedu Mandi</td>
                  <td className="p-3">₹31.5 / kg</td>
                  <td className="p-3 font-bold text-emerald-900">₹3,72,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">CR 1009 Sub 1 Paddy (நெல்)</td>
                  <td className="p-3">1.5 Acres</td>
                  <td className="p-3">6,000 kg</td>
                  <td className="p-3 text-emerald-800 font-semibold">Madurai Central Mandi</td>
                  <td className="p-3">₹42.0 / kg</td>
                  <td className="p-3 font-bold text-emerald-900">₹84,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Advisory Footnote */}
        <div className="p-4 bg-stone-50 rounded-2xl text-[11px] text-stone-500 border border-stone-200">
          <p>
            * Generated by Uzhavar+ Decision Support System. Calculations are computed from farmer logs, APMC mandi transactions, and calibrated freight deductions.
          </p>
        </div>
      </div>
    </div>
  );
};
