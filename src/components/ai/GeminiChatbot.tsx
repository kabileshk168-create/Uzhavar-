import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Brain,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Language } from '../../types';
import { callAIChat, ChatTurn } from '../../services/geminiClient';

interface GeminiChatbotProps {
  language: Language;
  onNavigate?: (tab: string) => void;
  externalInitialPrompt?: string;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  language,
  externalInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      role: 'model',
      text:
        language === 'ta'
          ? 'வணக்கம்! நான் உங்கள் உழவர் AI உதவியாளர். நெல், தக்காளி, பருத்தி, கரும்பு சாகுபடி, உரம் (NPK), பூச்சி மேலாண்மை அல்லது சந்தை விலை குறித்த உங்கள் கேள்விகளை கேளுங்கள்.'
          : 'Welcome! I am your Uzhavar AI Agricultural Companion. Ask me anything about crop protection, fertilizer schedules (NPK), soil health, organic remedies, or mandi pricing.'
    }
  ]);
  const [inputText, setInputText] = useState(externalInitialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [modelTier, setModelTier] = useState<'general' | 'complex' | 'fast'>('general');
  const [systemRole, setSystemRole] = useState<'agronomist' | 'mandi' | 'organic'>('agronomist');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalInitialPrompt) {
      setInputText(externalInitialPrompt);
    }
  }, [externalInitialPrompt]);

  const getSystemInstruction = () => {
    switch (systemRole) {
      case 'mandi':
        return 'You are an expert Mandi Trader & Farm Commodity Negotiator for Tamil Nadu APMC markets (Koyambedu, Madurai, Dindigul, Salem). Give sharp, strategic price negotiation advice, arrival pattern insights, and grade differentiation tips in Tamil or English.';
      case 'organic':
        return 'You are a certified Natural & Organic Farming (Iyarkai Vivisayam) specialist inspired by Nammazhvar. Recommend Jeevamrutham, Panchagavya, Neem oil sprays, intercropping, and zero-budget natural techniques in Tamil or English.';
      case 'agronomist':
      default:
        return 'You are an experienced Agricultural Scientist & Agronomy Specialist for Tamil Nadu farmers. Provide precise NPK dosages, IPM pest control solutions, soil conditioning, and climate-resilient farming advice in Tamil or English.';
    }
  };

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputText).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    setInputText('');

    const newMessages: ChatTurn[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const history = newMessages.slice(0, -1);
      const res = await callAIChat({
        message: text,
        history,
        modelTier,
        systemInstruction: getSystemInstruction(),
      });

      setMessages([...newMessages, { role: 'model', text: res.response }]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMsg(err?.message || 'Failed to get response from Gemini.');
      setMessages([
        ...newMessages,
        {
          role: 'model',
          text:
            language === 'ta'
              ? 'மன்னிக்கவும், பதிலளிப்பதில் தாமதம் ஏற்பட்டது. அமைப்புகள் > ரகசியங்கள் (Settings > Secrets) பகுதியில் API Key சரியாக உள்ளதா என சரிபார்க்கவும்.'
              : 'I apologize, could not generate a response. Please check that GEMINI_API_KEY is configured in Settings > Secrets.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const samplePrompts = language === 'ta'
    ? [
        'டெல்டா பகுதியில் சம்பா நெல்லுக்கு உகந்த அடி உரம் அளவு என்ன?',
        'தக்காளி இலை சுருட்டல் நோயை இயற்கை முறையில் கட்டுப்படுத்துவது எப்படி?',
        'மழைக்காலத்தில் உளுந்து சாகுபடி செய்ய வடிகால் மேலாண்மை',
        'கோயம்பேடு மார்க்கெட்டில் இன்றைய வெங்காய வரத்து விலை நிலவரம்'
      ]
    : [
        'Optimal basal NPK fertilizer schedule for Samba paddy in Cauvery delta',
        'Organic treatment for tomato leaf curl virus using neem oil and sour buttermilk',
        'Drainage management for black gram during heavy northeast monsoon',
        'How to negotiate better price for premium A-grade onion at Koyambedu market'
      ];

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Top Bar with Model Tier & Role Selector */}
      <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                {language === 'ta' ? 'உழவர் AI சாட்பாட்' : 'Uzhavar Gemini Chatbot'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Multi-Turn
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {modelTier === 'complex'
                ? 'gemini-3.1-pro-preview (Deep Reasoning)'
                : modelTier === 'fast'
                ? 'gemini-3.1-flash-lite (Fastest)'
                : 'gemini-3.5-flash (General Agricultural)'}
            </p>
          </div>
        </div>

        {/* Model Tier Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-200/80 p-1 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setModelTier('fast')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              modelTier === 'fast'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="gemini-3.1-flash-lite: rapid responses"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Fast</span>
          </button>
          <button
            type="button"
            onClick={() => setModelTier('general')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              modelTier === 'general'
                ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="gemini-3.5-flash: general tasks"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>General</span>
          </button>
          <button
            type="button"
            onClick={() => setModelTier('complex')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              modelTier === 'complex'
                ? 'bg-white text-purple-800 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            title="gemini-3.1-pro-preview: complex agronomy reasoning"
          >
            <Brain className="w-3.5 h-3.5 text-purple-600" />
            <span>Complex (Pro)</span>
          </button>
        </div>

        {/* Role Preset Selector */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-stone-500 hidden sm:inline">{language === 'ta' ? 'பங்கு:' : 'Role:'}</span>
          <select
            value={systemRole}
            onChange={(e) => setSystemRole(e.target.value as any)}
            className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
          >
            <option value="agronomist">{language === 'ta' ? '🔬 வேளாண் விஞ்ஞானி' : '🔬 Agronomist'}</option>
            <option value="mandi">{language === 'ta' ? '⚖️ மண்டி வியாபாரி' : '⚖️ Mandi Trader'}</option>
            <option value="organic">{language === 'ta' ? '🌿 இயற்கை விவசாயி' : '🌿 Organic Specialist'}</option>
          </select>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/50">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs ${
                  isUser ? 'bg-stone-800' : 'bg-emerald-600'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-tr-xs shadow-sm'
                      : 'bg-white text-stone-800 rounded-tl-xs border border-stone-200/80 shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {!isUser && (
                  <div className="flex items-center gap-3 px-1 text-xs text-stone-400">
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.text, idx)}
                      className="hover:text-stone-700 flex items-center gap-1 transition-colors"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSpeak(msg.text)}
                      className="hover:text-stone-700 flex items-center gap-1 transition-colors"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Speak</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="p-3.5 bg-white rounded-2xl rounded-tl-xs border border-stone-200 shadow-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-stone-500 font-medium ml-1">
                {language === 'ta' ? 'Gemini சிந்திக்கிறது...' : 'Gemini is thinking...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pills */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-stone-50 border-t border-stone-200 overflow-x-auto flex gap-2 no-scrollbar">
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(p)}
              className="text-xs shrink-0 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all text-left"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {errorMsg && (
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-xs text-amber-800 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-white border-t border-stone-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            language === 'ta'
              ? 'விவசாயம் அல்லது சந்தை விலை குறித்து கேளுங்கள்...'
              : 'Ask anything about crops, pests, NPK dosage, or market rates...'
          }
          className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-stone-800 placeholder:text-stone-400"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all shadow-xs flex items-center gap-1.5 text-sm shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{language === 'ta' ? 'அனுப்பு' : 'Send'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMessages([
              {
                role: 'model',
                text:
                  language === 'ta'
                    ? 'உரையாடல் புதுப்பிக்கப்பட்டது. உங்கள் கேள்வியை கேளுங்கள்!'
                    : 'Chat reset. What would you like to explore next?'
              }
            ]);
          }}
          className="p-2.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors shrink-0"
          title="Reset conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
