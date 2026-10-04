const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,".."),build=path.join(root,"build"),journal=path.join(build,"journal");
const slugs=new Set(["body-recomposition-tips-for-ectomorphs-hardgainers","the-ultimate-body-recomposition-guide-for-beginners","body-recomposition-for-women-training-and-nutrition-tweaks","carb-cycling-for-body-recomposition-a-complete-guide","how-long-does-body-recomposition-take-realistic-timelines","how-to-break-through-a-body-recomposition-plateau","visceral-fat-vs-subcutaneous-fat-the-dangerous-difference","body-recomposition-diet-plan-what-to-eat-every-day","cardio-vs-weights-for-body-recomposition-the-definitive-verdict","how-full-body-workouts-accelerate-fat-loss-and-muscle-growth","how-to-structure-a-4-day-body-recomposition-workout-split","ketogenic-diet-vs-high-protein-diet-for-body-recomposition","what-is-a-realistic-monthly-percentage-of-muscle-gain","the-best-macronutrient-ratios-for-fat-loss-and-muscle-gain","does-neat-non-exercise-activity-thermogenesis-beat-gym-workouts-for-fat-loss","how-to-transition-from-a-bulk-to-a-body-recomposition-phase","what-is-metabolic-adaptation-why-fat-loss-gets-harder-over-time","is-it-better-to-bulk-and-cut-or-do-a-body-recomp","should-you-use-a-meal-plan-for-muscle-gain-or-fat-loss-first","how-to-set-body-composition-goals-a-practical-framework-for-fat-loss-and-muscle-gain"]);
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name==="index.html")out.push(p)}return out}
function strip(html){return html.replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim()}
const files=walk(journal).filter(f=>slugs.has(path.relative(journal,f).replace(/\\/g,"/").split("/")[1]));
const rows=[];const failures=[];const sourceUse=new Map();
for(const file of files){
 const html=fs.readFileSync(file,"utf8"), rel=path.relative(journal,file).replace(/\\/g,"/"), slug=rel.split("/")[1];
 const words=strip(html).split(/\\s+/).filter(Boolean).length;
 const faq=(html.match(/<h2[^>]*>Frequently Asked Questions<\\/h2>/i)||[]).length;
 const example=(html.match(/<h2[^>]*>Example(?:\\b|:)/i)||[]).length;
 const sourceBlock=(html.match(/<h2[^>]*>Sources[^<]*<\\/h2>[\\s\\S]*?<\\/section>/i)||[])[0]||"";
 const links=[...sourceBlock.matchAll(/href=["'](https?:\\/\\/[^"']+)["']/gi)].map(m=>m[1]);
 for(const u of new Set(links)){sourceUse.set(u,(sourceUse.get(u)||0)+1)}
 const calcLinks=[...html.matchAll(/href=["'](\\/[^"']+-calculator)["']/gi)].map(m=>m[1]);
 const forbidden=/article-specific context|section 1 point|—\\s*(?:article-specific context|label)\\s*\\d+/i.test(html);
 const robots=(html.match(/<meta\\s+name=["']robots["'][^>]*content=["']([^"']*)["']/i)||[])[1]||"";
 rows.push({title:(html.match(/<h1[^>]*>([\\s\\S]*?)<\\/h1>/i)||[])[1]||"",slug,wordCount:words,faqs:faq,example:example>0,calculatorLinks:[...new Set(calcLinks)],noForbiddenLabels:!forbidden});
 if(words<1000||faq!==1||example<1||forbidden||!/index,follow/i.test(robots)) failures.push(slug);
}
const overused=[...sourceUse.entries()].filter(([,n])=>n>3).map(([url,n])=>({url,count:n}));
if(files.length!==20||failures.length||overused.length)process.exit(31);
console.log(JSON.stringify({articles:rows.length,failures,sourceReuseViolations:overused,rows},null,2));