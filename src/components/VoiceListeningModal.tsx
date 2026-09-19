import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Store,
  GraduationCap,
  Sprout,
  HelpCircle,
  Clock,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { Language } from '../types';
import { sampleVoiceQueries } from '../data/mockData';
import { VoiceAssistantManager, VoiceResult } from '../services/voiceService';

interface VoiceListeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigate: (tab: string) => void;
  initialQuery?: string;
}

export interface RecentVoiceCommand {
  id: string;
  query: string;
  count: number;
  lastUsed: number;
}

type VoiceState = 'idle' | 'listening' | 'processing' | 'answered';

const DEFAULT_RECENT_COMMANDS_TA: RecentVoiceCommand[] = [
  { id: 'rc-1', query: 'தக்காளி விலை என்ன?', count: 5, lastUsed: Date.now() - 1000 * 60 * 12 },
  { id: 'rc-2', query: 'மழை வருமா? அறுவடை செய்யலாமா?', count: 4, lastUsed: Date.now() - 1000 * 60 * 45 },
  { id: 'rc-3', query: 'அடுத்த வாரம் நெல் விலை ஏறுமா?', count: 3, lastUsed: Date.now() - 1000 * 60 * 180 },
  { id: 'rc-4', query: 'என் பயிருக்கு என்ன பிரச்சனை?', count: 2, lastUsed: Date.now() - 1000 * 60 * 360 },
];

const DEFAULT_RECENT_COMMANDS_EN: RecentVoiceCommand[] = [
  { id: 'rc-1', query: "What is today's tomato price?", count: 5, lastUsed: Date.now() - 1000 * 60 * 12 },
  { id: 'rc-2', query: 'Will it rain today? Should I harvest?', count: 4, lastUsed: Date.now() - 1000 * 60 * 45 },
  { id: 'rc-3', query: 'Will paddy price rise next week?', count: 3, lastUsed: Date.now() - 1000 * 60 * 180 },
  { id: 'rc-4', query: 'What is wrong with my crop?', count: 2, lastUsed: Date.now() - 1000 * 60 * 360 },
];

