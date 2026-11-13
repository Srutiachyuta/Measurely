export type ProviderId =
  | "openai"
  | "anthropic"
  | "google"
  | "meta"
  | "deepseek"
  | "mistral"
  | "xai"
  | "alibaba"
  | "cohere"
  | "amazon"
  | "perplexity";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerId: ProviderId;
  inputPrice: number;
  outputPrice: number;
  cachedInputPrice?: number;
  category: "premium" | "standard" | "budget";
  description?: string;
}

export const PROVIDER_ORDER: ProviderId[] = [
  "openai",
  "anthropic",
  "google",
  "meta",
  "deepseek",
  "mistral",
  "xai",
  "alibaba",
  "cohere",
  "amazon",
  "perplexity",
];

export const PROVIDER_LABELS: Record<ProviderId, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google Gemini",
  meta: "Meta Llama",
  deepseek: "DeepSeek",
  mistral: "Mistral AI",
  xai: "xAI (Grok)",
  alibaba: "Alibaba Qwen",
  cohere: "Cohere",
  amazon: "Amazon Bedrock",
  perplexity: "Perplexity",
};

// Standard USD token rates; extra tools, taxes, cache writes and hosting are excluded.
// Sources: developers.openai.com/api/docs/pricing,
// platform.claude.com/docs/en/about-claude/pricing, api-docs.deepseek.com/quick_start/pricing/.
export const AI_MODELS: AIModel[] = [
 {id:"openai-gpt6-astra",name:"GPT-6 Astra",provider:"OpenAI",providerId:"openai",inputPrice:10,outputPrice:50,cachedInputPrice:1,category:"premium"},
 {id:"openai-gpt61-sol",name:"GPT-6.1 Sol",provider:"OpenAI",providerId:"openai",inputPrice:2,outputPrice:10,cachedInputPrice:.1,category:"standard"},
 {id:"openai-gpt61-terra",name:"GPT-6.1 Terra",provider:"OpenAI",providerId:"openai",inputPrice:1,outputPrice:5,cachedInputPrice:.05,category:"standard"},
 {id:"openai-gpt6-luna",name:"GPT-6 Luna",provider:"OpenAI",providerId:"openai",inputPrice:.1,outputPrice:.5,cachedInputPrice:.01,category:"budget"},
 {id:"anthropic-claude-fable-52",name:"Claude Fable 5.2",provider:"Anthropic",providerId:"anthropic",inputPrice:8,outputPrice:40,cachedInputPrice:.2,category:"premium"},
 {id:"anthropic-claude-opus-55",name:"Claude Opus 5.5",provider:"Anthropic",providerId:"anthropic",inputPrice:4,outputPrice:20,cachedInputPrice:.2,category:"premium"},
 {id:"anthropic-claude-sonnet-55",name:"Claude Sonnet 5.5",provider:"Anthropic",providerId:"anthropic",inputPrice:2,outputPrice:10,cachedInputPrice:.1,category:"standard"},
 {id:"anthropic-claude-haiku-55",name:"Claude Haiku 5.5 (≤100k prompt)",provider:"Anthropic",providerId:"anthropic",inputPrice:.1,outputPrice:.5,cachedInputPrice:.01,category:"budget",description:"Higher rates apply above 100,000 prompt tokens; use custom prices for long prompts."},
 {id:"deepseek-flash",name:"DeepSeek Flash (peak)",provider:"DeepSeek",providerId:"deepseek",inputPrice:.3,outputPrice:1.2,cachedInputPrice:.006,category:"budget",description:"Peak-rate estimate. Off-peak token prices are half these rates."},
 {id:"deepseek-v4-pro",name:"DeepSeek V4 Pro (peak)",provider:"DeepSeek",providerId:"deepseek",inputPrice:1.32,outputPrice:3.96,cachedInputPrice:.044,category:"standard",description:"Peak-rate estimate. Off-peak token prices are half these rates."},
];

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find((m) => m.id === id);
}

export function getModelsByProvider(providerId: ProviderId): AIModel[] {
  return AI_MODELS.filter((m) => m.providerId === providerId);
}

export function getCheapestModel(): AIModel {
  return AI_MODELS.reduce((cheapest, m) =>
    m.inputPrice + m.outputPrice < cheapest.inputPrice + cheapest.outputPrice ? m : cheapest
  );
}

export function getMostExpensiveModel(): AIModel {
  return AI_MODELS.reduce((expensive, m) =>
    m.inputPrice + m.outputPrice > expensive.inputPrice + expensive.outputPrice ? m : expensive
  );
}
