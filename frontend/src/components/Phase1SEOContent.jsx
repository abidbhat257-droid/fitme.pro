import React from "react";
import { Link } from "react-router-dom";
import bmiPrimeFAQs from "@/lib/bmiPrimeFAQs";

const DATA = {
  "daily-calorie-needs": {
    title: "Daily Calorie Needs Calculator: How Many Calories Do You Need?",
    quick: "Daily calorie needs are an estimate of how much energy you need each day based on your age, sex, height, weight and activity level. FitMe Pro estimates resting energy first and then adjusts it for activity.",
    formula: "Mifflin-St Jeor BMR = 10W + 6.25H − 5A + S; daily needs ≈ BMR × activity factor.",
    inputs: "Age, sex, body weight, height and typical activity level. Use your usual activity rather than an unusually active or inactive week.",
    method: ["Convert height and weight to the required units.", "Estimate BMR with the Mifflin-St Jeor equation.", "Apply the selected activity factor to estimate daily energy expenditure.", "Use the result as a starting estimate and compare it with real-world weight and activity trends."],
    meaning: "Your result is an estimated daily calorie requirement, not a laboratory measurement. Around the estimated maintenance level, body weight may remain broadly stable over time, while consistently eating below or above it can support weight loss or gain.",
    example: "For a 30-year-old man weighing 70 kg at 175 cm with moderate activity, Mifflin-St Jeor gives a BMR of about 1,699 kcal/day; applying a 1.55 activity factor gives roughly 2,633 kcal/day.",
    limits: "Energy expenditure varies with individual physiology, activity, body composition and day-to-day movement. A calculator cannot directly observe every source of energy expenditure, so the result should be treated as a starting estimate.",
    links: [["BMR Calculator","/bmr-calculator"],["TDEE Calculator","/tdee-calculator"],["Calorie Deficit Calculator","/calorie-deficit-calculator"],["Macro Calculator","/macronutrient-calculator"],["Protein Calculator","/protein-calculator"]],
    faqs: [["How many calories do I need a day?","It depends on age, sex, height, weight and activity. The calculator estimates your personal daily requirement rather than using one number for everyone."],["Are daily calorie needs the same as TDEE?","In practical fitness planning, daily maintenance calories and TDEE are often used for the same estimated daily energy requirement."],["How accurate is a calorie calculator?","It provides an estimate. Your actual energy expenditure can differ, so use longer-term weight trends and activity to calibrate it."],["Should I eat exactly the number shown?","No. Treat it as a starting target and adjust gradually based on your goal and observed progress."],["Does exercise change calorie needs?","Yes. Activity contributes substantially to total daily energy expenditure."],["Can calorie needs change after losing weight?","Yes. A smaller body generally requires less energy, and activity may also change."],["Does age affect calorie needs?","Yes. Age is one of the inputs used by the BMR equation."],["Can I use this for medical nutrition decisions?","Not by itself. Medical nutrition needs can require individualized assessment by a qualified professional."]]
  },
  bmr: {
    title: "BMR Calculator: Calculate Your Basal Metabolic Rate",
    quick: "Basal Metabolic Rate (BMR) estimates the energy your body uses at rest to support essential functions such as breathing and circulation. It does not represent your total daily calorie requirement.",
    formula: "Mifflin-St Jeor: men BMR = 10W + 6.25H − 5A + 5; women BMR = 10W + 6.25H − 5A − 161.",
    inputs: "Age, sex, weight and height. The equation uses metric weight in kilograms and height in centimetres after unit conversion.",
    method: ["Enter age, sex, height and weight.", "Convert units if you use imperial measurements.", "Apply the Mifflin-St Jeor equation.", "Interpret BMR as a resting-energy estimate; multiply by an activity factor to estimate total daily needs."],
    meaning: "BMR is the foundation of many calorie calculators. It is lower than TDEE because TDEE also reflects physical activity, daily movement and the energy cost of processing food.",
    example: "A 30-year-old man at 70 kg and 175 cm has an estimated BMR of 10×70 + 6.25×175 − 5×30 + 5 = about 1,699 kcal/day.",
    limits: "BMR equations are population-based predictive models. They do not directly measure metabolic rate and can be less accurate for individuals whose physiology differs from the populations used to develop the equation.",
    links: [["TDEE Calculator","/tdee-calculator"],["Daily Calorie Needs Calculator","/daily-calorie-needs-calculator"],["Body Fat Calculator","/body-fat-calculator"],["Macro Calculator","/macronutrient-calculator"]],
    faqs: [["What does BMR stand for?","BMR stands for Basal Metabolic Rate, an estimate of energy expenditure at rest."],["Is BMR the same as maintenance calories?","No. Maintenance calories are generally estimated from total daily energy expenditure, which is higher than BMR for active people."],["Which BMR formula does FitMe Pro use?","FitMe Pro's core BMR calculator uses the Mifflin-St Jeor equation."],["Why is BMR different for men and women?","The Mifflin-St Jeor equation uses different constants to account for average differences represented in the original model."],["Does muscle affect BMR?","Body composition can influence resting energy expenditure, although a simple BMR equation cannot capture every individual difference."],["Can I increase my BMR?","Changes in body size and composition can affect resting energy expenditure, but there is no guaranteed way to raise a calculated BMR by a specific amount."],["Should I eat my BMR in calories?","BMR is not a recommended daily food target. Daily needs normally exceed resting requirements."],["How often should BMR be recalculated?","Recalculate when meaningful changes in body weight or other inputs occur rather than reacting to tiny day-to-day changes."]]
  },
  "ideal-body-weight": {
    title: "Ideal Body Weight Calculator: Devine Formula and What It Means",
    quick: "Ideal Body Weight (IBW) is a formula-based reference value, not a universal perfect weight. FitMe Pro uses the Devine equation and displays it as an estimate.",
    formula: "Devine: men = 50 + 2.3 × inches over 5 ft; women = 45.5 + 2.3 × inches over 5 ft.",
    inputs: "Height and sex. Height is converted to inches for the Devine equation.",
    method: ["Enter height and sex.", "Convert height to inches.", "Determine the inches above 5 feet.", "Apply the sex-specific Devine equation to estimate IBW."],
    meaning: "IBW was developed as a reference measure and is still encountered in clinical contexts, including some medication-dose calculations. It should not be treated as a personal aesthetic, athletic or medical target without context.",
    example: "For a 5 ft 9 in man, the Devine estimate is 50 + 2.3×9 = 70.7 kg. This is a formula result, not a statement that 70.7 kg is the only healthy weight.",
    limits: "A single height-based formula cannot account for muscle mass, body-fat distribution, age, ethnicity, health status or individual goals. Healthy weight is better considered as a range and in context.",
    links: [["Healthy Weight Range Calculator","/healthy-weight-range-calculator"],["BMI Calculator","/bmi-calculator"],["Body Fat Calculator","/body-fat-calculator"],["Target Weight Calculator","/target-weight-calculator"]],
    faqs: [
      ["How do I calculate my ideal body weight?","IBW is usually estimated from height with a formula such as Devine. It is a reference value, not a universal perfect weight."],
      ["What is the most accurate ideal body weight calculator?","No IBW formula is universally most accurate. Devine, Robinson, Miller and Hamwi use different assumptions, so results can vary."],
      ["How to check my ideal body weight online for free?","Enter your height and sex into an IBW calculator and check which formula it uses. Treat the result as an estimate rather than a medical target."],
      ["What is my ideal body weight based on height and frame size?","Traditional IBW is mainly height-based; some older systems also consider frame size. Body composition and waist size provide useful additional context."],
      ["How much should I weigh for my height and sex?","A sex-specific IBW formula can provide a reference estimate, but it does not establish one correct weight for every person."],
      ["What is the formula to calculate ideal body weight?","Several formulas exist. Devine uses 50 kg for men or 45.5 kg for women at 5 feet, plus 2.3 kg per inch above 5 feet."],
      ["Where can I find an ideal body weight chart for adults?","An IBW chart lists formula estimates by height and sex. A calculator is more flexible because it applies the selected formula to an exact height."],
      ["What is the standard target weight for optimal health?","There is no single standard target weight that guarantees optimal health. IBW is only a mathematical reference."],
      ["How is ideal body weight calculated in kilograms and pounds?","Most IBW formulas produce kilograms. Multiply kilograms by about 2.205 to convert the result to pounds."],
      ["What is a healthy ideal body weight for men and women?","IBW is not itself a definition of healthy weight. BMI, body composition, waist size and medical history add important context."],
      ["How to determine ideal body weight without BMI?","Use a height-based equation such as Devine, Hamwi, Robinson or Miller. These formulas estimate reference weight without requiring BMI."],
      ["Is ideal body weight calculation accurate for everyone?","No. Simple height-based formulas cannot fully account for muscularity, fat distribution, age, pregnancy or medical conditions."],
      ["What is the ideal body weight for a 5'2\" female?","Using Devine, a 5'2\" woman is estimated at about 50.1 kg or 110.5 lb. Other formulas may differ."],
      ["What is the ideal body weight for a 5'4\" woman in lbs?","Using Devine, a 5'4\" woman is estimated at about 54.7 kg or 120.6 lb."],
      ["What is the target ideal weight for a 5'6\" female in kg?","Using Devine, a 5'6\" woman is estimated at about 59.3 kg. This is a reference estimate, not a required target."],
      ["What is the ideal body weight for a 5'8\" male?","Using Devine, a 5'8\" man is estimated at about 68.4 kg or 150.8 lb."],
      ["What should a 5'10\" man weigh ideally?","Using Devine, a 5'10\" man is estimated at about 73.0 kg or 160.9 lb."],
      ["What is the ideal body weight for a 6'0\" male in pounds?","Using Devine, a 6-foot man is estimated at about 77.6 kg or 171.1 lb."],
      ["What is the ideal weight for a 5'0\" female?","Using Devine, a 5-foot woman is estimated at about 45.5 kg or 100.3 lb."],
      ["What is the ideal body weight for a 5'3\" woman?","Using Devine, a 5'3\" woman is estimated at about 52.4 kg or 115.5 lb."],
      ["What is the ideal body weight for a 5'5\" male in kg?","Using Devine, a 5'5\" man is estimated at about 61.5 kg. Other equations can give different values."],
      ["What is the ideal body weight for a 5'7\" man?","Using Devine, a 5'7\" man is estimated at about 66.1 kg or 145.7 lb."],
      ["What is the ideal weight for a 5'9\" female?","Using Devine, a 5'9\" woman is estimated at about 61.6 kg or 135.8 lb."],
      ["What is the ideal body weight for a 6'2\" male?","Using Devine, a 6'2\" man is estimated at about 82.2 kg or 181.2 lb."],
      ["Why is ideal body weight different for men and women of the same height?","Many traditional IBW equations use different baseline constants for men and women because they were developed with sex-specific assumptions."],
      ["How much extra weight is factored into ideal body weight formulas for males?","In Devine, men receive 2.3 kg for every inch above 5 feet after a 50 kg base. Other formulas use different increments."],
      ["What is the ideal body weight chart for short women under 5 feet?","Traditional equations can be less informative below their original height ranges. Treat the result as an estimate rather than a precise target."],
      ["What is the ideal body weight target for tall men over 6'3\"?","A formula can provide a numerical estimate for a tall man, but greater height does not make the result a precise target. Body composition still matters."],
      ["Should target weight calculations differ by biological sex?","Some IBW formulas are sex-specific, while adult BMI thresholds generally are not. The method should match the question being answered."],
      ["How to calculate ideal body weight for petite frame females?","Use measured height in the chosen equation rather than a generic petite chart. Frame size can add context but is not a universal clinical correction."],
      ["What is the Devine formula for ideal body weight calculation?","Devine uses 50 kg plus 2.3 kg per inch over 5 feet for men, and 45.5 kg plus 2.3 kg per inch for women."],
      ["How to calculate IBW using the Hamwi method?","Hamwi starts with a baseline at 5 feet and adds a fixed amount per additional inch, using different constants for men and women."],
      ["What is the Robinson formula for ideal body weight?","Robinson is a height-based equation with sex-specific constants. Its estimate can differ from Devine because the assumptions differ."],
      ["How does the Miller formula calculate target body weight?","Miller estimates reference weight from height using sex-specific constants and a different height coefficient from Devine."],
      ["What is the Broca index for ideal body weight?","The classic Broca index estimates reference weight from height in centimetres using a simple subtraction rule. It is an older method."],
      ["Which ideal body weight formula is considered the gold standard?","There is no universally accepted gold-standard IBW formula. Devine is widely used as a clinical reference, but other equations are also used."],
      ["How to manually calculate ideal body weight step-by-step?","Choose an equation, convert height to its required units, apply the baseline and height increment, and convert kilograms to pounds if needed."],
      ["What is the difference between Devine, Robinson, and Miller formulas?","Devine, Robinson and Miller use different baseline weights and height coefficients, so the same person can receive different estimates."],
      ["Why do IBW formulas add 5 lbs per inch over 5 feet?","Some historical equations use a fixed weight increment per inch above 5 feet. That increment is a model assumption, not a biological law."],
      ["How to calculate ideal body weight using the Lemmens formula?","Lemmens uses height and a BMI-related reference to estimate weight. It can produce a different result from traditional equations."],
      ["What is the Peterson equation for ideal body mass?","Peterson is a mathematical IBW model based on height and BMI-related assumptions. It remains an estimate rather than a universal optimum."],
      ["How does the BJK formula calculate ideal body weight?","BJK is another proposed IBW equation with its own assumptions. Its output should be treated as a reference estimate."],
      ["What formula is used for ideal body weight in clinical trials?","There is no single formula for all clinical trials. Protocols may specify actual, ideal, adjusted or another weight measure."],
      ["Why do different IBW calculators yield different results?","Different calculators may use Devine, Hamwi, Robinson, Miller, Peterson or another equation. Different assumptions produce different values."],
      ["What is the base height used in traditional IBW equations?","Many traditional equations use 5 feet as the baseline and then add a specified amount for each inch above that height."],
      ["How is ideal body weight used for drug dosage calculations?","IBW may be used for selected medications when a dosing protocol calls for it. The correct weight basis is drug-specific."],
      ["Why do doctors use ideal body weight instead of actual weight?","For some drugs and calculations, actual weight may not represent the relevant dosing measure. IBW can be used when clinical guidance specifies it."],
      ["What role does ideal body weight play in mechanical ventilation settings?","Predicted body weight based on height and sex can help guide ventilator tidal volume because lung size relates more closely to height than total mass."],
      ["How is ideal body weight used to calculate tidal volume in ICU patients?","Protective ventilation commonly uses predicted body weight with a prescribed millilitres-per-kilogram target. The exact target depends on the clinical situation."],
      ["Why is IBW important in kidney disease and dialysis dosing?","Some renal dosing decisions use specific weight estimates, but the correct measure depends on the drug, kidney function and protocol."],
      ["How do anesthesiologists calculate ideal body weight for anesthesia dosing?","Anesthesia drugs may use actual, ideal, lean or adjusted weight depending on the medication and patient characteristics."],
      ["What is adjusted body weight (ABW) vs ideal body weight (IBW)?","IBW is a height-based reference. Adjusted body weight modifies the difference between actual and ideal weight using a protocol-specific correction factor."],
      ["When should doctors use adjusted body weight instead of ideal body weight?","Some drug-dosing protocols use adjusted weight in obesity when neither actual nor ideal weight alone best represents drug distribution."],
      ["How to calculate adjusted body weight for patients with obesity?","A common equation is ABW = IBW + correction factor × (actual weight − IBW). The correction factor must come from the relevant protocol."],
      ["What percentage of actual body weight over IBW defines obesity clinically?","Obesity is not defined simply as a percentage above IBW. Clinical classifications commonly rely on BMI and other measures when appropriate."],
      ["Why is ideal body weight critical in nutritional support calculations?","Nutrition support may use weight estimates to calculate energy or protein needs, but the correct weight basis depends on the patient's condition and protocol."],
      ["How is ideal body weight calculated in pediatric medicine?","Adult IBW equations are generally not appropriate for children. Pediatric assessment uses age-, sex- and growth-based references."],
      ["What is the clinical significance of maintaining ideal body weight?","Maintaining a formula-derived IBW is not itself a clinical endpoint. Health also depends on body composition, metabolic health, fitness and medical conditions."],
      ["Does ideal body weight change as you get older?","Most traditional IBW equations do not automatically change with age. Older adults may need individualized assessment of muscle, function, nutrition and disease."],
      ["What is the ideal body weight for teenagers aged 13–19?","Adult IBW formulas should not be used as a simple adolescent target. Teen weight is assessed with age- and sex-specific growth references."],
      ["How to calculate ideal body weight for seniors over 65?","A traditional formula can produce an estimate for seniors, but frailty, muscle loss, disease and nutrition need to be considered."],
      ["Why is ideal body weight higher for older adults in geriatric care?","There is no universal rule that older adults should have a higher IBW. Weight goals should be individualized to function, nutrition and health."],
      ["What is the ideal body weight for children under 10?","Adult-style IBW formulas are not appropriate for young children. Pediatric growth charts are used instead."],
      ["How does puberty affect ideal body weight targets in adolescents?","Puberty changes height, muscle, fat and body proportions rapidly, so adult IBW formulas are not suitable for adolescent targets."],
      ["Is ideal body weight relevant during pregnancy?","Pregnancy should not be managed toward an IBW target. Pregnancy weight-gain recommendations use pre-pregnancy BMI and clinical guidance."],
      ["How to calculate ideal pre-pregnancy body weight?","A pre-pregnancy reference can be estimated with an adult IBW formula, but preconception care should also consider BMI, nutrition and medical conditions."],
      ["What is the ideal body weight target for postmenopausal women?","There is no universal postmenopausal IBW target. Body composition, waist size, strength and overall health add context."],
      ["Does menopausal hormone loss affect ideal body weight goals?","Menopause can change fat distribution and muscle mass, but it does not create a new universal IBW number."],
      ["How does ideal body weight differ for South Asian populations?","Traditional IBW formulas are generally not South Asian-specific. Some South Asian guidelines use lower BMI-risk thresholds because metabolic risk can occur at lower BMI."],
      ["What are the modified ideal body weight standards for East Asian adults?","There is no single universally accepted East Asian IBW formula. Population-specific BMI and metabolic-risk guidance may complement general estimates."],
      ["Is ideal body weight affected by ethnicity or race?","Traditional IBW equations generally do not adjust for race or ethnicity, although population-specific health-risk thresholds can affect interpretation."],
      ["How to estimate ideal body weight for young adults in college?","Once adult growth is complete, an adult IBW formula can provide a reference. Fitness, nutrition, body composition and health goals also matter."],
      ["How to adjust ideal body weight for a small, medium, or large frame?","Older systems may adjust for frame size, but there is no universally accepted modern correction. Body composition and waist measures are useful additions."],
      ["How to measure wrist circumference to determine body frame size for IBW?","Measure wrist circumference with a flexible tape around the wrist at a consistent point. Frame-size charts are approximate."],
      ["What is the frame size correction factor in ideal body weight calculations?","There is no single modern frame-size correction factor. Historical charts use different fixed or percentage adjustments."],
      ["Does a large frame add 10% to ideal body weight calculations?","A blanket 10% increase for a large frame is not a standard rule across IBW formulas."],
      ["Is ideal body weight accurate for bodybuilders and strength athletes?","IBW can be a reference for athletes, but it may be a poor target for highly muscular people because simple equations do not model exceptional lean mass."],
      ["Why does ideal body weight underestimate target weight for muscular people?","Most IBW equations do not directly account for unusually high muscle mass, so a muscular person's healthy weight can be above the formula estimate."],
      ["How to calculate ideal body weight for high-muscle athletes?","Use IBW only as a reference, then consider body-fat percentage, lean mass, performance, recovery, nutrition and health markers."],
      ["What is ideal lean body mass vs ideal total body weight?","Lean body mass is non-fat mass. Total body weight includes fat, muscle, bone, water and other tissues; traditional IBW estimates total weight."],
      ["How to calculate ideal weight based on target body fat percentage?","If lean mass is known, target weight can be estimated as lean mass divided by one minus the target body-fat fraction. Measurement error affects the result."],
      ["What is the ideal body weight range for endurance runners?","There is no universal runner IBW range. Energy availability, bone health, strength and sport-specific performance are more useful considerations."],
      ["Does bone density significantly change ideal body weight calculation?","Traditional IBW equations do not directly adjust for bone density. Bone health should be assessed separately when relevant."],
      ["How do I calculate my target weight if I have broad shoulders?","Shoulder width has no standard IBW correction. Muscle mass, body fat, waist size and health are more useful for setting a goal."],
      ["How to adjust ideal body weight for amputees?","Standard IBW formulas need special consideration after amputation because body mass and composition change. Clinical segment-weight methods may be used."],
      ["What is the difference between ideal body weight and BMI?","IBW is a formula-derived reference weight. BMI is weight divided by height squared and provides a standardized weight-for-height screening index."],
      ["Is ideal body weight better than body mass index for health tracking?","Neither is universally better. IBW gives a single formula estimate, while BMI provides a standardized screening measure with its own limitations."],
      ["What is the difference between healthy weight range and ideal body weight?","A healthy-weight range usually gives a span associated with selected BMI values. IBW generally gives one formula-derived reference value."],
      ["How does ideal body weight compare to waist-to-height ratio?","IBW estimates weight from height, while waist-to-height ratio focuses on central body size. They measure different aspects of health."],
      ["Is ideal body weight the same as target goal weight?","No. A target goal weight is a personal or clinical objective, while IBW is a mathematical reference."],
      ["Why can someone have a normal BMI but be above their ideal body weight?","Someone can fall within a healthy BMI category while weighing more than a particular IBW formula's reference value because the methods differ."],
      ["Should I focus on body fat percentage or ideal body weight?","Body-fat percentage adds body-composition information that IBW lacks, but it also has measurement error. Multiple measures give better context."],
      ["What is the difference between lean body mass and ideal body weight?","Lean body mass is non-fat mass, whereas IBW is usually an estimated total body weight. They are not interchangeable."],
      ["How does the Body Roundness Index (BRI) compare to ideal body weight?","BRI uses waist circumference, height and body shape to estimate body roundness. IBW is a height-based weight estimate, so they capture different information."],
      ["Is ideal body weight realistic for someone who has been overweight for years?","IBW can be a long-term reference, but it should not automatically become the immediate goal. Sustainable progress and lean-mass preservation matter."],
      ["How many calories do I need to eat to reach my ideal body weight?","IBW alone cannot determine calorie needs. Energy requirements depend on age, sex, size, activity, current weight and the desired rate of change."],
      ["How much weight do I need to lose to reach my ideal body weight?","If you are above the formula estimate, subtract IBW from current weight. That difference is mathematical and is not automatically the amount you should lose."],
      ["What is a realistic timeline to safely achieve ideal body weight?","The timeline depends on starting weight, health, medications and the size of the change. Gradual, sustainable progress is generally preferable."],
      ["Is it dangerous to weigh significantly below ideal body weight?","Being below an IBW estimate does not itself diagnose illness, but very low or unintentional weight can be associated with inadequate nutrition, low muscle or illness."],
      ["Should my personal goal weight match my calculated ideal body weight?","Not necessarily. A personal goal should consider body composition, health markers, lifestyle, preferences and professional guidance when appropriate."]
    ] tdee: {
    title: "TDEE Calculator: Calculate Total Daily Energy Expenditure",
    quick: "TDEE (Total Daily Energy Expenditure) estimates the calories you burn across a typical day. It starts with BMR and adjusts it using an activity factor.",
    formula: "TDEE = BMR × activity multiplier. FitMe Pro's BMR foundation uses Mifflin-St Jeor.",
    inputs: "Age, sex, height, weight and activity level. The activity choice should represent your typical overall routine, not just exercise sessions.",
    method: ["Estimate BMR from age, sex, height and weight.", "Select the activity level that best matches your normal week.", "Multiply BMR by the activity factor.", "Use TDEE as an estimated maintenance baseline and monitor actual trends before making large adjustments."],
    meaning: "TDEE is commonly used as an estimated maintenance-calorie number. Eating around it may support weight stability, while sustained intake below or above it can support weight loss or gain depending on the size of the energy difference and individual response.",
    example: "For a 30-year-old man weighing 70 kg at 175 cm, BMR is about 1,699 kcal/day. With moderate activity at 1.55, estimated TDEE is about 2,633 kcal/day.",
    limits: "Activity multipliers simplify a complex process. Daily movement, exercise intensity, body composition, sleep, illness and other factors can change actual energy expenditure.",
    links: [["BMR Calculator","/bmr-calculator"],["Daily Calorie Needs Calculator","/daily-calorie-needs-calculator"],["Calorie Deficit Calculator","/calorie-deficit-calculator"],["Calorie Surplus Calculator","/calorie-surplus-calculator"],["Macro Calculator","/macronutrient-calculator"]],
    faqs: [["What does TDEE stand for?","TDEE stands for Total Daily Energy Expenditure."],["Is TDEE the same as maintenance calories?","They are commonly used interchangeably in practical diet planning, because TDEE estimates total daily energy expenditure and therefore provides a maintenance baseline."],["How is TDEE calculated?","Estimate BMR and multiply it by an activity factor."],["What activity factor should I choose?","Choose the level that best represents your normal total activity. Avoid choosing a higher level simply because you exercise occasionally."],["Can TDEE change over time?","Yes. Changes in body weight, activity, body composition and routine can change energy needs."],["How can I know whether my TDEE estimate is close?","Compare the estimate with consistent calorie intake and multi-week weight trends rather than a single day's scale reading."],["Should I eat below TDEE to lose weight?","A sustained calorie deficit is generally required for weight loss, but the size of the deficit should be individualized and reasonable."],["Can I use TDEE to gain muscle?","TDEE can provide a maintenance baseline from which a modest calorie surplus may be planned alongside resistance training and adequate nutrition."]]
  },
  "maintenance-calories": {
    title: "Maintenance Calories Calculator: Find Your Estimated Daily Calorie Needs",
    quick: "Maintenance calories are the estimated amount of energy you need to keep body weight broadly stable over time. FitMe Pro estimates maintenance from BMR and activity.",
    formula: "Maintenance calories ≈ BMR × activity factor, which is the same core relationship used for TDEE.",
    inputs: "Age, sex, height, weight and activity level.",
    method: ["Enter your current body measurements and age.", "Estimate BMR.", "Apply the activity factor that matches your typical routine.", "Use the result as a starting maintenance target and calibrate it using a multi-week weight trend."],
    meaning: "Maintenance is a planning estimate, not a fixed biological number. Your real energy needs can vary from day to day, so the useful goal is a reasonable average rather than perfect precision.",
    example: "If estimated BMR is 1,699 kcal/day and the selected activity multiplier is 1.55, estimated maintenance is about 2,633 kcal/day.",
    limits: "A calculator cannot directly measure your daily energy expenditure. Changes in movement, training, body weight, food intake and other factors can move your actual maintenance level.",
    links: [["TDEE Calculator","/tdee-calculator"],["BMR Calculator","/bmr-calculator"],["Daily Calorie Needs Calculator","/daily-calorie-needs-calculator"],["Calorie Deficit Calculator","/calorie-deficit-calculator"],["Macro Calculator","/macronutrient-calculator"]],
    faqs: [["What are maintenance calories?","They are the estimated average calories needed to maintain body weight over time at a given activity level."],["Are maintenance calories and TDEE the same?","For practical calorie planning, yes, they are commonly treated as the same estimated baseline."],["Why does my weight change even at maintenance?","Water, glycogen, food volume and normal day-to-day variation can change scale weight even when average energy balance is near maintenance."],["How long should I track to estimate maintenance?","A consistent multi-week trend is more informative than a few days."],["Do maintenance calories decrease after weight loss?","They can, because a smaller body often requires less energy and activity may also change."],["Can I use maintenance calories for muscle gain?","They provide a baseline. Muscle-gain plans often add a modest surplus while resistance training and protein intake are considered."],["Can I use maintenance calories for fat loss?","They provide the baseline from which a calorie deficit can be planned."],["Is the calculator exact?","No. It is a predictive estimate and should be calibrated against your real-world trend."]]
  }
};

export default function Phase1SEOContent({ slug }) {
  const data = DATA[slug];
  if (!data) return null;
  return <div className="space-y-6" data-testid={`phase1-seo-${slug}`}>
    <section>
      <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight mb-3">{data.title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{data.quick}</p>
    </section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Quick Answer</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{data.quick}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Formula</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{data.formula}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">How It Is Calculated</h3><ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{data.method.map((x,i)=><li key={i}>{x}</li>)}</ol></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Inputs Explained</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{data.inputs}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">What Does My Result Mean?</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{data.meaning}</p></section>
    <section className="border border-border bg-card p-6"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Worked Example</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{data.example}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Accuracy & Limitations</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{data.limits}</p></section>
    <section><h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">Frequently Asked Questions</h3><div className="space-y-5">{data.faqs.map(([q,a])=><div key={q}><h4 className="font-semibold mb-1">{q}</h4><p className="text-sm text-muted-foreground leading-7">{a}</p></div>)}</div></section>
    <section><h3 className="font-display text-xl uppercase tracking-tight mb-3">Related Calculators</h3><div className="grid sm:grid-cols-2 gap-2">{data.links.map(([label,to])=><Link key={to} to={to} className="border border-border px-4 py-3 text-sm font-bold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors">{label}</Link>)}</div></section>
    <section className="border border-border p-6 bg-card"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Important Health Note</h3><p className="text-sm text-muted-foreground leading-7">FitMe Pro calculators provide educational estimates. They do not diagnose disease or replace individualized medical or nutrition advice. If you have a medical condition, are pregnant, have a history of disordered eating, or need a therapeutic diet, consult a qualified healthcare professional.</p></section>
    <section><h3 className="font-display text-xl uppercase tracking-tight mb-3">Scientific Method Note</h3><p className="text-sm text-muted-foreground leading-7">The calorie calculators use established predictive equations rather than direct metabolic measurement. For general calorie planning, the result is best used as a starting point and refined using consistent real-world data.</p></section>
  </div>;
}
