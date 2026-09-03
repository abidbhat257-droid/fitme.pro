import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { List, X, House, Calculator, Info, ShieldCheck, FileText, BookOpen, CaretDown, CaretRight } from "@phosphor-icons/react";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import { SPECIALIZED_CALCULATORS } from "@/lib/specializedCalculators";
import { JOURNAL_CATEGORIES } from "@/lib/journalContent";
import BodyProfileSidebar from "@/components/BodyProfileSidebar";

const information = [["/about", "About FitMe Pro", Info], ["/contact", "Contact", Info], ["/privacy-policy", "Privacy Policy", ShieldCheck], ["/terms", "Terms & Conditions", FileText]];
const allCalculators = [
  ...CALCULATORS.map((calc) => ({ ...calc, href: `/${calc.slug}-calculator` })),
  ...SPECIALIZED_CALCULATORS.map((calc) => ({ ...calc, href: `/${calc.slug}` })),
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(true);
  const location = useLocation();
  const close = () => setOpen(false);
  const journalActive = location.pathname === "/journal" || location.pathname.startsWith("/journal/");
  const ui = <>
    <button type="button" aria-label="Open all FitMe Pro calculators" aria-expanded={open} onClick={() => setOpen(true)} className="no-print fixed left-3 top-3 z-[9999] grid h-11 w-11 place-items-center rounded-md border border-border bg-background text-foreground shadow-2xl backdrop-blur-xl transition-colors hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]"><List size={23} weight="bold" /></button>
    {open && <div className="no-print fixed inset-0 z-[10000]">
      <button aria-label="Close navigation" onClick={close} className="absolute inset-0 bg-black/60" />
      <aside className="relative flex h-full w-[min(420px,94vw)] flex-col overflow-hidden border-r border-border bg-background shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-background px-5 py-4"><div><div className="font-display text-xl font-bold uppercase tracking-tighter">fitme<span className="text-[var(--brand-lime)]">.pro</span></div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">All 40 calculators</div></div><button aria-label="Close navigation" onClick={close} className="grid h-9 w-9 place-items-center rounded-md border border-border hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]"><X size={18} /></button></div>
        <nav className="min-h-0 flex-1 overflow-y-auto p-4">
          <Link to="/" onClick={close} className={`mb-3 flex items-center gap-3 rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wider hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === "/" ? "bg-muted text-[var(--brand-lime)]" : ""}`}><House size={18} weight="duotone" /> Dashboard</Link>

          <div className="mb-3">
            <button type="button" onClick={() => setJournalOpen((v) => !v)} aria-expanded={journalOpen} className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wider hover:bg-muted hover:text-[var(--brand-lime)] ${journalActive ? "bg-muted text-[var(--brand-lime)]" : ""}`}>
              {journalOpen ? <CaretDown size={16} weight="bold" /> : <CaretRight size={16} weight="bold" />}
              <BookOpen size={18} weight="duotone" />
              <span className="flex-1 text-left">Journal</span>
            </button>
            {journalOpen && <div className="mt-1 ml-5 border-l border-border pl-3 space-y-0.5">
              <Link to="/journal" onClick={close} className={`block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === "/journal" ? "text-[var(--brand-lime)] font-bold" : ""}`}>Journal Home</Link>
              {JOURNAL_CATEGORIES.map((category) => {
                const href = `/journal/${category.slug}`;
                const active = location.pathname === href || location.pathname.startsWith(`${href}/`);
                return <Link key={category.slug} to={href} onClick={close} className={`block rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-[var(--brand-lime)] ${active ? "text-[var(--brand-lime)] font-bold" : ""}`}>{category.name}</Link>;
              })}
              <Link to="/journal/evidence-sources" onClick={close} className={`block rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === "/journal/evidence-sources" ? "text-[var(--brand-lime)] font-bold" : ""}`}>Evidence Sources</Link>
              <Link to="/journal/editorial-standards" onClick={close} className={`block rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === "/journal/editorial-standards" ? "text-[var(--brand-lime)] font-bold" : ""}`}>Editorial Standards</Link>
            </div>}
          </div>

          <BodyProfileSidebar />
          <div className="my-6 flex items-center justify-between border-y border-border px-3 py-3"><span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">All 40 Calculators</span><span className="font-mono-data text-[10px] text-muted-foreground">{allCalculators.length}</span></div>
          <div className="space-y-1">
            {allCalculators.map((calc, index) => {
              const category = CATEGORIES[calc.category];
              const categoryLabel = category?.label || calc.category || "Specialized";
              const categoryColor = category?.color || "#059669";
              const previous = allCalculators[index - 1];
              const newGroup = index === 0 || previous.category !== calc.category;
              return <React.Fragment key={calc.id}>
                {newGroup && <div className={`${index === 0 ? "" : "pt-5"} mb-1 flex items-center gap-2 px-3`}><span className="h-2 w-2 shrink-0 rounded-full" style={{ background: categoryColor }} /><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{categoryLabel}</span></div>}
                <Link to={calc.href} onClick={close} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === calc.href ? "bg-muted font-bold text-[var(--brand-lime)]" : ""}`}><span className="w-7 shrink-0 font-mono-data text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><Calculator size={16} weight="duotone" className="shrink-0" /><span className="truncate">{calc.name}</span></Link>
              </React.Fragment>;
            })}
          </div>
          <div className="my-6 border-t border-border" /><div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Information</div>
          <div className="space-y-0.5">{information.map(([to, label, Icon]) => <Link key={to} to={to} onClick={close} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted hover:text-[var(--brand-lime)]"><Icon size={16} weight="duotone" />{label}</Link>)}</div>
        </nav>
      </aside>
    </div>}
  </>;
  return typeof document === "undefined" ? null : createPortal(ui, document.body);
}
