import React from "react";
import { Link } from "react-router-dom";
import { getExpansionSections } from "@/lib/longFormExpansion";
import { CALCULATORS } from "@/lib/calculators";
import BMISEOContent from "@/components/BMISEOContent";
import CompositionSEOContent from "@/components/CompositionSEOContent";
import Phase1SEOContent from "@/components/Phase1SEOContent";
import Phase2SEOContent from "@/components/Phase2SEOContent";
import Phase3SEOContent from "@/components/Phase3SEOContent";
import Phase4SEOContent from "@/components/Phase4SEOContent";
import Phase5SEOContent from "@/components/Phase5SEOContent";
import Phase6SEOContent from "@/components/Phase6SEOContent";
import RemainingSEOContent from "@/components/RemainingSEOContent";
import SEOPageCompleteness from "@/components/SEOPageCompleteness";

const PHASE1_SEO_SLUGS = new Set(["daily-calorie-needs", "bmr", "ideal-body-weight", "tdee", "maintenance-calories"]);
const PHASE2_SEO_SLUGS = new Set(["calorie", "body-fat", "calorie-deficit", "calories-burned", "water-intake"]);
const PHASE3_SEO_SLUGS = new Set(["protein", "pace", "one-rep-max", "maximum-heart-rate", "heart-rate-zone"]);
const PHASE4_SEO_SLUGS = new Set(["walking-calories", "macro-calculator", "vo2-max", "healthy-weight-range", "body-surface-area"]);
const PHASE5_SEO_SLUGS = new Set(["adjusted-body-weight", "target-weight", "target-weight-bmi", "weight-loss-percentage", "weight-gain-percentage"]);
const PHASE6_SEO_SLUGS = new Set(["weight-change", "weight-loss-timeline", "goal-weight-date", "weekly-weight-loss", "calories-to-lose-kg"]);
const REMAINING_SEO_SLUGS = new Set([
  "calories-to-gain-1-kg", "obesity-class", "bmi-prime", "calorie-surplus", "weight-loss-calorie", "weight-gain-calorie", "exercise-calorie", "running-calorie", "cycling-calorie", "reverse-diet", "calorie-per-meal",
  "protein-per-meal", "protein-to-calorie-ratio", "macro-percentage", "carbohydrate", "fat-intake", "fiber-intake", "net-carbohydrate", "sodium-intake", "caffeine-intake", "micronutrient-intake", "daily-calorie-macro", "meal-macro",
  "running-speed", "pace-to-speed", "5k-time-predictor", "10k-time-predictor", "half-marathon-time-predictor", "marathon-time-predictor", "race-time", "running-split", "training-pace", "cardio-fitness-level", "aerobic-training-zone", "anaerobic-threshold", "fitness-age",
  "bench-press-1rm", "squat-1rm", "deadlift-1rm", "rep-max", "strength-level", "strength-to-weight-ratio", "training-volume", "wilks-score", "dots-score",
  "target-heart-rate", "resting-heart-rate", "heart-rate-reserve", "heart-rate-recovery", "pulse-pressure", "mean-arterial-pressure", "rate-pressure-product", "waist-circumference-health-risk"
]);
const COMPOSITION_SEO_SLUGS = new Set([
  "body-fat", "lean-body-mass", "fat-mass", "fat-free-mass", "relative-fat-mass",
  "body-adiposity-index", "fat-mass-index", "fat-free-mass-index", "waist-to-hip-ratio",
  "waist-to-height-ratio", "a-body-shape-index", "body-roundness-index", "conicity-index",
  "ponderal-index", "body-density", "body-surface-area", "body-frame-size",
  "total-body-water", "skeletal-muscle-mass",
]);
const HEADINGS = [
  "What Is {name}?", "Why This Calculation Matters", "Inputs and Measurement Guide", "The Formula Explained",
  "How to Interpret Your Result", "Accuracy and What Can Affect It", "Common Mistakes to Avoid",
  "Using the Result for Fitness Planning", "Related Health and Body-Composition Measures", "Tracking Changes Over Time",
  "When to Seek Professional Guidance", "Key Takeaways", "Understanding the Calculation as a Model", "Getting Better Inputs",
  "Units and Conversion", "Why Trends Matter More Than One Reading", "Understanding Reference Ranges",
  "Combining Complementary Measures", "What Changes During Weight Loss", "What Changes During Weight Gain",
  "Mathematical Precision vs Biological Precision", "Why Different Equations Disagree", "Turning the Number Into a Practical Decision",
  "Using Numbers Without Obsessing Over Them", "What to Look for in a Quality Calculator", "Final Takeaways",
];
function formatHeading(template, name) { return template.replace("{name}", name); }
function exampleFor(calc) {
  const required = calc?.requires || [];
  const values = { age: 30, heightCm: 175, weightKg: 70, waistCm: 82, hipCm: 96, neckCm: 38, wristCm: 17, activity: "moderate", sex: "male" };
  const labels = { age: "age", heightCm: "height", weightKg: "weight", waistCm: "waist", hipCm: "hip", neckCm: "neck", wristCm: "wrist", activity: "activity level", sex: "sex" };
  const units = { heightCm: "cm", weightKg: "kg", waistCm: "cm", hipCm: "cm", neckCm: "cm", wristCm: "cm" };
  return required.map((key) => `${labels[key] || key}: ${values[key] ?? "example value"}${units[key] ? ` ${units[key]}` : ""}`).join(", ") || "the example values shown in the calculator inputs";
}
export default function LongFormArticle({ content, calc }) {
  if (!content) return null;
  const isDedicatedPhase1 = PHASE1_SEO_SLUGS.has(calc?.slug);
  const isDedicatedPhase2 = PHASE2_SEO_SLUGS.has(calc?.slug);
  const isDedicatedPhase3 = PHASE3_SEO_SLUGS.has(calc?.slug);
  const isDedicatedPhase4 = PHASE4_SEO_SLUGS.has(calc?.slug);
  const isDedicatedPhase5 = PHASE5_SEO_SLUGS.has(calc?.slug);
  const isDedicatedPhase6 = PHASE6_SEO_SLUGS.has(calc?.slug);
  const isDedicatedRemaining = REMAINING_SEO_SLUGS.has(calc?.slug);
  const isDedicatedComposition = COMPOSITION_SEO_SLUGS.has(calc?.slug);
  const hasDedicatedSEO = isDedicatedComposition || isDedicatedPhase1 || isDedicatedPhase2 || isDedicatedPhase3 || isDedicatedPhase4 || isDedicatedPhase5 || isDedicatedPhase6 || isDedicatedRemaining || calc?.slug === "bmi";
  const sections = hasDedicatedSEO ? [] : [...(content.sections || []), ...getExpansionSections(content)];
  const relatedNames = content.related || [];
  const relatedLinks = relatedNames.map((name) => { const found = CALCULATORS.find((item) => item.name === name); return found ? { name, slug: found.slug } : null; }).filter(Boolean);
  const name = content.name || calc?.name || "This Calculator";
  const example = exampleFor(calc);
  return (
    <article className="border-t border-border pt-10 mt-2 space-y-8" data-testid="long-form-seo-content">
      <header>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)] mb-2">Complete Guide</div>
        <h2 className="font-display text-3xl uppercase tracking-tighter leading-tight">{name}</h2>
        <p className="mt-4 text-base text-muted-foreground leading-8">This guide explains how the calculation works, what the result can tell you, how to measure inputs consistently, and how to use the number responsibly.</p>
      </header>
      {calc?.slug === "bmi" && <BMISEOContent />}
      {isDedicatedPhase6 && <Phase6SEOContent slug={calc.slug} />}
      {isDedicatedPhase5 && <Phase5SEOContent slug={calc.slug} />}
      {isDedicatedPhase4 && <Phase4SEOContent slug={calc.slug} />}
      {isDedicatedPhase3 && <Phase3SEOContent slug={calc.slug} />}
      {isDedicatedPhase2 && <Phase2SEOContent slug={calc.slug} />}
      {!isDedicatedPhase2 && !isDedicatedPhase3 && !isDedicatedPhase4 && !isDedicatedPhase5 && !isDedicatedPhase6 && !isDedicatedRemaining && isDedicatedComposition && <CompositionSEOContent slug={calc.slug} />}
      {isDedicatedPhase1 && <Phase1SEOContent slug={calc.slug} />}
      {isDedicatedRemaining && <RemainingSEOContent calc={calc} />}
      {hasDedicatedSEO && <SEOPageCompleteness slug={calc?.slug} />}
      {!hasDedicatedSEO && <section className="border border-border bg-card p-6"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Worked Example</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">For a practical example, start with {example}. Apply the formula or method shown on this page using the same units throughout. The calculator performs the arithmetic automatically, while the displayed method lets you verify which inputs drive the result. This example is for understanding the calculation, not a health recommendation.</p></section>}
      {!hasDedicatedSEO && <div className="space-y-8">{sections.map((text, index) => { const heading = formatHeading(HEADINGS[index % HEADINGS.length], name); return <section key={`${index}-${heading}`}><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">{heading}</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{text}</p></section>; })}</div>}
      {relatedLinks.length > 0 && !hasDedicatedSEO && <section className="border border-border bg-card p-6"><h3 className="font-display text-xl uppercase tracking-tight mb-4">Related Calculators</h3><div className="grid sm:grid-cols-2 gap-2">{relatedLinks.map((item) => <Link key={item.slug} to={`/${item.slug}-calculator`} className="border border-border px-4 py-3 text-sm font-bold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors">{item.name}</Link>)}</div></section>}
      {!hasDedicatedSEO && <section className="border border-border p-6 bg-card"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Important Health Note</h3><p className="text-sm text-muted-foreground leading-7">FitMe Pro calculators provide educational estimates. They do not diagnose disease, replace clinical assessment, or guarantee a particular health or fitness outcome. If a result is unexpected, concerning, or relevant to a medical condition, discuss it with a qualified healthcare professional.</p></section>}
    </article>
  );
}
