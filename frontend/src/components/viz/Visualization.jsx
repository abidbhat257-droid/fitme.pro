import React from "react";
import CategoryLadder from "./CategoryLadder";
import RangeBar from "./RangeBar";
import CompositionDonut from "./CompositionDonut";
import ComparisonBar from "./ComparisonBar";
import MetabolicStack from "./MetabolicStack";
import { toMetric, getActivityFactor, KG_PER_LB, CM_PER_IN } from "@/lib/units";
import { computeAll } from "@/hooks/useAllResults";

// Convert a raw metric value into the user's display unit for readable ticks.
function convWeight(kg, unit) { return unit === "imperial" ? kg / KG_PER_LB : kg; }
function convLen(cm, unit) { return unit === "imperial" ? cm / CM_PER_IN : cm; }

// ------- Segment definitions (per calc) -------
const SEG_BMI = [
  { label: "Under", color: "#60A5FA", min: 15, max: 18.5 },
  { label: "Normal", color: "#CCFF00", min: 18.5, max: 25 },
  { label: "Over", color: "#EAB308", min: 25, max: 30 },
  { label: "Obese I", color: "#F97316", min: 30, max: 35 },
  { label: "Obese II", color: "#EF4444", min: 35, max: 40 },
  { label: "Obese III", color: "#7F1D1D", min: 40, max: 50 },
];

const SEG_BMI_PRIME = [
  { label: "Under", color: "#60A5FA", min: 0.6, max: 0.74 },
  { label: "Optimal", color: "#CCFF00", min: 0.74, max: 1.0 },
  { label: "Above", color: "#EAB308", min: 1.0, max: 1.2 },
  { label: "High", color: "#EF4444", min: 1.2, max: 1.8 },
];

const SEG_BF_MALE = [
  { label: "Essential", color: "#60A5FA", min: 2, max: 8 },
  { label: "Fit", color: "#CCFF00", min: 8, max: 20 },
  { label: "Average", color: "#EAB308", min: 20, max: 25 },
  { label: "High", color: "#EF4444", min: 25, max: 45 },
];
const SEG_BF_FEMALE = [
  { label: "Essential", color: "#60A5FA", min: 10, max: 14 },
  { label: "Fit", color: "#CCFF00", min: 14, max: 25 },
  { label: "Average", color: "#EAB308", min: 25, max: 32 },
  { label: "High", color: "#EF4444", min: 32, max: 50 },
];

const SEG_WHR_MALE = [
  { label: "Low", color: "#CCFF00", min: 0.7, max: 0.9 },
  { label: "Moderate", color: "#EAB308", min: 0.9, max: 1.0 },
  { label: "High", color: "#EF4444", min: 1.0, max: 1.2 },
];
const SEG_WHR_FEMALE = [
  { label: "Low", color: "#CCFF00", min: 0.6, max: 0.85 },
  { label: "Moderate", color: "#EAB308", min: 0.85, max: 0.95 },
  { label: "High", color: "#EF4444", min: 0.95, max: 1.2 },
];

const SEG_WHTR = [
  { label: "Slim", color: "#60A5FA", min: 0.3, max: 0.4 },
  { label: "Healthy", color: "#CCFF00", min: 0.4, max: 0.5 },
  { label: "Over", color: "#EAB308", min: 0.5, max: 0.6 },
  { label: "Obese", color: "#EF4444", min: 0.6, max: 0.8 },
];

const SEG_ABSI = [
  { label: "Low risk", color: "#CCFF00", min: 0.070, max: 0.079 },
  { label: "Avg", color: "#EAB308", min: 0.079, max: 0.083 },
  { label: "High risk", color: "#EF4444", min: 0.083, max: 0.095 },
];

const SEG_BRI = [
  { label: "Lean", color: "#60A5FA", min: 2, max: 3.41 },
  { label: "Avg", color: "#CCFF00", min: 3.41, max: 4.5 },
  { label: "Over", color: "#EAB308", min: 4.5, max: 5.46 },
  { label: "Obese", color: "#EF4444", min: 5.46, max: 8 },
];

const SEG_CONICITY = [
  { label: "Healthy", color: "#CCFF00", min: 1.0, max: 1.25 },
  { label: "Elevated", color: "#EF4444", min: 1.25, max: 1.5 },
];

const SEG_FFMI_MALE = [
  { label: "Below", color: "#60A5FA", min: 14, max: 18 },
  { label: "Average", color: "#CCFF00", min: 18, max: 22 },
  { label: "Muscular", color: "#EAB308", min: 22, max: 25 },
  { label: "Very", color: "#EF4444", min: 25, max: 30 },
];
const SEG_FFMI_FEMALE = [
  { label: "Below", color: "#60A5FA", min: 11, max: 15 },
  { label: "Average", color: "#CCFF00", min: 15, max: 18 },
  { label: "Muscular", color: "#EAB308", min: 18, max: 20 },
  { label: "Very", color: "#EF4444", min: 20, max: 25 },
];

