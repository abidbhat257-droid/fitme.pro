const USDA_FDC = "https://fdc.nal.usda.gov/";
const NIH_VIT_C = "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/";
const NIH_FOLATE = "https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/";
const NIH_VIT_E = "https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/";
const NIH_VIT_K = "https://ods.od.nih.gov/factsheets/vitaminK-healthprofessional/";
const NIH_POTASSIUM = "https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/";
const WHO_DIET = "https://www.who.int/news-room/fact-sheets/detail/healthy-diet";

export const JOURNAL_SPECIAL_ARTICLES = [
  {
    slug: "apple-calories-nutrition",
    category: "Nutrition",
    categorySlug: "nutrition",
    title: "Apple Calories & Nutrition: Calories, Carbs, Fibre and Benefits",
    description: "A practical guide to apple calories, carbohydrates, fibre, natural sugars and essential micronutrients, with serving sizes and tips for weight management.",
    readTime: "12 min read",
    date: "September 18, 2026",
    keywords: "apple calories, apple nutrition, apple calories per 100g, apple carbs, apple fibre, apple sugar, apple benefits, apple nutrition facts",
    quickSummary: [
      "A raw apple with skin provides about 52 calories per 100 g in commonly used USDA food-composition data.",
      "A medium apple is often around 90–100 calories, but actual calories depend on its edible weight and variety.",
      "Apples are mainly a carbohydrate food, with natural sugars balanced by dietary fibre and a high water content.",
      "Keeping the skin can increase fibre and provides additional plant compounds, provided the fruit is washed appropriately.",
      "Apples provide vitamin C, potassium and smaller amounts of several other micronutrients; they are not a major source of protein or fat.",
      "Whole apples can fit weight-loss and maintenance diets because they provide relatively few calories per unit of food volume, but portion and total daily intake still matter.",
      "Apple juice and dried apples are nutritionally different from a whole apple because processing can change fibre, water content and calorie density."
    ],
    sources: [
      { label: "USDA FoodData Central", url: USDA_FDC },
      { label: "NIH Office of Dietary Supplements — Vitamin C", url: NIH_VIT_C },
      { label: "NIH Office of Dietary Supplements — Potassium", url: NIH_POTASSIUM },
      { label: "WHO — Healthy diet", url: WHO_DIET }
    ],
    sections: [
      ["How Many Calories Are in an Apple?", "Raw apple with skin provides about 52 calories per 100 g in commonly used USDA food-composition data. A practical medium apple often contains roughly 90–100 calories, but the exact amount depends on its edible weight, variety and size. For accurate calorie tracking, weighing the edible portion is more reliable than assuming every apple is the same size."],
      ["Apple Calories by Serving Size", "At approximately 52 calories per 100 g, a 50 g portion provides about 26 calories, 100 g provides about 52 calories, and 150 g provides about 78 calories. A medium apple can be around 180–200 g edible weight, putting it near 95–105 calories. These are estimates rather than fixed values because apples vary naturally."],
      ["Apple Nutrition Facts per 100 g", "A 100 g raw apple with skin provides roughly 52 calories, about 14 g carbohydrate, around 2.4 g fibre, about 10 g natural sugars and only a small amount of protein and fat. Apples also contain a high proportion of water. The exact nutrient profile varies by cultivar and food database."],
      ["Are Apples High in Carbohydrates?", "Apples are primarily a carbohydrate-containing fruit. Most of the carbohydrate comes from naturally occurring sugars and fibre rather than added sugar. The fibre slows the overall digestion of the meal and contributes to normal digestive function. For most people, the carbohydrate in a whole apple can easily fit into a balanced diet."],
      ["How Much Sugar Is in an Apple?", "The sugar in a whole apple is naturally occurring, not added. A 100 g apple contains roughly 10 g of total sugars in common food-composition data, so a medium apple may contain considerably more depending on its size. Whole fruit also provides water and fibre, making it different from foods or drinks where sugar is consumed with little fibre."],
      ["Essential Micronutrients in Apples", "Apples provide several micronutrients, although they are not exceptionally concentrated sources of most vitamins and minerals. Vitamin C supports collagen formation, antioxidant functions and normal immune function; potassium is an essential mineral involved in normal cell and nerve function. Apples also provide smaller amounts of vitamin K, vitamin E, folate and several B vitamins. Nutrient amounts vary with variety and whether the skin is included."],
      ["Apple Fibre: With Skin vs Without Skin", "Much of an apple's fibre is associated with the whole fruit and its skin. Eating the fruit with the skin generally provides more fibre than eating peeled apple. Fibre contributes to normal bowel function and can help make a snack more filling. If you peel apples, you still retain nutritional value, but the fibre profile changes."],
      ["Are Apples Good for Weight Loss?", "Whole apples can fit a calorie-controlled diet because they provide relatively low calories per 100 g along with water and fibre. They are not a special fat-burning food, however. Weight change depends on overall energy balance over time. An apple can be a useful replacement for a more calorie-dense snack, but adding apples on top of an already sufficient calorie intake does not automatically create a calorie deficit."],
      ["Apples for Exercise and Fitness", "Apples provide carbohydrate that can contribute to energy intake around physical activity. For longer or harder sessions, athletes may combine fruit with other carbohydrate or protein sources depending on timing and goals. An apple alone is not a complete recovery meal because it contains little protein, so pairing it with yogurt, milk, eggs, soy foods or another protein source can create a more balanced snack."],
      ["Apple vs Apple Juice", "Whole apples and apple juice should not be treated as nutritionally interchangeable. Juicing removes or greatly reduces much of the fruit's fibre and concentrates the liquid portion, making it easier to consume a larger amount quickly. A whole apple requires chewing and retains the fruit's structure. If the goal is a filling snack, whole fruit is generally the more substantial option."],
      ["Fresh Apple vs Dried Apple", "Removing water makes dried apples much more calorie-dense by weight. A small handful can therefore contain the energy of a much larger amount of fresh fruit. Dried fruit can still be nutritious and convenient, but portion size matters more. Check whether the product contains added sugar and use the package nutrition label when available."],
      ["Are Apple Seeds Safe to Eat?", "Apple seeds naturally contain compounds that can release cyanide when crushed and metabolized. Accidentally swallowing an occasional seed is generally not the same as consuming a large quantity intentionally. Apple seeds should not be treated as a food or supplement, and large deliberate consumption is inappropriate."],
      ["Red Apples vs Green Apples", "Red and green apples differ in cultivar, taste, acidity, texture and some nutrient concentrations, but both can be part of a healthy diet. There is no need to choose one colour exclusively for general nutrition. When calorie tracking, the edible weight and the food's actual composition matter more than the colour of the skin."],
      ["India-Specific Nutrition Context", "Apples are widely available in India, including varieties grown in Himachal Pradesh, Jammu and Kashmir and other regions as well as imported varieties. In an Indian diet, whole apples can be used as a snack, alongside breakfast or with curd, milk, nuts or other foods. For calorie tracking, the same principle applies regardless of variety: use edible weight when you need a precise estimate."],
      ["Common Mistakes When Counting Apple Calories", "Common mistakes include assuming every apple has exactly 95 calories, confusing whole-fruit weight with edible weight, overlooking toppings such as peanut butter or honey, and treating apple juice as equivalent to whole fruit. Another mistake is focusing only on sugar grams without considering fibre, water, portion size and the rest of the meal."],
      ["How to Track Apple Calories More Precisely", "For the most consistent estimate, weigh the edible apple portion in grams and use a reputable food-composition database. If you eat the skin, select a database entry for apple with skin; if you peel it, use an appropriate peeled entry. For packaged apple products, use the nutrition label. Mixed foods such as apple smoothies should be logged by ingredient when precision matters."],
      ["Key Takeaways", "A whole apple is a relatively low-calorie, water-rich fruit that provides carbohydrate, fibre and useful micronutrients. Around 52 calories per 100 g is a practical reference for raw apple with skin, while a medium apple is often around 90–100 calories. Apples can fit weight-management and active-lifestyle diets, but whole fruit, juice and dried fruit should be considered separately because their fibre, water and calorie density differ."]
    ]
  },

  {
    slug: "avocado-nutrition",
    category: "Nutrition",
    categorySlug: "nutrition",
    title: "The Ultimate Avocado Nutrition Guide: Calories, Fats, and Benefits",
    description: "A practical guide to avocado calories, healthy fats, fibre, protein and essential micronutrients, including serving sizes and ways to fit avocado into a balanced diet.",
    readTime: "12 min read",
    date: "September 18, 2026",
    keywords: "avocado nutrition, avocado calories, avocado fat, avocado benefits, avocado calories per 100g, avocado nutrition facts, healthy fats",
    quickSummary: [
      "Avocado is relatively calorie-dense for a fruit because much of its energy comes from fat rather than carbohydrate.",
      "A 100 g portion of raw avocado provides roughly 160 calories, although values vary by variety and food-composition database.",
      "Avocado is rich in mostly monounsaturated fat and also provides dietary fibre, with a small amount of protein and very little sodium.",
      "Useful micronutrients include potassium, folate, vitamin K, vitamin E, vitamin C, magnesium and vitamin B6.",
      "Serving size matters: half an avocado can contain substantially more calories than a small measured portion, so weighing the edible flesh is useful when calorie tracking.",
      "Avocado can fit weight-loss, maintenance and performance-oriented diets, but its calorie contribution should be considered alongside the rest of the meal.",
      "The evidence-based value of avocado is best understood as part of an overall dietary pattern rather than as a single 'superfood' that guarantees a health outcome."
    ],
    sources: [
      { label: "USDA FoodData Central", url: USDA_FDC },
      { label: "NIH Office of Dietary Supplements — Folate", url: NIH_FOLATE },
      { label: "NIH Office of Dietary Supplements — Vitamin E", url: NIH_VIT_E },
      { label: "NIH Office of Dietary Supplements — Vitamin K", url: NIH_VIT_K },
      { label: "NIH Office of Dietary Supplements — Potassium", url: NIH_POTASSIUM },
      { label: "WHO — Healthy diet", url: WHO_DIET }
    ],
    sections: [
      ["How Many Calories Are in an Avocado?", "Raw avocado provides about 160 calories per 100 g in commonly used USDA food-composition data. The exact value varies with variety, maturity and database entry. Because an avocado is relatively high in fat, it contains more calories per gram than many fruits. The most useful number for tracking is the weight of the edible flesh you actually eat."],
      ["Avocado Calories by Serving Size", "A 50 g portion of avocado is roughly 80 calories, 100 g is about 160 calories, and 150 g is about 240 calories using the approximate 160 kcal per 100 g reference. A whole avocado can therefore contribute several hundred calories depending on its edible size. Half an avocado is not a standardized serving, so weighing the flesh is more precise when calories matter."],
      ["Avocado Nutrition Facts per 100 g", "Per 100 g, avocado provides roughly 160 calories, about 15 g of fat, around 9 g of carbohydrate, about 7 g of dietary fibre and about 2 g of protein. Most of its carbohydrate is not sugar, and its fat content is dominated by unsaturated fatty acids. Exact values vary across avocado varieties and food databases."],
      ["What Type of Fat Is in Avocado?", "Avocado is notable among fruits because it contains a substantial amount of fat, with monounsaturated fat making up a large share. Oleic acid is the major monounsaturated fatty acid in avocado. Unsaturated fats can be part of a balanced eating pattern when they replace some sources of saturated fat. This does not mean avocado fat is calorie-free: fat provides about 9 calories per gram, so portion size still matters."],
      ["Essential Micronutrients in Avocado", "Avocado supplies several micronutrients that contribute to normal body function. Useful nutrients include potassium, folate, vitamin K, vitamin E, vitamin C, magnesium and vitamin B6. Folate is needed for DNA and cell division; vitamin K participates in normal blood clotting and bone-related processes; vitamin E functions as an antioxidant; and potassium is essential for normal cell function. USDA FoodData Central is the best starting point for the food's numerical nutrient profile, while NIH fact sheets explain the roles of individual nutrients."],
      ["Avocado and Dietary Fibre", "Avocado contributes dietary fibre, including soluble and insoluble fibre. Fibre can contribute to normal bowel function and can make meals more filling. A 100 g portion provides roughly 7 g of fibre in common food-composition references. Actual values vary, so the figure should be treated as an estimate rather than a laboratory measurement of every fruit."],
      ["Is Avocado High in Protein?", "Avocado is not a high-protein food. A 100 g portion provides only around 2 g of protein. It can contribute a small amount of protein to a meal, but foods such as eggs, dairy, soy, legumes, fish, poultry or meat generally provide much more protein per calorie. If your goal is a higher-protein meal, combine avocado with a dedicated protein source rather than relying on avocado alone."],
      ["Is Avocado Good for Weight Loss?", "Avocado can be included in a weight-loss diet, but it is not inherently a weight-loss food. Its fibre and fat can make meals satisfying, while its calorie density means portions can add up quickly. A measured 30–50 g serving can be easier to fit into a calorie target than an unmeasured large portion. What matters for weight change is the overall energy intake and dietary pattern, not whether avocado is labelled as a 'fat-burning' food."],
      ["Avocado for Muscle Building and Exercise", "Avocado can complement an active diet by providing energy, unsaturated fat, fibre and micronutrients. However, it is not a major protein source and does not replace protein-rich foods needed to support muscle repair and growth. For active people, avocado can work well in meals alongside eggs, Greek yogurt or curd, beans, lentils, tofu, chicken, fish or other protein foods."],
      ["Avocado Toast Calories: The Toppings Matter", "Avocado toast is an example of why the whole meal matters more than one ingredient. A slice of bread plus 50 g of avocado may be a moderate-calorie snack or breakfast, but cheese, eggs, butter, olive oil, seeds and sauces can substantially change the total. For accurate tracking, calculate the bread and each topping separately instead of using one universal 'avocado toast' value."],
      ["Guacamole Calories and Portion Size", "Guacamole is primarily avocado, but recipes can include tomato, onion, lime, coriander, salt, oil or other ingredients. A simple avocado-based guacamole may have a similar calorie density to avocado itself, while recipes containing additional oil can be more calorie-dense. Restaurant portions also vary considerably, so ingredient-based estimates are preferable when precision is important."],
      ["Does Avocado Have a Lot of Sugar?", "Avocado is relatively low in naturally occurring sugar compared with many sweet fruits. Most of its carbohydrate comes from fibre and other non-sugar carbohydrate components rather than a large sugar load. This makes avocado nutritionally different from fruit juices and sweetened foods, but it does not make it a free-calorie food because its fat content contributes substantial energy."],
      ["Avocado and Heart-Healthy Eating", "Avocado can fit dietary patterns that emphasize unsaturated fats, vegetables, fruits, whole grains and other minimally processed foods. Research on dietary patterns and cardiovascular health is broader than evidence about any single food. It is therefore more accurate to describe avocado as a nutrient-rich source of unsaturated fat that can contribute to a healthy eating pattern than to promise that eating avocado alone prevents heart disease."],
      ["India-Specific Nutrition Context", "Avocado is increasingly available in Indian markets, although price, variety and availability can vary by region and season. It can be used in salads, sandwiches, wraps, chutneys or blended preparations, but traditional Indian meals already contain many useful sources of unsaturated fats and fibre such as nuts, seeds, legumes and vegetables. When adding avocado to an existing meal, portion size is worth considering because it adds calories as well as nutrients."],
      ["Common Mistakes When Counting Avocado Calories", "Common mistakes include treating half an avocado as a fixed calorie amount, ignoring the size of the fruit, confusing edible flesh with whole-fruit weight, assuming all avocado varieties have identical composition, and forgetting oils or other ingredients in guacamole. Another mistake is treating 'healthy fat' as unlimited fat: nutritional quality and calorie density are separate considerations."],
      ["How to Track Avocado More Precisely", "For accurate calorie tracking, remove the skin and pit, weigh the edible flesh in grams and use a consistent food-composition database. If you are eating packaged guacamole or another prepared avocado product, use its nutrition label when available. For mixed meals, record the avocado and other ingredients separately."],
      ["Key Takeaways", "Avocado is a nutrient-dense fruit that is unusually rich in fat, especially monounsaturated fat. A 100 g portion provides roughly 160 calories, about 15 g of fat and around 7 g of fibre, plus potassium, folate, vitamin K, vitamin E and other micronutrients. It can be part of a balanced diet and can fit weight-management or active-lifestyle goals, but portion size matters because its calorie density is higher than that of many fruits."]
    ]
  }

  {
    slug: "white-rice-vs-brown-rice",
    category: "Nutrition",
    categorySlug: "nutrition",
    title: "White Rice vs Brown Rice: Calories, Nutrition, Fibre and Which to Choose",
    description: "White rice vs brown rice explained with calories, carbohydrates, fibre, micronutrients, digestion, weight management and practical serving guidance.",
    readTime: "14 min read",
    date: "September 19, 2026",
    keywords: "white rice vs brown rice, brown rice nutrition, white rice calories, brown rice calories, rice nutrition, brown rice vs white rice, rice for weight loss",
    quickSummary: [
      "White and brown rice are both carbohydrate-rich staple foods; the main nutritional difference is that brown rice retains the bran and germ while white rice is more refined.",
      "Calories per cooked serving can be fairly similar, so choosing brown rice does not automatically create a calorie deficit.",
      "Brown rice generally provides more fibre, magnesium and manganese than white rice because more of the grain is retained.",
      "White rice is softer, quicker to digest and can be easier to tolerate for some people; it is not inherently an unhealthy food.",
      "For weight management, portion size, cooking method and the total meal usually matter more than choosing one rice type exclusively.",
      "Brown rice can help increase whole-grain intake, while white rice can still fit a balanced diet, especially when paired with vegetables, legumes and a protein source.",
      "Rice nutrition varies by variety, fortification, cooking method and database, so packaged labels or a consistent food database are useful for precise tracking."
    ],
    sources: [
      { label: "USDA FoodData Central", url: USDA_FDC },
      { label: "USDA Dietary Guidelines — Grains", url: "https://www.dietaryguidelines.gov/" },
      { label: "NIH Office of Dietary Supplements — Magnesium", url: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/" },
      { label: "NIH Office of Dietary Supplements — Manganese", url: "https://ods.od.nih.gov/factsheets/Manganese-HealthProfessional/" },
      { label: "NIH Office of Dietary Supplements — Potassium", url: NIH_POTASSIUM }
    ],
    sections: [
      ["White Rice vs Brown Rice: What Is the Difference?", "Brown rice is a whole grain because the bran, germ and endosperm are retained. White rice has the bran and germ removed during milling, leaving mainly the endosperm. This processing changes the texture, cooking time, fibre content and amounts of several nutrients. USDA dietary guidance classifies brown rice as a whole grain and white rice as a refined grain."],
      ["White Rice vs Brown Rice Calories", "Cooked white and brown rice can have similar calorie values by serving, although the exact number depends on variety, water absorbed during cooking and serving size. A useful tracking principle is to weigh cooked rice consistently rather than assuming every bowl contains the same amount. Brown rice should not be described as a low-calorie rice: its main advantage is its whole-grain nutrient profile, not a dramatic calorie difference."],
      ["White Rice vs Brown Rice Nutrition Facts", "Both types are mainly carbohydrate foods and provide relatively little fat and protein compared with dedicated protein foods. Brown rice generally contains more fibre and retains more nutrients from the bran and germ. White rice can also contain useful nutrients, particularly when enriched or fortified. Always check the specific food database or package label when exact numbers matter."],
      ["Why Does Brown Rice Have More Fibre?", "The bran is the outer layer of the grain and contains fibre and other compounds. Because brown rice retains this layer, it generally provides more dietary fibre than ordinary white rice. Fibre contributes to normal bowel function and can make meals more filling. The difference in fibre is one of the clearest nutritional reasons to include whole grains such as brown rice."],
      ["Essential Micronutrients in White and Brown Rice", "Brown rice is a useful source of several minerals. For example, NIH data list about 42 mg of magnesium in one-half cup of cooked brown rice versus about 10 mg in the same amount of cooked white rice. NIH data also show substantially more manganese in cooked brown rice than in cooked white rice. Potassium is present in both, although the amount varies by rice type and serving. White rice may provide added nutrients when enriched or fortified, so the nutrition label matters."],
      ["Brown Rice and Magnesium", "Magnesium is involved in hundreds of biochemical reactions, including processes related to protein synthesis, muscle and nerve function, blood glucose regulation and energy production. Whole grains are among the foods that can contribute magnesium, and NIH lists cooked brown rice as a source. This does not mean brown rice is required to meet magnesium needs; nuts, seeds, legumes, leafy greens and other foods can also contribute."],
      ["White Rice and Enrichment", "Refining removes some nutrients along with the bran and germ. In some countries, white rice may be enriched or fortified to restore selected nutrients. This means the nutritional gap between a particular white-rice product and brown rice can be smaller for some nutrients than a comparison of unfortified foods would suggest. Check the actual label or food database entry rather than assuming all white rice is nutritionally identical."],
      ["Is Brown Rice Better for Weight Loss?", "Brown rice is not automatically better for weight loss simply because it is brown. Weight change is driven by overall energy balance over time. Brown rice can be useful in a weight-management diet because its higher fibre content may contribute to fullness, but a large serving can still provide substantial calories. White rice can also fit a calorie-controlled diet when portions and the rest of the meal are appropriate."],
      ["White Rice for Weight Loss: Can You Eat It?", "Yes. White rice can be included in a weight-loss diet. The key variables are portion size, cooking ingredients and the overall calorie intake. A bowl of plain cooked rice paired with dal, vegetables and a protein source is very different from a large serving of rice cooked with substantial oil or served with calorie-dense sauces. There is no nutritional requirement to eliminate white rice solely because you are trying to lose weight."],
      ["Rice for Muscle Building and Exercise", "Rice is primarily a carbohydrate source, so it can contribute to training fuel and recovery meals. Athletes and active people may choose white rice when they want an easily digested carbohydrate around training, while brown rice can be useful in ordinary meals when they want more fibre and whole-grain nutrition. Neither type is a high-protein food, so pair rice with foods such as eggs, dairy, soy, beans, lentils, poultry or fish when protein intake is a priority."],
      ["Which Rice Is Easier to Digest?", "White rice is generally softer and lower in fibre than brown rice, so some people find it easier to digest. Brown rice contains more of the grain's outer layers and therefore more fibre, which can be beneficial but may cause temporary digestive discomfort in people who are not accustomed to higher-fibre meals. Individual tolerance matters, and preparation also affects texture and digestibility."],
      ["White Rice vs Brown Rice: Glycemic Response", "Rice can raise blood glucose because it contains substantial carbohydrate, but the response depends on rice variety, cooking, portion size, meal composition and the individual. It is too simplistic to assume every brown-rice meal has a low glucose response or every white-rice meal has a high one. Adding vegetables, legumes, protein and other foods to a meal can change the overall carbohydrate load and digestion pattern."],
      ["Basmati Rice vs Brown Rice", "Basmati describes a rice variety rather than a simple whole-versus-refined category. Basmati rice can be white or brown. Therefore, comparing 'basmati' with 'brown rice' is not always an apples-to-apples comparison. When tracking nutrition, identify both the variety and whether the rice is whole-grain or refined, then use the matching database entry."],
      ["India-Specific Nutrition Context", "Rice is a major staple in many Indian regions, and common choices include white rice, brown rice, parboiled rice and basmati rice. For an Indian meal, the overall plate matters: rice can be paired with dal, rajma, chana, vegetables, curd, eggs, fish, chicken or other protein-rich foods. If switching to brown rice makes a meal less enjoyable or difficult to sustain, portion control and a balanced meal can still be effective with white rice."],
      ["How Much Rice Should You Eat?", "There is no universal rice portion that is correct for everyone. A useful starting point is to measure a cooked serving and adjust it according to calorie needs, activity, hunger and the rest of the meal. People with higher energy demands may need larger portions, while someone reducing total calorie intake may use a smaller portion and increase vegetables or other lower-calorie foods for volume."],
      ["Common Mistakes When Comparing White and Brown Rice", "Common mistakes include comparing dry rice with cooked rice, assuming a bowl has a fixed weight, ignoring cooking oil, treating brown rice as automatically low-calorie, and assuming all rice varieties have identical nutrition. Another mistake is judging a whole meal only by the rice colour while ignoring the protein, vegetables, sauces and portion size around it."],
      ["How to Track Rice Calories More Precisely", "Choose either cooked-weight or dry-weight tracking and stay consistent. If using cooked weight, use a database entry specifically for cooked rice. If using dry weight, use the corresponding uncooked entry and account for the water absorbed during cooking. For packaged rice products, the label is the most relevant source. Mixed dishes such as fried rice, biryani and pulao should be tracked by ingredients when precision matters because oil and other additions can substantially change calories."],
      ["White Rice vs Brown Rice: Which Should You Choose?", "The practical choice depends on your dietary pattern, preferences, digestion, budget, availability and nutritional goals. Brown rice is a straightforward way to include a whole grain and generally provides more fibre and certain minerals. White rice is softer, versatile and can still be part of a balanced diet. Rather than treating one type as universally superior, use the rice that helps you build a nutritionally adequate and sustainable meal pattern."],
      ["Key Takeaways", "Brown rice retains the bran and germ and generally provides more fibre, magnesium and manganese than ordinary white rice. White rice is more refined, softer and often easier to digest, and some products are enriched or fortified. The calorie difference between cooked portions is not large enough to make rice colour the deciding factor for weight loss. Portion size, cooking ingredients and the rest of the meal matter greatly. Both can fit a balanced diet when used appropriately."]
    ]
  },

];

export function getSpecialJournalArticle(slug) {
  return JOURNAL_SPECIAL_ARTICLES.find((article) => article.slug === slug) || null;
}
