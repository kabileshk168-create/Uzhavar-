import { LiveServerMessage, Modality } from '@google/genai';
import { WebSocket, WebSocketServer } from 'ws';
import { getAIClient } from './geminiService';

export function setupLiveWebSocket(wss: WebSocketServer) {
  wss.on('connection', async (clientWs: WebSocket) => {
    console.log('[LiveSocket] Client connected to Gemini 3.8 Live API');

    let session: any = null;

    try {
      const ai = getAIClient();

      session = await ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' },
            },
          },
          systemInstruction:
            'You are Uzhavar Live, an intelligent, empathetic rural voice companion and agronomy advisor for Tamil Nadu farmers. ' +
            'Provide direct, clear, short verbal answers (1-3 sentences) in Tamil or English on crop protection, weather alerts, fertilizer advice, and mandi prices. ' +
            'Be respectful and conversational.',
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            if (clientWs.readyState !== WebSocket.OPEN) return;

            const parts = message.serverContent?.modelTurn?.parts;
            if (parts && parts.length > 0) {
              for (const part of parts) {
                if (part.inlineData?.data) {
                  clientWs.send(
                    JSON.stringify({
                      type: 'audio',
                      audio: part.inlineData.data,
                    })
                  );
                }
                if (part.text) {
                  clientWs.send(
                    JSON.stringify({
                      type: 'text',
                      text: part.text,
                    })
                  );
                }
              }
            }

            if (message.serverContent?.interrupted) {
              clientWs.send(
                JSON.stringify({
                  type: 'interrupted',
                  interrupted: true,
                })
              );
            }
          },
          onclose: () => {
            console.log('[LiveSocket] Gemini session closed');
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: 'session_closed' }));
              clientWs.close();
            }
          },
          onerror: (err: any) => {
            console.error('[LiveSocket] Gemini session error:', err);
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(
                JSON.stringify({
                  type: 'error',
                  error: err?.message || 'Gemini Live session error',
                })
              );
            }
          },
        },
      });

      clientWs.send(JSON.stringify({ type: 'ready', message: 'Connected to Gemini 3.8 Live API' }));
    } catch (err: any) {
      console.error('[LiveSocket] Failed to connect to Gemini Live session:', err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(
          JSON.stringify({
            type: 'error',
            error: err?.message || 'Failed to initialize Gemini Live session. Verify GEMINI_API_KEY in Secrets.',
          })
        );
      }
      return;
    }

    clientWs.on('message', (data) => {
      try {
        const payload = JSON.parse(data.toString());
        if (session && payload.audio) {
          session.sendRealtimeInput({
            audio: {
              data: payload.audio,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        } else if (session && payload.text) {
          session.sendRealtimeInput({
            text: payload.text,
          });
        }
      } catch (e) {
        console.error('[LiveSocket] Error forwarding client input:', e);
      }
    });

    clientWs.on('close', () => {
      console.log('[LiveSocket] Client disconnected');
      if (session) {
        try {
          session.close();
        } catch {
          // ignore cleanup errors
        }
      }
    });

    clientWs.on('error', (err) => {
      console.error('[LiveSocket] Client socket error:', err);
    });
  });
}
