"use client";

import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalculatorDefinition, CalculatorInput } from "@/types/calculators";

interface CalculatorFormProps {
  definition: CalculatorDefinition;
  values: Record<string, number | string>;
  onChange: (key: string, value: number | string) => void;
  errors: Record<string, string>;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating?: boolean;
  hasCalculated?: boolean;
}

export function CalculatorForm({
  definition,
  values,
  onChange,
  errors,
  onCalculate,
  onReset,
  isCalculating,
}: CalculatorFormProps) {
  const hasErrors = Object.keys(errors).length > 0;
  const allFilled = definition.inputs.every((input) => {
    const val = values[input.key];
    return val !== "" && val !== undefined;
  });

  const handleChange = useCallback(
    (key: string, value: string) => {
      const input = definition.inputs.find((i) => i.key === key);
      if (input?.type === "number") {
        const num = value === "" ? "" : Number(value);
        onChange(key, num);
      } else {
        onChange(key, value);
      }
    },
    [definition.inputs, onChange]
  );

  const renderInput = (input: CalculatorInput) => {
    const val = values[input.key] ?? input.defaultValue ?? "";
    const error = errors[input.key];

    if (input.type === "date" || input.type === "time") {
      return (
        <div key={input.key} className="space-y-1.5">
          <Label htmlFor={input.key} className="text-sm font-medium text-text">
            {input.label}
            {input.required !== false && <span className="text-red-400 ml-0.5">*</span>}
          </Label>
          <div className="relative">
            <Input
              id={input.key}
              type={input.type}
              placeholder={input.placeholder}
              value={String(val)}
              onChange={(e) => handleChange(input.key, e.target.value)}
              error={error}
              className={cn(
                "h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 transition-all duration-200 rounded-xl",
                input.type === "date" && "min-w-0"
              )}
            />
          </div>
          {error && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><span className="inline-block w-1 h-1 rounded-full bg-red-500" />{error}</p>}
        </div>
      );
    }

    if (input.type === "select") {
      return (
        <div key={input.key} className="space-y-1.5">
          <Label htmlFor={input.key} className="text-sm font-medium text-text">
            {input.label}
            {input.required !== false && <span className="text-red-400 ml-0.5">*</span>}
          </Label>
          <Select
            value={String(val)}
            onValueChange={(v) => handleChange(input.key, v)}
          >
            <SelectTrigger
              id={input.key}
              className={cn(
                "h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 transition-all duration-200 rounded-xl",
                error && "border-red-500"
              )}
            >
              <SelectValue placeholder={input.placeholder || "Select..."} />
            </SelectTrigger>
            <SelectContent>
              {input.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      );
    }

    if (input.type === "radio") {
      return (
        <div key={input.key} className="space-y-1.5">
          <Label className="text-sm font-medium text-text">
            {input.label}
            {input.required !== false && <span className="text-red-400 ml-0.5">*</span>}
          </Label>
          <div className="flex flex-wrap gap-2">
            {input.options?.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none",
                  "border-border/60 hover:border-primary-500/30 hover:bg-primary-500/5",
                  String(val) === opt.value
                    ? "bg-primary-600 text-white border-primary-600 shadow-sm shadow-primary-500/20"
                    : "bg-white dark:bg-dark-800/50"
                )}
              >
                <input
                  type="radio"
                  name={input.key}
                  value={opt.value}
                  checked={String(val) === opt.value}
                  onChange={() => handleChange(input.key, opt.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      );
    }

    return (
      <div key={input.key} className="space-y-1.5">
        <Label htmlFor={input.key} className="text-sm font-medium text-text">
          {input.label}
          {input.required !== false && <span className="text-red-400 ml-0.5">*</span>}
        </Label>
        <Input
          id={input.key}
          type="number"
          placeholder={input.placeholder || "Enter value"}
          min={input.min}
          max={input.max}
          step={input.step}
          value={val}
          onChange={(e) => handleChange(input.key, e.target.value)}
          error={error}
          className={cn(
            "h-12 text-base bg-white dark:bg-dark-800/50 border-border/60",
            "focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10",
            "transition-all duration-200 rounded-xl",
            "font-mono"
          )}
        />
        {error && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><span className="inline-block w-1 h-1 rounded-full bg-red-500" />{error}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {definition.inputs.map((input) => renderInput(input))}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          size="lg"
          fullWidth
          onClick={onCalculate}
          disabled={!allFilled || hasErrors || isCalculating}
          loading={isCalculating}
          className="h-12 text-base font-semibold rounded-xl shadow-sm shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-200"
        >
          <Calculator className="h-5 w-5" />
          Calculate
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
    </div>
  );
}
