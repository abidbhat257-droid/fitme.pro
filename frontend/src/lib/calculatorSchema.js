export const VALID_CALCULATOR_CATEGORIES = [
  "basic",
  "composition",
  "shape",
  "metabolism",
  "advanced",
];

export function validateCalculatorDefinition(
  calculator,
  validCategories = VALID_CALCULATOR_CATEGORIES
) {
  const errors = [];

  if (!calculator || typeof calculator !== "object") {
    return { valid: false, errors: ["Calculator definition is missing."] };
  }

  if (typeof calculator.id !== "string" || !calculator.id.trim()) {
    errors.push("Calculator id must be a non-empty string.");
  }

  if (typeof calculator.slug !== "string" || !calculator.slug.trim()) {
    errors.push("Calculator slug must be a non-empty string.");
  }

  if (typeof calculator.name !== "string" || !calculator.name.trim()) {
    errors.push("Calculator name must be a non-empty string.");
  }

  if (!Array.isArray(calculator.requires)) {
    errors.push("Calculator requires must be an array.");
  }

  if (typeof calculator.compute !== "function") {
    errors.push("Calculator compute must be a function.");
  }

  if (typeof calculator.category !== "string") {
    errors.push("Calculator category must be a string.");
  } else if (!validCategories.includes(calculator.category)) {
    errors.push(
      `Calculator category '${calculator.category}' is not in the supported set.`
    );
  }

  return { valid: errors.length === 0, errors };
}

export function buildCalculatorIndex(
  calculators = [],
  validCategories = VALID_CALCULATOR_CATEGORIES
) {
  const errors = [];
  const ids = new Set();
  const slugs = new Set();

  for (const calculator of calculators) {
    const result = validateCalculatorDefinition(calculator, validCategories);

    if (!result.valid) {
      const label = calculator && calculator.id ? calculator.id : "unknown";
      errors.push(...result.errors.map((message) => `${label}: ${message}`));
    }

    if (calculator?.id) {
      if (ids.has(calculator.id)) {
        errors.push(`Duplicate calculator id: ${calculator.id}`);
      }
      ids.add(calculator.id);
    }

    if (calculator?.slug) {
      if (slugs.has(calculator.slug)) {
        errors.push(`Duplicate calculator slug: ${calculator.slug}`);
      }
      slugs.add(calculator.slug);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    ids,
    slugs,
  };
}
