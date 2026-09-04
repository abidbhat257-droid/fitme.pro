import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Copy, Printer, ShareNetwork } from "@phosphor-icons/react";
import { toast } from "sonner";
import { getMissingCalculator } from "@/lib/missingCalculators";
import CalculatorSEOGuide from "@/components/CalculatorSEOGuide";

const categoryColor = "#059669";

function setMeta(name, content, property = false) {
  const attr = property ? "property" : "name";
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setJsonLd(calc) {
  document.getElementById("fitme-missing-jsonld")?.remove();
  const script = document.createElement("script");
  script.id = "fitme-missing-jsonld";
  script.type = "application/ld+json";
  const url = `${window.location.origin}/${calc.slug}`;
  const faqs = calc.faqs?.length ? calc.faqs : [
    `What does the ${calc.name} calculate?`,
    `How does the ${calc.name} work?`,
    `How accurate is the ${calc.name}?`,
    `What inputs are required?`,
    `Can I use this calculator for tracking?`,
    `Can this result diagnose a medical condition?`
  ];
  script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: calc.name, url, description: calc.description, applicationCategory: "HealthApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "FitMe Pro", item: `${window.location.origin}/` },
      { "@type": "ListItem", position: 2, name: calc.category, item: `${window.location.origin}/calculators` },
      { "@type": "ListItem", position: 3, name: calc.name, item: url }
    ] },
    { "@type": "FAQPage", mainEntity: faqs.map(q => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: "Use the calculator with the stated inputs and interpret the result as an estimate. The method, measurement quality and individual differences can affect the result." } })) }
  ]});
  document.head.appendChild(script);
}

function InputField({ config, value, onChange }) {
  return <label className="block">
    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{config.label}</span>
    <input type={config.name === "sex" ? "text" : "number"} inputMode={config.name === "sex" ? "text" : "decimal"} min={config.name === "sex" ? undefined : "0"} value={value} onChange={e => onChange(e.target.value)} className="w-full border-b-2 border-border bg-transparent px-0 py-2 text-lg font-mono-data focus:border-[var(--brand-lime)] focus:outline-none" />
    {config.help && <span className="mt-2 block text-xs leading-5 text-muted-foreground">{config.help}</span>}
  </label>;
}

export default function MissingCalculatorPage() {
  const { slug } = useParams();
  const calc = getMissingCalculator(slug);
  const initial = useMemo(() => Object.fromEntries((calc?.inputFields || []).map(f => [f.name, f.default])), [calc]);
  const [values, setValues] = useState(initial);
  useEffect(() => setValues(initial), [initial]);

  useEffect(() => {
    if (!calc) return;
    const title = `${calc.name} — Free Online Calculator | FitMe Pro`;
    document.title = title;
    setMeta("description", `${calc.description} Learn the formula, inputs, example and limitations with the free ${calc.name.toLowerCase()} from FitMe Pro.`);
    setMeta("og:title", title, true);
    setMeta("og:description", calc.description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", `${window.location.origin}/${calc.slug}`, true);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}/${calc.slug}`;
    setJsonLd(calc);
    return () => document.getElementById("fitme-missing-jsonld")?.remove();
  }, [calc]);

  const result = useMemo(() => calc?.compute(values) || null, [calc, values]);
  if (!calc) return <main className="p-10"><h1 className="font-display text-2xl uppercase">Calculator not found</h1><Link to="/calculators" className="mt-4 inline-block text-[var(--brand-lime)]">View all calculators</Link></main>;

  const setValue = (name, value) => setValues(v => ({ ...v, [name]: value }));
  const copy = async () => { try { await navigator.clipboard.writeText(`${calc.name}: ${result?.value ?? "—"} ${result?.unit ?? ""}`); toast.success("Copied"); } catch { toast.error("Copy failed"); } };
  const share = async () => { try { if (navigator.share) await navigator.share({ title: calc.name, text: `${calc.name}: ${result?.value ?? "—"}`, url: window.location.href }); else { await navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); } } catch {} };

  const related = [];
  return <div className="flex min-h-screen flex-col lg:flex-row">
    <main className="min-w-0 flex-1">
      <section className="relative overflow-hidden border-b border-border"><div className="relative max-w-4xl px-6 py-8 sm:px-10 lg:py-10"><Link to="/calculators" className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground hover:text-[var(--brand-lime)]"><ArrowLeft size={14}/> All calculators</Link><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: categoryColor }}><span className="h-2 w-2" style={{ background: categoryColor }} />{calc.category}</div><h1 className="font-display text-3xl uppercase leading-none tracking-tighter sm:text-4xl lg:text-5xl">{calc.name}</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{calc.description}</p></div></section>
      <section className="px-6 py-8 sm:px-10">
        <div className="max-w-4xl border border-border bg-card p-6 sm:p-8" style={{ borderTop: `4px solid ${categoryColor}` }}>
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4"><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Your Result</div><div className="flex gap-2 no-print"><button onClick={copy} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)]"><Copy size={12}/> Copy</button><button onClick={share} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)]"><ShareNetwork size={12}/> Share</button><button onClick={() => window.print()} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)]"><Printer size={12}/> Print</button></div></div>
          {result ? <><div className="font-mono-data text-5xl font-black tracking-tight text-[var(--brand-lime)] sm:text-6xl">{result.value}<span className="ml-2 text-lg font-normal text-muted-foreground">{result.unit}</span></div><div className="mt-3 text-sm font-bold uppercase tracking-[0.2em]">{result.category}</div><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{result.interpretation}</p></> : <div className="text-muted-foreground"><div className="font-mono-data text-4xl text-muted-foreground/40">— — —</div><p className="mt-3 text-sm">Enter valid inputs to see a result.</p></div>}
        </div>
        <div className="mt-8 max-w-4xl border border-border bg-card p-6 sm:p-8" style={{ borderTop: `3px solid ${categoryColor}` }}><div className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">Calculator Inputs</div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2">{calc.inputFields.map(f => <InputField key={f.name} config={f} value={values[f.name]} onChange={v => setValue(f.name, v)} />)}</div></div>
        <div className="mt-8 max-w-4xl border border-border bg-card p-6"><h2 className="font-display text-xl uppercase tracking-tight">Formula</h2><p className="mt-3 font-mono text-sm leading-7">{calc.formula}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{calc.interpretation}</p></div>
        <div className="mt-8 max-w-4xl"><CalculatorSEOGuide calc={calc} related={related} /></div>
      </section>
    </main>
  </div>;
}
