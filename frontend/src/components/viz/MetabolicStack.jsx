import React from "react";

/**
 * MetabolicStack — a single wide horizontal bar showing BMR + activity contribution
 * plus an optional deficit/surplus indicator.
 * props:
 *  - bmr: number (kcal)
 *  - activity: number (kcal added beyond BMR)
 *  - target: number (optional — target calories: deficit/surplus)
 *  - unit: default 'kcal'
 */
export default function MetabolicStack({ bmr, activity, target, unit = "kcal" }) {
  const tdee = (bmr || 0) + (activity || 0);
  if (!tdee) return null;
  const max = Math.max(tdee, target || 0) * 1.1;
  const pctBmr = (bmr / max) * 100;
  const pctAct = (activity / max) * 100;
  const pctTarget = target ? (target / max) * 100 : null;

  return (
    <div className="w-full font-mono-data space-y-3">
      <div className="relative h-8 w-full border border-border bg-background overflow-hidden">
        <div className="absolute top-0 left-0 h-full flex">
          <div style={{ width: `${pctBmr}%`, background: "#3B82F6" }} className="h-full flex items-center px-2 text-[10px] uppercase tracking-widest text-white font-bold truncate">
            BMR
          </div>
          <div style={{ width: `${pctAct}%`, background: "#CCFF00" }} className="h-full flex items-center px-2 text-[10px] uppercase tracking-widest text-black font-bold truncate">
            Activity
          </div>
        </div>
        {pctTarget != null && (
          <div
            className="absolute top-0 h-full w-[3px] bg-orange-400 shadow-[0_0_0_2px_black]"
            style={{ left: `calc(${pctTarget}% - 1.5px)` }}
            title="Target"
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs uppercase tracking-widest">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 bg-[#3B82F6]" /> <span className="font-bold text-muted-foreground">BMR</span>
          </div>
          <div className="text-foreground text-lg">{Math.round(bmr)} <span className="text-xs text-muted-foreground">{unit}</span></div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 bg-[var(--brand-lime)]" /> <span className="font-bold text-muted-foreground">Activity</span>
          </div>
          <div className="text-foreground text-lg">{Math.round(activity)} <span className="text-xs text-muted-foreground">{unit}</span></div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 bg-white" /> <span className="font-bold text-muted-foreground">Total (TDEE)</span>
          </div>
          <div className="text-[var(--brand-lime)] text-lg font-black">{Math.round(tdee)} <span className="text-xs text-muted-foreground">{unit}</span></div>
        </div>
      </div>

      {target != null && (
        <div className="text-xs text-orange-400 uppercase tracking-widest font-bold">
          → Target line at {Math.round(target)} {unit}
        </div>
      )}
    </div>
  );
}
