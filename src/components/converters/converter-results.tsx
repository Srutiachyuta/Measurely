"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Share2, Download, RotateCcw, ListChecks, Ruler, Scale, Square, Droplets, Gauge, Thermometer, Zap, Clock, HardDrive, Fuel, Circle, Weight, Activity, Wind, Shield, Battery, ZapOff, CircuitBoard, IterationCw, Hammer, Magnet, TestTube, TextSelect, Car, Fingerprint, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard, downloadAsFile } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { ConversionResult } from "@/types/converters";

interface ConverterResultsProps {
  results: ConversionResult[];
  selectedUnit?: string;
  onReset?: () => void;
}

const unitIcons: Record<string, LucideIcon> = {
  mm: Ruler, cm: Ruler, m: Ruler, km: Ruler, in: Ruler, ft: Ruler, yd: Ruler, mi: Ruler, nmi: Ruler, µm: Ruler, nm: Ruler,
  mg: Scale, g: Scale, kg: Scale, t: Scale, oz: Scale, lb: Scale, st: Scale,
  "mm²": Square, "cm²": Square, m2: Square, "km²": Square, ha: Square, ac: Square, "ft²": Square, "in²": Square, "yd²": Square, "mi²": Square,
  mL: Droplets, L: Droplets, "m³": Droplets, "ft³": Droplets, "in³": Droplets,
  "m/s": Gauge, "km/h": Gauge, mph: Gauge, kn: Gauge, "ft/s": Gauge, mach: Gauge,
  "°C": Thermometer, "°F": Thermometer, K: Thermometer, "°R": Thermometer, "°Ré": Thermometer,
  Pa: Wind, kPa: Wind, MPa: Wind, bar: Wind, psi: Wind, atm: Wind, torr: Wind, mmHg: Wind, inHg: Wind,
  J: Zap, kJ: Zap, cal: Zap, kcal: Zap, Wh: Zap, kWh: Zap, BTU: Zap, "ft·lb": Zap, eV: Zap,
  s: Clock, min: Clock, h: Clock, d: Clock, week: Clock, mo: Clock, yr: Clock,
  bit: HardDrive, B: HardDrive, KB: HardDrive, MB: HardDrive, GB: HardDrive, TB: HardDrive,
  "km/L": Fuel, "L/100km": Fuel, "US mpg": Fuel, "UK mpg": Fuel,
  "°": Circle, rad: Circle, grad: Circle, turn: Circle,
  "kg/m³": Weight, "g/cm³": Weight, "lb/ft³": Weight, "lb/in³": Weight,
  Hz: Activity, kHz: Activity, MHz: Activity, GHz: Activity, rpm: Activity,
  W: Shield, kW: Shield, MW: Shield, hp: Shield, "BTU/h": Shield,
  A: Battery, mA: Battery, kA: Battery, µA: Battery,
  V: ZapOff, mV: ZapOff, kV: ZapOff, MV: ZapOff, µV: ZapOff,
  Ohm: CircuitBoard, "mΩ": CircuitBoard, "kΩ": CircuitBoard, "MΩ": CircuitBoard, µΩ: CircuitBoard,
  F: IterationCw, mF: IterationCw, µF: IterationCw, nF: IterationCw, pF: IterationCw,
  H: IterationCw, mH: IterationCw, µH: IterationCw, nH: IterationCw,
  N: Hammer, kN: Hammer, dyn: Hammer, lbf: Hammer, kgf: Hammer,
  T: Magnet, G: Magnet, mT: Magnet, µT: Magnet, nT: Magnet,
  "mol/L": TestTube, "mmol/L": TestTube, "µmol/L": TestTube, "mg/dL": TestTube, "g/L": TestTube, ppm: TestTube, ppb: TestTube,
  pt: TextSelect, pc: TextSelect, px: TextSelect, em: TextSelect, rem: TextSelect,
  "US M": Car, "US W": Car, UK: Car, EU: Car,
  "mm circ": Fingerprint, "mm dia": Fingerprint,
};

function getUnitIcon(unit: string): LucideIcon {
  const match = Object.entries(unitIcons).find(([key]) => unit.includes(key) || key.includes(unit));
  return match?.[1] || Ruler;
}

const unitColors = [
  "from-primary-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-sky-500 to-cyan-600",
  "from-violet-500 to-purple-600",
];

