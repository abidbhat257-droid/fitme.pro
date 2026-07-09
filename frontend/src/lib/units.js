// Unit conversions
export const CM_PER_IN = 2.54;
export const KG_PER_LB = 0.45359237;

export const cmToIn = (v) => v / CM_PER_IN;
export const inToCm = (v) => v * CM_PER_IN;
export const kgToLb = (v) => v / KG_PER_LB;
export const lbToKg = (v) => v * KG_PER_LB;

// Convert a state (which stores raw form values) to canonical metric numbers
// height in cm, weight in kg, circumferences in cm
export function toMetric(state) {
  const isMetric = state.unit === "metric";
  const n = (v) => {
    const num = parseFloat(v);
    return Number.isFinite(num) ? num : NaN;
  };

  const heightCm = isMetric ? n(state.height) : inToCm(n(state.height));
  const weightKg = isMetric ? n(state.weight) : lbToKg(n(state.weight));
  const waistCm = isMetric ? n(state.waist) : inToCm(n(state.waist));
  const hipCm = isMetric ? n(state.hip) : inToCm(n(state.hip));
  const neckCm = isMetric ? n(state.neck) : inToCm(n(state.neck));
  const wristCm = isMetric ? n(state.wrist) : inToCm(n(state.wrist));
  const goalWeightKg = isMetric ? n(state.goalWeight) : lbToKg(n(state.goalWeight));

  return {
    age: n(state.age),
    sex: state.sex, // 'male' | 'female'
    heightCm,
    weightKg,
    waistCm,
    hipCm,
    neckCm,
    wristCm,
    goalWeightKg,
    activity: state.activity,
    unit: state.unit,
  };
}

export function formatWeight(kg, unit) {
  if (!Number.isFinite(kg)) return "—";
  if (unit === "imperial") return `${(kg / KG_PER_LB).toFixed(1)} lb`;
  return `${kg.toFixed(1)} kg`;
}

export function formatLength(cm, unit) {
  if (!Number.isFinite(cm)) return "—";
  if (unit === "imperial") return `${(cm / CM_PER_IN).toFixed(1)} in`;
  return `${cm.toFixed(1)} cm`;
}

export function formatNumber(v, digits = 2) {
  if (!Number.isFinite(v)) return "—";
  return v.toFixed(digits);
}

export const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentary (little/no exercise)", factor: 1.2 },
  { value: "light", label: "Light (1–3 days/week)", factor: 1.375 },
  { value: "moderate", label: "Moderate (3–5 days/week)", factor: 1.55 },
  { value: "active", label: "Active (6–7 days/week)", factor: 1.725 },
  { value: "very_active", label: "Very Active (2x/day, hard)", factor: 1.9 },
];

export const getActivityFactor = (v) =>
  ACTIVITY_LEVELS.find((a) => a.value === v)?.factor ?? 1.2;
