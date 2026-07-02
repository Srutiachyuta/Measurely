"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UnitDefinition } from "@/types/converters";

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  units: UnitDefinition[];
  label: string;
}

export function SearchableSelect({ value, onChange, units, label }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = units.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const selected = units.find((u) => u.symbol === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSelect = useCallback(
    (symbol: string) => {
      onChange(symbol);
      setOpen(false);
      setSearch("");
    },
    [onChange]
  );

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-text mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-text",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500",
          "transition-all duration-200 hover:border-primary-500/50"
        )}
      >
        <span className="truncate">
          {selected ? `${selected.name} (${selected.symbol})` : "Select unit"}
        </span>
        <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-surface shadow-elevation-lg overflow-hidden"
          >
            <div className="flex items-center gap-2 px-3 border-b border-border">
              <Search className="h-4 w-4 text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search units..."
                className="h-10 w-full bg-transparent text-sm text-text placeholder:text-muted outline-none"
              />
            </div>
            <div className="max-h-60 overflow-y-auto p-1">
              {filtered.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted">No units found</div>
              ) : (
                filtered.map((unit) => (
                  <button
                    key={unit.symbol}
                    type="button"
                    onClick={() => handleSelect(unit.symbol)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      "hover:bg-surface-secondary",
                      value === unit.symbol && "bg-primary-500/10 text-primary-600 dark:text-primary-400"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-5 h-5 rounded-md border",
                        value === unit.symbol
                          ? "border-primary-500 bg-primary-500 text-white"
                          : "border-border"
                      )}
                    >
                      {value === unit.symbol && <Check className="h-3 w-3" />}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{unit.name}</span>
                      <span className="text-xs text-muted">{unit.symbol}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
