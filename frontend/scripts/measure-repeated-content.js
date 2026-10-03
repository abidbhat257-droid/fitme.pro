const fs = require("fs");
const path = require("path");

const build = path.resolve(__dirname, "..", "build");
const categories = ["fitness", "nutrition", "weight-loss", "body-composition", "wellness", "health-education"];

if (!fs.existsSync(build)) throw new Error("Missing build directory. Run the production build first.");

function htmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(file));
    else if (entry.name === "index.html") out.push(file);
  }
  return out;
}

function articleHtml(html) {
  const match = html.match(/<article\b[^>]*>([\\s\\S]*?)<\/article>/i);
  return match ? match[1] : "";
}

function decode(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function textFromHtml(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function words(text) {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

const articles = [];
for (const category of categories) {
  const dir = path.join(build, "journal", category);
  if (!fs.existsSync(dir)) continue;
  for (const file of htmlFiles(dir)) {
    const rel = path.relative(build, file).replace(/\\/g, "/");
    if (!rel.startsWith("journal/" + category + "/")) continue;
    const slug = rel.split("/")[2];
    const html = fs.readFileSync(file, "utf8");
    const article = articleHtml(html);
    const paragraphs = [...article.matchAll(/<p\b[^>]*>([\\s\\S]*?)<\/p>/gi)]
      .map((m) => textFromHtml(m[1]))
      .filter((p) => p.length > 60);
    articles.push({ category, slug, file, text: textFromHtml(article), paragraphs });
  }
}

const paragraphArticles = new Map();
for (const article of articles) {
  for (const paragraph of new Set(article.paragraphs)) {
    if (!paragraphArticles.has(paragraph)) paragraphArticles.set(paragraph, new Set());
    paragraphArticles.get(paragraph).add(article.slug);
  }
}

const rows = articles.map((article) => {
  const sharedParagraphs = [...new Set(article.paragraphs)]
    .filter((paragraph) => (paragraphArticles.get(paragraph)?.size || 0) >= 10);
  const sharedWords = sharedParagraphs.reduce((sum, paragraph) => sum + words(paragraph), 0);
  const totalWords = words(article.text);
  return {
    category: article.category,
    slug: article.slug,
    wordCount: totalWords,
    sharedWords,
    sharedPercent: totalWords ? Number((sharedWords / totalWords * 100).toFixed(2)) : 0,
    sharedParagraphCount: sharedParagraphs.length
  };
});

const summary = {};
for (const category of categories) {
  const categoryRows = rows.filter((row) => row.category === category);
  summary[category] = {
    total: categoryRows.length,
    affected: categoryRows.filter((row) => row.sharedPercent > 50).length
  };
}

console.log(JSON.stringify({
  rule: "Paragraphs >60 characters; shared when exact text appears in 10+ journal articles; affected when >50% of article words are in shared paragraphs.",
  summary,
  affectedArticles: rows.filter((row) => row.sharedPercent > 50).sort((a, b) => b.sharedPercent - a.sharedPercent)
}, null, 2));
