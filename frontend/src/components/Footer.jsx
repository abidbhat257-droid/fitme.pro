import React from "react";
import { Link } from "react-router-dom";
import { Barbell } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="no-print border-t border-border bg-background/60 mt-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div><Link to="/" className="flex items-center gap-2 mb-3 w-fit group" aria-label="Open Fitme Pro dashboard"><div className="h-8 w-8 grid place-items-center bg-[var(--brand-lime)] text-white group-hover:bg-emerald-700 transition-colors"><Barbell size={20} weight="duotone" /></div><span className="font-display text-lg uppercase tracking-tighter">fitme<span className="text-[var(--brand-lime)]">.pro</span></span></Link><p className="text-sm text-muted-foreground max-w-sm leading-relaxed">A premium suite of 40 health, body-composition, nutrition, and fitness calculators. Enter your measurements once — get every integrated insight instantly.</p></div>
        <div><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">Disclaimer</div><p className="text-xs text-muted-foreground leading-relaxed">Fitme Pro provides educational estimates only. Consult a licensed physician for medical decisions.</p></div>
        <div><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">Privacy</div><p className="text-xs text-muted-foreground leading-relaxed mb-3">Your calculator inputs are designed to be processed on your device.</p><Link to="/privacy-policy" className="text-xs font-medium underline hover:opacity-70">Privacy Policy</Link></div>
        <div><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">Information</div><div className="flex flex-col gap-2 text-xs"><Link to="/about" className="hover:underline">About FitMe Pro</Link><Link to="/journal" className="hover:underline">Journal</Link><Link to="/journal/editorial-standards" className="hover:underline">Editorial Standards</Link><Link to="/contact" className="hover:underline">Contact</Link><Link to="/terms" className="hover:underline">Terms & Conditions</Link></div></div>
      </div>
      <div className="border-t border-border py-4 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">© {new Date().getFullYear()} Fitme Pro — Built for the health-obsessed.</div>
    </footer>
  );
}
