import { CALCULATORS } from "./calculators";
import { SPECIALIZED_CALCULATORS } from "./specializedCalculators";
import { MISSING_CALCULATORS } from "./missingCalculators";

const CORE_URLS = {
  bmi: "/bmi-calculator",
  "bmi-prime": "/bmi-prime-calculator",
  "healthy-weight-range": "/healthy-weight-range-calculator",
  "ideal-body-weight": "/ideal-body-weight-calculator",
  "weight-loss-goal": "/weight-loss-goal-calculator",
  "weight-gain-goal": "/weight-gain-goal-calculator",
  "body-fat": "/body-fat-calculator",
  "navy-body-fat": "/navy-body-fat-calculator",
  "relative-fat-mass": "/relative-fat-mass-calculator",
  "body-adiposity-index": "/body-adiposity-index-calculator",
  "lean-body-mass": "/lean-body-mass-calculator",
  "fat-mass": "/fat-mass-calculator",
  "fat-free-mass": "/fat-free-mass-calculator",
  ffmi: "/ffmi-calculator",
  "waist-hip-ratio": "/waist-hip-ratio-calculator",
  "waist-height-ratio": "/waist-height-ratio-calculator",
  absi: "/absi-calculator",
  bri: "/bri-calculator",
  "conicity-index": "/conicity-index-calculator",
  "body-frame-size": "/body-frame-size-calculator",
  bmr: "/bmr-calculator",
  tdee: "/tdee-calculator",
  "daily-calorie-needs": "/daily-calorie-needs-calculator",
  "calorie-deficit": "/calorie-deficit-calculator",
  "calorie-surplus": "/calorie-surplus-calculator",
  "body-surface-area": "/body-surface-area-calculator",
  "ponderal-index": "/ponderal-index-calculator",
  "adjusted-body-weight": "/adjusted-body-weight-calculator",
  "body-density": "/body-density-calculator",
  "obesity-class": "/obesity-class-calculator",
};

const withSource = (items, source) =>
  items.map((calculator) => ({
    ...calculator,
    source,
    url: calculator.url || (source === "core" ? CORE_URLS[calculator.id] : `/${calculator.slug || calculator.id}`),
  }));

/**
 * Canonical calculator registry. Domain files retain their calculator
 * implementations, but every consumer uses this normalized list and URL.
 */
const byId = new Map();
const byUrl = new Map();
for (const calculator of [
  // These legacy goal URLs remain supported by App redirects, but are not
  // calculator pages in the canonical index.
  ...withSource(CALCULATORS.filter((c) => !["weight-loss-goal", "weight-gain-goal"].includes(c.id)), "core"),
  ...withSource(SPECIALIZED_CALCULATORS, "specialized"),
  ...withSource(MISSING_CALCULATORS, "missing"),
]) {
  if (!calculator.url) throw new Error(`Calculator ${calculator.id} is missing a URL`);
  if (!byId.has(calculator.id) && !byUrl.has(calculator.url)) {
    byId.set(calculator.id, calculator);
    byUrl.set(calculator.url, calculator);
  }
}

export const ALL_CALCULATORS = [...byId.values()];
if (ALL_CALCULATORS.length !== 100) {
  throw new Error(`Expected 100 canonical calculators, found ${ALL_CALCULATORS.length}`);
}

export const ALL_CALCULATORS_BY_ID = Object.fromEntries(
  ALL_CALCULATORS.map((calculator) => [calculator.id, calculator])
);
export const ALL_CALCULATORS_BY_URL = Object.fromEntries(
  ALL_CALCULATORS.map((calculator) => [calculator.url, calculator])
);

export function getCalculatorById(id) {
  return ALL_CALCULATORS_BY_ID[id] || null;
}

export function getCalculatorByUrl(url) {
  return ALL_CALCULATORS_BY_URL[url] || null;
}
