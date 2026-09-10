import { CALCULATORS } from "./calculators";
import { SPECIALIZED_CALCULATORS } from "./specializedCalculators";
import { MISSING_CALCULATORS } from "./missingCalculators";

const withSource = (items, source) => items.map((calculator) => ({ ...calculator, source }));

/**
 * Single calculator registry used by the UI and routing layer.
 * New calculators should be added to their domain registry only.
 */
export const ALL_CALCULATORS = Array.from(
  new Map(
    [
      ...withSource(CALCULATORS, "core"),
      ...withSource(SPECIALIZED_CALCULATORS, "specialized"),
      ...withSource(MISSING_CALCULATORS, "missing"),
    ].map((calculator) => [calculator.id, calculator])
  ).values()
);

export const ALL_CALCULATORS_BY_ID = Object.fromEntries(
  ALL_CALCULATORS.map((calculator) => [calculator.id, calculator])
);

export function getCalculatorById(id) {
  return ALL_CALCULATORS_BY_ID[id] || null;
}
