import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bookmark, Calculator, Ruler, BookOpen } from "lucide-react";
import { calculators } from "@/data/calculators";
import { ALL_CATEGORIES } from "@/data/tool-registry";

const essentials = ["sip-calculator", "emi-calculator", "compound-interest-calculator", "percentage-calculator", "bmi-calculator", "days-between-dates"];
const categories = ["finance", "health", "math", "time", "construction", "everyday-life"];
const descriptions: Record<string, string> = { finance: "Make a plan for your money.", health: "Understand your everyday numbers.", math: "Work through the numbers.", time: "Keep dates and deadlines in order.", construction: "Measure twice. Plan once.", "everyday-life": "Small calculations, sorted." };

export function EditorialHome() {
  return <>
    <div className="principles-strip"><div className="editorial-container"><span><Calculator size={17} /> Clear inputs. Useful results.</span><span><BookOpen size={17} /> Formulas and examples included.</span><span><Bookmark size={17} /> Save results on your device.</span></div></div>
    <section className="editorial-container editorial-section" aria-labelledby="essentials-title">
      <div className="section-heading"><div><p className="eyebrow">The everyday essentials</p><h2 id="essentials-title">Start with a good question.</h2></div><Link className="text-link" href="/calculators">Explore all calculators <ArrowRight size={17} /></Link></div>
      <div className="essential-grid">{essentials.map((slug, index) => { const tool = calculators.find(item => item.slug === slug)!; return <Link href={`/${slug}`} key={slug} className="essential-card"><div className="essential-top"><tool.icon size={23} strokeWidth={1.5} /><span>0{index + 1}</span></div><h3>{tool.name}</h3><p>{tool.description}</p><span className="essential-bottom">Open calculator <ArrowUpRight size={17} /></span></Link>; })}</div>
    </section>
    <section className="category-section" aria-labelledby="topics-title"><div className="editorial-container editorial-section"><div className="section-heading"><div><p className="eyebrow">Find your starting point</p><h2 id="topics-title">A tool for the task at hand.</h2></div><Link href="/categories" className="text-link">All categories <ArrowRight size={17} /></Link></div><div className="editorial-categories">{categories.map((slug, index) => { const category = ALL_CATEGORIES.find(item => item.slug === slug)!; return <Link href={`/${slug}`} key={slug}><span className="category-index">0{index + 1}</span><div><h3>{slug === "everyday-life" ? "Everyday life" : slug.charAt(0).toUpperCase() + slug.slice(1)}</h3><p>{descriptions[slug]}</p></div><span className="category-count">{category.tools.length} tools</span><ArrowUpRight size={19} /></Link>; })}</div></div></section>
    <section className="editorial-container editorial-section"><div className="utility-feature"><div className="utility-feature-icon"><Ruler size={42} strokeWidth={1.25} /><span>METRIC ↔ IMPERIAL</span></div><div><p className="eyebrow">Everyday conversions</p><h2>Different units. Same answer.</h2><p>Length, weight, area, volume, speed and temperature. Convert them in one place, without opening six different tools.</p><Link href="/unit-converter" className="solid-link">Open unit converter <ArrowRight size={17} /></Link></div></div></section>
    <section className="editorial-container home-closing"><div><p className="eyebrow">A little context goes a long way</p><h2>Understand the numbers<br />behind the result.</h2></div><div><p>Use the worked examples and formulas alongside each calculator. For decisions about money or health, check the assumptions and use the result as a starting point.</p><Link href="/blog" className="text-link">Read the guides <ArrowRight size={17} /></Link></div></section>
  </>;
}
