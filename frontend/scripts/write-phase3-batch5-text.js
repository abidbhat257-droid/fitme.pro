const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
(async()=>{
 const mod=await import(path.join(root,"src","lib","journal","phase3Batch5.js"));
 const articles=mod.PHASE3_BATCH5_ALL||[];
 const lines=["# Phase 3 Body Composition Batch 5","","Generated from the 20 quarantined Body-Composition rewrite records.",""];
 for(const a of articles){
   lines.push("## "+a.title,"",a.description,"");
   for(const [h,t] of a.sections)lines.push("### "+h,"",t,"");
   lines.push("### Frequently Asked Questions","");
   for(const [q,x] of a.faqs)lines.push("**"+q+"**",x,"");
   lines.push("### Sources","");
   for(const s of a.sources)lines.push("- ["+s.label+"]("+s.url+")");
   lines.push("");
 }
 fs.writeFileSync(path.join(root,"audit","batch5-text.md"),lines.join("\n"),"utf8");
 console.log("Wrote "+articles.length+" Body Composition Batch 5 articles to frontend/audit/batch5-text.md");
})().catch(e=>{console.error(e);process.exit(1)});