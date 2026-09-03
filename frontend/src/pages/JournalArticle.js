import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getJournalArticle } from "@/lib/journalContent";

export default function JournalArticle() {
  const { slug } = useParams();
  const article = getJournalArticle(slug);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | FitMe Pro Journal`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = article.description;
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) { keywords = document.createElement("meta"); keywords.name = "keywords"; document.head.appendChild(keywords); }
    keywords.content = article.keywords;
  }, [article]);

  if (!article) return <main className="mx-auto max-w-4xl px-4 py-20"><h1 className="text-3xl font-bold">Article not found</h1><Link className="mt-4 inline-block text-primary" to="/journal">Back to Journal →</Link></main>;

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-10"><article className="mx-auto max-w-4xl">
      <Link to={`/journal/${article.categorySlug}`} className="text-sm font-medium text-primary">← {article.category} Journal</Link>
      <header className="mt-7 border-b border-white/10 pb-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{article.category} · {article.readTime}</p><h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{article.title}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{article.description}</p><p className="mt-4 text-sm text-muted-foreground">Published {article.date} · FitMe Pro Journal</p></header>
      <div className="prose prose-invert mt-10 max-w-none">
        {article.sections.map(([heading, text]) => <section key={heading} className="mb-9"><h2 className="text-2xl font-bold">{heading}</h2><p className="mt-3 text-base leading-8 text-muted-foreground">{text}</p></section>)}
      </div>
      <section className="mt-10 rounded-3xl border border-primary/20 bg-primary/5 p-7"><h2 className="text-2xl font-bold">Related FitMe Pro tools</h2><p className="mt-2 text-muted-foreground">Turn general guidance into useful estimates with our calculators.</p><div className="mt-5 flex flex-wrap gap-3"><Link className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground" to="/bmr-calculator">BMR</Link><Link className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold" to="/tdee-calculator">TDEE</Link><Link className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold" to="/protein-calculator">Protein</Link><Link className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold" to="/calorie-deficit-calculator">Calorie Deficit</Link></div></section>
      <section className="mt-8 border-t border-white/10 pt-6"><h2 className="text-lg font-semibold">Sources & further reading</h2><ul className="mt-3 space-y-2">{article.sources.map((source) => <li key={source.url}><a className="text-sm text-primary hover:underline" href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul><p className="mt-5 text-xs leading-6 text-muted-foreground">FitMe Pro uses authoritative public-health guidance as a reference and does not reproduce source publications. Content is educational and should not replace individualized medical advice.</p></section>
    </article></main>
  );
}