export const VoiceListeningModal: React.FC<VoiceListeningModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigate,
  initialQuery
}) => {
  const [voiceState, setVoiceState] = useState<VoiceState>('listening');
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [activeResult, setActiveResult] = useState<VoiceResult | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Recent Commands state with persistence
  const [recentCommands, setRecentCommands] = useState<RecentVoiceCommand[]>(() => {
    try {
      const saved = localStorage.getItem('agrinext_recent_voice_commands');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return language === 'ta' ? DEFAULT_RECENT_COMMANDS_TA : DEFAULT_RECENT_COMMANDS_EN;
  });

  // Keep defaults updated if empty when language changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem('agrinext_recent_voice_commands');
      if (!saved) {
        setRecentCommands(language === 'ta' ? DEFAULT_RECENT_COMMANDS_TA : DEFAULT_RECENT_COMMANDS_EN);
      }
    } catch {
      // Ignore
    }
  }, [language]);

  // When opened, initialize listening simulation
  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        handleTriggerQuery(initialQuery);
      } else {
        startListeningSimulation();
      }
    } else {
      VoiceAssistantManager.stopSpeaking();
      setVoiceState('idle');
      setCurrentTranscript('');
      setActiveResult(null);
    }
  }, [isOpen, initialQuery]);

  const recordRecentCommand = (text: string) => {
    if (!text || text.trim().length === 0) return;
    const trimmed = text.trim();
    setRecentCommands((prev) => {
      const existingIdx = prev.findIndex(
        (c) => c.query.trim().toLowerCase() === trimmed.toLowerCase()
      );
      let updated: RecentVoiceCommand[];
      if (existingIdx !== -1) {
        const item = prev[existingIdx];
        const refreshed = {
          ...item,
          query: trimmed, // preserve capitalization
          count: item.count + 1,
          lastUsed: Date.now(),
        };
        updated = [refreshed, ...prev.filter((_, idx) => idx !== existingIdx)];
      } else {
        const newItem: RecentVoiceCommand = {
          id: `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          query: trimmed,
          count: 1,
          lastUsed: Date.now(),
        };
        updated = [newItem, ...prev];
      }
      const capped = updated.slice(0, 10);
      try {
        localStorage.setItem('agrinext_recent_voice_commands', JSON.stringify(capped));
      } catch {
        // Ignore
      }
      return capped;
    });
  };

  const handleClearRecents = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentCommands([]);
    try {
      localStorage.removeItem('agrinext_recent_voice_commands');
    } catch {
      // Ignore
    }
  };

  const handleDeleteRecent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentCommands((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem('agrinext_recent_voice_commands', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleRestoreDefaults = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaults = language === 'ta' ? DEFAULT_RECENT_COMMANDS_TA : DEFAULT_RECENT_COMMANDS_EN;
    setRecentCommands(defaults);
    try {
      localStorage.setItem('agrinext_recent_voice_commands', JSON.stringify(defaults));
    } catch {
      // Ignore
    }
  };

  const formatTimeAgo = (timestamp: number, lang: Language) => {
    const diffMinutes = Math.floor((Date.now() - timestamp) / (1000 * 60));
    if (diffMinutes < 1) return lang === 'ta' ? 'சற்று முன்' : 'Just now';
    if (diffMinutes < 60) return lang === 'ta' ? `${diffMinutes} நிமி முன்` : `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return lang === 'ta' ? `${diffHours} மணி முன்` : `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return lang === 'ta' ? `${diffDays} நாள் முன்` : `${diffDays}d ago`;
  };

  const startListeningSimulation = () => {
    setVoiceState('listening');
    setCurrentTranscript(language === 'ta' ? 'கேட்கிறேன்... பேசுங்கள்...' : 'Listening... Speak now...');
    setActiveResult(null);

    // Try starting Web Speech API if supported in iframe
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
          recognition.interimResults = true;
          recognition.maxAlternatives = 1;

          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setCurrentTranscript(transcript);
            if (event.results[0].isFinal) {
              handleTriggerQuery(transcript);
            }
          };

          recognition.onerror = () => {
            // fallback gracefully to interactive chips
          };

          recognition.start();
        } catch {
          // Ignored
        }
      }
    }
  };

  const handleTriggerQuery = (queryText: string) => {
    setCurrentTranscript(queryText);
    setVoiceState('processing');

    // Register query into Recent Commands history
    recordRecentCommand(queryText);

    // Simulate AI processing delay
    setTimeout(() => {
      const matched = VoiceAssistantManager.matchVoiceQuery(queryText, language);
      setActiveResult(matched);
      setVoiceState('answered');

      if (audioEnabled) {
        VoiceAssistantManager.speak(matched.response, language);
      }
    }, 900);
  };

  const handleToggleAudio = () => {
    if (audioEnabled) {
      VoiceAssistantManager.stopSpeaking();
      setAudioEnabled(false);
    } else {
      setAudioEnabled(true);
      if (activeResult) {
        VoiceAssistantManager.speak(activeResult.response, language);
      }
    }
  };

  const handleActionClick = (targetTab: string) => {
    VoiceAssistantManager.stopSpeaking();
    onClose();
    onNavigate(targetTab);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-100 relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                {language === 'ta' ? 'உழவர்+ AI குரல் உதவியாளர்' : 'Uzhavar+ AI Voice Companion'}
              </h3>
              <p className="text-[11px] text-stone-500">
                {language === 'ta' ? 'தமிழில் பேசலாம் • Voice First' : 'Voice Assisted Farm Intelligence'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                audioEnabled ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-stone-100 border-stone-200 text-stone-400'
              }`}
              title={audioEnabled ? 'Mute speech / ஒலியை நிறுத்துக' : 'Enable speech / ஒலியை இயக்குக'}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                VoiceAssistantManager.stopSpeaking();
                onClose();
              }}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Center Voice Visualizer */}
        <div className="my-5 flex flex-col items-center justify-center text-center">
          {voiceState === 'listening' && (
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full bg-emerald-100 animate-pulse-ring flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40">
                    <Mic className="w-8 h-8 animate-pulse" />
                  </div>
                </div>
              </div>
              {/* Animated Sound Wave Bars */}
              <div className="flex items-center gap-1.5 h-6 my-1.5">
                {[40, 70, 100, 60, 90, 40, 80, 50, 95, 30].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-500 rounded-full wave-bar"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-emerald-900 mt-1">
                {language === 'ta' ? 'பேசுங்கள், நான் கேட்கிறேன்...' : 'Listening... Speak now...'}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5 max-w-xs">
                {language === 'ta' 
                  ? 'கீழே உள்ள சமீபத்திய அல்லது மாதிரி வினாக்களை தட்டவும்'
                  : 'Tap recent commands below or speak directly into your mic'}
              </p>
            </div>
          )}

          {voiceState === 'processing' && (
            <div className="flex flex-col items-center py-3">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 animate-spin mb-2">
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-stone-800">
                {language === 'ta' ? 'உழவர்+ AI சிந்திக்கிறது...' : 'Analyzing farm data...'}
              </p>
              <p className="text-xs text-stone-500 mt-1 italic">
                "{currentTranscript}"
              </p>
            </div>
          )}

          {voiceState === 'answered' && activeResult && (
            <div className="w-full text-left bg-gradient-to-br from-emerald-50 to-teal-50/50 p-4 rounded-2xl border border-emerald-200/80">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  {language === 'ta' ? 'உங்களின் கேள்வி' : 'Your Query'}
                </span>
                <button
                  onClick={startListeningSimulation}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-white px-2 py-1 rounded-lg border border-emerald-200 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'ta' ? 'மீண்டும் பேச' : 'Speak Again'}</span>
                </button>
              </div>

              <h4 className="text-xs sm:text-sm font-semibold text-stone-800 italic mb-2">
                "{activeResult.query}"
              </h4>

              <div className="p-3 bg-white rounded-xl border border-emerald-100 text-stone-800 text-xs sm:text-sm leading-relaxed shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'உழவர்+ AI வழிகாட்டல்' : 'AI Companion Response'}</span>
                </div>
                {activeResult.response}
              </div>

              {/* Action Buttons as specified in user prompt */}
              <div className="mt-3">
                <p className="text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                  {language === 'ta' ? 'அடுத்த கட்ட நடவடிக்கைகள்' : 'Suggested Decision Actions'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeResult.suggestedActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleActionClick(action.targetTab)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      <span>{language === 'ta' ? action.labelTa : action.labelEn}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section: Recent Commands & Explore Sample Queries */}
        <div className="mt-auto pt-3 border-t border-stone-100 flex flex-col gap-3 overflow-y-auto max-h-56 pr-1">
          {/* RECENT COMMANDS SECTION */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-md bg-emerald-100 text-[#14532d]">
                  <Clock className="w-3 h-3" />
                </span>
                <h4 className="text-[11px] font-bold text-stone-800 uppercase tracking-wider">
                  {language === 'ta' ? 'சமீபத்திய கட்டளைகள்' : 'Recent Commands'}
                </h4>
                {recentCommands.length > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-[#14532d]">
                    {recentCommands.length}
                  </span>
                )}
              </div>

              {recentCommands.length > 0 ? (
                <button
                  type="button"
                  onClick={handleClearRecents}
                  className="text-[10px] font-semibold text-stone-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                  title={language === 'ta' ? 'வரலாற்றை அழி' : 'Clear recent commands'}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{language === 'ta' ? 'அழி' : 'Clear'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRestoreDefaults}
                  className="text-[10px] font-semibold text-emerald-700 hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'ta' ? 'மாதிரிகள்' : 'Sample Recents'}</span>
                </button>
              )}
            </div>

            {recentCommands.length === 0 ? (
              <div className="p-2.5 rounded-xl bg-stone-50 border border-dashed border-stone-200 text-center">
                <p className="text-[11px] text-stone-400">
                  {language === 'ta'
                    ? 'சமீபத்திய கட்டளைகள் எதுவும் இல்லை. கீழே உள்ள மாதிரி கேள்விகளை தட்டவும்.'
                    : 'No recent commands yet. Tap a question below or speak into the mic.'}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {recentCommands.map((cmd) => (
                  <div
                    key={cmd.id}
                    onClick={() => handleTriggerQuery(cmd.query)}
                    className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100 text-[#14532d] border border-emerald-200/80 hover:border-emerald-400 transition-all cursor-pointer shadow-2xs text-xs"
                    title={language === 'ta' ? 'மீண்டும் இயக்க தட்டவும்' : 'Tap to re-run query'}
                  >
                    <RotateCcw className="w-3 h-3 text-emerald-700 group-hover:-rotate-45 transition-transform shrink-0" />
                    <span className="font-semibold">{cmd.query}</span>

                    {/* Frequency Badge if queried multiple times */}
                    {cmd.count > 1 && (
                      <span className="text-[10px] font-bold text-emerald-900 bg-emerald-200/80 px-1.5 py-0.2 rounded-full">
                        {cmd.count}x
                      </span>
                    )}

                    <span className="text-[10px] text-emerald-700/60 ml-0.5">
                      {formatTimeAgo(cmd.lastUsed, language)}
                    </span>

                    {/* Quick remove button */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteRecent(cmd.id, e)}
                      className="opacity-40 group-hover:opacity-100 p-0.5 hover:text-rose-600 rounded transition-opacity cursor-pointer ml-0.5"
                      title={language === 'ta' ? 'நீக்கு' : 'Remove'}
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QUICK SAMPLE QUERIES SECTION */}
          <div className="space-y-1.5 pt-1.5 border-t border-stone-100">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Mic className="w-3 h-3 text-emerald-600" />
              <span>{language === 'ta' ? 'மேலும் மாதிரி வினாக்கள் (Tap to speak)' : 'More Sample Queries (Tap to speak)'}</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sampleVoiceQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTriggerQuery(language === 'ta' ? q.phrase : q.phraseEn)}
                  className="text-left px-2 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 text-[11px] font-medium text-stone-700 transition-all cursor-pointer"
                >
                  🎙️ {language === 'ta' ? q.phrase : q.phraseEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
