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
import { PHASE3_BATCH2_EXTRA_SECTIONS } from "./journal/phase3Batch2ExtraSections";
import { PHASE3_BATCH2_EXTRA_SECTIONS2 } from "./journal/phase3Batch2ExtraSections2";
import { PHASE3_BATCH2_EXTRA_SECTIONS3 } from "./journal/phase3Batch2ExtraSections3";
import { PHASE3_BATCH3_ARTICLES } from "./journal/phase3Batch3";
import { PHASE3_BATCH3_EXTRA_SECTIONS } from "./journal/phase3Batch3ExtraSections";
import { PHASE3_BATCH4_ARTICLES } from "./journal/phase3Batch4";
import { PHASE3_BATCH5_ARTICLES } from "./phase3Batch5";
import { PHASE3_BATCH5_PART2 } from "./phase3Batch5Part2";

const pilotBySlug = new Map(JOURNAL_PILOT_ARTICLES.map((article) => [article.slug, article]));
const phase3Articles = [...PHASE3_BATCH1_ARTICLES, ...PHASE3_BATCH2A_ARTICLES, ...PHASE3_BATCH2B_ARTICLES, ...PHASE3_BATCH2C_ARTICLES, ...PHASE3_BATCH3_ARTICLES, ...PHASE3_BATCH4_ARTICLES].map((article) => { const extra1=PHASE3_BATCH2_EXTRA_SECTIONS[article.slug]||[]; const extra2=PHASE3_BATCH2_EXTRA_SECTIONS2[article.slug]||[]; const extra3=PHASE3_BATCH2_EXTRA_SECTIONS3[article.slug]||[]; const extra4=PHASE3_BATCH3_EXTRA_SECTIONS[article.slug]||[]; return (extra1.length||extra2.length||extra3.length||extra4.length) ? { ...article, extraSections:[...extra1,...extra2,...extra3,...extra4] } : article; });
const phase3BySlug = new Map(phase3Articles.map((article) => [article.slug, article]));
const batch5BySlug = new Map([...PHASE3_BATCH5_ARTICLES, ...PHASE3_BATCH5_PART2].map((article) => [article.slug, article]));
const replaceSpecialArticles = (articles) => articles.map((article) => batch5BySlug.get(article.slug) || phase3BySlug.get(article.slug) || pilotBySlug.get(article.slug) || article);

export const JOURNAL_SPECIAL_ARTICLES = [
  ...nutritionArticles,
  ...fitnessArticles,
  ...replaceSpecialArticles(weightManagementArticles),
  ...bodyCompositionArticles.map((article) => batch5BySlug.get(article.slug) || article),
  ...wellnessArticles,
  ...healthEducationArticles,
  ...phase3Articles.filter((article) => !weightManagementArticles.some((base) => base.slug === article.slug)),
  ...JOURNAL_PILOT_ARTICLES.filter((article) => !weightManagementArticles.some((base) => base.slug === article.slug) && !PHASE3_BATCH1_ARTICLES.some((batch) => batch.slug === article.slug)),
];

export function getSpecialJournalArticle(slug) {
  return JOURNAL_SPECIAL_ARTICLES.find((article) => article.slug === slug) || null;
}
