import { sampleVoiceQueries } from '../data/mockData';
import { Language } from '../types';

export interface VoiceResult {
  query: string;
  response: string;
  suggestedActions: { labelTa: string; labelEn: string; targetTab: string }[];
}

export class VoiceAssistantManager {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  public static speak(text: string, lang: Language = 'ta') {
    if (!this.synth) return;
    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      this.synth.speak(utterance);
    } catch {
      // Graceful fallback if speech synthesis is blocked in iframe
    }
  }

  public static stopSpeaking() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // No-op
      }
    }
  }

  public static matchVoiceQuery(spokenText: string, lang: Language = 'ta'): VoiceResult {
    const clean = spokenText.toLowerCase().trim();

    // Match against our comprehensive sample queries
    const match = sampleVoiceQueries.find(q => {
      const qTa = q.phrase.toLowerCase();
      const qEn = q.phraseEn.toLowerCase();
      return (
        clean.includes('தக்காளி') ||
        clean.includes('விலை') ||
        clean.includes('price') ||
        clean.includes('tomato')
      ) ? q.phrase.includes('தக்காளி') : (
        clean.includes(qTa) ||
        clean.includes(qEn) ||
        qTa.includes(clean) ||
        qEn.includes(clean)
      );
    });

    if (match) {
      return {
        query: lang === 'ta' ? match.phrase : match.phraseEn,
        response: lang === 'ta' ? match.responseTa : match.responseEn,
        suggestedActions: match.suggestedActions
      };
    }

    // Default intelligent contextual response
    if (lang === 'ta') {
      return {
        query: spokenText,
        response: `"${spokenText}" குறித்த தகவல்களை உழவர்+ AI பகுப்பாய்வு செய்துள்ளது. உங்கள் தேவைக்கான சந்தை நிலவரம் மற்றும் பரிந்துரைகள் கீழே காட்டப்பட்டுள்ளன.`,
        suggestedActions: [
          { labelTa: 'சந்தை நிலவரம்', labelEn: 'Market Intelligence', targetTab: 'market' },
          { labelTa: 'AI வேளாண் வழிகாட்டி', labelEn: 'Ask AI', targetTab: 'ai_chat' },
          { labelTa: 'பயிர் விற்பனை', labelEn: 'Sell Produce', targetTab: 'marketplace' }
        ]
      };
    } else {
      return {
        query: spokenText,
        response: `Uzhavar+ AI analyzed your question: "${spokenText}". Here are the latest market insights and recommended actions for your farm.`,
        suggestedActions: [
          { labelTa: 'சந்தை நிலவரம்', labelEn: 'Market Intelligence', targetTab: 'market' },
          { labelTa: 'AI வேளாண் வழிகாட்டி', labelEn: 'Ask AI', targetTab: 'ai_chat' },
          { labelTa: 'பயிர் விற்பனை', labelEn: 'Sell Produce', targetTab: 'marketplace' }
        ]
      };
    }
  }
}
