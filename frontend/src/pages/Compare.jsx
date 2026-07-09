import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, TrendUp } from "@phosphor-icons/react";
import { useMeasurements } from "@/context/MeasurementContext";
import { computeAll } from "@/hooks/useAllResults";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import Sparkline from "@/components/viz/Sparkline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Metrics tracked on the trend section. Order matters for the grid.
const TREND_METRICS = [
  { id: "weight-raw",  label: "Weight",          extract: (state) => parseFloat(state.weight),        color: "#CCFF00", unit: (u) => u === "imperial" ? " lb" : " kg" },
  { id: "waist-raw",   label: "Waist",           extract: (state) => parseFloat(state.waist),         color: "#F97316", unit: (u) => u === "imperial" ? " in" : " cm" },
  { id: "bmi",         label: "BMI",             color: "#3B82F6", unit: () => "" },
  { id: "body-fat",    label: "Body Fat",        color: "#EC4899", unit: () => "%" },
  { id: "navy-body-fat", label: "Navy BF",       color: "#EC4899", unit: () => "%" },
  { id: "waist-hip-ratio",    label: "W/Hip",    color: "#EAB308", unit: () => "" },
  { id: "waist-height-ratio", label: "W/Height", color: "#EAB308", unit: () => "" },
  { id: "ffmi",        label: "FFMI",            color: "#22D3EE", unit: () => "" },
  { id: "tdee",        label: "TDEE",            color: "#F97316", unit: () => " kcal" },
];

const RANGE_OPTIONS = [
  { key: "7",  label: "7 days" },
  { key: "30", label: "30 days" },
  { key: "90", label: "90 days" },
  { key: "all", label: "All" },
];

function withinRange(iso, days) {
  if (days === "all") return true;
  const d = new Date(iso).getTime();
  const cutoff = Date.now() - Number(days) * 24 * 60 * 60 * 1000;
  return d >= cutoff;
}

