"use client";

import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculators } from "@/data/calculators";
import { CATEGORIES } from "@/lib/constants";
import {
  Search,
  ArrowRight,
  Sparkles,

  Calculator,
  Zap,
  Gem,
} from "lucide-react";
import { useMemo, useRef, useCallback } from "react";

/* ==================== HeroSection ==================== */
export function HeroSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Mouse parallax ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const sphereX = useTransform(springX, [0, 1], [-48, -32]);
  const sphereY = useTransform(springY, [0, 1], [-22, -38]);

  /* ── Tool card data ── */
  const toolCards = useMemo(
    () => [
      { icon: Calculator, title: "Smart Calculators", desc: `${calculators.length}+ Tools`, delay: 0 },
      { icon: Zap, title: "Instant Results", desc: "Fast and Accurate", delay: 0.3 },
      { icon: Gem, title: "Free Forever", desc: "100% Free", delay: 0.6 },
    ],
    [],
  );

  /* ── Stats ── */
  const stats = useMemo(
    () => [
      { value: `${calculators.length}+`, label: "Calculators" },
      { value: "100%", label: "Free to Use" },
      { value: "Instant", label: "Results" },
    ],
    [],
  );

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent dark:from-primary-500/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/5 via-transparent to-accent-amber/5 dark:from-accent-cyan/10 dark:to-accent-amber/10" />
      <div className="absolute inset-0 grid-pattern" />

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent-cyan/20 dark:bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-amber/10 dark:bg-accent-amber/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ──────────────── Left content ──────────────── */}
          <div className="relative z-10 animate-fade-in-up" style={{ animationDuration: "0.6s" }}>
            <div
              style={{ animationDelay: "0.1s" }}
              className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 border border-primary-500/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>All-in-One Calculation Platform</span>
            </div>

            <h1
              style={{ animationDelay: "0.2s" }}
              className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              <span className="text-text">All </span>
              <span className="text-gradient">Calculators</span>
              <br />
              <span className="text-text">in One Place</span>
            </h1>

            <p
              style={{ animationDelay: "0.3s" }}
              className="animate-fade-in-up mt-6 text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              Solve everyday calculations instantly with hundreds of powerful free calculators. Fast, accurate, and easy to use.
            </p>

            <div
              style={{ animationDelay: "0.4s" }}
              className="animate-fade-in-up mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button
                variant="gradient-cyan"
                size="xl"
                onClick={() => router.push("/categories")}
                className="group shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => router.push("/categories?popular=true")}
              >
                Popular Calculators
              </Button>
            </div>

            <div
              style={{ animationDelay: "0.5s" }}
              className="animate-fade-in-up mt-10"
            >
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <Input
                  placeholder="Search calculators..."
                  aria-label="Search calculators"
                  className="pl-12 h-14 text-base rounded-2xl border-border bg-surface-secondary/80 shadow-sm hover:shadow-md focus:shadow-md transition-all cursor-pointer"
                  readOnly
                  onClick={() => router.push("/search")}
                />
              </div>
            </div>

            <div
              style={{ animationDelay: "0.6s", animationDuration: "0.5s" }}
              className="animate-fade-in mt-6 flex items-center gap-6 text-sm text-muted"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-green shadow-sm shadow-accent-green/50" />
                 {calculators.length}+ Tools
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500 shadow-sm shadow-primary-500/50" />
                9 Categories
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-sm shadow-accent-cyan/50" />
                Free Forever
              </span>
            </div>
          </div>

          {/* ──────────────── Right visual ──────────────── */}
          <div className="relative hidden lg:flex flex-col items-center gap-5">
            <div
              ref={containerRef}
              className="relative w-full max-w-lg aspect-square select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* ── Background blobs ── */}
              <motion.div
                className="absolute -top-4 -left-4 w-64 h-64 bg-primary-500/15 dark:bg-primary-500/20 rounded-full blur-3xl will-change-transform pointer-events-none"
                animate={{ scale: [1, 1.25, 1], x: [0, 20, 0], y: [0, -12, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-8 -right-8 w-72 h-72 bg-accent-cyan/15 dark:bg-accent-cyan/20 rounded-full blur-3xl will-change-transform pointer-events-none"
                animate={{ scale: [1, 1.2, 1], x: [0, -16, 0], y: [0, 16, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/3 left-1/3 w-48 h-48 bg-purple-500/12 dark:bg-purple-500/18 rounded-full blur-3xl will-change-transform pointer-events-none"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ── Grid ── */}
              <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-40 pointer-events-none" />

              {/* ── Central glow ── */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(99,102,241,0.3) 0%, rgba(6,182,212,0.15) 30%, rgba(168,85,247,0.08) 50%, transparent 70%)",
                }}
              />

              {/* ── Particles ── */}
              {[
                { l: "10%", t: "20%", d: 0, s: 2.5 },
                { l: "85%", t: "15%", d: 0.5, s: 2 },
                { l: "18%", t: "78%", d: 1.0, s: 2 },
                { l: "82%", t: "82%", d: 1.5, s: 3 },
                { l: "50%", t: "5%", d: 0.3, s: 2 },
                { l: "45%", t: "92%", d: 0.7, s: 2 },
                { l: "5%", t: "48%", d: 1.2, s: 2.5 },
                { l: "93%", t: "50%", d: 1.8, s: 2 },
              ].map((p, i) => (
                <motion.div
                  key={`pt-${i}`}
                  className="absolute rounded-full bg-primary-400/30 dark:bg-primary-300/30 pointer-events-none"
                  style={{ left: p.l, top: p.t, width: `${p.s}px`, height: `${p.s}px` }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: p.d, ease: "easeInOut" }}
                />
              ))}

              {/* ── Floating Dashboard Panel ── */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ x: sphereX, y: sphereY } as any}
              >
                <motion.div
                  className="w-52 h-56 rounded-3xl bg-surface/30 dark:bg-dark-900/40 backdrop-blur-2xl border border-white/25 dark:border-white/10 shadow-2xl relative overflow-hidden"
                  animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Inner gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                  {/* Dashboard content */}
                  <div className="relative p-4 flex flex-col h-full">
                    {/* Status bar */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-accent-green shadow-sm shadow-accent-green/50" />
                        <div className="w-2 h-2 rounded-full bg-accent-amber shadow-sm shadow-accent-amber/50" />
                        <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-sm shadow-accent-cyan/50" />
                      </div>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="h-3.5 w-3.5 text-primary-400" />
                      </motion.div>
                    </div>

                    {/* Calculator display */}
                    <motion.div
                      className="bg-surface/40 dark:bg-dark-800/40 rounded-xl px-3 py-2.5 mb-3 border border-white/10 dark:border-white/5"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[9px] text-muted dark:text-dark-400 font-medium uppercase tracking-wider">Result</p>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <motion.span
                              className="text-2xl font-bold tracking-tight text-gradient"
                              animate={{ opacity: [1, 0.7, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              42,850
                            </motion.span>
                            <span className="text-xs text-muted font-medium">m²</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-muted dark:text-dark-400">Area</p>
                          <p className="text-[10px] text-text-secondary dark:text-dark-300">245 × 175m</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Chart */}
                    <div className="flex items-end gap-[3px] h-14 mb-3 px-1">
                      {[35, 55, 40, 70, 45, 85, 60].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-primary-500/35 to-accent-cyan/35 dark:from-primary-400/30 dark:to-accent-cyan/30"
                          animate={{ height: [`${h}%`, `${h + 22}%`, `${h}%`] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                        />
                      ))}
                    </div>

                    {/* Stats badges */}
                    <div className="grid grid-cols-3 gap-2 mb-auto">
                      {[
                        { value: `${calculators.length}+`, label: "Tools" },
                        { value: `${CATEGORIES.length}`, label: "Categories" },
                        { value: "100%", label: "Free" },
                      ].map((s) => (
                        <div key={s.label} className="text-center rounded-lg bg-surface/30 dark:bg-dark-800/30 py-1.5 border border-white/10 dark:border-white/5">
                          <p className="text-xs font-bold text-gradient-cyan">{s.value}</p>
                          <p className="text-[8px] text-muted dark:text-dark-400 uppercase tracking-wider">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bottom action pills */}
                    <div className="flex gap-2 mt-2.5">
                      {[
                        { label: "Calculate", color: "from-primary-500 to-accent-cyan" },
                        { label: "Instant", color: "from-accent-cyan to-purple-500" },
                      ].map((a) => (
                        <motion.div
                          key={a.label}
                          className="flex-1 text-center py-1.5 rounded-lg text-[9px] font-semibold text-white uppercase tracking-wider cursor-default bg-gradient-to-r shadow-sm"
                          style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops, ${a.color}))` }}
                          whileHover={{ scale: 1.05, y: -1 }}
                        >
                          {a.label}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Edge shine */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/20" />
                </motion.div>
              </motion.div>

              {/* ── Floating tool cards ── */}
              {[
                { card: toolCards[0], l: "62%", t: "5%", z: 20, dx: 6, dy: -4 },
                { card: toolCards[1], l: "63%", t: "72%", z: 20, dx: -4, dy: 6 },
                { card: toolCards[2], l: "6%", t: "74%", z: 20, dx: -6, dy: 4 },
              ].map(({ card, l, t, dx, dy }, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: l, top: t, zIndex: 20 }}
                  >
                    <motion.div
                      animate={{ y: [0, dy, 0], x: [0, dx, 0] }}
                      transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                      whileHover={{ scale: 1.1, y: -4 }}
                    >
                      <motion.div
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl glass-card shadow-lg backdrop-blur-md cursor-default w-[115px]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 12 }}
                      >
                        <div className="shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 dark:from-primary-500/30 dark:to-accent-cyan/30 flex items-center justify-center">
                          <Icon className="h-3.5 w-3.5 text-primary-500 dark:text-primary-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-text dark:text-white leading-tight truncate">
                            {card.title}
                          </p>
                          <p className="text-[9px] text-muted dark:text-dark-400 leading-tight truncate">
                            {card.desc}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}

              {/* ── Light reflection sweep ── */}
              <motion.div
                className="absolute inset-0 z-30 pointer-events-none rounded-3xl"
                animate={{
                  background: [
                    "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 45%, transparent 60%)",
                    "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 55%, transparent 70%)",
                    "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 45%, transparent 60%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* ── Bottom Stats Card ── */}
              <motion.div
                className="w-full max-w-lg rounded-[2rem] bg-gradient-to-br from-primary-400/30 via-accent-cyan/20 to-purple-500/30 p-[1.5px] shadow-2xl shadow-primary-500/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(99,102,241,0.2)" }}
              >
                <div className="size-full rounded-[calc(2rem-1.5px)] bg-surface/60 backdrop-blur-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/10 dark:from-dark-900/50 dark:to-dark-900/10" />
                  <div className="absolute inset-0 rounded-[calc(2rem-1.5px)] ring-1 ring-inset ring-primary-500/10 dark:ring-primary-400/10" />
                  <div className="relative z-10 grid grid-cols-3 divide-x divide-primary-500/10 dark:divide-primary-400/10">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center py-4 px-2 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-lg font-bold text-gradient-cyan leading-none">{stat.value}</span>
                      <span className="text-[10px] text-muted dark:text-dark-400 mt-1 leading-tight">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ──────────────── Mobile right visual ──────────────── */}
          <div className="flex lg:hidden flex-col items-center gap-4 mt-8">
            {/* Mini floating dashboard */}
            <div className="relative w-full max-w-xs aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-36 h-40 rounded-2xl bg-surface/30 dark:bg-dark-900/40 backdrop-blur-2xl border border-white/25 dark:border-white/10 shadow-xl relative overflow-hidden"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
                  <div className="relative p-3 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      </div>
                      <Sparkles className="h-3 w-3 text-primary-400" />
                    </div>
                    <div className="bg-surface/40 dark:bg-dark-800/40 rounded-lg px-2.5 py-2 mb-2 border border-white/10 dark:border-white/5">
                      <p className="text-[7px] text-muted uppercase tracking-wider">Result</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-gradient">42,850</span>
                        <span className="text-[9px] text-muted">m²</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-[2px] h-10 mb-2">
                      {[35, 55, 40, 70, 45, 85, 60].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-primary-500/35 to-accent-cyan/35"
                          animate={{ height: [`${h}%`, `${h + 22}%`, `${h}%`] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { value: `${calculators.length}+`, label: "Tools" },
                        { value: `${CATEGORIES.length}`, label: "Cats" },
                        { value: "Free", label: "100%" },
                      ].map((s) => (
                        <div key={s.label} className="text-center rounded-md bg-surface/30 dark:bg-dark-800/30 py-1 border border-white/10 dark:border-white/5">
                          <p className="text-[10px] font-bold text-gradient-cyan">{s.value}</p>
                          <p className="text-[6px] text-muted uppercase">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/20" />
                </motion.div>
              </div>
            </div>

            {/* Tool cards grid */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs">
              {toolCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-2xl glass-card shadow-md backdrop-blur-md cursor-default"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <div className="shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 dark:from-primary-500/30 dark:to-accent-cyan/30 flex items-center justify-center">
                      <Icon className="h-3.5 w-3.5 text-primary-500 dark:text-primary-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-text dark:text-white leading-tight truncate">
                        {card.title}
                      </p>
                      <p className="text-[9px] text-muted dark:text-dark-400 leading-tight truncate">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile stats */}
              <motion.div
                className="w-full max-w-xs rounded-2xl bg-gradient-to-br from-primary-400/30 via-accent-cyan/20 to-purple-500/30 p-[1.5px] shadow-xl shadow-primary-500/10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="size-full rounded-[calc(2rem-1.5px)] bg-surface/60 backdrop-blur-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/10 dark:from-dark-900/50 dark:to-dark-900/10" />
                  <div className="absolute inset-0 rounded-[calc(2rem-1.5px)] ring-1 ring-inset ring-primary-500/10 dark:ring-primary-400/10" />
                  <div className="relative z-10 grid grid-cols-3 divide-x divide-primary-500/10 dark:divide-primary-400/10">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center py-3 px-1 text-center">
                      <span className="text-base font-bold text-gradient-cyan leading-none">{stat.value}</span>
                      <span className="text-[9px] text-muted dark:text-dark-400 mt-0.5 leading-tight">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
