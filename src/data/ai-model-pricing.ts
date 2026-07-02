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

export const AI_MODELS: AIModel[] = [
  // ========== OpenAI ==========
  { id: "openai-gpt5", name: "GPT-5", provider: "OpenAI", providerId: "openai", inputPrice: 15, outputPrice: 60, cachedInputPrice: 7.5, category: "premium", description: "OpenAI's most capable model for complex reasoning and research" },
  { id: "openai-gpt5-mini", name: "GPT-5 Mini", provider: "OpenAI", providerId: "openai", inputPrice: 3, outputPrice: 12, cachedInputPrice: 1.5, category: "standard", description: "Balanced performance and cost for production applications" },
  { id: "openai-gpt5-nano", name: "GPT-5 Nano", provider: "OpenAI", providerId: "openai", inputPrice: 0.5, outputPrice: 2, cachedInputPrice: 0.25, category: "budget", description: "Lightweight and cost-effective for simple tasks" },
  { id: "openai-gpt4o", name: "GPT-4o", provider: "OpenAI", providerId: "openai", inputPrice: 2.5, outputPrice: 10, cachedInputPrice: 1.25, category: "standard", description: "Multimodal model for general-purpose applications" },
  { id: "openai-gpt4o-mini", name: "GPT-4o Mini", provider: "OpenAI", providerId: "openai", inputPrice: 0.15, outputPrice: 0.6, cachedInputPrice: 0.075, category: "budget", description: "Affordable small model for high-volume tasks" },
  { id: "openai-gpt4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", providerId: "openai", inputPrice: 10, outputPrice: 30, cachedInputPrice: 5, category: "premium", description: "Legacy high-performance model with vision support" },
  { id: "openai-gpt4", name: "GPT-4", provider: "OpenAI", providerId: "openai", inputPrice: 30, outputPrice: 60, category: "premium", description: "Legacy flagship model" },
  { id: "openai-gpt35-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI", providerId: "openai", inputPrice: 0.5, outputPrice: 1.5, category: "budget", description: "Fast and inexpensive legacy model" },
  { id: "openai-o3", name: "o3", provider: "OpenAI", providerId: "openai", inputPrice: 10, outputPrice: 40, category: "premium", description: "Advanced reasoning model with extended thinking" },
  { id: "openai-o3-mini", name: "o3 Mini", provider: "OpenAI", providerId: "openai", inputPrice: 1.1, outputPrice: 4.4, category: "standard", description: "Cost-efficient reasoning model for structured tasks" },
  { id: "openai-o4-mini", name: "o4 Mini", provider: "OpenAI", providerId: "openai", inputPrice: 0.15, outputPrice: 0.6, cachedInputPrice: 0.075, category: "budget", description: "Latest lightweight reasoning model" },

  // ========== Anthropic ==========
  { id: "anthropic-claude-opus-4", name: "Claude Opus 4", provider: "Anthropic", providerId: "anthropic", inputPrice: 15, outputPrice: 75, cachedInputPrice: 1.5, category: "premium", description: "Anthropic's most powerful model for complex tasks" },
  { id: "anthropic-claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic", providerId: "anthropic", inputPrice: 3, outputPrice: 15, cachedInputPrice: 0.3, category: "standard", description: "Balanced performance for production workloads" },
  { id: "anthropic-claude-haiku-4", name: "Claude Haiku 4", provider: "Anthropic", providerId: "anthropic", inputPrice: 0.25, outputPrice: 1.25, cachedInputPrice: 0.025, category: "budget", description: "Fast and affordable for high-volume applications" },
  { id: "anthropic-claude-3.7-sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", providerId: "anthropic", inputPrice: 3, outputPrice: 15, cachedInputPrice: 0.3, category: "standard", description: "Previous-gen balanced model with extended output" },
  { id: "anthropic-claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", providerId: "anthropic", inputPrice: 3, outputPrice: 15, cachedInputPrice: 0.3, category: "standard", description: "Legacy balanced model with strong coding ability" },
  { id: "anthropic-claude-3.5-haiku", name: "Claude 3.5 Haiku", provider: "Anthropic", providerId: "anthropic", inputPrice: 0.8, outputPrice: 4, cachedInputPrice: 0.08, category: "budget", description: "Legacy fast and affordable model" },

  // ========== Google Gemini ==========
  { id: "google-gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google Gemini", providerId: "google", inputPrice: 1.25, outputPrice: 10, cachedInputPrice: 0.03125, category: "premium", description: "Google's most capable model with 1M+ token context" },
  { id: "google-gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google Gemini", providerId: "google", inputPrice: 0.15, outputPrice: 0.6, cachedInputPrice: 0.0075, category: "budget", description: "Fast and efficient for everyday tasks" },
  { id: "google-gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", provider: "Google Gemini", providerId: "google", inputPrice: 0.075, outputPrice: 0.3, cachedInputPrice: 0.00375, category: "budget", description: "Ultra-low cost for high-volume simple tasks" },
  { id: "google-gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google Gemini", providerId: "google", inputPrice: 0.1, outputPrice: 0.4, cachedInputPrice: 0.005, category: "budget", description: "Previous-gen fast model at very low cost" },
  { id: "google-gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite", provider: "Google Gemini", providerId: "google", inputPrice: 0.075, outputPrice: 0.3, category: "budget", description: "Legacy low-cost option for simple tasks" },
  { id: "google-gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google Gemini", providerId: "google", inputPrice: 1.25, outputPrice: 5, cachedInputPrice: 0.03125, category: "standard", description: "Legacy pro model with long context window" },
  { id: "google-gemini-1.5-flash", name: "Gemini 1.5 Flash", provider: "Google Gemini", providerId: "google", inputPrice: 0.075, outputPrice: 0.3, cachedInputPrice: 0.00188, category: "budget", description: "Legacy fast model" },

  // ========== Meta Llama ==========
  { id: "meta-llama-4-maverick", name: "Llama 4 Maverick", provider: "Meta Llama", providerId: "meta", inputPrice: 0.5, outputPrice: 1.5, category: "standard", description: "Meta's latest flagship open model" },
  { id: "meta-llama-4-scout", name: "Llama 4 Scout", provider: "Meta Llama", providerId: "meta", inputPrice: 0.2, outputPrice: 0.6, category: "budget", description: "Lightweight open model for efficient deployment" },
  { id: "meta-llama-3.3-70b", name: "Llama 3.3 70B", provider: "Meta Llama", providerId: "meta", inputPrice: 0.6, outputPrice: 0.8, category: "standard", description: "Optimized 70B parameter model" },
  { id: "meta-llama-3.1-405b", name: "Llama 3.1 405B", provider: "Meta Llama", providerId: "meta", inputPrice: 2.8, outputPrice: 2.8, category: "premium", description: "Largest open-source model" },
  { id: "meta-llama-3.1-70b", name: "Llama 3.1 70B", provider: "Meta Llama", providerId: "meta", inputPrice: 0.59, outputPrice: 0.79, category: "standard", description: "Reliable mid-size open model" },
  { id: "meta-llama-3.1-8b", name: "Llama 3.1 8B", provider: "Meta Llama", providerId: "meta", inputPrice: 0.05, outputPrice: 0.08, category: "budget", description: "Ultra-lightweight open model" },

  // ========== DeepSeek ==========
  { id: "deepseek-r1", name: "DeepSeek R1", provider: "DeepSeek", providerId: "deepseek", inputPrice: 0.55, outputPrice: 2.19, category: "standard", description: "Advanced reasoning model with chain-of-thought" },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", providerId: "deepseek", inputPrice: 0.27, outputPrice: 1.1, category: "budget", description: "Cost-effective general-purpose model" },
  { id: "deepseek-chat", name: "DeepSeek Chat", provider: "DeepSeek", providerId: "deepseek", inputPrice: 0.14, outputPrice: 0.28, category: "budget", description: "Lightweight chat model" },
  { id: "deepseek-coder", name: "DeepSeek Coder", provider: "DeepSeek", providerId: "deepseek", inputPrice: 0.14, outputPrice: 0.28, category: "budget", description: "Specialized code generation model" },

  // ========== Mistral AI ==========
  { id: "mistral-large", name: "Mistral Large", provider: "Mistral AI", providerId: "mistral", inputPrice: 2, outputPrice: 6, category: "premium", description: "Mistral's most capable flagship model" },
  { id: "mistral-medium", name: "Mistral Medium", provider: "Mistral AI", providerId: "mistral", inputPrice: 0.7, outputPrice: 2.1, category: "standard", description: "Balanced performance for production" },
  { id: "mistral-small", name: "Mistral Small", provider: "Mistral AI", providerId: "mistral", inputPrice: 0.2, outputPrice: 0.6, category: "budget", description: "Fast and affordable for simple tasks" },
  { id: "mistral-codestral", name: "Codestral", provider: "Mistral AI", providerId: "mistral", inputPrice: 0.2, outputPrice: 0.6, category: "standard", description: "Specialized code generation model" },
  { id: "mistral-mixtral-8x22b", name: "Mixtral 8x22B", provider: "Mistral AI", providerId: "mistral", inputPrice: 0.9, outputPrice: 0.9, category: "standard", description: "Mixture of experts mid-size model" },
  { id: "mistral-mixtral-8x7b", name: "Mixtral 8x7B", provider: "Mistral AI", providerId: "mistral", inputPrice: 0.14, outputPrice: 0.42, category: "budget", description: "Legacy mixture of experts model" },

  // ========== xAI ==========
  { id: "xai-grok-4", name: "Grok 4", provider: "xAI (Grok)", providerId: "xai", inputPrice: 12, outputPrice: 50, category: "premium", description: "xAI's most advanced model with real-time knowledge" },
  { id: "xai-grok-3", name: "Grok 3", provider: "xAI (Grok)", providerId: "xai", inputPrice: 3, outputPrice: 15, category: "standard", description: "Balanced model with X/Twitter integration" },
  { id: "xai-grok-3-mini", name: "Grok 3 Mini", provider: "xAI (Grok)", providerId: "xai", inputPrice: 0.3, outputPrice: 1.5, category: "budget", description: "Lightweight grok model" },

  // ========== Alibaba Qwen ==========
  { id: "alibaba-qwen-3-235b", name: "Qwen 3 235B", provider: "Alibaba Qwen", providerId: "alibaba", inputPrice: 1.6, outputPrice: 2.4, category: "premium", description: "Alibaba's largest flagship model" },
  { id: "alibaba-qwen-3-72b", name: "Qwen 3 72B", provider: "Alibaba Qwen", providerId: "alibaba", inputPrice: 0.8, outputPrice: 1.2, category: "standard", description: "Mid-size model with strong multilingual support" },
  { id: "alibaba-qwen-2.5-max", name: "Qwen 2.5 Max", provider: "Alibaba Qwen", providerId: "alibaba", inputPrice: 3.5, outputPrice: 7, category: "premium", description: "Previous-gen high-performance model" },
  { id: "alibaba-qwen-coder", name: "Qwen Coder", provider: "Alibaba Qwen", providerId: "alibaba", inputPrice: 0.14, outputPrice: 0.28, category: "budget", description: "Specialized code model" },

  // ========== Cohere ==========
  { id: "cohere-command-a", name: "Command A", provider: "Cohere", providerId: "cohere", inputPrice: 2.5, outputPrice: 10, category: "standard", description: "Cohere's advanced model for enterprise RAG" },
  { id: "cohere-command-r+", name: "Command R+", provider: "Cohere", providerId: "cohere", inputPrice: 3, outputPrice: 15, category: "premium", description: "High-performance retrieval-augmented model" },
  { id: "cohere-command-r", name: "Command R", provider: "Cohere", providerId: "cohere", inputPrice: 0.5, outputPrice: 1.5, category: "budget", description: "Cost-effective RAG-optimized model" },

  // ========== Amazon ==========
  { id: "amazon-nova-premier", name: "Nova Premier", provider: "Amazon Bedrock", providerId: "amazon", inputPrice: 6, outputPrice: 24, category: "premium", description: "Amazon's most capable foundation model" },
  { id: "amazon-nova-pro", name: "Nova Pro", provider: "Amazon Bedrock", providerId: "amazon", inputPrice: 0.8, outputPrice: 3.2, category: "standard", description: "Balanced model for production workloads" },
  { id: "amazon-nova-lite", name: "Nova Lite", provider: "Amazon Bedrock", providerId: "amazon", inputPrice: 0.06, outputPrice: 0.24, category: "budget", description: "Low-cost model for high-volume tasks" },
  { id: "amazon-nova-micro", name: "Nova Micro", provider: "Amazon Bedrock", providerId: "amazon", inputPrice: 0.035, outputPrice: 0.14, category: "budget", description: "Ultra-low cost text-only model" },

  // ========== Perplexity ==========
  { id: "perplexity-sonar-pro", name: "Sonar Pro", provider: "Perplexity", providerId: "perplexity", inputPrice: 3, outputPrice: 15, category: "premium", description: "High-quality model with live search integration" },
  { id: "perplexity-sonar-reasoning", name: "Sonar Reasoning", provider: "Perplexity", providerId: "perplexity", inputPrice: 1, outputPrice: 5, category: "standard", description: "Reasoning model with search-backed answers" },
  { id: "perplexity-sonar-deep-research", name: "Sonar Deep Research", provider: "Perplexity", providerId: "perplexity", inputPrice: 5, outputPrice: 20, category: "premium", description: "Deep research model with extensive search" },
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
