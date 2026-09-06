import React,{useEffect,useMemo,useState}from"react";import{Link}from"react-router-dom";import{JOURNAL_ARTICLES,JOURNAL_CATEGORIES}from"@/lib/journalContent";import{JOURNAL_EXPANSION_ARTICLES}from"@/lib/journalExpansion";import{SEO_COMPETITOR_ARTICLES}from"@/lib/seoCompetitorArticles";import{SEO_COMPETITOR_ARTICLES_2}from"@/lib/seoCompetitorArticles2";

const uniqueArticles=()=>Array.from(new Map([...JOURNAL_ARTICLES,...JOURNAL_EXPANSION_ARTICLES,...SEO_COMPETITOR_ARTICLES,...SEO_COMPETITOR_ARTICLES_2].map(a=>[a.slug,a])).values());
const CATEGORY_IMAGES={
  nutrition:{src:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",alt:"Healthy nutritious foods"},
  fitness:{src:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",alt:"Fitness training in a gym"},
  "weight-loss":{src:"https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80",alt:"Person exercising for weight management"},
  "body-composition":{src:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",alt:"Strength and body composition training"},
  wellness:{src:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",alt:"Calm wellness and meditation"},
  "health-education":{src:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",alt:"Health education and healthcare"}
};

export default function Journal(){
  const[query,setQuery]=useState("");
  useEffect(()=>{document.title="FitMe Pro Journal — Nutrition, Fitness, Weight Loss & Wellness";let m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement("meta");m.name="description";document.head.appendChild(m)}m.content="Evidence-informed guides on nutrition, fitness, weight management, body composition, running, strength and wellness from FitMe Pro."},[]);
  const articles=useMemo(uniqueArticles,[]);
  const normalized=query.trim().toLowerCase();
  const matches=a=>!normalized||`${a.title} ${a.description||""} ${a.keywords||""} ${a.category||""}`.toLowerCase().includes(normalized);
  const searchResults=normalized?articles.filter(matches):[];
  return <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-10"><div className="mx-auto max-w-6xl">

    <section className="mt-0" aria-labelledby="explore-topics"><div className="mb-5"><h1 id="explore-topics" className="text-3xl font-bold sm:text-4xl">Explore topics</h1><p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">Browse FitMe Pro Journal articles by topic, including nutrition, fitness, weight management, body composition, running and everyday wellness.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{JOURNAL_CATEGORIES.map(c=>{const image=CATEGORY_IMAGES[c.slug];return <Link key={c.slug} to={`/journal/${c.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-primary/40"><div className="aspect-[16/9] overflow-hidden bg-muted"><img src={image?.src} alt={image?.alt||`${c.name} journal topic`} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105"/></div><div className="p-5"><h2 className="text-lg font-semibold group-hover:text-primary">{c.name}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{c.description}</p><span className="mt-4 inline-block text-sm font-medium text-primary">Explore →</span></div></Link>})}</div></section>

    <section className="mt-10 rounded-3xl border border-white/10 bg-white/[.04] p-7 sm:p-10">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[.2em] text-primary">FitMe Pro Journal</p>
      <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Practical guidance for a healthier, stronger you.</h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Evidence-informed articles on nutrition, fitness, weight management, body composition, running and everyday wellness—written to help you understand the numbers behind your health.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Link to="/journal/evidence-sources" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold">Our evidence sources →</Link><Link to="/journal/editorial-standards" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold">Editorial standards →</Link></div>
    </section>

    <section className="mt-8" aria-label="Search journal articles"><label htmlFor="journal-search" className="mb-2 block text-sm font-semibold">Search articles</label><div className="relative"><input id="journal-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by article title, topic or keyword…" className="w-full rounded-2xl border border-white/10 bg-card px-5 py-4 pr-12 text-base outline-none transition focus:border-primary/50"/><span aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground">⌕</span></div>{normalized&&<p className="mt-2 text-sm text-muted-foreground">Showing matching articles.</p>}
      {normalized&&<div className="mt-5 grid gap-5 md:grid-cols-2">{searchResults.length?searchResults.map(a=><Link key={`${a.categorySlug}-${a.slug}`} to={`/journal/${a.categorySlug}/${a.slug}`} className="rounded-2xl border border-white/10 bg-card p-6 transition hover:border-primary/40"><span className="text-xs font-semibold uppercase tracking-wider text-primary">{a.readTime}</span><h3 className="mt-2 text-xl font-semibold">{a.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{a.description}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Read article →</span></Link>):<p className="text-sm text-muted-foreground">No matching articles found.</p>}</div>}
    </section>

  </div></main>
}
