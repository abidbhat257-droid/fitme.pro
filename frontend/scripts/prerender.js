const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const contentPath = path.join(root, "src", "lib", "content.js");
const longFormPath = path.join(root, "src", "lib", "longFormContent.js");
const expansionPath = path.join(root, "src", "lib", "longFormExpansion.js");
const journalPath = path.join(root, "src", "lib", "journalContent.js");
const tempModulePath = path.join(build, "__fitme_content.mjs");
const tempLongFormPath = path.join(build, "__fitme_longform.mjs");
const tempExpansionPath = path.join(build, "__fitme_expansion.mjs");
const tempJournalPath = path.join(build, "__fitme_journal.mjs");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error(`CRA build output not found: ${indexPath}`);
for (const required of [contentPath, longFormPath, expansionPath, journalPath]) if (!fs.existsSync(required)) throw new Error(`Required content file not found: ${required}`);

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const RELATED_SLUGS = {
  "BMI Calculator":"bmi-calculator","BMI Prime Calculator":"bmi-prime-calculator","Healthy Weight Range Calculator":"healthy-weight-range-calculator","Ideal Body Weight Calculator":"ideal-body-weight-calculator","Weight Loss Goal Calculator":"weight-loss-goal-calculator","Weight Gain Goal Calculator":"weight-gain-goal-calculator","Body Fat Calculator":"body-fat-calculator","Body Fat Percentage Calculator":"body-fat-calculator","Navy Body Fat Calculator":"navy-body-fat-calculator","US Navy Body Fat Calculator":"navy-body-fat-calculator","Relative Fat Mass Calculator":"relative-fat-mass-calculator","Body Adiposity Index Calculator":"body-adiposity-index-calculator","Lean Body Mass Calculator":"lean-body-mass-calculator","Fat Mass Calculator":"fat-mass-calculator","Fat-Free Mass Calculator":"fat-free-mass-calculator","Fat-Free Mass Index Calculator":"ffmi-calculator","FFMI Calculator":"ffmi-calculator","Waist-to-Hip Ratio Calculator":"waist-hip-ratio-calculator","Waist-to-Height Ratio Calculator":"waist-height-ratio-calculator","ABSI Calculator":"absi-calculator","A Body Shape Index Calculator":"absi-calculator","BRI Calculator":"bri-calculator","Body Roundness Index Calculator":"bri-calculator","Conicity Index Calculator":"conicity-index-calculator","Body Frame Size Calculator":"body-frame-size-calculator","BMR Calculator":"bmr-calculator","TDEE Calculator":"tdee-calculator","Daily Calorie Needs Calculator":"daily-calorie-needs-calculator","Calorie Deficit Calculator":"calorie-deficit-calculator","Calorie Surplus Calculator":"calorie-surplus-calculator","Body Surface Area Calculator":"body-surface-area-calculator","Ponderal Index Calculator":"ponderal-index-calculator","Adjusted Body Weight Calculator":"adjusted-body-weight-calculator","Body Density Calculator":"body-density-calculator","Obesity Class Calculator":"obesity-class-calculator"
};
function relatedLinks(names) { return (names || []).map((name) => { const slug = RELATED_SLUGS[name]; return slug ? `<li><a href="/${slug}">${esc(name)}</a></li>` : `<li>${esc(name)}</li>`; }).join(""); }

function setMeta(html, title, description, canonical, type = "website") {
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i, `<meta name="description" content="${esc(description)}" />$1`);
  html = html.replace(/<\/head>/i, `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="${type}" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${canonical}" /></head>`);
  return html;
}

