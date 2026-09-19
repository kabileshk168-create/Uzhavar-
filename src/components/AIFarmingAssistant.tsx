import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  Send,
  User,
  Bot,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Leaf,
  RotateCcw
} from 'lucide-react';
import { Language } from '../types';

interface AIFarmingAssistantProps {
  language: Language;
  onNavigate: (tab: string) => void;
  defaultMode?: 'chat' | 'photo';
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  quickReplies?: string[];
  actionLink?: { labelTa: string; labelEn: string; tab: string };
}

export const AIFarmingAssistant: React.FC<AIFarmingAssistantProps> = ({
  language,
  onNavigate,
  defaultMode = 'chat'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'photo'>(defaultMode);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: language === 'ta'
        ? 'வணக்கம் Ramesh! நான் உங்கள் உழவர்+ AI விவசாய வழிகாட்டி. புதிய சாகுபடி, பூச்சி மேலாண்மை, சந்தை விலை அல்லது அரசு திட்டங்கள் குறித்து என்னிடம் கேட்கலாம்.'
        : 'Vanakkam Ramesh! I am your Uzhavar+ AI Farming Companion. How can I assist your farm today with crop care, pest management, or market decisions?',
      quickReplies: [
        'நான் புதுசா விவசாயம் ஆரம்பிக்கிறேன்',
        'இன்னைக்கு தக்காளி விலை என்ன?',
        'என் பயிருக்கு என்ன உரம் போடலாம்?',
        'சொட்டுநீர் பாசன மானியம் எப்படி பெறுவது?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Photo Diagnosis State
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [analyzingPhoto, setAnalyzingPhoto] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<{
    cropName: string;
    possibleIssue: string;
    possibleIssueTamil: string;
    confidence: string;
    symptoms: string[];
    symptomsTamil: string[];
    guidance: string;
    guidanceTamil: string;
    recommendedSpray: string;
    recommendedSprayTamil: string;
  } | null>(null);

  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { sender: 'user', text }
    ];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply: ChatMessage;

      if (text.includes('புதுசா') || text.toLowerCase().includes('beginner') || text.toLowerCase().includes('start')) {
        aiReply = {
          sender: 'ai',
          text: language === 'ta'
            ? 'முதலில் உங்கள் நிலத்தின் பரப்பளவு, இருப்பிடம் (Location), மண் வகை (Soil Type) மற்றும் நீங்கள் வளர்க்க விரும்பும் பயிர் பற்றி சொல்லுங்கள். நாங்கள் ஆரம்பநிலை வழிகாட்டியை ஆரம்பிக்கலாம்.'
            : 'Welcome to farming! First, share your land area, location, soil type, and preferred crop. We have step-by-step courses ready for you.',
          quickReplies: [
            '3 ஏக்கர் வண்டல் மண் - தக்காளி',
            '2 ஏக்கர் செம்மண் - மிளகாய்',
            'நெல் சாகுபடி வழிகாட்டியை காட்டு'
          ],
          actionLink: { labelTa: 'தொடக்கநிலை பாடம் கற்க', labelEn: 'Start Beginner Course', tab: 'learning' }
        };
      } else if (text.includes('விலை') || text.toLowerCase().includes('price') || text.toLowerCase().includes('tomato')) {
        aiReply = {
          sender: 'ai',
          text: language === 'ta'
            ? 'இன்று உங்கள் மதுரை பரவை சந்தையில் தக்காளி ₹28/kg. சென்னை கோயம்பேட்டில் ₹33/kg. போக்குவரத்து கழித்து சென்னையில் விற்பது அதிக நிகர வருவாய் தரும்.'
            : 'Today tomato is trading at ₹28/kg in Madurai and ₹33/kg in Chennai Koyambedu. Net return is higher in Chennai after ₹2.2/kg transport.',
          actionLink: { labelTa: 'சந்தை ஒப்பீடு பார்க்க', labelEn: 'View Market Comparison', tab: 'market' }
        };
      } else if (text.includes('உரம்') || text.toLowerCase().includes('fertilizer')) {
        aiReply = {
          sender: 'ai',
          text: language === 'ta'
            ? 'தக்காளி நடவு செய்த 30-40 நாட்களில் 19-19-19 நீரில் கரையும் உரமும், பூக்கும் பருவத்தில் பொட்டாஷ் சத்து நிறைந்த 13-0-45 உரமும் சொட்டுநீரில் இடலாம்.'
            : 'For vegetable crops, apply 19-19-19 water-soluble NPK during vegetative growth, and switch to 13-0-45 during flowering and fruiting.',
          actionLink: { labelTa: 'சான்றளித்த உரங்கள் பார்க்க', labelEn: 'Explore Fertilizers', tab: 'farm_services' }
        };
      } else {
        aiReply = {
          sender: 'ai',
          text: language === 'ta'
            ? `உங்கள் கேள்வி "${text}"-க்கு எங்கள் வேளாண் நுண்ணறிவு தரவுத்தளத்தில் இருந்து பரிந்துரைகள் தயார். வேளாண் அலுவலர் மூலமும் நேரடியாக உறுதிப்படுத்திக் கொள்ளலாம்.`
            : `Information processed for "${text}". You can also cross-verify with your local Block Agricultural Officer.`,
          actionLink: { labelTa: 'அரசு அலுவலர் எண் பார்க்க', labelEn: 'Contact Agri Officer', tab: 'government' }
        };
      }

      setMessages([...newMessages, aiReply]);
      setIsTyping(false);
    }, 1000);
  };

  // Sample photo diagnosis triggers
  const handleAnalyzePresetPhoto = (sampleType: 'leaf_curl' | 'healthy' | 'blight') => {
    let imgUrl = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80';
    if (sampleType === 'leaf_curl') {
      imgUrl = 'https://images.unsplash.com/photo-1599818968018-378e82a7410d?w=600&auto=format&fit=crop&q=80';
    }
    setSelectedPhoto(imgUrl);
    setAnalyzingPhoto(true);
    setDiagnosisResult(null);

    setTimeout(() => {
      setAnalyzingPhoto(false);
      setDiagnosisResult({
        cropName: 'Tomato (தக்காளி)',
        possibleIssue: 'Tomato Leaf Curl Virus (TLCV) & Whitefly Vector',
        possibleIssueTamil: 'தக்காளி இலை சுருள் நச்சுயிரி & வெள்ளை ஈ தாக்குதல்',
        confidence: '86% AI Probability Match',
        symptoms: [
          'Upward and inward curling of leaf margins',
          'Interveinal chlorosis (yellowing between veins)',
          'Stunted terminal bush growth'
        ],
        symptomsTamil: [
          'இலைகளின் ஓரங்கள் மேல்நோக்கி சுருளுதல்',
          'நரம்புகளுக்கு இடையே மஞ்சள் நிறமாதல்',
          'செடியின் வளர்ச்சி குன்றி புதர் போன்று மாறுதல்'
        ],
        guidance: 'Transmitted primarily by Bemisia tabaci (whitefly). Immediate containment of the vector insect is essential to halt viral propagation to adjacent healthy rows.',
        guidanceTamil: 'வெள்ளை ஈக்கள் மூலமாக இந்த நோய் பரவுகிறது. உடனடியாக வெள்ளை ஈக்களை கட்டுப்படுத்தினால் மட்டுமே பிற செடிகளுக்கு பரவாமல் தடுக்க முடியும்.',
        recommendedSpray: 'Organic: 5% Neem Seed Kernel Extract (NSKE) + Sour Buttermilk spray. Chemical advisory: Consult AO before Acetamiprid / Imidacloprid.',
        recommendedSprayTamil: 'இயற்கை வழி: 5% வேப்பங்கொட்டை சாறு அல்லது புளித்த மோர் கரைசல் தெளிக்கவும். வேதியியல் மருந்துக்கு வேளாண் அலுவலரை அணுகவும்.'
      });
    }, 1400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'AI வேளாண் வழிகாட்டி' : 'AI Agricultural Assistant'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'கேளுங்கள் உழவர் AI' : 'Ask Uzhavar AI'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'பயிர் சாகுபடி சந்தேகங்கள், பூச்சி மேலாண்மை, இலை புகைப்படம் வழியே நோய் கண்டறிதல் மற்றும் அரசு உதவி வழிகாட்டல்.'
              : 'Conversational farming intelligence, crop advisory, and visual crop leaf diagnostics.'}
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex p-1 bg-emerald-900/70 border border-emerald-600/40 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'chat' ? 'bg-white text-emerald-900 shadow-md' : 'text-emerald-200'
            }`}
          >
            💬 {language === 'ta' ? 'AI அரட்டை' : 'Conversational Chat'}
          </button>
          <button
            onClick={() => setActiveSubTab('photo')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'photo' ? 'bg-white text-emerald-900 shadow-md' : 'text-emerald-200'
            }`}
          >
            📸 {language === 'ta' ? 'புகைப்படத்துடன் கேட்க' : 'Ask with Photo'}
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Conversational Chat */}
      {activeSubTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col h-[580px] overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-stone-100 text-stone-800 rounded-tl-none border border-stone-200/60'
                    }`}
                  >
                    {msg.text}

                    {msg.actionLink && (
                      <div className="mt-3 pt-2 border-t border-stone-200/80">
                        <button
                          onClick={() => onNavigate(msg.actionLink!.tab)}
                          className="flex items-center gap-1.5 font-bold text-xs text-emerald-700 hover:text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs cursor-pointer"
                        >
                          <span>{language === 'ta' ? msg.actionLink.labelTa : msg.actionLink.labelEn}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Quick Reply Chips if present */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickReplies.map((qr, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendChat(qr)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-stone-400 p-2">
                <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>{language === 'ta' ? 'உழவர்+ AI சிந்திக்கிறது...' : 'Uzhavar+ AI typing response...'}</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-3.5 sm:p-4 border-t border-stone-100 bg-stone-50/70">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={
                  language === 'ta'
                    ? 'விவசாய கேள்வியை தமிழில் தட்டச்சு செய்க...'
                    : 'Ask agricultural question in Tamil or English...'
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <button
                onClick={() => handleSendChat()}
                className="p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ta' ? 'அனுப்புக' : 'Send'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Ask with Photo (Section 13) */}
      {activeSubTab === 'photo' && (
        <div className="space-y-5">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {language === 'ta' ? 'முக்கிய அறிவிப்பு (Decision Support)' : 'AI Diagnostic Disclaimer'}
              </p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                {language === 'ta'
                  ? 'AI நோயறிதல் உத்தேச கணிப்பு மட்டுமே (Possible Issue). இறுதி முடிவுக்கு உங்கள் பகுதி வேளாண் அலுவலரை அணுகவும்.'
                  : 'AI-assisted observation only. Diagnosis is indicative. Consult an agriculture expert or officer for confirmation before applying chemical treatments.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Upload & Photo Selection (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ta' ? 'பயிரின் இலை புகைப்படத்தை பதிவேற்ற' : 'Upload Crop / Leaf Photo'}</span>
              </h3>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center hover:bg-stone-50 transition-colors">
                {selectedPhoto ? (
                  <div className="relative rounded-xl overflow-hidden max-h-56 mx-auto">
                    <img src={selectedPhoto} alt="Selected Leaf" className="w-full object-cover" />
                    <button
                      onClick={() => { setSelectedPhoto(null); setDiagnosisResult(null); }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-10 h-10 mx-auto text-emerald-600 mb-2" />
                    <p className="font-bold text-stone-800 text-xs sm:text-sm">
                      {language === 'ta' ? 'புகைப்படம் எடுக்க அல்லது தேர்வு செய்ய' : 'Tap to take photo or choose file'}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-1">Supports JPG, PNG (Under 10MB)</p>
                  </div>
                )}
              </div>

              {/* Sample Test Leaf Images for Easy Prototype Testing */}
              <div className="pt-2">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                  {language === 'ta' ? 'மாதிரி புகைப்படத்தை சோதிக்க (Instant Demo):' : 'Test with sample crop photo:'}
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleAnalyzePresetPhoto('leaf_curl')}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left text-xs transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-stone-800">
                        {language === 'ta' ? 'தக்காளி இலை சுருளல் (Leaf Curl Sample)' : 'Tomato Leaf Curl Virus Sample'}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  <button
                    onClick={() => handleAnalyzePresetPhoto('healthy')}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left text-xs transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-stone-800">
                        {language === 'ta' ? 'மிளகாய் இலை கருகல் (Chilli Blight Sample)' : 'Chilli Blight Sample'}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: AI Analysis Flow & Results (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-bold text-stone-900 text-base">
                {language === 'ta' ? 'AI பகுப்பாய்வு & வழிகாட்டல்' : 'AI Diagnostic Result & Observation'}
              </h3>

              {analyzingPhoto && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center animate-spin">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-stone-800 text-base">
                    {language === 'ta' ? 'இலையின் அறிகுறியை AI ஆய்வு செய்கிறது...' : 'Analyzing crop visual pathology...'}
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Comparing leaf texture, chlorosis patterns, and entomological markers against Tamil Nadu agricultural datasets.
                  </p>
                </div>
              )}

              {!analyzingPhoto && !diagnosisResult && (
                <div className="py-12 text-center text-stone-400 text-xs">
                  <Leaf className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                  <p>{language === 'ta' ? 'இடதுபுறத்தில் மாதிரி புகைப்படத்தை தேர்வு செய்க' : 'Select a sample crop photo to view AI diagnosis flow'}</p>
                </div>
              )}

              {!analyzingPhoto && diagnosisResult && (
                <div className="space-y-4 animate-in fade-in">
                  {/* Diagnosis Header */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                        {language === 'ta' ? 'கண்டறியப்பட்ட சாத்தியமான பிரச்சனை' : 'Possible Issue (AI Observation)'}
                      </span>
                      <span className="text-xs font-bold text-emerald-800">{diagnosisResult.confidence}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-stone-900 mt-2">
                      {language === 'ta' ? diagnosisResult.possibleIssueTamil : diagnosisResult.possibleIssue}
                    </h4>
                    <p className="text-xs text-stone-500 font-medium">{diagnosisResult.cropName}</p>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      {language === 'ta' ? 'அறிகுறிகள் (Symptoms):' : 'Identified Symptoms:'}
                    </h5>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {(language === 'ta' ? diagnosisResult.symptomsTamil : diagnosisResult.symptoms).map((s, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Guidance */}
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs leading-relaxed text-stone-700">
                    <span className="font-bold text-stone-900 block mb-1">
                      {language === 'ta' ? 'அடிப்படை வழிகாட்டல்:' : 'Basic Guidance:'}
                    </span>
                    {language === 'ta' ? diagnosisResult.guidanceTamil : diagnosisResult.guidance}
                  </div>

                  {/* Recommended Next Step & Spray */}
                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950">
                    <span className="font-bold block mb-1">
                      {language === 'ta' ? 'பரிந்துரைக்கப்படும் நடவடிக்கை:' : 'Recommended Next Steps:'}
                    </span>
                    <p>{language === 'ta' ? diagnosisResult.recommendedSprayTamil : diagnosisResult.recommendedSpray}</p>
                  </div>

                  {/* Contact Agricultural Officer Button (Mandatory in Section 13) */}
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('government')}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>
                        {language === 'ta'
                          ? 'வேளாண் அலுவலரை தொடர்பு கொள்ள (Contact Agri Officer)'
                          : 'Contact Block Agriculture Officer'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
