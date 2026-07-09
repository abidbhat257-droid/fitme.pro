import React from "react";

/**
 * Category Ladder — a horizontal, segmented range with proportional widths and a marker.
 * props:
 *  - segments: [{label, color, min, max}]
 *  - value: number
 *  - suffix: string (optional unit displayed next to segment bounds)
 */
export default function CategoryLadder({ segments = [], value, suffix = "" }) {
  if (!segments.length) return null;
  const start = segments[0].min;
  const end = segments[segments.length - 1].max;
  const totalSpan = end - start || 1;

  const clamped = Math.max(start, Math.min(end, Number.isFinite(value) ? value : start));
  const pct = ((clamped - start) / totalSpan) * 100;

  // find active segment
  const activeIdx = segments.findIndex((s) => clamped >= s.min && clamped < s.max);
  const active = segments[Math.max(0, activeIdx)] || segments[segments.length - 1];

  return (
    <div className="w-full font-mono-data">
      {/* Segmented bar */}
      <div className="relative h-6 flex overflow-hidden border border-border">
        {segments.map((s, i) => {
          const width = ((s.max - s.min) / totalSpan) * 100;
          return (
            <div
              key={i}
              className="h-full flex items-center justify-center text-[9px] uppercase tracking-widest font-bold text-black/70 truncate px-1"
              style={{ width: `${width}%`, background: s.color, opacity: s === active ? 1 : 0.4 }}
              title={s.label}
            >
              {width > 8 ? s.label : ""}
            </div>
          );
        })}
        {Number.isFinite(value) && (
          <>
            <div
              className="absolute top-0 h-full w-[3px] bg-white shadow-[0_0_0_2px_black]"
              style={{ left: `calc(${pct}% - 1.5px)` }}
            />
            <div
              className="absolute -top-1 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest bg-black text-[var(--brand-lime)] px-1.5 py-0.5 whitespace-nowrap"
              style={{ left: `${pct}%` }}
            >
              {value.toFixed(2)}{suffix}
            </div>
          </>
        )}
      </div>

      {/* Numeric ticks */}
      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
        <span>{start}{suffix}</span>
        {segments.slice(1, -1).map((s, i) => (
          <span key={i}>{s.min}{suffix}</span>
        ))}
        <span>{end}{suffix}</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-3">
        {segments.map((s) => (
          <div
            key={s.label}
            className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 border ${s === active ? "border-white text-white" : "border-border text-muted-foreground"}`}
            style={s === active ? { background: s.color, color: "#000", borderColor: s.color } : {}}
          >
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
