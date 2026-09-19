import express, { Request, Response } from 'express';
import {
  handleAIChat,
  handleMapsGrounding,
  handleSearchGrounding,
  handleAudioTranscription,
  handleImageCreateEdit,
  startVideoGeneration,
  checkVideoStatus,
  getVideoDownloadUri,
  handleMusicGeneration,
} from './geminiService';

export const aiRouter = express.Router();

// 1. Multi-turn Chat
aiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, modelTier, systemInstruction } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = await handleAIChat({
      message,
      history,
      modelTier,
      systemInstruction,
    });
    res.json(result);
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini',
    });
  }
});

// 2. Google Maps Grounding
aiRouter.post('/maps', async (req: Request, res: Response) => {
  try {
    const { query, latitude, longitude } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required for Maps Grounding' });
    }

    const userCoords =
      typeof latitude === 'number' && typeof longitude === 'number'
        ? { latitude, longitude }
        : undefined;

    const result = await handleMapsGrounding(query, userCoords);
    res.json(result);
  } catch (error: any) {
    console.error('Maps Grounding error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to query Google Maps grounding',
    });
  }
});

// 3. Google Search Grounding
aiRouter.post('/search', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required for Search Grounding' });
    }

    const result = await handleSearchGrounding(query);
    res.json(result);
  } catch (error: any) {
    console.error('Search Grounding error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to query Google Search grounding',
    });
  }
});

// 4. Audio Transcription
aiRouter.post('/transcribe', async (req: Request, res: Response) => {
  try {
    const { audioBase64, mimeType, prompt } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'audioBase64 is required' });
    }

    const result = await handleAudioTranscription(audioBase64, mimeType, prompt);
    res.json(result);
  } catch (error: any) {
    console.error('Audio Transcription error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to transcribe audio with gemini-3.5-transcribe',
    });
  }
});

// 5. Image Create / Edit
aiRouter.post('/image', async (req: Request, res: Response) => {
  try {
    const { prompt, imageBase64, mimeType, aspectRatio } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await handleImageCreateEdit(prompt, imageBase64, mimeType, aspectRatio);
    res.json(result);
  } catch (error: any) {
    console.error('Image Generation/Editing error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to process image generation with Gemini',
    });
  }
});

// 6. Video Generation (Veo)
aiRouter.post('/video-generate', async (req: Request, res: Response) => {
  try {
    const { prompt, imageBase64, mimeType, aspectRatio } = req.body;
    if (!prompt && !imageBase64) {
      return res.status(400).json({ error: 'Prompt or image is required' });
    }

    const result = await startVideoGeneration(prompt || '', imageBase64, mimeType, aspectRatio);
    res.json(result);
  } catch (error: any) {
    console.error('Veo video generation error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to initiate Veo video generation',
    });
  }
});

aiRouter.post('/video-status', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const result = await checkVideoStatus(operationName);
    res.json(result);
  } catch (error: any) {
    console.error('Video status error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to query video status',
    });
  }
});

aiRouter.post('/video-download', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const uri = await getVideoDownloadUri(operationName);
    if (!uri) {
      return res.status(404).json({ error: 'Video URI not available yet or operation incomplete' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const videoRes = await fetch(uri, {
      headers: {
        'x-goog-api-key': apiKey || '',
      },
    });

    if (!videoRes.ok) {
      throw new Error(`Failed to fetch video stream: ${videoRes.statusText}`);
    }

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'inline; filename="uzhavar-veo-generation.mp4"');

    if (!videoRes.body) {
      return res.status(500).json({ error: 'Empty video stream body' });
    }

    // Convert Web ReadableStream to Node response
    const reader = videoRes.body.getReader();
    const pump = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          break;
        }
        res.write(Buffer.from(value));
      }
    };
    await pump();
  } catch (error: any) {
    console.error('Video download error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: error?.message || 'Failed to download generated video',
      });
    }
  }
});

// 7. Lyria Music Generation
aiRouter.post('/music', async (req: Request, res: Response) => {
  try {
    const { prompt, durationType, imageBase64, mimeType } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await handleMusicGeneration(prompt, durationType, imageBase64, mimeType);
    res.json(result);
  } catch (error: any) {
    console.error('Lyria music error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate music with Lyria',
    });
  }
});
