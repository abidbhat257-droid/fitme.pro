import React,{useEffect,useMemo}from"react";
import{Link}from"react-router-dom";
import{ArrowRight}from"@phosphor-icons/react";
import{CALCULATORS}from"@/lib/calculators";
import{SPECIALIZED_CALCULATORS}from"@/lib/specializedCalculators";
import{NEW_CALCULATORS}from"@/lib/newSpecializedCalculators";

const GROUPS=[
 {name:"Body Composition & Body Measurements",match:["body composition","body measurements","body composition & body measurements","basic","composition","shape"]},
 {name:"Weight, BMI & Weight Goals",match:["weight, bmi & weight goals"]},
 {name:"Calories & Metabolism",match:["calories & metabolism","metabolism"]},
 {name:"Nutrition & Macronutrients",match:["nutrition & macronutrients","nutrition & fitness"]},
 {name:"Running, Cardio & Endurance",match:["running, cardio & endurance","running & training","running & cardio"]},
 {name:"Strength & Gym Performance",match:["strength & gym performance","strength training","strength & gym"]},
 {name:"Heart Rate & Cardiovascular Metrics",match:["heart rate & cardiovascular metrics","heart & fitness"]},
];
const EXCLUDED=new Set(["navy-body-fat","weight-loss-goal","weight-gain-goal","army-body-fat-calculator","calorie-calculator"]);
const clean=c=>({id:c.id,name:c.name,slug:c.slug||c.id,category:c.category});
export default function CalculatorsDirectory(){
 const all=useMemo(()=>[...CALCULATORS,...SPECIALIZED_CALCULATORS,...NEW_CALCULATORS].filter(c=>!EXCLUDED.has(c.id)).reduce((acc,c)=>{if(!acc.some(x=>x.id===c.id))acc.push(clean(c));return acc},[]),[]);
 const groups=GROUPS.map(g=>{const wanted=new Set(g.match.map(x=>x.toLowerCase()));return{...g,items:all.filter(c=>wanted.has(String(c.category||"").toLowerCase()))}});
 const assigned=new Set(groups.flatMap(g=>g.items.map(c=>c.id)));
 const uncategorized=all.filter(c=>!assigned.has(c.id));
 useEffect(()=>{document.title="100 Health & Fitness Calculators — FitMe Pro";let d=document.querySelector('meta[name="description"]');if(!d){d=document.createElement("meta");d.name="description";document.head.appendChild(d)}d.content="Browse 100 free health and fitness calculators for body composition, weight goals, calories, nutrition, running, strength and cardiovascular metrics.";let l=document.querySelector('link[rel="canonical"]');if(!l){l=document.createElement("link");l.rel="canonical";document.head.appendChild(l)}l.href=`${window.location.origin}/calculators`},[]);
 return <main className="min-h-screen px-6 py-12 sm:px-10"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]">FitMe Pro Directory</div><h1 className="mt-3 font-display text-4xl uppercase tracking-tighter sm:text-5xl">100 Health &amp; Fitness Calculators</h1><p className="mt-4 text-base leading-8 text-muted-foreground">Explore FitMe Pro's calculator library by topic. Each tool is free to use and explains its inputs, formula, result and limitations.</p></div><div className="mt-12 space-y-12">{groups.map(g=><section key={g.name}><div className="mb-5 flex items-baseline gap-3"><h2 className="font-display text-2xl uppercase tracking-tight">{g.name}</h2><span className="font-mono-data text-xs text-muted-foreground">{g.items.length}</span></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{g.items.map(c=><Link key={c.id} to={`/${c.slug}`} className="group flex items-center justify-between border border-border bg-card p-4 hover:border-[var(--brand-lime)]"><span className="text-sm font-semibold">{c.name}</span><ArrowRight size={15} className="text-muted-foreground group-hover:text-[var(--brand-lime)]"/></Link>)}</div></section>)}{uncategorized.length>0&&<section><div className="mb-5 flex items-baseline gap-3"><h2 className="font-display text-2xl uppercase tracking-tight">More Calculators</h2><span className="font-mono-data text-xs text-muted-foreground">{uncategorized.length}</span></div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{uncategorized.map(c=><Link key={c.id} to={`/${c.slug}`} className="group flex items-center justify-between border border-border bg-card p-4 hover:border-[var(--brand-lime)]"><span className="text-sm font-semibold">{c.name}</span><ArrowRight size={15} className="text-muted-foreground group-hover:text-[var(--brand-lime)]"/></Link>)}</div></section>}</div><div className="mt-12 border-t border-border pt-8"><Link to="/" className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">← Back to dashboard</Link></div></div></main>
}
