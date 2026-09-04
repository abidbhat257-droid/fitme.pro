import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Camera, CheckCircle, Minus, Target, TrendDown, TrendUp, XCircle } from "@phosphor-icons/react";
import { useMeasurements } from "@/context/MeasurementContext";
import { computeAll } from "@/hooks/useAllResults";
import { CALCULATORS } from "@/lib/calculators";
import { SPECIALIZED_CALCULATORS, computeSpecialized } from "@/lib/specializedCalculators";
import SnapshotDialog from "@/components/SnapshotDialog";

const REFS = {
  bmi: { min: 18.5, max: 24.9, label: "Healthy range", unit: "kg/m²" },
  "bmi-prime": { min: 0.74, max: 1, label: "Reference range", unit: "" },
  "body-fat": { male: [10, 20], female: [18, 28], label: "Reference range", unit: "%" },
  "navy-body-fat": { male: [10, 20], female: [18, 28], label: "Reference range", unit: "%" },
  "relative-fat-mass": { male: [10, 20], female: [18, 28], label: "Reference range", unit: "%" },
  "waist-hip-ratio": { male: [0.80, 0.90], female: [0.70, 0.80], label: "Reference range", unit: "" },
  "waist-height-ratio": { min: 0.40, max: 0.50, label: "Reference range", unit: "" },
  ffmi: { male: [18, 22], female: [15, 19], label: "Reference range", unit: "" },
  bri: { min: 2, max: 4.5, label: "Reference range", unit: "" },
};

const TRACKED = [
  "bmi", "bmi-prime", "healthy-weight-range", "ideal-body-weight", "body-fat", "navy-body-fat",
  "relative-fat-mass", "body-adiposity-index", "lean-body-mass", "fat-mass", "fat-free-mass", "ffmi",
  "waist-hip-ratio", "waist-height-ratio", "absi", "bri", "conicity-index", "body-frame-size", "bmr",
  "tdee", "daily-calorie-needs", "calorie-deficit", "calorie-surplus", "body-surface-area", "ponderal-index",
  "adjusted-body-weight", "body-density", "obesity-class", "target-weight-bmi", "body-fat-category",
  "total-body-water", "waist-circumference-risk", "target-waist", "harris-benedict-bmr", "katch-mcardle-bmr",
  "protein-intake", "maximum-heart-rate", "target-heart-rate", "calorie-calculator", "macro-calculator",
  "protein-calculator", "calories-burned-calculator", "pace-calculator", "carbohydrate-calculator",
  "fat-intake-calculator", "one-rep-max-calculator", "army-body-fat-calculator",
];

