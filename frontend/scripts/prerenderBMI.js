const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const buildFile = path.join(root, "build", "bmi-calculator", "index.html");
const siteUrl = (process.env.SITE_URL || "https://fitme-pro.vercel.app").replace(/\/$/, "");

if (!fs.existsSync(buildFile)) throw new Error(`BMI prerender target not found: ${buildFile}`);

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#39;");

const faqs = [
  ["What is BMI?", "BMI (Body Mass Index) is a weight-to-height index calculated from body weight and height. For adults, it is commonly used as a screening measure for weight categories, not as a diagnosis."],
  ["How do I calculate BMI?", "For metric units, BMI = weight in kilograms divided by height in meters squared. For pounds and inches, BMI = 703 × weight in pounds divided by height in inches squared."],
  ["What is a healthy BMI?", "For adults, a BMI from 18.5 to less than 25 is commonly classified as healthy weight. BMI should still be interpreted alongside other health information."],
  ["Is BMI the same as body fat percentage?", "No. BMI uses only height and weight. Body-fat percentage attempts to estimate the proportion of body weight that is fat."],
  ["Is BMI accurate for muscular people?", "BMI can be less representative for highly muscular people because the calculation cannot distinguish muscle from fat."],
  ["Does BMI work for children?", "Children and adolescents should not generally be interpreted using adult BMI categories. BMI-for-age uses age- and sex-specific growth references."],
  ["Can BMI tell me my ideal weight?", "BMI can be used to calculate a broad reference weight range for a given height, but it cannot identify one universally ideal weight for every individual."],
  ["Why can two people with the same BMI have different health profiles?", "BMI does not show body-fat distribution, muscle mass, fitness, medical history, or other factors that influence health."],
  ["How often should I calculate BMI?", "Recalculate when your weight or height information changes or when you are reviewing a longer-term trend. Repeated daily calculations are usually unnecessary."],
  ["Does FitMe Pro's BMI calculator diagnose obesity?", "No. FitMe Pro provides an educational BMI estimate. A BMI category is a screening result and should not be treated as a medical diagnosis."]
];

const faqHtml = faqs.map(([q, a]) => `<div class="bmi-faq"><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`).join("");

