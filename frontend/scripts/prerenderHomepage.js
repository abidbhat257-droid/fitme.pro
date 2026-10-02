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

const groups = [];
const byCategory = new Map();
for (const calculator of allCalculators) {
  const category = String(calculator.category || "Other Calculators").trim() || "Other Calculators";
  if (!byCategory.has(category)) {
    const group = { category, items: [] };
    byCategory.set(category, group);
    groups.push(group);
  }
  byCategory.get(category).items.push(calculator);
}

const calculatorSections = groups.map(({ category, items }) => `
    <section>
      <h2>${esc(category)}</h2>
      <ul>
        ${items.map((calculator) => `<li><a href="${esc(calculator.url)}">${esc(calculator.name)}</a></li>`).join("\n        ")}
      </ul>
    </section>`).join("\n");

const journalLinks = [
  ["/journal", "FitMe Pro Journal"],
  ["/journal/fitness", "Fitness"],
  ["/journal/wellness", "Wellness"],
  ["/journal/health-education", "Health Education"],
  ["/journal/nutrition", "Nutrition"],
  ["/journal/weight-management", "Weight Management"],
  ["/journal/body-composition", "Body Composition"],
  ["/about", "About"],
  ["/contact", "Contact"],
  ["/journal/editorial-standards", "Editorial Standards"],
  ["/journal/evidence-sources", "Evidence Sources"],
];

const homepageMain = `
<main>
  <h1>Free Health, Fitness &amp; Body Composition Calculators</h1>
  <p>FitMe Pro offers free health and fitness calculators with formulas explained clearly and results you can use to understand BMI, body fat, calories, running, strength and related measures. Each tool is designed to show how the calculation works and what its result means.</p>
${calculatorSections}
    <section>
      <h2>FitMe Pro Journal</h2>
      <ul>
        ${journalLinks.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join("\n        ")}
      </ul>
    </section>
</main>`;

const jsonLd = [
  {"@context":"https://schema.org","@type":"WebSite","name":"FitMe Pro","url":`${site}/`},
  {"@context":"https://schema.org","@type":"Organization","name":"FitMe Pro","url":`${site}/`,"logo":`${site}/fitme-pro-logo.svg`}
];

let html = fs.readFileSync(indexPath, "utf8");
html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${homepageMain}\n</div>`);
if (!/<div id="root">[\s\S]*<h1>Free Health, Fitness &amp; Body Composition Calculators<\/h1>/i.test(html)) {
  throw new Error("Failed to inject the static homepage content into #root");
}

html = html.replace(/<script type="application\/ld\+json" data-fitme-home-schema>[\s\S]*?<\/script>\s*/gi, "");
const jsonLdHtml = jsonLd.map((schema) => `<script type="application/ld+json" data-fitme-home-schema>${JSON.stringify(schema)}</script>`).join("");
html = html.replace(/<\/head>/i, `${jsonLdHtml}</head>`);
fs.writeFileSync(indexPath, html, "utf8");

console.log(JSON.stringify({
  homepageCalculators: allCalculators.length,
  homepageCategories: groups.map((group) => `${group.category} (${group.items.length})`),
  jsonLdTypes: jsonLd.map((schema) => schema["@type"]),
}, null, 2));
