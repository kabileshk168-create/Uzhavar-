import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  MapPin,
  Search,
  Mic,
  Video,
  Image as ImageIcon,
  Music,
  Radio,
  FileAudio,
  Layers,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { Language } from '../types';
import { GeminiChatbot } from './ai/GeminiChatbot';
import { GroundingHub } from './ai/GroundingHub';
import { LiveVoiceConversation } from './ai/LiveVoiceConversation';
import { AudioTranscribeTool } from './ai/AudioTranscribeTool';
import { VeoVideoGenerator } from './ai/VeoVideoGenerator';
import { ImageStudio } from './ai/ImageStudio';
import { LyriaMusicGenerator } from './ai/LyriaMusicGenerator';

interface FutureAIFeaturesProps {
  language: Language;
  onNavigate: (tab: string) => void;
  defaultSubTab?: string;
}

type AIToolTab =
  | 'chatbot'
  | 'grounding'
  | 'live_voice'
  | 'transcribe'
  | 'veo_video'
  | 'image_studio'
  | 'lyria_music';

export const FutureAIFeatures: React.FC<FutureAIFeaturesProps> = ({
  language,
  onNavigate,
  defaultSubTab = 'chatbot'
}) => {
  const [activeAITab, setActiveAITab] = useState<AIToolTab>(defaultSubTab as AIToolTab);
  const [chatbotPromptTransfer, setChatbotPromptTransfer] = useState<string>('');

  const handleSendTranscribeToChat = (text: string) => {
    setChatbotPromptTransfer(text);
    setActiveAITab('chatbot');
  };

  const aiTools = [
    {
      id: 'chatbot' as AIToolTab,
      labelTa: 'AI சாட்பாட்',
      labelEn: 'Chatbot',
      badge: 'gemini-3.1-pro',
      icon: MessageSquare,
      color: 'emerald',
    },
    {
      id: 'grounding' as AIToolTab,
      labelTa: 'Google நேரடி தகவல்',
      labelEn: 'Maps & Search Grounding',
      badge: 'gemini-3.5-flash',
      icon: MapPin,
      color: 'blue',
    },
    {
      id: 'live_voice' as AIToolTab,
      labelTa: 'நேரடி குரல் உரையாடல்',
      labelEn: 'Live Voice (Duplex)',
      badge: 'gemini-3.8-live',
      icon: Radio,
      color: 'emerald',
    },
    {
      id: 'transcribe' as AIToolTab,
      labelTa: 'குரல் எழுத்தாக்கம்',
      labelEn: 'Audio Transcribe',
      badge: 'gemini-3.5-transcribe',
      icon: FileAudio,
      color: 'emerald',
    },
    {
      id: 'veo_video' as AIToolTab,
      labelTa: 'வீடியோ அனிமேஷன்',
      labelEn: 'Veo Video Generator',
      badge: 'veo-3.1-fast',
      icon: Video,
      color: 'purple',
    },
    {
      id: 'image_studio' as AIToolTab,
      labelTa: 'படக்கூடம் & எடிட்',
      labelEn: 'Image Create & Edit',
      badge: 'gemini-3.1-flash-image',
      icon: ImageIcon,
      color: 'pink',
    },
    {
      id: 'lyria_music' as AIToolTab,
      labelTa: 'இசை உருவாக்கம்',
      labelEn: 'Lyria Farm Music',
      badge: 'lyria-3-clip',
      icon: Music,
      color: 'amber',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-emerald-800/30">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'ta' ? 'அனைத்து AI சேவைகளும் நேரலையில்' : '8 Live Gemini AI Capabilities'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'உழவர் AI மல்டிமாடல் மையம்' : 'Uzhavar Multimodal AI Hub'}
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            {language === 'ta'
              ? 'சாட்பாட், நேரடி வரைபடம் & தேடல் தகவல் (Grounding), குரல் உரையாடல், ஆடியோ எழுத்தாக்கம், Veo வீடியோ அனிமேஷன், படக்கூடம் மற்றும் Lyria இசை உள்ளிட்ட அனைத்து மேம்பட்ட AI வசதிகள்.'
              : 'Complete suite of Google Gemini models: Multi-turn Chat, Maps & Search Grounding, Live Duplex Voice, Speech Transcription, Veo Video Generation, Image Editing, and Lyria Music.'}
          </p>
        </div>

        {/* Live Model Badges Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-[11px] text-stone-300">
          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            gemini-3.1-pro-preview
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            gemini-3.5-flash (Maps & Search)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            gemini-3.8-live
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            veo-3.1-fast-generate-preview
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            gemini-3.1-flash-image
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            lyria-3-clip-preview
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            gemini-3.5-transcribe
          </span>
        </div>
      </div>

      {/* Primary Tool Navigation Tabs Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-xs flex overflow-x-auto gap-1.5 no-scrollbar">
        {aiTools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeAITab === tool.id;
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => setActiveAITab(tool.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive
                    ? 'text-emerald-400'
                    : tool.color === 'purple'
                    ? 'text-purple-600'
                    : tool.color === 'pink'
                    ? 'text-pink-600'
                    : tool.color === 'blue'
                    ? 'text-blue-600'
                    : tool.color === 'amber'
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              />
              <span>{language === 'ta' ? tool.labelTa : tool.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Render Selected Tool Screen */}
      <div>
        {activeAITab === 'chatbot' && (
          <GeminiChatbot
            language={language}
            onNavigate={onNavigate}
            externalInitialPrompt={chatbotPromptTransfer}
          />
        )}

        {activeAITab === 'grounding' && <GroundingHub language={language} />}

        {activeAITab === 'live_voice' && <LiveVoiceConversation language={language} />}

        {activeAITab === 'transcribe' && (
          <AudioTranscribeTool
            language={language}
            onSendToChat={handleSendTranscribeToChat}
          />
        )}

        {activeAITab === 'veo_video' && <VeoVideoGenerator language={language} />}

        {activeAITab === 'image_studio' && <ImageStudio language={language} />}

        {activeAITab === 'lyria_music' && <LyriaMusicGenerator language={language} />}
      </div>
    </div>
  );
};
