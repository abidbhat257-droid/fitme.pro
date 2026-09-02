import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function MacroCalculator() {
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(30);
  const [fat, setFat] = useState(30);

  const result = useMemo(() => {
    const c = Math.max(0, Number(calories) || 0);
    const p = Math.min(100, Math.max(0, Number(protein) || 0));
    const f = Math.min(100 - p, Math.max(0, Number(fat) || 0));
    const carbs = 100 - p - f;
    return {
      proteinGrams: (c * p / 100) / 4,
      fatGrams: (c * f / 100) / 9,
      carbGrams: (c * carbs / 100) / 4,
      carbs,
    };
  }, [calories, protein, fat]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-bold">Macro Calculator</h1>
      <p className="mt-3 text-lg">Calculate daily protein, carbohydrate, and fat targets from your calorie goal.</p>
      <section className="mt-8 rounded-2xl border p-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <label>Daily calories<input className="mt-2 w-full rounded-lg border p-3" type="number" min="0" value={calories} onChange={e => setCalories(e.target.value)} /></label>
          <label>Protein %<input className="mt-2 w-full rounded-lg border p-3" type="number" min="0" max="100" value={protein} onChange={e => setProtein(e.target.value)} /></label>
          <label>Fat %<input className="mt-2 w-full rounded-lg border p-3" type="number" min="0" max="100" value={fat} onChange={e => setFat(e.target.value)} /></label>
        </div>
        <p className="mt-4 text-sm">Carbohydrate allocation: {result.carbs.toFixed(0)}%</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4"><b>Protein</b><div className="text-2xl font-semibold">{result.proteinGrams.toFixed(0)} g/day</div></div>
          <div className="rounded-xl border p-4"><b>Carbohydrate</b><div className="text-2xl font-semibold">{result.carbGrams.toFixed(0)} g/day</div></div>
          <div className="rounded-xl border p-4"><b>Fat</b><div className="text-2xl font-semibold">{result.fatGrams.toFixed(0)} g/day</div></div>
        </div>
      </section>
      <article className="prose mt-10 max-w-none">
        <h2>How the Macro Calculator Works</h2><p>Enter a calorie target and choose the percentage of calories allocated to protein and fat. The remaining calories are assigned to carbohydrates. Protein and carbohydrate provide 4 calories per gram, while fat provides 9 calories per gram.</p>
        <h2>Macro Calculator Formula</h2><p>Protein grams = calories × protein percentage ÷ 4. Fat grams = calories × fat percentage ÷ 9. Carbohydrate grams = remaining calories ÷ 4.</p>
        <h2>Use Your Macros With Other FitMe Pro Calculators</h2><p>Estimate maintenance calories with <Link to="/tdee-calculator">TDEE Calculator</Link>, then use the <Link to="/calorie-deficit-calculator">Calorie Deficit Calculator</Link> or <Link to="/calorie-surplus-calculator">Calorie Surplus Calculator</Link> when appropriate.</p>
        <h2>Accuracy and Limitations</h2><p>Macro targets are planning estimates rather than medical prescriptions. Your needs can vary with body size, training, goals, health status, and dietary preferences. Review trends over time instead of treating one target as exact.</p>
        <h2>Frequently Asked Questions</h2>
        <h3>What does a macro calculator calculate?</h3><p>It converts a calorie target and macro percentages into estimated daily grams of protein, carbohydrates, and fat.</p>
        <h3>Can I change the percentages?</h3><p>Yes. The calculator lets you adjust protein and fat, with carbohydrates receiving the remaining percentage.</p>
        <h3>Does this replace professional nutrition advice?</h3><p>No. People with medical conditions or special dietary requirements should use guidance from a qualified professional.</p>
      </article>
    </main>
  );
}
