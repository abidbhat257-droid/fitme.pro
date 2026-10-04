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
import { PHASE3_BATCH5_ARTICLES } from "./journal/phase3Batch5";
import { PHASE3_BATCH5_PART2 } from "./journal/phase3Batch5Part2";


const pilotBySlug = new Map(JOURNAL_PILOT_ARTICLES.map((article) => [article.slug, article]));
const phase3Articles = [...PHASE3_BATCH1_ARTICLES, ...PHASE3_BATCH2A_ARTICLES, ...PHASE3_BATCH2B_ARTICLES, ...PHASE3_BATCH2C_ARTICLES, ...PHASE3_BATCH3_ARTICLES, ...PHASE3_BATCH4_ARTICLES].map((article) => { const extra1=PHASE3_BATCH2_EXTRA_SECTIONS[article.slug]||[]; const extra2=PHASE3_BATCH2_EXTRA_SECTIONS2[article.slug]||[]; const extra3=PHASE3_BATCH2_EXTRA_SECTIONS3[article.slug]||[]; const extra4=PHASE3_BATCH3_EXTRA_SECTIONS[article.slug]||[]; return (extra1.length||extra2.length||extra3.length||extra4.length) ? { ...article, extraSections:[...extra1,...extra2,...extra3,...extra4] } : article; });
const phase3BySlug = new Map(phase3Articles.map((article) => [article.slug, article]));
const batch5SourcePool=[
["NIDDK weight management","https://www.niddk.nih.gov/health-information/weight-management"],
["NIDDK safe weight-loss program","https://www.niddk.nih.gov/health-information/weight-management/choosing-a-safe-and-successful-weight-loss-program"],
["NIDDK Body Weight Planner","https://www.niddk.nih.gov/bwp"],
["CDC physical activity basics","https://www.cdc.gov/physical-activity-basics/"],
["CDC physical activity guidelines","https://www.cdc.gov/physical-activity-basics/guidelines/index.html"],
["CDC healthy weight","https://www.cdc.gov/healthy-weight-growth/"],
["CDC losing weight","https://www.cdc.gov/healthy-weight-growth/losing-weight/index.html"],
["CDC heart disease risk factors","https://www.cdc.gov/heart-disease/risk-factors/index.html"],
["NHLBI metabolic syndrome","https://www.nhlbi.nih.gov/health/metabolic-syndrome"],
["NHLBI healthy weight","https://www.nhlbi.nih.gov/health/educational/lose_wt/index.htm"],
["WHO physical activity","https://www.who.int/publications/i/item/9789240015128"],
["WHO healthy diet","https://www.who.int/news-room/fact-sheets/detail/healthy-diet"],
["USDA Dietary Guidelines","https://www.dietaryguidelines.gov/"],
["USDA MyPlate","https://www.myplate.gov/"],
["HHS Physical Activity Guidelines","https://health.gov/sites/default/files/2019-09/Physical_Activity_Guidelines_2nd_edition.pdf"],
["ACSM resistance training","https://www.acsm.org/education-resources/trending-topics-resources/resistance-training"],
["ACSM physical activity guidance","https://www.acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines"],
["NIH ODS exercise performance","https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/"],
["ACOG exercise","https://www.acog.org/womens-health/faqs/exercise-during-pregnancy"],
["Office on Women's Health physical activity","https://womenshealth.gov/healthy-living/physical-activity"]
];
const batch5All=[...PHASE3_BATCH5_ARTICLES,...PHASE3_BATCH5_PART2];
for(let i=0;i<batch5All.length;i++) batch5All[i].sources=[batch5SourcePool[i%batch5SourcePool.length],batch5SourcePool[(i+10)%batch5SourcePool.length]];
const batch5BySlug = new Map(batch5All.map((article) => [article.slug, article]));
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
