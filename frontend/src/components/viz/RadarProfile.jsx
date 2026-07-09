import React from "react";

/**
 * RadarProfile — 6-axis SVG radar for a "body profile" summary.
 * props:
 *  - axes: [{key, label, value, min, max, ideal?}]
 *  Values are normalized to 0..1 by (v - min) / (max - min).
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

  // Data polygon
  const dataPoints = axes.map((a, i) => {
    const norm = Number.isFinite(a.value) ? Math.max(0, Math.min(1, (a.value - a.min) / (a.max - a.min))) : 0;
    const p = pt(i, norm * R);
    return `${p.x},${p.y}`;
  }).join(" ");

  // Ideal polygon (if any)
  const idealPoints = axes.every((a) => Number.isFinite(a.ideal))
    ? axes.map((a, i) => {
        const norm = Math.max(0, Math.min(1, (a.ideal - a.min) / (a.max - a.min)));
        const p = pt(i, norm * R);
        return `${p.x},${p.y}`;
      }).join(" ")
    : null;

  return (
    <div className="w-full flex flex-col items-center font-mono-data">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[380px]">
        {/* Rings */}
        {Array.from({ length: rings }).map((_, r) => {
          const ringR = ((r + 1) / rings) * R;
          const pts = axes.map((_, i) => {
            const p = pt(i, ringR);
            return `${p.x},${p.y}`;
          }).join(" ");
          return <polygon key={r} points={pts} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />;
        })}
        {/* Axes */}
        {axes.map((_, i) => {
          const p = pt(i, R);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="hsl(var(--border))" strokeWidth="1" />;
        })}
        {/* Ideal polygon */}
        {idealPoints && (
          <polygon points={idealPoints} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
        )}
        {/* Data polygon */}
        <polygon points={dataPoints} fill="#CCFF00" fillOpacity="0.15" stroke="#CCFF00" strokeWidth="2" />
        {/* Data points */}
        {axes.map((a, i) => {
          const norm = Number.isFinite(a.value) ? Math.max(0, Math.min(1, (a.value - a.min) / (a.max - a.min))) : 0;
          const p = pt(i, norm * R);
          return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#CCFF00" stroke="#000" strokeWidth="1.5" />;
        })}
        {/* Labels */}
        {axes.map((a, i) => {
          const p = pt(i, R + 22);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#94A3B8"
              style={{ font: "700 10px 'Manrope', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              {a.label}
            </text>
          );
        })}
      </svg>
      {idealPoints && (
        <div className="flex gap-4 mt-3 text-[10px] uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="h-2 w-4 bg-[var(--brand-lime)]" /> You</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-4 border border-dashed border-[#3B82F6]" /> Ideal</span>
        </div>
      )}
    </div>
  );
}
