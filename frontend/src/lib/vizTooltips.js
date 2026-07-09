/**
 * Educational tooltips per calculator.
 * Explains the source, applicable population, and what "ideal" means.
 */
export const VIZ_TOOLTIPS = {
  bmi: {
    what: "WHO BMI categories are based on population studies from the 1990s. The 18.5–25 'normal' band is a screening tool, not a diagnostic one.",
    caveat: "Overestimates fat in muscular individuals; underestimates in older adults with sarcopenia.",
    source: "WHO Technical Report Series 894 (2000)",
  },
  "bmi-prime": {
    what: "BMI Prime = BMI / 25. Values > 1.0 indicate BMI above the WHO normal upper limit.",
    caveat: "Same limitations as BMI — treat as a ratio, not a target.",
    source: "Derived from WHO BMI thresholds",
  },
  "healthy-weight-range": {
    what: "Range = 18.5·h² to 24.9·h². Everything inside the lime band maps to a normal BMI.",
    caveat: "Frame size, muscle mass, and age can shift the ideal within this range.",
    source: "WHO normal BMI classification",
  },
  "ideal-body-weight": {
    what: "The Devine (1974) formula is a clinical dosing reference — not an aesthetic target.",
    caveat: "It systematically underestimates for shorter individuals and doesn't account for body composition.",
    source: "Devine BJ. Drug Intell Clin Pharm. 1974;8:650-655",
  },
  "weight-loss-goal": {
    what: "A 500 kcal/day deficit ≈ 0.45 kg (1 lb) loss per week — the widely accepted moderate rate.",
    caveat: "Deficits > 25% of TDEE risk muscle loss and metabolic adaptation.",
    source: "Hall KD et al. Lancet 2011",
  },
  "weight-gain-goal": {
    what: "A 300 kcal/day surplus supports ~0.27 kg/week muscle gain with minimal fat.",
    caveat: "Effective muscle gain requires progressive resistance training and adequate protein.",
    source: "Slater GJ et al. Sports Med 2019",
  },
  "body-fat": {
    what: "Deurenberg (1991) predicts DXA-measured body fat from BMI, age, and sex.",
    caveat: "Accuracy is ±4% at the individual level; less reliable for athletes.",
    source: "Deurenberg P et al. Br J Nutr. 1991;65:105-114",
  },
  "navy-body-fat": {
    what: "The US Navy uses waist, neck (± hip for women) circumferences with height to estimate body fat.",
    caveat: "Accuracy ±3% vs DXA; measure at correct anatomical landmarks bare skin.",
    source: "Hodgdon JA & Beckett MB. NHRC Report 84-11",
  },
  "relative-fat-mass": {
    what: "RFM (Woolcott 2018) uses only height and waist. Outperforms BMI for adiposity in most groups.",
    caveat: "Less validated in athletes and extreme body types.",
    source: "Woolcott OO & Bergman RN. Sci Rep 2018;8:10980",
  },
  "body-adiposity-index": {
    what: "BAI = hip/(height^1.5) − 18. Uses no weight measurement.",
    caveat: "Underestimates fat in some ethnic groups; a supplemental tool, not primary.",
    source: "Bergman RN et al. Obesity 2011;19:1083-1089",
  },
  "lean-body-mass": {
    what: "Boer's formula (1984) estimates lean mass from weight, height, and sex.",
    caveat: "Assumes typical body-water composition; deviates in edema or high muscle mass.",
    source: "Boer P. Am J Physiol 1984;247:F632-6",
  },
  "fat-mass": {
    what: "Fat mass = weight × (body-fat % / 100). Total kg/lb of adipose tissue.",
    caveat: "Only as accurate as the underlying BF% estimate.",
    source: "Derived from BF% estimation methods",
  },
  "fat-free-mass": {
    what: "FFM = weight − fat mass. Includes muscle, bone, organs, water.",
    caveat: "Water fluctuations (glycogen, hydration) affect this within a day.",
    source: "Standard body composition partitioning",
  },
  ffmi: {
    what: "FFMI normalizes fat-free mass to height. Values > 25 (M) or 22 (F) suggest exceptional muscularity.",
    caveat: "Natural upper limits vary by genetics; DEXA-based FFMI is the gold standard.",
    source: "Kouri EM et al. Clin J Sport Med 1995;5:223-8",
  },
  "waist-hip-ratio": {
    what: "WHR flags android (central) vs gynoid (peripheral) fat distribution.",
    caveat: "Thresholds: > 0.90 (M) / 0.85 (F) increase cardiometabolic risk.",
    source: "WHO Expert Consultation, Geneva 2008",
  },
  "waist-height-ratio": {
    what: "The rule of thumb: keep your waist under half your height (WHtR < 0.5).",
    caveat: "One of the most reliable single markers across ages and ethnicities.",
    source: "Ashwell M & Hsieh SD. Int J Food Sci Nutr 2005;56:303-7",
  },
  absi: {
    what: "ABSI isolates abdominal shape independent of BMI — a better mortality predictor than BMI alone.",
    caveat: "Interpretation depends on age and sex; values > 0.083 indicate elevated risk.",
    source: "Krakauer NY & Krakauer JC. PLoS ONE 2012;7:e39504",
  },
  bri: {
    what: "BRI models the human body as an ellipse using waist and height.",
    caveat: "Higher = rounder = more visceral fat. Correlates well with imaging studies.",
    source: "Thomas DM et al. Obesity 2013;21:2264-71",
  },
  "conicity-index": {
    what: "Compares your waist to a theoretical cylinder of the same weight and height. Higher = more conical (central fat).",
    caveat: "Values above 1.25 indicate elevated central adiposity.",
    source: "Valdez R. J Clin Epidemiol 1991;44:955-6",
  },
  "body-frame-size": {
    what: "Frame size (small/medium/large) adjusts ideal-weight targets based on height / wrist circumference.",
    caveat: "Wrist is a proxy for skeletal size; use with wrist bare and relaxed.",
    source: "Grant JP. Handbook of Total Parenteral Nutrition. 1980",
  },
  bmr: {
    what: "Mifflin-St Jeor (1990) is the most accurate BMR equation for healthy adults (± 10% for 82% of subjects).",
    caveat: "Doesn't account for lean mass — overestimates for very fat, underestimates for very muscular.",
    source: "Mifflin MD et al. Am J Clin Nutr 1990;51:241-7",
  },
  tdee: {
    what: "TDEE = BMR × activity factor (1.2–1.9). Represents daily energy needs.",
    caveat: "Most people overestimate activity by one level; be honest.",
    source: "Harris & Benedict, refined by Katch-McArdle",
  },
  "daily-calorie-needs": {
    what: "The calories to maintain your current weight — same as TDEE.",
    caveat: "Track for 2–3 weeks and adjust based on scale trend.",
    source: "Institute of Medicine DRI report",
  },
  "calorie-deficit": {
    what: "Moderate (−500 kcal) ≈ 0.45 kg loss/week. Mild (−250) ≈ 0.23 kg/week.",
    caveat: "The 3500 kcal/lb rule is a simplification — metabolic adaptation flattens the curve over time.",
    source: "Hall KD. Int J Obes 2008;32:573-6",
  },
  "calorie-surplus": {
    what: "Lean bulking (+300) prioritizes muscle:fat ratio. Aggressive (+500) accelerates gain but adds fat.",
    caveat: "Genetics and training age cap realistic muscle gain rates.",
    source: "Slater GJ et al. Sports Med 2019;49:1615-30",
  },
  "body-surface-area": {
    what: "Du Bois BSA is the clinical standard for chemotherapy dosing, cardiac index, and burn coverage.",
    caveat: "Slight over/underestimation at extremes of size; Mosteller is a common alternative.",
    source: "Du Bois D & Du Bois EF. Arch Intern Med 1916;17:863-71",
  },
  "ponderal-index": {
    what: "PI = weight / height³. More accurate than BMI at very tall or very short heights.",
    caveat: "Less familiar to clinicians; use alongside BMI, not instead of.",
    source: "Rohrer F, 1921",
  },
  "adjusted-body-weight": {
    what: "AdjBW = IBW + 0.4·(Actual − IBW). Used for drug dosing when actual weight > 120% of IBW.",
    caveat: "Only relevant clinically; not a fitness metric.",
    source: "American Society of Health-System Pharmacists guidelines",
  },
  "body-density": {
    what: "Siri equation: BD = 495 / (BF% + 450). Denser bodies carry more lean tissue.",
    caveat: "Assumes typical fat and lean densities; hydration affects reading.",
    source: "Siri WE. Nutrition 1993;9:480-91 (originally 1961)",
  },
  "obesity-class": {
    what: "Combines WHO BMI classes with waist circumference to reflect cardiometabolic risk.",
    caveat: "Central obesity (waist > 102 cm men, > 88 cm women) increases risk even at normal BMI.",
    source: "WHO/NIH obesity classification",
  },
};

export function getTooltip(slug) {
  return VIZ_TOOLTIPS[slug];
}
