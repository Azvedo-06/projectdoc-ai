import { askAI } from "./openaiProvider";
import { buildContext } from "./contextBuilder";
import { createPrompt } from "./businessRulePrompt";

export async function analyzeWithAI(
  files: string[],
) {

  const context =
    buildContext(files);

  const prompt =
    createPrompt(context);

  return await askAI(prompt);
}