function writeRoute(route, html) {
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  const dir = path.join(build, clean);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

(async () => {
  try {
    const source = fs.readFileSync(contentPath, "utf8");
    fs.writeFileSync(tempModulePath, `${source}\nexport default CALC_CONTENT;`, "utf8");
    fs.writeFileSync(tempLongFormPath, fs.readFileSync(longFormPath, "utf8"), "utf8");
    fs.writeFileSync(tempExpansionPath, fs.readFileSync(expansionPath, "utf8"), "utf8");
    fs.writeFileSync(tempJournalPath, fs.readFileSync(journalPath, "utf8"), "utf8");
    const mod = await import(`${pathToFileURL(tempModulePath).href}?v=${Date.now()}`);
    const longMod = await import(`${pathToFileURL(tempLongFormPath).href}?v=${Date.now()}`);
    const expansionMod = await import(`${pathToFileURL(tempExpansionPath).href}?v=${Date.now()}`);
    const journalMod = await import(`${pathToFileURL(tempJournalPath).href}?v=${Date.now()}`);
    const pages = mod.CALC_CONTENT || mod.default;
    const getLongFormContent = longMod.getLongFormContent;
    const getExpansionSections = expansionMod.getExpansionSections;
    const articles = journalMod.JOURNAL_ARTICLES || [];
    const categories = journalMod.JOURNAL_CATEGORIES || [];
    if (!pages || typeof pages !== "object") throw new Error("CALC_CONTENT was not exported from src/lib/content.js");
    if (typeof getLongFormContent !== "function") throw new Error("getLongFormContent was not exported from longFormContent.js");
    if (typeof getExpansionSections !== "function") throw new Error("getExpansionSections was not exported from longFormExpansion.js");

    const base = fs.readFileSync(indexPath, "utf8");
    let calculatorCount = 0;
    for (const [slug, page] of Object.entries(pages)) {
      if (!page || typeof page !== "object") continue;
      const canonical = `${siteUrl}/${slug}-calculator`;
      const longForm = getLongFormContent(slug);
      const sections = longForm ? [...longForm.sections, ...getExpansionSections(longForm)] : [];
      const faq = longForm?.faqs?.length ? longForm.faqs : (Array.isArray(page.faq) ? page.faq : []);
      const steps = Array.isArray(page.steps) ? page.steps.map((s, i) => `<li><strong>Step ${i + 1}:</strong> ${esc(s)}</li>`).join("") : "";
      const faqs = faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
      const articleSections = sections.map((text, i) => `<section><h2>${esc(sectionHeading(i, page.title))}</h2><p>${esc(text)}</p></section>`).join("");
      const related = relatedLinks(longForm?.related);
      const schema = {"@context":"https://schema.org","@graph":[{"@type":"WebApplication",name:page.title,url:canonical,applicationCategory:"HealthApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"USD"}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Fitme Pro",item:`${siteUrl}/`},{"@type":"ListItem",position:2,name:page.title,item:canonical}]}]};
      const seo = `<article id="seo-content" style="max-width:900px;margin:0 auto;padding:32px 20px;font-family:Arial,sans-serif"><nav aria-label="Breadcrumb"><a href="/">Fitme Pro</a> / <span>${esc(page.title)}</span></nav><h1>${esc(page.title)}</h1><p>${esc(page.intro)}</p><section><h2>How to Calculate</h2><ol>${steps}</ol></section>${page.formula?`<section><h2>Formula</h2><p><code>${esc(page.formula)}</code></p></section>`:""}${page.overview?`<section><h2>Quick Overview</h2><p>${esc(page.overview)}</p></section>`:""}${articleSections}${related?`<section><h2>Related Calculators</h2><ul>${related}</ul></section>`:""}${page.limitations?`<section><h2>Limitations</h2><p>${esc(page.limitations)}</p></section>`:""}${faqs?`<section><h2>Frequently Asked Questions</h2>${faqs}</section>`:""}<p><a href="/">Explore all Fitme Pro calculators</a></p></article>`;
      let html = setMeta(base, `${page.title} · FitMe Pro`, page.metaDescription, canonical);
      html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${seo}</div>`);
      html = html.replace(/<\/head>/i, `<script type="application/ld+json">${json(schema)}</script></head>`);
      writeRoute(`/${slug}-calculator`, html);
      calculatorCount++;
    }
    if (calculatorCount !== 30) throw new Error(`Expected 30 calculator pages, generated ${calculatorCount}.`);

    // Journal hub and category pages are prerendered so crawlers receive useful HTML without JS execution.
    const journalSchema = { "@context":"https://schema.org", "@type":"CollectionPage", name:"FitMe Pro Journal", url:`${siteUrl}/journal`, description:"Evidence-informed nutrition, fitness, weight management, body composition, wellness and health education." };
    let journalHtml = setMeta(base, "FitMe Pro Journal — Nutrition, Fitness, Weight Loss & Wellness", "Evidence-informed guides on nutrition, fitness, weight management, body composition and wellness from FitMe Pro.", `${siteUrl}/journal`);
    const journalBody = `<main><article style="max-width:1100px;margin:0 auto;padding:40px 20px"><p>FitMe Pro Journal</p><h1>Practical guidance for a healthier, stronger you.</h1><p>Evidence-informed articles on nutrition, fitness, weight management, body composition and everyday wellness.</p><h2>Explore topics</h2><ul>${categories.map(c => `<li><a href="/journal/${c.slug}">${esc(c.name)}</a> — ${esc(c.description)}</li>`).join("")}</ul><h2>Latest guides</h2><ul>${articles.map(a => `<li><a href="/journal/${a.categorySlug}/${a.slug}">${esc(a.title)}</a> — ${esc(a.description)}</li>`).join("")}</ul></article></main>`;
    journalHtml = journalHtml.replace(/<div id="root"><\/div>/i, `<div id="root">${journalBody}</div>`).replace(/<\/head>/i, `<script type="application/ld+json">${json(journalSchema)}</script></head>`);
    writeRoute("/journal", journalHtml);

    for (const category of categories) {
      const items = articles.filter(a => a.categorySlug === category.slug);
      const canonical = `${siteUrl}/journal/${category.slug}`;
      const schema = { "@context":"https://schema.org", "@type":"CollectionPage", name:`${category.name} — FitMe Pro Journal`, url:canonical, description:category.description };
      let html = setMeta(base, `${category.name} — FitMe Pro Journal`, `${category.description} Explore FitMe Pro Journal guides and calculators.`, canonical);
      const body = `<main><article style="max-width:1100px;margin:0 auto;padding:40px 20px"><a href="/journal">FitMe Pro Journal</a><p>Journal / ${esc(category.name)}</p><h1>${esc(category.name)}</h1><p>${esc(category.description)}</p><h2>Guides</h2><ul>${items.map(a => `<li><a href="/journal/${a.categorySlug}/${a.slug}">${esc(a.title)}</a><p>${esc(a.description)}</p></li>`).join("")}</ul><p><a href="/tdee-calculator">Explore FitMe Pro calculators</a></p></article></main>`;
      html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${body}</div>`).replace(/<\/head>/i, `<script type="application/ld+json">${json(schema)}</script></head>`);
      writeRoute(`/journal/${category.slug}`, html);
    }

    for (const article of articles) {
      const canonical = `${siteUrl}/journal/${article.categorySlug}/${article.slug}`;
      const schema = { "@context":"https://schema.org", "@type":"Article", headline:article.title, description:article.description, datePublished:"2026-09-03", dateModified:"2026-09-03", mainEntityOfPage:{"@type":"WebPage","@id":canonical}, author:{"@type":"Organization",name:"FitMe Pro"}, publisher:{"@type":"Organization",name:"FitMe Pro",url:siteUrl}, articleSection:article.category, keywords:article.keywords, isAccessibleForFree:true };
      let html = setMeta(base, `${article.title} | FitMe Pro Journal`, article.description, canonical, "article");
      const sections = article.sections.map(([heading, text]) => `<section><h2>${esc(heading)}</h2><p>${esc(text)}</p></section>`).join("");
      const sources = article.sources.map(s => `<li><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join("");
      const body = `<main><article style="max-width:900px;margin:0 auto;padding:40px 20px"><a href="/journal/${article.categorySlug}">← ${esc(article.category)} Journal</a><header><p>${esc(article.category)} · ${esc(article.readTime)}</p><h1>${esc(article.title)}</h1><p>${esc(article.description)}</p><p>Published September 3, 2026 · FitMe Pro Journal</p></header>${sections}<section><h2>Explore related FitMe Pro tools</h2><ul><li><a href="/bmr-calculator">BMR Calculator</a></li><li><a href="/tdee-calculator">TDEE Calculator</a></li><li><a href="/protein-calculator">Protein Calculator</a></li><li><a href="/calorie-deficit-calculator">Calorie Deficit Calculator</a></li></ul></section><section><h2>Sources & further reading</h2><ul>${sources}</ul><p>FitMe Pro uses authoritative public-health guidance as a reference and does not reproduce source publications. Content is educational and should not replace individualized medical advice.</p></section></article></main>`;
      html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${body}</div>`).replace(/<\/head>/i, `<script type="application/ld+json">${json(schema)}</script></head>`);
      writeRoute(`/journal/${article.categorySlug}/${article.slug}`, html);
    }

    console.log(`Prerendered ${calculatorCount} calculator pages, 1 Journal hub, ${categories.length} Journal categories and ${articles.length} Journal articles.`);
  } finally {
    for (const file of [tempModulePath,tempLongFormPath,tempExpansionPath,tempJournalPath]) { try { fs.unlinkSync(file); } catch (_) {} }
  }
})().catch((error)=>{console.error("Prerender failed:",error);process.exit(1);});

