import React from "react";

/**
 * Compact SVG sparkline for time-series values.
 * props:
 *  - points: [{date: ISO, value: number}]  (any order; sorted internally)
 *  - color: stroke color
 *  - width, height
 *  - showDots: boolean
 */
export default function Sparkline({ points = [], color = "#CCFF00", width = 160, height = 44, showDots = true, unit = "", gradientId }) {
  const gradId = gradientId || `grad-${color.replace("#", "")}-${Math.random().toString(36).slice(2, 8)}`;
  const sorted = points
    .filter((p) => Number.isFinite(p.value))
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sorted.length === 0) {
    return (
      <div className="flex items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground border border-dashed border-border" style={{ width, height }}>
        No data
      </div>
    );
  }
  if (sorted.length === 1) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono-data" style={{ height }}>
        <span className="text-foreground">{sorted[0].value.toFixed(1)}{unit}</span>
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">single point</span>
      </div>
    );
  }

  const values = sorted.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const padX = 4;
  const padY = 6;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const xFor = (i) => padX + (i / (sorted.length - 1)) * innerW;
  const yFor = (v) => padY + innerH - ((v - min) / span) * innerH;

  const pathD = sorted.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.value)}`).join(" ");

  // Fill area (subtle)
  const fillD = `${pathD} L ${xFor(sorted.length - 1)} ${padY + innerH} L ${xFor(0)} ${padY + innerH} Z`;

  const first = sorted[0].value;
  const last = sorted[sorted.length - 1].value;
  const trend = last - first;
  const trendPct = first !== 0 ? (trend / first) * 100 : 0;
  const trendColor = trend > 0 ? "#F97316" : trend < 0 ? "#CCFF00" : "#94A3B8";

  return (
    <div className="flex flex-col gap-1">
      <svg width={width} height={height} className="block">
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.4" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill={`url(#${gradId})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        {showDots && sorted.map((p, i) => (
          <circle
            key={i}
            cx={xFor(i)}
            cy={yFor(p.value)}
            r={i === sorted.length - 1 ? 3 : 1.5}
            fill={i === sorted.length - 1 ? color : "hsl(var(--background))"}
            stroke={color}
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono-data">
        <span className="text-muted-foreground">{first.toFixed(1)}{unit}</span>
        <span style={{ color: trendColor }}>
          {trend > 0 ? "▲" : trend < 0 ? "▼" : "─"} {Math.abs(trendPct).toFixed(1)}%
        </span>
        <span className="text-foreground font-bold">{last.toFixed(1)}{unit}</span>
      </div>
    </div>
  );
}
