const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const contentPath = path.join(root, "src", "lib", "content.js");
const longFormPath = path.join(root, "src", "lib", "longFormContent.js");
const expansionPath = path.join(root, "src", "lib", "longFormExpansion.js");
const tempModulePath = path.join(build, "__fitme_content.mjs");
const tempLongFormPath = path.join(build, "__fitme_longform.mjs");
const tempExpansionPath = path.join(build, "__fitme_expansion.mjs");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error(`CRA build output not found: ${indexPath}`);
if (!fs.existsSync(contentPath)) throw new Error(`SEO content file not found: ${contentPath}`);
if (!fs.existsSync(longFormPath)) throw new Error(`Long-form content file not found: ${longFormPath}`);
if (!fs.existsSync(expansionPath)) throw new Error(`Long-form expansion file not found: ${expansionPath}`);

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const RELATED_SLUGS = {
  "BMI Calculator":"bmi-calculator","BMI Prime Calculator":"bmi-prime-calculator","Healthy Weight Range Calculator":"healthy-weight-range-calculator","Ideal Body Weight Calculator":"ideal-body-weight-calculator","Weight Loss Goal Calculator":"weight-loss-goal-calculator","Weight Gain Goal Calculator":"weight-gain-goal-calculator","Body Fat Calculator":"body-fat-calculator","Body Fat Percentage Calculator":"body-fat-calculator","Navy Body Fat Calculator":"navy-body-fat-calculator","US Navy Body Fat Calculator":"navy-body-fat-calculator","Relative Fat Mass Calculator":"relative-fat-mass-calculator","Body Adiposity Index Calculator":"body-adiposity-index-calculator","Lean Body Mass Calculator":"lean-body-mass-calculator","Fat Mass Calculator":"fat-mass-calculator","Fat-Free Mass Calculator":"fat-free-mass-calculator","Fat-Free Mass Index Calculator":"ffmi-calculator","FFMI Calculator":"ffmi-calculator","Waist-to-Hip Ratio Calculator":"waist-hip-ratio-calculator","Waist-to-Height Ratio Calculator":"waist-height-ratio-calculator","ABSI Calculator":"absi-calculator","A Body Shape Index Calculator":"absi-calculator","BRI Calculator":"bri-calculator","Body Roundness Index Calculator":"bri-calculator","Conicity Index Calculator":"conicity-index-calculator","Body Frame Size Calculator":"body-frame-size-calculator","BMR Calculator":"bmr-calculator","TDEE Calculator":"tdee-calculator","Daily Calorie Needs Calculator":"daily-calorie-needs-calculator","Calorie Deficit Calculator":"calorie-deficit-calculator","Calorie Surplus Calculator":"calorie-surplus-calculator","Body Surface Area Calculator":"body-surface-area-calculator","Ponderal Index Calculator":"ponderal-index-calculator","Adjusted Body Weight Calculator":"adjusted-body-weight-calculator","Body Density Calculator":"body-density-calculator","Obesity Class Calculator":"obesity-class-calculator"
};

function relatedLinks(names) {
  return (names || []).map((name) => {
    const slug = RELATED_SLUGS[name];
    return slug ? `<li><a href="/${slug}">${esc(name)}</a></li>` : `<li>${esc(name)}</li>`;
  }).join("");
}

(async () => {
  try {
    const source = fs.readFileSync(contentPath, "utf8");
    fs.writeFileSync(tempModulePath, `${source}\nexport default CALC_CONTENT;`, "utf8");
    fs.writeFileSync(tempLongFormPath, fs.readFileSync(longFormPath, "utf8"), "utf8");
    fs.writeFileSync(tempExpansionPath, fs.readFileSync(expansionPath, "utf8"), "utf8");
    const mod = await import(`${pathToFileURL(tempModulePath).href}?v=${Date.now()}`);
    const longMod = await import(`${pathToFileURL(tempLongFormPath).href}?v=${Date.now()}`);
    const expansionMod = await import(`${pathToFileURL(tempExpansionPath).href}?v=${Date.now()}`);
    const pages = mod.CALC_CONTENT || mod.default;
    const getLongFormContent = longMod.getLongFormContent;
    const getExpansionSections = expansionMod.getExpansionSections;
    if (!pages || typeof pages !== "object") throw new Error("CALC_CONTENT was not exported from src/lib/content.js");
    if (typeof getLongFormContent !== "function") throw new Error("getLongFormContent was not exported from longFormContent.js");
    if (typeof getExpansionSections !== "function") throw new Error("getExpansionSections was not exported from longFormExpansion.js");
    const base = fs.readFileSync(indexPath, "utf8");
    let count = 0;
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
      let html = base;
      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)} · FitMe Pro</title>`);
      html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i, `<meta name="description" content="${esc(page.metaDescription)}" />$1`);
      html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${seo}</div>`);
      html = html.replace(/<\/head>/i, `<meta name="robots" content="index,follow" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="website" /><meta property="og:title" content="${esc(page.title)}" /><meta property="og:description" content="${esc(page.metaDescription)}" /><meta property="og:url" content="${canonical}" /><script type="application/ld+json">${json(schema)}</script></head>`);
      const dir = path.join(build, `${slug}-calculator`);
      fs.mkdirSync(dir, {recursive:true});
      fs.writeFileSync(path.join(dir,"index.html"),html,"utf8");
      count++;
    }
    if (count !== 30) throw new Error(`Expected 30 calculator pages, generated ${count}.`);
    console.log(`Prerendered ${count} calculator pages with expanded long-form SEO content and FAQs.`);
  } finally {
    for (const file of [tempModulePath,tempLongFormPath,tempExpansionPath]) { try { fs.unlinkSync(file); } catch (_) {} }
  }
})().catch((error)=>{console.error("Prerender failed:",error);process.exit(1);});

function sectionHeading(index,title){
  const headings=[`What Is ${title}?`,`Why This Calculation Matters`,`Inputs and Measurement Guide`,`The Formula Explained`,`How to Interpret Your Result`,`Accuracy and What Can Affect It`,`Common Mistakes to Avoid`,`Using the Result for Fitness Planning`,`Related Health and Body-Composition Measures`,`Tracking Changes Over Time`,`When to Seek Professional Guidance`,`Key Takeaways`,`Understanding the Calculation as a Model`,`Getting Better Inputs`,`Units and Conversion`,`Why Trends Matter More Than One Reading`,`Understanding Reference Ranges`,`Combining Complementary Measures`,`What Changes During Weight Loss`,`What Changes During Weight Gain`,`Mathematical Precision vs Biological Precision`,`Why Different Equations Disagree`,`Turning the Number Into a Practical Decision`,`Using Numbers Without Obsessing Over Them`,`What to Look for in a Quality Calculator`,`Resolving Unexpected Results`,`Comparing Results Between People`,`Special Populations and Context`,`How Often to Recalculate`,`Final Takeaways`];
  return headings[index] || title;
}
function pathToFileURL(filePath){const resolved=path.resolve(filePath).replace(/\\/g,"/");return new URL(`file://${resolved}`);}
