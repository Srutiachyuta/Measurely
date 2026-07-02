"use client";

import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, Info, Zap, BarChart3, Plus, Minus, ArrowLeftRight, DollarSign, TrendingUp, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { AI_MODELS, PROVIDER_ORDER, PROVIDER_LABELS, type AIModel } from "@/data/ai-model-pricing";
import { ToolBlogLink, ToolContentSections } from "@/components/tool-content";

const DEFAULT_MODEL_ID = "openai-gpt4o-mini";

function formatCost(value: number): string {
  if (value < 0.000_001) return `$${value.toFixed(10)}`;
  if (value < 0.001) return `$${value.toExponential(3)}`;
  if (value < 1) return `$${value.toFixed(6)}`;
  if (value < 10_000) return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "premium": return "bg-accent-amber/15 text-accent-amber border-transparent";
    case "standard": return "bg-accent-cyan/15 text-accent-cyan border-transparent";
    case "budget": return "bg-accent-green/15 text-accent-green border-transparent";
    default: return "bg-surface-secondary text-text border-transparent";
  }
}

function ProviderLogo({ providerId, className }: { providerId: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-secondary text-[10px] font-bold text-muted shrink-0", className)}>
      {providerId.charAt(0).toUpperCase()}
    </span>
  );
}

function ModelOption({ model, isSelected }: { model: AIModel; isSelected: boolean }) {
  return (
    <div className="flex items-center gap-3 w-full min-w-0">
      <ProviderLogo providerId={model.providerId} />
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text truncate">{model.name}</span>
          <Badge variant="outline" className={cn("shrink-0 text-[10px] px-1.5 py-0", getCategoryColor(model.category))}>
            {model.category}
          </Badge>
        </div>
        <span className="text-xs text-muted truncate">{model.provider}</span>
      </div>
      {isSelected && <Check className="h-4 w-4 shrink-0 text-primary-500" />}
    </div>
  );
}

function ComparisonRow({ model, inputTokens, outputTokens, cachedInputTokens, requestsPerDay, daysPerMonth }: {
  model: AIModel;
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
  requestsPerDay: number;
  daysPerMonth: number;
}) {
  const uncachedInput = Math.max(0, inputTokens - cachedInputTokens);
  const inputCost = (uncachedInput * model.inputPrice / 1_000_000) + (cachedInputTokens * (model.cachedInputPrice ?? model.inputPrice) / 1_000_000);
  const outputCost = outputTokens * model.outputPrice / 1_000_000;
  const costPerRequest = inputCost + outputCost;
  const dailyCost = costPerRequest * requestsPerDay;
  const monthlyCost = dailyCost * daysPerMonth;

  return (
    <tr className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2">
          <ProviderLogo providerId={model.providerId} />
          <span className="text-sm font-medium text-text">{model.name}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-muted">{model.provider}</td>
      <td className="py-3 px-4 text-sm text-right tabular-nums text-text">{formatCost(model.inputPrice)}</td>
      <td className="py-3 px-4 text-sm text-right tabular-nums text-text">{formatCost(model.outputPrice)}</td>
      <td className="py-3 px-4 text-sm text-right tabular-nums text-text">{formatCost(costPerRequest)}</td>
      <td className="py-3 px-4 text-sm text-right tabular-nums text-text">{formatCost(monthlyCost)}</td>
    </tr>
  );
}

