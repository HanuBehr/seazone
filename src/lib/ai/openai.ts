import { createOpenAI } from "@ai-sdk/openai";

export function getOpenAIKey() {
  const rawKey = process.env.OPENAI_API_KEY?.trim();

  if (!rawKey) return null;

  const keyMatch = rawKey.match(/sk-[^\s"']+/);
  return keyMatch?.[0] ?? null;
}

export function hasOpenAIKey() {
  return Boolean(getOpenAIKey());
}

export function getOpenAIModel(model: string) {
  const apiKey = getOpenAIKey();

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY não configurada.");
  }

  return createOpenAI({ apiKey })(model);
}
