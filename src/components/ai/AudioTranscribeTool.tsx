import React, { useState, useRef } from 'react';
import {
  Mic,
  Square,
  Upload,
  FileAudio,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Loader2,
  AlertCircle,
  Play,
  Volume2
} from 'lucide-react';
import { Language } from '../../types';
import { callAudioTranscription } from '../../services/geminiClient';

interface AudioTranscribeToolProps {
  language: Language;
  onSendToChat?: (text: string) => void;
}

export const AudioTranscribeTool: React.FC<AudioTranscribeToolProps> = ({
  language,
  onSendToChat
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    setErrorMsg(null);
    setTranscription(null);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordSeconds(0);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Stop all audio tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());

        // Automatically trigger transcription
        transcribeBlob(blob, mimeType);
      };

      mediaRecorder.start(250);
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordSeconds((sec) => sec + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone access error:', err);
      setErrorMsg(
        err?.message ||
          'Microphone permission denied or not supported in this frame. You can also upload an audio file below.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setTranscription(null);
    setAudioBlob(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);

    transcribeBlob(file, file.type || 'audio/webm');
  };

  const transcribeBlob = async (blob: Blob, mimeType: string) => {
    setIsTranscribing(true);
    setErrorMsg(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const res = await callAudioTranscription(
            base64String,
            mimeType,
            'Please transcribe this audio verbatim. The speaker may be speaking colloquial rural Tamil, English, or mixed Tanglish. Retain agricultural terms accurately.'
          );
          setTranscription(res.transcription);
        } catch (apiErr: any) {
          setErrorMsg(apiErr?.message || 'Failed to transcribe audio with gemini-3.5-transcribe.');
        } finally {
          setIsTranscribing(false);
        }
      };
      reader.readAsDataURL(blob);
    } catch (err: any) {
      setIsTranscribing(false);
      setErrorMsg(err?.message || 'Error processing audio file.');
    }
  };

  const handleCopy = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-stone-900">
              {language === 'ta' ? 'குரல் பதிவு எழுத்தாக்கம்' : 'Audio Transcription'}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              gemini-3.5-transcribe
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {language === 'ta'
              ? 'உங்கள் குரலை நேரடியாக பேசி அல்லது ஆடியோ ஃபைல் பதிவேற்றி நொடிகளில் தமிழில் துல்லியமாக உரையாக மாற்றலாம்.'
              : 'Speak into your microphone or upload any audio file to transcribe farm queries into clean Tamil or English text.'}
          </p>
        </div>
      </div>

      {/* Recording Control Area */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8 bg-stone-50/80 rounded-2xl border border-stone-200/60 text-center">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center gap-3 shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/80 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <span>{language === 'ta' ? 'மைக் மூலம் பேச தொடங்கு' : 'Start Microphone Recording'}</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
              <span className="text-red-700 font-bold text-sm">
                {language === 'ta' ? 'பதிவாகிறது...' : 'Recording in progress...'} ({recordSeconds}s)
              </span>
            </div>

            <button
              type="button"
              onClick={stopRecording}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <Square className="w-4 h-4" />
              <span>{language === 'ta' ? 'பதிவை நிறுத்து' : 'Stop Recording'}</span>
            </button>
          </div>
        )}

        <div className="text-stone-400 text-xs font-medium">{language === 'ta' ? 'அல்லது' : 'or'}</div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-3 rounded-xl border border-stone-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/30 text-stone-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-2xs"
          >
            <Upload className="w-4 h-4 text-stone-500" />
            <span>{language === 'ta' ? 'ஆடியோ ஃபைல் பதிவேற்று' : 'Upload Audio File (.mp3, .wav, .webm)'}</span>
          </button>
        </div>
      </div>

      {/* Audio Player Preview */}
      {audioUrl && (
        <div className="p-3.5 rounded-xl bg-stone-100/70 border border-stone-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ta' ? 'பதிவு செய்யப்பட்ட ஆடியோ:' : 'Recorded Audio Playback:'}</span>
          </div>
          <audio controls src={audioUrl} className="h-9 w-full max-w-sm" />
        </div>
      )}

      {/* Loading state */}
      {isTranscribing && (
        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-center gap-3 text-emerald-800 text-sm font-semibold">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
          <span>{language === 'ta' ? 'Gemini 3.5 Transcribe மூலம் ஆடியோ எழுத்தாக்கப்படுகிறது...' : 'Transcribing audio with gemini-3.5-transcribe...'}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Transcription Notice</p>
            <p className="text-xs text-amber-800 mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Result transcription */}
      {transcription && (
        <div className="space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'எழுத்தாக்கப்பட்ட உரை (Transcribed Output)' : 'Transcribed Text'}</span>
            </h4>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {onSendToChat && (
                <button
                  type="button"
                  onClick={() => onSendToChat(transcription)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'சாட்பாட்டில் கேள்' : 'Send to Chatbot'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 text-sm text-stone-800 leading-relaxed whitespace-pre-wrap shadow-2xs">
            {transcription}
          </div>
        </div>
      )}
    </div>
  );
};
