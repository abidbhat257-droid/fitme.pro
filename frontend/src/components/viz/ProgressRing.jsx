import React from "react";

/**
 * ProgressRing — SVG donut showing progress % (0..150 clamped).
 * props:
 *  - value: percent number (0..)
 *  - color: hex
 *  - label: string above numeric
 *  - subLabel: small caption below
 *  - size: px
 */
export default function ProgressRing({
  value = 0,
  color = "#CCFF00",
  label,
  subLabel,
  size = 120,
}) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1.5, value / 100));
  const dash = clamped * circumference;

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="butt"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        {label && (
          <div className="font-mono-data text-2xl font-black" style={{ color }}>
            {label}
          </div>
        )}
        {subLabel && (
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">
            {subLabel}
          </div>
        )}
      </div>
    </div>
  );
}
