import { nutritionArticles } from "./journal/nutritionArticles";
import { fitnessArticles } from "./journal/fitnessArticles";
import { weightManagementArticles } from "./journal/weightManagementArticles";
import { bodyCompositionArticles } from "./journal/bodyCompositionArticles";
import { wellnessArticles } from "./journal/wellnessArticles";
import { healthEducationArticles } from "./journal/healthEducationArticles";
import { JOURNAL_PILOT_ARTICLES } from "./journal/journalPilotArticles";

const BASE_JOURNAL_SPECIAL_ARTICLES = [
  ...nutritionArticles,
  ...fitnessArticles,
  ...weightManagementArticles,
  ...bodyCompositionArticles,
  ...wellnessArticles,
  ...healthEducationArticles,
];

const JOURNAL_PILOT_BY_SLUG = new Map(JOURNAL_PILOT_ARTICLES.map((article) => [article.slug, article]));

export const JOURNAL_SPECIAL_ARTICLES = [
  ...BASE_JOURNAL_SPECIAL_ARTICLES.filter((article) => !JOURNAL_PILOT_BY_SLUG.has(article.slug)),
  ...JOURNAL_PILOT_ARTICLES,
];

export function getSpecialJournalArticle(slug) {
  return JOURNAL_SPECIAL_ARTICLES.find((article) => article.slug === slug) || null;
}
