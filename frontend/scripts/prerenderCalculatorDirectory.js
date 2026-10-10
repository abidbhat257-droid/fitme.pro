const fs = require("fs");
const path = require("path");

module.exports = function prerenderCalculatorDirectory() {
  const root = path.resolve(__dirname, "..");
  const build = path.join(root, "build");
  const site = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");
  const lib = path.join(root, "src", "lib");
  const esc = (value) => String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const registrySource = fs.readFileSync(path.join(lib, "allCalculators.js"), "utf8");
  const coreBlock = registrySource.match(/const CORE_URLS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!coreBlock) throw new Error("Could not read CORE_URLS from allCalculators.js");
  const coreUrls = {};
  for (const match of coreBlock[1].matchAll(/["']([^"']+)["']\s*:\s*["']([^"']+)["']/g)) coreUrls[match[1]] = match[2];

  const parseObjects = (source) => {
    const items = [];
    const re = /\{\s*id:\s*"([^"]+)"[\s\S]*?\bslug:\s*"([^"]+)"[\s\S]*?\bname:\s*"([^"]+)"[\s\S]*?\bcategory:\s*"([^"]+)"/g;
    for (const match of source.matchAll(re)) items.push({ id: match[1], slug: match[2], name: match[3], category: match[4] });
    return items;
  };
  const parseFactories = (source) => {
    const items = [];
    const re = /\b(?:make|shared|extra)\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
    for (const match of source.matchAll(re)) items.push({ id: match[1], slug: match[1], name: match[2], category: match[3] });
    return items;
  };

  const all = [
    ...parseObjects(fs.readFileSync(path.join(lib, "calculators.js"), "utf8"))
      .filter((item) => !["weight-loss-goal", "weight-gain-goal"].includes(item.id))
      .map((item) => ({ ...item, url: coreUrls[item.id] || "/" + item.slug })),
    ...parseObjects(fs.readFileSync(path.join(lib, "specializedCalculators.js"), "utf8"))
      .map((item) => ({ ...item, url: "/" + item.slug })),
    ...parseFactories(fs.readFileSync(path.join(lib, "newSpecializedCalculatorsData.js"), "utf8"))
      .map((item) => ({ ...item, url: "/" + item.slug })),
    ...parseFactories(fs.readFileSync(path.join(lib, "missingCalculators.js"), "utf8"))
      .map((item) => ({ ...item, url: "/" + item.slug })),
  ];
  const byId = new Map();
  const byUrl = new Map();
  for (const item of all) {
    if (!byId.has(item.id) && !byUrl.has(item.url)) {
      byId.set(item.id, item);
      byUrl.set(item.url, item);
    }
  }
  const calculators = [...byId.values()];
  if (calculators.length !== 100) throw new Error("Expected 100 canonical calculators, found " + calculators.length);
  if (new Set(calculators.map((item) => item.url)).size !== 100) throw new Error("Canonical calculator URLs are not unique");

  const knownCategories = new Set([
    "basic", "composition", "shape", "metabolism", "advanced",
    "Nutrition & Fitness", "Running & Training", "Strength Training",
    "Weight, BMI & Weight Goals", "Calories & Metabolism",
    "Nutrition & Macronutrients", "Wellness & Recovery", "Heart Rate & Cardiovascular",
  ]);
  const categoryLabels = {
    basic: "Basic Health Calculators",
    composition: "Body Composition",
    shape: "Body Shape",
    metabolism: "Metabolism & Energy",
    advanced: "Advanced Calculators",
  };
  const groups = new Map();
  for (const item of calculators) {
    const ownCategory = String(item.category || "").trim();
    const group = knownCategories.has(ownCategory) ? (categoryLabels[ownCategory] || ownCategory) : "Other";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(item);
  }

  const sections = [...groups.entries()].map(([category, items]) =>
    "<section><h2>" + esc(category) + "</h2><ul>" +
    items.map((item) => '<li><a href="' + esc(item.url) + '">' + esc(item.name) + "</a></li>").join("") +
    "</ul></section>"
  ).join("");
  const description = "Browse all 100 free health and fitness calculators for BMI, body composition, calories, nutrition, running, strength and heart-rate metrics.";
  const title = "100 Health & Fitness Calculators | FitMe Pro";
  const canonical = site + "/calculators";
  const indexPath = path.join(build, "index.html");
  if (!fs.existsSync(indexPath)) throw new Error("Missing build/index.html before calculator directory prerender");
  let html = fs.readFileSync(indexPath, "utf8");
  html = html.replace(/<title>[\s\S]*?<\/title>/i, "<title>" + esc(title) + "</title>");
  html = html.replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "");
  html = html.replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "");
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");
  html = html.replace(/<\/head>/i, '<meta name="description" content="' + esc(description) + '" /><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="' + canonical + '" /></head>');
  const body = '<main><article><h1>100 Health &amp; Fitness Calculators</h1><p>' + esc(description) + '</p>' + sections + '</article></main>';
  html = html.replace(/<div id="root"><\/div>/i, '<div id="root">' + body + "</div>");
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  const hrefs = new Set([...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]));
  const missingLinks = calculators.filter((item) => !hrefs.has(item.url)).map((item) => item.url);
  if (h1Count !== 1 || missingLinks.length) {
    throw new Error("Calculator directory validation failed: H1=" + h1Count + ", missing links=" + missingLinks.length + "; " + missingLinks.join(", "));
  }

  const directory = path.join(build, "calculators");
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), html, "utf8");

  const sitemapPath = path.join(build, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) throw new Error("Missing build/sitemap.xml");
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const urls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
  urls.add(canonical);
  const updatedSitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [...urls].sort().map((url) => "  <url><loc>" + esc(url) + "</loc></url>").join("\n") +
    "\n</urlset>\n";
  fs.writeFileSync(sitemapPath, updatedSitemap, "utf8");

  const finalSitemap = fs.readFileSync(sitemapPath, "utf8");
  const finalDirectory = fs.readFileSync(path.join(directory, "index.html"), "utf8");
  const finalHrefs = new Set([...finalDirectory.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]));
  const finalMissing = calculators.filter((item) => !finalHrefs.has(item.url));
  if (!finalSitemap.includes("<loc>" + canonical + "</loc>") || finalMissing.length !== 0 || [...finalDirectory.matchAll(/<h1\b/gi)].length !== 1) {
    throw new Error("Calculator directory/sitemap build check failed: missing directory URL or calculator links");
  }
  console.log("Calculator directory check: 100/100 registry links; one H1; canonical and sitemap entry verified.");
};