export function ConverterResults({ results, selectedUnit, onReset }: ConverterResultsProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const formatAll = useCallback(() =>
    results.map((r) => `${r.unit}: ${r.formatted === "NaN" ? "---" : r.formatted}`).join("\n"),
  [results]);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(formatAll());
    if (ok) { setCopied(true); addToast({ title: "Copied to clipboard", variant: "success" }); setTimeout(() => setCopied(false), 2000); }
  }, [formatAll, addToast]);

  const handleShare = useCallback(async () => {
    const text = formatAll();
    if (typeof navigator !== "undefined" && navigator.share) { try { await navigator.share({ title: document.title, text }); } catch {} }
    else { await copyToClipboard(window.location.href); addToast({ title: "Link copied", variant: "info" }); }
  }, [formatAll, addToast]);

  const handleDownload = useCallback(() => {
    downloadAsFile(`${document.title}\n${"=".repeat(40)}\n\n${formatAll()}`, "conversion-results.txt");
    addToast({ title: "Downloaded", variant: "success" });
  }, [formatAll, addToast]);

  if (results.length === 0) return null;

  const primaryResult = results.find(r => r.unit === selectedUnit) || results[0];
  const otherResults = results.filter(r => r.unit !== primaryResult?.unit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-dark-800/80 border border-border/40 shadow-elevation-lg">
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-primary-500/10 to-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-sm shadow-primary-500/20">
                <ListChecks className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text">All Conversions</h3>
                <p className="text-xs text-text-secondary">{results.length} unit{results.length > 1 ? "s" : ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={handleCopy} className="hover:bg-white/50 dark:hover:bg-dark-800/50 rounded-lg">
                  {copied ? <Check className="h-4 w-4 text-accent-green" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TooltipTrigger><TooltipContent>Copy</TooltipContent></Tooltip></TooltipProvider>
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={handleShare} className="hover:bg-white/50 dark:hover:bg-dark-800/50 rounded-lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger><TooltipContent>Share</TooltipContent></Tooltip></TooltipProvider>
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={handleDownload} className="hover:bg-white/50 dark:hover:bg-dark-800/50 rounded-lg">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger><TooltipContent>Download</TooltipContent></Tooltip></TooltipProvider>
              {onReset && <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={onReset} className="hover:bg-white/50 dark:hover:bg-dark-800/50 rounded-lg">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger><TooltipContent>Reset</TooltipContent></Tooltip></TooltipProvider>}
            </div>
          </div>

          {/* Primary Result Card */}
          {primaryResult && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-5 sm:p-6 rounded-2xl mb-5 overflow-hidden bg-gradient-to-br from-white to-white/60 dark:from-dark-800 dark:to-dark-800/60 border border-border/60"
            >
              <div className="flex items-center gap-3 mb-2">
                {(() => {
                  const Icon = getUnitIcon(primaryResult.unit);
                  return (
                    <div className="w-8 h-8 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                  );
                })()}
                <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  {primaryResult.unit}
                </p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tabular-nums tracking-tight max-w-full min-w-0 break-words">
                  {primaryResult.formatted === "NaN" ? "---" : primaryResult.formatted}
                </span>
              </div>
            </motion.div>
          )}

          {/* All conversions list - premium pill design */}
          <div className="rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/50 overflow-hidden">
            <ScrollArea className="max-h-[400px]">
              <div className="divide-y divide-border/40">
                {otherResults.map((result, index) => {
                  const Icon = getUnitIcon(result.unit);
                  const colorIndex = index % unitColors.length;
                  return (
                    <motion.div
                      key={result.unit}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.025, duration: 0.2 }}
                      className={cn(
                        "flex items-center gap-3 px-4 sm:px-5 py-3.5 transition-all hover:bg-white/40 dark:hover:bg-dark-800/40 cursor-default",
                        selectedUnit === result.unit && "bg-primary-500/5 dark:bg-primary-500/10"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br",
                        unitColors[colorIndex]
                      )}>
                        <Icon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className={cn(
                        "text-sm font-medium flex-1",
                        selectedUnit === result.unit ? "text-primary-600 dark:text-primary-400" : "text-text-secondary"
                      )}>
                        {result.unit}
                      </span>
                      <span className={cn(
                        "text-base font-mono tabular-nums max-w-full min-w-0 break-words text-right",
                        selectedUnit === result.unit
                          ? "text-primary-600 dark:text-primary-400 font-semibold"
                          : "text-text"
                      )}>
                        {result.formatted === "NaN" ? "---" : result.formatted}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
