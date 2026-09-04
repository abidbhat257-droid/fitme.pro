import React from "react";
import { Link } from "react-router-dom";

const DATA = {
  protein: {
    title: "Protein Calculator Guide",
    quick: "A protein calculator estimates a daily protein target from body weight and your selected goal or activity level. The result is a practical starting point, not a diagnosis or a requirement that every person must meet.",
    formula: "Protein target = body weight × selected protein factor (g/kg)",
    inputs: "Body weight is the main input; the selected goal/activity setting determines the recommended protein factor used by the calculator.",
    method: "FitMe Pro converts the entered weight to kilograms, applies the selected protein target factor, and reports the estimated grams of protein for the day.",
    example: "For 70 kg at 1.6 g/kg: 70 × 1.6 = 112 g protein/day.",
    meaning: "Use the number as a daily target range or planning reference. Protein needs can differ with age, training, total energy intake, body composition, and health status.",
    limits: "A calculator cannot determine individual protein needs perfectly. People with kidney disease or other conditions affecting protein intake should follow advice from a qualified clinician or dietitian.",
    faqs: ["How much protein should I eat per day?", "Is protein calculated from body weight?", "Is more protein always better?", "Should athletes eat more protein?", "Can I use this calculator while losing weight?", "Does protein help build muscle?", "Should protein be spread across meals?", "Can protein needs change over time?"]
  },
  pace: {
    title: "Running Pace Calculator Guide",
    quick: "Running pace is the time required to cover one unit of distance, commonly minutes per kilometre or minutes per mile. A pace calculator converts distance and time into a comparable running pace.",
    formula: "Pace = elapsed time ÷ distance",
    inputs: "Enter a running distance and the elapsed time. Keep the distance unit consistent with the pace unit you want to interpret.",
    method: "FitMe Pro divides total elapsed time by distance and converts the result into a readable pace. Pace and speed describe the same performance from opposite directions: pace is time per distance, while speed is distance per time.",
    example: "A 5 km run in 30 minutes gives 30 ÷ 5 = 6:00 min/km.",
    meaning: "A lower time per kilometre or mile means a faster pace. Compare pace across similar courses and conditions for the most useful trend.",
    limits: "Terrain, elevation, wind, temperature, surface, GPS error, fatigue and pacing strategy can all affect performance. A calculator does not predict race performance with certainty.",
    faqs: ["What is a good running pace?", "How do I calculate min/km?", "How do I convert pace to speed?", "Is min/km faster when the number is lower?", "What pace should I use for easy runs?", "Can pace predict a 5K time?", "Why does GPS pace fluctuate?", "Should I train by pace or effort?"]
  },
  "one-rep-max": {
    title: "One Rep Max (1RM) Calculator Guide",
    quick: "One-repetition maximum (1RM) is the maximum weight a person can theoretically lift for one repetition. FitMe Pro estimates 1RM from a weight and repetition count using the Epley equation.",
    formula: "Estimated 1RM = weight × (1 + repetitions ÷ 30)",
    inputs: "Enter the weight lifted and the number of completed repetitions. The calculator accepts repetitions above one and uses the Epley estimate.",
    method: "The calculator multiplies the lifted weight by 1 plus repetitions divided by 30. For example, a 100 kg set of 5 gives 100 × (1 + 5/30) = 116.7 kg estimated 1RM.",
    example: "100 kg × 5 reps → approximately 116.7 kg estimated 1RM.",
    meaning: "Estimated 1RM can help compare strength and plan training loads without repeatedly testing a true maximal lift.",
    limits: "An equation is an estimate, not a tested maximum. Accuracy can vary with repetition count, exercise technique, training status, fatigue and the specific lift. Avoid treating the estimate as a guaranteed safe lifting load.",
    faqs: ["What does 1RM mean?", "How is 1RM calculated?", "What is the Epley formula?", "Is an estimated 1RM accurate?", "How many reps work best for a 1RM estimate?", "Can I calculate bench press 1RM?", "Should I test my true 1RM?", "How can 1RM help training?"]
  },
  "maximum-heart-rate": {
    title: "Maximum Heart Rate Calculator Guide",
    quick: "Maximum heart rate (MHR) is an estimate of the highest heart rate a person may reach during maximal effort. Age-based equations provide an estimate rather than a directly measured personal maximum.",
    formula: "Age-based MHR estimates vary by equation; a common simple estimate is 220 − age.",
    inputs: "Age is the primary input for an age-based maximum-heart-rate estimate.",
    method: "FitMe Pro applies the calculator's selected age-based relationship to estimate maximum heart rate in beats per minute (bpm). The estimate can then be used as a reference for exercise-intensity calculations.",
    example: "At age 30, the simple 220 − age equation estimates 190 bpm.",
    meaning: "MHR is mainly useful as a reference point for training-intensity zones. It should not be interpreted as a precise measurement of cardiovascular fitness.",
    limits: "Maximum heart rate varies substantially between individuals of the same age. Medication, health conditions, fitness status and measurement method can also matter. People with cardiovascular symptoms or medical concerns should seek professional guidance.",
    faqs: ["What is maximum heart rate?", "How do I calculate maximum heart rate?", "Is 220 minus age accurate?", "Can maximum heart rate change?", "Why is my maximum heart rate different from the formula?", "How is MHR used for training zones?", "Should I exercise at my maximum heart rate?", "Can a fitness watch measure maximum heart rate?"]
  },
  "heart-rate-zone": {
    title: "Heart Rate Zone Calculator Guide",
    quick: "Heart-rate zones divide exercise intensity into ranges based on a reference such as maximum heart rate or heart-rate reserve. They help runners and other athletes describe and control training intensity.",
    formula: "Zone boundaries depend on the selected heart-rate method and percentage range.",
    inputs: "Age or maximum heart rate is used for simple percentage-based zones; methods based on heart-rate reserve also require resting heart rate.",
    method: "FitMe Pro applies the selected zone method to calculate lower and upper heart-rate boundaries. Percentage-based methods anchor zones to estimated maximum heart rate, while heart-rate-reserve methods account for resting heart rate as well.",
    example: "If estimated MHR is 190 bpm, a 70–80% zone corresponds to about 133–152 bpm using a simple percentage-of-MHR method.",
    meaning: "Lower zones generally represent easier aerobic work, while higher zones represent progressively harder efforts. The exact physiological meaning depends on the method and individual response.",
    limits: "Heart-rate zones are guides, not laboratory measurements of physiological thresholds. Heat, dehydration, stress, caffeine, medication and fatigue can change heart rate at the same workload.",
    faqs: ["What are heart-rate zones?", "How many heart-rate zones are there?", "What is Zone 2?", "How do I calculate my heart-rate zones?", "Should zones use maximum heart rate or heart-rate reserve?", "Why can heart rate be high on an easy run?", "Are heart-rate zones the same for everyone?", "Can I use smartwatch heart-rate zones?"]
  }
};

