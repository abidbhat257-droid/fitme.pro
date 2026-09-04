import React from "react";
import { Link } from "react-router-dom";

const DATA = {
  "daily-calorie-needs": {
    interpretation: "Treat the displayed value as an estimated daily energy baseline. Compare it with your goal and with multi-week changes in body weight and activity rather than treating one number as exact.",
    factors: "Body size, age, sex, activity, exercise, daily movement, body composition, illness and changes in routine can all affect actual energy expenditure.",
    guides: ["Understanding BMR and TDEE", "How to set a sustainable calorie target", "Calories, macros and protein for fitness goals"],
    refs: [["NIH/NIDDK — Body Weight Planner", "https://www.niddk.nih.gov/bwp"], ["National Academies — Dietary Reference Intakes", "https://nap.nationalacademies.org/catalog/11537/dietary-reference-intakes-for-energy-carbohydrate-fiber-fat-fatty-acids-cholesterol-protein-and-amino-acids-macronutrients"]]
  },
  bmr: {
    interpretation: "BMR is a resting-energy estimate and is best used as a foundation for estimating daily energy needs. It is not a recommended calorie intake by itself.",
    factors: "Body mass, height, age, sex and body composition influence resting energy expenditure. Illness, medications and other physiological factors can also affect measured metabolism.",
    guides: ["BMR vs TDEE: what's the difference?", "How calorie needs change with body weight", "Understanding resting energy expenditure"],
    refs: [["PubMed — Mifflin-St Jeor equation", "https://pubmed.ncbi.nlm.nih.gov/2305711/"], ["NIH/NIDDK — Body Weight Planner", "https://www.niddk.nih.gov/bwp"]]
  },
  "ideal-body-weight": {
    interpretation: "IBW is a formula-derived reference value. It should not be presented as the one correct or healthiest weight for every person at a given height.",
    factors: "The Devine equation primarily uses height and sex. It does not directly account for muscularity, body-fat distribution, age, health status or individual goals.",
    guides: ["Ideal weight vs healthy weight range", "How BMI and body composition complement each other", "Choosing a realistic weight goal"],
    refs: [["PubMed — Devine formula", "https://pubmed.ncbi.nlm.nih.gov/6829821/"], ["CDC — Adult BMI Categories", "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"]]
  },
  tdee: {
    interpretation: "TDEE is an estimated average of total daily energy expenditure. Use it as a starting maintenance baseline and calibrate it against consistent real-world trends.",
    factors: "BMR, exercise, occupational activity, daily movement, body weight, body composition, sleep and changes in routine can influence actual expenditure.",
    guides: ["TDEE vs BMR explained", "How to estimate maintenance calories", "Using TDEE for weight loss or gain"],
    refs: [["NIH/NIDDK — Body Weight Planner", "https://www.niddk.nih.gov/bwp"], ["PubMed — Mifflin-St Jeor equation", "https://pubmed.ncbi.nlm.nih.gov/2305711/"]]
  },
  "maintenance-calories": {
    interpretation: "Maintenance calories are a practical estimate of the average intake that may maintain body weight over time. Day-to-day scale changes do not necessarily mean maintenance has failed.",
    factors: "Activity, body weight, body composition, food intake, exercise, daily movement and changes in routine can shift maintenance needs.",
    guides: ["How to find your maintenance calories", "Why body weight fluctuates", "Maintenance calories before a calorie deficit"],
    refs: [["NIH/NIDDK — Body Weight Planner", "https://www.niddk.nih.gov/bwp"], ["National Academies — Dietary Reference Intakes", "https://nap.nationalacademies.org/catalog/11537/dietary-reference-intakes-for-energy-carbohydrate-fiber-fat-fatty-acids-cholesterol-protein-and-amino-acids-macronutrients"]]
  },
  calorie: {
    interpretation: "Use the calorie result as an estimated starting point for daily energy planning. Actual needs should be evaluated using your goal, activity and longer-term weight trend.",
    factors: "Age, sex, height, weight, activity, exercise, daily movement, body composition and changes in routine can affect calorie needs.",
    guides: ["How many calories do I need?", "Calories for weight loss vs maintenance", "Calories, macros and protein explained"],
    refs: [["NIH/NIDDK — Body Weight Planner", "https://www.niddk.nih.gov/bwp"], ["Mayo Clinic — Calorie Calculator", "https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/calorie-calculator/itt-20084939"]]
  },
  "body-fat": {
    interpretation: "Estimated body-fat percentage is best used as a screening or tracking estimate. Trends measured with the same method are generally more useful than comparing unrelated methods.",
    factors: "Age, sex, BMI, muscularity, hydration, body-fat distribution and the equation or measurement method can affect the estimate.",
    guides: ["BMI vs body-fat percentage", "How to track body composition", "Understanding waist and body-fat measurements"],
    refs: [["PubMed — Deurenberg body-fat prediction equation", "https://pubmed.ncbi.nlm.nih.gov/1748845/"], ["CDC — About Adult BMI", "https://www.cdc.gov/bmi/about/index.html"]]
  },
  "calorie-deficit": {
    interpretation: "A calorie deficit is a planning difference between estimated energy expenditure and intake. The calculated target is not a guarantee of a particular weekly weight-loss rate.",
    factors: "Actual deficit size can be affected by calorie-tracking error, changes in activity, appetite, metabolic adaptation, body weight and fluid shifts.",
    guides: ["How to create a sustainable calorie deficit", "Why weight loss is not perfectly linear", "Protein and macros during fat loss"],
    refs: [["NIH/NIDDK — Body Weight Planner", "https://www.niddk.nih.gov/bwp"], ["CDC — Losing Weight", "https://www.cdc.gov/healthy-weight-growth/losing-weight/index.html"]]
  },
  "calories-burned": {
    interpretation: "The result is an estimated energy cost for the selected activity. Use it to understand activity demands rather than as an exact calorie ledger.",
    factors: "Body weight, intensity, duration, terrain, technique, fitness, movement efficiency and the MET value or equation used can change the estimate.",
    guides: ["How exercise calories are estimated", "METs explained", "Using exercise with a calorie goal"],
    refs: [["Compendium of Physical Activities", "https://pacompendium.com/"], ["CDC — Physical Activity Basics", "https://www.cdc.gov/physical-activity/basics/index.html"]]
  },
  "water-intake": {
    interpretation: "Use the output as a practical starting estimate of fluid intake. Total water includes fluids from beverages and water in foods, and individual needs can differ substantially.",
    factors: "Body size, physical activity, heat, humidity, sweating, diet, illness, pregnancy, breastfeeding and medical conditions can affect fluid requirements.",
    guides: ["How much water do you need?", "Hydration before, during and after exercise", "Understanding total water intake"],
    refs: [["National Academies — Water and Adequate Intake", "https://nap.nationalacademies.org/catalog/10925/dietary-reference-intakes-for-water-potassium-sodium-chloride-and-sulfate"], ["CDC — About Water and Health", "https://www.cdc.gov/healthy-weight-growth/water-healthy-drinks/index.html"]]
  },
  protein: {
    interpretation: "The result is a practical protein target based on the selected body weight and goal or activity setting. It is a planning estimate rather than a universal requirement.",
    factors: "Body size, age, training volume, training type, energy intake, goals, body composition and health status can affect protein needs.",
    guides: ["How much protein do you need?", "Protein per meal and daily distribution", "Protein during weight loss and muscle building"],
    refs: [["NIH Office of Dietary Supplements — Protein", "https://ods.od.nih.gov/factsheets/Protein-HealthProfessional/"], ["National Academies — Protein DRI", "https://nap.nationalacademies.org/catalog/10490/dietary-reference-intakes-for-energy-carbohydrate-fiber-fat-fatty-acids-cholesterol-protein-and-amino-acids"]]
  },
  pace: {
    interpretation: "Running pace is time per unit distance. A lower minutes-per-kilometre or minutes-per-mile value means a faster pace; compare similar routes and conditions when tracking progress.",
    factors: "Distance, terrain, elevation, wind, temperature, fatigue, footwear, surface, pacing strategy and GPS measurement can affect observed pace.",
    guides: ["Pace vs speed explained", "How to choose training paces", "Predicting race times from running performance"],
    refs: [["ACSM — Exercise and Physical Activity Resources", "https://www.acsm.org/education-resources"], ["World Athletics — Competition and training resources", "https://worldathletics.org/"]]
  },
  "one-rep-max": {
    interpretation: "Estimated 1RM is a strength-planning metric. It can help estimate training loads without repeatedly attempting a true maximal lift, but it should not be treated as a guaranteed maximum or safe load.",
    factors: "Exercise technique, repetition count, fatigue, training experience, range of motion, equipment and the equation used affect an estimated 1RM.",
    guides: ["How to use 1RM for training", "1RM vs rep-max estimates", "Choosing safe resistance-training loads"],
    refs: [["PubMed — Epley 1RM estimation literature", "https://pubmed.ncbi.nlm.nih.gov/1101694/"], ["ACSM — Resistance Training Guidelines", "https://www.acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines"]]
  },
  "maximum-heart-rate": {
    interpretation: "Estimated maximum heart rate is a reference value for exercise-intensity planning. It is not a direct measurement of your personal maximum or cardiovascular fitness.",
    factors: "Age-based equations can differ substantially from an individual's measured maximum. Medication, health status, fitness and testing conditions can also matter.",
    guides: ["How maximum heart rate is estimated", "Maximum heart rate vs target heart rate", "Understanding exercise intensity"],
    refs: [["American Heart Association — Target Heart Rates", "https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates"], ["ACSM — Exercise Testing and Prescription", "https://www.acsm.org/education-resources/books/exercise-testing-and-prescription"]]
  },
  "heart-rate-zone": {
    interpretation: "Heart-rate zones provide intensity ranges for training. The physiological meaning of a zone depends on the method used and your individual response to exercise.",
    factors: "Maximum heart rate, resting heart rate, fitness, heat, dehydration, stress, caffeine, medication and fatigue can change heart rate at a given workload.",
    guides: ["Heart-rate zones explained", "Zone 2 training explained", "Heart-rate reserve vs percentage of maximum"],
    refs: [["American Heart Association — Target Heart Rates", "https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates"], ["ACSM — Exercise Testing and Prescription", "https://www.acsm.org/education-resources/books/exercise-testing-and-prescription"]]
  },
  "walking-calories": {
    interpretation: "Walking-calorie results estimate the energy cost of the selected walking session. They are most useful for comparing similar activities and tracking activity trends.",
    factors: "Body weight, walking speed, duration, incline, terrain, gait, fitness and the activity-intensity assumption can affect actual energy expenditure.",
    guides: ["How many calories does walking burn?", "Walking for fitness and weight management", "Walking pace and intensity"],
    refs: [["Compendium of Physical Activities", "https://pacompendium.com/"], ["CDC — Physical Activity Basics", "https://www.cdc.gov/physical-activity/basics/index.html"]]
  },
  "macro-calculator": {
    interpretation: "Macro results show how a calorie target is distributed among protein, carbohydrate and fat. The selected split is a planning choice, not a universally optimal prescription.",
    factors: "Calorie needs, training demands, goals, dietary preferences, protein requirements, food choices and portion or label accuracy affect practical macro targets.",
    guides: ["Macros explained: protein, carbs and fat", "How to set macros for your goal", "Macro percentages vs grams"],
    refs: [["National Academies — Dietary Reference Intakes", "https://nap.nationalacademies.org/catalog/10490/dietary-reference-intakes-for-energy-carbohydrate-fiber-fat-fatty-acids-cholesterol-protein-and-amino-acids"], ["NIH Office of Dietary Supplements — Protein", "https://ods.od.nih.gov/factsheets/Protein-HealthProfessional/"]]
  },
  "vo2-max": {
    interpretation: "VO₂ max is an aerobic-capacity metric. Estimates are most useful when the same protocol is repeated under similar conditions, rather than comparing unrelated estimation methods.",
    factors: "Age, sex, body weight, training status, test protocol, pacing, terrain, temperature, fatigue and heart-rate measurement can affect an estimate.",
    guides: ["VO₂ max explained", "How to improve aerobic fitness", "VO₂ max vs running performance"],
    refs: [["American College of Sports Medicine", "https://www.acsm.org/"], ["American Heart Association — Physical Activity", "https://www.heart.org/en/healthy-living/fitness"]]
  },
  "healthy-weight-range": {
    interpretation: "This range is the mathematical weight interval corresponding to an adult BMI of 18.5–24.9 at the entered height. It is a screening reference, not an individualized health target.",
    factors: "Muscle mass, fat distribution, age, pregnancy, health conditions and population differences can affect how informative BMI is for an individual.",
    guides: ["BMI and healthy weight explained", "Healthy weight vs ideal body weight", "Why waist circumference adds context"],
    refs: [["CDC — Adult BMI Categories", "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"], ["WHO — Obesity and Overweight", "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight"]]
  },
  "body-surface-area": {
    interpretation: "BSA is an estimated body surface area, usually expressed in square metres. In clinical settings, use the equation and protocol specified by the healthcare service rather than changing a treatment dose based on this calculator alone.",
    factors: "Height, weight, body proportions and the BSA equation selected affect the calculated value. Different equations can produce slightly different results.",
    guides: ["What is body surface area?", "BSA vs BMI explained", "Why clinical calculators can use different equations"],
    refs: [["NCI — Cancer Treatment and Drug Information", "https://www.cancer.gov/about-cancer/treatment/drugs"], ["Mosteller formula — PubMed", "https://pubmed.ncbi.nlm.nih.gov/6862456/"]]
  }
};

