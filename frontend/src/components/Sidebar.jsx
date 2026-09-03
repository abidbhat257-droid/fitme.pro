import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { List, X, House, Calculator, Info, ShieldCheck, FileText, BookOpen, CaretDown, CaretRight } from "@phosphor-icons/react";
import { CALCULATORS } from "@/lib/calculators";
import { SPECIALIZED_CALCULATORS, computeSpecialized } from "@/lib/specializedCalculators";
import { JOURNAL_CATEGORIES } from "@/lib/journalContent";
import { useMeasurements } from "@/context/MeasurementContext";
import { toMetric } from "@/lib/units";

const information = [
  ["/about", "About FitMe Pro", Info],
  ["/contact", "Contact", Info],
  ["/privacy-policy", "Privacy Policy", ShieldCheck],
  ["/terms", "Terms & Conditions", FileText],
];

const CATEGORY_ORDER = [
  { key: "body", icon: "🧍", label: "Body Composition & Body Measurements" },
  { key: "weight", icon: "⚖️", label: "Weight, BMI & Weight Goals" },
  { key: "calories", icon: "🔥", label: "Calories & Metabolism" },
  { key: "nutrition", icon: "🍎", label: "Nutrition & Macronutrients" },
  { key: "running", icon: "🏃", label: "Running, Cardio & Endurance" },
  { key: "strength", icon: "💪", label: "Strength & Gym Performance" },
  { key: "heart", icon: "❤️", label: "Heart Rate & Cardiovascular Metrics" },
];

function getSidebarCategory(calc) {
  const id = String(calc.id || "").toLowerCase();
  const name = String(calc.name || "").toLowerCase();
  const source = String(calc.category || "").toLowerCase();
  const text = `${id} ${name}`;

  if (/heart|pulse|pressure|map|resting-heart|target-heart|heart-rate|rate-pressure/.test(text) || source.includes("heart")) return "heart";
  if (/1rm|one-rep|bench|squat|deadlift|rep-max|strength|wilks|dots|training-volume/.test(text) || source.includes("strength")) return "strength";
  if (/pace|running|speed|5k|10k|half-marathon|marathon|race|split|vo2|cardio|aerobic|anaerobic|fitness-age/.test(text) || source.includes("running")) return "running";
  if (/protein|macro|carbohydrate|carb|fat-intake|fiber|water-intake|sodium|caffeine|micronutrient|meal-macro|calorie-per-meal/.test(text) || source.includes("nutrition")) return "nutrition";
  if (/calorie|bmr|tdee|metabolism|maintenance|deficit|surplus|burned|exercise-calorie|walking-calorie|cycling-calorie|reverse-diet/.test(text) || source.includes("metabolism")) return "calories";
  if (/weight|bmi|obesity|goal|target-weight|healthy-weight|ideal-body-weight|adjusted-body-weight/.test(text)) return "weight";
  return "body";
}

const allCalculators = (() => {
  const raw = [
    ...CALCULATORS.map((c) => ({ ...c, href: `/${c.slug}-calculator`, source: "core" })),
    ...SPECIALIZED_CALCULATORS.map((c) => ({ ...c, href: `/${c.slug}`, source: "specialized" })),
  ];
  return Array.from(new Map(raw.map((c) => [c.id, c])).values());
})();

function resultTone(result) {
  if (!result) return "neutral";
  if (result.tone === "bad") return "bad";
  if (result.tone === "warn") return "warn";
  if (result.tone === "good") return "good";
  return "neutral";
}

function ResultBadge({ result }) {
  if (!result || result.value == null || result.value === "") {
    return <span className="ml-auto shrink-0 font-mono-data text-[10px] text-muted-foreground">—</span>;
  }
  const tone = resultTone(result);
  const toneClass = {
    good: "text-emerald-500",
    warn: "text-yellow-500",
    bad: "text-red-500",
    neutral: "text-muted-foreground",
  }[tone];
  const value = String(result.value);
  const unit = result.unit ? ` ${result.unit}` : "";
  return (
    <span className={`ml-auto max-w-[145px] shrink-0 truncate text-right font-mono-data text-[10px] font-bold ${toneClass}`} title={`${value}${unit}`}>
      {value}{unit}
    </span>
  );
}

