// Input validation bounds. All bounds are per-mode (metric / imperial).
// Bounds are permissive to accept realistic values across ages.

export const BOUNDS = {
  age: { min: 5, max: 120, step: 1 },
  metric: {
    height: { min: 50, max: 250, step: 0.1, unit: "cm" },
    weight: { min: 20, max: 300, step: 0.1, unit: "kg" },
    waist: { min: 30, max: 200, step: 0.1, unit: "cm" },
    hip: { min: 30, max: 200, step: 0.1, unit: "cm" },
    neck: { min: 20, max: 70, step: 0.1, unit: "cm" },
    wrist: { min: 10, max: 25, step: 0.1, unit: "cm" },
    goalWeight: { min: 20, max: 300, step: 0.1, unit: "kg" },
  },
  imperial: {
    height: { min: 20, max: 100, step: 0.1, unit: "in" },
    weight: { min: 44, max: 660, step: 0.1, unit: "lb" },
    waist: { min: 12, max: 80, step: 0.1, unit: "in" },
    hip: { min: 12, max: 80, step: 0.1, unit: "in" },
    neck: { min: 8, max: 28, step: 0.1, unit: "in" },
    wrist: { min: 4, max: 10, step: 0.1, unit: "in" },
    goalWeight: { min: 44, max: 660, step: 0.1, unit: "lb" },
  },
};

export function getBounds(field, unit) {
  if (field === "age") return BOUNDS.age;
  return BOUNDS[unit]?.[field];
}

// Returns null if value is empty or valid; otherwise an error string.
export function validateField(field, rawValue, unit) {
  if (rawValue === "" || rawValue == null) return null;
  const v = parseFloat(rawValue);
  if (!Number.isFinite(v)) return "Must be a number";
  const b = getBounds(field, unit);
  if (!b) return null;
  if (v < b.min) return `Min ${b.min}${b.unit ? " " + b.unit : ""}`;
  if (v > b.max) return `Max ${b.max}${b.unit ? " " + b.unit : ""}`;
  return null;
}
