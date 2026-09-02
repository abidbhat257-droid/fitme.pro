import React, { useMemo, useState } from "react";
import { ChartLineUp, Camera, CheckCircle, TrendDown, TrendUp, Target } from "@phosphor-icons/react";
import { useMeasurements } from "@/context/MeasurementContext";
import { computeAll } from "@/hooks/useAllResults";
import SnapshotDialog from "@/components/SnapshotDialog";

const METRICS = [
  ["bmi", "BMI", 18.5, 24.9],
  ["body-fat", "Body Fat", 10, 20],
  ["waist-height-ratio", "Waist / Height", 0.4, 0.5],
  ["waist-hip-ratio", "Waist / Hip", 0.8, 0.9],
  ["ffmi", "FFMI", 18, 22],
];

function num(x) {
  if (Number.isFinite(x?.raw)) return x.raw;
  const n = parseFloat(String(x?.value ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

export default function BodyProfileSidebar() {
  const { state, snapshots } = useMeasurements();
  const [showHistory, setShowHistory] = useState(false);
  const current = useMemo(() => computeAll(state), [state]);
  const previous = snapshots[0] ? computeAll(snapshots[0].state || {}) : {};

  const rows = useMemo(() => METRICS.map(([id, label, min, max]) => {
    const value = num(current[id]?.result);
    const old = num(previous[id]?.result);
    const delta = Number.isFinite(value) && Number.isFinite(old) ? value - old : NaN;
    const inRange = Number.isFinite(value) && value >= min && value <= max;
    return { id, label, value, delta, inRange, min, max };
  }).filter((r) => Number.isFinite(r.value)), [current, previous]);

  const good = rows.filter((r) => r.inRange).length;
  const improved = rows.filter((r) => Number.isFinite(r.delta) && ((["bmi", "body-fat", "waist-height-ratio", "waist-hip-ratio"].includes(r.id) && r.delta < 0) || (r.id === "ffmi" && r.delta > 0))).length;

  return (
    <div className="mt-5 border-t border-border pt-5" data-testid="sidebar-body-profile">
      <div className="flex items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--brand-lime)]"><Target size={15} weight="fill" /> Body Profile</div>
      <p className="mt-2 px-3 text-[10px] leading-relaxed text-muted-foreground">Track your results, compare them with reference ranges, and monitor improvement over time.</p>

      <div className="mt-3 grid grid-cols-3 gap-1.5 px-3">
        <div className="border border-border p-2"><div className="text-[8px] uppercase tracking-widest text-muted-foreground">Tracked</div><b className="font-mono-data text-sm">{rows.length}</b></div>
        <div className="border border-border p-2"><div className="text-[8px] uppercase tracking-widest text-muted-foreground">In range</div><b className="font-mono-data text-sm text-emerald-500">{good}</b></div>
        <div className="border border-border p-2"><div className="text-[8px] uppercase tracking-widest text-muted-foreground">Improved</div><b className="font-mono-data text-sm">{improved}</b></div>
      </div>

      <div className="mt-3 space-y-1 px-3">
        {rows.map((r) => <div key={r.id} className="flex items-center justify-between gap-2 border border-border px-2.5 py-2">
          <span className="truncate text-[10px] font-bold">{r.label}</span>
          <span className="shrink-0 font-mono-data text-[10px]">{r.value.toFixed(2)}</span>
          {Number.isFinite(r.delta) ? (r.delta < 0 ? <TrendDown size={12} className="shrink-0 text-emerald-500" /> : r.delta > 0 ? <TrendUp size={12} className="shrink-0 text-amber-500" /> : <CheckCircle size={12} className="shrink-0 text-muted-foreground" />) : null}
        </div>)}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 px-3">
        <SnapshotDialog trigger={<button className="flex min-w-0 items-center justify-center gap-1 border border-[var(--brand-lime)] bg-[var(--brand-lime)] px-2 py-2 text-[9px] font-bold uppercase tracking-wider text-black"><Camera size={13} /> Save</button>} />
        <button onClick={() => setShowHistory((v) => !v)} className="flex min-w-0 items-center justify-center gap-1 border border-border px-2 py-2 text-[9px] font-bold uppercase tracking-wider hover:border-[var(--brand-lime)]"><ChartLineUp size={13} /> Compare</button>
      </div>

      {showHistory && <div className="mt-3 mx-3 border border-border bg-card/50 p-3">
        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Saved timeline</div>
        {snapshots.length === 0 ? <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">No snapshots yet. Save your first profile to start tracking.</p> : <div className="mt-2 space-y-2">{snapshots.slice(0, 8).map((snap) => <div key={snap.id} className="flex items-center justify-between gap-2 border-b border-border pb-2 last:border-0 last:pb-0"><div className="min-w-0"><div className="truncate text-[10px] font-bold">{snap.name}</div><div className="text-[8px] text-muted-foreground">{new Date(snap.createdAt).toLocaleDateString()}</div></div><span className="shrink-0 font-mono-data text-[10px]">{num(computeAll(snap.state || {}).bmi?.result).toFixed(2)} BMI</span></div>)}</div>}
        <div className="mt-3 flex items-center gap-1 text-[8px] leading-relaxed text-muted-foreground"><CheckCircle size={11} className="shrink-0" /> Reference ranges are informational, not diagnoses.</div>
      </div>}
    </div>
  );
}
