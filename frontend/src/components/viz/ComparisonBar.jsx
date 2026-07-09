import React from "react";

/**
 * ComparisonBar — multiple labeled horizontal bars sharing a common max scale.
 * props:
 *  - bars: [{label, value, color, unit?, note?}]
 *  - max: number (auto if not provided)
 */
export default function ComparisonBar({ bars = [], max, unit = "" }) {
  const cleaned = bars.filter((b) => Number.isFinite(b.value));
  if (!cleaned.length) return null;
  const scaleMax = max || cleaned.reduce((m, b) => Math.max(m, b.value), 0) * 1.15;

  return (
    <div className="w-full space-y-3 font-mono-data">
      {cleaned.map((b) => {
        const pct = Math.min(100, (b.value / scaleMax) * 100);
        return (
          <div key={b.label}>
            <div className="flex justify-between text-xs uppercase tracking-widest mb-1">
              <span className="font-bold flex items-center gap-2">
                <span className="h-2 w-2" style={{ background: b.color }} />
                {b.label}
              </span>
              <span className="text-foreground">
                {b.value.toFixed(1)}{b.unit || unit ? ` ${b.unit || unit}` : ""}
                {b.note ? <span className="text-muted-foreground ml-2">{b.note}</span> : null}
              </span>
            </div>
            <div className="h-3 w-full bg-border relative overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${pct}%`, background: b.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
