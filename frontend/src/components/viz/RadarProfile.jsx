import React from "react";

/**
 * RadarProfile — body profile visualization plus a compact metric summary.
 * props:
 *  - axes: [{key, label, value, min, max, ideal?}]
 */
export default function RadarProfile({ axes = [] }) {
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

  return (
    <div className="w-full flex flex-col items-center font-mono-data">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[380px]" aria-label="Body profile radar chart">
        {Array.from({ length: rings }).map((_, r) => { const ringR = ((r + 1) / rings) * R; const pts = axes.map((_, i) => { const p = pt(i, ringR); return `${p.x},${p.y}`; }).join(" "); return <polygon key={r} points={pts} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />; })}
        {axes.map((_, i) => { const p = pt(i, R); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="hsl(var(--border))" strokeWidth="1" />; })}
        {idealPoints && <polygon points={idealPoints} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />}
        <polygon points={dataPoints} fill="var(--brand-lime)" fillOpacity="0.15" stroke="var(--brand-lime)" strokeWidth="2" />
        {axes.map((a, i) => { const p = pt(i, normalized(a) * R); return <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--brand-lime)" stroke="hsl(var(--background))" strokeWidth="1.5" />; })}
        {axes.map((a, i) => { const p = pt(i, R + 22); return <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="#94A3B8" style={{ font: "700 10px 'Manrope', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>{a.label}</text>; })}
      </svg>
      {idealPoints && <div className="flex gap-4 mt-3 text-[10px] uppercase tracking-widest"><span className="flex items-center gap-1.5"><span className="h-2 w-4 bg-[var(--brand-lime)]" /> You</span><span className="flex items-center gap-1.5"><span className="h-2 w-4 border border-dashed border-[#3B82F6]" /> Ideal</span></div>}
      <div className="mt-5 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
        {axes.map((a) => <div key={a.key} className="border border-border bg-background/60 p-2.5"><div className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{a.label}</div><div className="mt-1 text-sm font-black text-[var(--brand-lime)]">{formatValue(a)}</div><div className="mt-1 text-[8px] uppercase tracking-wider text-muted-foreground">{status(a)}</div></div>)}
      </div>
      <div className="mt-3 w-full grid grid-cols-3 gap-2 text-center text-[8px] uppercase tracking-wider text-muted-foreground"><div className="border border-border p-2"><b className="block text-foreground">6</b>Metrics</div><div className="border border-border p-2"><b className="block text-foreground">You</b>Current</div><div className="border border-border p-2"><b className="block text-foreground">Ideal</b>Reference</div></div>
    </div>
  );
}
