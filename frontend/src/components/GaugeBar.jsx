import React from "react";

/**
 * Simple color-segmented gauge with a marker.
 * segments: [{ label, color }] evenly distributed
 * position: 0..1
 */
export default function GaugeBar({ segments = [], position, currentLabel }) {
  const clamp = Math.max(0, Math.min(1, position ?? 0));
  const showMarker = Number.isFinite(position);
  return (
    <div className="w-full">
      <div className="relative h-2 flex overflow-hidden border border-border">
        {segments.map((s, i) => (
          <div
            key={i}
            className="flex-1 h-full"
            style={{ background: s.color }}
            title={s.label}
          />
        ))}
        {showMarker && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-4 bg-white shadow-[0_0_0_2px_black]"
            style={{ left: `${clamp * 100}%` }}
          />
        )}
      </div>
      <div className="flex justify-between mt-1.5 text-[9px] uppercase tracking-widest text-muted-foreground">
        {segments.map((s) => (
          <span key={s.label}>{s.label}</span>
        ))}
      </div>
      {currentLabel && (
        <div className="text-xs mt-1 font-bold uppercase tracking-wider text-foreground">
          {currentLabel}
        </div>
      )}
    </div>
  );
}
