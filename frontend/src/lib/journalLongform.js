/*
 * Long-form Journal renderer support.
 * The source articles keep factual notes concise; this module expands them into
 * reader-friendly long-form guides while preserving the original claims.
 */

const countWords = (text = "") => text.trim().split(/\s+/).filter(Boolean).length;
const clean = (text = "") => text.replace(/\s+/g, " ").trim();

function limitSentences(text, maxWords = 220) {
  const sentences = clean(text).split(/(?<=[.!?])\s+/);
  let out = "";
  for (const sentence of sentences) {
    const candidate = out ? `${out} ${sentence}` : sentence;
    if (countWords(candidate) > maxWords) break;
    out = candidate;
  }
  return out || sentences[0] || "";
}

function sectionExpansion(article, heading, text, index) {
  const category = article.category || "health";
  const original = clean(text);
  const lower = `${heading} ${original}`.toLowerCase();

  const why = `Why this matters: ${heading} is one part of a larger ${category.toLowerCase()} picture. It is easy to focus on one number, one food, one workout, or one short-term result, but health decisions are usually more useful when they are interpreted in context. Use this section as a framework for understanding the topic rather than as a rule that every person must follow in exactly the same way.`;
  const practical = `How to apply it: start with the principle described here and turn it into a small, repeatable decision. Consider your normal routine, activity, schedule, preferences and what you can realistically maintain for months rather than days. If a change makes your routine unnecessarily complicated, look for a simpler version. A sustainable approach does not require every day to look identical; it requires the overall pattern to move in a helpful direction.`;

  let context = `A useful way to think about this is to separate an estimate or recommendation from a measurement. Many health calculators use population-level equations, while real people have individual variation. Likewise, a single meal, workout, weigh-in or symptom rarely tells the whole story. Trends and repeated observations provide more context. FitMe Pro therefore presents calculators as educational tools rather than diagnoses.`;
  if (lower.includes("calorie") || lower.includes("energy") || lower.includes("weight")) context = `Energy balance is important, but a calculation cannot promise exactly what will happen to body weight. Energy expenditure changes with body size, activity and other factors, while food intake is difficult to estimate precisely. Water, glycogen, food volume and other short-term changes can affect scale weight. A longer trend and the behaviors behind it are usually more informative than reacting to one day's number.`;
  else if (lower.includes("protein") || lower.includes("muscle")) context = `Protein is one component of a healthy eating and training pattern. Food source, total energy intake, training stimulus, recovery and individual circumstances all matter. More is not automatically better, and people with medical conditions affecting nutrition may need individualized guidance. A calculator can provide a starting estimate, but the appropriate target should be interpreted alongside goals, health status and the overall diet.`;
  else if (lower.includes("exercise") || lower.includes("training") || lower.includes("activity") || lower.includes("cardio") || lower.includes("walking")) context = `Physical activity is highly individual. The same speed, distance or workout can feel different because fitness, health, age, terrain and medication can change the response. Building activity gradually is often more practical than trying to reach an ambitious target immediately. Regular movement can provide important health benefits even when body weight does not change as expected.`;
  else if (lower.includes("sugar") || lower.includes("salt") || lower.includes("fat") || lower.includes("fibre") || lower.includes("fiber") || lower.includes("carbohydrate") || lower.includes("diet")) context = `Nutrition works as a pattern. A food should not be judged solely by one nutrient, and a healthy diet does not have to look identical across countries or households. Food availability, culture, affordability, preferences and individual needs influence what is practical. The consistent principles are variety, adequacy, balance and moderation, with nutritious foods emphasized and commonly excessive nutrients moderated.`;
  else if (category === "Body Composition") context = `Body composition describes how the body is divided into fat mass and fat-free components, but no method measures every component perfectly. DEXA, BIA, skinfolds, air displacement and other approaches use different assumptions and have different sources of error. Hydration, food intake, exercise, glycogen and measurement conditions can change readings, especially with BIA. For progress tracking, use the same method under similar conditions and focus on trends rather than treating a single percentage as an exact biological truth. Body-composition estimates should complement—not replace—clinical assessment of metabolic health, strength, function and symptoms.`;

  const mistakes = `Common mistake to avoid: turning a useful guideline into an all-or-nothing test. Missing a target once, choosing a less nutritious meal, skipping a workout or seeing an unexpected change on the scale does not erase previous progress. Identify what happened, make the next reasonable choice and continue. Consistency over time is generally more useful than short periods of extreme effort followed by frustration or abandonment.`;
  const safety = `When individual advice matters: general educational information cannot account for every medical condition, medication, pregnancy, eating disorder, injury, disability or other circumstance. If you have a significant health condition, persistent symptoms, unexplained weight change, a history of disordered eating, or uncertainty about a demanding exercise or nutrition program, a qualified healthcare professional can provide advice based on your actual situation.`;
  const bridge = index === 0 ? `The key idea is to understand the principle before trying to optimize it. Once the basic concept is clear, choose a practical version that fits everyday life.` : `This point builds on the previous section. Consider how it interacts with the other parts of the article and with your overall routine rather than treating it as an isolated rule.`;
  return [original, why, practical, context, mistakes, bridge, safety];
}

