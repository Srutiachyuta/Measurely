"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { loanPayment } from "@/lib/finance-math";

export function HeroSection() {
  const [amount, setAmount] = useState(500000);
  const [years, setYears] = useState(5);
  const monthly = loanPayment(amount, 8.5 / 1200, years * 12);
  return (
    <section className="home-hero">
      <div className="editorial-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A clearer way to calculate</p>
          <h1>A little clarity.<br /><em>A better decision.</em></h1>
          <p className="hero-description">From your first investment to your next home project. Practical calculators that help you work out what comes next.</p>
          <form action="/calculators" className="hero-search" role="search">
            <Search size={20} aria-hidden="true" />
            <input name="q" aria-label="Find a calculator" placeholder="What would you like to work out?" />
            <button type="submit" aria-label="Find calculator"><ArrowRight size={20} /></button>
          </form>
          <div className="hero-shortcuts"><span>Start with</span><Link href="/sip-calculator">SIP</Link><Link href="/emi-calculator">Loan EMI</Link><Link href="/unit-converter">Unit converter</Link></div>
          <p className="hero-note">Free to use. No account needed.</p>
        </div>
        <div className="hero-planner">
          <div className="planner-top"><span className="eyebrow">Try it out</span><span className="planner-number">01 / FINANCE</span></div>
          <h2>A loan that fits<br />your monthly life.</h2>
          <p className="planner-description">See how the amount and term affect your EMI.</p>
          <label className="planner-label" htmlFor="quick-loan-amount"><span>Loan amount</span><strong>₹{amount.toLocaleString("en-IN")}</strong></label>
          <input id="quick-loan-amount" aria-label="Loan amount" type="range" min={50000} max={2000000} step={10000} value={amount} onChange={event => setAmount(Number(event.target.value))} />
          <div className="planner-range-labels"><span>₹50,000</span><span>₹20,00,000</span></div>
          <div className="planner-term"><label htmlFor="quick-loan-term">Repayment term</label><select id="quick-loan-term" value={years} onChange={event => setYears(Number(event.target.value))}>{[1, 2, 3, 5, 7, 10].map(value => <option key={value} value={value}>{value} {value === 1 ? "year" : "years"}</option>)}</select></div>
          <div className="planner-result" aria-live="polite" aria-atomic="true"><span>Estimated monthly EMI</span><strong>₹{Math.round(monthly).toLocaleString("en-IN")}<small> / month</small></strong></div>
          <div className="planner-bottom"><p>Illustration at 8.5% p.a.<br />Excludes lender fees.</p><Link href="/emi-calculator" aria-label="Open the full EMI calculator"><ArrowUpRight size={23} /></Link></div>
        </div>
      </div>
    </section>
  );
}
