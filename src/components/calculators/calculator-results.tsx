"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Copy, Check, Download, Share2 } from "lucide-react";
import { copyToClipboard, downloadAsFile, formatIndianNumber } from "@/lib/utils";
import type { CalculatorResult, ChartConfig } from "@/types/calculators";

const ChartComponent = dynamic(() => import("./calculator-chart"), { ssr:false, loading:()=> <div className="h-48 animate-pulse rounded-lg bg-surface-secondary"/> });
interface CalculatorResultsProps { results:CalculatorResult[]; chart?:ChartConfig|null; onReset?:()=>void; title?:string; }
function formatValue(value:number|string,unit?:string) {
 if(typeof value!=="number")return String(value);
 if(unit==="₹"||unit?.startsWith("₹/"))return formatIndianNumber(value);
 if(value!==0&&Math.abs(value)<1e-9)return value.toPrecision(12);
 return value.toLocaleString("en-US",{maximumFractionDigits:["$","£","€","USD","CAD","AUD"].includes(unit||"")?2:12});
}
export function CalculatorResults({results,chart,title="Your results"}:CalculatorResultsProps) {
 const [message,setMessage]=useState("");
 const [copied,setCopied]=useState(false);
 if(!results.length)return null;
 const text=()=>results.map(result=>`${result.label}: ${result.value}${result.unit?" "+result.unit:""}`).join("\n");
 const copy=async()=>{const ok=await copyToClipboard(text());setCopied(ok);setMessage(ok?"Results copied.":"Your browser could not copy. Use Download to keep a text copy.");};
 const share=async()=>{if(navigator.share){try{await navigator.share({title:document.title,text:text()});setMessage("Results shared.");}catch(error){if(!(error instanceof DOMException&&error.name==="AbortError"))setMessage("Sharing is unavailable. Use Copy results or Download.");}}else{const ok=await copyToClipboard(window.location.href);setMessage(ok?"Calculator link copied.":"Link could not be copied. Use your browser address bar.");}};
 const primary=results[0];
 return <section className="result-panel" aria-label={title}><div className="result-panel-heading"><h2>{title}</h2><span>Calculated from your inputs</span></div><div className="result-primary"><p>{primary.label}</p><div><strong>{formatValue(primary.value,primary.unit)}</strong>{primary.unit&&<span>{primary.unit}</span>}</div>{primary.description&&<p className="result-description">{primary.description}</p>}</div>{results.length>1&&<dl className="result-details">{results.slice(1).map(result=><div key={result.key}><dt>{result.label}{result.description&&<small>{result.description}</small>}</dt><dd>{formatValue(result.value,result.unit)}{result.unit&&<span> {result.unit}</span>}</dd></div>)}</dl>}{chart&&<div className="result-chart"><ChartComponent chart={chart}/></div>}<div className="result-actions"><button onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>}Copy results</button><button onClick={()=>{downloadAsFile(document.title+"\n\n"+text(),"measurely-results.txt");setMessage("Results downloaded.");}}><Download size={14}/>Download</button><button onClick={share} aria-label="Share results"><Share2 size={14}/>Share</button></div>{message&&<p role="status" className="result-message">{message}</p>}</section>;
}
