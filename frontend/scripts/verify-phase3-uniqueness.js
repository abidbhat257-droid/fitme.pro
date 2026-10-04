const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,".."),build=path.join(root,"build"),journal=path.join(build,"journal");
if(!fs.existsSync(journal)) throw new Error("Missing built Journal directory.");
const files=fs.readdirSync(path.join(root,"src","lib","journal")).filter(f=>/^phase3Batch(?:1|2[ABC]|3|4|5(?:Part2)?)\.js$/.test(f)).sort();
const groups={Batch1:files.filter(f=>f==="phase3Batch1.js"),Batch2:files.filter(f=>/^phase3Batch2[ABC]\.js$/.test(f)),Batch3:files.filter(f=>f==="phase3Batch3.js"),Batch4:files.filter(f=>f==="phase3Batch4.js"),Batch5:files.filter(f=>/^phase3Batch5(?:Part2)?\.js$/.test(f))};
function loadSlugs(file){
 const src=fs.readFileSync(path.join(root,"src","lib","journal",file),"utf8");
 return [...src.matchAll(/["\']?slug["\']?\s*:\s*["\']([^"\']+)["\']/g)].map(m=>m[1]);
}
const byBatch={};for(const [batch,names] of Object.entries(groups)){byBatch[batch]=[];for(const file of names) byBatch[batch].push(...loadSlugs(file));}
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name==="index.html")out.push(p)}return out}
function clean(html){
 const start=html.indexOf("<article"); const end=html.lastIndexOf("</article>");
 let x=start>=0&&end>start?html.slice(start,end):html;
 x=x.replace(/<header[\s\S]*?<\/header>/gi," ").replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ");
 x=x.replace(/<section[\s\S]*?<h2[^>]*>(?:Use the matching FitMe Pro calculator|Check the numbers with FitMe Pro|Related FitMe Pro tools and guides|Health and wellness calculators)<\/h2>[\s\S]*?<\/section>/gi," ");
 x=x.replace(/<section[\s\S]*?<h2[^>]*>Frequently Asked Questions<\/h2>[\s\S]*?<\/section>/gi," ");
 x=x.replace(/<section[\s\S]*?<h2[^>]*>Sources(?:\s*&amp;|\s*&)?\s*further reading<\/h2>[\s\S]*?<\/section>/gi," ");
 x=x.replace(/<[^>]+>/g," ").replace(/https?:\/\/\S+/g," URL ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim();
 return x;
}
function sentences(text){return text.split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(s=>s.split(/\s+/).length>=8);}
function sixgrams(text){const w=text.toLowerCase().replace(/[^a-z0-9'\s]/g," ").split(/\s+/).filter(Boolean),set=new Set();for(let i=0;i<=w.length-6;i++)set.add(w.slice(i,i+6).join(" "));return set;}
function headings(html){
 const start=html.indexOf("<article"); const end=html.lastIndexOf("</article>");
 html=start>=0&&end>start?html.slice(start,end):html;
 return [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m=>m[1].replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim()).filter(h=>!/^(Frequently Asked Questions|Sources(?:\s*&| and)?\s*further reading|Use the matching FitMe Pro calculator|Check the numbers with FitMe Pro|Related FitMe Pro tools and guides|Health and wellness calculators)$/i.test(h));
}
const built=walk(build),lookup=new Map();
for(const file of built){const rel=path.relative(build,file).replace(/\\/g,"/");const m=rel.match(/^journal\/[^/]+\/([^/]+)\/index\.html$/);if(m)lookup.set(m[1],fs.readFileSync(file,"utf8"));}
const reports=[],failures=[];
for(const [batch,slugs] of Object.entries(byBatch)){
 if(batch==="Batch4"){
   reports.push({batch,articles:slugs.length,skippedNoindex:true,sentenceViolations:0,highestSixWordPhraseOverlapPercent:0,headingViolations:0});
   continue;
 }
 const arts=slugs.map(slug=>({slug,html:lookup.get(slug)})).filter(a=>a.html);
 const sentMap=new Map(), headMap=new Map(), grams=new Map(), topicSentMap=new Map();
 for(const a of arts){
   const text=clean(a.html);
   for(const s of new Set(sentences(text))){const key=s.toLowerCase();if(!sentMap.has(key))sentMap.set(key,new Set());sentMap.get(key).add(a.slug);}
   for(const h of new Set(headings(a.html))){const key=h.toLowerCase();if(!headMap.has(key))headMap.set(key,new Set());headMap.get(key).add(a.slug);}
   grams.set(a.slug,sixgrams(text));
   if(batch==="Batch5"){
     const hs=a.html.indexOf("<h1"), he=a.html.indexOf("</h1>",hs);
     const topic=(hs>=0&&he>hs?a.html.slice(hs+4,he):"").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\\s+/g," ").trim();
     const normalized=topic?text.toLowerCase().split(topic.toLowerCase()).join("x"):text.toLowerCase();
     for(const s of new Set(sentences(normalized))){const key=s.toLowerCase();if(!topicSentMap.has(key))topicSentMap.set(key,new Set());topicSentMap.get(key).add(a.slug);}
   }
 }
 const sentenceViolations=[...sentMap.entries()].filter(([,s])=>s.size>2).map(([sentence,s])=>({sentence,articles:[...s]}));
 const headingViolations=[...headMap.entries()].filter(([,s])=>s.size>3).map(([heading,s])=>({heading,articles:[...s]}));
 let highest={percent:0,a:"",b:"",shared:0,denominator:0};
 for(let i=0;i<arts.length;i++)for(let j=i+1;j<arts.length;j++){const A=grams.get(arts[i].slug),B=grams.get(arts[j].slug),shared=[...A].filter(x=>B.has(x)).length,den=Math.min(A.size,B.size),pct=den?shared/den*100:0;if(pct>highest.percent)highest={percent:Number(pct.toFixed(2)),a:arts[i].slug,b:arts[j].slug,shared,denominator:den};}
 const topicSentenceViolations=[...topicSentMap.entries()].filter(([,s])=>s.size>=3).map(([sentence,s])=>({sentence,articles:[...s]}));
 const topicSentenceTotal=arts.reduce((sum,a)=>sum+sentences(clean(a.html)).length,0);
 const topicSentenceViolationPercent=topicSentenceTotal?Number((topicSentenceViolations.reduce((sum,v)=>sum+v.articles.length,0)/topicSentenceTotal*100).toFixed(2)):0;
 const report={articles:arts.length,sentenceMaxShared:sentenceViolations.length?Math.max(...sentenceViolations.map(v=>v.articles.length)):0,sentenceViolations:sentenceViolations.length,highestSixWordPhraseOverlapPercent:highest.percent,highestSixWordPhrasePair:[highest.a,highest.b],headingMaxShared:headingViolations.length?Math.max(...headingViolations.map(v=>v.articles.length)):0,headingViolations:headingViolations.length,topicSentenceViolations:topicSentenceViolations.length,topicSentenceViolationPercent};
 reports.push({batch,...report});
 if(sentenceViolations.length||highest.percent>=10||headingViolations.length||(batch==="Batch5"&&topicSentenceViolationPercent>5))failures.push({batch,sentenceViolations:sentenceViolations.slice(0,5),highest,headingViolations:headingViolations.slice(0,5),topicSentenceViolations:topicSentenceViolations.slice(0,5),topicSentenceViolationPercent});
}
console.log(JSON.stringify({ruleA:"No sentence of 8+ words may occur in more than 2 articles of a batch.",ruleB:"Highest shared unique 6-word-phrase overlap must be <10% of the smaller article phrase set.",ruleC:"No section heading may occur in more than 3 articles, excluding FAQ and Sources headings.",reports,failures},null,2));
if(failures.length)process.exit(23);
