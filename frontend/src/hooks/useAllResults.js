import { useMemo } from "react";
import { CALCULATORS, hasRequiredInputs } from "@/lib/calculators";

/**
 * Compute results for every calculator against the given state.
 * Returns an object keyed by calc.id with { ready, result }.
 */
export function computeAll(state) {
  const map = {};
  for (const c of CALCULATORS) {
    const ready = hasRequiredInputs(c, state);
    let result = null;
    if (ready) {
      try { result = c.compute(state); } catch { result = { value: "—", tone: "neutral" }; }
    }
    map[c.id] = { ready, result };
  }
  return map;
}

export function useAllResults(state) {
  return useMemo(() => computeAll(state), [state]);
}
