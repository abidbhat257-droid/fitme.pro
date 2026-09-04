import React from "react";
import { Link } from "react-router-dom";
import { CALCULATORS } from "@/lib/calculators";

const REMAINING_SEO_SLUGS = new Set([
  "calories-to-gain-1-kg", "obesity-class", "bmi-prime",
  "calorie-surplus", "weight-loss-calorie", "weight-gain-calorie", "exercise-calorie", "running-calorie", "cycling-calorie", "reverse-diet", "calorie-per-meal",
  "protein-per-meal", "protein-to-calorie-ratio", "macro-percentage", "carbohydrate", "fat-intake", "fiber-intake", "net-carbohydrate", "sodium-intake", "caffeine-intake", "micronutrient-intake", "daily-calorie-macro", "meal-macro",
  "running-speed", "pace-to-speed", "5k-time-predictor", "10k-time-predictor", "half-marathon-time-predictor", "marathon-time-predictor", "race-time", "running-split", "training-pace", "cardio-fitness-level", "aerobic-training-zone", "anaerobic-threshold", "fitness-age",
  "bench-press-1rm", "squat-1rm", "deadlift-1rm", "rep-max", "strength-level", "strength-to-weight-ratio", "training-volume", "wilks-score", "dots-score",
  "target-heart-rate", "resting-heart-rate", "heart-rate-reserve", "heart-rate-recovery", "pulse-pressure", "mean-arterial-pressure", "rate-pressure-product", "waist-circumference-health-risk"
]);

const CATEGORY_GUIDES = {
  calories: {
    why: "Calorie calculations help translate body size, activity, exercise, and goals into an estimated energy target. They are planning tools rather than direct measurements of metabolism.",
    factors: "Body size, activity, exercise intensity, food intake, sleep, illness, adaptation, and changes in body weight can affect energy needs.",
    reference: "Energy-balance guidance from NIH/NIDDK and general nutrition guidance from recognized public-health organizations are useful context."
  },
  nutrition: {
    why: "Nutrition calculations turn a daily energy or nutrient target into a practical number that can help with meal planning. The result is an estimate and should be considered alongside the overall diet.",
    factors: "Body size, age, activity, training, food choices, dietary pattern, health status, and the assumptions used by the calculator can change the result.",
    reference: "Use dietary reference information from NIH Office of Dietary Supplements, National Academies, and other recognized public-health sources."
  },
  running: {
    why: "Running calculations help athletes understand pace, speed, predicted race performance, training intensity, and endurance-related metrics.",
    factors: "Fitness, terrain, weather, elevation, fatigue, pacing strategy, distance, training history, and measurement method can affect performance.",
    reference: "Exercise guidance from ACSM and established running-performance research provides useful context for interpreting these estimates."
  },
  strength: {
    why: "Strength calculations provide standardized ways to estimate lifting performance, compare efforts, or organize training volume. They are most useful when the same testing method is used consistently.",
    factors: "Technique, exercise selection, range of motion, fatigue, equipment, training experience, body weight, and the prediction equation can change the result.",
    reference: "Strength and conditioning guidance from ACSM and established resistance-training research provides context for performance metrics."
  },
  heart: {
    why: "Heart-rate and cardiovascular calculations provide convenient estimates for exercise intensity or basic cardiovascular measurements. They should not be treated as a diagnosis.",
    factors: "Age, fitness, medications, hydration, temperature, stress, illness, exercise intensity, and measurement accuracy can influence heart-rate values.",
    reference: "AHA, ACSM, and other recognized cardiovascular and exercise-health guidance can provide appropriate clinical or training context."
  },
  general: {
    why: "This calculation converts measurable inputs into a standardized estimate that can support fitness, nutrition, or health-related planning.",
    factors: "Input quality, units, measurement technique, individual differences, and the assumptions built into the equation can affect the result.",
    reference: "Interpret the result with established public-health, clinical, or exercise-science guidance appropriate to the metric."
  }
};

function groupFor(slug) {
  if (/calorie|obesity|bmi-prime|weight/.test(slug)) return CATEGORY_GUIDES.calories;
  if (/protein|macro|carbohydrate|fat-intake|fiber|sodium|caffeine|micronutrient/.test(slug)) return CATEGORY_GUIDES.nutrition;
  if (/running|pace|5k|10k|marathon|race|training-pace|cardio-fitness|aerobic|anaerobic|fitness-age/.test(slug)) return CATEGORY_GUIDES.running;
  if (/1rm|rep-max|strength|training-volume|wilks|dots/.test(slug)) return CATEGORY_GUIDES.strength;
  if (/heart-rate|pulse-pressure|arterial-pressure|pressure-product|waist-circumference/.test(slug)) return CATEGORY_GUIDES.heart;
  return CATEGORY_GUIDES.general;
}

function relatedFor(calc) {
  const words = calc.slug.split("-");
  const candidates = CALCULATORS.filter((c) => c.slug !== calc.slug);
  const scored = candidates.map((c) => ({ c, score: words.filter((w) => c.slug.includes(w) && w.length > 2).length })).sort((a,b) => b.score - a.score);
  return scored.filter(x => x.score > 0).slice(0, 6).map(x => x.c);
}

