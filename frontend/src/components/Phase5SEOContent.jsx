import React from "react";
import { Link } from "react-router-dom";
import { QUESTION_BANK_FAQS } from "@/lib/questionBankFAQs";

const DATA = {
  "adjusted-body-weight": {
    title: "Adjusted Body Weight Calculator",
    quick: "AdjBW is an estimate used in some dosing protocols when a person’s measured mass is well above the reference value. FitMe Pro applies the Devine method with a 0.4 correction factor.",
    formula: "AdjBW = IBW + 0.4 × (measured mass − IBW)",
    method: [
      "Estimate ideal body weight with the Devine equation.",
      "Subtract ideal body weight from actual body weight to find the excess weight.",
      "Multiply that difference by 0.4.",
      "Add the adjusted amount to ideal body weight."
    ],
    inputs: ["Height", "Weight", "Sex"],
    meaning: "The result is a calculated dosing weight, not a recommended body weight or fitness target.",
    example: "For a 175 cm male weighing 120 kg, first estimate Devine IBW, then add 40% of the difference between actual weight and IBW.",
    factors: "The result changes with height, sex category, actual weight, the selected IBW equation, and the correction factor used by a particular clinical protocol.",
    limitations: "Adjusted body weight is protocol-dependent. Different drugs, institutions, populations, and guidelines may use different dosing-weight approaches. It should never be used to choose or change medication doses without qualified clinical guidance.",
    faqs: QUESTION_BANK_FAQS["adjusted-body-weight"],
    related: [["Ideal Body Weight", "ideal-body-weight"], ["Healthy Weight Range", "healthy-weight-range"], ["BMI", "bmi"], ["Body Surface Area", "body-surface-area"]],
    references: "Clinical use should follow current medication-specific guidance and institutional protocols. The calculation shown here documents the formula implemented by FitMe Pro; it is not a prescribing recommendation."
  },
  "target-weight": {
    title: "Target Weight Calculator",
    quick: "A target-weight calculator estimates a future body weight from a starting weight and a chosen goal. The number is a planning input, not a medically required weight.",
    formula: "Target Weight = the goal weight entered by the user; Weight Change = Target Weight − Current Weight",
    method: ["Enter current weight.", "Enter the desired target weight.", "Calculate the difference between target and current weight.", "Use the difference to plan progress while monitoring real-world trends."],
    inputs: ["Current Weight", "Target Weight"],
    meaning: "A lower target than current weight represents weight loss; a higher target represents weight gain. The calculator does not determine whether a target is appropriate.",
    example: "If current weight is 85 kg and target weight is 75 kg, the planned change is −10 kg.",
    factors: "Starting body composition, health status, activity, nutrition, age, medications, adherence, water balance, and the chosen target all affect whether and how quickly a target is reached.",
    limitations: "Scale weight changes are not perfectly linear. A target should be evaluated alongside health, body composition, performance, and clinical context rather than treated as a guaranteed endpoint.",
    faqs: QUESTION_BANK_FAQS["target-weight"],
    related: [["Healthy Weight Range", "healthy-weight-range"], ["Ideal Body Weight", "ideal-body-weight"], ["Weight Loss Goal", "weight-loss-goal"], ["Weight Gain Goal", "weight-gain-goal"]],
    references: "For adult weight assessment, BMI and waist measures are screening tools rather than complete definitions of individual health. FitMe Pro presents target weight as a planning value, not a medical prescription."
  },
  "target-weight-bmi": {
    title: "Target Weight by BMI Calculator",
    quick: "This calculator converts a chosen adult BMI into the corresponding weight for a given height using the BMI equation. It can show what weight corresponds to a BMI target, but it does not establish that target as medically appropriate.",
    formula: "Weight (kg) = Target BMI × Height (m)²",
    method: ["Enter height.", "Choose or enter a target BMI.", "Convert height to meters and square it.", "Multiply height squared by the target BMI."],
    inputs: ["Height", "Target BMI"],
    meaning: "The result is the body weight mathematically associated with the selected BMI at the entered height. Adult BMI categories are screening references, not diagnoses.",
    example: "At 1.75 m, a BMI target of 22 corresponds to 22 × 1.75² = about 67.4 kg.",
    factors: "Height and the selected BMI determine the mathematical result. Individual interpretation also depends on muscle mass, fat distribution, age, pregnancy status, and health context.",
    limitations: "BMI cannot distinguish fat from muscle and does not describe fat distribution. Adult BMI thresholds are not intended to be applied to children in the same way, and BMI-based targets may be inappropriate for some individuals.",
    faqs: QUESTION_BANK_FAQS["target-weight-bmi"],
    related: [["BMI", "bmi"], ["Healthy Weight Range", "healthy-weight-range"], ["Ideal Body Weight", "ideal-body-weight"], ["Target Weight", "target-weight"]],
    references: "CDC and WHO describe BMI as a screening measure used to classify weight status in adults. FitMe Pro uses the standard BMI relationship to translate a selected BMI into a corresponding weight."
  },
  "weight-loss-percentage": {
    title: "Weight Loss Percentage Calculator",
    quick: "Weight-loss percentage shows how much weight has been lost relative to the starting weight. It is useful for describing change proportionally rather than only in kilograms or pounds.",
    formula: "Weight Loss % = (Starting Weight − Current Weight) ÷ Starting Weight × 100",
    method: ["Record starting weight.", "Record current weight.", "Subtract current weight from starting weight.", "Divide by starting weight and multiply by 100."],
    inputs: ["Starting Weight", "Current Weight"],
    meaning: "A positive percentage means the current weight is lower than the starting weight. For example, losing 5 kg from 100 kg is a 5% weight reduction.",
    example: "Starting at 100 kg and reaching 92 kg gives (100 − 92) ÷ 100 × 100 = 8% weight loss.",
    factors: "The percentage depends entirely on the starting and current measurements. Hydration, glycogen, food contents, measurement timing, and body-composition changes can influence scale weight.",
    limitations: "Percentage change describes scale weight, not necessarily fat loss. Short-term fluctuations can be substantial, so trends over repeated measurements are more informative than a single reading.",
    faqs: QUESTION_BANK_FAQS["weight-loss-percentage"],
    related: [["Weight Change", "weight-change"], ["Weight Loss Goal", "weight-loss-goal"], ["Healthy Weight Range", "healthy-weight-range"], ["Calorie Deficit", "calorie-deficit"]],
    references: "Percentage weight change is a mathematical description of body-weight change. Clinical interpretation depends on the reason for the change, timeframe, health status, and broader measures of nutrition and health."
  },
  "weight-gain-percentage": {
    title: "Weight Gain Percentage Calculator",
    quick: "Weight-gain percentage shows how much body weight has increased relative to a starting weight. It is a simple way to express weight change proportionally.",
    formula: "Weight Gain % = (Current Weight − Starting Weight) ÷ Starting Weight × 100",
    method: ["Record starting weight.", "Record current weight.", "Subtract starting weight from current weight.", "Divide by starting weight and multiply by 100."],
    inputs: ["Starting Weight", "Current Weight"],
    meaning: "A positive percentage indicates that current weight is above starting weight. For example, increasing from 60 kg to 63 kg is a 5% increase.",
    example: "Starting at 60 kg and reaching 63 kg gives (63 − 60) ÷ 60 × 100 = 5% weight gain.",
    factors: "Hydration, glycogen, food contents, fat mass, lean tissue, training, nutrition, and measurement conditions can all contribute to changes in scale weight.",
    limitations: "Weight gain percentage does not identify what tissue was gained. Rapid short-term increases can reflect fluid or glycogen rather than equivalent increases in muscle or fat.",
    faqs: QUESTION_BANK_FAQS["weight-gain-percentage"],
    related: [["Weight Change", "weight-change"], ["Weight Gain Goal", "weight-gain-goal"], ["Protein", "protein"], ["Macro Calculator", "macro-calculator"]],
    references: "Percentage weight change is a mathematical measure. Whether weight gain is desirable depends on health status, nutrition, body composition, training goals, and clinical context."
  }
};

