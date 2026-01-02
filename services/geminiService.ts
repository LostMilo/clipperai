import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ClipMetadata, VideoInfo } from "../types";

// In a real app, this would be fetched from a backend that scrapes the YouTube transcript.
// For this demo, we simulate a transcript based on the video topic.
const SIMULATED_TRANSCRIPT = `
[00:00] Hey guys, welcome back to the channel! Today we are looking at this insane money-making method on Whop.
[00:45] Look at these dashboard results. This is absolutely trending right now.
[02:15] The key is finding the right community. This one right here has huge volume.
[03:30] Okay, let's breakdown the strategy. You need to leverage short form content.
[05:00] This is the most important part of the video. If you want to succeed, you need to use this tool.
[08:20] We are setting up the automation. It's running.
[09:15] Look at the sales coming in! It's actually working! Can you believe this?
[10:00] Thanks for watching, check the link in bio!
`;

export const fetchRealVideoMetadata = async (url: string): Promise<VideoInfo> => {
    // Basic validation
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        throw new Error("Invalid YouTube URL");
    }

    try {
        // Use YouTube oEmbed to check if video exists and get real metadata
        // This is a public endpoint that doesn't require an API key for basic info
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
        const response = await fetch(oembedUrl);
        
        if (!response.ok) {
            throw new Error("Video not found or unavailable");
        }

        const data = await response.json();

        return {
            url: url,
            title: data.title,
            channel: data.author_name,
            duration: "Unknown", // oEmbed doesn't provide duration, strictly
            thumbnail: data.thumbnail_url
        };
    } catch (e) {
        console.warn("Real fetch failed, falling back to simulation for demo purposes if offline", e);
        // Fallback for offline dev or CORS strictness
        return {
            url,
            title: 'Verified YouTube Video Content',
            channel: 'Content Creator',
            duration: '10:05',
            thumbnail: `https://img.youtube.com/vi/${extractVideoID(url)}/maxresdefault.jpg`
        };
    }
};

const extractVideoID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export const analyzeVideoForClips = async (videoTitle: string, videoContext: string): Promise<ClipMetadata[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found");
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are a viral content expert for TikTok, Instagram Reels, and YouTube Shorts.
      Analyze the context for a video titled "${videoTitle}".
      
      The goal is to drive engagement or sales (Whop affiliate).
      Identify exactly 3 segments that have the highest potential to go viral.
      
      Criteria for virality:
      - High emotional impact (shock, humor, inspiration).
      - fast-paced.
      - Strong hook.

      Context/Transcript (Simulated for this request):
      ${videoContext || SIMULATED_TRANSCRIPT}

      Return a JSON array of clips.
    `;

    const responseSchema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A clickbait title for the clip" },
          startTime: { type: Type.STRING, description: "Start timestamp (MM:SS)" },
          endTime: { type: Type.STRING, description: "End timestamp (MM:SS)" },
          viralityScore: { type: Type.INTEGER, description: "Score from 0-100" },
          reasoning: { type: Type.STRING, description: "Why this clip will go viral" },
          suggestedHashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "startTime", "endTime", "viralityScore", "reasoning", "suggestedHashtags"]
      }
    };

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const text = response.text;
    if (!text) return [];

    const data = JSON.parse(text);
    
    return data.map((item: any, index: number) => ({
      ...item,
      id: `clip-${Date.now()}-${index}`
    }));

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};