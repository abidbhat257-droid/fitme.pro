import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShareNetwork, Printer, Copy } from "@phosphor-icons/react";
import MeasurementPanel from "@/components/MeasurementPanel";
import { useMeasurements } from "@/context/MeasurementContext";
import { getSpecializedCalculator, SPECIALIZED_CALCULATORS } from "@/lib/specializedCalculators";
import { toMetric } from "@/lib/units";
import CalculatorSEOGuide from "@/components/CalculatorSEOGuide";
import { toast } from "sonner";

const CATEGORY_COLORS = { "Nutrition & Fitness": "#059669", "Running & Training": "#059669", "Strength Training": "#059669", "Body Composition": "#059669", "Heart Rate & Cardiovascular": "#059669" };

function sharedReady(calc, state) {
  const m = toMetric(state);
  return calc.requires.every((r) => r === "sex" ? (m.sex === "male" || m.sex === "female") : r === "activity" ? !!m.activity : r === "age" ? Number.isFinite(m.age) && m.age > 0 : r === "height" ? Number.isFinite(m.heightCm) && m.heightCm > 0 : r === "weight" ? Number.isFinite(m.weightKg) && m.weightKg > 0 : r === "waist" ? Number.isFinite(m.waistCm) && m.waistCm > 0 : r === "neck" ? Number.isFinite(m.neckCm) && m.neckCm > 0 : true);
}

function wilks2020(total, bodyWeightKg, sex) {
  const x = bodyWeightKg;
  const c = String(sex).toLowerCase() === "female"
    ? [-0.000000023334613884954, 0.00000938773881462799, -0.0010504000506583, -0.0330725063103405, 13.7121941940668, -125.425539779509]
    : [-0.0000000120804336482315, 0.00000707665973070743, -0.00139583381094385, 0.073694103462609, 8.47206137941125, 47.4617885411949];
  const denominator = c[0] * x ** 5 + c[1] * x ** 4 + c[2] * x ** 3 + c[3] * x ** 2 + c[4] * x + c[5];
  return denominator > 0 ? 600 * total / denominator : null;
}

function getEffectiveCalculator(calc, unit) {
  if (!calc || calc.id !== "wilks-score-calculator") return calc;
  return {
    ...calc,
    formula: "Wilks-2 (2020) = total × 600 ÷ (A×BW⁵ + B×BW⁴ + C×BW³ + D×BW² + E×BW + F), using kg",
    inputFields: [
      { name: "total", label: `Powerlifting total / ${unit}`, default: unit === "lb" ? "882" : "400", help: "Combined squat, bench press and deadlift total." },
      { name: "bodyWeight", label: `Body weight / ${unit}`, default: unit === "lb" ? "165" : "75", help: "Body weight used by the Wilks-2 formula." },
      { name: "sex", label: "Sex", default: "male", help: "Wilks-2 uses sex-specific coefficients." },
    ],
    compute: (v) => {
      const factor = unit === "lb" ? 0.45359237 : 1;
      const totalKg = Number(v.total) * factor;
      const bodyWeightKg = Number(v.bodyWeight) * factor;
      if (!(totalKg > 0) || !(bodyWeightKg > 0) || !["male", "female"].includes(String(v.sex).toLowerCase())) return null;
      const score = wilks2020(totalKg, bodyWeightKg, v.sex);
      return score == null ? null : {
        value: score.toFixed(1),
        raw: score,
        unit: "points",
        category: "Wilks-2 (2020) score",
        interpretation: "Body weight and total are converted to kilograms before applying the sex-specific Wilks-2 (2020) coefficients. The score itself is unitless.",
      };
    },
  };
}

function ExtraResult({ id, values }) {
  if (id === "pace-calculator") {
    const distance = Number(values.distance), minutes = Number(values.minutes), seconds = Number(values.seconds) || 0;
    if (!(distance > 0) || !(minutes >= 0) || !(seconds >= 0)) return null;
    const total = minutes * 60 + seconds;
    if (!(total > 0)) return null;
    const pace = total / distance, pm = Math.floor(pace / 60), ps = Math.round(pace % 60), speed = distance / (total / 3600);
    return { value: `${pm}:${String(ps).padStart(2, "0")}`, unit: "min/km", category: `${speed.toFixed(1)} km/h`, interpretation: "Running pace calculated from the distance and elapsed time you entered." };
  }
  const weight = Number(values.liftWeight), reps = Number(values.reps);
  if (!(weight > 0) || !(reps > 0) || reps > 30) return null;
  const oneRM = weight * (1 + reps / 30);
  return { value: oneRM.toFixed(1), unit: "kg estimated 1RM", category: `Epley estimate from ${weight} kg × ${reps} reps`, interpretation: "Estimated one-repetition maximum using the Epley equation. Use conservative loads when applying an estimate to training." };
}