const SEG_PONDERAL = [
  { label: "Under", color: "#60A5FA", min: 8, max: 11 },
  { label: "Healthy", color: "#CCFF00", min: 11, max: 15 },
  { label: "Over", color: "#EAB308", min: 15, max: 18 },
];

const SEG_BAI = [
  { label: "Healthy", color: "#CCFF00", min: 15, max: 25 },
  { label: "Over", color: "#EAB308", min: 25, max: 33 },
  { label: "Obese", color: "#EF4444", min: 33, max: 45 },
];

const SEG_RFM = [
  { label: "Lean", color: "#60A5FA", min: 5, max: 25 },
  { label: "Avg", color: "#CCFF00", min: 25, max: 35 },
  { label: "High", color: "#EF4444", min: 35, max: 55 },
];

const SEG_OBESITY = SEG_BMI;

// ------- Main dispatcher -------
export default function Visualization({ calc, state, result }) {
  if (!calc || !result) return null;

  const m = toMetric(state);
  const isMale = m.sex === "male";

  switch (calc.id) {
    // -------- BASIC --------
    case "bmi":
      return <CategoryLadder segments={SEG_BMI} value={result.raw} />;

    case "bmi-prime":
      return <CategoryLadder segments={SEG_BMI_PRIME} value={result.raw} />;

    case "healthy-weight-range": {
      const h = m.heightCm / 100;
      const lo = 18.5 * h * h, hi = 24.9 * h * h;
      const spanMin = Math.max(0, lo * 0.5), spanMax = hi * 1.5;
      const val = convWeight(m.weightKg, state.unit);
      return (
        <RangeBar
          min={Math.round(convWeight(spanMin, state.unit))}
          max={Math.round(convWeight(spanMax, state.unit))}
          low={Math.round(convWeight(lo, state.unit) * 10) / 10}
          high={Math.round(convWeight(hi, state.unit) * 10) / 10}
          value={Number.isFinite(val) ? val : null}
          unit={state.unit === "imperial" ? " lb" : " kg"}
          lowLabel="Min"
          highLabel="Max"
        />
      );
    }

    case "ideal-body-weight":
      return (
        <ComparisonBar
          bars={[
            { label: "Current Weight", value: convWeight(m.weightKg, state.unit), color: "#EAB308" },
            { label: "Ideal Body Weight", value: convWeight(result.raw, state.unit), color: "#CCFF00" },
          ]}
          unit={state.unit === "imperial" ? "lb" : "kg"}
        />
      );

    case "weight-loss-goal":
    case "weight-gain-goal": {
      const cur = convWeight(m.weightKg, state.unit);
      const goal = convWeight(m.goalWeightKg, state.unit);
      const delta = Math.abs(cur - goal);
      return (
        <ComparisonBar
          bars={[
            { label: "Current", value: cur, color: "#EAB308" },
            { label: "Goal", value: goal, color: "#CCFF00" },
            { label: "Difference", value: delta, color: "#EF4444" },
          ]}
          unit={state.unit === "imperial" ? "lb" : "kg"}
        />
      );
    }

    // -------- BODY COMPOSITION --------
    case "body-fat":
    case "navy-body-fat":
      return <CategoryLadder segments={isMale ? SEG_BF_MALE : SEG_BF_FEMALE} value={result.raw} suffix="%" />;

    case "relative-fat-mass":
      return <CategoryLadder segments={SEG_RFM} value={result.raw} suffix="%" />;

    case "body-adiposity-index":
      return <CategoryLadder segments={SEG_BAI} value={result.raw} suffix="%" />;

    case "lean-body-mass":
    case "fat-mass":
    case "fat-free-mass": {
      // Compute LBM/FM via other calcs
      const all = computeAll(state);
      const fmRaw = all["fat-mass"]?.result?.raw;
      const ffmRaw = all["fat-free-mass"]?.result?.raw;
      if (!Number.isFinite(fmRaw) || !Number.isFinite(ffmRaw)) return null;
      const fm = convWeight(fmRaw, state.unit);
      const ffm = convWeight(ffmRaw, state.unit);
      const unit = state.unit === "imperial" ? "lb" : "kg";
      const total = fm + ffm;
      return (
        <CompositionDonut
          centerLabel={`${total.toFixed(1)}`}
          centerSublabel={`total ${unit}`}
          segments={[
            { label: "Fat-Free Mass", value: ffm, color: "#CCFF00", unit },
            { label: "Fat Mass", value: fm, color: "#F97316", unit },
          ]}
        />
      );
    }

    case "ffmi":
      return <CategoryLadder segments={isMale ? SEG_FFMI_MALE : SEG_FFMI_FEMALE} value={result.raw} />;

    // -------- BODY SHAPE --------
    case "waist-hip-ratio":
      return <CategoryLadder segments={isMale ? SEG_WHR_MALE : SEG_WHR_FEMALE} value={result.raw} />;

    case "waist-height-ratio":
      return <CategoryLadder segments={SEG_WHTR} value={result.raw} />;

    case "absi":
      return <CategoryLadder segments={SEG_ABSI} value={result.raw} />;

    case "bri":
      return <CategoryLadder segments={SEG_BRI} value={result.raw} />;

    case "conicity-index":
      return <CategoryLadder segments={SEG_CONICITY} value={result.raw} />;

    case "body-frame-size": {
      const frames = ["Small", "Medium", "Large"];
      return (
        <div className="grid grid-cols-3 gap-3">
          {frames.map((f) => {
            const active = result.value === f;
            return (
              <div
                key={f}
                className={`p-6 border-2 text-center transition-colors ${active ? "border-[var(--brand-lime)] bg-[var(--brand-lime)]/10" : "border-border opacity-50"}`}
              >
                <div className={`font-display text-3xl uppercase tracking-tighter ${active ? "text-[var(--brand-lime)]" : "text-muted-foreground"}`}>
                  {f}
                </div>
                <div className="text-[10px] uppercase tracking-widest mt-1 text-muted-foreground">
                  {f === "Small" ? "Narrow frame" : f === "Medium" ? "Average" : "Wide frame"}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // -------- METABOLISM --------
    case "bmr": {
      return <MetabolicStack bmr={result.raw} activity={0} />;
    }
    case "tdee":
    case "daily-calorie-needs": {
      const all = computeAll(state);
      const bmr = all["bmr"]?.result?.raw || 0;
      const activity = (result.raw || 0) - bmr;
      return <MetabolicStack bmr={bmr} activity={activity} />;
    }
    case "calorie-deficit": {
      const all = computeAll(state);
      const bmr = all["bmr"]?.result?.raw || 0;
      const tdee = all["tdee"]?.result?.raw || 0;
      const activity = tdee - bmr;
      const factor = getActivityFactor(state.activity);
      const mildTarget = tdee - 250;
      const moderateTarget = tdee - 500;
      return (
        <div className="space-y-6">
          <MetabolicStack bmr={bmr} activity={activity} target={moderateTarget} />
          <ComparisonBar
            bars={[
              { label: "Maintenance (TDEE)", value: tdee, color: "#94A3B8", unit: "kcal" },
              { label: "Mild deficit (−250)", value: mildTarget, color: "#EAB308", unit: "kcal" },
              { label: "Moderate deficit (−500)", value: moderateTarget, color: "#EF4444", unit: "kcal", note: "≈0.45 kg/wk" },
            ]}
            max={tdee * 1.1}
          />
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Activity factor: {factor}</div>
        </div>
      );
    }
    case "calorie-surplus": {
      const all = computeAll(state);
      const bmr = all["bmr"]?.result?.raw || 0;
      const tdee = all["tdee"]?.result?.raw || 0;
      const activity = tdee - bmr;
      const leanTarget = tdee + 300;
      const aggressiveTarget = tdee + 500;
      return (
        <div className="space-y-6">
          <MetabolicStack bmr={bmr} activity={activity} target={leanTarget} />
          <ComparisonBar
            bars={[
              { label: "Maintenance (TDEE)", value: tdee, color: "#94A3B8", unit: "kcal" },
              { label: "Lean surplus (+300)", value: leanTarget, color: "#CCFF00", unit: "kcal", note: "≈0.27 kg/wk" },
              { label: "Aggressive (+500)", value: aggressiveTarget, color: "#F97316", unit: "kcal" },
            ]}
            max={aggressiveTarget * 1.1}
          />
        </div>
      );
    }

    // -------- ADVANCED --------
    case "body-surface-area":
      return (
        <RangeBar
          min={1.0} max={2.5}
          low={1.5} high={2.0}
          value={result.raw}
          unit=" m²"
          lowLabel="Adult"
          highLabel="range"
        />
      );

    case "ponderal-index":
      return <CategoryLadder segments={SEG_PONDERAL} value={result.raw} />;

    case "adjusted-body-weight": {
      const all = computeAll(state);
      const ibw = all["ideal-body-weight"]?.result?.raw;
      const actual = convWeight(m.weightKg, state.unit);
      const ibwD = convWeight(ibw, state.unit);
      const adj = convWeight(result.raw, state.unit);
      return (
        <ComparisonBar
          bars={[
            { label: "Actual Weight", value: actual, color: "#EAB308" },
            { label: "Ideal Body Weight", value: ibwD, color: "#CCFF00" },
            { label: "Adjusted Body Weight", value: adj, color: "#3B82F6" },
          ]}
          unit={state.unit === "imperial" ? "lb" : "kg"}
        />
      );
    }

    case "body-density":
      return (
        <RangeBar
          min={1.00} max={1.10}
          low={1.030} high={1.080}
          value={result.raw}
          unit=" g/mL"
          lowLabel="Lean"
          highLabel="Dense"
        />
      );

    case "obesity-class":
      return <CategoryLadder segments={SEG_OBESITY} value={result.raw} />;

    default:
      return null;
  }
}
