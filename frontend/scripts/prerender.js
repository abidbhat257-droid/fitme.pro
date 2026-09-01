const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const contentPath = path.join(root, "src", "lib", "content.js");
const tempModulePath = path.join(build, "__fitme_content.mjs");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) {
  throw new Error(`CRA build output not found: ${indexPath}`);
}
if (!fs.existsSync(contentPath)) {
  throw new Error(`SEO content file not found: ${contentPath}`);
}

// Load the existing ES-module data with Node's native ESM support instead of
// evaluating it through vm. This is more reliable on Vercel/Node versions.
fs.writeFileSync(tempModulePath, fs.readFileSync(contentPath, "utf8"), "utf8");

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#39;");

const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

(async () => {
  try {
    const moduleUrl = `${pathToFileURL(tempModulePath).href}?v=${Date.now()}`;
    const mod = await import(moduleUrl);
    const pages = mod.CALC_CONTENT;

    if (!pages || typeof pages !== "object") {
      throw new Error("CALC_CONTENT was not exported from src/lib/content.js");
    }

    const base = fs.readFileSync(indexPath, "utf8");
    let count = 0;

    for (const [slug, page] of Object.entries(pages)) {
      if (!page || typeof page !== "object") continue;

      const canonical = `${siteUrl}/${slug}-calculator`;
      const faq = Array.isArray(page.faq) ? page.faq : [];
      const steps = Array.isArray(page.steps)
        ? page.steps.map((step) => `<li>${esc(step)}</li>`).join("")
        : "";
      const faqs = faq
        .map((item) => `<details><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`)
        .join("");

      const schema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebApplication",
            name: page.title,
            url: canonical,
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
          },
          ...(faq.length
            ? [{
                "@type": "FAQPage",
                mainEntity: faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a }
                }))
              }]
            : []),
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Fitme Pro", item: `${siteUrl}/` },
              { "@type": "ListItem", position: 2, name: page.title, item: canonical }
            ]
          }
        ]
      };

      const seo = `<article id="seo-content" style="max-width:900px;margin:0 auto;padding:32px 20px;font-family:Arial,sans-serif">
<nav aria-label="Breadcrumb"><a href="/">Fitme Pro</a> / <span>${esc(page.title)}</span></nav>
<h1>${esc(page.title)}</h1><p>${esc(page.intro)}</p>
<h2>How to calculate</h2><ol>${steps}</ol>
<h2>Formula</h2><p><code>${esc(page.formula || "")}</code></p>
${page.overview ? `<h2>Overview</h2><p>${esc(page.overview)}</p>` : ""}
${page.limitations ? `<h2>Limitations</h2><p>${esc(page.limitations)}</p>` : ""}
${faqs ? `<h2>Frequently asked questions</h2>${faqs}` : ""}
<p><a href="/">Explore all 30 Fitme Pro calculators</a></p></article>`;

      let html = base;
      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)} · Fitme Pro</title>`);
      html = html.replace(
        /<meta name="description" content="[^"]*"\s*\/?>(\s*)/i,
        `<meta name="description" content="${esc(page.metaDescription)}" />$1`
      );
      html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${seo}</div>`);
      html = html.replace(
        /<\/head>/i,
        `<meta name="robots" content="index,follow" />\n<link rel="canonical" href="${canonical}" />\n<meta property="og:type" content="website" />\n<meta property="og:title" content="${esc(page.title)}" />\n<meta property="og:description" content="${esc(page.metaDescription)}" />\n<meta property="og:url" content="${canonical}" />\n<script type="application/ld+json">${json(schema)}</script>\n</head>`
      );

      const dir = path.join(build, `${slug}-calculator`);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
      count += 1;
    }

    console.log(`Prerendered ${count} calculator pages.`);
  } finally {
    try { fs.unlinkSync(tempModulePath); } catch (_) {}
  }
})().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});

function pathToFileURL(filePath) {
  const resolved = path.resolve(filePath).replace(/\\/g, "/");
  return new URL(`file://${resolved}`);
}
