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

export default function CalculatorSEOGuide({ calc, related = [], showFaq = true, result = null, faqs: faqItems = null }) {
  if (!calc) return null;
  const why = categoryWhy[calc.category] || "This calculator provides a structured way to turn the available inputs into a useful health or fitness estimate. Use the result as one piece of information rather than as a standalone measure of health.";
  const example = defaultExample(calc);
  const faqs = faqItems || faqFor(calc);

  return (
    <article className="mt-10 max-w-4xl border-t border-border pt-10 space-y-6" data-testid="calculator-seo-guide">
      <section>
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">Complete Guide</div>
        <h2 className="font-display text-3xl uppercase tracking-tighter">What Is the {calc.name}?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The {calc.name.toLowerCase()} is a calculation tool for {calc.description?.toLowerCase() || "estimating a health or fitness metric"}. FitMe Pro shows the method, inputs and interpretation so you can understand what the number represents instead of treating it as a diagnosis.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Why This Calculation Matters</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{why}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Inputs and Measurement Guide</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">For an example, use {example}. Enter measurements in the units displayed by the calculator and avoid mixing units. When a body measurement is required, measure it consistently and under similar conditions when you are tracking change over time.</p>
      </section>

      <section>
      {calc.id === "vo2-max-calculator" && <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Named Field-Test Methods</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The calculator uses the Cooper 12-minute running/walking field test. The published Cooper equation is VO₂ max ≈ (distance in metres − 504.9) ÷ 44.73. Another established field protocol is the Rockport One-Mile Walk test, which uses a one-mile walk plus participant characteristics to estimate aerobic capacity; it is not the equation implemented by this calculator.</p>
        <div className="mt-4 overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr><th className="border border-border p-2 text-left">Method</th><th className="border border-border p-2 text-left">What it uses</th><th className="border border-border p-2 text-left">FitMe Pro uses it?</th></tr></thead><tbody><tr><td className="border border-border p-2">Cooper (1968)</td><td className="border border-border p-2">12-minute distance</td><td className="border border-border p-2">Yes</td></tr><tr><td className="border border-border p-2">Rockport (1991)</td><td className="border border-border p-2">1-mile walk, time, heart rate and participant data</td><td className="border border-border p-2">No</td></tr></tbody></table></div>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">References: Cooper KH, <em>A Means of Assessing Maximal Oxygen Intake</em> (1968); Kline GM et al., Rockport One-Mile Walking Test (1991). Field-test equations estimate aerobic capacity and should not be treated as laboratory measurements.</p>
        <h3 className="mt-6 font-display text-xl uppercase tracking-tight">General Reference Context</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">VO₂ max reference values vary substantially with age, sex, training status and the reference population. Use age- and sex-specific normative tables from a defined population when making a comparison; a single universal “normal” range is misleading. The FitMe Pro value is an estimate, not a medical fitness diagnosis.</p>
      </section>}
      {(calc.id === "target-heart-rate-calculator" || calc.id === "aerobic-training-zone-calculator") && <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Five Named Heart-Rate Zones</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">These zones use the Karvonen heart-rate-reserve approach. First estimate HRmax as 220 − age, then HRR = HRmax − resting heart rate, and target HR = resting heart rate + HRR × intensity. The named ranges below are training guides, not medical limits.</p>
        <div className="mt-4 overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr><th className="border border-border p-2 text-left">Zone</th><th className="border border-border p-2 text-left">HRR intensity</th><th className="border border-border p-2 text-left">Purpose</th></tr></thead><tbody><tr><td className="border border-border p-2">Recovery</td><td className="border border-border p-2">50–60%</td><td className="border border-border p-2">Easy movement and recovery</td></tr><tr><td className="border border-border p-2">Fat-burning</td><td className="border border-border p-2">60–70%</td><td className="border border-border p-2">Easy-to-moderate aerobic work</td></tr><tr><td className="border border-border p-2">Cardio</td><td className="border border-border p-2">70–80%</td><td className="border border-border p-2">Moderate aerobic training</td></tr><tr><td className="border border-border p-2">Threshold</td><td className="border border-border p-2">80–90%</td><td className="border border-border p-2">Hard sustained work</td></tr><tr><td className="border border-border p-2">Peak</td><td className="border border-border p-2">90–100%</td><td className="border border-border p-2">Very hard efforts</td></tr></tbody></table></div>
        <h3 className="mt-6 font-display text-xl uppercase tracking-tight">How to Measure Resting Heart Rate</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Measure when you are rested, ideally after waking or after several quiet minutes. Sit or lie still, avoid recent exercise and caffeine when practical, and use the same device or pulse method each time. Repeated readings under similar conditions are more useful than one isolated value.</p>
      </section>}
      {calc.id === "anaerobic-threshold-calculator" && <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Understanding the Threshold Estimate</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">This calculator estimates threshold heart rate as a selected percentage of maximum heart rate. That is a simplified training estimate, not a direct lactate or ventilatory-threshold measurement. A laboratory test or validated field protocol can produce a more individualized threshold estimate.</p>
      </section>}
      {calc.id === "bench-press-1rm-calculator" && (() => {
        const load = Number(calc.inputFields?.find(f => f.name === "load")?.default || 60);
        const reps = Number(calc.inputFields?.find(f => f.name === "reps")?.default || 8);
        const epley = load * (1 + Math.min(30, reps) / 30);
        const brzycki = reps < 37 ? load * 36 / (37 - reps) : NaN;
        const lombardi = load * Math.pow(reps, 0.10);
        const methods = [["Epley", epley],["Brzycki", brzycki],["Lombardi", lombardi]];
        const pct = [100,95,90,85,80,75,70,65,60,55,50];
        return <section>
          <h2 className="font-display text-2xl uppercase tracking-tight">1RM Methods Compared</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">FitMe Pro calculates the primary estimate with Epley. Brzycki and Lombardi are useful comparison equations. For the default example of {load} kg × {reps} reps, the three estimates are shown below.</p>
          <div className="mt-4 overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr><th className="border border-border p-2 text-left">Method</th><th className="border border-border p-2 text-right">Estimated 1RM</th></tr></thead><tbody>{methods.map(([name,value])=><tr key={name}><td className="border border-border p-2">{name}</td><td className="border border-border p-2 text-right">{Number.isFinite(value) ? value.toFixed(1) : "Not suitable"} kg</td></tr>)}</tbody></table></div>
          <h3 className="mt-6 font-display text-xl uppercase tracking-tight">Rep-Max Percentage Table</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Suggested loads below are percentages of the Epley estimate for the example. Recalculate after changing your set; these are not universal training prescriptions.</p>
          <div className="mt-4 overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr><th className="border border-border p-2 text-left">% of 1RM</th><th className="border border-border p-2 text-right">Suggested load</th></tr></thead><tbody>{pct.map(p=> <tr key={p}><td className="border border-border p-2">{p}%</td><td className="border border-border p-2 text-right">{(epley*p/100).toFixed(1)} kg</td></tr>)}</tbody></table></div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">A predicted 1RM is an estimate, not a tested maximum. Technique, fatigue, range of motion and equipment can change the actual result.</p>
        </section>;
      })()}
        <h2 className="font-display text-2xl uppercase tracking-tight">The Formula Explained</h2>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap border border-border bg-card p-4 font-mono-data text-sm">{calc.formula || "The calculation method is applied from the inputs described above."}</pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">The formula identifies which inputs influence the result. If an equation is used, it represents a model derived from a reference population or established method; it does not capture every aspect of an individual person.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Worked Example</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Start with a consistent set of example inputs: {example}. Apply the formula shown above and keep the same units throughout the calculation. The calculator performs the arithmetic automatically, while the formula lets you understand how the result is produced.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">How to Interpret Your Result</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Interpret the result according to the reference range, category or explanation supplied by the calculator. A single calculated value rarely describes overall health or fitness. Consider your goal, measurement quality, trends over time and other relevant metrics before drawing conclusions.</p>
      </section>

      <section>
        <h2 className="font-display text-2xl uppercase tracking-tight">Accuracy and Limitations</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Most health and fitness calculators estimate rather than directly measure. Accuracy can be affected by measurement error, equation choice, population differences, body composition, activity level and other factors. Two valid equations can therefore produce different results. Do not use a calculator result as a medical diagnosis.</p>
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
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Use the result as a planning or tracking signal, not as a verdict about your health. For goals such as weight management or training, combine the calculation with sustainable habits and real-world feedback. If the result relates to a medical concern, medication, symptoms or a diagnosed condition, discuss it with a qualified healthcare professional.</p>
      </section>

      {related.length > 0 && (
        <section className="border border-border bg-card p-6">
          <h2 className="font-display text-2xl uppercase tracking-tight">Related Calculators</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">These calculators provide complementary information and can help put this result in context.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {related.map((item) => <Link key={item.id} to={`/${item.slug}`} className="border border-border px-4 py-3 text-sm font-bold hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)]">{item.name}</Link>)}
          </div>
        </section>
      )}

      {showFaq && (
        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight mb-3">Frequently Asked Questions</h2>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map(([q, a]) => <details key={q} className="group py-4"><summary className="cursor-pointer list-none pr-6 text-sm font-bold leading-6">{q}</summary><p className="mt-3 text-sm leading-7 text-muted-foreground">{a}</p></details>)}
          </div>
        </section>
      )}
    </article>
  );
}
