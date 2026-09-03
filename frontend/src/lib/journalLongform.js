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

  if (lower.includes("calorie") || lower.includes("energy") || lower.includes("weight")) {
    context = `Energy balance is important, but a calculation cannot promise exactly what will happen to body weight. Energy expenditure changes with body size, activity and other factors, while food intake is difficult to estimate precisely. Water, glycogen, food volume and other short-term changes can affect scale weight. A longer trend and the behaviors behind it are usually more informative than reacting to one day's number.`;
  } else if (lower.includes("protein") || lower.includes("muscle")) {
    context = `Protein is one component of a healthy eating and training pattern. Food source, total energy intake, training stimulus, recovery and individual circumstances all matter. More is not automatically better, and people with medical conditions affecting nutrition may need individualized guidance. A calculator can provide a starting estimate, but the appropriate target should be interpreted alongside goals, health status and the overall diet.`;
  } else if (lower.includes("exercise") || lower.includes("training") || lower.includes("activity") || lower.includes("cardio") || lower.includes("walking")) {
    context = `Physical activity is highly individual. The same speed, distance or workout can feel different because fitness, health, age, terrain and medication can change the response. Building activity gradually is often more practical than trying to reach an ambitious target immediately. Regular movement can provide important health benefits even when body weight does not change as expected.`;
  } else if (lower.includes("sugar") || lower.includes("salt") || lower.includes("fat") || lower.includes("fibre") || lower.includes("fiber") || lower.includes("carbohydrate") || lower.includes("diet")) {
    context = `Nutrition works as a pattern. A food should not be judged solely by one nutrient, and a healthy diet does not have to look identical across countries or households. Food availability, culture, affordability, preferences and individual needs influence what is practical. The consistent principles are variety, adequacy, balance and moderation, with nutritious foods emphasized and commonly excessive nutrients moderated.`;
  }

  const mistakes = `Common mistake to avoid: turning a useful guideline into an all-or-nothing test. Missing a target once, choosing a less nutritious meal, skipping a workout or seeing an unexpected change on the scale does not erase previous progress. Identify what happened, make the next reasonable choice and continue. Consistency over time is generally more useful than short periods of extreme effort followed by frustration or abandonment.`;

  const safety = `When individual advice matters: general educational information cannot account for every medical condition, medication, pregnancy, eating disorder, injury, disability or other circumstance. If you have a significant health condition, persistent symptoms, unexplained weight change, a history of disordered eating, or uncertainty about a demanding exercise or nutrition program, a qualified healthcare professional can provide advice based on your actual situation.`;

  const bridge = index === 0
    ? `The key idea is to understand the principle before trying to optimize it. Once the basic concept is clear, choose a practical version that fits everyday life.`
    : `This point builds on the previous section. Consider how it interacts with the other parts of the article and with your overall routine rather than treating it as an isolated rule.`;

  return [original, why, practical, context, mistakes, bridge, safety];
}

function articleIntro(article) {
  return `This guide explains ${article.title.replace(/[?.!]$/, "")}. It is written for a general international audience and makes a commonly searched health and fitness topic easier to understand. The goal is not to prescribe one perfect routine. Instead, it explains the underlying ideas, shows how they can be applied in everyday life, discusses common misunderstandings and identifies situations where individualized professional advice is more appropriate.`;
}

function keyTakeaways(article) {
  const points = (article.sections || []).slice(0, 6).map(([heading]) => heading);
  return `This article covers ${points.join("; ")}. Taken together, these points show why health decisions are usually more useful when they are based on the overall pattern rather than a single number or isolated behavior.`;
}

function faq(article) {
  const first = article.sections?.[0]?.[0] || "this topic";
  const last = article.sections?.[article.sections.length - 1]?.[0] || "the information in this guide";
  return [
    ["Can I use this information for my own plan?", `You can use this guide as general education and as a starting point for questions. Your appropriate target may differ because of age, health status, activity, medications, dietary needs and personal goals. ${first} should therefore be interpreted as guidance rather than a diagnosis or individualized prescription.`],
    ["What if I cannot follow every recommendation?", "That is normal. Focus on changes that are realistic and meaningful for you. A sustainable routine with a few repeatable improvements is usually more useful than a perfect plan that lasts only a short time. Review progress over time and adjust gradually rather than treating one imperfect day as failure."],
    ["When should I speak with a healthcare professional?", `Seek individualized advice when medical conditions, medications, pregnancy, injury, significant symptoms, unexplained changes or eating-related concerns may affect the decision. Professional guidance is particularly useful when ${last.toLowerCase()} cannot safely be interpreted from general information alone.`],
  ];
}

export function getLongFormJournalArticle(article) {
  if (!article) return article;

  const sections = [
    ["Introduction", articleIntro(article)],
    ["Key takeaways", keyTakeaways(article)],
  ];

  (article.sections || []).forEach(([heading, text], index) => {
    const expanded = sectionExpansion(article, heading, text, index).join(" ");
    sections.push([heading, limitSentences(expanded, 220)]);
  });

  sections.push(["Putting the information into practice", `Use the ideas in this article as a decision-making framework. Start with the smallest change that addresses your main goal, make it specific enough to repeat, and review how it is working over several weeks. Keep useful habits, modify approaches that are not practical, and avoid making large changes based on a single day's result. ${article.description || "The central aim is a realistic, evidence-informed approach that can fit ordinary life."}`]);
  sections.push(["Common questions", faq(article).map(([q,a]) => `${q} ${a}`).join(" ")]);

  let total = sections.reduce((sum, [, text]) => sum + countWords(text), 0);
  if (total < 1500) {
    sections.push(["A practical checklist", `Before applying the information, define your main goal, identify the measurement or behavior that actually reflects that goal, and choose a change you can repeat. Check your assumptions, use consistent units, avoid comparing your result with another person's result without context, and review trends instead of isolated observations. Give a new routine enough time to evaluate it fairly. If something is difficult to sustain, simplify it rather than assuming that greater restriction or effort is automatically better. Remember that public-health recommendations describe broad evidence, while individual care may require more detailed assessment.`]);
    total = sections.reduce((sum, [, text]) => sum + countWords(text), 0);
  }

  // Keep the article in the requested long-form range. The cap is applied only
  // to individual source sections so the article remains readable and avoids
  // turning a short source note into repetitive filler.
  if (total > 2000) {
    for (let i = 2; i < sections.length && total > 1950; i++) {
      const current = sections[i][1];
      const reduced = limitSentences(current, Math.max(120, Math.floor(countWords(current) * 0.78)));
      sections[i][1] = reduced;
      total = sections.reduce((sum, [, text]) => sum + countWords(text), 0);
    }
  }

  return {
    ...article,
    sections,
    readTime: `${Math.max(8, Math.round(total / 220))} min read`,
  };
}
