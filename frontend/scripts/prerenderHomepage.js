const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const site = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error("Missing build/index.html");

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const parseCoreUrls = (source) => {
  const urls = {};
  const block = source.match(/const CORE_URLS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!block) throw new Error("Could not read CORE_URLS from allCalculators.js");
  for (const match of block[1].matchAll(/["']([^"']+)["']\s*:\s*["']([^"']+)["']/g)) urls[match[1]] = match[2];
  return urls;
};

const parseObjectConfigs = (source) => {
  const results = [];
  const re = /\{\s*id:\s*"([^"]+)"[\s\S]*?\bslug:\s*"([^"]+)"[\s\S]*?\bname:\s*"([^"]+)"[\s\S]*?\bcategory:\s*"([^"]+)"/g;
  for (const match of source.matchAll(re)) results.push({ id: match[1], slug: match[2], name: match[3], category: match[4] });
  return results;
};

const parseFactoryConfigs = (source) => {
  const results = [];
  const re = /\b(?:make|shared|extra)\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
  for (const match of source.matchAll(re)) results.push({ id: match[1], slug: match[1], name: match[2], category: match[3] });
  return results;
};

const registry = read("src/lib/allCalculators.js");
const coreUrls = parseCoreUrls(registry);
const core = parseObjectConfigs(read("src/lib/calculators.js")).filter((c) => !["weight-loss-goal", "weight-gain-goal"].includes(c.id));
const specialized = parseObjectConfigs(read("src/lib/specializedCalculators.js"));
const newer = parseFactoryConfigs(read("src/lib/newSpecializedCalculatorsData.js"));
const missing = parseFactoryConfigs(read("src/lib/missingCalculators.js"));

const byId = new Map();
const byUrl = new Map();
for (const calculator of [
  ...core.map((c) => ({ ...c, url: coreUrls[c.id] || `/${c.slug}` })),
  ...specialized.map((c) => ({ ...c, url: `/${c.slug}` })),
  ...newer.map((c) => ({ ...c, url: `/${c.slug}` })),
  ...missing.map((c) => ({ ...c, url: `/${c.slug}` })),
]) {
  if (!byId.has(calculator.id) && !byUrl.has(calculator.url)) {
    byId.set(calculator.id, calculator);
    byUrl.set(calculator.url, calculator);
  }
}

const allCalculators = [...byId.values()];
if (allCalculators.length !== 100) throw new Error(`Homepage prerender expected 100 canonical calculators, found ${allCalculators.length}`);

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const sitemapUrls = [...fs.readFileSync(path.join(build, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/");
const configuredUrlSet = new Set(allCalculators.map((calculator) => calculator.url));
const canonicalOverrides = {
  "/bmi-calculator": { id: "bmi", slug: "bmi-calculator", name: "BMI Calculator", category: "basic" },
  "/bmr-calculator": { id: "bmr", slug: "bmr-calculator", name: "Basal Metabolic Rate", category: "metabolism" },
  "/tdee-calculator": { id: "tdee", slug: "tdee-calculator", name: "Total Daily Energy Expenditure", category: "metabolism" },
  "/absi-calculator": { id: "absi", slug: "absi-calculator", name: "A Body Shape Index", category: "shape" },
  "/ffmi-calculator": { id: "ffmi", slug: "ffmi-calculator", name: "Fat-Free Mass Index", category: "composition" },
  "/bri-calculator": { id: "bri", slug: "bri-calculator", name: "Body Roundness Index", category: "shape" },
};
const sitemapCalculatorUrls = sitemapUrls.filter((url) => configuredUrlSet.has(url) || Object.prototype.hasOwnProperty.call(canonicalOverrides, url));
if (sitemapCalculatorUrls.length !== 100) throw new Error("Homepage/sitemap calculator mismatch: expected 100, found " + sitemapCalculatorUrls.length);
const displayNames = { basic: "Basic Health Calculators", composition: "Body Composition", shape: "Body Shape", metabolism: "Metabolism & Energy", advanced: "Advanced Calculators" };
const sitemapCalculatorSet = new Set(sitemapCalculatorUrls);
const groups = [];
const byCategory = new Map();
for (const url of sitemapCalculatorUrls) {
  const calculator = byUrl.get(url) || canonicalOverrides[url];
  if (!calculator) throw new Error("Sitemap calculator URL has no calculator metadata: " + url);
  const category = displayNames[calculator.category] || String(calculator.category || "Other Calculators").trim() || "Other Calculators";
  if (!byCategory.has(category)) { const group = { category, items: [] }; byCategory.set(category, group); groups.push(group); }
  if (!byCategory.get(category).items.some((item) => item.url === url)) byCategory.get(category).items.push({ ...calculator, url });
}

const categorySections = groups.map(({ category, items }) => `
    <section>
      <h2>${esc(category)}</h2>
      <p>${items.length} calculators covering ${esc(category.toLowerCase())}. Browse the full directory for every tool and formula.</p>
    </section>`).join("\n");
const featuredUrls = new Set([
  "/bmi-calculator", "/body-fat-calculator", "/bmr-calculator", "/tdee-calculator",
  "/daily-calorie-needs-calculator", "/calorie-deficit-calculator", "/protein-calculator",
  "/macro-calculator", "/pace-calculator", "/target-heart-rate-calculator"
]);
const featuredCalculators = sitemapCalculatorUrls
  .map((url) => byUrl.get(url) || canonicalOverrides[url])
  .filter((calculator) => calculator && featuredUrls.has(calculator.url));

const journalLinks = [
  ["/journal", "FitMe Pro Journal"],
  ["/journal/fitness", "Fitness"],
  ["/journal/wellness", "Wellness"],
  ["/journal/health-education", "Health Education"],
  ["/journal/nutrition", "Nutrition"],
  ["/journal/weight-loss", "Weight Management"],
  ["/journal/body-composition", "Body Composition"],
  ["/about", "About"],
  ["/contact", "Contact"],
  ["/journal/editorial-standards", "Editorial Standards"],
  ["/journal/evidence-sources", "Evidence Sources"],
];

const homepageMain = `
<main>
  <h1>Free Health, Fitness &amp; Body Composition Calculators</h1>
  <p>FitMe Pro provides free health and fitness calculators for common measurements and planning tasks. Each tool explains its method, inputs, result and important limitations.</p><p><strong>Editorial owner:</strong> FitMe Pro Editorial Team. <strong>Last reviewed:</strong> October 5, 2026. Health explanations are checked against authoritative public sources.</p><p>Use these calculators to learn how common formulas work and to compare consistent measurements over time. Results are estimates: they can vary with units, measurement technique, assumptions and the population for which a formula was developed. A calculator result is not a diagnosis, prescription or guarantee of health.</p><p>For health questions, symptoms, medication decisions, pregnancy, eating disorders or other individual medical circumstances, use qualified professional advice. The calculator pages explain when a result should not be interpreted as a clinical measurement.</p><p>FitMe Pro organizes tools by body composition, weight and BMI, calories and metabolism, nutrition, running and endurance, strength, and heart-rate metrics. Start with the measurement you want to understand, then review the formula and limitations before using the result.</p>
${categorySections}\n    <section><h2>Featured calculators</h2><ul>${featuredCalculators.map((calculator) => `<li><a href="${esc(calculator.url)}">${esc(calculator.name.replace(/\s+Calculator$/i, ""))}</a></li>`).join("\n        ")}</ul><p><a href="/calculators">Browse all 100 health and fitness calculators</a></p></section>
    <section>
      <h2>FitMe Pro Journal</h2>
      <ul>
        ${journalLinks.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join("\n        ")}
      </ul>
    </section>
</main>`;

const jsonLd = [
  {"@context":"https://schema.org","@type":"WebSite","@id":site + "/#website","name":"FitMe Pro","url":site + "/"},
  {"@context":"https://schema.org","@type":"WebPage","@id":site + "/#webpage","name":"FitMe Pro Health, Fitness & Body Composition Calculators","url":site + "/","isPartOf":{"@id":site + "/#website"}},
  {"@context":"https://schema.org","@type":"Organization","@id":site + "/#organization","name":"FitMe Pro","url":site + "/","logo":site + "/fitme-pro-logo.svg"}
];

let html = fs.readFileSync(indexPath, "utf8");
html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${homepageMain}\n</div>`);
if (!/<div id="root">[\s\S]*<h1>Free Health, Fitness &amp; Body Composition Calculators<\/h1>/i.test(html)) {
  throw new Error("Failed to inject the static homepage content into #root");
}

html = html.replace(/<script type="application\/ld\+json" data-fitme-home-schema>[\s\S]*?<\/script>\s*/gi, "");
for (const schema of jsonLd) {
  if (!schema["@type"]) throw new Error("Homepage JSON-LD node is missing @type");
}
const jsonLdHtml = jsonLd.map((schema) => `<script type="application/ld+json" data-fitme-home-schema>${JSON.stringify(schema)}</script>`).join("");
html = html.replace(/<\/head>/i, `${jsonLdHtml}</head>`);
fs.writeFileSync(indexPath, html, "utf8");

console.log(JSON.stringify({
  homepageCalculators: allCalculators.length,
  homepageCategories: groups.map((group) => `${group.category} (${group.items.length})`),
  jsonLdTypes: jsonLd.map((schema) => schema["@type"]),
}, null, 2));
