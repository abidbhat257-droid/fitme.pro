import { NutritionArticles } from "./journal/nutritionArticles";
import { WeightLossArticles } from "./journal/weightLossArticles";
import { GutHealthArticles } from "./journal/gutHealthArticles";
import { ClinicalNutritionArticles } from "./journal/clinicalNutritionArticles";
import { MicronutrientArticles } from "./journal/micronutrientArticles";
import { SportsNutritionArticles } from "./journal/sportsNutritionArticles";
import { WellnessArticles } from "./journal/wellnessArticles";
import { FitnessArticles } from "./journal/fitnessArticles";

export const JOURNAL_SPECIAL_ARTICLES = [
  ...NutritionArticles,
  ...WeightLossArticles,
  ...GutHealthArticles,
  ...ClinicalNutritionArticles,
  ...MicronutrientArticles,
  ...SportsNutritionArticles,
  ...WellnessArticles,
  ...FitnessArticles,
];

export function getSpecialJournalArticle(slug) {
  return JOURNAL_SPECIAL_ARTICLES.find((article) => article.slug === slug) || null;
}
