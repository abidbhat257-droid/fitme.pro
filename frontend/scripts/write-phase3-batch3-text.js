const fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
function load(name){let s=fs.readFileSync(path.join(root,"src","lib","journal",name),"utf8");s=s.replace(/export\s+const\s+[A-Z0-9_]+\s*=\s*/,"return ");return new Function(s)();}
const articles=load("phase3Batch3.js");
const extras=load("phase3Batch3ExtraSections.js");
for(const a of articles){if(extras[a.slug])a.sections=[...a.sections,...extras[a.slug]];}
const out=articles.map(a=>`# ${a.title}\n\nSlug: ${a.slug}\n\n${a.description}\n\n${a.sections.map(([h,t])=>`## ${h}\n\n${t}`).join("\n\n")}\n\n## Frequently Asked Questions\n\n${a.faqs.map(([q,t])=>`### ${q}\n\n${t}`).join("\n\n")}\n\n## Sources\n\n${a.sources.map(s=>`- [${s.label}](${s.url})`).join("\n")}`).join("\n\n---\n\n");
fs.mkdirSync(path.join(root,"audit"),{recursive:true});
fs.writeFileSync(path.join(root,"audit","batch3-text.md"),out+"\n","utf8");
console.log(`Wrote ${articles.length} Batch 3 articles to frontend/audit/batch3-text.md`);
