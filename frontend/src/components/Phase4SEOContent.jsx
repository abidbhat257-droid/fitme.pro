import React from "react";
import { Link } from "react-router-dom";

const DATA = {
  "walking-calories": {
    title: "Walking Calories Calculator Guide",
    quick: "A walking-calorie estimate uses body weight, walking duration or distance, and exercise intensity to approximate energy expenditure. The result is an estimate, not a direct measurement of calories burned.",
    formula: "Calories ≈ MET × 3.5 × body weight(kg) ÷ 200 × time(minutes)",
    method: "The calculator estimates energy expenditure from body weight and walking intensity over the selected duration. Speed, incline, terrain, fitness level and walking efficiency can change the actual value.",
    inputs: "Enter your body weight and the walking information requested by the calculator, such as duration, distance or speed. Use consistent units and avoid treating a single session estimate as an exact measurement.",
    meaning: "Higher body weight, greater intensity and longer duration generally increase estimated energy expenditure. The number should be used for planning and comparison rather than as a precise calorie ledger.",
    example: "For example, a 70 kg person walking for 60 minutes will receive an estimate based on the selected walking intensity. A faster pace or uphill route can produce a higher estimate than easy level walking.",
    limits: "Wearables and formulas can disagree because they use different assumptions. Incline, terrain, gait, fitness and device algorithms all affect estimates. Do not compensate for every reported calorie with food automatically.",
    faqs: [
      ["How many calories does walking burn?", "It depends mainly on body weight, duration and intensity. Longer and faster walks generally use more energy."],
      ["Does walking speed affect calories burned?", "Yes. Faster walking generally increases energy expenditure per unit of time."],
      ["Does body weight affect walking calories?", "Yes. A heavier body generally requires more energy to move the same distance."],
      ["Does incline increase walking calories?", "Yes. Uphill walking increases exercise intensity and can substantially change an estimate."],
      ["Are walking-calorie estimates exact?", "No. They are model-based estimates and can differ from measured energy expenditure."],
      ["Should I eat back calories burned walking?", "Not automatically. Exercise estimates have uncertainty, and nutrition decisions should consider overall goals and intake."],
      ["Is walking good for weight management?", "Regular walking can contribute to physical activity and energy expenditure, while sustainable weight management also depends on overall diet and lifestyle."],
      ["What should I track besides calories?", "Track walking time, distance, pace, frequency and how your fitness changes over time."],
    ],
    related: ["Pace Calculator", "Calories Burned Calculator", "Daily Calorie Needs", "TDEE Calculator"],
  },
  "macro-calculator": {
    title: "Macro Calculator Guide",
    quick: "A macro calculator estimates daily protein, carbohydrate and fat targets from calorie needs and a chosen macronutrient distribution. These targets are planning estimates, not mandatory numbers.",
    formula: "Protein and carbohydrate = 4 kcal/g; fat = 9 kcal/g",
    method: "The calculator starts with an estimated calorie target and allocates calories among protein, carbohydrate and fat according to the selected targets. Calories are then converted to grams using the energy values of each macronutrient.",
    inputs: "Use your calorie target and the macro percentages or targets requested by the calculator. If your calorie target is itself estimated from BMR and activity, remember that uncertainty carries through to the macro result.",
    meaning: "The result tells you how many grams of each macronutrient fit your selected calorie framework. It does not mean that one exact macro split is universally optimal.",
    example: "If a 2,000 kcal plan allocates 30% to protein, 40% to carbohydrate and 30% to fat, the approximate targets are 150 g protein, 200 g carbohydrate and 67 g fat.",
    limits: "Macro targets depend on goals, activity, food preferences and total energy needs. Food labels and portion estimates also introduce error. Prioritize overall diet quality and consistency over tiny differences in macro grams.",
    faqs: [
      ["What are macros?", "Macros are macronutrients: protein, carbohydrate and fat, the main nutrients that provide dietary energy."],
      ["How are macro grams calculated?", "Protein and carbohydrate provide about 4 kcal per gram, while fat provides about 9 kcal per gram."],
      ["What macro split should I use?", "There is no single ideal split for everyone. Targets should fit your energy needs, activity, goals and dietary preferences."],
      ["Should protein be calculated before carbs and fat?", "Often it is useful to establish an appropriate protein target first, then distribute remaining calories according to goals and preference."],
      ["Can macros help with weight loss?", "They can help organize food intake, but total energy intake and sustainable eating habits remain important."],
      ["Do I need to hit macros exactly?", "No. Small daily differences are normal. Consistency over time is generally more useful than perfect precision."],
      ["Are macro percentages the same as macro grams?", "No. Percentages describe calorie allocation; grams depend on the calorie density of each macronutrient."],
      ["Can athletes use a macro calculator?", "Yes, as a planning tool. Higher training loads may change energy and carbohydrate requirements, so targets should be adjusted as training changes."],
    ],
    related: ["Protein Calculator", "Daily Calorie Needs", "Calorie Deficit Calculator", "Meal Macro Calculator"],
  },
  "vo2-max": {
    title: "VO₂ Max Calculator Guide",
    quick: "VO₂ max is an estimate of maximal oxygen uptake, commonly expressed in millilitres of oxygen per kilogram of body weight per minute. It is widely used as an indicator of aerobic fitness.",
    formula: "Formula depends on the test protocol used",
    method: "VO₂ max can be measured directly with a graded exercise test and respiratory gas analysis. Field and wearable methods instead estimate it from performance, heart rate and other inputs. FitMe Pro presents an estimate based on its selected method.",
    inputs: "Use the exact performance, time, distance, heart-rate or demographic inputs requested by the calculator. Results from different protocols should not be assumed to be directly interchangeable.",
    meaning: "A higher VO₂ max generally indicates greater aerobic capacity, but interpretation depends on age, sex, training status and the test method. Changes over time can be more useful than comparing unrelated protocols.",
    example: "For example, two runners may have different estimated VO₂ max values because their race performance and body weights differ. The estimate is most useful when repeated with the same method under similar conditions.",
    limits: "Estimated VO₂ max is not the same as laboratory-measured VO₂ max. Heat, fatigue, terrain, pacing, heart-rate accuracy and the equation used can affect the result.",
    faqs: [
      ["What is VO₂ max?", "VO₂ max is the maximum rate at which the body can take in and use oxygen during intense exercise."],
      ["What does a higher VO₂ max mean?", "It generally reflects greater aerobic capacity, although context and measurement method matter."],
      ["Can a calculator measure VO₂ max directly?", "No. A calculator estimates it from selected inputs. Direct measurement requires specialized exercise testing and gas analysis."],
      ["Can VO₂ max improve with training?", "Aerobic training can improve cardiorespiratory fitness, although the amount of change varies between people."],
      ["Why do different VO₂ max calculators give different results?", "They may use different tests, equations, assumptions and input variables."],
      ["Does body weight affect relative VO₂ max?", "Yes. Relative VO₂ max is expressed per kilogram of body weight, so body mass affects the reported value."],
      ["Are smartwatch VO₂ max estimates accurate?", "They can be useful for tracking trends, but they are estimates and should not be treated as laboratory measurements."],
      ["Should I compare my VO₂ max with someone else's?", "Only cautiously. Age, sex, training history and the measurement protocol can make direct comparisons misleading."],
    ],
    related: ["Pace Calculator", "Running Speed Calculator", "Cardio Fitness Level Calculator", "Maximum Heart Rate Calculator"],
  },
  "healthy-weight-range": {
    title: "Healthy Weight Range Calculator Guide",
    quick: "A healthy-weight-range calculator estimates the body-weight range corresponding to an adult BMI range of 18.5 to 24.9 for a given height. BMI is a screening measure rather than a diagnosis.",
    formula: "Weight = BMI × height²; range uses BMI 18.5–24.9",
    method: "Convert height to metres, square it, and multiply by the lower and upper BMI boundaries. The result is the range of weights that correspond mathematically to that BMI interval.",
    inputs: "The main input is height. Enter it accurately and use the same unit system throughout the calculation. Age, sex and body composition are not part of this BMI-based range calculation.",
    meaning: "The result describes a BMI-based reference range, not an individualized ideal weight. Muscularity, fat distribution, age, pregnancy and other factors can make BMI less informative for an individual.",
    example: "At 1.75 m, the BMI-based range is approximately 56.7 kg to 76.3 kg using BMI values of 18.5 and 24.9.",
    limits: "BMI does not distinguish fat from muscle and should not be used alone to assess health. A clinician can combine weight with waist circumference, medical history, laboratory data and other measures when appropriate.",
    faqs: [
      ["What is a healthy weight range?", "In this calculator, it is the weight range corresponding to an adult BMI of 18.5–24.9 at a given height."],
      ["Is the healthy weight range the same as ideal weight?", "No. A BMI-based range is different from formula-based ideal-weight estimates and should not be treated as a personal target."],
      ["How is healthy weight calculated from height?", "Weight is calculated from BMI multiplied by height squared, using the selected BMI boundaries."],
      ["Does age change the adult BMI range?", "The standard adult BMI categories are generally applied to adults, but BMI interpretation can require additional context."],
      ["Does muscle affect BMI?", "Yes. People with high muscle mass can have a higher BMI without having high body fat."],
      ["Can I use this range during pregnancy?", "Pregnancy requires specialized guidance; a standard adult BMI-based weight range should not be used as a pregnancy target."],
      ["What should I use with a healthy weight range?", "Consider complementary measures such as waist circumference, body composition and overall health context."],
      ["Can a healthy weight range diagnose health?", "No. It is a screening reference based on BMI and is not a diagnosis."],
    ],
    related: ["BMI Calculator", "Ideal Body Weight", "Body Fat Percentage", "Waist-to-Height Ratio"],
  },
  "body-surface-area": {
    title: "Body Surface Area Calculator Guide",
    quick: "Body surface area (BSA) estimates the total external surface area of the human body, usually in square metres. It is used in some clinical calculations and is different from BMI or body-fat percentage.",
    formula: "Most BSA equations use height and weight; the Mosteller formula is BSA = √[(height(cm) × weight(kg)) / 3600]",
    method: "The calculator combines height and body weight through an established BSA equation. Different equations can produce slightly different estimates, especially at extreme body sizes.",
    inputs: "Enter height and weight accurately. Metric inputs can be converted from imperial units before calculation. For clinical use, follow the equation and institutional protocol specified by the healthcare service.",
    meaning: "BSA provides an estimated surface area rather than a measure of body composition. In clinical contexts it can be used as part of certain dosing or physiological calculations, but the appropriate equation and clinical protocol matter.",
    example: "For a person who is 175 cm tall and weighs 70 kg, the Mosteller equation gives a BSA of about 1.85 m².",
    limits: "BSA is an estimate derived from body dimensions. It should not be substituted for a clinician's prescribed dosing method, and different clinical applications may specify different equations or protocols.",
    faqs: [
      ["What is body surface area?", "BSA is an estimate of the body's external surface area, commonly expressed in square metres."],
      ["What is BSA used for?", "It is used in some clinical and physiological calculations, including selected medication-dosing contexts."],
      ["How is BSA calculated?", "Several equations exist. The Mosteller equation uses height and weight and is convenient for routine calculation."],
      ["What is the Mosteller formula?", "BSA = square root of [(height in cm × weight in kg) ÷ 3600]."],
      ["Is BSA the same as BMI?", "No. BMI relates body weight to height, while BSA estimates external body surface area."],
      ["Does BSA change with weight?", "Yes. For a fixed height, increasing body weight generally increases estimated BSA."],
      ["Do all BSA formulas give the same result?", "No. Different equations use different assumptions and can produce slightly different values."],
      ["Can I use BSA to change a medication dose myself?", "No. Medication dosing should follow the prescribing clinician's instructions and the specific clinical protocol."],
    ],
    related: ["BMI Calculator", "Ideal Body Weight", "Healthy Weight Range", "Body Fat Percentage"],
  },
};

