"use client";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Search, X, ArrowRight, Bookmark } from "lucide-react";
import Link from "next/link";
import { calculators } from "@/data/calculators";
import { ALL_CATEGORIES } from "@/data/tool-registry";
import { ToolCard } from "@/components/home/tool-card";

function subscribeToLocation(callback:()=>void){window.addEventListener("popstate",callback);return ()=>window.removeEventListener("popstate",callback);}
export function CalculatorsPageClient() {
  const query = useSyncExternalStore(subscribeToLocation,()=>new URLSearchParams(window.location.search).get("q")||" ",()=>" ");
  const [search,setSearch]=useState<string|null>(null);
  const [category,setCategory]=useState("all");
  const [sort,setSort]=useState("recommended");
  const [limit,setLimit]=useState(18);
  const [favoritesOnly,setFavoritesOnly]=useState(false);
  const favoriteSnapshot=useSyncExternalStore(callback=>{window.addEventListener("measurelyFavoritesChanged",callback);window.addEventListener("storage",callback);return()=>{window.removeEventListener("measurelyFavoritesChanged",callback);window.removeEventListener("storage",callback);};},()=>{try{return localStorage.getItem("measurely-favorite-tools")||"[]";}catch{return "[]";}},()=>"[]");
  const favorites=useMemo(()=>{try{const parsed:unknown=JSON.parse(favoriteSnapshot);return Array.isArray(parsed)?parsed.filter(entry=>typeof entry==="string"):[];}catch{return [];}},[favoriteSnapshot]);
  const term=search??query.trim();
  const filtered=useMemo(()=>{
    const result=calculators.filter(tool=>(category==="all"||tool.category===category)&&(!favoritesOnly||favorites.includes(tool.slug))&&`${tool.name} ${tool.description}`.toLowerCase().includes(term.trim().toLowerCase()));
    if(sort==="az")result.sort((a,b)=>a.name.localeCompare(b.name));
    return result;
  },[category,term,sort,favoritesOnly,favorites]);
  const reset=()=>{setSearch("");setCategory("all");setFavoritesOnly(false);setLimit(18);};
  return <div className="catalog-page"><div className="editorial-container editorial-section"><p className="eyebrow">The calculator library</p><div className="catalog-heading"><div><h1>Good tools. Clear answers.</h1><p>Find the right calculator, get a useful result, and carry on with your day.</p></div><Link href="/saved" className="text-link"><Bookmark size={17}/> Your saved results</Link></div><div className="catalog-layout"><aside className="catalog-sidebar" aria-label="Filter by category"><h2>Browse by topic</h2><button className={category==="all"?"selected":""} onClick={()=>{setCategory("all");setLimit(18);}} aria-pressed={category==="all"}><span>All calculators</span><span>{calculators.length}</span></button>{ALL_CATEGORIES.map(item=><button key={item.slug} className={category===item.slug?"selected":""} onClick={()=>{setCategory(item.slug);setLimit(18);}} aria-pressed={category===item.slug}><span>{item.name.replace(" Calculators","")}</span><span>{item.tools.length}</span></button>)}<div className="catalog-sidebar-note"><h3>One converter. Six jobs.</h3><p>Switch between metric and imperial measurements.</p><Link href="/unit-converter">Try unit converter <ArrowRight size={15}/></Link></div></aside><section className="catalog-results" aria-label="Calculator results"><div className="catalog-toolbar"><div className="catalog-search"><Search size={18}/><input aria-label="Search calculators" placeholder="Search by name or task..." value={term} onChange={event=>{setSearch(event.target.value);setLimit(18);}}/>{term&&<button aria-label="Clear search" onClick={()=>setSearch("")}><X size={17}/></button>}</div><label className="catalog-sort"><span className="sr-only">Sort calculators</span><select value={sort} onChange={event=>setSort(event.target.value)}><option value="recommended">Default order</option><option value="az">Name: A–Z</option></select></label></div><div className="catalog-result-meta"><p role="status">{filtered.length} {filtered.length===1?"calculator":"calculators"}{category!=="all"&&` in ${ALL_CATEGORIES.find(item=>item.slug===category)?.name.replace(" Calculators","")}`}</p><button onClick={()=>{setFavoritesOnly(value=>!value);setLimit(18);}} aria-pressed={favoritesOnly}><Bookmark size={14} fill={favoritesOnly?"currentColor":"none"}/> Favorites only</button></div>{filtered.length?<><div className="catalog-grid">{filtered.slice(0,limit).map(tool=><ToolCard key={tool.slug} name={tool.name} slug={tool.slug} description={tool.description} category={tool.category} categorySlug={tool.category} icon={tool.icon.displayName||"Calculator"}/>)}</div>{filtered.length>limit&&<button className="catalog-load-more" onClick={()=>setLimit(value=>value+18)}>Show more calculators <span>{filtered.length-limit} remaining</span><ArrowRight size={16}/></button>}</>:<div className="catalog-empty"><Search size={28}/><h2>No calculators found</h2><p>Try a broader search, choose another topic or clear your filters.</p><button className="solid-link" onClick={reset}>Clear all filters</button></div>}</section></div></div></div>;
}
