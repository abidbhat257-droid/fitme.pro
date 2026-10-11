// Final prerender pass: make every static page's SEO head consistent.
// - exactly one <link rel="canonical"> (the page's own URL)
// - exactly one og:url, og:title, og:description, og:type (page-specific, last one wins)
// - exactly one <meta name="description"> (falls back to og:description)
// - twitter:title/description mirror og on non-home pages
// Robots tags are NOT touched (noindex policy stays exactly as generated).
const fs = require("fs");
const path = require("path");
const build = path.resolve(__dirname, "..", "build");
const site = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const attr = (tag, name) => { const m = tag.match(new RegExp(name + '\\s*=\\s*"([^"]*)"', "i")); return m ? m[1] : null; };

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "static") walk(p, out); }
    else if (e.name === "index.html") out.push(p);
  }
  return out;
}

// keep only the LAST occurrence of every tag matched by `re`
function keepLast(head, re) {
  const found = head.match(re) || [];
  if (found.length <= 1) return head;
  const last = found[found.length - 1];
  let seen = 0;
  return head.replace(re, (m) => (++seen === found.length ? last : ""));
}

let changed = 0, files = 0, noDescFixed = 0, canonFixed = 0;
for (const file of walk(build)) {
  let html = fs.readFileSync(file, "utf8");
  const end = html.indexOf("</head>");
  if (end < 0) continue;
  files++;
  let head = html.slice(0, end), rest = html.slice(end);
  const before = head;
  const rel = path.relative(build, path.dirname(file)).split(path.sep).filter(Boolean).join("/");
  const ownUrl = rel ? `${site}/${rel}` : `${site}/`;

  // canonical: remove all, add exactly one (own URL). Skip pages with no canonical at all (e.g. 404 shells).
  const canonRe = /<link\s+rel=["']canonical["'][^>]*>\s*/gi;
  const canons = head.match(canonRe) || [];
  if (canons.length) {
    const hrefs = canons.map((c) => attr(c, "href"));
    // prefer one equal to own URL, otherwise the last non-homepage one, otherwise the last
    let chosen = hrefs.find((h) => h === ownUrl) || [...hrefs].reverse().find((h) => h && h !== `${site}/`) || hrefs[hrefs.length - 1];
    if (rel && chosen === `${site}/`) chosen = ownUrl;
    head = head.replace(canonRe, "");
    head += `<link rel="canonical" href="${chosen}" />`;
    if (canons.length > 1 || chosen !== hrefs[0]) canonFixed++;
    // og:url must equal canonical
    head = head.replace(/<meta\s+property=["']og:url["'][^>]*>\s*/gi, "");
    head += `<meta property="og:url" content="${chosen}" />`;
  }

  for (const prop of ["og:type", "og:title", "og:description", "og:site_name"]) {
    head = keepLast(head, new RegExp(`<meta\\s+property=["']${prop}["'][^>]*>\\s*`, "gi"));
  }
  head = keepLast(head, /<meta\s+name=["']description["'][^>]*>\s*/gi);

  // description fallback
  if (!/<meta\s+name=["']description["']/i.test(head)) {
    const og = head.match(/<meta\s+property=["']og:description["'][^>]*>/i);
    const d = og && attr(og[0], "content");
    if (d) { head += `<meta name="description" content="${d}" />`; noDescFixed++; }
  }

  // twitter tags mirror og on non-home pages
  if (rel) {
    const ogT = head.match(/<meta\s+property=["']og:title["'][^>]*>/i);
    const ogD = head.match(/<meta\s+property=["']og:description["'][^>]*>/i);
    if (ogT) { head = head.replace(/<meta\s+name=["']twitter:title["'][^>]*>\s*/gi, ""); head += `<meta name="twitter:title" content="${attr(ogT[0], "content")}" />`; }
    if (ogD) { head = head.replace(/<meta\s+name=["']twitter:description["'][^>]*>\s*/gi, ""); head += `<meta name="twitter:description" content="${attr(ogD[0], "content")}" />`; }
  }

  if (head !== before) { fs.writeFileSync(file, head + rest, "utf8"); changed++; }
}
console.log(`finalizeMeta: ${files} pages scanned, ${changed} updated, ${canonFixed} canonical fixes, ${noDescFixed} missing descriptions added.`);
