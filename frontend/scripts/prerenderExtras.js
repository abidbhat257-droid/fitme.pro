const fs = require("fs");
const path = require("path");

const build = path.resolve(__dirname, "../build");
const indexPath = path.join(build, "index.html");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(indexPath)) throw new Error(`Build output not found: ${indexPath}`);

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const pages = [
  {slug:"calorie-calculator",title:"Calorie Calculator",description:"Estimate daily calorie needs for maintaining, losing, or gaining weight using age, sex, height, weight, and activity level.",formula:"Mifflin–St Jeor BMR × activity factor",links:["/bmr-calculator","/tdee-calculator","/calorie-deficit-calculator"]},
  {slug:"macro-calculator",title:"Macro Calculator",description:"Estimate daily protein, carbohydrate, and fat targets from estimated energy needs and activity level.",formula:"Protein and fat allocations are converted to calories; remaining calories are assigned to carbohydrate.",links:["/protein-calculator","/carbohydrate-calculator","/fat-intake-calculator"]},
  {slug:"protein-calculator",title:"Protein Calculator",description:"Estimate a practical daily protein target from body weight and activity level.",formula:"Protein target = body weight × activity-based factor",links:["/macro-calculator","/tdee-calculator"]},
  {slug:"calories-burned-calculator",title:"Calories Burned Calculator",description:"Estimate energy expenditure for a 30-minute activity using body weight and an activity intensity estimate.",formula:"Calories ≈ MET × 3.5 × body weight (kg) ÷ 200 × minutes",links:["/tdee-calculator","/calorie-calculator"]},
  {slug:"pace-calculator",title:"Pace Calculator",description:"Calculate running pace, speed, distance, or time from the values you enter.",formula:"Pace = time ÷ distance; speed = distance ÷ time",links:["/calories-burned-calculator","/target-heart-rate-calculator"]},
  {slug:"carbohydrate-calculator",title:"Carbohydrate Calculator",description:"Estimate a daily carbohydrate target after accounting for protein and fat within estimated calorie needs.",formula:"Carbohydrate grams = remaining calories ÷ 4",links:["/macro-calculator","/calorie-calculator"]},
  {slug:"fat-intake-calculator",title:"Fat Intake Calculator",description:"Estimate a daily dietary fat target from estimated maintenance calories.",formula:"Fat grams = target calories × 25% ÷ 9",links:["/macro-calculator","/calorie-calculator"]},
  {slug:"one-rep-max-calculator",title:"One Rep Max Calculator",description:"Estimate your one-repetition maximum from a weight and repetition set using a common strength-training equation.",formula:"Epley estimate: 1RM = weight × (1 + repetitions ÷ 30)",links:["/target-heart-rate-calculator"]},
  {slug:"target-heart-rate-calculator",title:"Target Heart Rate Zone Calculator",description:"Estimate an exercise heart-rate zone from age using an age-based maximum-heart-rate model.",formula:"Estimated HRmax = 220 − age; zone = HRmax × selected percentage",links:["/pace-calculator","/calories-burned-calculator"]},
  {slug:"army-body-fat-calculator",title:"Army Body Fat Calculator",description:"Estimate body-fat percentage from height and circumference measurements using a U.S. military circumference-based equation.",formula:"Circumference-based body-fat equation using height, waist, neck, and hip measurements where applicable.",links:["/body-fat-calculator","/navy-body-fat-calculator","/waist-height-ratio-calculator"]}
];

function setMeta(html, title, description, canonical) {
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i, `<meta name="description" content="${esc(description)}" />$1`);
  return html.replace(/<\/head>/i, `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="website" /><meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(description)}" /><meta property="og:url" content="${canonical}" /></head>`);
}

