export const JOURNAL_CATEGORIES = [
  { slug: "nutrition", name: "Nutrition", description: "Healthy eating, calories, protein, fibre, food choices and meal planning." },
  { slug: "fitness", name: "Fitness", description: "Movement, strength, cardio, recovery and performance." },
  { slug: "weight-loss", name: "Weight Loss", description: "Energy balance, sustainable weight management and healthy habits." },
  { slug: "body-composition", name: "Body Composition", description: "BMI, body fat, waist measures and body metrics explained." },
  { slug: "wellness", name: "Wellness", description: "Sleep, hydration, stress, recovery and healthy routines." },
  { slug: "health-education", name: "Health Education", description: "Plain-language explanations of health topics and prevention." },
];

const WHO_DIET = "https://www.who.int/news-room/fact-sheets/detail/healthy-diet";
const WHO_OBESITY = "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight";
const WHO_FAO = "https://www.who.int/publications/i/item/9789240101876";

export const JOURNAL_ARTICLES = [
  {
    slug: "what-is-a-healthy-diet", category: "Nutrition", categorySlug: "nutrition",
    title: "What Is a Healthy Diet? A Practical Guide to Balanced Eating",
    description: "Learn the core principles of healthy eating, including variety, balance, moderation, fibre, fruits and vegetables, fats, sugars and sodium.",
    readTime: "8 min read", date: "September 3, 2026", featured: true,
    keywords: "healthy diet, balanced diet, healthy eating, nutrition guide, healthy foods",
    sources: [{ label: "WHO — Healthy diet", url: WHO_DIET }, { label: "WHO & FAO — What are healthy diets?", url: WHO_FAO }],
    sections: [
      ["What does a healthy diet mean?", "A healthy diet is not one fixed menu. It can differ according to age, activity level, culture, food availability and personal needs. WHO describes four useful foundations: adequacy, balance, moderation and diversity. In practice, this means choosing a wide variety of nutritious foods, meeting nutrient and energy needs without routinely exceeding them, and limiting foods or nutrients that can be harmful when consumed in excess. Food safety is also part of a healthy diet."],
      ["Build meals around nutritious foods", "A useful starting point is to make minimally processed or unprocessed foods the foundation of most meals. This can include vegetables, fruits, pulses such as lentils and chickpeas, whole grains, nuts and seeds, and nutritious protein sources. Processing is not automatically unhealthy; the overall dietary pattern matters."],
      ["Carbohydrates can be part of a healthy diet", "Carbohydrates are an important source of energy. WHO guidance emphasizes sources such as whole grains, vegetables, fruits and pulses. Choosing higher-fibre and less-refined carbohydrate sources is generally more useful than treating all carbohydrates as good or bad."],
      ["Fruits, vegetables and fibre", "WHO recommends that everyone older than 10 years aim for at least 400 grams of fruits and vegetables each day and at least 25 grams of naturally occurring dietary fibre daily. Spread plant foods across meals rather than trying to get everything from one food."],
      ["Sugar, salt and unhealthy fats", "A healthy pattern does not require perfection. It does require moderation. Foods and drinks high in free sugars, sodium and unhealthy fats should generally be limited, particularly when they frequently replace nutrient-dense foods."],
      ["How FitMe Pro can help", "Nutrition is closely connected with energy needs and body composition. FitMe Pro's calorie, BMR, TDEE, macro and body-composition calculators can provide estimates to use alongside sensible nutrition habits. Calculator results are estimates, not diagnoses or individualized medical advice."],
    ],
  },
  {
    slug: "how-many-calories-should-i-eat", category: "Nutrition", categorySlug: "nutrition",
    title: "How Many Calories Should I Eat Per Day?",
    description: "Understand energy needs, BMR, TDEE and calorie balance without turning nutrition into a one-number rule.",
    readTime: "8 min read", date: "September 3, 2026",
    keywords: "calories per day, daily calorie needs, calorie intake, TDEE, BMR",
    sources: [{ label: "WHO — Healthy diet", url: WHO_DIET }, { label: "WHO — Obesity and overweight", url: WHO_OBESITY }],
    sections: [
      ["There is no single calorie target for everyone", "Daily energy needs vary with factors such as age, sex, body size and physical activity. Two people of the same height can need different amounts of energy. A calorie number from social media should therefore not be treated as a universal prescription."],
      ["BMR and TDEE explained", "Basal metabolic rate (BMR) estimates energy used to support basic physiological functions at rest. Total daily energy expenditure (TDEE) is broader and includes resting needs plus activity and other components of daily energy use. FitMe Pro calculators provide estimates, not direct measurements."],
      ["Calories and body weight", "Body weight is influenced by energy intake and expenditure, but real-world weight management is more complex than a simple daily equation. Appetite, food environment, sleep, activity, medications, health conditions and other factors can affect outcomes. WHO describes overweight and obesity as complex conditions with biological, behavioural, environmental and social influences."],
      ["If your goal is weight loss", "A calorie deficit means consuming less energy than you expend over time. The appropriate size depends on the person and goal. Very aggressive restriction can make it difficult to meet nutrient needs and may be hard to sustain. A practical plan combines nutritious food choices, regular activity, adequate sleep and realistic monitoring."],
      ["Focus on food quality too", "Calories are not the whole story. WHO recommends a varied diet built around nutritious foods and advises limiting foods high in free sugars, unhealthy fats and sodium. Use calorie calculations as one tool inside a bigger health strategy—not as a replacement for nutrition quality."],
    ],
  },
];

export function getJournalArticle(slug) { return JOURNAL_ARTICLES.find((article) => article.slug === slug); }
export function getJournalCategory(slug) { return JOURNAL_CATEGORIES.find((category) => category.slug === slug); }
