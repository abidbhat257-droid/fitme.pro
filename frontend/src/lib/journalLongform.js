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

export function getLongFormJournalArticle(article) {
  if (!article) return article;

  const normalizedSections = (Array.isArray(article.sections) ? article.sections : []).map((section) => {
    if (Array.isArray(section)) {
      return [section[0] || "Section", section[1] || ""];
    }
    if (section && typeof section === "object") {
      return [section.label || "Section", section.text ?? section.url ?? ""];
    }
    return ["Section", String(section ?? "")];
  });

  if (article.pilot) {
    const pilotWordCount = normalizedSections.reduce((sum, [, text]) => sum + countWords(text), 0)
      + countWords(article.description || "")
      + (Array.isArray(article.quickSummary) ? article.quickSummary.reduce((sum, text) => sum + countWords(text), 0) : 0)
      + (Array.isArray(article.faqs) ? article.faqs.reduce((sum, pair) => sum + countWords(pair?.[0] || "") + countWords(pair?.[1] || ""), 0) : 0);
    return {
      ...article,
      sections: [...normalizedSections, ...(article.extraSections || []), ...(article.extraSections2 || []), ...(article.extraSections3 || []), ...(article.extraSections4 || []), ...(article.extraSections5 || [])],
      readTime: `${Math.max(8, Math.round(pilotWordCount / 180))} min read`,
    };
  }

  // The non-pilot journal sets already contain their article-specific sections.
  // Do not append the old generic expansion paragraphs, generic FAQ answers, or
  // repeated safety/checklist prose. The shared note is rendered once at the
  // bottom of each page by prerenderJournalExpansion.js.
  const cleanedSections = normalizedSections
    .filter(([heading]) => !/^(FAQ|Common questions|Safety and When to Get Help|Important Health Note)$/i.test(String(heading).trim()))
    .map(([heading, text]) => {
      let cleaned = clean(text);
      cleaned = cleaned.replace(/FitMe Pro uses authoritative public-health guidance as a reference and does not reproduce source publications\.?/gi, "");
      cleaned = cleaned.replace(/Before applying the information, define your main goal[^.]*\.?/gi, "");
      cleaned = cleaned.replace(/This information does not replace individualized clinical assessment\.?/gi, "");
      cleaned = clean(cleaned);
      return [heading, cleaned];
    })
    .filter(([, text]) => countWords(text) >= 12);

  const total = cleanedSections.reduce((sum, [, text]) => sum + countWords(text), 0)
    + countWords(article.description || "")
    + (Array.isArray(article.quickSummary) ? article.quickSummary.reduce((sum, text) => sum + countWords(text), 0) : 0);

  return {
    ...article,
    sections: cleanedSections,
    readTime: `${Math.max(3, Math.round(total / 180))} min read`,
  };
}

