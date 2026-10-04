const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,".."),build=path.join(root,"build"),journal=path.join(build,"journal");
const slugs=new Set(["body-recomposition-tips-for-ectomorphs-hardgainers","the-ultimate-body-recomposition-guide-for-beginners","body-recomposition-for-women-training-and-nutrition-tweaks","carb-cycling-for-body-recomposition-a-complete-guide","how-long-does-body-recomposition-take-realistic-timelines","how-to-break-through-a-body-recomposition-plateau","visceral-fat-vs-subcutaneous-fat-the-dangerous-difference","body-recomposition-diet-plan-what-to-eat-every-day","cardio-vs-weights-for-body-recomposition-the-definitive-verdict","how-full-body-workouts-accelerate-fat-loss-and-muscle-growth","how-to-structure-a-4-day-body-recomposition-workout-split","ketogenic-diet-vs-high-protein-diet-for-body-recomposition","what-is-a-realistic-monthly-percentage-of-muscle-gain","the-best-macronutrient-ratios-for-fat-loss-and-muscle-gain","does-neat-non-exercise-activity-thermogenesis-beat-gym-workouts-for-fat-loss","how-to-transition-from-a-bulk-to-a-body-recomposition-phase","what-is-metabolic-adaptation-why-fat-loss-gets-harder-over-time","is-it-better-to-bulk-and-cut-or-do-a-body-recomp","should-you-use-a-meal-plan-for-muscle-gain-or-fat-loss-first","how-to-set-body-composition-goals-a-practical-framework-for-fat-loss-and-muscle-gain"]);
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name==="index.html")out.push(p)}return out}
function strip(html){return html.replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim()}
const files=walk(journal).filter(f=>slugs.has(path.relative(journal,f).replace(/\\/g,"/").split("/")[1]));
const rows=[],failures=[],sourceUse=new Map();
for(const file of files){
 const html=fs.readFileSync(file,"utf8"),rel=path.relative(journal,file).replace(/\\/g,"/"),slug=rel.split("/")[1];
 const words=strip(html).split(" ").filter(Boolean).length;
 const faqStart=html.indexOf(">Frequently Asked Questions</h2>"),faqEnd=html.indexOf("</section>",faqStart); const faq=faqStart>=0&&faqEnd>faqStart?(html.slice(faqStart,faqEnd).match(/<h3/g)||[]).length:0;
 const example=/<h2[^>]*>Example(?:\b|:)/i.test(html)?1:0;
 const sourceStart=html.indexOf("Sources & further reading"),sourceEnd=html.indexOf("</section>",sourceStart);
 const sourceHtml=sourceStart>=0&&sourceEnd>sourceStart?html.slice(sourceStart,sourceEnd):"";
 const external=[...new Set((sourceHtml.match(/https?:\/\/[^"' <]+/g)||[]))];
 for(const u of external)sourceUse.set(u,(sourceUse.get(u)||0)+1);
 const calcLinks=[...new Set((html.match(/href=["'](\/[^"']+-calculator)["']/gi)||[]).map(x=>x.replace(/^href=["']/i,"").replace(/["']$/,"")))];
 const forbidden=html.includes("article-specific context")||html.includes("section 1 point")||/—\s*(?:article-specific context|label)\s*\d+/i.test(html);
 const hs=html.indexOf("<h1"),ht=html.indexOf(">",hs),he=html.indexOf("</h1>",ht);
 const title=hs>=0&&ht>hs&&he>ht?strip(html.slice(ht+1,he)):"";
 const robots=html.includes('<meta name="robots" content="index,follow');
 rows.push({title,slug,wordCount:words,faqs:faq,example:example?"yes":"no",calculatorLinks:calcLinks,noForbiddenLabels:!forbidden});
 if(words<1000||faq!==1||example<1||forbidden||!robots)failures.push(slug);
}
const overused=[...sourceUse.entries()].filter(([,n])=>n>3).map(([url,n])=>({url,count:n}));
console.log(JSON.stringify({articles:rows.length,failures,sourceReuseViolations:overused,rows},null,2));
if(files.length!==20||failures.length||overused.length)process.exit(31);