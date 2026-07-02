"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, ArrowRight, RotateCcw, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { SearchableSelect } from "./searchable-select";
import type { UnitDefinition } from "@/types/converters";

interface ConverterInputProps {
  value: string;
  fromUnit: string;
  toUnit: string;
  units: UnitDefinition[];
  result: string;
  onValueChange: (value: string) => void;
  onFromUnitChange: (unit: string) => void;
  onToUnitChange: (unit: string) => void;
  onSwap: () => void;
  onConvert: () => void;
  onReset: () => void;
  isConverting?: boolean;
  hasConverted?: boolean;
}

export function ConverterInput({
  value,
  fromUnit,
  toUnit,
  units,
  result,
  onValueChange,
  onFromUnitChange,
  onToUnitChange,
  onSwap,
  onConvert,
  onReset,
  isConverting,
  hasConverted,
}: ConverterInputProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(result);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
  }, [result]);

  const handleConvert = useCallback(() => {
    if (!value || value.trim() === "") { setError("Input cannot be empty"); return; }
    if (isNaN(Number(value))) { setError("Enter a valid number"); return; }
    setError("");
    onConvert();
  }, [value, onConvert]);

  const canConvert = value !== "" && !isNaN(Number(value)) && fromUnit && toUnit;

  return (
    <div className="space-y-5">
      {/* Value input */}
      <div className="space-y-1.5">
        <Label htmlFor="from-value" className="text-sm font-medium text-text">Value</Label>
        <Input
          id="from-value"
          type="number"
          placeholder="Enter value to convert"
          value={value}
          onChange={(e) => { onValueChange(e.target.value); setError(""); }}
          error={error}
          className={cn(
            "h-12 text-lg font-mono bg-white dark:bg-dark-800/50 border-border/60 rounded-xl",
            "focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 transition-all duration-200"
          )}
        />
        {error && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><span className="inline-block w-1 h-1 rounded-full bg-red-500" />{error}</p>}
      </div>

      {/* Unit selectors with swap */}
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] items-end">
        <SearchableSelect
          value={fromUnit}
          onChange={onFromUnitChange}
          units={units}
          label="From"
        />

        <div className="flex items-center justify-center pb-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onSwap}
                  className="shrink-0 rounded-xl h-12 w-12 border-2 border-border/60 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all duration-200"
                >
                  <motion.div whileTap={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    <ArrowLeftRight className="h-4.5 w-4.5" />
                  </motion.div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Swap units</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <SearchableSelect
          value={toUnit}
          onChange={onToUnitChange}
          units={units}
          label="To"
        />
      </div>

      {/* Convert & Reset buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          size="lg"
          fullWidth
          onClick={handleConvert}
          disabled={!canConvert || isConverting}
          loading={isConverting}
          className="h-12 text-base font-semibold rounded-xl shadow-sm shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-200"
        >
          <ArrowRight className="h-5 w-5" />
          Convert
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          type="button"
          className="h-12 sm:w-auto rounded-xl border-border/60"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Result display - premium card inline */}
      <AnimatePresence mode="wait">
        {hasConverted && result && result !== "—" && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-5 sm:p-6 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-white/60 dark:from-dark-800 dark:to-dark-800/60 border border-border/60"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/[0.02] to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
                Converted Result
              </p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 tabular-nums tracking-tight max-w-full min-w-0 break-words">
                  {result}
                </span>
                <span className="text-lg text-text-secondary font-medium">
                  {toUnit}
                </span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopy}
                      className="absolute top-0 right-0 rounded-lg"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="h-5 w-5 text-accent-green" />
                          </motion.div>
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </AnimatePresence>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy result</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
