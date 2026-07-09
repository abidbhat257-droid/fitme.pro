import React from "react";

/**
 * CompositionDonut — SVG donut chart for 2–4 composition segments.
 * props:
 *  - segments: [{label, value (numeric), color, unit?}]
 *  - centerLabel: optional big label in center
 *  - centerSublabel: small label
 */
export default function CompositionDonut({ segments = [], centerLabel, centerSublabel }) {
  const total = segments.reduce((s, x) => s + (Number.isFinite(x.value) ? x.value : 0), 0);
  if (!total) return null;

  const R = 90;
  const stroke = 32;
  const cx = 120, cy = 120;
  const circumference = 2 * Math.PI * R;

  let offset = 0;
  const arcs = segments.map((seg) => {
    const frac = seg.value / total;
    const dash = frac * circumference;
    const el = (
      <circle
        key={seg.label}
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={seg.color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeDashoffset={-offset}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    );
    offset += dash;
    return el;
  });

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-6">
      <svg viewBox="0 0 240 240" className="w-48 h-48 shrink-0">
        {/* Track */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
        {arcs}
        {/* Center */}
        {centerLabel && (
          <text x={cx} y={cy - 4} textAnchor="middle" fill="currentColor" style={{ font: "900 26px 'JetBrains Mono', monospace" }}>
            {centerLabel}
          </text>
        )}
        {centerSublabel && (
          <text x={cx} y={cy + 20} textAnchor="middle" fill="#94A3B8" style={{ font: "700 10px 'Manrope', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {centerSublabel}
          </text>
        )}
      </svg>

      <div className="flex-1 space-y-3 w-full">
        {segments.map((s) => {
          const pct = (s.value / total) * 100;
          return (
            <div key={s.label}>
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2 uppercase tracking-widest font-bold">
                  <span className="h-2 w-2" style={{ background: s.color }} />
                  {s.label}
                </div>
                <div className="font-mono-data text-foreground">
                  {s.value.toFixed(1)}{s.unit ? ` ${s.unit}` : ""}
                  <span className="text-muted-foreground ml-2">{pct.toFixed(1)}%</span>
                </div>
              </div>
              <div className="h-1 w-full bg-border">
                <div className="h-full" style={{ width: `${pct}%`, background: s.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