function sectionHeading(index,title){
  const headings=[`What Is ${title}?`,`Why This Calculation Matters`,`Inputs and Measurement Guide`,`The Formula Explained`,`How to Interpret Your Result`,`Accuracy and What Can Affect It`,`Common Mistakes to Avoid`,`Using the Result for Fitness Planning`,`Related Health and Body-Composition Measures`,`Tracking Changes Over Time`,`When to Seek Professional Guidance`,`Key Takeaways`,`Understanding the Calculation as a Model`,`Getting Better Inputs`,`Units and Conversion`,`Why Trends Matter More Than One Reading`,`Understanding Reference Ranges`,`Combining Complementary Measures`,`What Changes During Weight Loss`,`What Changes During Weight Gain`,`Mathematical Precision vs Biological Precision`,`Why Different Equations Disagree`,`Turning the Number Into a Practical Decision`,`Using Numbers Without Obsessing Over Them`,`What to Look for in a Quality Calculator`,`Resolving Unexpected Results`,`Comparing Results Between People`,`Special Populations and Context`,`How Often to Recalculate`,`Final Takeaways`];
  return headings[index] || title;
}
function pathToFileURL(filePath){const resolved=path.resolve(filePath).replace(/\\/g,"/");return new URL(`file://${resolved}`);}
