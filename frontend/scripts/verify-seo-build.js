const fs = require("fs");
const path = require("path");

const build = path.resolve(__dirname, "..", "build");
const sitemapPath = path.join(build, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) throw new Error("Missing build/sitemap.xml");

const xml = fs.readFileSync(sitemapPath, "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const site = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");
const missing = [];

for (const url of urls) {
  const pathname = new URL(url).pathname.replace(/^\//, "").replace(/\/$/, "");
  const target = pathname ? path.join(build, pathname, "index.html") : path.join(build, "index.html");
  if (!fs.existsSync(target)) missing.push(new URL(url).pathname);
}

const samplePages = ["bmi-calculator", "tdee-calculator", "absi-calculator", "protein-calculator", "bench-press-1rm-calculator"];
const duplicateReport = [];
for (const slug of samplePages) {
  const file = path.join(build, slug, "index.html");
  if (!fs.existsSync(file)) { duplicateReport.push({ slug, missing: true }); continue; }
  const html = fs.readFileSync(file, "utf8");
  duplicateReport.push({
    slug,
    canonical: (html.match(/rel=["']canonical["']/gi) || []).length,
    description: (html.match(/<meta\s+name=["']description["']/gi) || []).length
  });
}

const flagship = ["tdee-calculator", "obesity-class-calculator", "ponderal-index-calculator", "body-density-calculator", "waist-height-ratio-calculator"];
const headingReport = [];
for (const slug of flagship) {
  const file = path.join(build, slug, "index.html");
  if (!fs.existsSync(file)) { headingReport.push({ slug, missing: true }); continue; }
  const html = fs.readFileSync(file, "utf8");
  const headings = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim());
  const counts = new Map();
  for (const h of headings) counts.set(h, (counts.get(h) || 0) + 1);
  headingReport.push({ slug, h2: headings.length, duplicates: [...counts.entries()].filter(([,n]) => n > 1) });
}

const bmi = fs.readFileSync(path.join(build, "bmi-calculator", "index.html"), "utf8");
const bmiReport = {
  jsonLd: (bmi.match(/<script\s+type=["']application\/ld\+json["']/gi) || []).length,
  robots: (bmi.match(/<meta\s+name=["']robots["']/gi) || []).length
};

console.log(JSON.stringify({ sitemapUrls: urls.length, sitemapMissing: missing, samplePages: duplicateReport, flagshipHeadings: headingReport, bmi: bmiReport }, null, 2));

if (missing.length) process.exit(2);
if (duplicateReport.some(x => x.missing || x.canonical !== 1 || x.description !== 1)) process.exit(3);
if (headingReport.some(x => x.missing || x.duplicates.length)) process.exit(4);
if (bmiReport.jsonLd !== 1 || bmiReport.robots !== 1) process.exit(5);
