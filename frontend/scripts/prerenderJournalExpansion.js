const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const journalPath = path.join(root, "src", "lib", "journalContent.js");
const expansionPath = path.join(root, "src", "lib", "journalExpansion.js");
const longformPath = path.join(root, "src", "lib", "journalLongform.js");
const tempJournalPath = path.join(build, "__fitme_journal.mjs");
const tempExpansionPath = path.join(build, "__fitme_journal_expansion.mjs");
const tempLongformPath = path.join(build, "__fitme_journal_longform.mjs");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error(`Build output not found: ${indexPath}`);
for (const required of [journalPath, expansionPath, longformPath]) {
  if (!fs.existsSync(required)) throw new Error(`Required Journal source not found: ${required}`);
}

const esc = (v) => String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;");
const json = (v) => JSON.stringify(v).replace(/</g,"\\u003c");

function meta(html,title,description,canonical){
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(title)}</title>`);
  html=html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i,`<meta name="description" content="${esc(description)}" />$1`);
  return html.replace(/<\/head>/i,`<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="article" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${canonical}" /></head>`);
}

function write(route,html){
  const dir=path.join(build,route.replace(/^\//,"").replace(/\/$/,""));
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,"index.html"),html,"utf8");
}

(async()=>{
  try{
    fs.writeFileSync(tempJournalPath,fs.readFileSync(journalPath,"utf8"),"utf8");
    fs.writeFileSync(tempExpansionPath,fs.readFileSync(expansionPath,"utf8"),"utf8");
    fs.writeFileSync(tempLongformPath,fs.readFileSync(longformPath,"utf8"),"utf8");

    const journalMod=await import(`${pathToFileURL(tempJournalPath).href}?v=${Date.now()}`);
    const expansionMod=await import(`${pathToFileURL(tempExpansionPath).href}?v=${Date.now()}`);
    const longformMod=await import(`${pathToFileURL(tempLongformPath).href}?v=${Date.now()}`);

    const baseArticles=journalMod.JOURNAL_ARTICLES||[];
    const expansionArticles=expansionMod.JOURNAL_EXPANSION_ARTICLES||[];
    const getLongFormJournalArticle=longformMod.getLongFormJournalArticle;
    if(typeof getLongFormJournalArticle!=="function") throw new Error("getLongFormJournalArticle was not exported from journalLongform.js");

    const bySlug=new Map();
    for(const article of [...baseArticles,...expansionArticles]) bySlug.set(article.slug,article);
    const articles=[...bySlug.values()].map(getLongFormJournalArticle);
    const base=fs.readFileSync(indexPath,"utf8");

    for(const article of articles){
      const canonical=`${siteUrl}/journal/${article.categorySlug}/${article.slug}`;
      const schema={"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.description,datePublished:"2026-09-03",dateModified:"2026-09-03",mainEntityOfPage:{"@type":"WebPage","@id":canonical},author:{"@type":"Organization",name:"FitMe Pro"},publisher:{"@type":"Organization",name:"FitMe Pro",url:siteUrl},articleSection:article.category,keywords:article.keywords,isAccessibleForFree:true};
      const sections=article.sections.map(([h,t])=>`<section style="margin:0 0 48px"><h2 style="margin:0 0 18px;line-height:1.25;letter-spacing:normal;word-spacing:normal">${esc(h)}</h2><p style="margin:0;line-height:1.9">${esc(t)}</p></section>`).join("");
      const sources=article.sources.map(s=>`<li style="margin-bottom:10px"><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join("");
      const body=`<main><article style="max-width:900px;margin:0 auto;padding:48px 20px;font-family:Arial,sans-serif;overflow-wrap:anywhere"><a href="/journal/${article.categorySlug}" style="display:inline-block;margin-bottom:28px">← ${esc(article.category)} Journal</a><header style="margin-bottom:48px;padding-bottom:32px;border-bottom:1px solid #ddd"><p style="margin-bottom:14px;letter-spacing:.04em">${esc(article.category)} · ${esc(article.readTime)}</p><h1 style="margin:0 0 22px;line-height:1.15;letter-spacing:normal;word-spacing:normal;overflow-wrap:anywhere">${esc(article.title)}</h1><p style="margin:0 0 18px;line-height:1.8">${esc(article.description)}</p><p style="margin:0">Published September 3, 2026 · FitMe Pro Journal</p></header>${sections}<section style="margin:0 0 48px;padding:28px;border:1px solid #ddd;border-radius:20px"><h2 style="margin:0 0 16px;line-height:1.25;letter-spacing:normal;word-spacing:normal">Explore related FitMe Pro tools</h2><p style="line-height:1.8">Use our calculators to explore estimates alongside the information in this guide.</p><ul><li><a href="/bmr-calculator">BMR Calculator</a></li><li><a href="/tdee-calculator">TDEE Calculator</a></li><li><a href="/protein-calculator">Protein Calculator</a></li><li><a href="/calorie-deficit-calculator">Calorie Deficit Calculator</a></li></ul></section><section style="padding-top:32px;border-top:1px solid #ddd"><h2 style="margin:0 0 18px;line-height:1.25;letter-spacing:normal;word-spacing:normal">Sources & further reading</h2><ul>${sources}</ul><p style="margin-top:24px;line-height:1.7">FitMe Pro uses authoritative public-health guidance as a reference and does not reproduce source publications. Content is educational and should not replace individualized medical advice.</p></section></article></main>`;
      let html=meta(base,`${article.title} | FitMe Pro Journal`,article.description,canonical);
      html=html.replace(/<div id="root"><\/div>/i,`<div id="root">${body}</div>`).replace(/<\/head>/i,`<script type="application/ld+json">${json(schema)}</script></head>`);
      write(`/journal/${article.categorySlug}/${article.slug}`,html);
    }

    console.log(`Prerendered ${articles.length} long-form Journal articles (base + expanded).`);
  }finally{
    for(const file of [tempJournalPath,tempExpansionPath,tempLongformPath]){try{fs.unlinkSync(file)}catch(_){} }
  }
})().catch(e=>{console.error("Journal long-form prerender failed:",e);process.exit(1)});
