const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const sourcePath = path.join(root, "src", "lib", "journalExpansion.js");
const tempPath = path.join(build, "__fitme_journal_expansion.mjs");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error(`Build output not found: ${indexPath}`);
if (!fs.existsSync(sourcePath)) throw new Error(`Journal expansion source not found: ${sourcePath}`);
const esc = (v) => String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;");
const json = (v) => JSON.stringify(v).replace(/</g,"\\u003c");
function meta(html,title,description,canonical){
 html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(title)}</title>`);
 html=html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i,`<meta name="description" content="${esc(description)}" />$1`);
 return html.replace(/<\/head>/i,`<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="article" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${canonical}" /></head>`);
}
function write(route,html){const dir=path.join(build,route.replace(/^\//,"").replace(/\/$/,""));fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,"index.html"),html,"utf8");}
(async()=>{
 try{
  fs.writeFileSync(tempPath,fs.readFileSync(sourcePath,"utf8"),"utf8");
  const mod=await import(`${pathToFileURL(tempPath).href}?v=${Date.now()}`); const articles=mod.JOURNAL_EXPANSION_ARTICLES||[]; const base=fs.readFileSync(indexPath,"utf8");
  for(const article of articles){
   const canonical=`${siteUrl}/journal/${article.categorySlug}/${article.slug}`;
   const schema={"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.description,datePublished:"2026-09-03",dateModified:"2026-09-03",mainEntityOfPage:{"@type":"WebPage","@id":canonical},author:{"@type":"Organization",name:"FitMe Pro"},publisher:{"@type":"Organization",name:"FitMe Pro",url:siteUrl},articleSection:article.category,keywords:article.keywords,isAccessibleForFree:true};
   const sections=article.sections.map(([h,t])=>`<section><h2>${esc(h)}</h2><p>${esc(t)}</p></section>`).join("");
   const sources=article.sources.map(s=>`<li><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join("");
   const body=`<main><article style="max-width:900px;margin:0 auto;padding:40px 20px"><a href="/journal/${article.categorySlug}">← ${esc(article.category)} Journal</a><header><p>${esc(article.category)} · ${esc(article.readTime)}</p><h1>${esc(article.title)}</h1><p>${esc(article.description)}</p><p>Published September 3, 2026 · FitMe Pro Journal</p></header>${sections}<section><h2>Explore related FitMe Pro tools</h2><ul><li><a href="/bmr-calculator">BMR Calculator</a></li><li><a href="/tdee-calculator">TDEE Calculator</a></li><li><a href="/protein-calculator">Protein Calculator</a></li><li><a href="/calorie-deficit-calculator">Calorie Deficit Calculator</a></li></ul></section><section><h2>Sources & further reading</h2><ul>${sources}</ul><p>FitMe Pro uses authoritative public-health guidance as a reference and does not reproduce source publications. Content is educational and should not replace individualized medical advice.</p></section></article></main>`;
   let html=meta(base,`${article.title} | FitMe Pro Journal`,article.description,canonical); html=html.replace(/<div id="root"><\/div>/i,`<div id="root">${body}</div>`).replace(/<\/head>/i,`<script type="application/ld+json">${json(schema)}</script></head>`); write(`/journal/${article.categorySlug}/${article.slug}`,html);
  }
  console.log(`Prerendered ${articles.length} expanded Journal articles.`);
 }finally{try{fs.unlinkSync(tempPath)}catch(_){} }
})().catch(e=>{console.error("Journal expansion prerender failed:",e);process.exit(1)});
