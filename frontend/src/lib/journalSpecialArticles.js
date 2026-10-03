import { nutritionArticles } from "./journal/nutritionArticles";
import { fitnessArticles } from "./journal/fitnessArticles";
import { weightManagementArticles } from "./journal/weightManagementArticles";
import { bodyCompositionArticles } from "./journal/bodyCompositionArticles";
import { wellnessArticles } from "./journal/wellnessArticles";
import { healthEducationArticles } from "./journal/healthEducationArticles";
import { JOURNAL_PILOT_ARTICLES } from "./journal/journalPilotArticles";

const pilotBySlug = new Map(JOURNAL_PILOT_ARTICLES.map((article) => [article.slug, article]));
const replacePilots = (articles) => articles.map((article) => pilotBySlug.get(article.slug) || article);

export const JOURNAL_SPECIAL_ARTICLES = [
  ...nutritionArticles,
  ...fitnessArticles,
  ...replacePilots(weightManagementArticles),
  ...bodyCompositionArticles,
  ...wellnessArticles,
  ...healthEducationArticles,
  ...JOURNAL_PILOT_ARTICLES.filter((article) => !weightManagementArticles.some((base) => base.slug === article.slug)),
];

export function getSpecialJournalArticle(slug) {
  return JOURNAL_SPECIAL_ARTICLES.find((article) => article.slug === slug) || null;
}
