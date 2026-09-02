import React, { useState } from "react";
import { Link } from "react-router-dom";
import { List, X, House, Calculator, Info, ShieldCheck, FileText } from "@phosphor-icons/react";

const links = [
  { to: "/", label: "Dashboard", icon: House },
  { to: "/bmi-calculator", label: "BMI Calculator", icon: Calculator },
  { to: "/bmr-calculator", label: "BMR Calculator", icon: Calculator },
  { to: "/tdee-calculator", label: "TDEE Calculator", icon: Calculator },
  { to: "/body-fat-calculator", label: "Body Fat Calculator", icon: Calculator },
  { to: "/calorie-calculator", label: "Calorie Calculator", icon: Calculator },
  { to: "/macro-calculator", label: "Macro Calculator", icon: Calculator },
  { to: "/protein-calculator", label: "Protein Calculator", icon: Calculator },
  { to: "/pace-calculator", label: "Pace Calculator", icon: Calculator },
  { to: "/one-rep-max-calculator", label: "One Rep Max", icon: Calculator },
  { to: "/about", label: "About", icon: Info },
  { to: "/privacy-policy", label: "Privacy Policy", icon: ShieldCheck },
  { to: "/terms", label: "Terms", icon: FileText },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="no-print fixed left-3 top-3 z-[70] grid h-11 w-11 place-items-center border border-border bg-background/95 shadow-lg backdrop-blur-xl transition-colors hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]"
      >
        <List size={22} weight="bold" />
      </button>

      {open && (
        <div className="no-print fixed inset-0 z-[80]">
          <button aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/50" />
          <aside className="relative h-full w-[min(340px,88vw)] overflow-y-auto border-r border-border bg-background shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-5 backdrop-blur-xl">
              <Link to="/" onClick={() => setOpen(false)} className="font-display text-xl font-bold uppercase tracking-tighter">
                fitme<span className="text-[var(--brand-lime)]">.pro</span>
              </Link>
              <button aria-label="Close navigation" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center border border-border hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]">
                <X size={18} />
              </button>
            </div>
            <nav className="p-4">
              <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">Navigation</div>
              <div className="space-y-1">
                {links.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-[var(--brand-lime)]"
                  >
                    <Icon size={17} weight="duotone" />
                    {label}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
