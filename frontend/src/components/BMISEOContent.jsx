import React from "react";
import { Link } from "react-router-dom";

const faqs = [
  ["What is BMI?", "BMI (Body Mass Index) is a weight-to-height index calculated from body weight and height. For adults, it is commonly used as a screening measure for weight categories, not as a diagnosis."],
  ["How do I calculate BMI?", "For metric units, BMI = weight in kilograms ÷ height in meters squared. For pounds and inches, BMI = 703 × weight in pounds ÷ height in inches squared."],
  ["What is a healthy BMI?", "For adults, a BMI from 18.5 to less than 25 is commonly classified as healthy weight. BMI should still be interpreted alongside other health information."],
  ["Is BMI the same as body fat percentage?", "No. BMI uses only height and weight. Body-fat percentage attempts to estimate the proportion of body weight that is fat."],
  ["Is BMI accurate for muscular people?", "BMI can be less representative for highly muscular people because the calculation cannot distinguish muscle from fat."],
  ["Does BMI work for children?", "Children and adolescents should not generally be interpreted using adult BMI categories. BMI-for-age uses age- and sex-specific growth references."],
  ["Can BMI tell me my ideal weight?", "BMI can be used to calculate a broad reference weight range for a given height, but it cannot identify one universally ideal weight for every individual."],
  ["Why can two people with the same BMI have different health profiles?", "BMI does not show body-fat distribution, muscle mass, fitness, medical history, or other factors that influence health."],
  ["How often should I calculate BMI?", "Recalculate when your weight or height information changes or when you are reviewing a longer-term trend. Repeated daily calculations are usually unnecessary."],
  ["Does FitMe Pro's BMI calculator diagnose obesity?", "No. FitMe Pro provides an educational BMI estimate. A BMI category is a screening result and should not be treated as a medical diagnosis."],
];

