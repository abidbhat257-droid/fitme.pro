import React from "react";
import { Link } from "react-router-dom";

const WHO_HEALTHY_DIET = "https://www.who.int/news-room/fact-sheets/detail/healthy-diet";
const WHO_PHYSICAL_ACTIVITY = "https://www.who.int/news-room/fact-sheets/detail/physical-activity";
const WHO_OBESITY = "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight";
const WHO_FAO_DIETS = "https://www.who.int/publications/i/item/9789240101876";

export default function EditorialStandards() {
  return <main className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
    <Link to="/journal" className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">FitMe Pro Journal</Link>
    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Editorial policy</p>
    <h1 className="mt-2 font-display text-4xl uppercase tracking-tighter sm:text-5xl">Evidence & Editorial Standards</h1>
    <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">FitMe Pro Journal is designed to make health, nutrition, fitness and body-composition information easier to understand. Our articles are original educational content informed by authoritative public-health and scientific sources.</p>
    <div className="mt-10 space-y-8 text-sm leading-7">
      <section><h2 className="font-display text-2xl uppercase tracking-tight">How we research</h2><p className="mt-3">We prioritize primary guidance and authoritative organizations. For nutrition and physical activity topics, the World Health Organization is an important reference. We also use other reputable medical, scientific and public-health sources when a topic requires additional evidence or specialized guidance.</p></section>
      <section><h2 className="font-display text-2xl uppercase tracking-tight">Original writing</h2><p className="mt-3">FitMe Pro does not copy articles from WHO, competitors or other publishers. Sources are used to understand the evidence and recommendations; our articles are independently written, structured and explained for readers.</p></section>
      <section><h2 className="font-display text-2xl uppercase tracking-tight">Global perspective</h2><p className="mt-3">Healthy diets and fitness practices can look different across countries and cultures. We avoid presenting one country's foods or habits as the universal standard. Where appropriate, we explain principles that can be adapted to locally available foods, cultural preferences, budgets and individual needs.</p></section>
      <section><h2 className="font-display text-2xl uppercase tracking-tight">Health and safety</h2><p className="mt-3">Calculator results are estimates and Journal articles are educational. They are not diagnoses or individualized medical prescriptions. Health conditions, pregnancy, eating disorders, medications, injuries and other special circumstances may require professional guidance.</p></section>
      <section><h2 className="font-display text-2xl uppercase tracking-tight">Our core nutrition references</h2><p className="mt-3">WHO's current healthy-diet guidance describes adequacy, balance, moderation and diversity as core principles and notes that the exact composition of a healthy diet varies with individual and cultural context. Its guidance also covers fruits and vegetables, dietary fibre, free sugars, fats, protein and sodium.</p><ul className="mt-4 list-disc space-y-2 pl-6"><li><a className="underline" href={WHO_HEALTHY_DIET} target="_blank" rel="noreferrer">WHO — Healthy diet</a></li><li><a className="underline" href={WHO_FAO_DIETS} target="_blank" rel="noreferrer">WHO & FAO — What are healthy diets?</a></li><li><a className="underline" href={WHO_PHYSICAL_ACTIVITY} target="_blank" rel="noreferrer">WHO — Physical activity</a></li><li><a className="underline" href={WHO_OBESITY} target="_blank" rel="noreferrer">WHO — Obesity and overweight</a></li></ul></section>
      <section><h2 className="font-display text-2xl uppercase tracking-tight">Updates and corrections</h2><p className="mt-3">Health guidance can change as evidence develops. We aim to review important articles periodically and update claims when authoritative recommendations change. If you spot an error or outdated statement, please use the <Link to="/contact" className="underline">Contact page</Link> to let us know.</p></section>
    </div>
  </main>;
}
