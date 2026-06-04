import OpenAI from "openai";

export async function askAI(prompt: string) {

  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY não encontrada"
    );
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  return response.output_text;
}