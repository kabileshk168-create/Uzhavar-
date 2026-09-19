import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Radio,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Language } from '../../types';

interface LiveVoiceConversationProps {
  language: Language;
}

export const LiveVoiceConversation: React.FC<LiveVoiceConversationProps> = ({ language }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<Array<{ role: 'user' | 'model'; text: string }>>([]);
  const [liveModelText, setLiveModelText] = useState<string>('');

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnectLive();
    };
  }, []);

  const connectLive = async () => {
    setErrorMsg(null);
    setLiveModelText('');

    try {
      // 1. Initialize 16kHz input AudioContext for microphone
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      inputAudioCtxRef.current = inputCtx;

      // 2. Initialize 24kHz output AudioContext for Gemini Live output
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      outputAudioCtxRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      // 3. Request user media stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
      });
      mediaStreamRef.current = stream;

      // 4. Connect WebSocket to server Live endpoint
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        console.log('[Live] WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === 'error') {
            setErrorMsg(msg.error);
          } else if (msg.type === 'audio' && msg.audio) {
            playLiveAudioChunk(outputCtx, msg.audio);
            setIsTalking(true);
          } else if (msg.type === 'text' && msg.text) {
            setLiveModelText((prev) => prev + msg.text);
          } else if (msg.type === 'interrupted') {
            stopCurrentAudioPlayback();
            setIsTalking(false);
          }
        } catch (e) {
          console.error('[Live] Error parsing message:', e);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsTalking(false);
      };

      ws.onerror = (err) => {
        console.error('[Live] WebSocket error:', err);
        setErrorMsg('WebSocket connection to Gemini 3.8 Live failed. Please ensure GEMINI_API_KEY is configured.');
      };

      // 5. Connect microphone processor node
      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      scriptProcessorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;

        const inputData = e.inputBuffer.getChannelData(0);
        // Convert Float32 [-1, 1] to Int16 PCM little-endian
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        // Convert Int16 buffer to Base64
        const uint8 = new Uint8Array(pcm16.buffer);
        let binary = '';
        for (let i = 0; i < uint8.length; i++) {
          binary += String.fromCharCode(uint8[i]);
        }
        const base64 = btoa(binary);

        ws.send(
          JSON.stringify({
            audio: base64,
          })
        );
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);
    } catch (err: any) {
      console.error('[Live] Setup error:', err);
      setErrorMsg(err?.message || 'Could not connect to microphone or Live API.');
      disconnectLive();
    }
  };

  const disconnectLive = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    stopCurrentAudioPlayback();
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }

    setIsConnected(false);
    setIsTalking(false);
  };

  const stopCurrentAudioPlayback = () => {
    for (const src of activeSourcesRef.current) {
      try {
        src.stop();
      } catch {}
    }
    activeSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
  };

  const playLiveAudioChunk = (audioCtx: AudioContext, base64Audio: string) => {
    try {
      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      // Convert Int16 PCM (24kHz) to Float32
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const audioBuffer = audioCtx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      const startTime = Math.max(now, nextStartTimeRef.current);
      source.start(startTime);
      nextStartTimeRef.current = startTime + audioBuffer.duration;

      activeSourcesRef.current.push(source);
      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
        if (activeSourcesRef.current.length === 0) {
          setIsTalking(false);
        }
      };
    } catch (e) {
      console.error('[Live] Error playing audio chunk:', e);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-stone-900">
              {language === 'ta' ? 'நேரடி இருவழி குரல் உரையாடல்' : 'Real-time Voice Conversation'}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              gemini-3.8-live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {language === 'ta'
              ? 'குறைந்த தாமதத்துடன் (Low Latency) AI உடன் நேரடியாக மனிதருடன் பேசுவது போல தொடர்ந்து உரையாடலாம்.'
              : 'Bi-directional, zero-friction voice conversation with Gemini 3.8 Live API directly in your browser.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Connected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
              Offline
            </span>
          )}
        </div>
      </div>

      {/* Visual Live Orb Section */}
      <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 rounded-3xl text-white relative overflow-hidden shadow-inner">
        {/* Animated Background Rings */}
        <div
          className={`absolute w-72 h-72 rounded-full border border-emerald-500/20 transition-all duration-700 ${
            isTalking ? 'scale-125 opacity-70 animate-ping' : isConnected ? 'scale-100 opacity-30' : 'scale-75 opacity-10'
          }`}
        />
        <div
          className={`absolute w-52 h-52 rounded-full border border-teal-500/30 transition-all duration-500 ${
            isTalking ? 'scale-110 opacity-80' : isConnected ? 'scale-95 opacity-40' : 'scale-75 opacity-10'
          }`}
        />

        {/* Center Microphone / Voice Orb Button */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={isConnected ? disconnectLive : connectLive}
            className={`w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all transform active:scale-95 ${
              isTalking
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-300 text-white shadow-emerald-500/50 scale-105'
                : isConnected
                ? 'bg-gradient-to-tr from-emerald-600 to-emerald-700 text-white shadow-emerald-700/40 hover:scale-105'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700'
            }`}
          >
            {isConnected ? (
              <Mic className={`w-12 h-12 ${isTalking ? 'animate-bounce' : ''}`} />
            ) : (
              <MicOff className="w-10 h-10" />
            )}
          </button>

          <div className="text-center">
            <h4 className="text-base font-bold text-white">
              {isConnected
                ? isTalking
                  ? language === 'ta'
                    ? 'Gemini பேசுகிறது...'
                    : 'Gemini is speaking...'
                  : language === 'ta'
                  ? 'உங்களை கேட்கிறது... பேசுங்கள்...'
                  : 'Listening... Speak now...'
                : language === 'ta'
                ? 'நேரடி உரையாடலை தொடங்க கிளிக் செய்யவும்'
                : 'Click Orb to Start Live Conversation'}
            </h4>
            <p className="text-xs text-stone-400 mt-1 max-w-sm">
              {isConnected
                ? language === 'ta'
                  ? 'இயல்பான தமிழில் பேசுங்கள்; குறுக்கீடு செய்யலாம்.'
                  : 'Speak naturally in Tamil or English. You can interrupt at any time.'
                : language === 'ta'
                ? '16kHz ஆடியோ உள்ளீடு மற்றும் 24kHz உயர்தர ஒலி பின்னணி'
                : 'Full-duplex WebSocket audio with real-time natural turn-taking'}
            </p>
          </div>
        </div>

        {/* Live Transcript / Subtitles */}
        {liveModelText && (
          <div className="mt-6 z-10 max-w-md w-full p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-emerald-100 text-center leading-relaxed">
            "{liveModelText}"
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Live Connection Notice</p>
            <p className="text-xs text-amber-800 mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
};