function articleIntro(article) {
  const title = String(article?.title || "this topic").replace(/[?.!]$/, "");
  const description = String(article?.description || "").trim();
  return description
    ? title + " is explained here in practical terms, with attention to what the evidence supports and where individual circumstances can change the answer. " + description
    : "This guide explains " + title + " using the available evidence, practical context and the limitations that matter when applying general health information to an individual.";
}

function faq(article) {
  const rawSections = Array.isArray(article.sections) ? article.sections : [];
  const firstSection = rawSections[0];
  const lastSection = rawSections[rawSections.length - 1];
  const first = Array.isArray(firstSection) ? firstSection[0] : (firstSection?.label || "this topic");
  const last = Array.isArray(lastSection) ? lastSection[0] : (lastSection?.label || "the information in this guide");
  const title = String(article?.title || "this topic").replace(/[?.!]$/, "");
  return [
    ["What is the main point of " + title + "?", "The main point is explained in the “" + first + "” section. Use that information as general education and consider your own goals, health status and circumstances before applying it."],
    ["What should I be careful about with " + title + "?", "Pay attention to the limitations described in the guide, especially measurement uncertainty, individual variation and situations where general information may not apply."],
    ["When should I speak with a healthcare professional?", "Seek individualized advice when medical conditions, medications, pregnancy, injury, significant symptoms, unexplained changes or eating-related concerns may affect the decision. Professional guidance is particularly useful when " + String(last).toLowerCase() + " cannot safely be interpreted from general information alone."]
  ];
}

export function getLongFormJournalArticle(article) {
  if (!article) return article;
  const normalizedSections = (Array.isArray(article.sections) ? article.sections : []).map((section) => {
    if (Array.isArray(section)) return [section[0] || "Section", section[1] || ""];
    if (section && typeof section === "object") return [section.label || "Section", section.text ?? section.url ?? ""];
    return ["Section", String(section ?? "")];
  });
  const sections = [["Introduction", articleIntro(article)], ...normalizedSections];
  const normalizedFaqs = Array.isArray(article.faqs) && article.faqs.length ? article.faqs : faq(article);
  const withFaqSection = sections.some(([heading]) => /^frequently asked questions$/i.test(String(heading)))
    ? sections
    : [...sections, ["Frequently Asked Questions", normalizedFaqs.map(([q,a]) => q + " " + a).join(" ")]];
  const total = withFaqSection.reduce((sum, [, text]) => sum + countWords(text), 0);
  const bodyCompositionSources = [
    {label:"NIH / NIDDK — Weight Management",url:"https://www.niddk.nih.gov/health-information/weight-management"},
    {label:"CDC — Healthy Weight",url:"https://www.cdc.gov/healthy-weight-growth/"},
    {label:"American College of Sports Medicine",url:"https://www.acsm.org/"},
    {label:"International Society for Clinical Densitometry",url:"https://iscd.org/"}
  ];
  return {
    ...article,
    sections: withFaqSection,
    faqs: normalizedFaqs,
    sources: article.sources?.length ? article.sources : (article.category === "Body Composition" ? bodyCompositionSources : []),
    readTime: article.readTime || (Math.max(4, Math.round(total / 220)) + " min read")
  };
}


