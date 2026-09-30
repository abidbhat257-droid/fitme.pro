/*
 * Long-form Journal renderer support.
 *
 * The article source files contain the topic-specific editorial material.
 * This module deliberately does NOT inject generic filler into every article.
 * It only normalizes the source, creates a direct-answer lead, builds a
 * topic-specific planning table from the article's own content, and keeps
 * the existing sections intact.
 */

const countWords = (text = "") => text.trim().split(/\s+/).filter(Boolean).length;
const clean = (text = "") => text.replace(/\s+/g, " ").trim();

function normalizeSections(article) {
  return (Array.isArray(article?.sections) ? article.sections : []).map((section) => {
    if (Array.isArray(section)) {
      return [section[0] || "Section", clean(section[1] || "")];
    }
    if (section && typeof section === "object") {
      return [section.label || "Section", clean(section.text ?? section.url ?? "")];
    }
    return ["Section", clean(String(section ?? ""))];
  }).filter(([, text]) => text);
}

function buildLead(article, sections) {
  const firstSummary = Array.isArray(article?.quickSummary) ? clean(article.quickSummary[0]) : "";
  if (firstSummary) return firstSummary;

  const introduction = sections.find(([heading]) => /^introduction$/i.test(heading));
  if (introduction?.[1]) return introduction[1];

  return clean(article?.description || "");
}

function buildArticleTable(article, sections) {
  const summary = Array.isArray(article?.quickSummary)
    ? article.quickSummary.map(clean).filter(Boolean)
    : [];

  const practical = sections.find(([heading]) =>
    /practical|application|planning|routine|implementation|progression/i.test(heading)
  );
  const caution = sections.find(([heading]) =>
    /mistake|safety|limitation|recovery|risk|help/i.test(heading)
  );
  const progress = sections.find(([heading]) =>
    /progress|sustainable|consistency|tracking|measure|goal/i.test(heading)
  );

  return [
    ["Focus", summary[0] || clean(article?.description || "") || "Understand the main principle and its practical use."],
    ["Starting point", summary[1] || practical?.[1] || "Choose a realistic starting point that matches your current ability and goal."],
    ["Progress marker", summary[2] || progress?.[1] || "Track a meaningful behavior, performance measure, or trend over time."],
    ["What to watch", summary[3] || caution?.[1] || "Adjust the approach when recovery, symptoms, or practicality become limiting."]
  ];
}

function normalizeSources(article) {
  return Array.isArray(article?.sources)
    ? article.sources.filter(Boolean).map((source) => ({
        label: source?.label || source?.title || "Source",
        url: source?.url || source?.href || "#"
      }))
    : [];
}

export function getLongFormJournalArticle(article) {
  if (!article) return article;

  const sections = normalizeSections(article);
  const lead = buildLead(article, sections);
  const table = buildArticleTable(article, sections);

  // Keep the article's actual topic-specific sections. The previous renderer
  // expanded every section with identical generic paragraphs; that is removed
  // intentionally to prevent repetitive/thin Journal content.
  const contentSections = sections.filter(([heading]) => !/^introduction$/i.test(heading));

  const wordCount =
    countWords(lead) +
    (Array.isArray(article.quickSummary) ? article.quickSummary.reduce((n, item) => n + countWords(item), 0) : 0) +
    contentSections.reduce((n, [, text]) => n + countWords(text), 0);

  return {
    ...article,
    lead,
    table,
    sections: contentSections,
    sources: normalizeSources(article),
    readTime: article.readTime || `${Math.max(4, Math.round(wordCount / 190))} min read`
  };
}
