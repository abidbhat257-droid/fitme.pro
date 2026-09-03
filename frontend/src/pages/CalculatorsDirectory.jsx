import React,{useEffect,useMemo}from"react";
import{Link}from"react-router-dom";
import{ArrowRight}from"@phosphor-icons/react";
import{CALCULATORS}from"@/lib/calculators";
import{SPECIALIZED_CALCULATORS}from"@/lib/specializedCalculators";
import{NEW_CALCULATORS}from"@/lib/newSpecializedCalculators";

const GROUPS=[
 {name:"Body Composition & Body Measurements",match:["Body Composition","basic","composition","shape"]},
 {name:"Weight, BMI & Weight Goals",match:["Weight, BMI & Weight Goals"]},
 {name:"Calories & Metabolism",match:["Calories & Metabolism","metabolism"]},
 {name:"Nutrition & Macronutrients",match:["Nutrition & Macronutrients"]},
 {name:"Running, Cardio & Endurance",match:["Running, Cardio & Endurance","Running & Cardio"]},
 {name:"Strength & Gym Performance",match:["Strength & Gym Performance","Strength & Gym"]},
 {name:"Heart Rate & Cardiovascular Metrics",match:["Heart Rate & Cardiovascular Metrics","Heart & Fitness"]},
];
const clean=c=>({id:c.id,name:c.name,slug:c.slug||c.id,category:c.category});
export default function CalculatorsDirectory(){
 const all=useMemo(()=>[...CALCULATORS,...SPECIALIZED_CALCULATORS.filter(c=>!c.id.includes("army")&&!c.id.includes("navy")&&!c.id.includes("weight-loss-goal")&&!c.id.includes("weight-gain-goal")&&!c.id.includes("calorie-calculator")),...NEW_CALCULATORS].map(clean),[]);
 const groups=GROUPS.map(g=>({...g,items:all.filter(c=>g.match.includes(c.category)||g.match.includes(c.category?.toLowerCase()))}));
 useEffect(()=>{document.title="100 Health & Fitness Calculators — FitMe Pro";let d=document.querySelector('meta[name="description"]');if(!d){d=document.createElement("meta");d.name="description";document.head.appendChild(d)}d.content="Browse 100 free health and fitness calculators for body composition, weight goals, calories, nutrition, running, strength and cardiovascular metrics.";let l=document.querySelector('link[rel="canonical"]');if(!l){l=document.createElement("link");l.rel="canonical";document.head.appendChild(l)}l.href=`${location.origin}/calculators`},[]);
 return <main className="min-h-screen px-6 py-12 sm:px-10"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]">FitMe Pro Directory</div><h1 className="mt-3 font-display text-4xl uppercase tracking-tighter sm:text-5xl">100 Health &amp; Fitness Calculators</h1><p className="mt-4 text-base leading-8 text-muted-foreground">Explore FitMe Pro's calculator library by topic. Each tool is free to use and explains its inputs, formula, result and limitations.</p></div><div className="mt-12 space-y-12">{groups.map(g=><section key={g.name}><div className="mb-5 flex items-baseline gap-3"><h2 className="font-display text-2xl uppercase tracking-tight">{g.name}</h2><span className="font-mono-data text-xs text-muted-foreground">{g.items.length}</span></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{g.items.map(c=><Link key={c.id} to={`/${c.slug}`} className="group flex items-center justify-between border border-border bg-card p-4 hover:border-[var(--brand-lime)]"><span className="text-sm font-semibold">{c.name}</span><ArrowRight size={15} className="text-muted-foreground group-hover:text-[var(--brand-lime)]"/></Link>)}</div></section>)}</div><div className="mt-12 border-t border-border pt-8"><Link to="/" className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">← Back to dashboard</Link></div></div></main>
}