function upsertMeta(name, content, property = false) {
  const key = property ? "property" : "name";
  let el = document.head.querySelector(`meta[${key}="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(key, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setJsonLd(calc, faqs) {
  document.getElementById("fitme-specialized-jsonld")?.remove();
  const script = document.createElement("script");
  script.id = "fitme-specialized-jsonld";
  script.type = "application/ld+json";
  const url = `${window.location.origin}/${calc.slug}`;
  script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: calc.name, url, applicationCategory: "HealthApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "FitMe Pro", item: `${window.location.origin}/` }, { "@type": "ListItem", position: 2, name: calc.category, item: `${window.location.origin}/calculators` }, { "@type": "ListItem", position: 3, name: calc.name, item: url }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
  ]});
  document.head.appendChild(script);
}

function faqFor(calc) {
  return [
    [`What does the ${calc.name} calculate?`, `${calc.name} applies the stated method to the inputs on this page to produce a health, nutrition or fitness estimate.`],
    [`How does the ${calc.name} work?`, `Enter the requested values and FitMe Pro applies the displayed formula. The result updates as your inputs change.`],
    [`What inputs are required?`, calc.extraInputs ? "This calculator uses dedicated activity-specific inputs shown in the Calculator Inputs section." : "This calculator uses the measurements in your shared Body Profile."],
    [`How accurate is the ${calc.name}?`, "The result is an estimate when it is based on an equation or prediction model. Measurement quality, individual differences and the chosen method can affect accuracy."],
    [`Why can another calculator show a different result?`, "Different calculators may use different equations, assumptions, reference populations or rounding rules. Compare methodology before comparing numbers."],
    [`Can I use the result to track progress?`, "Yes. Repeating the calculation with consistent inputs can help you monitor trends, especially when combined with other relevant measures."],
    [`Is this calculator free?`, "Yes. FitMe Pro calculators are free to use in the browser."],
    [`Can this result diagnose a medical condition?`, "No. FitMe Pro provides educational estimates and does not diagnose disease or replace professional medical assessment."]
  ];
}

export default function SpecializedCalculatorPage({ calculatorId }) {
  const { state, calculatorInputs, updateCalculatorInputs } = useMeasurements();
  const calc = getSpecializedCalculator(calculatorId);
  const saved = calculatorInputs?.[calculatorId] || {};
  const [unit, setUnit] = useState(saved.unit === "lb" ? "lb" : "kg");
  const effectiveCalc = useMemo(() => getEffectiveCalculator(calc, unit), [calc, unit]);
  const initialValues = useMemo(() => {
    if (!calc?.inputFields) return { distance: "5", minutes: "30", seconds: "0", liftWeight: "60", reps: "8" };
    return Object.fromEntries(calc.inputFields.map(f => [f.name, saved[f.name] ?? f.default ?? ""]));
  }, [calc, saved]);
  const [values, setValues] = useState(initialValues);
  const color = CATEGORY_COLORS[calc?.category] || "#059669";
  const ready = !!effectiveCalc && (effectiveCalc.id === "wilks-score-calculator" || sharedReady(effectiveCalc, state));
  const result = useMemo(() => { if (!effectiveCalc) return null; if (effectiveCalc.id === "wilks-score-calculator") return effectiveCalc.compute(values); if (effectiveCalc.extraInputs) return effectiveCalc.compute ? effectiveCalc.compute(values) : ExtraResult({ id: effectiveCalc.id, values }); return ready ? effectiveCalc.compute(state) : null; }, [effectiveCalc, state, ready, values]);
  const faqs = useMemo(() => calc ? faqFor(calc) : [], [calc]);

  useEffect(() => {
    if (!calc) return;
    const title = `${calc.name} — Free Online Calculator | FitMe Pro`;
    document.title = title;
    upsertMeta("description", `${calc.description} Learn the formula, use an example, and understand the limitations with the free ${calc.name.toLowerCase()} from FitMe Pro.`);
    upsertMeta("og:title", title, true);
    upsertMeta("og:description", calc.description, true);
    const canonical = document.head.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement("link"), { rel: "canonical" }));
    canonical.href = `${window.location.origin}/${calc.slug}`;
    setJsonLd(calc, faqs);
    return () => document.getElementById("fitme-specialized-jsonld")?.remove();
  }, [calc, faqs]);

  useEffect(() => { window.scrollTo(0, 0); }, [calculatorId]);
  useEffect(() => { setValues(initialValues); }, [calculatorId, initialValues]);
  useEffect(() => { if (calc?.id === "wilks-score-calculator") { setUnit(saved.unit === "lb" ? "lb" : "kg"); } }, [calc, saved.unit]);

  if (!calc) return <main className="p-10"><h1 className="font-display text-2xl uppercase">Calculator not found</h1><p className="mt-3 text-muted-foreground">The calculator URL could not be matched to one of FitMe Pro's specialized calculators.</p><Link className="mt-6 inline-block text-[var(--brand-lime)]" to="/">Back to dashboard</Link></main>;

  const setValue = (key, value) => { setValues(x => ({ ...x, [key]: value })); updateCalculatorInputs(calculatorId, { [key]: value }); };
  const setCalculatorUnit = (next) => { setUnit(next); updateCalculatorInputs(calculatorId, { unit: next }); setValues(x => ({ ...x })); };
  const onCopy = async () => { try { await navigator.clipboard.writeText(`${calc.name}: ${result?.value ?? "—"} ${result?.unit ?? ""}`); toast.success("Copied"); } catch { toast.error("Copy failed"); } };
  const onShare = async () => { try { if (navigator.share) await navigator.share({ title: calc.name, text: `${calc.name}: ${result?.value ?? "—"}`, url: window.location.href }); else { await navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); } } catch {} };
  const related = SPECIALIZED_CALCULATORS.filter((x) => x.id !== calc.id && x.category === calc.category).slice(0, 6);

  return <div className="flex min-h-screen flex-col lg:flex-row">
    <MeasurementPanel />
    <main className="min-w-0 flex-1">
      <section className="relative overflow-hidden border-b border-border"><div className="relative max-w-4xl px-6 py-8 sm:px-10 lg:py-10"><Link to="/" className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-[var(--brand-lime)]"><ArrowLeft size={14}/> Back to dashboard</Link><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color }}><span className="h-2 w-2" style={{ background: color }} />{calc.category}</div><h1 className="font-display text-3xl uppercase leading-none tracking-tighter sm:text-4xl lg:text-5xl">{calc.name}</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{calc.description}</p></div></section>
      <section className="px-6 py-8 sm:px-10"><div className="max-w-4xl border border-border bg-card p-6 sm:p-8" style={{ borderTop: `4px solid ${color}` }}><div className="mb-5 flex flex-wrap items-start justify-between gap-4"><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Your Result</div><div className="flex gap-2 no-print"><button onClick={onCopy} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)]"><Copy size={12}/> Copy</button><button onClick={onShare} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)]"><ShareNetwork size={12}/> Share</button><button onClick={() => window.print()} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)]"><Printer size={12}/> Print</button></div></div>{result ? <><div className="font-mono-data text-5xl font-black tracking-tight text-[var(--brand-lime)] sm:text-6xl">{result.value}<span className="ml-2 text-lg font-normal text-muted-foreground">{result.unit}</span></div>{result.category && <div className="mt-3 text-sm font-bold uppercase tracking-[0.2em]">{result.category}</div>}<p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{result.interpretation}</p></> : <div className="text-muted-foreground"><div className="font-mono-data text-4xl text-muted-foreground/40">— — —</div><p className="mt-3 text-sm leading-relaxed">Enter the required values below to see your result.</p></div>}</div>
        {effectiveCalc.extraInputs && <div className="mt-8 max-w-4xl border border-border bg-card p-6 sm:p-8" style={{ borderTop: `3px solid ${color}` }}><div className="mb-5 flex flex-wrap items-center justify-between gap-4"><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">Calculator Inputs</div>{calc.id === "wilks-score-calculator" && <div className="flex border border-border text-[10px] font-bold uppercase tracking-widest"><button type="button" onClick={() => setCalculatorUnit("kg")} className={`px-3 py-2 ${unit === "kg" ? "bg-[var(--brand-lime)] text-black" : "text-muted-foreground"}`}>kg</button><button type="button" onClick={() => setCalculatorUnit("lb")} className={`px-3 py-2 ${unit === "lb" ? "bg-[var(--brand-lime)] text-black" : "text-muted-foreground"}`}>lb</button></div>}</div><p className="mb-5 text-xs leading-6 text-muted-foreground">{calc.id === "wilks-score-calculator" ? "Enter your powerlifting total and body weight. Values are converted to kilograms internally for the Wilks-2 (2020) formula, so kg and lb produce the same score." : "These dedicated inputs are required because this calculation cannot be derived from the shared Body Profile alone. Use consistent units and measurement conditions when tracking change."}</p><div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{effectiveCalc.inputFields.map((f) => f.name === "sex" ? <label key={f.name} className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{f.label}</span><select value={values[f.name] ?? f.default ?? ""} onChange={e => setValue(f.name, e.target.value)} className="w-full border-b-2 border-border bg-transparent px-0 py-2 text-lg font-mono-data focus:border-[var(--brand-lime)] focus:outline-none"><option value="male">Male</option><option value="female">Female</option></select></label> : <Field key={f.name} label={f.label} value={values[f.name] ?? f.default ?? ""} set={v => setValue(f.name, v)} help={f.help}/>)}</div></div>}
        {!effectiveCalc.extraInputs && <div className="mt-8 max-w-4xl border border-border bg-card p-5 text-xs leading-6 text-muted-foreground">This calculator uses your shared Body Profile. Keep those measurements consistent when comparing results over time.</div>}
        <CalculatorSEOGuide calc={effectiveCalc} related={related} />
      </section>
    </main>
  </div>;
}

function Field({ label, value, set, help }) { return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</span><input type="number" inputMode="decimal" min="0" value={value} onChange={e => set(e.target.value)} title={help || ""} className="w-full border-b-2 border-border bg-transparent px-0 py-2 text-lg font-mono-data focus:border-[var(--brand-lime)] focus:outline-none" />{help && <span className="mt-1 block text-[10px] text-muted-foreground">{help}</span>}</label>;
}
