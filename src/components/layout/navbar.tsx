"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, Menu, Moon, Sun, Bookmark, Ruler } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSearchStore } from "@/hooks/use-search-store";

const links = [{href:"/calculators",label:"Calculators"},{href:"/categories",label:"Categories"},{href:"/blog",label:"Guides"}];
export function Navbar() {
  const pathname = usePathname();
  const {setIsOpen} = useSearchStore();
  const {resolvedTheme, setTheme} = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key === "k") { event.preventDefault(); setIsOpen(true); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setIsOpen]);
  return <header className="site-header"><nav className="editorial-container site-navigation" aria-label="Main navigation">
    <Link href="/" className="brand-wordmark" aria-label="Measurely home"><span className="brand-symbol"><Ruler size={19} strokeWidth={1.7}/></span>Measurely<span className="brand-period">.</span></Link>
    <div className="desktop-navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined}>{link.label}</Link>)}</div>
    <div className="navigation-actions"><button onClick={()=>setIsOpen(true)} className="nav-search" aria-label="Search tools"><Search size={18}/><span>Find a tool</span><kbd>Ctrl K</kbd></button><Link href="/saved" className="nav-icon" aria-label="Saved calculations"><Bookmark size={19}/></Link><button className="nav-icon theme-toggle" onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")} aria-label="Toggle color theme"><Moon className="dark:hidden" size={18}/><Sun className="hidden dark:block" size={18}/></button>
    <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className="nav-icon mobile-menu-toggle" aria-label="Open menu"><Menu size={22}/></button></DialogTrigger><DialogContent className="mobile-navigation-dialog"><DialogTitle>Explore Measurely</DialogTitle><div className="mobile-navigation-links">{[...links,{href:"/unit-converter",label:"Unit converter"},{href:"/saved",label:"Saved calculations"},{href:"/about",label:"About"},{href:"/contact",label:"Contact"}].map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)}>{link.label}</Link>)}</div></DialogContent></Dialog>
    </div></nav></header>;
}
