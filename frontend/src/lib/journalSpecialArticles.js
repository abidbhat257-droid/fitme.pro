import { nutritionArticles } from "./journal/nutritionArticles";
import { fitnessArticles } from "./journal/fitnessArticles";
import { weightManagementArticles } from "./journal/weightManagementArticles";
import { bodyCompositionArticles } from "./journal/bodyCompositionArticles";
import { wellnessArticles } from "./journal/wellnessArticles";
import { healthEducationArticles } from "./journal/healthEducationArticles";
import { JOURNAL_PILOT_ARTICLES } from "./journal/journalPilotArticles";
import { PHASE3_BATCH1_ARTICLES } from "./journal/phase3Batch1";

const pilotBySlug = new Map(JOURNAL_PILOT_ARTICLES.map((article) => [article.slug, article]));
const phase3BySlug = new Map(PHASE3_BATCH1_ARTICLES.map((article) => [article.slug, article]));
const replaceSpecialArticles = (articles) => articles.map((article) => phase3BySlug.get(article.slug) || pilotBySlug.get(article.slug) || article);

export const JOURNAL_SPECIAL_ARTICLES = [
  ...nutritionArticles,
  ...fitnessArticles,
  ...replaceSpecialArticles(weightManagementArticles),
  ...bodyCompositionArticles,
  ...wellnessArticles,
  ...healthEducationArticles,
  ...PHASE3_BATCH1_ARTICLES.filter((article) => !weightManagementArticles.some((base) => base.slug === article.slug)),
  ...JOURNAL_PILOT_ARTICLES.filter((article) => !weightManagementArticles.some((base) => base.slug === article.slug) && !PHASE3_BATCH1_ARTICLES.some((batch) => batch.slug === article.slug)),
];

export function getSpecialJournalArticle(slug) {
  return JOURNAL_SPECIAL_ARTICLES.find((article) => article.slug === slug) || null;
}
