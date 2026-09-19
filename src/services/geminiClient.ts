// Client-side API caller for server-side Gemini endpoints

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

export async function callAIChat(params: {
  message: string;
  history?: ChatTurn[];
  modelTier?: 'fast' | 'general' | 'complex';
  systemInstruction?: string;
}) {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Chat request failed: ${res.statusText}`);
  }
  return res.json() as Promise<{ response: string; model: string }>;
}

export async function callMapsGrounding(query: string, coords?: { latitude: number; longitude: number }) {
  const res = await fetch('/api/ai/maps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      latitude: coords?.latitude,
      longitude: coords?.longitude,
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Maps Grounding failed: ${res.statusText}`);
  }
  return res.json() as Promise<{
    response: string;
    mapsUrls: Array<{ uri: string; title: string; reviewSnippet?: string }>;
    groundingMetadata?: any;
  }>;
}

export async function callSearchGrounding(query: string) {
  const res = await fetch('/api/ai/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Search Grounding failed: ${res.statusText}`);
  }
  return res.json() as Promise<{
    response: string;
    searchSources: Array<{ uri: string; title: string }>;
    groundingMetadata?: any;
  }>;
}

export async function callAudioTranscription(audioBase64: string, mimeType: string = 'audio/webm', prompt?: string) {
  const res = await fetch('/api/ai/transcribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audioBase64, mimeType, prompt }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Transcription failed: ${res.statusText}`);
  }
  return res.json() as Promise<{ transcription: string }>;
}

export async function callImageCreateEdit(params: {
  prompt: string;
  imageBase64?: string;
  mimeType?: string;
  aspectRatio?: string;
}) {
  const res = await fetch('/api/ai/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Image generation failed: ${res.statusText}`);
  }
  return res.json() as Promise<{ imageUrl: string; caption?: string }>;
}

export async function startVeoVideo(params: {
  prompt: string;
  imageBase64?: string;
  mimeType?: string;
  aspectRatio?: '16:9' | '9:16';
}) {
  const res = await fetch('/api/ai/video-generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Failed to start video generation: ${res.statusText}`);
  }
  return res.json() as Promise<{ operationName: string }>;
}

export async function pollVeoVideoStatus(operationName: string) {
  const res = await fetch('/api/ai/video-status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operationName }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Failed to poll video status: ${res.statusText}`);
  }
  return res.json() as Promise<{ done: boolean; error?: string }>;
}

export async function downloadVeoVideoBlob(operationName: string): Promise<Blob> {
  const res = await fetch('/api/ai/video-download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operationName }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Failed to download video: ${res.statusText}`);
  }
  return res.blob();
}

export async function callMusicGeneration(params: {
  prompt: string;
  durationType?: 'clip' | 'full';
  imageBase64?: string;
  mimeType?: string;
}) {
  const res = await fetch('/api/ai/music', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Music generation failed: ${res.statusText}`);
  }
  return res.json() as Promise<{ audioBase64: string; mimeType: string; lyrics: string }>;
}
