import React, { useMemo, useState } from "react";

const ACTIVITY = [
  ["sedentary", "Sedentary — little exercise", 1.2],
  ["light", "Lightly active — 1–3 days/week", 1.375],
  ["moderate", "Moderately active — 3–5 days/week", 1.55],
  ["very", "Very active — 6–7 days/week", 1.725],
  ["extra", "Extra active — hard training/physical job", 1.9],
];

export default function CalorieCalculator() {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState("23");
  const [height, setHeight] = useState("173");
  const [weight, setWeight] = useState("85");
  const [activity, setActivity] = useState("moderate");
  const [unit, setUnit] = useState("metric");

  const result = useMemo(() => {
    const a = Number(age);
    let h = Number(height);
    let w = Number(weight);
    if (!Number.isFinite(a) || !Number.isFinite(h) || !Number.isFinite(w) || a <= 0 || h <= 0 || w <= 0) return null;
    if (unit === "imperial") {
      h = h * 2.54;
      w = w * 0.45359237;
    }
    const bmr = 10 * w + 6.25 * h - 5 * a + (sex === "male" ? 5 : -161);
    const factor = ACTIVITY.find((x) => x[0] === activity)?.[2] || 1.55;
    const tdee = bmr * factor;
    return { bmr, tdee, loss: tdee - 500, gain: tdee + 300 };
  }, [age, height, weight, sex, activity, unit]);

  const field = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-blue-500";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">FitMe Pro Nutrition</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Calorie Calculator</h1>
        <p className="mt-3 max-w-3xl text-slate-600">Estimate your daily calorie needs from the Mifflin–St Jeor equation and your activity level. Use the result as a starting estimate, not a medical prescription.</p>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <label className="block"> <span className="mb-2 block font-medium text-slate-700">Units</span>
            <select className={field} value={unit} onChange={(e) => setUnit(e.target.value)}><option value="metric">Metric (kg, cm)</option><option value="imperial">Imperial (lb, in)</option></select>
          </label>
          <label className="block"> <span className="mb-2 block font-medium text-slate-700">Sex</span>
            <select className={field} value={sex} onChange={(e) => setSex(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select>
          </label>
          <label className="block"> <span className="mb-2 block font-medium text-slate-700">Age</span><input className={field} type="number" min="15" max="120" value={age} onChange={(e) => setAge(e.target.value)} /></label>
          <label className="block"> <span className="mb-2 block font-medium text-slate-700">Height ({unit === "metric" ? "cm" : "in"})</span><input className={field} type="number" min="50" max="300" value={height} onChange={(e) => setHeight(e.target.value)} /></label>
          <label className="block"> <span className="mb-2 block font-medium text-slate-700">Weight ({unit === "metric" ? "kg" : "lb"})</span><input className={field} type="number" min="20" max="500" value={weight} onChange={(e) => setWeight(e.target.value)} /></label>
          <label className="block"> <span className="mb-2 block font-medium text-slate-700">Activity level</span>
            <select className={field} value={activity} onChange={(e) => setActivity(e.target.value)}>{ACTIVITY.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select>
          </label>
        </div>

        {result && <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Result label="BMR" value={result.bmr} note="Calories/day at rest" />
          <Result label="Maintenance" value={result.tdee} note="Estimated TDEE" />
          <Result label="Weight loss" value={result.loss} note="About 500 kcal below maintenance" />
          <Result label="Weight gain" value={result.gain} note="About 300 kcal above maintenance" />
        </div>}
      </section>

      <article className="prose prose-slate mt-10 max-w-none">
        <h2>How the calorie calculator works</h2>
        <p>This calculator first estimates basal metabolic rate (BMR), the energy your body would use at rest, with the Mifflin–St Jeor equation. It then multiplies BMR by an activity factor to estimate total daily energy expenditure (TDEE). Your real energy needs can be higher or lower because activity, body composition, food intake, sleep and other factors vary.</p>
        <h2>Calories for weight loss</h2>
        <p>A common starting approach is to eat somewhat below estimated maintenance calories. This calculator shows a simple 500-calorie reduction as a reference point. It is not a guarantee of a particular weekly weight change. As body weight changes, energy requirements can change too, so progress should be monitored over time.</p>
        <h2>Calories for weight gain</h2>
        <p>The example surplus shown here is 300 calories per day. A modest surplus can be a practical starting point for people pursuing gradual weight gain, especially when combined with resistance training and adequate protein. Actual changes in body weight and composition differ between individuals.</p>
        <h2>Calorie calculator formula</h2>
        <p><strong>Male BMR:</strong> 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5.</p>
        <p><strong>Female BMR:</strong> 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161.</p>
        <p><strong>Estimated maintenance calories:</strong> BMR × activity factor.</p>
        <h2>Accuracy and limitations</h2>
        <p>Mifflin–St Jeor is an estimation equation, not a direct measurement of metabolism. Activity-factor selection is another major source of uncertainty. For better real-world estimates, compare the calculator result with your weight trend and usual food intake over several weeks rather than treating one number as exact.</p>
        <h2>Related FitMe Pro calculators</h2>
        <ul>
          <li><a href="/bmr-calculator">BMR Calculator</a></li>
          <li><a href="/tdee-calculator">TDEE Calculator</a></li>
          <li><a href="/calorie-deficit-calculator">Calorie Deficit Calculator</a></li>
          <li><a href="/calorie-surplus-calculator">Calorie Surplus Calculator</a></li>
        </ul>
        <h2>Frequently asked questions</h2>
        <h3>How many calories should I eat?</h3><p>Your starting calorie target depends on estimated maintenance needs and your goal. Use the maintenance result as a baseline, then adjust using your multi-week weight trend.</p>
        <h3>Is 1,500 calories enough?</h3><p>There is no single calorie target that is appropriate for everyone. Energy needs vary substantially with body size, age, sex and activity.</p>
        <h3>What is the difference between BMR and TDEE?</h3><p>BMR estimates energy use at rest. TDEE is an estimate of total daily energy expenditure after accounting for activity.</p>
        <h3>Does the calculator work for men and women?</h3><p>Yes. The Mifflin–St Jeor equation uses different sex-specific constants.</p>
        <h3>Should I change my calories every day?</h3><p>Not necessarily. A consistent target can make it easier to evaluate your progress, while activity and intake can naturally vary day to day.</p>
        <h3>Can this replace advice from a doctor or dietitian?</h3><p>No. It is an educational estimate. People with medical conditions, pregnancy, eating disorders, or other special nutritional needs should seek individualized professional guidance.</p>
      </article>
    </main>
  );
}

function Result({ label, value, note }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="text-sm font-medium text-slate-500">{label}</div><div className="mt-1 text-2xl font-bold text-slate-900">{Math.max(0, Math.round(value)).toLocaleString()} kcal</div><div className="mt-1 text-xs text-slate-500">{note}</div></div>;
}
