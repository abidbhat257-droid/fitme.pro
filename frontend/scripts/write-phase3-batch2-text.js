const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const files=["phase3Batch2A.js","phase3Batch2B.js","phase3Batch2C.js"];
function load(name){let s=fs.readFileSync(path.join(root,"src","lib","journal",name),"utf8");s=s.replace(/export\s+const\s+[A-Z0-9_]+\s*=\s*/,"return ");return new Function(s)();}
const articles=files.flatMap(load);
for(const name of ["phase3Batch2ExtraSections.js","phase3Batch2ExtraSections2.js","phase3Batch2ExtraSections3.js"]){
 const extras=load(name);
 for(const a of articles){if(extras[a.slug])a.sections=[...a.sections,...extras[a.slug]];}
}
const out=articles.map(a=>`# ${a.title}\n\nSlug: ${a.slug}\n\n${a.description}\n\n${a.sections.map(([h,t])=>`## ${h}\n\n${t}`).join("\n\n")}\n\n## Frequently Asked Questions\n\n${a.faqs.map(([q,t])=>`### ${q}\n\n${t}`).join("\n\n")}`).join("\n\n---\n\n");
fs.mkdirSync(path.join(root,"audit"),{recursive:true});
fs.writeFileSync(path.join(root,"audit","batch2-text.md"),out+"\n","utf8");
console.log(`Wrote ${articles.length} Batch 2 articles to frontend/audit/batch2-text.md`);