function getResult(calc, state) {
  try {
    const metric = toMetric(state);
    const requirements = calc.requires || [];
    const ready = requirements.every((r) => {
      if (r === "sex") return metric.sex === "male" || metric.sex === "female";
      if (r === "activity") return !!metric.activity;
      if (r === "age") return Number(metric.age) > 0;
      if (r === "height") return Number(metric.heightCm) > 0;
      if (r === "weight") return Number(metric.weightKg) > 0;
      if (r === "waist") return Number(metric.waistCm) > 0;
      if (r === "neck") return Number(metric.neckCm) > 0;
      return true;
    });
    if (!ready) return null;
    if (calc.source === "specialized") return computeSpecialized(calc.id, state);
    return typeof calc.compute === "function" ? calc.compute(state) : null;
  } catch {
    return null;
  }
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(true);
  const [expanded, setExpanded] = useState(() => new Set(["body"]));
  const location = useLocation();
  const { state } = useMeasurements();
  const close = () => setOpen(false);
  const journalActive = location.pathname === "/journal" || location.pathname.startsWith("/journal/");

  const grouped = useMemo(() => {
    const groups = Object.fromEntries(CATEGORY_ORDER.map((c) => [c.key, []]));
    allCalculators.forEach((calc) => groups[getSidebarCategory(calc)].push(calc));
    return groups;
  }, []);

  const results = useMemo(() => {
    const map = {};
    allCalculators.forEach((calc) => { map[calc.id] = getResult(calc, state); });
    return map;
  }, [state]);

  const toggleCategory = (key) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const ui = (
    <>
      <button type="button" aria-label="Open all FitMe Pro calculators" aria-expanded={open} onClick={() => setOpen(true)} className="no-print fixed left-3 top-3 z-[9999] grid h-11 w-11 place-items-center rounded-md border border-border bg-background text-foreground shadow-2xl backdrop-blur-xl transition-colors hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]">
        <List size={23} weight="bold" />
      </button>

      {open && (
        <div className="no-print fixed inset-0 z-[10000]">
          <button aria-label="Close navigation" onClick={close} className="absolute inset-0 bg-black/60" />
          <aside className="relative flex h-full w-[min(460px,96vw)] flex-col overflow-hidden border-r border-border bg-background shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-background px-5 py-4">
              <div>
                <div className="font-display text-xl font-bold uppercase tracking-tighter">fitme<span className="text-[var(--brand-lime)]">.pro</span></div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">100 calculators · live results</div>
              </div>
              <button aria-label="Close navigation" onClick={close} className="grid h-9 w-9 place-items-center rounded-md border border-border hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]"><X size={18} /></button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto p-4">
              <Link to="/" onClick={close} className={`mb-3 flex items-center gap-3 rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wider hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === "/" ? "bg-muted text-[var(--brand-lime)]" : ""}`}>
                <House size={18} weight="duotone" /> Dashboard
              </Link>

              <div className="mb-3">
                <button type="button" onClick={() => setJournalOpen((v) => !v)} aria-expanded={journalOpen} className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wider hover:bg-muted hover:text-[var(--brand-lime)] ${journalActive ? "bg-muted text-[var(--brand-lime)]" : ""}`}>
                  {journalOpen ? <CaretDown size={16} weight="bold" /> : <CaretRight size={16} weight="bold" />}
                  <BookOpen size={18} weight="duotone" /><span className="flex-1 text-left">Journal</span>
                </button>
                {journalOpen && (
                  <div className="mt-1 ml-5 space-y-0.5 border-l border-border pl-3">
                    <Link to="/journal" onClick={close} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-[var(--brand-lime)]">Journal Home</Link>
                    {JOURNAL_CATEGORIES.map((c) => {
                      const href = `/journal/${c.slug}`;
                      const active = location.pathname === href || location.pathname.startsWith(`${href}/`);
                      return <Link key={c.slug} to={href} onClick={close} className={`block rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-[var(--brand-lime)] ${active ? "font-bold text-[var(--brand-lime)]" : ""}`}>{c.name}</Link>;
                    })}
                    <Link to="/journal/evidence-sources" onClick={close} className="block rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-[var(--brand-lime)]">Evidence Sources</Link>
                    <Link to="/journal/editorial-standards" onClick={close} className="block rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-[var(--brand-lime)]">Editorial Standards</Link>
                  </div>
                )}
              </div>

              <div className="my-5 flex items-center justify-between border-y border-border px-3 py-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">All 100 Calculators</span>
                <span className="font-mono-data text-[10px] text-muted-foreground">{allCalculators.length}</span>
              </div>

              <div className="mb-3 rounded-lg border border-border bg-muted/20 px-3 py-2.5">
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Result colors</div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-semibold uppercase tracking-wider">
                  <span className="text-emerald-500">● Ideal</span>
                  <span className="text-yellow-500">● Below ideal</span>
                  <span className="text-red-500">● Excess / high</span>
                </div>
              </div>

              <div className="space-y-2">
                {CATEGORY_ORDER.map((category, categoryIndex) => {
                  const items = grouped[category.key];
                  const isOpen = expanded.has(category.key);
                  return (
                    <section key={category.key} className="overflow-hidden rounded-lg border border-border bg-background">
                      <button type="button" onClick={() => toggleCategory(category.key)} aria-expanded={isOpen} className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-muted ${isOpen ? "bg-muted/50" : ""}`}>
                        <span className="text-base leading-none">{category.icon}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[10px] font-bold uppercase tracking-[0.11em] text-foreground">{category.label}</span>
                          <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{items.length} calculators</span>
                        </span>
                        <span className="font-mono-data text-[10px] text-muted-foreground">{String(categoryIndex + 1).padStart(2, "0")}</span>
                        {isOpen ? <CaretDown size={16} weight="bold" /> : <CaretRight size={16} weight="bold" />}
                      </button>

                      {isOpen && (
                        <div className="border-t border-border px-2 py-2">
                          {items.map((calc, index) => {
                            const href = calc.href;
                            return (
                              <Link key={calc.id} to={href} onClick={close} className={`flex min-w-0 items-center gap-2 rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-muted hover:text-[var(--brand-lime)] ${location.pathname === href ? "bg-muted font-bold text-[var(--brand-lime)]" : ""}`}>
                                <span className="w-7 shrink-0 text-right font-mono-data text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                                <Calculator size={15} weight="duotone" className="shrink-0" />
                                <span className="min-w-0 flex-1 truncate">{calc.name.replace(/ Calculator$/, "")}</span>
                                <ResultBadge result={results[calc.id]} />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>

              <div className="my-6 border-t border-border" />
              <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Information</div>
              <div className="space-y-0.5">
                {information.map(([to, label, Icon]) => <Link key={to} to={to} onClick={close} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted hover:text-[var(--brand-lime)]"><Icon size={16} weight="duotone" />{label}</Link>)}
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );

  return typeof document === "undefined" ? null : createPortal(ui, document.body);
}
