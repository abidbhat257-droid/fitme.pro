import React from "react";
import { Link } from "react-router-dom";

const humanize = (key) => ({
  height: "height",
  weight: "body weight",
  age: "age",
  sex: "sex",
  activity: "activity level",
  waist: "waist circumference",
  neck: "neck circumference",
  hip: "hip circumference",
  heightCm: "height",
  weightKg: "body weight",
  waistCm: "waist circumference",
  neckCm: "neck circumference",
  hipCm: "hip circumference",
}[key] || String(key).replace(/([A-Z])/g, " $1").toLowerCase());

const categoryWhy = {
  "Body Composition": "Body-composition estimates can add context to body weight alone. Looking at more than one metric can help you understand how an equation describes size, fat mass, lean mass or body proportions.",
  "Body Composition & Measurements": "Body measurements can provide useful context alongside body weight and other fitness measures. Because most calculator outputs are estimates, consistent measurement technique matters.",
  "Weight, BMI & Weight Goals": "Weight-related calculations are planning tools. They can help quantify change, compare scenarios and set measurable goals without treating a single number as a complete measure of health.",
  "Calories & Metabolism": "Energy calculations help estimate a starting point for daily intake, maintenance, weight change or exercise expenditure. Real-world energy needs vary, so results are best treated as estimates that can be checked against trends.",
  "Nutrition & Macronutrients": "Nutrition calculations turn body size, activity and dietary targets into practical numbers. They are useful for planning, but individual needs can differ because of age, health status, training and dietary context.",
  "Running, Cardio & Endurance": "Performance calculations can translate distance, time, pace, speed and physiological estimates into training information. Use them to guide training rather than as guarantees of race performance.",
  "Strength & Gym Performance": "Strength calculations provide standardized estimates that make training loads and performance easier to compare. An estimated value is not the same as a tested maximum and should be applied conservatively.",
  "Heart Rate & Cardiovascular Metrics": "Heart-rate and cardiovascular calculations provide context for exercise and basic monitoring. Individual physiology, medications, fitness level and measurement conditions can affect results.",
  "Nutrition & Fitness": "Fitness and nutrition calculations are most useful when they are combined with consistent inputs and realistic goals. Treat calculated values as starting estimates rather than prescriptions.",
  "Running & Training": "Training calculations help convert performance data into repeatable targets. Conditions, fatigue, terrain and experience can all affect actual performance.",
  "Strength Training": "Strength estimates can help standardize training intensity and track progress over time. Use appropriate safety margins because an equation cannot account for every individual factor.",
};

function defaultExample(calc) {
  if (calc.inputFields?.length) {
    return calc.inputFields.slice(0, 4).map((f) => `${f.label.replace(/\s*\/.*$/, "")}: ${f.default ?? "example value"}`).join("; ");
  }
  if (calc.requires?.length) return calc.requires.map(humanize).join(", ");
  return "the inputs shown on this page";
}

function faqFor(calc) {
  const inputs = calc.requires?.length ? calc.requires.map(humanize).join(", ") : "the values requested by the calculator";
  return [
    [`What does the ${calc.name} calculate?`, `The ${calc.name} applies the method shown on this page to estimate or calculate a specific health, nutrition or fitness metric. The result should be interpreted in the context of its inputs and limitations.`],
    [`How does the ${calc.name} work?`, `Enter the required values, then FitMe Pro applies the displayed formula or calculation method. The result updates when the inputs change.`],
    [`What inputs do I need for the ${calc.name}?`, `This calculator uses ${inputs}. If additional fields are shown, enter those values as well and keep your measurement method consistent.`],
    [`How accurate is the ${calc.name}?`, `Accuracy depends on the equation, the quality of your inputs and individual variation. A calculated estimate should not be treated as a direct measurement or diagnosis.`],
    [`Why can another calculator give a different result?`, `Different tools may use different equations, reference populations, assumptions, units or rounding rules. Compare the stated methodology before comparing results.`],
    [`Can I use this calculator to track progress?`, `Yes. For many fitness measures, repeated calculations under similar conditions are more useful than reacting to a single result. Track trends alongside other relevant measures.`],
    [`Is the ${calc.name} free?`, `Yes. FitMe Pro provides its health and fitness calculators free to use in the browser.`],
    [`Can this result diagnose a health condition?`, `No. FitMe Pro calculators are educational tools. They do not diagnose disease or replace assessment from a qualified healthcare professional.`],
  ];
}