const SLUGS = new Set(Object.keys(DATA));

export default function Phase4SEOContent({ slug }) {
  const data = DATA[slug];
  if (!data) return null;
  const relatedLinks = data.related.map((name) => {
    const slugMap = {
      "Pace Calculator": "pace", "Calories Burned Calculator": "calories-burned", "Daily Calorie Needs": "daily-calorie-needs", "TDEE Calculator": "tdee",
      "Protein Calculator": "protein-intake", "Calorie Deficit Calculator": "calorie-deficit", "Meal Macro Calculator": "meal-macro", "Running Speed Calculator": "running-speed",
      "Cardio Fitness Level Calculator": "cardio-fitness-level", "Maximum Heart Rate Calculator": "maximum-heart-rate", "BMI Calculator": "bmi", "Ideal Body Weight": "ideal-body-weight",
      "Body Fat Percentage": "body-fat", "Waist-to-Height Ratio": "waist-to-height-ratio",
    };
    return slugMap[name] ? { name, slug: slugMap[name] } : null;
  }).filter(Boolean);
  return (
    <div className="space-y-8">
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Quick Answer</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{data.quick}</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Formula or Method</h3><p className="text-sm sm:text-base text-muted-foreground leading-8 font-mono">{data.formula}</p><p className="mt-3 text-sm sm:text-base text-muted-foreground leading-8">{data.method}</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Inputs Explained</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{data.inputs}</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">What Your Result Means</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{data.meaning}</p></section>
      <section className="border border-border bg-card p-6"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Worked Example</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{data.example}</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Accuracy and Limitations</h3><p className="text-sm sm:text-base text-muted-foreground leading-8">{data.limits}</p></section>
      <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-4">Frequently Asked Questions</h3><div className="space-y-5">{data.faqs.map(([q,a]) => <div key={q}><h4 className="font-bold mb-1">{q}</h4><p className="text-sm text-muted-foreground leading-7">{a}</p></div>)}</div></section>
      {relatedLinks.length > 0 && <section className="border border-border bg-card p-6"><h3 className="font-display text-xl uppercase tracking-tight mb-4">Related Calculators</h3><div className="grid sm:grid-cols-2 gap-2">{relatedLinks.map((item) => <Link key={item.slug} to={`/${item.slug}-calculator`} className="border border-border px-4 py-3 text-sm font-bold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors">{item.name}</Link>)}</div></section>}
      <section className="border border-border p-6 bg-card"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Important Health Note</h3><p className="text-sm text-muted-foreground leading-7">FitMe Pro calculators provide educational estimates. They do not diagnose disease, replace professional assessment, or guarantee a health or fitness outcome. For medical decisions, use the method and guidance provided by a qualified healthcare professional.</p></section>
    </div>
  );
}

export { SLUGS };
