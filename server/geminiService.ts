import { GoogleGenAI, GenerateVideosOperation, Modality } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

export function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required. Please verify in Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ChatOptions {
  message: string;
  history?: ChatMessage[];
  modelTier?: 'fast' | 'general' | 'complex';
  systemInstruction?: string;
}

// 1. Multi-turn Chat
export async function handleAIChat(options: ChatOptions) {
  const ai = getAIClient();
  const { message, history = [], modelTier = 'general', systemInstruction } = options;

  let modelName = 'gemini-3.5-flash';
  if (modelTier === 'complex') {
    modelName = 'gemini-3.1-pro-preview';
  } else if (modelTier === 'fast') {
    modelName = 'gemini-3.1-flash-lite';
  }

  const defaultInstruction =
    'You are Uzhavar AI, a knowledgeable, compassionate agricultural and agronomy assistant tailored for Tamil Nadu farmers. ' +
    'Provide actionable, farmer-friendly guidance on crop management, soil health, fertilizer ratios (NPK), irrigation, pest control, organic alternatives, and mandi market prices. ' +
    'Support responses in clear, respectful Tamil when addressed in Tamil, or simple English when addressed in English. Keep answers practical, structured, and easy to read.';

  const chat = ai.chats.create({
    model: modelName,
    config: {
      systemInstruction: systemInstruction || defaultInstruction,
    },
  });

  // Replay past history to restore context
  for (const h of history) {
    if (h.role === 'user') {
      try {
        await chat.sendMessage({ message: h.text });
      } catch {
        // Continue if single history turn had an issue
      }
    }
  }

  const response = await chat.sendMessage({ message });
  return {
    response: response.text || '',
    model: modelName,
  };
}

// 2. Maps Grounding (using gemini-3.5-flash)
export async function handleMapsGrounding(query: string, userCoords?: { latitude: number; longitude: number }) {
  const ai = getAIClient();
  const latLng = userCoords || { latitude: 9.9252, longitude: 78.1198 }; // Default Madurai, Tamil Nadu central agricultural hub

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: query,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: latLng.latitude,
            longitude: latLng.longitude,
          },
        },
      },
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const mapsUrls: Array<{ uri: string; title: string; reviewSnippet?: string }> = [];

  for (const chunk of groundingChunks as any[]) {
    if (chunk.maps?.uri) {
      mapsUrls.push({
        uri: chunk.maps.uri,
        title: chunk.maps.title || 'View on Google Maps',
        reviewSnippet: chunk.maps.placeAnswerSources?.reviewSnippets?.[0]?.content || '',
      });
    }
  }

  return {
    response: response.text || '',
    mapsUrls,
    groundingMetadata: response.candidates?.[0]?.groundingMetadata,
  };
}

// 3. Search Grounding (using gemini-3.5-flash)
export async function handleSearchGrounding(query: string) {
  const ai = getAIClient();

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const searchSources: Array<{ uri: string; title: string }> = [];

  for (const chunk of groundingChunks as any[]) {
    if (chunk.web?.uri) {
      searchSources.push({
        uri: chunk.web.uri,
        title: chunk.web.title || 'Web Source',
      });
    }
  }

  return {
    response: response.text || '',
    searchSources,
    groundingMetadata: response.candidates?.[0]?.groundingMetadata,
  };
}

// 4. Audio Transcription (using gemini-3.5-transcribe)
export async function handleAudioTranscription(audioBase64: string, mimeType: string = 'audio/webm', prompt?: string) {
  const ai = getAIClient();

  const cleanBase64 = audioBase64.replace(/^data:[^;]+;base64,/, '');
  const audioPart = {
    inlineData: {
      mimeType: mimeType || 'audio/webm',
      data: cleanBase64,
    },
  };

  const textPrompt = prompt || 'Please accurately transcribe this audio recording. The speaker may be using Tamil, Tamil-English (Tanglish), or English. Return the verbatim transcription.';

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-transcribe',
    contents: {
      parts: [audioPart, { text: textPrompt }],
    },
  });

  return {
    transcription: response.text || '',
  };
}

