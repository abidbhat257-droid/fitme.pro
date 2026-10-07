import React from "react";
import { Link } from "react-router-dom";
import { Barbell } from "@phosphor-icons/react";

const hubs=[
  ["/calculator-category/body-composition","Body Composition"],
  ["/calculator-category/weight-management","Weight Management"],
  ["/calculator-category/calories","Calories & Metabolism"],
  ["/calculator-category/nutrition","Nutrition & Macros"],
  ["/calculator-category/running","Running & Endurance"],
  ["/calculator-category/strength","Strength & Gym"],
  ["/calculator-category/heart","Heart & Cardiovascular"]
];

export default function Footer(){
  return <footer className="no-print border-t border-border bg-background/60 mt-16">
    <div className="mx-auto max-w-[1600px] px-4 sm:px-8 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3 w-fit group" aria-label="Open FitMe Pro dashboard">
            <div className="h-8 w-8 grid place-items-center bg-[var(--brand-lime)] text-white"><Barbell size={20} weight="duotone"/></div>
            <span className="font-display text-lg uppercase tracking-tighter">fitme<span className="text-[var(--brand-lime)]">.pro</span></span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">A free suite of 100 health, body-composition, nutrition, running, strength, cardiovascular and fitness calculators.</p>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-muted-foreground mb-3">Calculator Topics</div>
          <div className="flex flex-col gap-2 text-xs">{hubs.map(([to,label])=><Link key={to} to={to} className="hover:underline">{label}</Link>)}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-muted-foreground mb-3">Evidence & Trust</div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">FitMe Pro Editorial Team creates and reviews the site content using documented formulas and public-health sources. <time dateTime="2026-10-05">Last reviewed October 5, 2026.</time></p><div className="mb-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider"><span className="border border-border px-2 py-1">Evidence-informed</span><span className="border border-border px-2 py-1">Privacy-first</span><span className="border border-border px-2 py-1">Educational only</span></div>
          <div className="flex flex-col gap-2 text-xs">
            <Link to="/journal/evidence-sources">Evidence Sources</Link>
            <Link to="/journal/editorial-standards">Editorial Standards</Link>
            <Link to="/about">About FitMe Pro</Link><span>Editorial byline: FitMe Pro Editorial Team</span><span>Business address: not publicly listed</span>
            <Link to="/contact">Contact</Link><a href="https://www.cdc.gov/healthy-weight-growth/" target="_blank" rel="noopener noreferrer">CDC Healthy Weight</a><a href="https://www.niddk.nih.gov/health-information/weight-management" target="_blank" rel="noopener noreferrer">NIDDK Weight Management</a>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-muted-foreground mb-3">Explore</div>
          <div className="flex flex-col gap-2 text-xs">
            <Link to="/calculators">All 100 Calculators</Link>
            <Link to="/journal">FitMe Pro Journal</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-muted-foreground mb-3">Share & Project</div>
          <div className="flex flex-col gap-2 text-xs">
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ffitme-pro.vercel.app%2F" target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
            <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ffitme-pro.vercel.app%2F&text=FitMe%20Pro%20health%20and%20fitness%20calculators" target="_blank" rel="noopener noreferrer">Share on X</a>
            <a href="https://github.com/abidbhat257-droid/fitme.pro" target="_blank" rel="noopener noreferrer">FitMe Pro GitHub project</a>
          </div>
        </div>
      </div>
      <div className="mt-8 border border-border bg-card p-4 text-xs leading-6 text-muted-foreground">
        <strong className="text-foreground">Health disclaimer:</strong> FitMe Pro is an educational calculator platform. Results are estimates, not diagnoses or prescriptions. For symptoms, medical conditions, medication decisions, pregnancy, or other individual concerns, consult a qualified health professional.
      </div>
      <div className="mt-8 border-t border-border pt-4 text-center text-[10px] uppercase tracking-[.25em] text-muted-foreground">© {new Date().getFullYear()} FitMe Pro — Built for health and fitness planning.</div>
    </div>
  </footer>;
}