export default function Compare() {
  const { snapshots, state } = useMeasurements();
  const options = useMemo(
    () => [{ id: "__current__", name: "Current (live)", state }, ...snapshots],
    [snapshots, state]
  );

  const [aId, setAId] = useState(options[0]?.id || "__current__");
  const [bId, setBId] = useState(options[1]?.id || options[0]?.id || "__current__");
  const [range, setRange] = useState("30");

  useEffect(() => { document.title = "Compare Snapshots · Fitme Pro"; }, []);

  const a = options.find((o) => o.id === aId) || options[0];
  const b = options.find((o) => o.id === bId) || options[0];

  const resA = useMemo(() => computeAll(a?.state || state), [a, state]);
  const resB = useMemo(() => computeAll(b?.state || state), [b, state]);

  // Build combined timeline of snapshots + current state, filtered by range
  const timeline = useMemo(() => {
    const items = snapshots.map((s) => ({ date: s.createdAt, state: s.state }));
    // Add current as "now"
    items.push({ date: new Date().toISOString(), state, isCurrent: true });
    return items.filter((it) => withinRange(it.date, range));
  }, [snapshots, state, range]);

  // For each metric, project points across the timeline
  const metricSeries = useMemo(() => {
    return TREND_METRICS.map((m) => {
      const points = timeline.map((it) => {
        let value;
        if (m.extract) {
          value = m.extract(it.state);
        } else {
          const all = computeAll(it.state);
          value = all[m.id]?.result?.raw;
        }
        return { date: it.date, value };
      }).filter((p) => Number.isFinite(p.value));
      return { ...m, points, unitStr: m.unit(state.unit) };
    });
  }, [timeline, state.unit]);

  const nonEmpty = metricSeries.filter((m) => m.points.length > 0);
  const emptyTrends = timeline.length <= 1;

  return (
    <div data-testid="compare-root" className="min-h-screen">
      <section className="border-b border-border px-6 sm:px-10 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-[var(--brand-lime)] mb-6"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter">
          Compare <span className="text-[var(--brand-lime)]">Snapshots</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          See how your body has changed. Track trends over time and compare any two snapshots side by side.
        </p>
      </section>

      {/* ---------- TRENDS ---------- */}
      <section className="px-6 sm:px-10 py-10 border-b border-border" data-testid="compare-trends">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-[var(--brand-lime)]" />
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tighter flex items-center gap-2">
              <TrendUp size={22} weight="duotone" className="text-[var(--brand-lime)]" />
              Trends
            </h2>
            <span className="font-mono-data text-xs text-muted-foreground">
              {timeline.length} point{timeline.length === 1 ? "" : "s"} in range
            </span>
          </div>
          <div data-testid="compare-range-toggle" className="flex border border-border overflow-hidden text-[10px] uppercase font-bold tracking-[0.2em]">
            {RANGE_OPTIONS.map((r) => (
              <button
                key={r.key}
                data-testid={`compare-range-${r.key}`}
                onClick={() => setRange(r.key)}
                aria-pressed={range === r.key}
                className={`px-3 py-1.5 transition-colors ${range === r.key ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {emptyTrends ? (
          <div className="border border-dashed border-border p-8 text-center text-sm text-muted-foreground max-w-2xl">
            Not enough data yet. Save at least two snapshots (from the Actions menu on the dashboard) to unlock trend lines.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {nonEmpty.map((m) => (
              <div
                key={m.id}
                data-testid={`trend-${m.id}`}
                className="border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2" style={{ background: m.color }} />
                    <span className="text-xs uppercase tracking-widest font-bold">{m.label}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono-data">
                    {m.points.length} pts
                  </span>
                </div>
                <Sparkline
                  points={m.points}
                  color={m.color}
                  width={280}
                  height={56}
                  unit={m.unitStr}
                  gradientId={`grad-${m.id}`}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------- A vs B SELECTORS ---------- */}
      <section className="px-6 sm:px-10 py-8">
        <div className="flex flex-wrap items-baseline gap-3 mb-4">
          <div className="h-3 w-3 bg-[#3B82F6]" />
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tighter">A vs B</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">Snapshot A</div>
            <Select value={aId} onValueChange={setAId}>
              <SelectTrigger data-testid="compare-select-a" className="rounded-none border-2 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {options.map((o) => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">Snapshot B</div>
            <Select value={bId} onValueChange={setBId}>
              <SelectTrigger data-testid="compare-select-b" className="rounded-none border-2 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {options.map((o) => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="p-3 text-[10px] uppercase tracking-widest font-bold">Metric</th>
                <th className="p-3 text-[10px] uppercase tracking-widest font-bold">A</th>
                <th className="p-3 text-[10px] uppercase tracking-widest font-bold">B</th>
                <th className="p-3 text-[10px] uppercase tracking-widest font-bold">Δ</th>
              </tr>
            </thead>
            <tbody>
              {CALCULATORS.map((c) => {
                const rA = resA[c.id];
                const rB = resB[c.id];
                const nA = num(rA?.result?.raw);
                const nB = num(rB?.result?.raw);
                const delta = (Number.isFinite(nA) && Number.isFinite(nB)) ? nB - nA : null;
                const cat = CATEGORIES[c.category];
                return (
                  <tr key={c.id} className="border-t border-border" data-testid={`compare-row-${c.id}`}>
                    <td className="p-3 flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0" style={{ background: cat.color }} />
                      <span className="truncate">{c.name}</span>
                    </td>
                    <td className="p-3 font-mono-data">{rA?.ready ? formatOut(rA.result) : "—"}</td>
                    <td className="p-3 font-mono-data">{rB?.ready ? formatOut(rB.result) : "—"}</td>
                    <td className="p-3 font-mono-data">
                      {delta == null ? "—" : (
                        <span className={delta === 0 ? "text-muted-foreground" : (delta > 0 ? "text-orange-400" : "text-[var(--brand-lime)]")}>
                          {delta > 0 ? "+" : ""}{delta.toFixed(2)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {snapshots.length === 0 && (
          <div className="mt-6 border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No snapshots saved yet. Save one from the header menu.
            <Link to="/" className="ml-2 text-[var(--brand-lime)] font-bold uppercase text-xs inline-flex items-center gap-1">
              Go to dashboard <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function num(v) { return typeof v === "number" ? v : parseFloat(v); }
function formatOut(r) {
  if (!r) return "—";
  const val = r.value ?? "—";
  return `${val}${r.unit ? " " + r.unit : ""}`;
}
