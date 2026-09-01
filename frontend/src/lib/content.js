// Per-calculator SEO content: description, FAQ, step-by-step guide
export const CALC_CONTENT = {
  bmi: {
    title: "BMI Calculator — Body Mass Index",
    metaDescription: "Calculate your Body Mass Index (BMI) instantly. Understand WHO categories, formula, and what your BMI means for your health.",
    intro: "Body Mass Index (BMI) is the most widely used measure of body size. It compares your weight to your height and gives you a single number that indicates whether you fall into an underweight, normal, overweight, or obese category.",
    steps: ["Measure your height in meters (or centimeters).", "Weigh yourself in kilograms.", "Square your height in meters.", "Divide your weight by that squared value."],
    faq: [{ q: "What is a healthy BMI?", a: "The WHO defines 18.5–24.9 as a healthy BMI range for most adults." }, { q: "Is BMI accurate for athletes?", a: "Not always — muscular people can register as ‘overweight’ despite low body fat. Pair BMI with body-fat and waist measurements." }, { q: "Does BMI apply to children?", a: "Children use BMI percentiles that account for age and sex, not the adult categories." }]
  },
  "bmi-prime": {
    title: "BMI Prime Calculator", metaDescription: "Compute your BMI Prime — the ratio of your BMI to the upper limit of normal BMI (25). Instant results with interpretation.", intro: "BMI Prime is your BMI divided by 25. Values below 1.0 fall within the normal WHO range; values above 1.0 suggest overweight.", steps: ["Calculate your BMI.", "Divide it by 25.", "Interpret: 0.74–1.00 is optimal."], faq: [{ q: "Why use BMI Prime?", a: "It expresses how far above or below the normal upper limit you sit, in a single ratio." }, { q: "What is a good BMI Prime?", a: "Between 0.74 and 1.00." }]
  },
  "healthy-weight-range": {
    title: "Healthy Weight Range Calculator", metaDescription: "Find the healthy weight range for your height using WHO BMI categories.", intro: "The healthy weight range is calculated from the normal BMI band (18.5–24.9) applied to your height.", steps: ["Square your height in meters.", "Multiply by 18.5 for the lower bound and by 24.9 for the upper bound."], faq: [{ q: "Should I aim for the middle?", a: "Not necessarily — frame size, muscle mass, and personal history all matter." }, { q: "Does age affect the range?", a: "Some clinicians adjust upward slightly for adults over 65." }]
  },
  "ideal-body-weight": {
    title: "Ideal Body Weight Calculator (Devine)", metaDescription: "Estimate your ideal body weight using the Devine formula, commonly used for medication dosing.", intro: "The Devine formula is a widely used clinical estimate. It’s a starting point — not a strict aesthetic goal.", steps: ["Convert height to inches.", "Subtract 60 (5 ft).", "Multiply by 2.3 kg and add 50 (male) or 45.5 kg (female)."], faq: [{ q: "Is IBW my goal weight?", a: "It’s a reference. Real goals depend on body composition and activity." }]
  },
  "weight-loss-goal": {
    title: "Weight Loss Goal Calculator",
    metaDescription: "Estimate how long it may take to reach your goal weight using your current weight, target weight, and a calorie-deficit assumption.",
    intro: "Use this weight loss goal calculator to estimate how much weight you want to lose and a theoretical timeline based on a daily calorie deficit. The result is a planning estimate, not a guarantee of how your body will respond.",
    overview: "Enter your current weight and goal weight to find the difference. FitMe Pro then estimates a timeline from the calculator's assumed calorie deficit. Real weight loss is not perfectly linear: water, glycogen, activity, adherence, energy expenditure, and changes in body weight can all affect the rate.",
    steps: ["Enter your current weight.", "Enter your goal weight.", "Calculate the amount of weight you want to lose.", "Apply the calculator's assumed weekly loss from the selected calorie deficit.", "Use the timeline as a planning estimate and reassess progress over time."],
    faq: [
      { q: "How long will it take to reach my goal weight?", a: "The calculator gives a theoretical estimate from your weight difference and the assumed rate of loss. Actual progress can be faster or slower because energy needs, adherence, water balance, activity, and body weight change over time." },
      { q: "How much weight should I lose per week?", a: "A gradual rate is generally easier to sustain than rapid loss. An appropriate target depends on starting weight, nutrition, activity, health, and individual circumstances." },
      { q: "Is a 500 calorie deficit appropriate for everyone?", a: "No. Calorie needs and appropriate deficits vary by person. A large deficit may be inappropriate for some people, particularly those with medical or nutritional concerns." },
      { q: "Why is my actual weight loss different from the estimate?", a: "Scale weight includes water, glycogen, food contents, lean tissue, and fat. Energy expenditure can also change as body weight and activity change." },
      { q: "Should I change my calorie target as I lose weight?", a: "Possibly. Energy needs can fall as body weight decreases, so maintenance calories and the size of your deficit may need to be reassessed." },
      { q: "Can I use this calculator if I exercise?", a: "Yes, but the simple timeline does not model every change in exercise energy expenditure. Your multi-week weight trend is more useful for evaluating progress." },
      { q: "What is the difference between a weight loss goal and a calorie deficit?", a: "A weight loss goal is the amount of weight you want to lose. A calorie deficit is the energy gap that can produce weight loss over time. This calculator connects the two with a simplified timeline." }
    ],
    limitations: "This calculator provides an educational planning estimate, not a guaranteed timeline or medical prescription. Actual weight change is nonlinear and individual."
  },
  "weight-gain-goal": {
    title: "Weight Gain Goal Calculator", metaDescription: "Plan a lean muscle-gain phase with a modest daily calorie surplus.", intro: "A 300 kcal/day surplus supports muscle growth while minimizing fat gain.", steps: ["Set your target weight.", "Combine the surplus with resistance training for best results."], faq: [{ q: "How much muscle can I gain per week?", a: "Beginners: 0.25–0.5 kg/week. Advanced lifters: much slower." }]
  },
  "body-fat": {
    title: "Body Fat Percentage Calculator (Deurenberg)", metaDescription: "Estimate body fat percentage from BMI, age, and sex using the Deurenberg formula.", intro: "The Deurenberg equation predicts body fat percentage from BMI. Useful when circumference measurements aren’t available.", steps: ["Calculate BMI.", "Apply: 1.2·BMI + 0.23·Age − 10.8·(sex) − 5.4."], faq: [{ q: "Is this accurate?", a: "Good at population level; individual accuracy is ±4%." }]
  },
  "navy-body-fat": {
    title: "US Navy Body Fat Calculator", metaDescription: "Estimate body fat using the US Navy method — waist, neck, hip, and height.", intro: "The US Navy method uses simple tape measurements and logarithms. It’s well-validated for healthy adults.", steps: ["Measure neck below the larynx.", "Measure waist at the navel (men) or narrowest point (women).", "Women also measure hip at the widest point."], faq: [{ q: "How accurate is it?", a: "Within ±3% of DXA scans for most adults." }, { q: "Do I measure waist bare?", a: "Yes — under clothing for best accuracy." }]
  },
  "relative-fat-mass": {
    title: "Relative Fat Mass Calculator", metaDescription: "Predict body fat percentage using only height and waist circumference.", intro: "Relative Fat Mass (RFM) is a newer measure that outperforms BMI for adiposity estimation.", steps: ["Take waist circumference.", "Apply: 64 − 20·(height/waist) + 12 (if female)."], faq: [{ q: "Why is RFM better than BMI?", a: "It correlates more strongly with DXA-measured body fat." }]
  },
  "body-adiposity-index": {
    title: "Body Adiposity Index Calculator", metaDescription: "Compute BAI from hip circumference and height for a quick body-fat estimate.", intro: "BAI is an alternative that requires only hip circumference and height, no weight.", steps: ["Divide hip (m) by height (m) raised to 1.5.", "Subtract 18 and express as a percentage."], faq: [{ q: "Is BAI accurate?", a: "It works reasonably for most groups but is less accurate in athletes." }]
  },
  "lean-body-mass": {
    title: "Lean Body Mass Calculator (Boer)", metaDescription: "Estimate your lean body mass — muscle, bone, and organs — using the Boer formula.", intro: "Lean body mass is everything except fat. The Boer equation offers accurate estimates from height and weight.", steps: ["Apply the male or female Boer formula based on your sex."], faq: [{ q: "Why track lean mass?", a: "Muscle is metabolically active — more lean mass raises your BMR." }]
  },
  "fat-mass": {
    title: "Fat Mass Calculator", metaDescription: "Calculate the total kilograms/pounds of fat in your body.", intro: "Fat mass = your body weight × body fat percentage. It’s the raw mass of adipose tissue.", steps: ["Estimate body fat %.", "Multiply by total body weight."], faq: [{ q: "What’s essential fat?", a: "About 3% for men, 12% for women — required for hormonal function." }]
  },
  "fat-free-mass": {
    title: "Fat-Free Mass Calculator", metaDescription: "Determine fat-free mass — everything in your body except fat.", intro: "Fat-free mass includes muscle, bones, water, and organs.", steps: ["Estimate body fat %.", "Fat-free mass = weight × (1 − BF%/100)."], faq: [{ q: "How can I increase it?", a: "Resistance training and adequate protein build lean mass." }]
  },
  ffmi: {
    title: "Fat-Free Mass Index Calculator", metaDescription: "Benchmark your muscularity with FFMI — a measure independent of body fat.", intro: "FFMI normalizes lean mass to height. It’s used to gauge muscularity across body sizes.", steps: ["Compute fat-free mass.", "Divide by height in meters squared."], faq: [{ q: "What’s a natural upper limit?", a: "Reference values vary by sex, population, and measurement method; avoid treating a single number as a universal limit." }]
  },
  "waist-hip-ratio": {
    title: "Waist-to-Hip Ratio Calculator", metaDescription: "Assess central obesity by dividing waist by hip circumference.", intro: "Waist-to-hip ratio measures fat distribution. Higher ratios mean more abdominal fat.", steps: ["Measure waist at the narrowest point.", "Measure hip at the widest point.", "Divide waist by hip."], faq: [{ q: "What’s a safe WHR?", a: "Below 0.90 for men and 0.85 for women." }]
  },
  "waist-height-ratio": {
    title: "Waist-to-Height Ratio Calculator", metaDescription: "Keep your waist under half your height — WHtR predicts cardiometabolic risk.", intro: "The rule is simple: keep waist circumference below half your height.", steps: ["Measure waist.", "Divide by height (same unit)."], faq: [{ q: "Why WHtR beats BMI?", a: "It captures visceral fat, which BMI misses." }]
  },
  absi: {
    title: "A Body Shape Index (ABSI) Calculator", metaDescription: "ABSI captures abdominal obesity and predicts mortality risk beyond BMI.", intro: "ABSI combines waist circumference with BMI and height to isolate central adiposity.", steps: ["Convert waist and height to meters.", "Compute BMI.", "Apply ABSI = waist / (BMI^(2/3) · √height)."], faq: [{ q: "Is higher always worse?", a: "Higher ABSI predicts all-cause mortality even at normal BMI." }]
  },
  bri: {
    title: "Body Roundness Index Calculator", metaDescription: "Model your body as an ellipse to estimate visceral fat and health risk.", intro: "Body Roundness Index (BRI) uses waist and height to create a ‘roundness’ score.", steps: ["Convert waist and height to meters.", "Apply the elliptical BRI formula."], faq: [{ q: "What is a normal BRI?", a: "Reference values vary by population, age, sex, and measurement method; there is no single universal cutoff." }]
  },
  "conicity-index": {
    title: "Conicity Index Calculator", metaDescription: "Assess body-shape conicity — a marker of visceral adiposity.", intro: "The conicity index compares your actual waist to a theoretical cylinder-shaped body of the same weight and height.", steps: ["Convert measurements to metric.", "Apply CI = waist / (0.109·√(weight/height))."], faq: [{ q: "What’s the ideal value?", a: "Reference values vary; use an appropriate population reference rather than a universal target." }]
  },
  "body-frame-size": {
    title: "Body Frame Size Calculator", metaDescription: "Determine your frame size (small/medium/large) using wrist circumference.", intro: "Frame size adjusts ideal-weight targets. Larger frames naturally weigh more even at healthy body compositions.", steps: ["Measure wrist circumference.", "Compute ratio = height / wrist.", "Match to sex-specific thresholds."], faq: [{ q: "Why does frame matter?", a: "It refines the interpretation of BMI and ideal-body-weight estimates." }]
  },
  bmr: {
    title: "Basal Metabolic Rate (BMR) Calculator", metaDescription: "Calculate BMR with the Mifflin-St Jeor equation — the calories your body needs at rest.", intro: "BMR is the energy your body uses to maintain vital functions while completely at rest.", steps: ["Apply Mifflin-St Jeor.", "Male: 10·W + 6.25·H − 5·A + 5.", "Female: 10·W + 6.25·H − 5·A − 161."], faq: [{ q: "How can I raise BMR?", a: "Body size and composition affect BMR; changes in muscle mass can contribute, but there is no guaranteed fixed increase." }]
  },
  tdee: {
    title: "Total Daily Energy Expenditure (TDEE) Calculator", metaDescription: "Multiply BMR by activity factor to get calories burned per day.", intro: "TDEE captures the total energy you burn including movement, exercise, and digestion.", steps: ["Compute BMR.", "Multiply by your activity factor (1.2 to 1.9)."], faq: [{ q: "How do I pick an activity level?", a: "Be honest — most people overestimate activity by one level." }]
  },
  "daily-calorie-needs": {
    title: "Daily Calorie Needs Calculator", metaDescription: "Find the calories needed to maintain your current body weight.", intro: "Daily calorie needs are typically equal to TDEE — the calories that keep your weight stable.", steps: ["Compute TDEE.", "Eat that amount for maintenance."], faq: [{ q: "Should I track calories every day?", a: "For 2–3 weeks initially; then adjust based on progress." }]
  },
  "calorie-deficit": {
    title: "Calorie Deficit Calculator", metaDescription: "Get a calorie deficit target for sustainable fat loss.", intro: "A calorie deficit forces your body to use stored energy — mostly fat if paired with resistance training.", steps: ["Compute TDEE.", "Subtract 250 (mild) or 500 (moderate)."], faq: [{ q: "What’s the largest safe deficit?", a: "There is no single safe maximum for everyone; larger deficits can increase nutritional and lean-mass risks." }]
  },
  "calorie-surplus": {
    title: "Calorie Surplus Calculator", metaDescription: "Determine a lean surplus for gaining muscle with minimal fat.", intro: "A modest surplus paired with progressive resistance training builds muscle efficiently.", steps: ["Compute TDEE.", "Add 300 kcal (lean) or 500 kcal (aggressive)."], faq: [{ q: "How long should a bulk last?", a: "8–16 weeks is common, followed by a maintenance or cut phase." }]
  },
  "body-surface-area": {
    title: "Body Surface Area (BSA) Calculator", metaDescription: "Compute BSA using the Du Bois formula — used in medical dosing.", intro: "Body Surface Area is a clinical metric for drug dosing, cardiac index, and burn coverage.", steps: ["Apply BSA = 0.007184 · W^0.425 · H^0.725."], faq: [{ q: "What’s a typical BSA?", a: "Values vary with body size; many adults fall around 1.5–2.0 m²." }]
  },
  "ponderal-index": {
    title: "Ponderal Index Calculator", metaDescription: "Ponderal Index — a BMI alternative that works better at extreme heights.", intro: "PI divides weight by height cubed instead of squared, producing a more consistent score across heights.", steps: ["PI = weight / height³ (in meters)."], faq: [{ q: "When is PI better than BMI?", a: "It can be useful for describing body size across different heights, but interpretation depends on the population and purpose." }]
  },
  "adjusted-body-weight": {
    title: "Adjusted Body Weight Calculator", metaDescription: "Compute AdjBW — used for medication dosing in overweight patients.", intro: "AdjBW splits the difference between ideal and actual weight for more accurate clinical dosing.", steps: ["Compute IBW.", "AdjBW = IBW + 0.4·(actual − IBW)."], faq: [{ q: "When is AdjBW used?", a: "When actual weight is more than 20–30% above IBW, depending on the clinical protocol." }]
  },
  "body-density": {
    title: "Body Density Calculator (Siri)", metaDescription: "Estimate body density from body fat percentage using the Siri equation.", intro: "Body density relates fat percentage to overall body composition. Denser = leaner.", steps: ["Estimate body fat %.", "BD = 495 / (BF% + 450)."], faq: [{ q: "What is a healthy body density?", a: "Body density varies with body composition and measurement method, so a universal healthy cutoff is not appropriate." }]
  },
  "obesity-class": {
    title: "Obesity Class & Health Risk Calculator", metaDescription: "Determine adult BMI obesity class and add waist-based context for central body size.", intro: "This calculator combines adult BMI classification with waist circumference context to help you understand obesity class and central body size.", steps: ["Compute BMI.", "Compare BMI with adult classification ranges.", "Identify the corresponding obesity class.", "If available, consider waist circumference separately using an appropriate guideline.", "Use the result as a screening aid rather than a diagnosis."], faq: [{ q: "Why include waist?", a: "Central body size provides information that BMI alone does not show." }, { q: "Is obesity class a diagnosis?", a: "BMI classification is a screening classification; a clinician may consider other measurements and health factors." }]
  },
};

export function getContent(slug) {
  return CALC_CONTENT[slug];
}
