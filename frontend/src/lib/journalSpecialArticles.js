import { nutritionArticles } from "./journal/nutritionArticles";
import { fitnessArticles } from "./journal/fitnessArticles";
import { weightManagementArticles } from "./journal/weightManagementArticles";
import { bodyCompositionArticles } from "./journal/bodyCompositionArticles";
import { wellnessArticles } from "./journal/wellnessArticles";
import { healthEducationArticles } from "./journal/healthEducationArticles";

export const JOURNAL_SPECIAL_ARTICLES = [
  ...nutritionArticles,
  ...fitnessArticles,
  ...weightManagementArticles,
  ...bodyCompositionArticles,
  ...wellnessArticles,
  ...healthEducationArticles,
];

export function getSpecialJournalArticle(slug) {
  return JOURNAL_SPECIAL_ARTICLES.find((article) => article.slug === slug) || null;
}
