import { computeAll } from "@/hooks/useAllResults";
import { toMetric, KG_PER_LB, CM_PER_IN } from "@/lib/units";

/**
 * Metrics that support weekly goals.
 * `getValue(state)` returns the metric in the USER's current display unit for
 * length/weight fields, and unit-less for computed ratios/indices.
 */
export const GOAL_METRICS = {
  weight: {
    label: "Weight",
    unit: (u) => (u === "imperial" ? "lb" : "kg"),
    getValue: (state) => parseFloat(state.weight),
    defaultDirection: "down",
    defaultRate: (u) => (u === "imperial" ? 1.0 : 0.45), // ~1 lb / 0.45 kg per week
    step: 0.1,
  },
  waist: {
    label: "Waist",
    unit: (u) => (u === "imperial" ? "in" : "cm"),
    getValue: (state) => parseFloat(state.waist),
    defaultDirection: "down",
    defaultRate: (u) => (u === "imperial" ? 0.4 : 1.0),
    step: 0.1,
  },
  hip: {
    label: "Hip",
    unit: (u) => (u === "imperial" ? "in" : "cm"),
    getValue: (state) => parseFloat(state.hip),
    defaultDirection: "down",
    defaultRate: (u) => (u === "imperial" ? 0.2 : 0.5),
    step: 0.1,
  },
  bmi: {
    label: "BMI",
    unit: () => "",
    getValue: (state) => computeAll(state).bmi?.result?.raw,
    defaultDirection: "down",
    defaultRate: () => 0.15,
    step: 0.05,
  },
  "body-fat": {
    label: "Body Fat",
    unit: () => "%",
    getValue: (state) => computeAll(state)["navy-body-fat"]?.result?.raw ?? computeAll(state)["body-fat"]?.result?.raw,
    defaultDirection: "down",
    defaultRate: () => 0.25,
    step: 0.05,
  },
  "waist-height-ratio": {
    label: "Waist/Height Ratio",
    unit: () => "",
    getValue: (state) => computeAll(state)["waist-height-ratio"]?.result?.raw,
    defaultDirection: "down",
    defaultRate: () => 0.003,
    step: 0.001,
  },
  ffmi: {
    label: "FFMI (Muscularity)",
    unit: () => "",
    getValue: (state) => computeAll(state).ffmi?.result?.raw,
    defaultDirection: "up",
    defaultRate: () => 0.1,
    step: 0.05,
  },
};

export const GOAL_METRIC_KEYS = Object.keys(GOAL_METRICS);

/**
 * Compute progress for one goal against the current state.
 * status ∈ { "no-data", "off", "behind", "on-track", "ahead" }
 */
export function computeGoalProgress(goal, state) {
  const meta = GOAL_METRICS[goal.metric];
  if (!meta) return { status: "no-data" };

  const currentValue = meta.getValue(state);
  if (!Number.isFinite(currentValue) || !Number.isFinite(goal.startValue)) {
    return { status: "no-data", currentValue, meta };
  }

  const now = Date.now();
  const startMs = new Date(goal.startDate).getTime();
  const elapsedMs = Math.max(0, now - startMs);
  const weeksElapsed = elapsedMs / (7 * 86400 * 1000);

  const sign = goal.direction === "down" ? -1 : 1;
  const expectedChange = goal.amountPerWeek * Math.max(weeksElapsed, 0) * sign;
  const actualChange = currentValue - goal.startValue;

  // Ratio of actual progress toward expected.
  const ratio =
    expectedChange === 0 ? (actualChange === 0 ? 1 : 0) : actualChange / expectedChange;

  let status;
  if (weeksElapsed < 0.01) status = "just-started";
  else if (ratio < 0) status = "off";
  else if (ratio < 0.8) status = "behind";
  else if (ratio <= 1.2) status = "on-track";
  else status = "ahead";

  return {
    status,
    currentValue,
    meta,
    weeksElapsed,
    expectedChange,
    actualChange,
    ratio,
  };
}

export const STATUS_COLORS = {
  "no-data":     "#94A3B8",
  "just-started":"#3B82F6",
  "behind":      "#EAB308",
  "on-track":    "#CCFF00",
  "ahead":       "#22D3EE",
  "off":         "#EF4444",
};

export const STATUS_LABELS = {
  "no-data": "No data",
  "just-started": "Just started",
  "behind": "Behind pace",
  "on-track": "On track",
  "ahead": "Ahead of pace",
  "off": "Off track",
};
