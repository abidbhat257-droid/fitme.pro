import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X, House, Calculator, Info, ShieldCheck, FileText, CaretDown } from "@phosphor-icons/react";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import { SPECIALIZED_CALCULATORS } from "@/lib/specializedCalculators";

const information = [
  ["/about", "About FitMe Pro", Info],
  ["/contact", "Contact", Info],
  ["/privacy-policy", "Privacy Policy", ShieldCheck],
  ["/terms", "Terms & Conditions", FileText],
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const groups = useMemo(() => {
    const base = Object.values(CATEGORIES).map((cat) => ({
      key: cat.key,
      label: cat.label,
      color: cat.color,
      items: CALCULATORS.filter((c) => c.category === cat.key),
    }));
    return [...base, { key: "specialized", label: "Specialized", color: "#059669", items: SPECIALIZED_CALCULATORS }];
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <button type="button" aria-label="Open FitMe Pro navigation" onClick={() => setOpen(true)} className="no-print fixed left-3 top-3 z-[90] grid h-11 w-11 place-items-center border border-border bg-background shadow-lg backdrop-blur-xl transition-colors hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]">
        <List size={22} weight="bold" />
      </button>

      {open && (
        <div className="no-print fixed inset-0 z-[100]">
          <button aria-label="Close navigation" onClick={close} className="absolute inset-0 bg-black/55" />
          <aside className="relative h-full w-[min(390px,92vw)] overflow-y-auto border-r border-border bg-background shadow-2xl">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background px-5 py-4">
              <Link to="/" onClick={close} className="font-display text-xl font-bold uppercase tracking-tighter">fitme<span className="text-[var(--brand-lime)]">.pro</span></Link>
              <button aria-label="Close navigation" onClick={close} className="grid h-9 w-9 place-items-center border border-border hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]"><X size={18} /></button>
            </div>

            <nav className="p-4">
              <Link to="/" onClick={close} className={`mb-4 flex items-center gap-3 px-3 py-3 text-sm font-bold uppercase tracking-wider hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === "/" ? "bg-muted text-[var(--brand-lime)]" : ""}`}>
                <House size={18} weight="duotone" /> Dashboard
              </Link>

              <button type="button" onClick={() => setExpanded((v) => !v)} className="mb-2 flex w-full items-center justify-between px-3 py-3 text-left border-y border-border hover:text-[var(--brand-lime)]">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">All 40 Calculators</span>
                <CaretDown size={15} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>

              {expanded && <div className="space-y-5 pb-2">
                {groups.map((group) => (
                  <section key={group.key}>
                    <div className="mb-1 flex items-center gap-2 px-3 py-1.5">
                      <span className="h-2 w-2" style={{ background: group.color }} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{group.label}</span>
                      <span className="ml-auto font-mono-data text-[9px] text-muted-foreground">{group.items.length}</span>
                    </div>
                    <div className="space-y-0.5">
                      {group.items.map((calc, index) => {
                        const to = `/${calc.slug}-calculator`;
                        const globalIndex = CALCULATORS.indexOf(calc);
                        const number = globalIndex >= 0 ? globalIndex + 1 : CALCULATORS.length + index + 1;
                        return <Link key={calc.id} to={to} onClick={close} className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === to ? "bg-muted font-bold text-[var(--brand-lime)]" : ""}`}>
                          <span className="w-6 shrink-0 font-mono-data text-[10px] text-muted-foreground">{String(number).padStart(2, "0")}</span>
                          <Calculator size={15} weight="duotone" />
                          <span>{calc.name}</span>
                        </Link>;
                      })}
                    </div>
                  </section>
                ))}
              </div>}

              <div className="my-5 border-t border-border" />
              <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Information</div>
              <div className="space-y-0.5">
                {information.map(([to, label, Icon]) => <Link key={to} to={to} onClick={close} className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-muted hover:text-[var(--brand-lime)]"><Icon size={16} weight="duotone" />{label}</Link>)}
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