function writeRoute(route, html) {
  const dir = path.join(build, route.replace(/^\//, ""));
  fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

const base = fs.readFileSync(indexPath, "utf8");
for (const page of pages) {
  const canonical = `${siteUrl}/${page.slug}`;
  const schema = {"@context":"https://schema.org","@graph":[{"@type":"WebApplication",name:page.title,url:canonical,applicationCategory:"HealthApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"USD"}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"FitMe Pro",item:`${siteUrl}/`},{"@type":"ListItem",position:2,name:page.title,item:canonical}]}]};
  let html = setMeta(base, `${page.title} · FitMe Pro`, page.description, canonical);
  const related = page.links.map((href) => `<li><a href="${href}">${esc(href.slice(1).replace(/-calculator$/, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()))} Calculator</a></li>`).join("");
  const body = `<main><article style="max-width:900px;margin:0 auto;padding:40px 20px"><nav aria-label="Breadcrumb"><a href="/">FitMe Pro</a> / <span>${esc(page.title)}</span></nav><h1>${esc(page.title)}</h1><p>${esc(page.description)}</p><section><h2>How it works</h2><p>Enter the requested measurements or training values. FitMe Pro applies the calculator's stated equation to produce an estimate. Results are informational and may differ from measurements or outcomes in real-world settings.</p></section><section><h2>Formula</h2><p><code>${esc(page.formula)}</code></p></section><section><h2>How to use the result</h2><p>Use the estimate as one input alongside your goals, activity level, measurements, and changes over time. A single calculator result should not be treated as a diagnosis or individualized medical prescription.</p></section><section><h2>Accuracy and limitations</h2><p>Equations are population-based models. Measurement technique, exercise intensity, body composition, age, sex, training status, and individual variation can affect results. For medical, athletic-performance, or nutrition decisions that require individual assessment, consult an appropriately qualified professional.</p></section><section><h2>Related FitMe Pro calculators</h2><ul>${related}</ul></section><p><a href="/journal">Read the FitMe Pro Journal</a> for evidence-informed nutrition, fitness, weight-management, and wellness guides.</p></article></main>`;
  html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${body}</div>`).replace(/<\/head>/i, `<script type="application/ld+json">${json(schema)}</script></head>`);
  writeRoute(`/${page.slug}`, html);
}

const editorialCanonical = `${siteUrl}/journal/editorial-standards`;
let editorial = setMeta(base, "Editorial Standards · FitMe Pro Journal", "How FitMe Pro develops evidence-informed health and fitness content using authoritative public-health and scientific sources.", editorialCanonical);
editorial = editorial.replace(/<div id="root"><\/div>/i, `<div id="root"><main><article style="max-width:900px;margin:0 auto;padding:40px 20px"><a href="/journal">FitMe Pro Journal</a><h1>Editorial Standards</h1><p>FitMe Pro develops health and fitness content from authoritative public-health guidance and scientific evidence. We synthesize sources in original language rather than copying publications or competitor pages.</p><h2>Evidence framework</h2><ul><li>Prefer primary guidance from recognized public-health and scientific organizations.</li><li>Cross-check important recommendations across independent sources when practical.</li><li>Distinguish established guidance from estimates, models, and areas of uncertainty.</li><li>Keep content globally useful and avoid presenting one country's food culture as universal.</li><li>Review time-sensitive recommendations when guidance changes.</li><li>Encourage professional care when a question requires individualized assessment.</li></ul><h2>Organizations used as reference points</h2><p>Our reference framework includes the World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), National Institutes of Health (NIH), NHS, and Australia's National Health and Medical Research Council (NHMRC), alongside other appropriate primary sources.</p><p><a href="/journal/evidence-sources">View Evidence Sources</a></p><p>Calculator outputs are estimates for education and planning. They are not diagnoses, prescriptions, or substitutes for professional medical advice.</p></article></main></div>`).replace(/<\/head>/i, `<script type="application/ld+json">${json({"@context":"https://schema.org","@type":"WebPage",name:"FitMe Pro Editorial Standards",url:editorialCanonical})}</script></head>`);
writeRoute("/journal/editorial-standards", editorial);

const evidenceCanonical = `${siteUrl}/journal/evidence-sources`;
let evidence = setMeta(base, "Evidence Sources · FitMe Pro Journal", "The public-health organizations and evidence principles FitMe Pro uses when developing health and fitness content.", evidenceCanonical);
evidence = evidence.replace(/<div id="root"><\/div>/i, `<div id="root"><main><article style="max-width:900px;margin:0 auto;padding:40px 20px"><a href="/journal">FitMe Pro Journal</a><h1>Evidence Sources</h1><p>FitMe Pro uses authoritative organizations as reference points for health, nutrition, physical activity, weight management, and wellness content.</p><ul><li><a href="https://www.who.int/">World Health Organization (WHO)</a> — global public-health guidance.</li><li><a href="https://www.cdc.gov/">Centers for Disease Control and Prevention (CDC)</a> — practical public-health guidance and population health information.</li><li><a href="https://www.nih.gov/">National Institutes of Health (NIH)</a> — biomedical and health research, including nutrition, weight management, and physical activity resources.</li><li><a href="https://www.nhs.uk/">NHS</a> — practical health and healthy-eating guidance.</li><li><a href="https://www.nhmrc.gov.au/">NHMRC</a> — Australian evidence-based health and dietary guidance, including its guideline-development work.</li></ul><h2>How we use sources</h2><p>We synthesize evidence in original language, compare important recommendations where appropriate, identify uncertainty, and adapt explanations for a global audience. Source material is not reproduced as a substitute for the original publication.</p><p><a href="/journal/editorial-standards">Read our Editorial Standards</a></p></article></main></div>`).replace(/<\/head>/i, `<script type="application/ld+json">${json({"@context":"https://schema.org","@type":"WebPage",name:"FitMe Pro Evidence Sources",url:evidenceCanonical})}</script></head>`);
writeRoute("/journal/evidence-sources", evidence);

console.log(`Prerendered ${pages.length} specialized calculator pages plus editorial/evidence pages.`);