export default function CalculatorSEOGuide({ calc, related = [], showFaq = true }) {
  if (!calc) return null;
  const why = categoryWhy[calc.category] || "This calculator provides a structured way to turn the available inputs into a useful health or fitness estimate. Use the result as one piece of information rather than as a standalone measure of health.";
  const example = defaultExample(calc);
  const faqs = faqFor(calc);

  return (
    <article className="mt-10 max-w-4xl border-t border-border pt-10 space-y-8" data-testid="calculator-seo-guide">
      <section>
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">Complete Guide</div>
        <h2 className="font-display text-3xl uppercase tracking-tighter">What Is the {calc.name}?</h2>
        <p className="mt-4 text-sm leading-8 text-muted-foreground">The {calc.name.toLowerCase()} is a calculation tool for {calc.description?.toLowerCase() || "estimating a health or fitness metric"}. FitMe Pro shows the method, inputs and interpretation so you can understand what the number represents instead of treating it as a diagnosis.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Why This Calculation Matters</h2>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">{why}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Inputs and Measurement Guide</h2>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">For an example, use {example}. Enter measurements in the units displayed by the calculator and avoid mixing units. When a body measurement is required, measure it consistently and under similar conditions when you are tracking change over time.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">The Formula Explained</h2>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap border border-border bg-card p-4 font-mono-data text-sm">{calc.formula || "The calculation method is applied from the inputs described above."}</pre>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">The formula identifies which inputs influence the result. If an equation is used, it represents a model derived from a reference population or established method; it does not capture every aspect of an individual person.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Worked Example</h2>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">Start with a consistent set of example inputs: {example}. Apply the formula shown above and keep the same units throughout the calculation. The calculator performs the arithmetic automatically, while the formula lets you understand how the result is produced.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">How to Interpret Your Result</h2>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">Interpret the result according to the reference range, category or explanation supplied by the calculator. A single calculated value rarely describes overall health or fitness. Consider your goal, measurement quality, trends over time and other relevant metrics before drawing conclusions.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Accuracy and Limitations</h2>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">Most health and fitness calculators estimate rather than directly measure. Accuracy can be affected by measurement error, equation choice, population differences, body composition, activity level and other factors. Two valid equations can therefore produce different results. Do not use a calculator result as a medical diagnosis.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Common Mistakes to Avoid</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
          <li>Entering an estimated input when a reliable measurement is available.</li>
          <li>Mixing metric and imperial units or using the wrong conversion.</li>
          <li>Changing measurement technique between progress checks.</li>
          <li>Comparing results from different formulas without checking their assumptions.</li>
          <li>Treating an estimate as more precise than the underlying method allows.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Using the Result Responsibly</h2>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">Use the result as a planning or tracking signal, not as a verdict about your health. For goals such as weight management or training, combine the calculation with sustainable habits and real-world feedback. If the result relates to a medical concern, medication, symptoms or a diagnosed condition, discuss it with a qualified healthcare professional.</p>
      </section>

      {related.length > 0 && (
        <section className="border border-border bg-card p-6">
          <h2 className="font-display text-2xl uppercase tracking-tight">Related Calculators</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">These calculators provide complementary information and can help put this result in context.</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {related.map((item) => <Link key={item.id} to={`/${item.slug}`} className="border border-border px-4 py-3 text-sm font-bold hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]">{item.name}</Link>)}
          </div>
        </section>
      )}

      {showFaq && (
        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight mb-5">Frequently Asked Questions</h2>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map(([q, a]) => <details key={q} className="group py-4"><summary className="cursor-pointer list-none pr-6 text-sm font-bold leading-6">{q}</summary><p className="mt-3 text-sm leading-7 text-muted-foreground">{a}</p></details>)}
          </div>
        </section>
      )}
    </article>
  );
}
