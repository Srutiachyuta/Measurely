import Link from "next/link";
import { Ruler, ArrowUpRight } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
const groups = [
  {title:"Explore",links:[["All calculators","/calculators"],["Unit converter","/unit-converter"],["Categories","/categories"],["Saved calculations","/saved"],["Guides","/blog"]]},
  {title:"Measurely",links:[["About us","/about"],["Contact","/contact"],["Editorial policy","/editorial-policy"],["Disclaimer","/disclaimer"]]},
  {title:"The details",links:[["Privacy policy","/privacy-policy"],["Terms of use","/terms"],["Cookie policy","/cookie-policy"]]},
];
export function Footer() {
 return <footer className="site-footer"><div className="editorial-container"><div className="footer-main"><div className="footer-brand"><Link className="brand-wordmark" href="/"><span className="brand-symbol"><Ruler size={19}/></span>Measurely<span className="brand-period">.</span></Link><p>A little help with the numbers.<br/>A little more confidence in your next step.</p><a className="text-link" href={`mailto:${CONTACT_INFO.email}`}>Get in touch <ArrowUpRight size={16}/></a></div>{groups.map(group=><div key={group.title} className="footer-links"><h2>{group.title}</h2>{group.links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</div>)}</div><div className="footer-bottom"><p>© {new Date().getFullYear()} Measurely. Made for everyday decisions.</p><span>Free tools. Thoughtful answers.</span></div></div></footer>;
}