function numeric(result) {
  if (!result) return NaN;
  if (Number.isFinite(result.raw)) return result.raw;
  const n = parseFloat(String(result.value ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : NaN;
}
function referenceFor(id, state) {
  const r = REFS[id];
  if (!r) return null;
  if (r.male || r.female) {
    const pair = state.sex === "female" ? r.female : r.male;
    return { min: pair[0], max: pair[1], label: r.label, unit: r.unit };
  }
  return r;
}
function metricStatus(value, ref) {
  if (!Number.isFinite(value) || !ref) return "tracked";
  if (value < ref.min) return "below";
  if (value > ref.max) return "above";
  return "in-range";
}
function statusMeta(status) {
  if (status === "in-range") return { label: "In reference", Icon: CheckCircle, cls: "text-emerald-500" };
  if (status === "below") return { label: "Below", Icon: ArrowDown, cls: "text-yellow-500" };
  if (status === "above") return { label: "Above", Icon: ArrowUp, cls: "text-red-500" };
  return { label: "Tracked", Icon: Target, cls: "text-muted-foreground" };
}
function pretty(id) {
  const c = CALCULATORS.find((x) => x.id === id) || SPECIALIZED_CALCULATORS.find((x) => x.id === id);
  if (c) return c.name.replace(/ Calculator$/, "");
  return id.replace(/-/g, " ").replace(/\b\w/g, (x) => x.toUpperCase());
}
function displayValue(result) {
  if (!result) return "—";
  return `${result.value ?? "—"}${result.unit ? ` ${result.unit}` : ""}`;
}

export default function BodyProfileTracker({ currentResults = {} }) {
  const { state, snapshots } = useMeasurements();
  const [selected, setSelected] = useState("bmi");

  const current = useMemo(() => {
    const specialized = {};
    for (const c of SPECIALIZED_CALCULATORS) {
      const r = computeSpecialized(c.id, state);
      if (r) specialized[c.id] = { ready: true, result: r };
    }
    return { ...currentResults, ...specialized };
  }, [currentResults, state]);

  const history = useMemo(() => snapshots.map((snap) => {
    const integrated = computeAll(snap.state || {});
    const specialized = {};
    for (const c of SPECIALIZED_CALCULATORS) {
      const r = computeSpecialized(c.id, snap.state || {});
      if (r) specialized[c.id] = { ready: true, result: r };
    }
    return { ...snap, results: { ...integrated, ...specialized } };
  }), [snapshots]);

  const rows = useMemo(() => TRACKED.map((id) => {
    const result = current[id]?.result;
    const value = numeric(result);
    const ref = referenceFor(id, state);
    const previous = history.length ? numeric(history[0].results?.[id]?.result) : NaN;
    const delta = Number.isFinite(value) && Number.isFinite(previous) ? value - previous : NaN;
    return { id, label: pretty(id), result, value, ref, status: metricStatus(value, ref), delta };
  }).filter((x) => x.result && Number.isFinite(x.value)), [current, history, state]);

  const selectedRow = rows.find((x) => x.id === selected) || rows[0];
  const inRange = rows.filter((r) => r.status === "in-range").length;
  const referenced = rows.filter((r) => r.ref).length;
  const improved = rows.filter((r) => Number.isFinite(r.delta) && ((r.delta < 0 && ["bmi", "body-fat", "navy-body-fat", "relative-fat-mass", "waist-hip-ratio", "waist-height-ratio", "bri"].includes(r.id)) || (r.delta > 0 && ["ffmi", "lean-body-mass"].includes(r.id)))).length;
  const selectedMeta = selectedRow ? statusMeta(selectedRow.status) : null;

  return (
    <section className="border-y border-border bg-card/20" data-testid="body-profile-tracker">
      <div className="px-6 py-8 sm:px-10 lg:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--brand-lime)]"><Target size={15} weight="fill" /> Body Profile Intelligence</div>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-tighter sm:text-4xl">Track. Compare. Improve.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Your saved measurement snapshots are recalculated across the profile. Each available metric shows its current result, change from the latest saved snapshot, and a reference range when a meaningful reference exists.</p>
          </div>
          <SnapshotDialog trigger={<button className="inline-flex shrink-0 items-center justify-center gap-2 border-2 border-[var(--brand-lime)] bg-[var(--brand-lime)] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-black hover:bg-white"><Camera size={16} weight="bold" /> Save profile snapshot</button>} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background/60 p-3"><div className="text-[9px] uppercase tracking-widest text-muted-foreground">Tracked now</div><b className="mt-1 block font-mono-data text-xl">{rows.length}</b><span className="text-[9px] text-muted-foreground">of 48 calculators</span></div>
          <div className="border border-border bg-background/60 p-3"><div className="text-[9px] uppercase tracking-widest text-muted-foreground">In reference</div><b className="mt-1 block font-mono-data text-xl text-emerald-500">{inRange}</b><span className="text-[9px] text-muted-foreground">of {referenced} reference metrics</span></div>
          <div className="border border-border bg-background/60 p-3"><div className="text-[9px] uppercase tracking-widest text-muted-foreground">Snapshots</div><b className="mt-1 block font-mono-data text-xl">{snapshots.length}</b><span className="text-[9px] text-muted-foreground">saved locally</span></div>
          <div className="border border-border bg-background/60 p-3"><div className="text-[9px] uppercase tracking-widest text-muted-foreground">Positive changes</div><b className="mt-1 block font-mono-data text-xl">{improved}</b><span className="text-[9px] text-muted-foreground">vs latest snapshot</span></div>
        </div>

        {rows.length > 0 && (
          <>
            <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border border-border bg-background/50 p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between"><div><div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Metric comparison</div><div className="mt-1 text-sm font-bold">Current vs reference vs last snapshot</div></div><div className="font-mono-data text-[10px] text-muted-foreground">{history.length ? "HISTORY ON" : "SAVE A SNAPSHOT"}</div></div>
                <div className="flex flex-wrap gap-1.5">{rows.map((r) => <button key={r.id} onClick={() => setSelected(r.id)} className={`border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${selectedRow?.id === r.id ? "border-[var(--brand-lime)] bg-[var(--brand-lime)] text-black" : "border-border hover:border-[var(--brand-lime)]"}`}>{r.label}</button>)}</div>
                {selectedRow && <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="border border-border p-4"><div className="text-[9px] uppercase tracking-widest text-muted-foreground">Current</div><div className={`mt-2 font-mono-data text-2xl font-black ${selectedMeta?.cls || "text-foreground"}`}>{displayValue(selectedRow.result)}</div></div>
                  <div className="border border-border p-4"><div className="text-[9px] uppercase tracking-widest text-muted-foreground">Reference</div><div className="mt-2 font-mono-data text-xl font-black">{selectedRow.ref ? `${selectedRow.ref.min}–${selectedRow.ref.max}${selectedRow.ref.unit ? ` ${selectedRow.ref.unit}` : ""}` : "No fixed ideal"}</div><div className="mt-1 text-[9px] text-muted-foreground">{selectedRow.ref?.label || "This result is tracked, not judged against an arbitrary ideal."}</div></div>
                  <div className="border border-border p-4"><div className="text-[9px] uppercase tracking-widest text-muted-foreground">Change</div><div className="mt-2 flex items-center gap-2 font-mono-data text-xl font-black">{Number.isFinite(selectedRow.delta) ? <>{selectedRow.delta > 0 ? <TrendUp size={20} /> : selectedRow.delta < 0 ? <TrendDown size={20} /> : <Minus size={20} />}{selectedRow.delta > 0 ? "+" : ""}{selectedRow.delta.toFixed(2)}</> : "—"}</div><div className="mt-1 text-[9px] text-muted-foreground">from latest saved snapshot</div></div>
                </div>}
              </div>

              <div className="border border-border bg-background/50 p-4 sm:p-5">
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Profile history</div>
                <div className="mt-3 space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {history.length === 0 ? <div className="border border-dashed border-border p-6 text-center text-xs text-muted-foreground">Save your first snapshot to start a personal timeline.</div> : history.slice(0, 12).map((snap) => {
                    const r = snap.results?.[selectedRow?.id]?.result;
                    return <div key={snap.id} className="flex items-center justify-between gap-3 border border-border p-3"><div className="min-w-0"><div className="truncate text-xs font-bold">{snap.name}</div><div className="mt-1 text-[9px] uppercase tracking-widest text-muted-foreground">{new Date(snap.createdAt).toLocaleString()}</div></div><div className="shrink-0 text-right font-mono-data text-sm font-bold">{displayValue(r)}</div></div>;
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto border border-border">
              <table className="w-full min-w-[760px] text-left">
                <thead><tr className="border-b border-border bg-background"><th className="p-3 text-[9px] uppercase tracking-widest text-muted-foreground">Metric</th><th className="p-3 text-[9px] uppercase tracking-widest text-muted-foreground">Current</th><th className="p-3 text-[9px] uppercase tracking-widest text-muted-foreground">Reference / ideal</th><th className="p-3 text-[9px] uppercase tracking-widest text-muted-foreground">Change</th><th className="p-3 text-[9px] uppercase tracking-widest text-muted-foreground">Status</th></tr></thead>
                <tbody>{rows.map((r) => { const meta = statusMeta(r.status); return <tr key={r.id} className="border-b border-border last:border-0 hover:bg-card/50"><td className="p-3 text-xs font-bold">{r.label}</td><td className={`p-3 font-mono-data text-sm font-bold ${meta.cls}`}>{displayValue(r.result)}</td><td className="p-3 font-mono-data text-xs">{r.ref ? `${r.ref.min}–${r.ref.max}${r.ref.unit ? ` ${r.ref.unit}` : ""}` : <span className="text-muted-foreground">Tracked only</span>}</td><td className="p-3 font-mono-data text-xs">{Number.isFinite(r.delta) ? `${r.delta > 0 ? "+" : ""}${r.delta.toFixed(2)}` : "—"}</td><td className={`p-3 text-[9px] font-bold uppercase tracking-widest ${meta.cls}`}><meta.Icon size={13} className="mr-1 inline" />{meta.label}</td></tr>; })}</tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start gap-2 text-[9px] leading-relaxed text-muted-foreground"><XCircle size={14} className="mt-0.5 shrink-0" /> Reference ranges are informational, not diagnoses. Metrics such as BMR, TDEE and calorie estimates do not have a single universal “ideal”; FitMe Pro tracks them without forcing an arbitrary target.</div>
          </>
        )}
      </div>
    </section>
  );
}
