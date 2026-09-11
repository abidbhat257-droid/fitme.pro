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
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i, `<meta name="description" content="${esc(description)}" />$1`);
  return html.replace(/<\/head>/i,
    `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="website" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${canonical}" /></head>`
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
    newCalc: copy("newSpecializedCalculators.mjs", newSource),
    specialized: copy("specializedCalculators.mjs", specializedSource),
    missing: copy("missingCalculators.mjs", missingSource),
  };

  try {
    const calculators = await import(`${pathToFileURL(files.calculators).href}?v=${Date.now()}`);
    const specialized = await import(`${pathToFileURL(files.specialized).href}?v=${Date.now()}`);
    const missing = await import(`${pathToFileURL(files.missing).href}?v=${Date.now()}`);
    return {
      calculators: calculators.CALCULATORS || [],
      specialized: specialized.SPECIALIZED_CALCULATORS || [],
      missing: missing.MISSING_CALCULATORS || [],
    };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function topicFor(calc) {
  const category = String(calc.category || "").toLowerCase();
  if (category.includes("running") || category.includes("training")) return "running";
  if (category.includes("strength") || category.includes("gym")) return "strength";
  if (category.includes("heart") || category.includes("cardio")) return "heart";
  if (category.includes("nutrition") || category.includes("macro")) return "nutrition";
  if (category.includes("calorie") || category.includes("metabolism")) return "calories";
  if (category.includes("weight")) return "weight-management";
  if (category.includes("composition") || category.includes("shape") || category.includes("basic") || category.includes("advanced")) return "body-composition";
  return "body-composition";
}

function calculatorHref(calc) {
  return `/${String(calc.slug || calc.id).replace(/^\//, "")}`;
}

(async () => {
  const base = fs.readFileSync(indexPath, "utf8");
  const { calculators, specialized, missing } = await loadRegistries();
  const all = [...calculators, ...specialized, ...missing].reduce((list, calc) => {
    if (!calc || !calc.id) return list;
    if (!list.some((item) => item.id === calc.id)) list.push(calc);
    return list;
  }, []);

  const groups = {
    "body-composition": { title: "Body Composition & Body Measurements", description: "BMI, body fat, lean mass, body measurements and related health metrics." },
    "weight-management": { title: "Weight, BMI & Weight Goals", description: "Healthy weight, target weight, weight change and weight-management calculators." },
    calories: { title: "Calories & Metabolism", description: "BMR, TDEE, maintenance calories, deficits, surpluses and energy expenditure." },
    nutrition: { title: "Nutrition & Macronutrients", description: "Protein, carbohydrates, fats, fibre, water and macro planning tools." },
    running: { title: "Running, Cardio & Endurance", description: "Pace, speed, race prediction, training and aerobic fitness calculators." },
    strength: { title: "Strength & Gym Performance", description: "One-rep max, strength, training volume and lifting performance calculators." },
    heart: { title: "Heart Rate & Cardiovascular Metrics", description: "Heart-rate zones, recovery and cardiovascular metric calculators." },
  };

  const grouped = Object.fromEntries(Object.keys(groups).map((key) => [key, []]));
  for (const calc of all) grouped[topicFor(calc)].push(calc);

  const directoryCanonical = `${siteUrl}/calculators`;
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "100 Health & Fitness Calculators",
    description: "Browse free health and fitness calculators by topic.",
    url: directoryCanonical,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: all.map((calc, index) => ({ "@type": "ListItem", position: index + 1, name: calc.name, url: `${siteUrl}${calculatorHref(calc)}` })),
    },
  };

  let directory = setMeta(base, "100 Health & Fitness Calculators — FitMe Pro", "Browse free health and fitness calculators for BMI, body composition, weight goals, calories, nutrition, running, strength and heart-rate metrics.", directoryCanonical);
  const groupHtml = Object.entries(groups).map(([key, group]) => {
    const items = grouped[key];
    return `<section style="margin:0 0 48px"><h2>${esc(group.title)} <span>(${items.length})</span></h2><p>${esc(group.description)}</p><ul>${items.map((calc) => `<li><a href="${calculatorHref(calc)}">${esc(calc.name)}</a>${calc.description ? ` — ${esc(calc.description)}` : ""}</li>`).join("")}</ul></section>`;
  }).join("");
  const directoryBody = `<main><article style="max-width:1100px;margin:0 auto;padding:40px 20px;font-family:Arial,sans-serif"><p>FitMe Pro Directory</p><h1>100 Health &amp; Fitness Calculators</h1><p>Explore ${all.length} free calculators organized by topic. Each tool explains its inputs, formula, limitations and practical use.</p>${groupHtml}<nav><h2>More FitMe Pro resources</h2><ul><li><a href="/journal">FitMe Pro Journal</a></li><li><a href="/journal/editorial-standards">Editorial Standards</a></li><li><a href="/journal/evidence-sources">Evidence Sources</a></li></ul></nav></article></main>`;
  directory = directory.replace(/<div id="root"><\/div>/i, `<div id="root">${directoryBody}</div>`)
    .replace(/<\/head>/i, `<script type="application/ld+json">${json(directorySchema)}</script></head>`);
  writeRoute("/calculators", directory);

  const staticPages = [
    ["about", "About FitMe Pro", "Learn how FitMe Pro builds free health and fitness calculators and explains their methods, limitations and educational use.", "<h1>About FitMe Pro</h1><p>FitMe Pro provides free health, fitness and body-composition calculators with clear explanations of formulas, inputs, limitations and practical use.</p><h2>Our approach</h2><p>We aim to make calculation methods understandable and useful while clearly distinguishing estimates and screening tools from medical diagnosis.</p>"],
    ["contact", "Contact FitMe Pro", "Contact FitMe Pro about calculator corrections, technical issues, content feedback and general questions.", "<h1>Contact FitMe Pro</h1><p>Use this page for feedback about calculator results, content corrections, technical issues or general questions about FitMe Pro.</p><h2>Content corrections</h2><p>If you spot an inaccurate formula, broken link or unclear explanation, please provide the page URL and describe the issue so it can be reviewed.</p>"],
    ["privacy-policy", "Privacy Policy — FitMe Pro", "Read the FitMe Pro privacy policy and learn how information is handled when you use the site.", "<h1>Privacy Policy</h1><p>FitMe Pro is designed to provide calculators and educational content. Calculator inputs are processed in the browser unless a feature explicitly states otherwise.</p><h2>Analytics and advertising</h2><p>Third-party analytics or advertising services, if enabled, may process information according to their own policies. Review the notices presented on the site for current details.</p>"],
    ["terms", "Terms of Use — FitMe Pro", "Read the FitMe Pro terms of use, including the educational nature and limitations of calculator results.", "<h1>Terms of Use</h1><p>FitMe Pro provides health and fitness calculators and educational information for general informational purposes.</p><h2>Educational use</h2><p>Calculator results are estimates or screening outputs and are not medical diagnosis, treatment or individualized professional advice.</p><h2>Use of the site</h2><p>Use the calculators responsibly and verify important health decisions with a qualified professional.</p>"]
  ];
  for (const [slug, title, description, body] of staticPages) {
    const canonical = `${siteUrl}/${slug}`;
    let html = setMeta(base, title, description, canonical);
    const content = `<main><article style="max-width:900px;margin:0 auto;padding:40px 20px;font-family:Arial,sans-serif"><a href="/">FitMe Pro</a>${body}<p><a href="/calculators">Browse all calculators</a> · <a href="/journal">Read the Journal</a></p></article></main>`;
    html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${content}</div>`);
    writeRoute(`/${slug}`, html);
  }



  const urls = new Set([
    `${siteUrl}/`,
    `${siteUrl}/calculators`,
    `${siteUrl}/about`,
    `${siteUrl}/contact`,
    `${siteUrl}/privacy-policy`,
    `${siteUrl}/terms`,
    `${siteUrl}/journal`,
    `${siteUrl}/journal/editorial-standards`,
    `${siteUrl}/journal/evidence-sources`,
  ]);
  Object.keys(groups).forEach((key) => urls.add(`${siteUrl}/calculator-category/${key}`));
  calculators.forEach((calc) => {
    if (!calc || !calc.id || LEGACY_REDIRECT_SLUGS.has(String(calc.slug || calc.id))) return;
    urls.add(`${siteUrl}${calculatorHref(calc, "base")}`);
  });
  [...specialized, ...missing].forEach((calc) => {
    if (!calc || !calc.id) return;
    urls.add(`${siteUrl}${calculatorHref(calc, "dynamic")}`);
  });

  // Add the Journal article routes from the canonical content source when available.
  try {
    const journalPath = path.join(root, "src/lib/journalContent.js");
    const temp = path.join(build, "__fitme_sitemap_journal.mjs");
    fs.writeFileSync(temp, fs.readFileSync(journalPath, "utf8"), "utf8");
    const journal = await import(`${pathToFileURL(temp).href}?v=${Date.now()}`);
    for (const article of journal.JOURNAL_ARTICLES || []) {
      if (article.categorySlug && article.slug) urls.add(`${siteUrl}/journal/${article.categorySlug}/${article.slug}`);
    }
    for (const category of journal.JOURNAL_CATEGORIES || []) {
      if (category.slug) urls.add(`${siteUrl}/journal/${category.slug}`);
    }
    fs.unlinkSync(temp);
  } catch (_) {
    // Sitemap remains valid even if optional Journal metadata is unavailable.
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls].sort().map((url) => `  <url><loc>${esc(url)}</loc></url>`).join("
")}
</urlset>
`;
  fs.writeFileSync(path.join(build, "sitemap.xml"), sitemap, "utf8");

  console.log(`SEO directory/sitemap: ${all.length} unique calculators, ${urls.size} sitemap URLs.`);
})();