function faqs(name, formula) {
  return [
    [`What is the ${name}?`, `The ${name} uses the inputs shown above to produce a calculated estimate. The exact method is summarized in the formula and calculation sections.`],
    ["What formula does FitMe Pro use?", formula ? `FitMe Pro displays this calculator's implemented method as: ${formula}.` : "FitMe Pro uses the calculation method implemented for this calculator and explains its assumptions on this page."],
    ["How accurate is the result?", "Accuracy depends on the quality of the inputs and how well the underlying equation represents an individual. A calculated result should be treated as an estimate."],
    ["Can I use this result for medical decisions?", "No. A calculator is an educational tool and should not replace individualized medical assessment or professional advice."],
    ["How often should I recalculate it?", "Recalculate when an important input changes or when you are tracking progress over time. For repeated measurements, use consistent conditions."],
    ["Why might another calculator give a different answer?", "Different calculators can use different equations, assumptions, units, rounding rules, or reference populations. Compare methods before comparing numbers."],
    ["What inputs matter most?", "The most important inputs are the variables used directly by the underlying equation. Enter them carefully and use consistent units."],
    ["What should I do with the result?", "Use it as one piece of information alongside your goals, trends, performance, and other relevant measurements rather than as an absolute judgment."]
  ];
}

export default function RemainingSEOContent({ calc }) {
  if (!calc || !REMAINING_SEO_SLUGS.has(calc.slug)) return null;
  const guide = groupFor(calc.slug);
  const related = relatedFor(calc);
  const formula = calc.formula || "the calculator's implemented equation";
  const name = calc.name;
  const exampleInputs = (calc.requires || []).join(", ") || "the inputs displayed in the calculator";
  const faqsList = faqs(name, formula);
  return (
    <div className="space-y-8">
      <section>
        <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight mb-3">What Is {name}?</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">{name} is a FitMe Pro calculation designed to turn a defined set of inputs into a useful estimate. This page explains the method, inputs, interpretation, limitations, and practical use so the number can be understood rather than viewed in isolation.</p>
      </section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Why This Calculation Matters</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{guide.why}</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Quick Answer</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">To use the {name}, enter the requested values using the units shown, calculate the result, and interpret it using the guidance below. The output is an estimate generated from the calculator's stated method.</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">What Does My Result Mean?</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">Your result represents the mathematical output of the selected inputs and formula. It is most useful when compared with the relevant reference range, training target, personal baseline, or goal described for this metric—not as a standalone diagnosis or guarantee.</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Formula</h3><p className="text-sm sm:text-base text-muted-foreground leading-8 font-mono break-words">{formula}</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">How It Is Calculated</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">The calculator validates the required inputs, applies the implemented equation or method, and formats the resulting value for display. Where a prediction equation is used, the output is an estimate rather than a direct laboratory or clinical measurement.</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Inputs Explained</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">This calculator uses: <strong>{exampleInputs}</strong>. Enter measurements carefully, keep units consistent, and avoid guessing when a reliable measurement is available.</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Result Interpretation</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">Interpretation depends on the purpose of the metric. Performance values can be compared with training benchmarks, nutrition values with appropriate dietary targets, and health measurements with established clinical or public-health guidance. Context matters.</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Worked Example</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">For an example, enter realistic values for {exampleInputs}, then apply <span className="font-mono">{formula}</span>. The calculator performs the arithmetic automatically. Change one input at a time to see which variables drive the output.</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Factors That Affect Your Result</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{guide.factors}</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Accuracy &amp; Limitations</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">No formula can capture every individual difference. Rounding, measurement error, changing conditions, and differences between equations can all affect the output. Use consistent inputs when tracking trends and avoid interpreting small changes as meaningful when they may be normal measurement variation.</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Frequently Asked Questions</h3><div className="space-y-5">{faqsList.map(([q,a]) => <div key={q}><h4 className="font-semibold mb-1">{q}</h4><p className="text-sm text-muted-foreground leading-7">{a}</p></div>)}</div></section>
      {related.length > 0 && <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-4">Related Calculators</h3><div className="grid sm:grid-cols-2 gap-2">{related.map((item) => <Link key={item.slug} to={`/${item.slug}-calculator`} className="border border-border px-4 py-3 text-sm font-bold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors">{item.name}</Link>)}</div></section>}
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Related FitMe Pro Guides</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">Use this calculator together with related FitMe Pro measurements and calculators to build a broader picture. Comparing complementary metrics is generally more informative than relying on a single number.</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Scientific / Official References</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{guide.reference} FitMe Pro uses original explanatory text and does not reproduce competitor articles. Reference material should be reviewed for the population, protocol, and assumptions that apply to a particular metric.</p></section>
      <section className="border border-border p-6 bg-card"><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Medical Disclaimer</h3><p className="text-sm text-muted-foreground leading-7">FitMe Pro calculators are educational tools. They do not diagnose, treat, prevent, or rule out medical conditions and should not replace advice from a qualified healthcare professional. For symptoms, abnormal measurements, medication decisions, or other medical concerns, seek individualized professional guidance.</p></section>
    </div>
  );
}
