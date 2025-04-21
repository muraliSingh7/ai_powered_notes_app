import { logger } from "./logger";

// lib/groq.ts
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are an expert summarizer. Read the user's text thoroughly and generate a detailed, accurate summary that captures the full scope of the original content. Preserve all key points, supporting details, arguments, and context. The summary should be complete yet easy to understand, without personal bias or interpretation",
          },
          {
            role: "user",
            content: `Please summarize the following text:\n\n${text}`,
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    logger.error("Error summarizing text", {
      error: error instanceof Error ? error.message : `Unknown error: ${error}`,
    });
    throw error;
  }
}
