// Evidence map for calculator-page trust and methodology links.
// Sources are official/public primary references; individual equations should be
// checked against the original publication when a calculator uses a named equation.
const WHO="https://www.who.int/news-room/fact-sheets/detail/healthy-diet";
const WHO_PHYSICAL="https://www.who.int/news-room/fact-sheets/detail/physical-activity";
const WHO_OBESITY="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight";
const CDC_BMI="https://www.cdc.gov/bmi/";
const CDC_WEIGHT="https://www.cdc.gov/healthy-weight-growth/";
const NIH="https://www.nih.gov/health-information";
const NHS="https://www.nhs.uk/better-health/lose-weight/";
const ACSM="https://www.acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines";

export const CALCULATOR_EVIDENCE={
  bmi:{label:"CDC — BMI and BMI categories",url:CDC_BMI},
  "bmi-prime":{label:"CDC — BMI screening context",url:CDC_BMI},
  "healthy-weight-range":{label:"CDC — Healthy weight and BMI",url:CDC_WEIGHT},
  "ideal-body-weight":{label:"NIH — Health information",url:NIH},
  "body-fat":{label:"NIH — Health information",url:NIH},
  "relative-fat-mass":{label:"NIH — Health information",url:NIH},
  "body-adiposity-index":{label:"NIH — Health information",url:NIH},
  "lean-body-mass":{label:"NIH — Health information",url:NIH},
  "fat-mass":{label:"NIH — Health information",url:NIH},
  "fat-free-mass":{label:"NIH — Health information",url:NIH},
  "ffmi":{label:"NIH — Health information",url:NIH},
  "waist-hip-ratio":{label:"WHO — Obesity and overweight",url:WHO_OBESITY},
  "waist-height-ratio":{label:"WHO — Obesity and overweight",url:WHO_OBESITY},
  absi:{label:"NIH — Health information",url:NIH},
  bri:{label:"NIH — Health information",url:NIH},
  "conicity-index":{label:"NIH — Health information",url:NIH},
  "body-surface-area":{label:"NIH — Health information",url:NIH},
  "ponderal-index":{label:"NIH — Health information",url:NIH},
  "adjusted-body-weight":{label:"NIH — Health information",url:NIH},
  "body-density":{label:"NIH — Health information",url:NIH},
  "obesity-class":{label:"WHO — Obesity and overweight",url:WHO_OBESITY},
  "tdee-calculator":{label:"NIH — Health information",url:NIH},
  tdee:{label:"NIH — Health information",url:NIH},
  "bmr-calculator":{label:"NIH — Health information",url:NIH},
  "calorie-deficit-calculator":{label:"NHS — Weight management",url:NHS},
  "calorie-surplus-calculator":{label:"NHS — Weight management",url:NHS},
  "daily-calorie-needs-calculator":{label:"NHS — Weight management",url:NHS},
  "maintenance-calories-calculator":{label:"NHS — Weight management",url:NHS},
  "weight-loss-calorie-calculator":{label:"NHS — Weight management",url:NHS},
  "weight-gain-calorie-calculator":{label:"NHS — Weight management",url:NHS},
  "water-intake-calculator":{label:"WHO — Healthy diet",url:WHO},
  "protein-calculator":{label:"NIH — Health information",url:NIH},
  "carbohydrate-calculator":{label:"WHO — Healthy diet",url:WHO},
  "fat-intake-calculator":{label:"WHO — Healthy diet",url:WHO},
  "fiber-intake-calculator":{label:"WHO — Healthy diet",url:WHO},
  "net-carbohydrate-calculator":{label:"WHO — Healthy diet",url:WHO},
  "sodium-intake-calculator":{label:"WHO — Healthy diet",url:WHO},
  "caffeine-intake-calculator":{label:"NIH — Health information",url:NIH},
  "maximum-heart-rate-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "target-heart-rate-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "heart-rate-zone-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "vo2-max-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "cardio-fitness-level-calculator":{label:"WHO — Physical activity",url:WHO_PHYSICAL},
  "aerobic-training-zone-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "one-rep-max-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "bench-press-1rm-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "squat-1rm-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "deadlift-1rm-calculator":{label:"ACSM — Physical activity resources",url:ACSM},
  "training-volume-calculator":{label:"ACSM — Physical activity resources",url:ACSM}
};

export const DEFAULT_CALCULATOR_EVIDENCE=[
  {label:"WHO — Healthy diet",url:WHO},
  {label:"NIH — Health information",url:NIH},
  {label:"CDC — Healthy weight",url:CDC_WEIGHT}
];

export function getCalculatorEvidence(id){return CALCULATOR_EVIDENCE[id]?[CALCULATOR_EVIDENCE[id]]:DEFAULT_CALCULATOR_EVIDENCE;}
