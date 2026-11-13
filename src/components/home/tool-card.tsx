"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Bookmark, Calculator } from "lucide-react";
import { calculators } from "@/data/calculators";
import { cn } from "@/lib/utils";
interface ToolCardProps { name:string; slug:string; category:string; categorySlug:string; icon:string; description:string; usageCount?:string; variant?:"default"|"compact"|"featured"; className?:string; }
export function ToolCard({name,slug,category,description,variant="default",className}:ToolCardProps) {
 const [saved,setSaved]=useState(false);
 const [message,setMessage]=useState("");
 useEffect(()=>{
   const sync=()=>{try { const data:unknown=JSON.parse(localStorage.getItem("measurely-favorite-tools")||"[]"); setSaved(Array.isArray(data)&&data.includes(slug)); } catch {setSaved(false);} };
   sync(); window.addEventListener("measurelyFavoritesChanged",sync);window.addEventListener("storage",sync);
   return ()=>{window.removeEventListener("measurelyFavoritesChanged",sync);window.removeEventListener("storage",sync);};
 },[slug]);
 const Icon=calculators.find(tool=>tool.slug===slug)?.icon||Calculator;
 const toggle=()=>{try {const raw:unknown=JSON.parse(localStorage.getItem("measurely-favorite-tools")||"[]");const entries=Array.isArray(raw)?raw.filter(item=>typeof item==="string"):[];localStorage.setItem("measurely-favorite-tools",JSON.stringify(saved?entries.filter(item=>item!==slug):[...new Set([...entries,slug])]));window.dispatchEvent(new Event("measurelyFavoritesChanged"));setMessage("");}catch{setMessage("Your browser could not save this favorite.");}};
 return <article className={cn("catalog-tool",variant==="compact"&&"catalog-tool-compact",className)}><Link href={`/${slug}`} className="catalog-tool-link"><div className="catalog-tool-top"><Icon size={22} strokeWidth={1.5}/><span>{category.replaceAll("-"," ")}</span></div><h3>{name}</h3>{variant!=="compact"&&<p>{description}</p>}<span className="catalog-tool-bottom">Open calculator <ArrowUpRight size={16}/></span></Link><button className="favorite-tool-button" onClick={toggle} aria-label={saved?"Remove from favorites":"Add to favorites"} aria-pressed={saved}><Bookmark size={17} fill={saved?"currentColor":"none"}/></button>{message&&<p role="status" className="p-3 text-xs">{message}</p>}</article>;
}