function FAQ({ items }) {
  return <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Frequently Asked Questions</h3><div className="space-y-4">{items.map(([q,a]) => <div key={q} className="border-b border-border pb-4"><h4 className="font-bold text-sm mb-2">{q}</h4><p className="text-sm text-muted-foreground leading-7">{a}</p></div>)}</div></section>;
}

export default function Phase5SEOContent({ slug }) {
  const d = DATA[slug];
  if (!d) return null;
  return <div className="space-y-6">
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">What Does My Result Mean?</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d.meaning}</p></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Quick Answer</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d.quick}</p></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Formula</h3><pre className="font-mono-data text-sm bg-card border border-border p-4 whitespace-pre-wrap">{d.formula}</pre></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">How It Is Calculated</h3><ol className="space-y-3">{d.method.map((x,i)=><li key={i} className="flex gap-3 text-sm sm:text-base text-muted-foreground leading-7"><span className="font-mono-data text-xs bg-[var(--brand-lime)] text-black px-2 py-0.5 h-fit">{String(i+1).padStart(2,"0")}</span><span>{x}</span></li>)}</ol></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Inputs Explained</h3><div className="grid sm:grid-cols-3 gap-2">{d.inputs.map(x=><div key={x} className="border border-border px-4 py-3 text-sm font-bold">{x}</div>)}</div></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Result Interpretation</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d.meaning}</p></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Worked Example</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d.example}</p></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Factors That Affect Your Result</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d.factors}</p></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Accuracy &amp; Limitations</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d.limitations}</p></section>
    <FAQ items={d.faqs}/>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Related Calculators</h3><div className="grid sm:grid-cols-2 gap-2">{d.related.map(([name,s])=><Link key={s} to={`/${s}-calculator`} className="border border-border px-4 py-3 text-sm font-bold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors">{name}</Link>)}</div></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Related FitMe Pro Guides</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Explore the related calculators above alongside FitMe Pro’s educational Journal for practical guidance on body composition, nutrition, weight management, and fitness. Educational guides provide context and do not replace professional care.</p><Link to="/journal" className="inline-block mt-3 text-sm font-bold underline hover:text-[var(--brand-lime)]">Explore FitMe Pro Journal</Link></section>
    <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">Scientific / Official References</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d.references}</p></section>
    <section className="border border-border bg-card p-6"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Medical Disclaimer</h3><p className="text-sm text-muted-foreground leading-7">FitMe Pro calculators provide educational estimates and mathematical calculations. They do not diagnose disease, prescribe treatment, or determine medication doses. For medication dosing, unexplained weight change, or health decisions, consult a qualified healthcare professional.</p></section>
  </div>;
}

export const PHASE5_SEO_SLUGS = new Set(Object.keys(DATA));
