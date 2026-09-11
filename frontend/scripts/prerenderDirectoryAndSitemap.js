const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const indexPath = path.join(build, "index.html");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error(`Build output not found: ${indexPath}`);

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#39;");

const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function writeRoute(route, html) {
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  const dir = path.join(build, clean);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

function stripSeoMeta(html) {
  return html
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:(?:type|title|description|url|site_name)["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");
}

function setMeta(html, title, description, canonical) {
  html = stripSeoMeta(html);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  return html.replace(/<\/head>/i,
    `<meta name="description" content="${esc(description)}" /><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="website" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${canonical}" /></head>`
  );
}

async function loadRegistries() {
  const tempDir = path.join(build, "__fitme_registry_modules");
  fs.mkdirSync(tempDir, { recursive: true });

  const copy = (name, source) => {
    const target = path.join(tempDir, name);
    fs.writeFileSync(target, source, "utf8");
    return target;
  };

  const units = fs.readFileSync(path.join(root, "src/lib/units.js"), "utf8");
  const validation = fs.readFileSync(path.join(root, "src/lib/validation.js"), "utf8");
  const calculatorSource = fs.readFileSync(path.join(root, "src/lib/calculators.js"), "utf8")
    .replace(/from\s+["']\.\/units["']/g, 'from "./units.mjs"')
    .replace(/from\s+["']\.\/validation["']/g, 'from "./validation.mjs"');
  const newDataSource = fs.readFileSync(path.join(root, "src/lib/newSpecializedCalculatorsData.js"), "utf8")
    .replace(/from\s+["']\.\/units["']/g, 'from "./units.mjs"');
  const newSource = fs.readFileSync(path.join(root, "src/lib/newSpecializedCalculators.js"), "utf8")
    .replace(/from\s+["']\.\/newSpecializedCalculatorsData["']/g, 'from "./newSpecializedCalculatorsData.mjs"');
  const specializedSource = fs.readFileSync(path.join(root, "src/lib/specializedCalculators.js"), "utf8")
    .replace(/from\s+["']\.\/units["']/g, 'from "./units.mjs"')
    .replace(/from\s+["']\.\/newSpecializedCalculators["']/g, 'from "./newSpecializedCalculators.mjs"');
  const missingSource = fs.readFileSync(path.join(root, "src/lib/missingCalculators.js"), "utf8");

  const files = {
    units: copy("units.mjs", units),
    validation: copy("validation.mjs", validation),
    calculators: copy("calculators.mjs", calculatorSource),
    newData: copy("newSpecializedCalculatorsData.mjs", newDataSource),
    newSpecialized: copy("newSpecializedCalculators.mjs", newSource),
    specialized: copy("specializedCalculators.mjs", specializedSource),
    missing: copy("missingCalculators.mjs", missingSource),
  };

  const mod = async (file) => import(`${pathToFileURL(file).href}?v=${Date.now()}`);
  const [calc, spec, missing] = await Promise.all([
    mod(files.calculators),
    mod(files.specialized),
    mod(files.missing),
  ]);
  return {
    calculators: calc.calculators || calc.default || [],
    specialized: spec.specializedCalculators || spec.default || [],
    missing: missing.missingCalculators || missing.default || [],
  };
}

const LEGACY_REDIRECT_SLUGS = new Set([
  "bmi", "bmr", "tdee", "absi", "body-fat", "waist-height-ratio", "ponderal-index",
  "obesity-class", "weight-loss-goal", "weight-gain-goal", "navy-body-fat"
]);

function calculatorHref(calc, source) {
  const slug = String(calc.slug || calc.id || "").replace(/^\//, "");
  return source === "base" ? `/${slug}-calculator` : `/${slug}`;
}

async function main() {
  const base = fs.readFileSync(indexPath, "utf8");
  const { calculators, specialized, missing } = await loadRegistries();
  const urls = new Set([siteUrl + "/"]);

  calculators.forEach((calc) => {
    if (!calc || !calc.id || LEGACY_REDIRECT_SLUGS.has(String(calc.slug || calc.id))) return;
    const route = calculatorHref(calc, "base");
    const target = path.join(build, route.slice(1), "index.html");
    if (fs.existsSync(target)) urls.add(siteUrl + route);
  });

  [...specialized, ...missing].forEach((calc) => {
    if (!calc || !calc.id) return;
    const route = calculatorHref(calc, "dynamic");
    const target = path.join(build, route.slice(1), "index.html");
    if (fs.existsSync(target)) urls.add(siteUrl + route);
  });

  const staticPages = [
    ["about", "About FitMe Pro", "Learn about FitMe Pro and its health and fitness calculators."],
    ["contact", "Contact FitMe Pro", "Contact FitMe Pro about calculator corrections, technical issues and feedback."],
    ["privacy-policy", "Privacy Policy — FitMe Pro", "Read the FitMe Pro privacy policy."],
    ["terms", "Terms of Use — FitMe Pro", "Read the FitMe Pro terms of use and calculator limitations."]
  ];

  for (const [slug, title, description] of staticPages) {
    const route = `/${slug}`;
    const html = setMeta(base, title, description, `${siteUrl}${route}`)
      .replace(/<div id="root"><\/div>/i, `<div id="root"><main><article><h1>${esc(title)}</h1><p>${esc(description)}</p></article></main></div>`);
    writeRoute(route, html);
    urls.add(siteUrl + route);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].sort().map((url) => `  <url><loc>${esc(url)}</loc></url>`).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(build, "sitemap.xml"), sitemap, "utf8");
  console.log(`Generated sitemap with ${urls.size} verified URLs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
