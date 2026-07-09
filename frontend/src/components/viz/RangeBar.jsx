import React from "react";

/**
 * RangeBar — position of a value within a full scale, highlighting a "healthy" band.
 * props:
 *  - min, max: overall bar bounds
 *  - low, high: healthy band bounds
 *  - value: current
 *  - unit
 *  - lowLabel/highLabel: optional band labels
 */
export default function RangeBar({ min, max, low, high, value, unit = "", lowLabel = "Low", highLabel = "High" }) {
  const span = max - min || 1;
  const bandLeft = ((low - min) / span) * 100;
  const bandWidth = ((high - low) / span) * 100;
  const ok = Number.isFinite(value);
  const pct = ok ? Math.max(0, Math.min(100, ((value - min) / span) * 100)) : 0;
  const inBand = ok && value >= low && value <= high;

  return (
    <div className="w-full font-mono-data">
      <div className="relative h-3 border border-border">
        {/* healthy band */}
        <div
          className="absolute top-0 h-full"
          style={{ left: `${bandLeft}%`, width: `${bandWidth}%`, background: "var(--brand-lime)" }}
        />
        {/* marker */}
        {ok && (
          <div
            className="absolute -top-1 h-5 w-[3px] bg-white shadow-[0_0_0_2px_black]"
            style={{ left: `calc(${pct}% - 1.5px)` }}
          />
        )}
      </div>
      <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>{min}{unit}</span>
        <span className="text-[var(--brand-lime)] font-bold">
          {lowLabel} {low}{unit} – {high}{unit} {highLabel}
        </span>
        <span>{max}{unit}</span>
      </div>
      {ok && (
        <div className="mt-3 text-xs uppercase tracking-widest font-bold">
          <span className={inBand ? "text-[var(--brand-lime)]" : "text-orange-400"}>
            {inBand ? "✓ In healthy band" : "◊ Outside healthy band"}
          </span>
          <span className="text-muted-foreground ml-2">
            → your value: <span className="text-foreground">{value.toFixed(2)}{unit}</span>
          </span>
        </div>
      )}
    </div>
  );
}
