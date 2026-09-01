const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const contentPath = path.join(root, "src", "lib", "content.js");
const longFormPath = path.join(root, "src", "lib", "longFormContent.js");
const tempModulePath = path.join(build, "__fitme_content.mjs");
const tempLongFormPath = path.join(build, "__fitme_longform.mjs");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error(`CRA build output not found: ${indexPath}`);
if (!fs.existsSync(contentPath)) throw new Error(`SEO content file not found: ${contentPath}`);
if (!fs.existsSync(longFormPath)) throw new Error(`Long-form content file not found: ${longFormPath}`);

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

(async () => {
  try {
    const source = fs.readFileSync(contentPath, "utf8");
    fs.writeFileSync(tempModulePath, `${source}\nexport default CALC_CONTENT;`, "utf8");
    const longSource = fs.readFileSync(longFormPath, "utf8");
    fs.writeFileSync(tempLongFormPath, `${longSource}\n`, "utf8");

    const mod = await import(`${pathToFileURL(tempModulePath).href}?v=${Date.now()}`);
    const longMod = await import(`${pathToFileURL(tempLongFormPath).href}?v=${Date.now()}`);
    const pages = mod.CALC_CONTENT || mod.default;
    const getLongFormContent = longMod.getLongFormContent;
    if (!pages || typeof pages !== "object") throw new Error("CALC_CONTENT was not exported from src/lib/content.js");
    if (typeof getLongFormContent !== "function") throw new Error("getLongFormContent was not exported from longFormContent.js");

    const base = fs.readFileSync(indexPath, "utf8");
    let count = 0;

    for (const [slug, page] of Object.entries(pages)) {
      if (!page || typeof page !== "object") continue;
      const canonical = `${siteUrl}/${slug}-calculator`;
      const longForm = getLongFormContent(slug);
      const faq = longForm?.faqs?.length ? longForm.faqs : (Array.isArray(page.faq) ? page.faq : []);
      const steps = Array.isArray(page.steps) ? page.steps.map((s, i) => `<li><strong>Step ${i + 1}:</strong> ${esc(s)}</li>`).join("") : "";
      const faqs = faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
      const articleSections = longForm?.sections?.map((text, i) => `<section><h2>${esc(sectionHeading(i, page.title))}</h2><p>${esc(text)}</p></section>`).join("") || "";
      const related = longForm?.related?.map((name) => `<li>${esc(name)}</li>`).join("") || "";

      const schema = {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebApplication", name: page.title, url: canonical, applicationCategory: "HealthApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
          ...(faq.length ? [{ "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Fitme Pro", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: page.title, item: canonical }
          ] }
        ]
      };

      const seo = `<article id="seo-content" style="max-width:900px;margin:0 auto;padding:32px 20px;font-family:Arial,sans-serif"><nav aria-label="Breadcrumb"><a href="/">Fitme Pro</a> / <span>${esc(page.title)}</span></nav><h1>${esc(page.title)}</h1><p>${esc(page.intro)}</p><section><h2>How to Calculate</h2><ol>${steps}</ol></section>${page.formula ? `<section><h2>Formula</h2><p><code>${esc(page.formula)}</code></p></section>` : ""}${page.overview ? `<section><h2>Quick Overview</h2><p>${esc(page.overview)}</p></section>` : ""}${articleSections}${related ? `<section><h2>Related Calculators</h2><ul>${related}</ul></section>` : ""}${page.limitations ? `<section><h2>Limitations</h2><p>${esc(page.limitations)}</p></section>` : ""}${faqs ? `<section><h2>Frequently Asked Questions</h2>${faqs}</section>` : ""}<p><a href="/">Explore all 30 Fitme Pro calculators</a></p></article>`;

      let html = base;
      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)} · Fitme Pro</title>`);
      html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i, `<meta name="description" content="${esc(page.metaDescription)}" />$1`);
      html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${seo}</div>`);
      html = html.replace(/<\/head>/i, `<meta name="robots" content="index,follow" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="website" /><meta property="og:title" content="${esc(page.title)}" /><meta property="og:description" content="${esc(page.metaDescription)}" /><meta property="og:url" content="${canonical}" /><script type="application/ld+json">${json(schema)}</script></head>`);

      const dir = path.join(build, `${slug}-calculator`);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
      count++;
    }
    if (count !== 30) throw new Error(`Expected 30 calculator pages, generated ${count}.`);
    console.log(`Prerendered ${count} calculator pages with long-form SEO content.`);
  } finally {
    try { fs.unlinkSync(tempModulePath); } catch (_) {}
    try { fs.unlinkSync(tempLongFormPath); } catch (_) {}
  }
})().catch((error) => { console.error("Prerender failed:", error); process.exit(1); });

function sectionHeading(index, title) {
  const headings = [
    `What Is ${title}?`,
    "Why This Calculation Matters",
    "Inputs and Measurement Guide",
    "The Formula Explained",
    "How to Interpret Your Result",
    "Accuracy and What Can Affect It",
    "Common Mistakes to Avoid",
    "Using the Result for Fitness Planning",
    "Related Health and Body-Composition Measures",
    "Tracking Changes Over Time",
    "When to Seek Professional Guidance",
    "Key Takeaways",
  ];
  return headings[index] || title;
}

function pathToFileURL(filePath) {
  const resolved = path.resolve(filePath).replace(/\\/g, "/");
  return new URL(`file://${resolved}`);
}