export function AITokenCalculator() {
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL_ID);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [cachedInputTokens, setCachedInputTokens] = useState(0);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const [daysPerMonth, setDaysPerMonth] = useState(30);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(0);
  const [compareMode, setCompareMode] = useState(false);
  const [customPriceInput, setCustomPriceInput] = useState<number | "">("");
  const [customPriceOutput, setCustomPriceOutput] = useState<number | "">("");
  const [showCustom, setShowCustom] = useState(false);
  const [open, setOpen] = useState(false);

  const selectedModel = useMemo(() => AI_MODELS.find((m) => m.id === selectedModelId), [selectedModelId]);
  const currentPriceInput = customPriceInput !== "" ? Number(customPriceInput) : (selectedModel?.inputPrice ?? 0);
  const currentPriceOutput = customPriceOutput !== "" ? Number(customPriceOutput) : (selectedModel?.outputPrice ?? 0);
  const currentCachedInputPrice = selectedModel?.cachedInputPrice ?? currentPriceInput;

  const uncachedInput = Math.max(0, inputTokens - cachedInputTokens);
  const inputCost = (uncachedInput * currentPriceInput / 1_000_000) + (cachedInputTokens * currentCachedInputPrice / 1_000_000);
  const outputCost = outputTokens * currentPriceOutput / 1_000_000;
  const costPerRequest = inputCost + outputCost;
  const dailyCost = costPerRequest * requestsPerDay;
  const monthlyCost = dailyCost * daysPerMonth;
  const annualCost = monthlyCost * 12;
  const totalMonthlyTokens = (inputTokens + outputTokens) * requestsPerDay * daysPerMonth;

  const comparisonModels = useMemo(() => {
    if (!compareMode) return [];
    return AI_MODELS
      .filter((m) => m.id !== selectedModelId)
      .slice(0, 5);
  }, [compareMode, selectedModelId]);

  const groupedModels = useMemo(() => {
    const groups: { label: string; models: AIModel[] }[] = [];
    for (const providerId of PROVIDER_ORDER) {
      const models = AI_MODELS.filter((m) => m.providerId === providerId);
      if (models.length > 0) {
        groups.push({ label: PROVIDER_LABELS[providerId], models });
      }
    }
    return groups;
  }, []);

  const showComparison = compareMode && comparisonModels.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <a href="/" className="hover:text-text transition-colors">Home</a>
          <span>/</span>
          <span className="text-text">AI Token Cost Calculator</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text">AI Token Cost Calculator</h1>
              <p className="text-sm text-muted mt-1">Estimate API costs across 50+ AI models with comparison mode</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              <Cpu className="w-3 h-3 mr-1" /> 52 Models
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <BarChart3 className="w-3 h-3 mr-1" /> 11 Providers
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" /> Compare Mode
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Model Selector */}
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text">Select Model</label>
                {selectedModel && (
                  <Badge variant="outline" className={cn("text-xs", getCategoryColor(selectedModel.category))}>
                    {selectedModel.category}
                  </Badge>
                )}
              </div>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between h-11 text-left font-normal"
                  >
                    {selectedModel ? (
                      <div className="flex items-center gap-3 min-w-0">
                        <ProviderLogo providerId={selectedModel.providerId} />
                        <span className="text-sm text-text truncate">{selectedModel.name}</span>
                        <span className="text-xs text-muted shrink-0">{selectedModel.provider}</span>
                      </div>
                    ) : (
                      <span className="text-muted">Search models...</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search models..." />
                    <CommandList>
                      <CommandEmpty>No models found.</CommandEmpty>
                      {groupedModels.map((group) => (
                        <CommandGroup key={group.label} heading={group.label}>
                          {group.models.map((model) => (
                            <CommandItem
                              key={model.id}
                              value={`${model.name} ${model.provider}`}
                              onSelect={() => {
                                setSelectedModelId(model.id);
                                setOpen(false);
                              }}
                            >
                              <ModelOption model={model} isSelected={selectedModelId === model.id} />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedModel?.description && (
                <p className="text-xs text-muted flex items-start gap-1.5">
                  <Info className="w-3 h-3 mt-0.5 shrink-0" />
                  {selectedModel.description}
                </p>
              )}

              {/* Custom pricing toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustom(!showCustom)}
                  className="text-xs text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1"
                >
                  {showCustom ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  Custom pricing
                </button>
              </div>

              {showCustom && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Input
                    label="Input price ($/1M tokens)"
                    type="number"
                    min={0}
                    step={0.001}
                    placeholder={String(selectedModel?.inputPrice ?? 0)}
                    value={customPriceInput}
                    onChange={(e) => setCustomPriceInput(e.target.value === "" ? "" : Number(e.target.value))}
                  />
                  <Input
                    label="Output price ($/1M tokens)"
                    type="number"
                    min={0}
                    step={0.001}
                    placeholder={String(selectedModel?.outputPrice ?? 0)}
                    value={customPriceOutput}
                    onChange={(e) => setCustomPriceOutput(e.target.value === "" ? "" : Number(e.target.value))}
                  />
                </div>
              )}
            </div>

            {/* Usage Inputs */}
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Usage Parameters</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Input tokens per request"
                  type="number"
                  min={1}
                  step={1}
                  value={inputTokens}
                  onChange={(e) => setInputTokens(Math.max(1, Number(e.target.value)))}
                />
                <Input
                  label="Output tokens per request"
                  type="number"
                  min={1}
                  step={1}
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(Math.max(1, Number(e.target.value)))}
                />
                <Input
                  label="Cached input tokens per request"
                  type="number"
                  min={0}
                  step={1}
                  value={cachedInputTokens}
                  onChange={(e) => setCachedInputTokens(Math.max(0, Number(e.target.value)))}
                  helperText={cachedInputTokens > 0 && selectedModel?.cachedInputPrice ? `At $${selectedModel.cachedInputPrice}/1M tokens (${Math.round((1 - selectedModel.cachedInputPrice / currentPriceInput) * 100)}% off)` : ""}
                />
                <Input
                  label="Requests per day"
                  type="number"
                  min={1}
                  step={1}
                  value={requestsPerDay}
                  onChange={(e) => setRequestsPerDay(Math.max(1, Number(e.target.value)))}
                />
                <Input
                  label="Days per month"
                  type="number"
                  min={1}
                  max={31}
                  step={1}
                  value={daysPerMonth}
                  onChange={(e) => setDaysPerMonth(Math.max(1, Math.min(31, Number(e.target.value))))}
                />
                <Input
                  label="Monthly budget (optional)"
                  type="number"
                  min={0}
                  step={1}
                  placeholder="0"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  helperText="See what usage fits within your budget"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-5">
              <h2 className="text-sm font-semibold text-text">Cost Breakdown</h2>

              {/* Primary result */}
              <div className="bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 rounded-xl border border-primary-500/10 p-5">
                <div className="text-center">
                  <p className="text-xs text-muted mb-1">Cost Per Request</p>
                  <p className="text-3xl sm:text-4xl font-bold text-text tabular-nums">
                    {formatCost(costPerRequest)}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted mb-1">Daily</p>
                    <p className="text-lg font-semibold text-text tabular-nums">{formatCost(dailyCost)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted mb-1">Monthly</p>
                    <p className="text-lg font-semibold text-text tabular-nums">{formatCost(monthlyCost)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted mb-1">Annual</p>
                    <p className="text-lg font-semibold text-text tabular-nums">{formatCost(annualCost)}</p>
                  </div>
                </div>
              </div>

              {/* Secondary results */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-surface-secondary rounded-xl p-3">
                  <p className="text-xs text-muted">Input cost</p>
                  <p className="text-sm font-semibold text-text tabular-nums mt-1">{formatCost(inputCost)}</p>
                  <p className="text-[10px] text-muted">per request</p>
                </div>
                <div className="bg-surface-secondary rounded-xl p-3">
                  <p className="text-xs text-muted">Output cost</p>
                  <p className="text-sm font-semibold text-text tabular-nums mt-1">{formatCost(outputCost)}</p>
                  <p className="text-[10px] text-muted">per request</p>
                </div>
                <div className="bg-surface-secondary rounded-xl p-3">
                  <p className="text-xs text-muted">Total tokens</p>
                  <p className="text-sm font-semibold text-text tabular-nums mt-1">{(totalMonthlyTokens / 1_000_000).toFixed(1)}M</p>
                  <p className="text-[10px] text-muted">per month</p>
                </div>
                <div className="bg-surface-secondary rounded-xl p-3">
                  <p className="text-xs text-muted">Input price</p>
                  <p className="text-sm font-semibold text-text tabular-nums mt-1">${currentPriceInput}/1M</p>
                  <p className="text-[10px] text-muted">tokens</p>
                </div>
              </div>

              {/* Budget progress */}
              {monthlyBudget > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Monthly budget usage</span>
                    <span className={cn("font-medium tabular-nums", monthlyCost > monthlyBudget ? "text-red-500" : "text-accent-green")}>
                      {formatCost(monthlyCost)} / {formatCost(monthlyBudget)}
                    </span>
                  </div>
                  <div className="h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", monthlyCost > monthlyBudget ? "bg-red-500" : "bg-primary-500")}
                      style={{ width: `${Math.min(100, (monthlyCost / monthlyBudget) * 100)}%` }}
                    />
                  </div>
                  {monthlyCost <= monthlyBudget && (
                    <p className="text-xs text-accent-green">
                      Estimated requests within budget: {Math.floor(monthlyBudget / (costPerRequest * daysPerMonth)).toLocaleString()} / day
                    </p>
                  )}
                  {monthlyCost > monthlyBudget && (
                    <p className="text-xs text-red-500">
                      Exceeds budget by {formatCost(monthlyCost - monthlyBudget)} per month
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Info + Comparison toggle */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compare mode toggle */}
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text">Comparison Mode</h2>
                <button
                  type="button"
                  role="switch"
                  aria-checked={compareMode}
                  onClick={() => setCompareMode(!compareMode)}
                  className={cn(
                    "relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
                    compareMode ? "bg-primary-500" : "bg-surface-secondary"
                  )}
                >
                  <span className={cn("pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200", compareMode ? "translate-x-4" : "translate-x-0")} />
                </button>
              </div>
              <p className="text-xs text-muted flex items-start gap-1.5">
                <ArrowLeftRight className="w-3 h-3 mt-0.5 shrink-0" />
                Compare costs across the 5 cheapest alternative models at your current usage volume.
              </p>
            </div>

            {/* Pricing info */}
            {selectedModel && (
              <div className="bg-surface rounded-2xl border border-border p-5 space-y-3">
                <h2 className="text-sm font-semibold text-text">Pricing Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Input</span>
                    <span className="text-text font-medium tabular-nums">${currentPriceInput} / 1M tokens</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted">Output</span>
                    <span className="text-text font-medium tabular-nums">${currentPriceOutput} / 1M tokens</span>
                  </div>
                  {selectedModel.cachedInputPrice && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted">Cached input</span>
                        <span className="text-text font-medium tabular-nums">${selectedModel.cachedInputPrice} / 1M tokens</span>
                      </div>
                    </>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted">Provider</span>
                    <span className="text-text font-medium">{selectedModel.provider}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick tips */}
            <div className="bg-surface rounded-2xl border border-border p-5">
              <h2 className="text-sm font-semibold text-text mb-3">Quick Tips</h2>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex items-start gap-2">
                  <DollarSign className="w-3 h-3 mt-0.5 shrink-0 text-accent-green" />
                  <span>Use prompt caching to save 50-90% on input token costs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-3 h-3 mt-0.5 shrink-0 text-accent-amber" />
                  <span>Budget models work great for simple tasks at a fraction of the price.</span>
                </li>
                <li className="flex items-start gap-2">
                  <BarChart3 className="w-3 h-3 mt-0.5 shrink-0 text-accent-cyan" />
                  <span>Toggle comparison mode to find the most cost-effective model.</span>
                </li>
              </ul>
            </div>

            <ToolBlogLink slug="ai-token-cost-calculator" />
          </div>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div className="mt-6 bg-surface rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-primary-500" />
              <h2 className="text-sm font-semibold text-text">Cost Comparison (Cheapest Alternatives)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs font-medium text-muted">Model</th>
                    <th className="text-left py-2 px-4 text-xs font-medium text-muted">Provider</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-muted">Input $/1M</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-muted">Output $/1M</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-muted">$/Request</th>
                    <th className="text-right py-2 px-4 text-xs font-medium text-muted">$/Month</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Current model first */}
                  {selectedModel && (
                    <ComparisonRow
                      model={selectedModel}
                      inputTokens={inputTokens}
                      outputTokens={outputTokens}
                      cachedInputTokens={cachedInputTokens}
                      requestsPerDay={requestsPerDay}
                      daysPerMonth={daysPerMonth}
                    />
                  )}
                  {comparisonModels.map((model) => (
                    <ComparisonRow
                      key={model.id}
                      model={model}
                      inputTokens={inputTokens}
                      outputTokens={outputTokens}
                      cachedInputTokens={cachedInputTokens}
                      requestsPerDay={requestsPerDay}
                      daysPerMonth={daysPerMonth}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <ToolContentSections slug="ai-token-cost-calculator" />

        {/* FAQ */}
        <div className="mt-8 bg-surface rounded-2xl border border-border p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What is an AI token?", a: "A token is the basic unit of text AI models process. One token ≈ 0.75 words in English. For example, 'Measurely' tokenizes to ['Measure', 'ly']." },
              { q: "How is token cost calculated?", a: "Cost = (input tokens × input price / 1M) + (output tokens × output price / 1M). Cached input tokens use a discounted rate." },
              { q: "Which model is cheapest overall?", a: "Amazon Nova Micro is the cheapest at $0.035/1M input and $0.14/1M output. Other budget options include Gemini 2.5 Flash Lite and Nova Lite." },
              { q: "What is prompt caching?", a: "Prompt caching reuses previously processed input tokens at 50-90% off. Models like GPT-4o, Claude, and Gemini support it." },
              { q: "How many tokens does a typical request use?", a: "Chatbots: 500-1,500 input + 100-500 output tokens. Content generation: 2,000-8,000+ tokens. Code generation: 500-2,000 tokens." },
            ].map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-text py-2 list-none">
                  {faq.q}
                  <ChevronsUpDown className="w-4 h-4 text-muted group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="text-sm text-muted mt-1 pb-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
