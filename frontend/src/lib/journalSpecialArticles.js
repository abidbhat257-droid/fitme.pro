import { nutritionArticles } from "./journal/nutritionArticles";
import { fitnessArticles } from "./journal/fitnessArticles";
import { weightManagementArticles } from "./journal/weightManagementArticles";
import { bodyCompositionArticles } from "./journal/bodyCompositionArticles";
import { wellnessArticles } from "./journal/wellnessArticles";
import { healthEducationArticles } from "./journal/healthEducationArticles";
import { JOURNAL_PILOT_ARTICLES } from "./journal/journalPilotArticles";
import { PHASE3_BATCH1_ARTICLES } from "./journal/phase3Batch1";
import { PHASE3_BATCH2A_ARTICLES } from "./journal/phase3Batch2A";
import { PHASE3_BATCH2B_ARTICLES } from "./journal/phase3Batch2B";
import { PHASE3_BATCH2C_ARTICLES } from "./journal/phase3Batch2C";

const pilotBySlug = new Map(JOURNAL_PILOT_ARTICLES.map((article) => [article.slug, article]));
const phase3Articles = [...PHASE3_BATCH1_ARTICLES, ...PHASE3_BATCH2A_ARTICLES, ...PHASE3_BATCH2B_ARTICLES, ...PHASE3_BATCH2C_ARTICLES];
const phase3BySlug = new Map(phase3Articles.map((article) => [article.slug, article]));
const replaceSpecialArticles = (articles) => articles.map((article) => phase3BySlug.get(article.slug) || pilotBySlug.get(article.slug) || article);

export const JOURNAL_SPECIAL_ARTICLES = [
  ...nutritionArticles,
  ...fitnessArticles,
  ...replaceSpecialArticles(weightManagementArticles),
  ...bodyCompositionArticles,
  ...wellnessArticles,
  ...healthEducationArticles,
  ...phase3Articles.filter((article) => !weightManagementArticles.some((base) => base.slug === article.slug)),
  ...JOURNAL_PILOT_ARTICLES.filter((article) => !weightManagementArticles.some((base) => base.slug === article.slug) && !PHASE3_BATCH1_ARTICLES.some((batch) => batch.slug === article.slug)),
];

export function getSpecialJournalArticle(slug) {
  return JOURNAL_SPECIAL_ARTICLES.find((article) => article.slug === slug) || null;
}
