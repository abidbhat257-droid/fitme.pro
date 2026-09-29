const fs = require("fs");
const path = require("path");

const build = path.resolve(__dirname, "..", "build");
const sitemapPath = path.join(build, "sitemap.xml");
const registryPath = path.resolve(__dirname, "..", "src", "lib", "allCalculators.js");
const site = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(sitemapPath)) throw new Error("Missing build/sitemap.xml");
if (!fs.existsSync(registryPath)) throw new Error("Missing canonical calculator registry");

function htmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "static") continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(file));
    else if (entry.name === "index.html") out.push(file);
  }
  return out;
}

function routeToFile(route) {
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return clean ? path.join(build, clean, "index.html") : path.join(build, "index.html");
}

function countTag(html, tag) {
  return (html.match(new RegExp(`<${tag}\\b`, "gi")) || []).length;
}

function attr(html, tag, name, value) {
  const pattern = value
    ? "<" + tag + "[^>]*" + name + "=[\\\"']" + value + "[\\\"'][^>]*>"
    : "<" + tag + "[^>]*" + name + "=[\\\"']([^\\\"']+)[\\\"'][^>]*>";
  const match = html.match(new RegExp(pattern, "i"));
  return match ? (value || match[1]).trim() : "";
}

const registrySource = fs.readFileSync(registryPath, "utf8");
if (!/ALL_CALCULATORS\.length\s*!==\s*100/.test(registrySource)) {
  throw new Error("Canonical calculator registry no longer enforces exactly 100 calculators.");
}

const xml = fs.readFileSync(sitemapPath, "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const duplicateSitemapUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
if (duplicateSitemapUrls.length) throw new Error(`Sitemap contains duplicate URLs: ${duplicateSitemapUrls.join(", ")}`);

const seenCanonicals = new Map();
const problems = [];
const calculatorUrls = urls.filter((url) => /-calculator\/?$/.test(new URL(url).pathname));

for (const url of urls) {
  const parsed = new URL(url);
  if (parsed.origin !== site) problems.push(`Sitemap URL has unexpected origin: ${url}`);
  const route = parsed.pathname;
  const file = routeToFile(route);
  if (!fs.existsSync(file)) {
    problems.push(`Sitemap URL has no built HTML: ${route}`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [,""])[1].trim();
  const description = attr(html, "meta", "name", "description") || attr(html, "meta", "property", "og:description");
  const canonical = attr(html, "link", "rel", "canonical");
  const robots = attr(html, "meta", "name", "robots").toLowerCase();

  if (!title) problems.push(`Missing <title>: ${route}`);
  if (!description) problems.push(`Missing meta description: ${route}`);
  if (!canonical) problems.push(`Missing canonical: ${route}`);
  if (canonical && canonical.replace(/\/$/, "") !== url.replace(/\/$/, "")) problems.push(`Canonical mismatch: ${route} -> ${canonical}`);
  if (robots.includes("noindex")) problems.push(`Sitemap URL is noindex: ${route}`);
  if (countTag(html, "h1") !== 1) problems.push(`Expected exactly one H1: ${route}`);

  if (canonical) {
    if (seenCanonicals.has(canonical)) {
      problems.push(`Duplicate canonical ${canonical}: ${seenCanonicals.get(canonical)} and ${route}`);
    } else {
      seenCanonicals.set(canonical, route);
    }
  }
}

if (calculatorUrls.length !== 100) {
  problems.push(`Expected 100 calculator URLs in sitemap, found ${calculatorUrls.length}`);
}

const requiredCalculatorSlugs = [
  "bmi-calculator",
  "bmr-calculator",
  "tdee-calculator",
  "body-fat-calculator",
  "navy-body-fat-calculator",
  "relative-fat-mass-calculator",
  "absi-calculator",
  "bri-calculator",
  "ponderal-index-calculator",
  "adjusted-body-weight-calculator",
  "one-rep-max-calculator",
  "pace-calculator",
];

for (const slug of requiredCalculatorSlugs) {
  const url = `${site}/${slug}`;
  if (!urls.includes(url)) problems.push(`Required calculator missing from sitemap: /${slug}`);
}

const robotsFile = path.join(build, "robots.txt");
if (fs.existsSync(robotsFile)) {
  const robots = fs.readFileSync(robotsFile, "utf8");
  if (!/User-agent:\s*\*/i.test(robots)) problems.push("robots.txt is missing a wildcard User-agent rule");
  if (!/Sitemap:\s*https:\/\/[^\s]+\/sitemap\.xml/i.test(robots)) problems.push("robots.txt is missing a sitemap declaration");
}

const report = {
  sitemapUrls: urls.length,
  calculatorUrls: calculatorUrls.length,
  htmlFiles: htmlFiles(build).length,
  duplicateSitemapUrls: duplicateSitemapUrls.length,
  checkedSitemapPages: urls.length,
  problems,
};

fs.writeFileSync(path.join(build, "seo-build-report.json"), JSON.stringify(report, null, 2) + "\n", "utf8");
console.log(JSON.stringify(report, null, 2));

if (problems.length) {
  throw new Error(`SEO build verification failed with ${problems.length} problem(s).`);
}