const body = `
<main>
  <article id="seo-content" style="max-width:900px;margin:0 auto;padding:40px 20px;font-family:Arial,sans-serif;line-height:1.75">
    <nav aria-label="Breadcrumb" style="margin-bottom:24px"><a href="/">Home</a> / <a href="/calculators">Fitness &amp; Health</a> / <span>BMI Calculator</span></nav>
    <h1>BMI Calculator</h1>
    <p>Calculate your Body Mass Index from height and weight, then use the result to understand standard adult BMI categories. BMI is a simple screening measure that puts body weight into context with height. It is useful, but it does not directly measure body fat or provide a complete picture of health.</p>

    <section>
      <h2>Quick Answer</h2>
      <p><strong>BMI = weight (kg) ÷ height² (m²).</strong> For adults, commonly used categories are underweight below 18.5, healthy weight from 18.5 to 24.9, overweight from 25.0 to 29.9, and obesity at 30 or above. These categories are screening ranges, not a diagnosis.</p>
    </section>

    <section>
      <h2>What Does Your BMI Result Mean?</h2>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse" border="1" cellpadding="10">
        <thead><tr><th align="left">BMI</th><th align="left">Adult category</th></tr></thead>
        <tbody>
          <tr><td>Below 18.5</td><td>Underweight</td></tr>
          <tr><td>18.5–24.9</td><td>Healthy weight</td></tr>
          <tr><td>25.0–29.9</td><td>Overweight</td></tr>
          <tr><td>30.0–34.9</td><td>Obesity, Class 1</td></tr>
          <tr><td>35.0–39.9</td><td>Obesity, Class 2</td></tr>
          <tr><td>40.0+</td><td>Obesity, Class 3</td></tr>
        </tbody>
      </table></div>
      <p>These are commonly used adult screening categories. BMI does not diagnose obesity or another medical condition, and interpretation can depend on body composition and individual circumstances.</p>
    </section>

    <section>
      <h2>BMI Formula</h2>
      <p><strong>Metric:</strong> BMI = weight in kilograms ÷ height in meters².</p>
      <p><strong>Imperial:</strong> BMI = 703 × weight in pounds ÷ height in inches².</p>
      <p>The calculator converts units when necessary and applies the same mathematical definition whether you enter metric or imperial measurements.</p>
    </section>

    <section>
      <h2>How BMI Is Calculated</h2>
      <ol>
        <li><strong>Measure height.</strong> Measure without shoes and use a consistent unit.</li>
        <li><strong>Measure weight.</strong> Use a reliable scale and record the value in the selected unit.</li>
        <li><strong>Convert units if needed.</strong> The standard metric equation uses kilograms and meters.</li>
        <li><strong>Square height.</strong> Multiply height in meters by itself.</li>
        <li><strong>Divide weight by squared height.</strong> The result is BMI in kg/m².</li>
      </ol>
    </section>

    <section>
      <h2>Worked BMI Example</h2>
      <p>Suppose an adult weighs <strong>70 kg</strong> and is <strong>1.75 m</strong> tall.</p>
      <p><strong>BMI = 70 ÷ (1.75 × 1.75) = 22.9 kg/m²</strong></p>
      <p>A BMI of about 22.9 falls within the commonly used healthy-weight category for adults.</p>
    </section>

    <section>
      <h2>Related Calculators</h2>
      <ul>
        <li><a href="/body-fat-calculator">Body Fat Calculator</a></li>
        <li><a href="/lean-body-mass-calculator">Lean Body Mass Calculator</a></li>
        <li><a href="/waist-to-height-ratio-calculator">Waist-to-Height Ratio Calculator</a></li>
        <li><a href="/healthy-weight-range-calculator">Healthy Weight Range Calculator</a></li>
        <li><a href="/ideal-body-weight-calculator">Ideal Body Weight Calculator</a></li>
        <li><a href="/ffmi-calculator">FFMI Calculator</a></li>
        <li><a href="/bri-calculator">Body Roundness Index Calculator</a></li>
      </ul>
    </section>

    <section>
      <h2>BMI vs. Body Fat Percentage</h2>
      <p>BMI and body-fat percentage are different measurements. BMI describes weight relative to height, while body-fat percentage estimates how much of body weight is fat. A person with substantial muscle mass can have a relatively high BMI without having a high body-fat percentage.</p>
    </section>

    <section>
      <h2>Factors That Affect BMI Interpretation</h2>
      <ul>
        <li><strong>Muscle mass:</strong> BMI cannot separate muscle from fat.</li>
        <li><strong>Fat distribution:</strong> BMI does not show where body fat is stored.</li>
        <li><strong>Age:</strong> adult categories are not the same as BMI-for-age assessment in children and adolescents.</li>
        <li><strong>Pregnancy:</strong> standard adult BMI interpretation is not designed to assess pregnancy weight gain.</li>
        <li><strong>Population differences:</strong> relationships between BMI, body fat and health risk can vary between populations.</li>
      </ul>
    </section>

    <section>
      <h2>Accuracy and Limitations</h2>
      <p>BMI is mathematically precise when height and weight are measured accurately, but biological interpretation is not equally precise. BMI does not directly measure body fat, muscle, bone density, waist distribution, fitness, or metabolic health. Use it as one screening indicator alongside other relevant measurements and health information.</p>
    </section>

    <section>
      <h2>BMI FAQs</h2>
      ${faqHtml}
    </section>

    <section>
      <h2>Scientific and Official References</h2>
      <ul>
        <li><a href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" target="_blank" rel="noreferrer">CDC — Adult BMI Categories</a></li>
        <li><a href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noreferrer">World Health Organization — Obesity and Overweight</a></li>
        <li><a href="https://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm" target="_blank" rel="noreferrer">NHLBI — Assessing Your Weight and Health Risk</a></li>
      </ul>
    </section>

    <section>
      <h2>Medical Disclaimer</h2>
      <p>FitMe Pro calculators provide estimates for educational and informational purposes. They are not intended to diagnose, treat, cure, or prevent disease and do not replace professional medical assessment. BMI is a screening measure rather than a diagnosis. If you have a health concern or are using a result to make a medical decision, consult a qualified healthcare professional.</p>
    </section>
  </article>
</main>`;

const canonical = `${siteUrl}/bmi-calculator`;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {"@type":"WebApplication","name":"BMI Calculator","url":canonical,"applicationCategory":"HealthApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}},
    {"@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":`${siteUrl}/`},
      {"@type":"ListItem","position":2,"name":"Fitness & Health","item":`${siteUrl}/calculators`},
      {"@type":"ListItem","position":3,"name":"BMI Calculator","item":canonical}
    ]},
    {"@type":"FAQPage","mainEntity":faqs.map(([q,a]) => ({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))}
  ]
};

let html = fs.readFileSync(buildFile, "utf8");
html = html.replace(/<title>[\s\S]*?<\/title>/i, "<title>BMI Calculator · FitMe Pro</title>");
html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>(\s*)/i, '<meta name="description" content="Calculate your BMI from height and weight and see the standard adult BMI categories. Free BMI calculator with formula, example, limitations and FAQs." />$1');
html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${body}</div>`);
html = html.replace(/<head>/i, `<head><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="website" /><meta property="og:title" content="BMI Calculator · FitMe Pro" /><meta property="og:description" content="Calculate your BMI from height and weight and understand standard adult BMI categories." /><meta property="og:url" content="${canonical}" />`);
html = html.replace(/<\/head>/i, `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script></head>`);
fs.writeFileSync(buildFile, html, "utf8");
console.log("Prerendered the full BMI SEO page with content, breadcrumbs and FAQ schema.");
