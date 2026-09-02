import React, { useMemo, useState } from "react";
import { Camera, CheckCircle, TrendDown, TrendUp } from "@phosphor-icons/react";
import { useMeasurements } from "@/context/MeasurementContext";
import SnapshotDialog from "@/components/SnapshotDialog";

/**
 * Body Profile radar.
 * axes: [{key, label, value, min, max, ideal?}]
 * Ideal values are visual reference points, not medical diagnoses.
 */
export default function RadarProfile({ axes = [] }) {
  const { snapshots } = useMeasurements();
  const [selected, setSelected] = useState(null);
  const n = axes.length;
  if (n < 3) return null;

  const size = 320;
  const cx = size / 2, cy = size / 2;
  const R = 120;
  const rings = 4;
  const angleFor = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, r) => ({ x: cx + Math.cos(angleFor(i)) * r, y: cy + Math.sin(angleFor(i)) * r });
  const normalized = (a) => Number.isFinite(a.value) ? Math.max(0, Math.min(1, (a.value - a.min) / (a.max - a.min))) : 0;
  const formatValue = (a) => Number.isFinite(a.value) ? (Math.abs(a.value) >= 10 ? a.value.toFixed(1) : a.value.toFixed(2)) : "—";
  const status = (a) => {
    if (!Number.isFinite(a.value) || !Number.isFinite(a.ideal)) return "Pending";
    const tolerance = Math.max((a.max - a.min) * 0.12, 0.01);
    return Math.abs(a.value - a.ideal) <= tolerance ? "Near ideal" : a.value < a.ideal ? "Below" : "Above";
  };
  const dataPoints = axes.map((a, i) => { const p = pt(i, normalized(a) * R); return `${p.x},${p.y}`; }).join(" ");
  const idealPoints = axes.every((a) => Number.isFinite(a.ideal))
    ? axes.map((a, i) => { const p = pt(i, Math.max(0, Math.min(1, (a.ideal - a.min) / (a.max - a.min))) * R); return `${p.x},${p.y}`; }).join(" ")
    : null;

  const profileScore = useMemo(() => {
    const scored = axes.filter((a) => Number.isFinite(a.value) && Number.isFinite(a.ideal));
    if (!scored.length) return null;
    const points = scored.map((a) => {
      const tolerance = Math.max((a.max - a.min) * 0.25, 0.02);
      return Math.max(0, 100 - (Math.abs(a.value - a.ideal) / tolerance) * 100);
    });
    return Math.round(points.reduce((sum, x) => sum + x, 0) / points.length);
  }, [axes]);

  const counts = axes.reduce((acc, a) => {
    const s = status(a);
    if (s === "Near ideal") acc.near += 1;
    else if (s === "Below") acc.below += 1;
    else if (s === "Above") acc.above += 1;
    return acc;
  }, { near: 0, below: 0, above: 0 });

  const active = axes.find((a) => a.key === selected) || axes[0];

  return (
    <div className="w-full flex flex-col items-center font-mono-data">
      <div className="mb-2 grid w-full grid-cols-3 gap-2 text-center">
        <div className="border border-border bg-background/50 p-2"><div className="text-[8px] uppercase tracking-widest text-muted-foreground">Alignment</div><b className="mt-1 block text-base text-[var(--brand-lime)]">{profileScore == null ? "—" : `${profileScore}%`}</b></div>
        <div className="border border-border bg-background/50 p-2"><div className="text-[8px] uppercase tracking-widest text-muted-foreground">Near ideal</div><b className="mt-1 block text-base">{counts.near}/{n}</b></div>
        <div className="border border-border bg-background/50 p-2"><div className="text-[8px] uppercase tracking-widest text-muted-foreground">History</div><b className="mt-1 block text-base">{snapshots.length}</b></div>
      </div>

      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[380px]" aria-label="Body profile radar chart">
        {Array.from({ length: rings }).map((_, r) => { const ringR = ((r + 1) / rings) * R; const pts = axes.map((_, i) => { const p = pt(i, ringR); return `${p.x},${p.y}`; }).join(" "); return <polygon key={r} points={pts} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />; })}
        {axes.map((_, i) => { const p = pt(i, R); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="hsl(var(--border))" strokeWidth="1" />; })}
        {idealPoints && <polygon points={idealPoints} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />}
        <polygon points={dataPoints} fill="var(--brand-lime)" fillOpacity="0.15" stroke="var(--brand-lime)" strokeWidth="2" />
        {axes.map((a, i) => { const p = pt(i, normalized(a) * R); return <circle key={i} cx={p.x} cy={p.y} r={active?.key === a.key ? 6 : 4} fill="var(--brand-lime)" stroke="hsl(var(--background))" strokeWidth="1.5" onClick={() => setSelected(a.key)} className="cursor-pointer" />; })}
        {axes.map((a, i) => { const p = pt(i, R + 22); return <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="#94A3B8" style={{ font: "700 10px 'Manrope', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }} onClick={() => setSelected(a.key)} className="cursor-pointer">{a.label}</text>; })}
      </svg>

      {active && <div className="w-full border border-border bg-background/60 p-3">
        <div className="flex items-center justify-between gap-3"><div><div className="text-[8px] uppercase tracking-widest text-muted-foreground">Selected metric</div><div className="mt-1 text-sm font-bold uppercase">{active.label}</div></div><div className="text-right"><div className="font-mono-data text-lg font-black text-[var(--brand-lime)]">{formatValue(active)}</div><div className="text-[8px] uppercase tracking-widest text-muted-foreground">{status(active)}</div></div></div>
        <div className="mt-2 h-1.5 overflow-hidden bg-border"><div className="h-full bg-[var(--brand-lime)] transition-all" style={{ width: `${normalized(active) * 100}%` }} /></div>
      </div>}

      <div className="flex w-full flex-wrap items-center justify-between gap-3 mt-3">
        {idealPoints && <div className="flex gap-4 text-[10px] uppercase tracking-widest"><span className="flex items-center gap-1.5"><span className="h-2 w-4 bg-[var(--brand-lime)]" /> You</span><span className="flex items-center gap-1.5"><span className="h-2 w-4 border border-dashed border-[#3B82F6]" /> Reference</span></div>}
        <SnapshotDialog trigger={<button className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]"><Camera size={13} /> Save snapshot</button>} />
      </div>

      <div className="mt-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
        {axes.map((a) => <button key={a.key} onClick={() => setSelected(a.key)} className={`border p-2.5 text-left transition-colors ${active?.key === a.key ? "border-[var(--brand-lime)] bg-background" : "border-border bg-background/60 hover:border-[var(--brand-lime)]"}`}><div className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{a.label}</div><div className="mt-1 text-sm font-black text-[var(--brand-lime)]">{formatValue(a)}</div><div className="mt-1 flex items-center gap-1 text-[8px] uppercase tracking-wider text-muted-foreground">{status(a) === "Near ideal" ? <CheckCircle size={11} /> : status(a) === "Below" ? <TrendDown size={11} /> : status(a) === "Above" ? <TrendUp size={11} /> : null}{status(a)}</div></button>)}
      </div>
      <div className="mt-3 w-full grid grid-cols-3 gap-2 text-center text-[8px] uppercase tracking-wider text-muted-foreground"><div className="border border-border p-2"><b className="block text-foreground">{n}</b>Metrics</div><div className="border border-border p-2"><b className="block text-foreground">{counts.below + counts.above}</b>Outside</div><div className="border border-border p-2"><b className="block text-foreground">{snapshots.length}</b>Saved</div></div>
    </div>
  );
}