export default function SEOPageCompleteness({ slug }) {
  const data = DATA[slug];
  if (!data) return null;
  return (
    <div className="space-y-8" data-testid={`seo-completeness-${slug}`}>
      <section>
        <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Result Interpretation</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">{data.interpretation}</p>
      </section>
      <section>
        <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Factors That Affect Your Result</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">{data.factors}</p>
      </section>
      <section>
        <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-4">Related FitMe Pro Guides</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {data.guides.map((guide) => (
            <Link key={guide} to="/journal" className="border border-border bg-card px-4 py-3 text-sm font-semibold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors">{guide}</Link>
          ))}
        </div>
      </section>
      <section>
        <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-4">Scientific / Official References</h3>
        <ul className="space-y-2 text-sm text-muted-foreground leading-7">
          {data.refs.map(([name, url]) => (
            <li key={url}><a href={url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">{name}</a></li>
          ))}
        </ul>
      </section>
      <section className="border border-border p-6 bg-card">
        <h3 className="font-display text-xl uppercase tracking-tight mb-3">Medical Disclaimer</h3>
        <p className="text-sm text-muted-foreground leading-7">FitMe Pro calculators provide educational estimates and general information. They do not diagnose disease, prescribe treatment, or replace advice from a qualified healthcare professional. For symptoms, pregnancy, medical conditions, medication decisions, or unusually high or low results, seek appropriate professional guidance.</p>
      </section>
    </div>
  );
}