export default function BMISEOContent() {
  return (
    <article className="border-t border-border pt-10 mt-2 space-y-10" aria-label="BMI Calculator complete guide">
      <section>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)] mb-2">BMI Guide</div>
        <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter">BMI Calculator: What Your Result Means</h2>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-8">
          Calculate your Body Mass Index from height and weight, then use the result to understand the standard adult BMI categories. BMI is a simple screening measure that puts body weight into context with height. It is useful, but it does not directly measure body fat or provide a complete picture of health.
        </p>
      </section>

      <section className="border border-border bg-card p-6 sm:p-7">
        <h3 className="font-display text-xl uppercase tracking-tight mb-3">Quick Answer</h3>
        <p className="text-sm sm:text-base leading-8 text-muted-foreground">
          <strong className="text-foreground">BMI = weight (kg) ÷ height² (m²).</strong> For adults, commonly used categories are underweight below 18.5, healthy weight from 18.5 to 24.9, overweight from 25.0 to 29.9, and obesity at 30 or above. These categories are screening ranges, not a diagnosis.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">What Does Your BMI Result Mean?</h3>
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="text-left p-3 font-bold uppercase tracking-wider">BMI</th>
                <th className="text-left p-3 font-bold uppercase tracking-wider">Adult category</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="p-3">Below 18.5</td><td className="p-3">Underweight</td></tr>
              <tr className="border-b border-border"><td className="p-3">18.5–24.9</td><td className="p-3">Healthy weight</td></tr>
              <tr className="border-b border-border"><td className="p-3">25.0–29.9</td><td className="p-3">Overweight</td></tr>
              <tr className="border-b border-border"><td className="p-3">30.0–34.9</td><td className="p-3">Obesity, Class 1</td></tr>
              <tr className="border-b border-border"><td className="p-3">35.0–39.9</td><td className="p-3">Obesity, Class 2</td></tr>
              <tr><td className="p-3">40.0+</td><td className="p-3">Obesity, Class 3</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-8">
          These are commonly used adult screening categories. BMI does not diagnose obesity or another medical condition, and the meaning of a result can depend on body composition and individual circumstances.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">BMI Formula</h3>
        <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-8">
          <p><strong className="text-foreground">Metric:</strong> BMI = weight in kilograms ÷ height in meters².</p>
          <p><strong className="text-foreground">Imperial:</strong> BMI = 703 × weight in pounds ÷ height in inches².</p>
          <p>The calculator converts units when necessary and applies the same mathematical definition regardless of whether you enter metric or imperial measurements.</p>
        </div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">How BMI Is Calculated</h3>
        <ol className="space-y-4 text-sm sm:text-base text-muted-foreground leading-8">
          <li><strong className="text-foreground">1. Measure height.</strong> Measure without shoes and use a consistent unit.</li>
          <li><strong className="text-foreground">2. Measure weight.</strong> Use a reliable scale and record the value in the selected unit.</li>
          <li><strong className="text-foreground">3. Convert units if needed.</strong> The standard metric equation uses kilograms and meters.</li>
          <li><strong className="text-foreground">4. Square height.</strong> Multiply height in meters by itself.</li>
          <li><strong className="text-foreground">5. Divide weight by squared height.</strong> The result is BMI in kg/m².</li>
        </ol>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Worked BMI Example</h3>
        <div className="border border-border bg-card p-6">
          <p className="text-sm sm:text-base text-muted-foreground leading-8">Suppose an adult weighs <strong className="text-foreground">70 kg</strong> and is <strong className="text-foreground">1.75 m</strong> tall.</p>
          <p className="mt-3 font-mono-data text-sm sm:text-base">BMI = 70 ÷ (1.75 × 1.75) = 22.9 kg/m²</p>
          <p className="mt-3 text-sm text-muted-foreground leading-8">A BMI of about 22.9 falls within the commonly used healthy-weight category for adults.</p>
        </div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">BMI vs. Body Fat Percentage</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">
          BMI and body-fat percentage are different measurements. BMI describes weight relative to height, while body-fat percentage estimates how much of body weight is fat. A person with substantial muscle mass can have a relatively high BMI without having a high body-fat percentage. For a broader body-composition picture, compare BMI with waist measurements and an appropriate body-fat estimate rather than treating one number as definitive.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Factors That Affect BMI Interpretation</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted-foreground leading-8">
          <li><strong className="text-foreground">Muscle mass:</strong> BMI cannot separate muscle from fat.</li>
          <li><strong className="text-foreground">Fat distribution:</strong> BMI does not show where body fat is stored.</li>
          <li><strong className="text-foreground">Age:</strong> adult categories are not the same as BMI-for-age assessment in children and adolescents.</li>
          <li><strong className="text-foreground">Pregnancy:</strong> standard adult BMI interpretation is not designed to assess pregnancy weight gain.</li>
          <li><strong className="text-foreground">Population differences:</strong> relationships between BMI, body fat and health risk can vary between populations.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Accuracy and Limitations</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">
          BMI is mathematically precise when height and weight are measured accurately, but biological interpretation is not equally precise. BMI does not directly measure body fat, muscle, bone density, waist distribution, fitness, or metabolic health. It is therefore best used as one screening indicator alongside other relevant measurements and health information. If a result is unexpected or important to a medical decision, discuss it with a qualified healthcare professional.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Better Inputs Produce Better Tracking</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">
          For useful trends, measure height and weight consistently. Use the same scale when possible, keep the scale on a stable surface, and avoid comparing measurements taken under very different conditions. A single change in scale weight does not necessarily represent a comparable change in body fat because hydration, glycogen, food contents and other short-term factors can affect weight.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Use BMI With Complementary Measures</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">
          BMI becomes more informative when it is considered with complementary measures. If your goal is body composition, compare it with <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/body-fat-calculator">body-fat percentage</Link>, <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/lean-body-mass-calculator">lean body mass</Link>, and <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/waist-to-height-ratio-calculator">waist-to-height ratio</Link>. For weight planning, see the <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/healthy-weight-range-calculator">healthy weight range</Link> and <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/ideal-body-weight-calculator">ideal body weight</Link> calculators. These measures answer different questions and should not be treated as interchangeable.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">BMI FAQs</h3>
        <div className="space-y-5">
          {faqs.map(([q, a]) => (
            <div key={q} className="border-b border-border pb-5">
              <h4 className="font-bold text-sm sm:text-base">{q}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-7">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Scientific and Official References</h3>
        <ul className="space-y-3 text-sm text-muted-foreground leading-7">
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" target="_blank" rel="noreferrer">CDC — Adult BMI Categories</a></li>
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noreferrer">World Health Organization — Obesity and Overweight</a></li>
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm" target="_blank" rel="noreferrer">NHLBI — Assessing Your Weight and Health Risk</a></li>
        </ul>
      </section>

      <section className="border border-border p-6 bg-card">
        <h3 className="font-display text-xl uppercase tracking-tight mb-3">Medical Disclaimer</h3>
        <p className="text-sm text-muted-foreground leading-7">
          FitMe Pro calculators provide estimates for educational and informational purposes. They are not intended to diagnose, treat, cure, or prevent disease and do not replace professional medical assessment. BMI is a screening measure rather than a diagnosis. If you have a health concern or are using a result to make a medical decision, consult a qualified healthcare professional.
        </p>
      </section>
    </article>
  );
}
