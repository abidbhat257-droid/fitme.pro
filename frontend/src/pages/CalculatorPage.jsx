import React, { useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ShareNetwork, Printer, Copy, ArrowRight } from "@phosphor-icons/react";
import MeasurementPanel from "@/components/MeasurementPanel";
import Visualization from "@/components/viz/Visualization";
import VizInfo from "@/components/viz/VizInfo";
import { getCalculator, CATEGORIES, CALCULATORS, hasRequiredInputs } from "@/lib/calculators";
import { getContent } from "@/lib/content";
import { useMeasurements } from "@/context/MeasurementContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/constants/testIds";

export default function CalculatorPage() {
  const { slug } = useParams();
  const calc = getCalculator(slug);
  const content = getContent(slug);
  const { state } = useMeasurements();

  const ready = calc ? hasRequiredInputs(calc, state) : false;
  const result = useMemo(() => {
    if (!calc || !ready) return null;
    try { return calc.compute(state); } catch { return null; }
  }, [calc, ready, state]);

  // SEO tags via document + JSON-LD
  useEffect(() => {
    if (!calc || !content) return;
    document.title = `${content.title} · Fitme Pro`;

    upsertMeta("description", content.metaDescription);
    upsertMeta("og:title", content.title, true);
    upsertMeta("og:description", content.metaDescription, true);
document.title = `${content.title} · Fitme Pro`;

upsertMeta("description", content.metaDescription);

upsertMeta("og:title", content.title, true);
upsertMeta("og:description", content.metaDescription, true);

const canonicalUrl = `https://fitme-pro.vercel.app/calculator/${slug}`;

let canonical = document.querySelector('link[rel="canonical"]');

if (!canonical) {
  canonical = document.createElement("link");
  canonical.setAttribute("rel", "canonical");
  document.head.appendChild(canonical);
}

canonical.setAttribute("href", canonicalUrl);
    // JSON-LD schema: FAQPage + WebApplication
    const ld = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": content.title,
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
          "@type": "FAQPage",
          "mainEntity": content.faq.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        },
      ],
    };
    upsertJsonLd(ld);
    return () => { removeJsonLd(); };
  }, [calc, content]);

  if (!calc || !content) return <Navigate to="/" replace />;

  const cat = CATEGORIES[calc.category];
  const related = CALCULATORS.filter((c) => c.category === calc.category && c.id !== calc.id).slice(0, 4);

  const onCopy = async () => {
    const text = `${calc.name}: ${result?.value ?? "—"} (${result?.category ?? ""})`;
    try { await navigator.clipboard.writeText(text); toast.success("Copied"); } catch { toast.error("Copy failed"); }
  };
  const onShare = async () => {
    const url = window.location.href;
    const text = `My ${calc.name} result: ${result?.value ?? "—"}`;
    if (navigator.share) { try { await navigator.share({ title: calc.name, text, url }); } catch (_e) { /* user cancelled */ } }
    else { try { await navigator.clipboard.writeText(url); toast.success("Link copied"); } catch { toast.error("Share failed"); } }
  };

  return (
    <div data-testid={SEO.root(slug)} className="flex flex-col lg:flex-row min-h-screen">
      <MeasurementPanel />

      <main className="flex-1 min-w-0">
        {/* HERO */}
        <section className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
            background: `radial-gradient(circle at 30% 40%, ${cat.color} 0%, transparent 40%)`,
          }} />
          <div className="relative px-6 sm:px-10 py-10 lg:py-14 max-w-4xl">
            <Link
              to="/"
              data-testid={SEO.backLink}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-[var(--brand-lime)] mb-6"
            >
              <ArrowLeft size={14} /> Back to dashboard
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: cat.color }}>
              <div className="h-2 w-2" style={{ background: cat.color }} /> {cat.label}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter leading-[1] mb-4">
              {calc.name}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {content.intro}
            </p>
          </div>
        </section>

        {/* RESULT + FORMULA */}
        <section className="px-6 sm:px-10 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-8">
            {/* Big Result */}
            <div className="border border-border bg-card p-6 sm:p-8" style={{ borderTop: `3px solid ${cat.color}` }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Your Result</div>
                <div className="flex gap-2 no-print">
                  <button onClick={onCopy} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)] transition-colors">
                    <Copy size={12} /> Copy
                  </button>
                  <button onClick={onShare} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)] transition-colors">
                    <ShareNetwork size={12} /> Share
                  </button>
                  <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--brand-lime)] transition-colors">
                    <Printer size={12} /> Print
                  </button>
                </div>
              </div>
              {ready && result ? (
                <>
                  <div className="font-mono-data text-5xl sm:text-6xl font-black tracking-tight text-[var(--brand-lime)]">
                    {result.value}
                    {result.unit ? <span className="text-lg ml-2 text-muted-foreground font-normal">{result.unit}</span> : null}
                  </div>
                  {result.category && (
                    <div className="mt-3 text-sm font-bold uppercase tracking-[0.2em]">{result.category}</div>
                  )}
                  {result.interpretation && (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">{result.interpretation}</p>
                  )}
                  {result.range && (
                    <div className="mt-6 text-xs text-muted-foreground">
                      Reference range: <span className="font-mono-data text-foreground">{result.range}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-muted-foreground">
                  <div className="font-mono-data text-4xl text-muted-foreground/40">— — —</div>
                  <p className="mt-4 text-sm leading-relaxed">
                    Enter these measurements to see your result:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {calc.requires.map((r) => (
                      <span key={r} className="text-[10px] uppercase tracking-widest border border-border px-2 py-1">{humanizeField(r)}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Formula */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)] mb-2">Formula</div>
              <pre className="font-mono-data text-sm bg-card border border-border p-4 overflow-x-auto whitespace-pre-wrap">
                {calc.formula}
              </pre>
            </div>

            {/* Visualization */}
            {ready && result && (
              <div data-testid={`seo-viz-${slug}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">Visualization</div>
                  <VizInfo slug={slug} />
                </div>
                <div className="bg-card border border-border p-5 sm:p-6" style={{ borderTop: `3px solid ${cat.color}` }}>
                  <Visualization calc={calc} state={state} result={result} />
                </div>
              </div>
            )}

            {/* Steps */}
            <div>
              <h2 className="font-display text-2xl uppercase tracking-tighter mb-4">How To Calculate</h2>
              <ol className="space-y-3">
                {content.steps.map((s, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="font-mono-data text-xs bg-[var(--brand-lime)] text-black px-2 py-0.5 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-foreground/90 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-display text-2xl uppercase tracking-tighter mb-4">FAQ</h2>
              <Accordion type="single" collapsible className="border-t border-border">
                {content.faq.map((f, i) => (
                  <AccordionItem key={i} value={`i-${i}`} data-testid={SEO.faqItem(i)} className="border-b border-border">
                    <AccordionTrigger className="text-left text-sm font-bold uppercase tracking-wider hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="border border-border p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">Related Calculators</div>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`/calculator/${r.slug}`}
                      className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 hover:text-[var(--brand-lime)] transition-colors group"
                    >
                      <span>{r.name}</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border p-5 bg-card">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)] mb-3">See all 30</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every calculator updates live as you change measurements. Return to the dashboard for the full grid.
              </p>
              <Link to="/" className="mt-4 inline-block bg-[var(--brand-lime)] text-black px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors">
                Open Dashboard
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function upsertMeta(name, content, isProperty = false) {
  const key = isProperty ? "property" : "name";
  let el = document.head.querySelector(`meta[${key}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function humanizeField(k) {
  const map = {
    heightCm: "Height",
    weightKg: "Weight",
    waistCm: "Waist",
    hipCm: "Hip",
    neckCm: "Neck",
    wristCm: "Wrist",
    goalWeightKg: "Goal Weight",
    age: "Age",
    sex: "Sex",
    activity: "Activity Level",
  };
  return map[k] || k;
}

function upsertJsonLd(obj) {
  removeJsonLd();
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = "fitme-jsonld";
  s.textContent = JSON.stringify(obj);
  document.head.appendChild(s);
}
function removeJsonLd() {
  const existing = document.getElementById("fitme-jsonld");
  if (existing) existing.remove();
}
