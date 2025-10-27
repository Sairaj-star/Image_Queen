
import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateImage = async (
    image1: ImageData,
    image2: ImageData,
    prompt: string
): Promise<string | null> => {

  const imagePart1 = {
    inlineData: {
      data: image1.data,
      mimeType: image1.mimeType,
    },
  };

  const imagePart2 = {
    inlineData: {
        data: image2.data,
        mimeType: image2.mimeType,
    }
  }

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [imagePart1, imagePart2, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }

    return null;
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    throw new Error("Failed to generate image. Please check the console for details.");
  }
};