const RELATED = {
  protein: ["/daily-calorie-needs-calculator", "/macro-calculator", "/protein-per-meal-calculator", "/meal-macro-calculator"],
  pace: ["/running-speed-calculator", "/5k-time-predictor-calculator", "/training-pace-calculator", "/running-calories-calculator"],
  "one-rep-max": ["/bench-press-1rm-calculator", "/squat-1rm-calculator", "/deadlift-1rm-calculator", "/strength-level-calculator"],
  "maximum-heart-rate": ["/heart-rate-zone-calculator", "/target-heart-rate-calculator", "/heart-rate-reserve-calculator", "/vo2-max-calculator"],
  "heart-rate-zone": ["/maximum-heart-rate-calculator", "/target-heart-rate-calculator", "/heart-rate-reserve-calculator", "/heart-rate-recovery-calculator"]
};

const NAMES = {
  "/daily-calorie-needs-calculator": "Daily Calorie Needs Calculator", "/macro-calculator": "Macro Calculator", "/protein-per-meal-calculator": "Protein per Meal Calculator", "/meal-macro-calculator": "Meal Macro Calculator",
  "/running-speed-calculator": "Running Speed Calculator", "/5k-time-predictor-calculator": "5K Time Predictor", "/training-pace-calculator": "Training Pace Calculator", "/running-calories-calculator": "Running Calories Calculator",
  "/bench-press-1rm-calculator": "Bench Press 1RM Calculator", "/squat-1rm-calculator": "Squat 1RM Calculator", "/deadlift-1rm-calculator": "Deadlift 1RM Calculator", "/strength-level-calculator": "Strength Level Calculator",
  "/heart-rate-zone-calculator": "Heart Rate Zone Calculator", "/target-heart-rate-calculator": "Target Heart Rate Calculator", "/heart-rate-reserve-calculator": "Heart Rate Reserve Calculator", "/vo2-max-calculator": "VO₂ Max Calculator", "/maximum-heart-rate-calculator": "Maximum Heart Rate Calculator", "/heart-rate-recovery-calculator": "Heart Rate Recovery Calculator"
};

export default function Phase3SEOContent({ slug }) {
  const d = DATA[slug];
  if (!d) return null;
  return <div className="space-y-8">
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Quick Answer</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.quick}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Formula & Method</h3><div className="border border-border bg-card p-5"><p className="font-mono text-sm leading-7">{d.formula}</p><p className="mt-4 text-sm text-muted-foreground leading-7">{d.method}</p></div></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Inputs Explained</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.inputs}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Worked Example</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.example}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">What Your Result Means</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.meaning}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Accuracy & Limitations</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.limits}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-4">Frequently Asked Questions</h3><div className="space-y-4">{d.faqs.map((q) => <div key={q} className="border border-border bg-card p-5"><h4 className="font-bold text-sm sm:text-base">{q}</h4><p className="mt-2 text-sm text-muted-foreground leading-7">This depends on the individual, the inputs used, and the calculation method. Use the result as an educational estimate and compare it with consistent measurements and real-world performance.</p></div>)}</div></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-4">Related Calculators</h3><div className="grid sm:grid-cols-2 gap-2">{RELATED[slug].map((path) => <Link key={path} to={path} className="border border-border px-4 py-3 text-sm font-bold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors">{NAMES[path] || path}</Link>)}</div></section>
    <section className="border border-border p-6 bg-card"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Health & Safety Note</h3><p className="text-sm text-muted-foreground leading-7">FitMe Pro provides educational estimates, not medical diagnoses or individualized treatment. Do not use a calculator result as a substitute for professional advice when symptoms, medical conditions, medication, pregnancy, or unusually high or low measurements are involved.</p></section>
  </div>;
}
