const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,".."),build=path.join(root,"build");
if(!fs.existsSync(build)) throw new Error("Missing build directory.");
const sourcePath=path.join(root,"src","lib","journal","phase3Batch4.js");
let source=fs.readFileSync(sourcePath,"utf8").replace(/export\\s+const\\s+PHASE3_BATCH4_ARTICLES\\s*=\\s*/,"return ");
const articles=new Function(source)();
const failures=[];
function htmlFor(slug){const file=path.join(build,"journal","weight-loss",slug,"index.html");return fs.existsSync(file)?fs.readFileSync(file,"utf8"):null;}
function text(html){return String(html).replace(/<script[\\s\\S]*?<\\/script>/gi," ").replace(/<style[\\s\\S]*?<\\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\\s+/g," ").trim();}
function words(html){const m=html.match(/<article\\b[^>]*>([\\s\\S]*?)<\\/article>/i);return m?text(m[1]).split(/\\s+/).filter(Boolean).length:0;}
const rows=[];
for(const a of articles){
 const html=htmlFor(a.slug);
 if(!html){failures.push(a.slug+": missing built page");continue;}
 const wc=words(html);
 const headings=[...html.matchAll(/<h2[^>]*>([\\s\\S]*?)<\\/h2>/gi)].map(m=>text(m[1]));
 const hasExample=headings.some(h=>/^(Example|Worked example)\\b/i.test(h));
 const faqSection=html.match(/<h2[^>]*>Frequently Asked Questions<\\/h2>([\\s\\S]*?)(?=<h2|<\\/article>)/i);
 const faqCount=faqSection?(faqSection[1].match(/<h3[^>]*>/gi)||[]).length:0;
 const schemaFaq=[...html.matchAll(/<script[^>]*type=["']application\\/ld\\+json["'][^>]*>([\\s\\S]*?)<\\/script>/gi)].reduce((n,m)=>{try{const p=JSON.parse(m[1]);const g=Array.isArray(p["@graph"])?p["@graph"]:[p];const f=g.find(x=>x&&x["@type"]==="FAQPage");return n+(f&&Array.isArray(f.mainEntity)?f.mainEntity.length:0)}catch{return n}},0);
 const sourceCount=a.sources.length;
 const calculatorOk=a.matchingCalculators.some(c=>html.includes('href="'+c.url+'"')||html.includes("href=\""+c.url+"\""));
 const forbidden=headings.filter(h=>/^(Final check|Evidence boundary)$/i.test(h));
 if(wc<1000)failures.push(a.slug+": word count "+wc);
 if(faqCount!==4||schemaFaq!==4)failures.push(a.slug+": FAQ visible/schema "+faqCount+"/"+schemaFaq);
 if(!hasExample)failures.push(a.slug+": missing Example/Worked example heading");
 if(sourceCount<2||sourceCount>4)failures.push(a.slug+": source count "+sourceCount);
 if(!calculatorOk)failures.push(a.slug+": matching calculator link missing");
 if(forbidden.length)failures.push(a.slug+": forbidden heading "+forbidden.join(", "));
 rows.push({title:a.title,slug:a.slug,wordCount:wc,faqs:faqCount,example:hasExample?"yes":"no",readTime:Math.max(1,Math.round(wc/200))+" min read"});
}
const sourceCounts={};for(const a of articles)for(const s of a.sources)sourceCounts[s.url]=(sourceCounts[s.url]||0)+1;
for(const [url,count] of Object.entries(sourceCounts))if(count>3)failures.push("source reused more than 3 times: "+url+" ("+count+")");
const allBuilt=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.name==="index.html")allBuilt.push(f);}}walk(build);
const arithmeticFiles=allBuilt.filter(f=>/arithmetic reconciles/i.test(fs.readFileSync(f,"utf8")));
console.log(JSON.stringify({batch4:rows,sourceReuse:Object.fromEntries(Object.entries(sourceCounts).map(([u,n])=>[u,n])),builtPagesContainingArithmeticReconciles:arithmeticFiles.length,failures},null,2));
if(failures.length||arithmeticFiles.length)process.exit(21);