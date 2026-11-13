"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CalculatorResult } from "@/types/calculators";

const STORAGE_KEY = "measurely-saved-calculations-v1";
interface SavedCalculation {
  id: string;
  slug: string;
  name: string;
  savedAt: string;
  results: CalculatorResult[];
}

function readSaved(): SavedCalculation[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(value)) return [];
    return value.filter(entry => entry && typeof entry.id === "string" && typeof entry.slug === "string" && typeof entry.name === "string" && typeof entry.savedAt === "string" && Array.isArray(entry.results)).slice(0, 20);
  } catch { return []; }
}

export function SaveCalculation({slug, name, results}: {slug: string; name: string; results: CalculatorResult[]}) {
  const [message, setMessage] = useState("");
  const save = () => {
    try {
      const entry: SavedCalculation = {id: crypto.randomUUID(), slug, name, savedAt: new Date().toISOString(), results};
      localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...readSaved()].slice(0, 20)));
      setMessage("Saved in this browser.");
    } catch { setMessage("Storage is unavailable or full. You can still copy or export the results."); }
  };
  return <div className="mt-3 rounded-xl border border-border bg-surface p-4"><div className="flex flex-wrap items-center gap-3"><button type="button" onClick={save} className="rounded-lg border border-primary-500/40 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300">Save this result</button><Link href="/saved" className="text-sm underline underline-offset-4">View saved calculations</Link></div><p className="mt-2 text-xs leading-5 text-muted">Optional: up to 20 results stay on this device. Anyone using this browser may see them. Avoid saving sensitive results on shared devices.</p><p role="status" className="mt-2 text-sm">{message}</p></div>;
}

export function SavedCalculations() {
  const [entries, setEntries] = useState<SavedCalculation[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { const timer = setTimeout(() => {setEntries(readSaved());setReady(true);}, 0); return () => clearTimeout(timer); }, []);
  const remove = (id: string) => {
    try {
      const next = entries.filter(entry => entry.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setEntries(next);
    } catch { setError("Unable to update browser storage. Check your browser storage settings."); }
  };
  return <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16"><p className="text-sm font-medium text-primary-600 dark:text-primary-300">Your workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Saved calculations</h1><p className="mb-8 mt-4 max-w-2xl text-sm leading-7 text-text-secondary">Your saved results live only in this browser. They are not synced to an account. Removing a result deletes the local copy; clearing browser storage removes all saved results.</p>{error && <p role="alert">{error}</p>}{!ready ? <p role="status">Loading saved results…</p> : entries.length === 0 ? <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center"><h2 className="text-xl font-semibold">No saved results yet</h2><p className="mt-3 text-sm text-muted">Run a calculator and choose Save this result.</p><Link href="/calculators" className="mt-5 inline-flex rounded-xl bg-primary-600 px-5 py-3 text-sm font-medium text-white">Browse calculators</Link></div> : <div className="space-y-5">{entries.map(entry => <article key={entry.id} className="rounded-2xl border border-border bg-surface p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-semibold"><Link href={/^[-a-z0-9]+$/.test(entry.slug) ? "/"+entry.slug : "/calculators"}>{entry.name}</Link></h2><p className="mt-1 text-xs text-muted">Saved {new Date(entry.savedAt).toLocaleString()}</p></div><button type="button" onClick={() => remove(entry.id)} aria-label={"Remove saved result for "+entry.name} className="rounded-lg border border-border px-3 py-2 text-sm">Remove</button></div><dl className="mt-4 grid gap-3 sm:grid-cols-2">{entry.results.map((result, index) => <div key={index} className="rounded-xl bg-surface-secondary p-3"><dt className="text-xs text-muted">{result.label}</dt><dd className="mt-1 break-words text-sm font-semibold">{String(result.value)} {result.unit}</dd></div>)}</dl></article>)}</div>}</div>;
}