// 5. Image Creation & Editing (using gemini-3.1-flash-image-preview / gemini-3.1-flash-image)
export async function handleImageCreateEdit(prompt: string, imageBase64?: string, mimeType: string = 'image/jpeg', aspectRatio: string = '1:1') {
  const ai = getAIClient();

  const validAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
  const safeAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

  let response;
  const targetModel = 'gemini-3.1-flash-image';

  if (imageBase64) {
    // Edit existing image
    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
    response = await ai.models.generateContent({
      model: targetModel,
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || 'image/jpeg',
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: safeAspectRatio as any,
          imageSize: '1K',
        },
      },
    });
  } else {
    // Create new image
    response = await ai.models.generateContent({
      model: targetModel,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: safeAspectRatio as any,
          imageSize: '1K',
        },
      },
    });
  }

  let imageUrl = '';
  let caption = '';

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        const partMime = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${partMime};base64,${part.inlineData.data}`;
      } else if (part.text) {
        caption += part.text + ' ';
      }
    }
  }

  return {
    imageUrl,
    caption: caption.trim(),
  };
}

// 6. Video Generation with Veo (veo-3.1-fast-generate-preview)
export async function startVideoGeneration(prompt: string, imageBase64?: string, mimeType: string = 'image/jpeg', aspectRatio: '16:9' | '9:16' = '16:9') {
  const ai = getAIClient();

  const safeAspect = aspectRatio === '9:16' ? '9:16' : '16:9';
  const model = 'veo-3.1-fast-generate-preview';

  let operation;
  if (imageBase64) {
    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
    operation = await ai.models.generateVideos({
      model,
      prompt: prompt || 'Animate this farm scene vividly with natural motion',
      image: {
        imageBytes: cleanBase64,
        mimeType: mimeType || 'image/jpeg',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: safeAspect,
      },
    });
  } else {
    operation = await ai.models.generateVideos({
      model,
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: safeAspect,
      },
    });
  }

  return {
    operationName: operation.name,
  };
}

export async function checkVideoStatus(operationName: string) {
  const ai = getAIClient();
  const op = new GenerateVideosOperation();
  op.name = operationName;
  const updated = await ai.operations.getVideosOperation({ operation: op });

  return {
    done: Boolean(updated.done),
    error: updated.error ? String(updated.error.message || updated.error) : null,
  };
}

export async function getVideoDownloadUri(operationName: string) {
  const ai = getAIClient();
  const op = new GenerateVideosOperation();
  op.name = operationName;
  const updated = await ai.operations.getVideosOperation({ operation: op });
  const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
  return uri || null;
}

// 7. Music Generation with Lyria (lyria-3-clip-preview & lyria-3-pro-preview)
export async function handleMusicGeneration(prompt: string, durationType: 'clip' | 'full' = 'clip', imageBase64?: string, mimeType: string = 'image/jpeg') {
  const ai = getAIClient();
  const model = durationType === 'full' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

  let contents: any = prompt;
  if (imageBase64) {
    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
    contents = {
      parts: [
        { text: prompt },
        { inlineData: { data: cleanBase64, mimeType: mimeType || 'image/jpeg' } },
      ],
    };
  }

  const response = await ai.models.generateContentStream({
    model,
    contents,
    config: {
      responseModalities: [Modality.AUDIO],
    },
  });

  let audioBase64 = '';
  let lyrics = '';
  let audioMimeType = 'audio/wav';

  for await (const chunk of response) {
    const parts = chunk.candidates?.[0]?.content?.parts;
    if (!parts) continue;
    for (const part of parts) {
      if (part.inlineData?.data) {
        if (!audioBase64 && part.inlineData.mimeType) {
          audioMimeType = part.inlineData.mimeType;
        }
        audioBase64 += part.inlineData.data;
      }
      if (part.text && !lyrics) {
        lyrics = part.text;
      }
    }
  }

  return {
    audioBase64,
    mimeType: audioMimeType,
    lyrics,
  };
}
