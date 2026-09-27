const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const journalPath = path.join(root, "src", "lib", "journalContent.js");
const expansionPath = path.join(root, "src", "lib", "journalExpansion.js");
const longformPath = path.join(root, "src", "lib", "journalLongform.js");
const specialPath = path.join(root, "src", "lib", "journalSpecialArticles.js");
const tempJournalPath = path.join(build, "__fitme_journal.mjs");
const tempExpansionPath = path.join(build, "__fitme_journal_expansion.mjs");
const tempLongformPath = path.join(build, "__fitme_journal_longform.mjs");
const tempSpecialPath = path.join(build, "__fitme_journal_special.mjs");
const journalDataDir = path.join(build, "journal");
const specialArticleFiles = ["nutritionArticles.js","fitnessArticles.js","weightManagementArticles.js","bodyCompositionArticles.js","wellnessArticles.js","healthEducationArticles.js"];
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error(`Build output not found: ${indexPath}`);
for (const required of [journalPath, expansionPath, longformPath, specialPath]) {
  if (!fs.existsSync(required)) throw new Error(`Required Journal source not found: ${required}`);
}

const esc = (v) => String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;");
const json = (v) => JSON.stringify(v).replace(/</g,"\\u003c");

function stripSeoMeta(html) {
  return html
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:(?:type|title|description|url|site_name)["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");
}

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
    fs.mkdirSync(journalDataDir,{recursive:true});
    for(const file of specialArticleFiles){
      const source=path.join(root,"src","lib","journal",file);
      const dest=path.join(journalDataDir,file.endsWith(".js") ? file.slice(0, -3) + ".mjs" : file);
      if(!fs.existsSync(source)) throw new Error(`Required Journal article source not found: ${source}`);
      fs.writeFileSync(dest,fs.readFileSync(source,"utf8"),"utf8");
    }
    let specialSource=fs.readFileSync(specialPath,"utf8");
    for(const file of specialArticleFiles){
      const base=file.endsWith(".js") ? file.slice(0, -3) : file;
      specialSource=specialSource.replaceAll(`./journal/${base}`,`./journal/${base}.mjs`);
    }
    fs.writeFileSync(tempSpecialPath,specialSource,"utf8");

    const journalMod=await import(`${pathToFileURL(tempJournalPath).href}?v=${Date.now()}`);
    const expansionMod=await import(`${pathToFileURL(tempExpansionPath).href}?v=${Date.now()}`);
    const longformMod=await import(`${pathToFileURL(tempLongformPath).href}?v=${Date.now()}`);
    const specialMod=await import(`${pathToFileURL(tempSpecialPath).href}?v=${Date.now()}`);

    const baseArticles=journalMod.JOURNAL_ARTICLES||[];
    const expansionArticles=expansionMod.JOURNAL_EXPANSION_ARTICLES||[];
    const getLongFormJournalArticle=longformMod.getLongFormJournalArticle;
    const specialArticles=specialMod.JOURNAL_SPECIAL_ARTICLES||[];
    if(typeof getLongFormJournalArticle!=="function") throw new Error("getLongFormJournalArticle was not exported from journalLongform.js");

    const bySlug=new Map();
    for(const article of [...baseArticles,...expansionArticles,...specialArticles]) bySlug.set(article.slug,article);
    const articles=[];
    for (const article of bySlug.values()) {
      try {
        const rendered=getLongFormJournalArticle(article);
        if (!rendered || !Array.isArray(rendered.sections)) {
          throw new Error("Long-form renderer returned an invalid article/sections structure");
        }
        // Final safety normalization: the HTML renderer below requires tuple sections.
        rendered.sections = rendered.sections.map((section) => {
          if (Array.isArray(section)) return [section[0] || "Section", section[1] || ""];
          if (section && typeof section === "object") {
            return [section.label || "Section", section.text ?? section.url ?? ""];
          }
          return ["Section", String(section ?? "")];
        });
        rendered.sources = Array.isArray(rendered.sources)
          ? rendered.sources.filter(Boolean).map((source) => ({
              label: source?.label || source?.title || "Source",
              url: source?.url || source?.href || "#"
            }))
          : [];
        articles.push(rendered);
      } catch (error) {
        throw new Error(`Failed to render Journal article "${article?.slug || "unknown-slug"}": ${error?.stack || error}`);
      }
    }
    const base=fs.readFileSync(indexPath,"utf8");

    for(const article of articles){
      const canonical=`${siteUrl}/journal/${article.categorySlug}/${article.slug}`;
      const schema={"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.description,datePublished:article.date || "2026-09-19",dateModified:article.dateModified || article.date || "2026-09-19",mainEntityOfPage:{"@type":"WebPage","@id":canonical},author:{"@type":"Organization",name:"FitMe Pro"},publisher:{"@type":"Organization",name:"FitMe Pro",url:siteUrl},articleSection:article.category,keywords:article.keywords,isAccessibleForFree:true};

      const quickSummary=Array.isArray(article.quickSummary)?`<section style="margin:0 0 28px;padding:22px;border:1px solid #ddd;border-radius:20px"><h2 style="margin:0 0 10px;line-height:1.25;letter-spacing:normal;word-spacing:normal">Quick Summary</h2><ul style="margin:0;padding-left:22px;line-height:1.65">${article.quickSummary.map(p=>`<li style="margin-bottom:8px">${esc(p)}</li>`).join("")}</ul></section>`:"";
      const sections=article.sections
        .filter(([h]) => h !== "Introduction")
        .map(([h,t])=>`<section style="margin:0 0 28px"><h2 style="margin:0 0 10px;line-height:1.25;letter-spacing:normal;word-spacing:normal">${esc(h)}</h2><p style="margin:0;line-height:1.65">${esc(t)}</p></section>`)
        .join("");

      const sources=(Array.isArray(article.sources) ? article.sources : []).map(s=>`<li style="margin-bottom:8px"><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join("");
      const body=`<main><article style="max-width:900px;margin:0 auto;padding:40px 20px;font-family:Arial,sans-serif;overflow-wrap:anywhere"><a href="/journal/${article.categorySlug}" style="display:inline-block;margin-bottom:20px">← ${esc(article.category)} Journal</a><header style="margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid #ddd"><p style="margin-bottom:10px;letter-spacing:.04em">${esc(article.category)} · ${esc(article.readTime)}</p><h1 style="margin:0 0 16px;line-height:1.15;letter-spacing:normal;word-spacing:normal;overflow-wrap:anywhere">${esc(article.title)}</h1><p style="margin:0 0 14px;line-height:1.65">${esc(article.description)}</p><p style="margin:0">Published ${esc(article.date || "September 19, 2026")} · FitMe Pro Journal</p></header>${quickSummary}${sections}<section style="margin:0 0 28px;padding:22px;border:1px solid #ddd;border-radius:20px"><h2 style="margin:0 0 10px;line-height:1.25;letter-spacing:normal;word-spacing:normal">Health and wellness calculators</h2><p style="line-height:1.65;margin:0 0 10px">Use our calculators to explore estimates alongside the information in this guide.</p><ul style="margin:0;padding-left:20px"><li><a href="/bmr-calculator">BMR Calculator</a></li><li><a href="/tdee-calculator">TDEE Calculator</a></li><li><a href="/protein-calculator">Protein Calculator</a></li><li><a href="/calorie-deficit-calculator">Calorie Deficit Calculator</a></li></ul></section><section style="padding-top:24px;border-top:1px solid #ddd"><h2 style="margin:0 0 10px;line-height:1.25;letter-spacing:normal;word-spacing:normal">Sources & further reading</h2><ul style="margin:0;padding-left:20px">${sources}</ul><p style="margin-top:18px;line-height:1.6">FitMe Pro uses authoritative public-health guidance as a reference and does not reproduce source publications. Content is educational and should not replace individualized medical advice.</p></section></article></main>`;
      let html=meta(base,`${article.title} | FitMe Pro Journal`,article.description,canonical);
      html=html.replace(/<div id="root"><\/div>/i,`<div id="root">${body}</div>`).replace(/<\/head>/i,`<script type="application/ld+json">${json(schema)}</script></head>`);
      write(`/journal/${article.categorySlug}/${article.slug}`,html);
    }

    console.log(`Prerendered ${articles.length} long-form Journal articles (base + expanded).`);
  }finally{
    for(const file of [tempJournalPath,tempExpansionPath,tempLongformPath,tempSpecialPath]){try{fs.unlinkSync(file)}catch(_){} }
    for(const file of specialArticleFiles){try{fs.unlinkSync(path.join(journalDataDir,file.endsWith(".js") ? file.slice(0, -3) + ".mjs" : file))}catch(_){} }
    try{fs.rmdirSync(journalDataDir)}catch(_){}
  }
})().catch(e=>{console.error("Journal long-form prerender failed:",e);process.exit(1)});
