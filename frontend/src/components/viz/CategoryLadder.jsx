import React from "react";

/**
 * Category Ladder — horizontal segmented range with semantic result colors.
 * Requested FitMe Pro standard:
 *   below ideal = yellow, ideal = emerald green, above ideal = red.
 * Existing segment definitions are preserved; this component normalizes
 * common labels so the active result always uses the requested semantic color.
 */
const SEMANTIC = {
  below: "#EAB308",   // yellow
  ideal: "#10B981",   // emerald green
  above: "#EF4444",   // red
};

function semanticColor(label = "") {
  const l = label.toLowerCase();
  if (/under|below|essential|low|lean|slim|small|deficit|loss/.test(l)) return SEMANTIC.below;
  if (/normal|healthy|ideal|optimal|fit|average|moderate|medium/.test(l)) return SEMANTIC.ideal;
  if (/over|obese|high|elevated|muscular|very|above|risk|large/.test(l)) return SEMANTIC.above;
  return null;
}

export default function CategoryLadder({ segments = [], value, suffix = "" }) {
  if (!segments.length) return null;
  const start = segments[0].min;
  const end = segments[segments.length - 1].max;
  const totalSpan = end - start || 1;
  const numericValue = Number.isFinite(value) ? value : null;
  const clamped = Math.max(start, Math.min(end, numericValue ?? start));
  const pct = ((clamped - start) / totalSpan) * 100;

  const activeIdx = segments.findIndex((s) => clamped >= s.min && clamped < s.max);
  const active = segments[Math.max(0, activeIdx)] || segments[segments.length - 1];
  const activeSemantic = semanticColor(active.label);

  return (
    <div className="w-full font-mono-data">
      <div className="relative h-6 flex overflow-hidden border border-border">
        {segments.map((s, i) => {
          const width = ((s.max - s.min) / totalSpan) * 100;
          const semantic = semanticColor(s.label);
          const background = semantic || s.color;
          const isActive = i === Math.max(0, activeIdx);
          return (
            <div
              key={i}
              className="h-full flex items-center justify-center text-[9px] uppercase tracking-widest font-bold text-black/70 truncate px-1"
              style={{ width: `${width}%`, background, opacity: isActive ? 1 : 0.4 }}
              title={s.label}
            >
              {width > 8 ? s.label : ""}
            </div>
          );
        })}
        {numericValue !== null && (
          <>
            <div
              className="absolute top-0 h-full w-[3px] bg-white shadow-[0_0_0_2px_black]"
              style={{ left: `calc(${pct}% - 1.5px)` }}
            />
            <div
              className="absolute -top-1 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest bg-black px-1.5 py-0.5 whitespace-nowrap"
              style={{ left: `${pct}%`, color: activeSemantic || SEMANTIC.ideal }}
            >
              {numericValue.toFixed(2)}{suffix}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
        <span>{start}{suffix}</span>
        {segments.slice(1, -1).map((s, i) => <span key={i}>{s.min}{suffix}</span>)}
        <span>{end}{suffix}</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {segments.map((s, i) => {
          const semantic = semanticColor(s.label);
          const isActive = i === Math.max(0, activeIdx);
          return (
            <div
              key={s.label}
              className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 border ${isActive ? "text-black" : "border-border text-muted-foreground"}`}
              style={isActive ? { background: semantic || s.color, color: "#000", borderColor: semantic || s.color } : {}}
            >
              {s.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
