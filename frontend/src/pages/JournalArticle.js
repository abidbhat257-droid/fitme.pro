import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getJournalArticle } from "@/lib/journalContent";

const SITE_URL = "https://fitme-pro.vercel.app";

function upsertMeta(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let meta = document.querySelector(selector);
  if (!meta) { meta = document.createElement("meta"); meta.setAttribute(property ? "property" : "name", name); document.head.appendChild(meta); }
  meta.content = content;
}

function upsertCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
  link.href = url;
}

export default function JournalArticle() {
  const { slug } = useParams();
  const article = getJournalArticle(slug);

  useEffect(() => {
    if (!article) return;
    const canonical = `${SITE_URL}/journal/${article.categorySlug}/${article.slug}`;
    document.title = `${article.title} | FitMe Pro Journal`;
    upsertMeta("description", article.description);
    upsertMeta("keywords", article.keywords);
    upsertMeta("robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    upsertMeta("og:title", article.title, true);
    upsertMeta("og:description", article.description, true);
    upsertMeta("og:type", "article", true);
    upsertMeta("og:url", canonical, true);
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", article.title);
    upsertMeta("twitter:description", article.description);
    upsertCanonical(canonical);

    const id = "fitme-journal-article-schema";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: "2026-09-03",
      dateModified: "2026-09-03",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: { "@type": "Organization", name: "FitMe Pro" },
      publisher: { "@type": "Organization", name: "FitMe Pro", url: SITE_URL },
      articleSection: article.category,
      keywords: article.keywords,
      isAccessibleForFree: true,
    });
    document.head.appendChild(script);
    return () => document.getElementById(id)?.remove();
  }, [article]);

  if (!article) return <main className="mx-auto max-w-4xl px-4 py-20"><h1 className="text-3xl font-bold">Article not found</h1><Link className="mt-4 inline-block text-primary" to="/journal">Back to Journal →</Link></main>;

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-10"><article className="mx-auto max-w-4xl">
      <Link to={`/journal/${article.categorySlug}`} className="text-sm font-medium text-primary">← {article.category} Journal</Link>
      <header className="mt-7 border-b border-white/10 pb-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{article.category} · {article.readTime}</p><h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{article.title}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{article.description}</p><p className="mt-4 text-sm text-muted-foreground">Published September 3, 2026 · FitMe Pro Journal</p></header>
      <div className="prose prose-invert mt-10 max-w-none">
        {article.sections.map(([heading, text]) => <section key={heading} className="mb-9"><h2 className="text-2xl font-bold">{heading}</h2><p className="mt-3 text-base leading-8 text-muted-foreground">{text}</p></section>)}
      </div>
      <section className="mt-10 rounded-3xl border border-primary/20 bg-primary/5 p-7"><h2 className="text-2xl font-bold">Explore related FitMe Pro tools</h2><p className="mt-2 text-muted-foreground">Use our calculators to explore estimates alongside the information in this guide.</p><div className="mt-5 flex flex-wrap gap-3"><Link className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" to="/bmr-calculator">BMR Calculator</Link><Link className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold" to="/tdee-calculator">TDEE Calculator</Link><Link className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold" to="/protein-calculator">Protein Calculator</Link><Link className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold" to="/calorie-deficit-calculator">Calorie Deficit</Link></div></section>
      <section className="mt-8 border-t border-white/10 pt-6"><h2 className="text-lg font-semibold">Sources & further reading</h2><ul className="mt-3 space-y-2">{article.sources.map((source) => <li key={source.url}><a className="text-sm text-primary hover:underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul><p className="mt-5 text-xs leading-6 text-muted-foreground">FitMe Pro uses authoritative public-health guidance as a reference and does not reproduce source publications. Content is educational and should not replace individualized medical advice.</p></section>
    </article></main>
  );
}
