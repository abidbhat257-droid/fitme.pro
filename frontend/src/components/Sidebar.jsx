import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X, House, Calculator, Info, ShieldCheck, FileText } from "@phosphor-icons/react";

const calculators = [
  ["/bmi-calculator", "BMI Calculator"],
  ["/bmi-prime-calculator", "BMI Prime Calculator"],
  ["/healthy-weight-range-calculator", "Healthy Weight Range"],
  ["/ideal-body-weight-calculator", "Ideal Body Weight"],
  ["/weight-loss-goal-calculator", "Weight Loss Goal"],
  ["/weight-gain-goal-calculator", "Weight Gain Goal"],
  ["/body-fat-calculator", "Body Fat Calculator"],
  ["/navy-body-fat-calculator", "Navy Body Fat Calculator"],
  ["/relative-fat-mass-calculator", "Relative Fat Mass"],
  ["/body-adiposity-index-calculator", "Body Adiposity Index"],
  ["/lean-body-mass-calculator", "Lean Body Mass"],
  ["/fat-mass-calculator", "Fat Mass Calculator"],
  ["/fat-free-mass-calculator", "Fat-Free Mass"],
  ["/ffmi-calculator", "FFMI Calculator"],
  ["/waist-hip-ratio-calculator", "Waist-to-Hip Ratio"],
  ["/waist-height-ratio-calculator", "Waist-to-Height Ratio"],
  ["/absi-calculator", "ABSI Calculator"],
  ["/bri-calculator", "BRI Calculator"],
  ["/conicity-index-calculator", "Conicity Index"],
  ["/body-frame-size-calculator", "Body Frame Size"],
  ["/bmr-calculator", "BMR Calculator"],
  ["/tdee-calculator", "TDEE Calculator"],
  ["/daily-calorie-needs-calculator", "Daily Calorie Needs"],
  ["/calorie-deficit-calculator", "Calorie Deficit"],
  ["/calorie-surplus-calculator", "Calorie Surplus"],
  ["/body-surface-area-calculator", "Body Surface Area"],
  ["/ponderal-index-calculator", "Ponderal Index"],
  ["/adjusted-body-weight-calculator", "Adjusted Body Weight"],
  ["/body-density-calculator", "Body Density"],
  ["/obesity-class-calculator", "Obesity Class"],
  ["/calorie-calculator", "Calorie Calculator"],
  ["/macro-calculator", "Macro Calculator"],
  ["/protein-calculator", "Protein Calculator"],
  ["/calories-burned-calculator", "Calories Burned Calculator"],
  ["/pace-calculator", "Pace Calculator"],
  ["/carbohydrate-calculator", "Carbohydrate Calculator"],
  ["/fat-intake-calculator", "Fat Intake Calculator"],
  ["/one-rep-max-calculator", "One Rep Max Calculator"],
  ["/target-heart-rate-calculator", "Target Heart Rate"],
  ["/army-body-fat-calculator", "Army Body Fat Calculator"],
];

const information = [
  ["/about", "About FitMe Pro", Info],
  ["/contact", "Contact", Info],
  ["/privacy-policy", "Privacy Policy", ShieldCheck],
  ["/terms", "Terms & Conditions", FileText],
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        type="button"
        aria-label="Open FitMe Pro navigation"
        onClick={() => setOpen(true)}
        className="no-print fixed left-3 top-3 z-[70] grid h-11 w-11 place-items-center border border-border bg-background/95 shadow-lg backdrop-blur-xl transition-colors hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]"
      >
        <List size={22} weight="bold" />
      </button>

      {open && (
        <div className="no-print fixed inset-0 z-[80]">
          <button aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/50" />
          <aside className="relative h-full w-[min(360px,90vw)] overflow-y-auto border-r border-border bg-background shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-5 backdrop-blur-xl">
              <Link to="/" onClick={() => setOpen(false)} className="font-display text-xl font-bold uppercase tracking-tighter">
                fitme<span className="text-[var(--brand-lime)]">.pro</span>
              </Link>
              <button aria-label="Close navigation" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center border border-border hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]">
                <X size={18} />
              </button>
            </div>

            <nav className="p-4">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className={`mb-5 flex items-center gap-3 px-3 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === "/" ? "bg-muted text-[var(--brand-lime)]" : ""}`}
              >
                <House size={18} weight="duotone" />
                Dashboard
              </Link>

              <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">
                All 40 Calculators
              </div>

              <div className="space-y-1">
                {calculators.map(([to, label], index) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === to ? "bg-muted font-bold text-[var(--brand-lime)]" : ""}`}
                  >
                    <span className="w-6 shrink-0 font-mono-data text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    <Calculator size={16} weight="duotone" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>

              <div className="my-5 border-t border-border" />
              <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Information</div>
              <div className="space-y-1">
                {information.map(([to, label, Icon]) => (
                  <Link key={to} to={to} onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-[var(--brand-lime)]">
                    <Icon size={16} weight="duotone" />
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
