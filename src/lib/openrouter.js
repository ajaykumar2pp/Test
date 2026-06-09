import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function analyzeResume(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", //llama-3.3-70b-versatile
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content:
          "You are an ATS Resume Analyzer. Return ONLY valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}