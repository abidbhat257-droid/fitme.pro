import React, { useMemo, useState, useEffect } from "react";
import MeasurementPanel from "@/components/MeasurementPanel";
import ResultCard from "@/components/ResultCard";
import RadarProfile from "@/components/viz/RadarProfile";
import GoalsWidget from "@/components/GoalsWidget";
import { CALCULATORS, CALCULATORS_BY_CATEGORY } from "@/lib/calculators";
import { useAllResults } from "@/hooks/useAllResults";
import { useMeasurements } from "@/context/MeasurementContext";
import { DASH } from "@/constants/testIds";
import { MagnifyingGlass, Lightning } from "@phosphor-icons/react";

export default function Dashboard() {
  const { state } = useMeasurements();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => {
    document.title = "Fitme Pro — 30 Health & Body Composition Calculators";
  }, []);

  // Precompute all results via shared hook (used across Dashboard, Compare)
  const results = useAllResults(state);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CALCULATORS_BY_CATEGORY
      .filter((cat) => activeCat === "all" || activeCat === cat.key)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((c) => !q || c.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, activeCat]);

  const readyCount = Object.values(results).filter((r) => r.ready).length;

  // Radar body profile axes (6 metrics). Uses raw values from results when available.
  const isMale = state.sex === "male";
  const radarAxes = useMemo(() => [
    { key: "bmi",  label: "BMI",      value: results["bmi"]?.result?.raw,               min: 15,   max: 40,  ideal: 22 },
    { key: "bf",   label: "Body Fat", value: results["navy-body-fat"]?.result?.raw ?? results["body-fat"]?.result?.raw, min: 5, max: 40, ideal: isMale ? 15 : 22 },
    { key: "whtr", label: "W/Height", value: results["waist-height-ratio"]?.result?.raw, min: 0.3, max: 0.7, ideal: 0.45 },
    { key: "whr",  label: "W/Hip",    value: results["waist-hip-ratio"]?.result?.raw,    min: 0.6, max: 1.1, ideal: isMale ? 0.85 : 0.75 },
    { key: "ffmi", label: "FFMI",     value: results["ffmi"]?.result?.raw,               min: 14,  max: 25,  ideal: isMale ? 22 : 18 },
    { key: "bri",  label: "BRI",      value: results["bri"]?.result?.raw,                min: 2,   max: 8,   ideal: 3.4 },
  ], [results, isMale]);

  const radarReady = radarAxes.filter((a) => Number.isFinite(a.value)).length >= 4;

  return (
    <div data-testid={DASH.root} className="flex flex-col lg:flex-row min-h-screen">
      <MeasurementPanel />

      <main className="flex-1 min-w-0">
        {/* HERO */}
        <section className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, #CCFF00 0%, transparent 40%), radial-gradient(circle at 80% 70%, #3B82F6 0%, transparent 40%)",
          }} />
          <div className="relative px-6 sm:px-10 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)] mb-4">
                <Lightning size={14} weight="fill" /> Instant · Private · Ad-free
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.95]">
                30 Body <span className="text-[var(--brand-lime)]">Calculators.</span>
                <br />
                One Entry.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Enter your measurements once — get BMI, body fat, TDEE, obesity risk, and 26 more insights,
                recalculated the moment you type.
              </p>
              <div className="mt-6 inline-flex items-center gap-4 font-mono-data text-sm border border-border px-4 py-2">
                <span className="text-[var(--brand-lime)] text-lg">{readyCount}</span>
                <span className="text-muted-foreground">/ {CALCULATORS.length} unlocked</span>
              </div>
            </div>

            {/* Body Profile Radar */}
            <div className="lg:col-span-5" data-testid="dash-radar-profile">
              {radarReady ? (
                <div className="border border-border bg-card/60 p-5 sm:p-6 backdrop-blur-sm">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">
                      ── Your Body Profile
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                      6-metric radar
                    </div>
                  </div>
                  <RadarProfile axes={radarAxes} />
                </div>
              ) : (
                <div className="border border-dashed border-border p-6 sm:p-8 text-center bg-card/30">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Body Profile</div>
                  <p className="text-sm mt-2 text-muted-foreground leading-relaxed">
                    Fill height, weight, waist, hip &amp; neck to unlock your radar profile — a 6-axis snapshot of your body vs. ideal ranges.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* GOALS */}
        <GoalsWidget />

        {/* CONTROLS */}
        <section className="sticky top-[73px] lg:top-[73px] z-30 bg-background/90 backdrop-blur-xl border-b border-border no-print">
          <div className="px-6 sm:px-10 py-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="relative w-full sm:max-w-sm">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                data-testid={DASH.search}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators…"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-border bg-transparent focus:border-[var(--brand-lime)] focus:outline-none text-sm font-mono-data"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              {[{ key: "all", label: "All" }, ...CALCULATORS_BY_CATEGORY.map((c) => ({ key: c.key, label: c.label, color: c.color }))].map((c) => (
                <button
                  key={c.key}
                  data-testid={`dash-chip-${c.key}`}
                  onClick={() => setActiveCat(c.key)}
                  className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] border transition-colors ${activeCat === c.key ? "bg-[var(--brand-lime)] text-black border-[var(--brand-lime)]" : "border-border hover:border-[var(--brand-lime)]"}`}
                  style={activeCat !== c.key && c.color ? { borderLeftColor: c.color, borderLeftWidth: 3 } : {}}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CARDS */}
        <section className="px-6 sm:px-10 py-10 space-y-14 print-grid" data-testid={DASH.cardsGrid}>
          {filteredCategories.map((cat) => (
            <div key={cat.key} data-testid={DASH.category(cat.key)}>
              <div className="flex items-baseline gap-3 mb-6">
                <div className="h-3 w-3" style={{ background: cat.color }} />
                <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tighter">{cat.label}</h2>
                <span className="font-mono-data text-xs text-muted-foreground">{cat.items.length} calcs</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cat.items.map((c, i) => (
                  <ResultCard
                    key={c.id}
                    calc={c}
                    ready={results[c.id]?.ready}
                    result={results[c.id]?.result}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <div className="text-center text-muted-foreground py-20">
              No calculators match your search.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
