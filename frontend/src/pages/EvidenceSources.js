import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { EVIDENCE_SOURCES, EVIDENCE_PRINCIPLES } from "@/lib/evidenceSources";

export default function EvidenceSources() {
  useEffect(() => {
    document.title = "Evidence Sources — FitMe Pro Journal";
    const description = "See the authoritative public-health organizations FitMe Pro uses to research nutrition, fitness, weight management and wellness content.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = description;
  }, []);

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link to="/journal" className="text-xs font-bold uppercase tracking-[0.25em] text-primary">FitMe Pro Journal</Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Research library</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Evidence Sources</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">FitMe Pro uses authoritative public-health and scientific organizations as references. We synthesize guidance in original language rather than copying source publications. This library explains the role each organization plays in our editorial process.</p>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {EVIDENCE_SOURCES.map((source) => (
            <article key={source.id} className="rounded-2xl border border-white/10 bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{source.role}</p>
              <h2 className="mt-2 text-xl font-semibold">{source.name}</h2>
              <p className="mt-3 text-sm leading-6"><strong>Focus:</strong> {source.topics}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{source.note}</p>
              <a className="mt-4 inline-block text-sm font-semibold text-primary underline" href={source.url} target="_blank" rel="noreferrer">Official source →</a>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Our evidence rules</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
            {EVIDENCE_PRINCIPLES.map((principle) => <li key={principle}>{principle}</li>)}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Important distinction</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">A source being listed here does not mean FitMe Pro endorses every claim made on every page of that organization. Individual articles use the sources relevant to their topic, and recommendations can differ by population, country, age, medical status and evidence strength.</p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">For current dietary recommendations, we give particular attention to WHO, CDC, NIH, NHS and NHMRC guidance and check for updates before publishing time-sensitive claims.</p>
        </section>

        <p className="mt-8 pb-10 text-sm text-muted-foreground"><Link to="/journal/editorial-standards" className="underline">Read our Editorial Standards →</Link></p>
      </div>
    </main>
  );
}
