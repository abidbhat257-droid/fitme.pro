// FitMe Pro evidence framework. URLs point to primary or official public-health sources.
export const EVIDENCE_SOURCES = [
  {
    id: "who",
    name: "World Health Organization (WHO)",
    role: "Global public-health guidance",
    topics: "Healthy diet, physical activity, obesity, self-care and population health",
    url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
    note: "Use WHO as a primary global reference for broad nutrition and physical-activity recommendations, while preserving cultural and individual context."
  },
  {
    id: "cdc",
    name: "Centers for Disease Control and Prevention (CDC)",
    role: "U.S. public-health guidance",
    topics: "Healthy weight, physical activity, nutrition, sleep, weight management and prevention",
    url: "https://www.cdc.gov/healthy-weight-growth/",
    note: "Use CDC for practical population-health guidance, healthy-weight education and physical-activity recommendations."
  },
  {
    id: "nih",
    name: "National Institutes of Health (NIH)",
    role: "Biomedical research and evidence translation",
    topics: "Nutrition, supplements, exercise, body weight, chronic disease and health education",
    url: "https://www.nih.gov/health-information",
    note: "Use NIH institutes and Office of Dietary Supplements resources for research-informed explanations and supplement/nutrient topics."
  },
  {
    id: "nhs",
    name: "NHS",
    role: "National health-service guidance",
    topics: "Healthy eating, weight management, physical activity and practical health advice",
    url: "https://www.nhs.uk/better-health/lose-weight/",
    note: "Use NHS for accessible practical guidance, especially around healthy eating, calorie awareness, activity and when professional advice may be appropriate."
  },
  {
    id: "nhmrc",
    name: "National Health and Medical Research Council (NHMRC)",
    role: "Australian evidence-based health guidance",
    topics: "Dietary patterns, food groups, chronic-disease prevention and nutrition policy",
    url: "https://www.nhmrc.gov.au/adg",
    note: "Use NHMRC to cross-check dietary-pattern guidance and food-group principles. The Australian Dietary Guidelines are currently under review, so FitMe Pro should verify the latest NHMRC position before publishing time-sensitive claims."
  }
];

export const EVIDENCE_PRINCIPLES = [
  "Prefer primary official guidance over commercial blogs or unsourced summaries.",
  "Cross-check important nutrition and health claims across more than one authoritative source when practical.",
  "Do not present a calculator estimate as a diagnosis, prescription or guarantee.",
  "Keep content globally adaptable rather than treating one country's food culture as universal.",
  "Record publication or review dates for claims that can change over time.",
  "For medical conditions, pregnancy, eating disorders, injuries, medications and other special circumstances, direct readers toward qualified health professionals."
];
