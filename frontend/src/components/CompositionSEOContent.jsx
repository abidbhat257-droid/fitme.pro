import React from "react";
import { Link } from "react-router-dom";

const PAGES = {
  "body-fat": {
    title: "Body Fat Percentage Calculator: How It Works and What It Means",
    quick: "Body-fat percentage estimates how much of your total body weight is fat. FitMe Pro uses the method shown in the calculator; treat the result as an estimate rather than a direct measurement.",
    formula: "Deurenberg estimate = 1.2 × BMI + 0.23 × age − 10.8 × sex − 5.4, where sex is coded 1 for male and 0 for female.",
    method: ["Enter accurate height, weight, age and sex.", "The calculator first derives BMI from height and weight.", "The selected body-fat equation uses BMI and age with a sex adjustment.", "The result is reported as an estimated percentage of body weight that is fat."],
    meaning: "Body-fat percentage is different from BMI because it attempts to describe body composition rather than only weight relative to height. A useful result should be interpreted with waist measurements, fitness, health history and trends.",
    limits: "Equation-based estimates can have meaningful individual error. They can be less representative for people with unusually high or low muscularity, different body-fat distributions, or characteristics outside the population used to develop the equation.",
    example: "An adult who is 175 cm, 70 kg and 30 years old has a BMI of about 22.9. Applying the displayed Deurenberg equation gives an estimated body-fat percentage; the estimate is not equivalent to a DEXA or other direct body-composition test.",
    related: ["/bmi-calculator", "/lean-body-mass-calculator", "/fat-mass-calculator", "/fat-free-mass-calculator", "/waist-to-height-ratio-calculator"],
    faqs: [["Is body-fat percentage the same as BMI?","No. BMI relates weight to height; body-fat percentage estimates the proportion of body weight that is fat."],["Is a calculator result exact?","No. Formula-based body-fat values are estimates and can differ from measured body composition."],["Why can athletes get surprising results?","BMI-based equations cannot fully account for unusually high muscle mass."],["What is the best way to track body fat?","Use the same method and conditions over time and focus on trends rather than a single reading."],["Can I use body-fat percentage to track fat loss?","It can be one useful metric, especially when combined with body weight, waist circumference and performance."],["Does hydration affect body-fat measurement?","Yes, especially with measurement methods that depend on electrical conductivity or other physical properties."],["Can women and men use the same equation?","Not necessarily. Many equations include sex-specific terms or separate formulas."],["Should I change my diet from one calculator result?","A single estimate should not dictate a major health decision. Consider your overall goals and professional advice."],["Does FitMe Pro diagnose obesity?","No. This calculator is educational and does not diagnose a medical condition."]]
  },
  "lean-body-mass": {
    title: "Lean Body Mass Calculator: Formula, Uses and Limitations",
    quick: "Lean body mass (LBM) is body weight minus estimated fat mass. It includes muscle, bone, organs, water and other non-fat tissues, so it is not the same thing as muscle mass.",
    formula: "LBM = body weight − estimated fat mass. If body-fat percentage is known, LBM = weight × (1 − body-fat fraction).",
    method: ["Measure body weight consistently.", "Obtain a body-fat estimate using the method selected by the calculator.", "Convert the percentage to a decimal fraction.", "Multiply weight by the non-fat fraction, or subtract estimated fat mass from total weight."],
    meaning: "LBM is useful for describing the non-fat portion of body weight and for following changes during weight management. It should not be interpreted as pure skeletal muscle.",
    limits: "LBM includes water and organs as well as muscle and bone. Because body-fat estimates themselves contain error, calculated LBM inherits that uncertainty.",
    example: "If someone weighs 80 kg and an estimated 20% of their weight is fat, estimated fat mass is 16 kg and LBM is about 64 kg.",
    related: ["/body-fat-calculator", "/fat-mass-calculator", "/fat-free-mass-calculator", "/ffmi-calculator", "/skeletal-muscle-mass-calculator"],
    faqs: [["Is lean body mass the same as muscle mass?","No. LBM includes muscle plus bone, organs, body water and other non-fat tissues."],["How is LBM calculated?","Usually by subtracting estimated fat mass from total body weight."],["Why does LBM change quickly?","Water and glycogen changes can alter body weight and therefore calculated LBM."],["Is LBM useful for athletes?","It can provide context, but performance and direct body-composition assessments may be more informative."],["Can LBM increase during fat loss?","It can, particularly with resistance training and adequate nutrition, although scale-based estimates are imperfect."],["Does LBM include water?","Yes. Body water is part of the lean component."],["What is a good LBM?","There is no single healthy LBM value independent of height, sex, age and body composition."],["Can LBM be used for calorie calculations?","Some metabolic equations use lean mass, but the appropriate equation depends on the purpose."],["Is calculated LBM exact?","No. It depends on the accuracy of the underlying body-fat estimate."]]
  },
  "fat-mass": {
    title: "Fat Mass Calculator: Estimate How Much of Your Weight Is Fat",
    quick: "Fat mass is the estimated weight of body fat. If body weight and body-fat percentage are available, fat mass is calculated by multiplying weight by the body-fat fraction.",
    formula: "Fat mass = body weight × (body-fat percentage ÷ 100).",
    method: ["Enter body weight.", "Enter or calculate body-fat percentage.", "Convert the percentage to a decimal.", "Multiply total weight by that fraction to estimate fat mass."],
    meaning: "Fat mass can make changes in body composition easier to understand than body weight alone. It is most useful when the same measurement method is repeated consistently.",
    limits: "The arithmetic is straightforward, but the result is only as accurate as the body-fat estimate. Short-term hydration changes can also affect scale weight and calculated values.",
    example: "At 80 kg body weight and 20% estimated body fat, fat mass is 80 × 0.20 = 16 kg. Estimated non-fat mass would therefore be 64 kg.",
    related: ["/body-fat-calculator", "/lean-body-mass-calculator", "/fat-free-mass-calculator", "/fmi-calculator"],
    faqs: [["What is fat mass?","Fat mass is the estimated amount of a person's body weight that consists of fat tissue."],["How do I calculate fat mass?","Multiply body weight by body-fat percentage expressed as a decimal."],["Is fat mass the same as body-fat percentage?","No. Percentage is a proportion; fat mass is an amount of weight."],["Can fat mass decrease while weight stays similar?","Yes. Changes in lean tissue and body water can offset fat loss on the scale."],["Why is my calculated fat mass changing daily?","Body weight and the body-fat estimate can both fluctuate."],["What should I track during fat loss?","Weight trend, waist circumference, performance and consistent body-composition measurements can be more useful together."],["Can I use fat mass to set a target?","It can help describe a target, but a safe target should consider individual circumstances."],["Is fat mass measurement accurate?","It is an estimate unless based on a validated measurement method, and even measurement methods have error."],["Does FitMe Pro diagnose excess body fat?","No. It provides an educational estimate only."]]
  },
  "fat-free-mass": {
    title: "Fat-Free Mass Calculator: Formula and Interpretation",
    quick: "Fat-free mass (FFM) is total body weight minus fat mass. It includes muscle, bone, organs and body water, so it is broader than skeletal muscle mass.",
    formula: "FFM = body weight × (1 − body-fat fraction) or FFM = body weight − fat mass.",
    method: ["Start with a measured body weight.", "Use a body-fat percentage or fat-mass estimate.", "Convert body-fat percentage to a fraction.", "Subtract fat mass from total weight to obtain estimated fat-free mass."],
    meaning: "FFM can be useful when comparing body-composition changes, calculating some normalized indices, or understanding why body weight alone may not reflect changes in muscle and other lean tissues.",
    limits: "FFM includes water and other tissues that can change without a comparable change in muscle. Any error in body-fat percentage carries into FFM.",
    example: "A person weighing 75 kg at an estimated 18% body fat has about 13.5 kg fat mass and 61.5 kg fat-free mass.",
    related: ["/body-fat-calculator", "/fat-mass-calculator", "/lean-body-mass-calculator", "/ffmi-calculator"],
    faqs: [["What is fat-free mass?","It is body weight excluding estimated fat mass."],["Is FFM the same as lean body mass?","The terms are often used similarly, although definitions can vary by context."],["Does FFM include water?","Yes. Body water is part of the fat-free component."],["Does FFM mean muscle?","No. It includes muscle but also bone, organs and water."],["Why does FFM fluctuate?","Hydration, glycogen and food intake can change scale-based estimates."],["How is FFMI related to FFM?","FFMI normalizes fat-free mass for height, making comparisons between different heights more meaningful."],["Can FFM increase during training?","Resistance training can increase lean tissue, but short-term water changes also affect the number."],["Is FFM useful for weight-loss planning?","It can help monitor whether weight change appears to involve lean mass, but it is not a clinical measurement."],["Is the calculator exact?","No. It depends on the underlying body-fat estimate."]]
  },
  "relative-fat-mass": {
    title: "Relative Fat Mass (RFM) Calculator: Formula and Meaning",
    quick: "Relative Fat Mass, or RFM, is an anthropometric estimate of body-fat percentage based primarily on height and waist circumference, with a sex-specific equation.",
    formula: "Common RFM equations use 64 − 20 × (height ÷ waist) + 12 × sex for men and 76 − 20 × (height ÷ waist) for women, with height and waist measured in the same units.",
    method: ["Measure height and waist consistently.", "Keep height and waist in the same unit.", "Apply the sex-specific RFM equation.", "Interpret the output as an estimate, not a direct body-fat measurement."],
    meaning: "RFM is designed to capture the relationship between waist size and height. It can provide a different perspective from BMI because waist circumference reflects body shape and central size.",
    limits: "Waist measurement technique, body shape, age and population differences can affect the estimate. An equation is not a substitute for a validated clinical body-composition assessment.",
    example: "For a hypothetical adult, using the same unit for a 175-unit height and 82-unit waist, the calculator applies the appropriate sex-specific RFM equation to estimate body-fat percentage.",
    related: ["/body-fat-calculator", "/waist-to-height-ratio-calculator", "/waist-to-hip-ratio-calculator", "/bmi-calculator"],
    faqs: [["What does RFM stand for?","Relative Fat Mass is an anthropometric estimate of body-fat percentage."],["What inputs does RFM use?","Height, waist circumference and sex are commonly used."],["Is RFM better than BMI?","They answer different questions. RFM uses waist and height, while BMI uses weight and height."],["How should I measure waist?","Use a consistent anatomical location and technique each time; follow the instructions provided with the calculator."],["Can RFM be used for everyone?","It is an estimate and may be less representative outside the populations in which the equation performs well."],["Does RFM measure visceral fat?","No. It does not directly measure visceral or abdominal fat."],["Can RFM replace a body-fat test?","No. It is a screening estimate."],["Why does RFM differ from another body-fat calculator?","Different equations use different inputs and were developed from different datasets."],["Is RFM a diagnosis?","No. It is an anthropometric estimate."]]
  },
  "body-adiposity-index": {
    title: "Body Adiposity Index (BAI) Calculator: Formula and Limitations",
    quick: "BAI estimates body-fat percentage from hip circumference and height. Unlike BMI, it does not require body weight.",
    formula: "BAI = hip circumference ÷ height^1.5 − 18, with hip and height expressed in consistent length units.",
    method: ["Measure hip circumference accurately.", "Measure height without shoes.", "Use the same length unit for both measurements.", "Apply the BAI equation and interpret the result as an estimate."],
    meaning: "BAI was developed as an anthropometric alternative for estimating adiposity without a scale. It is useful for understanding body-composition formulas, but it should not be treated as a definitive body-fat test.",
    limits: "BAI can be affected by body shape and population characteristics. Different equations may perform differently across age, sex and ethnic groups.",
    example: "If hip circumference is 100 cm and height is 1.75 m, the calculator converts units as required by its implementation and applies the BAI formula to produce an estimated percentage.",
    related: ["/body-fat-calculator", "/relative-fat-mass-calculator", "/waist-to-height-ratio-calculator", "/bmi-calculator"],
    faqs: [["What is BAI?","BAI is an anthropometric index intended to estimate body-fat percentage from hip circumference and height."],["Does BAI use weight?","No, the classic BAI equation does not require body weight."],["Is BAI the same as body-fat percentage measured by DEXA?","No. BAI is a predictive estimate, while DEXA is a measurement method with its own limitations."],["Why can BAI disagree with BMI?","They use different inputs and represent different aspects of body size."],["Does BAI work for athletes?","It may be less representative when body shape differs substantially from the populations used to develop the equation."],["How should hip circumference be measured?","Measure consistently at the instructed anatomical site and repeat under similar conditions."],["Can BAI diagnose obesity?","No. It is not a diagnostic test."],["Which calculator should I use?","Using complementary measures such as BMI, waist-to-height ratio and body-fat estimates can provide broader context."],["Can BAI track change?","It can be used as a trend measure if the same technique is used consistently."]]
  },
  "fat-mass-index": {
    title: "Fat Mass Index (FMI) Calculator: Formula and Interpretation",
    quick: "Fat Mass Index (FMI) expresses fat mass relative to height, helping distinguish changes in fat mass from body size.",
    formula: "FMI = fat mass in kilograms ÷ height in meters².",
    method: ["Estimate fat mass from body weight and body-fat percentage.", "Measure height in meters.", "Square height.", "Divide fat mass by squared height."],
    meaning: "FMI is a height-normalized body-composition index. It can be more descriptive than body weight alone when the question is specifically about the amount of fat relative to stature.",
    limits: "FMI inherits the uncertainty of the fat-mass measurement. There is no single universal FMI cutoff appropriate for every person and population.",
    example: "If estimated fat mass is 16 kg and height is 1.75 m, FMI = 16 ÷ 1.75² ≈ 5.2 kg/m².",
    related: ["/fat-mass-calculator", "/body-fat-calculator", "/ffmi-calculator", "/bmi-calculator"],
    faqs: [["What does FMI measure?","It expresses estimated fat mass relative to height squared."],["How is FMI different from BMI?","BMI uses total body weight; FMI uses estimated fat mass."],["What units does FMI use?","Commonly kg/m² when metric units are used."],["Is a higher FMI always unhealthy?","Interpretation depends on age, sex, population and overall health."],["Can FMI track fat loss?","Yes, as a trend if body-fat estimates are measured consistently."],["Does FMI require body-fat percentage?","To calculate FMI from ordinary scale data, you need an estimate of fat mass, often derived from body-fat percentage."],["Is FMI a medical diagnosis?","No. It is an index for body-composition analysis."],["Why can FMI change when weight barely changes?","A change in estimated fat mass can occur alongside a compensating change in lean mass."],["Is FMI accurate?","The mathematical calculation is straightforward, but its accuracy depends on the fat-mass estimate."]]
  },
  "fat-free-mass-index": {
    title: "Fat-Free Mass Index (FFMI) Calculator: Formula and Uses",
    quick: "FFMI expresses estimated fat-free mass relative to height. It is commonly used to describe muscularity or lean mass in a height-normalized way.",
    formula: "Basic FFMI = fat-free mass in kilograms ÷ height in meters². Some systems also use a height-normalized adjustment when comparing stature.",
    method: ["Estimate fat-free mass from weight and body-fat percentage.", "Measure height in meters.", "Square height.", "Divide fat-free mass by squared height; use any optional normalization exactly as specified by the calculator."],
    meaning: "FFMI can help compare lean mass across people of different heights more fairly than raw lean mass. It should not be interpreted as a direct measurement of muscle quality or athletic ability.",
    limits: "FFMI depends on body-fat estimation and contains water, bone and organs within fat-free mass. Reference ranges also vary by population and method.",
    example: "If fat-free mass is 64 kg and height is 1.75 m, basic FFMI = 64 ÷ 1.75² ≈ 20.9 kg/m².",
    related: ["/fat-free-mass-calculator", "/lean-body-mass-calculator", "/skeletal-muscle-mass-calculator", "/body-fat-calculator"],
    faqs: [["What is FFMI?","FFMI is fat-free mass normalized to height."],["Is FFMI a muscle index?","It is a lean-mass index, not a direct measurement of skeletal muscle."],["How is FFMI calculated?","Divide fat-free mass in kilograms by height in meters squared, with optional normalization depending on the method."],["Why use FFMI instead of lean mass?","Height normalization makes comparisons between different body sizes easier."],["Can FFMI increase during strength training?","It can if lean tissue increases, although hydration also affects estimates."],["Is there one ideal FFMI?","No. Interpretation depends on sex, age, population and measurement method."],["Does FFMI prove someone uses performance-enhancing drugs?","No. An index cannot establish drug use or another diagnosis."],["How accurate is FFMI?","It is only as accurate as the fat-free mass estimate and the input measurements."],["What should I pair with FFMI?","Consider body-fat percentage, waist measures, strength and performance for broader context."]]
  },
  "waist-to-hip-ratio": {
    title: "Waist-to-Hip Ratio Calculator: Formula and Health Context",
    quick: "Waist-to-hip ratio (WHR) is waist circumference divided by hip circumference. It describes body-fat distribution and body shape rather than total body weight.",
    formula: "WHR = waist circumference ÷ hip circumference, using the same unit for both measurements.",
    method: ["Measure waist at the recommended anatomical site.", "Measure hips at the widest appropriate point.", "Use the same unit for both measurements.", "Divide waist circumference by hip circumference."],
    meaning: "WHR provides information about the relative size of the waist compared with the hips. It can complement BMI because two people with the same BMI may have different fat distribution.",
    limits: "Cutoffs vary by guideline, sex and population. Measurement technique and body shape can materially affect the ratio, so one value should not be treated as a diagnosis.",
    example: "A waist of 82 cm and hips of 96 cm gives WHR = 82 ÷ 96 ≈ 0.85.",
    related: ["/waist-to-height-ratio-calculator", "/bmi-calculator", "/body-fat-calculator", "/waist-circumference-health-risk-calculator"],
    faqs: [["What is WHR?","It is the ratio of waist circumference to hip circumference."],["Why measure WHR?","It provides information about body shape and fat distribution."],["Is WHR better than BMI?","Neither replaces the other; they describe different aspects of body size and risk."],["How do I measure my waist?","Use a consistent location and technique and follow the calculator's measurement guidance."],["Can WHR change without much weight loss?","Yes. Waist and hip measurements can change at different rates."],["Does WHR directly measure visceral fat?","No. It is an indirect anthropometric measure."],["Are WHR thresholds universal?","No. Reference thresholds can differ by sex, population and guideline."],["Can muscular hips affect WHR?","Yes. The ratio reflects anatomy and body shape, not only adipose tissue."],["Is WHR a diagnosis?","No. It is a screening and descriptive measure."]]
  },
  "waist-to-height-ratio": {
    title: "Waist-to-Height Ratio Calculator: Formula and Interpretation",
    quick: "Waist-to-height ratio (WHtR) compares waist circumference with height. It is a simple measure of central body size that can complement BMI.",
    formula: "WHtR = waist circumference ÷ height, with waist and height in the same unit.",
    method: ["Measure waist circumference consistently.", "Measure height without shoes.", "Convert both to the same unit.", "Divide waist circumference by height."],
    meaning: "WHtR provides a height-adjusted view of waist size. Because waist circumference reflects central body size, it can add information that BMI does not provide.",
    limits: "Measurement location, technique, age, sex and population can affect interpretation. A ratio is not a diagnosis and should not be used alone to assess health.",
    example: "A waist of 82 cm and height of 175 cm gives WHtR = 82 ÷ 175 ≈ 0.469.",
    related: ["/waist-to-hip-ratio-calculator", "/bmi-calculator", "/body-fat-calculator", "/waist-circumference-health-risk-calculator"],
    faqs: [["What is WHtR?","It is waist circumference divided by height."],["Why use waist-to-height ratio?","It normalizes waist size for stature and can complement BMI."],["Do waist and height need the same units?","Yes. Use centimeters for both or inches for both."],["Is a lower WHtR always better?","Not necessarily; interpretation depends on the individual and clinical context."],["How often should I measure it?","For tracking, periodic measurements under consistent conditions are more useful than daily measurements."],["Does WHtR measure body fat directly?","No. It is an anthropometric indicator."],["Can WHtR be used with BMI?","Yes. The two measures provide different information and can be considered together."],["Can waist measurement be inaccurate?","Yes. Small differences in location, posture or breathing can change the result."],["Is WHtR suitable for children?","Children require age-appropriate growth and risk assessment rather than adult thresholds."]]
  },
  "a-body-shape-index": {
    title: "A Body Shape Index (ABSI) Calculator: Formula and Meaning",
    quick: "ABSI, or A Body Shape Index, combines waist circumference, BMI and height to describe waist size relative to overall body size.",
    formula: "ABSI = waist / (BMI^(2/3) × height^(1/2)), using compatible units according to the implementation.",
    method: ["Measure waist and height accurately.", "Calculate BMI from height and weight.", "Apply the ABSI equation using the calculator's units.", "Interpret ABSI as a population-derived anthropometric index rather than a diagnosis."],
    meaning: "ABSI was designed to capture central body shape beyond BMI. It can be useful for research-style risk stratification and for understanding how waist size differs from what BMI and height alone would suggest.",
    limits: "ABSI is sensitive to measurement error and population-specific interpretation. It should not be treated as an individual medical risk score without appropriate context.",
    example: "If waist, height and weight produce a BMI of about 22.9, the calculator combines that BMI with waist and height to derive ABSI.",
    related: ["/bmi-calculator", "/waist-to-height-ratio-calculator", "/waist-to-hip-ratio-calculator", "/body-roundness-index-calculator"],
    faqs: [["What is ABSI?","ABSI is an index combining waist circumference with BMI and height."],["Why was ABSI created?","It was designed to describe waist size independently of some effects of overall body size."],["Does ABSI measure visceral fat?","No. It is an indirect anthropometric index."],["Is ABSI better than BMI?","It provides different information; it does not replace BMI or clinical assessment."],["What inputs are required?","Typically waist circumference, height and weight, because BMI is needed."],["Can ABSI change after weight loss?","Yes, if waist, weight and height change, although height is usually stable in adults."],["Are ABSI reference values universal?","No. Interpretation can depend on population and statistical reference."],["Why is the formula complex?","The powers of BMI and height normalize waist circumference for body size."],["Is ABSI a diagnosis?","No. It is an anthropometric index."]]
  },
  "body-roundness-index": {
    title: "Body Roundness Index (BRI) Calculator: Formula and Interpretation",
    quick: "Body Roundness Index (BRI) uses waist circumference and height to estimate body shape on a continuum from more elongated to more centrally rounded body geometry.",
    formula: "BRI uses an equation derived from waist-to-height geometry; the calculator performs the mathematical steps so users do not need to calculate the square roots manually.",
    method: ["Measure waist circumference and height consistently.", "Enter the values in the calculator's supported units.", "The calculator applies the BRI geometric equation.", "Use the index as a descriptive estimate rather than a clinical diagnosis."],
    meaning: "BRI is intended to capture body shape and central adiposity more specifically than BMI. It can be useful alongside waist-to-height ratio and BMI.",
    limits: "BRI depends heavily on waist measurement quality and does not directly measure body fat or visceral fat. Reference interpretation can vary across populations.",
    example: "For a 175 cm adult with an 82 cm waist, the calculator applies its BRI equation to the waist-to-height relationship and returns an index value.",
    related: ["/waist-to-height-ratio-calculator", "/bmi-calculator", "/a-body-shape-index-calculator", "/body-fat-calculator"],
    faqs: [["What is BRI?","BRI is an anthropometric index intended to describe body shape and central adiposity."],["What does BRI use?","It primarily uses waist circumference and height."],["Is BRI the same as WHtR?","No. WHtR is a simple ratio, while BRI uses a geometric transformation of waist and height."],["Does BRI measure body fat?","It estimates body shape; it is not a direct body-fat measurement."],["Why is waist measurement important?","BRI depends on it, so consistent technique is essential."],["Can BRI be used for tracking?","Yes, as a trend metric when measurements are taken consistently."],["Is there one ideal BRI?","There is no universal individual target independent of population and context."],["Can BRI replace BMI?","No. It offers complementary information."],["Is BRI a medical diagnosis?","No."]]
  },
  "conicity-index": {
    title: "Conicity Index Calculator: Formula, Inputs and Meaning",
    quick: "The conicity index describes central body shape by comparing waist circumference with a theoretical body-size relationship involving weight and height.",
    formula: "Conicity Index = waist / (0.109 × √(weight / height)), with units handled consistently by the calculator implementation.",
    method: ["Measure waist circumference.", "Enter body weight and height.", "The calculator converts units where necessary.", "Apply the conicity equation to obtain the index."],
    meaning: "A higher conicity index generally reflects a more centrally concentrated body shape in population research. It can complement BMI and waist-based measures.",
    limits: "The formula is sensitive to measurement units and technique. Population-derived interpretation should not be converted into a personal diagnosis.",
    example: "With weight, height and waist entered consistently, the calculator evaluates the square-root size term and divides waist by it to produce the conicity index.",
    related: ["/waist-to-height-ratio-calculator", "/bmi-calculator", "/a-body-shape-index-calculator", "/body-roundness-index-calculator"],
    faqs: [["What does the conicity index measure?","It describes central body shape relative to body size."],["What inputs are needed?","Waist circumference, weight and height."],["Why is it called conicity?","The mathematical model represents a body shape becoming more cone-like as central size increases relative to overall size."],["Is it a body-fat percentage?","No."],["Does a higher value always mean disease?","No. It is an anthropometric index and must be interpreted in context."],["Why must units be handled carefully?","The equation depends on compatible measurement units."],["Can it be tracked over time?","Yes, provided waist, height and weight are measured consistently."],["Is it commonly used in routine care?","It is more specialized than BMI and waist circumference."],["Can it replace a clinical assessment?","No."]]
  },
  "ponderal-index": {
    title: "Ponderal Index Calculator: Formula and Uses",
    quick: "Ponderal Index (PI) relates body weight to height cubed. It is another way to normalize body size for stature and is especially useful when comparing body proportions.",
    formula: "Metric PI = weight (kg) ÷ height (m)^3. An alternative form may use weight in grams and height in centimeters.",
    method: ["Measure weight accurately.", "Measure height without shoes.", "Convert height to meters for the standard metric form.", "Cube height and divide weight by that value."],
    meaning: "Because height is cubed rather than squared, PI scales body mass differently from BMI. It is primarily a descriptive index and should not be confused with a health diagnosis.",
    limits: "Reference values depend on age, sex and population. The index is less familiar in routine adult health assessment than BMI.",
    example: "For 70 kg and 1.75 m, PI = 70 ÷ 1.75³ ≈ 13.1 kg/m³.",
    related: ["/bmi-calculator", "/healthy-weight-range-calculator", "/body-frame-size-calculator", "/body-surface-area-calculator"],
    faqs: [["What is Ponderal Index?","It is a weight-to-height index using height cubed."],["How is PI different from BMI?","BMI divides weight by height squared; PI divides weight by height cubed."],["What units are used?","The common metric form uses kg/m³."],["Is PI a measure of body fat?","No. It is a body-size index."],["Who uses Ponderal Index?","It is used in some anthropometric and growth contexts, though BMI is more common for adults."],["Can I compare PI across ages?","Only with appropriate age-specific reference data."],["Does PI diagnose underweight?","No. It is not a diagnosis."],["Can PI track body-size changes?","Yes, but consistent measurement and appropriate reference data are important."],["Why cube height?","The cubic relationship changes how body mass is normalized for stature."]]
  },
  "body-density": {
    title: "Body Density Calculator: Formula, Methods and Limitations",
    quick: "Body density is body mass divided by body volume. It is important in some body-composition methods because density can be used to estimate fat and fat-free components.",
    formula: "Body density = body mass ÷ body volume. The exact method depends on how body volume is estimated.",
    method: ["Enter the measurements required by the selected body-density method.", "Ensure mass and volume use compatible units.", "Divide mass by volume.", "If a downstream body-fat equation is used, interpret that estimate separately from density itself."],
    meaning: "Higher density generally indicates a greater proportion of dense fat-free tissue relative to lower-density fat, but density is not itself a body-fat percentage.",
    limits: "Accurate body volume is difficult to determine without specialized techniques such as hydrostatic weighing or air-displacement methods. Hydration and assumptions about tissue density can influence derived body composition.",
    example: "If body mass is 70 kg and estimated body volume is 68.0 L, density is approximately 1.029 kg/L. The exact output depends on the calculator's selected method and units.",
    related: ["/body-fat-calculator", "/fat-mass-calculator", "/fat-free-mass-calculator", "/lean-body-mass-calculator"],
    faqs: [["What is body density?","It is mass divided by body volume."],["Why is body density useful?","It can be used in body-composition models that distinguish tissues by density."],["Is body density body-fat percentage?","No. It is a physical density measure."],["How is body volume measured?","Specialized methods can estimate volume using water displacement or air displacement, while calculators may use equations."],["Does hydration matter?","Yes. Hydration assumptions affect body-composition interpretation."],["Can a scale measure body density directly?","A normal scale measures mass, not total body volume."],["Why do different methods disagree?","They use different measurements and assumptions."],["Is body density useful for tracking?","It can be, particularly with a consistent validated method."],["Is it a medical diagnosis?","No."]]
  },
  "body-surface-area": {
    title: "Body Surface Area (BSA) Calculator: Formula and Clinical Uses",
    quick: "Body surface area estimates the total external surface area of the body from height and weight. It is used in some clinical calculations, including selected medication dosing and physiologic indexing.",
    formula: "A common method is Mosteller BSA = √[(height in cm × weight in kg) ÷ 3600].",
    method: ["Enter height in centimeters and weight in kilograms.", "Multiply height by weight.", "Divide by 3600 for the Mosteller equation.", "Take the square root to obtain BSA in m²."],
    meaning: "BSA is a standardized estimate of body surface area. It is different from BMI because it combines height and weight to estimate surface area rather than weight category.",
    limits: "BSA equations are approximations and different formulas can give slightly different values. Clinical dosing decisions should follow the medication's approved guidance and a clinician's judgment.",
    example: "For 175 cm and 70 kg, Mosteller BSA = √(175 × 70 ÷ 3600) ≈ 1.85 m².",
    related: ["/bmi-calculator", "/ideal-body-weight-calculator", "/healthy-weight-range-calculator", "/body-density-calculator"],
    faqs: [["What is BSA?","Body surface area is an estimate of the body's external surface area, usually expressed in square meters."],["What formula does this calculator use?","The Mosteller formula is a common method: √[(height cm × weight kg)/3600]."],["Why is BSA used clinically?","Some clinical measurements and drug-dosing protocols use BSA-based normalization."],["Is BSA the same as BMI?","No. BMI classifies weight relative to height; BSA estimates surface area."],["Can different BSA formulas disagree?","Yes, because several equations exist."],["Should I calculate medication doses myself?","No. Medication dosing should follow professional instructions and product-specific guidance."],["Does BSA change with weight?","Yes. Because weight is an input, BSA changes as body weight changes."],["Is BSA useful in sports?","It can normalize some physiologic measurements, but it is not a general fitness score."],["Is BSA exact?","No. It is an estimate of surface area."]]
  },
  "body-frame-size": {
    title: "Body Frame Size Calculator: How It Is Estimated",
    quick: "Body frame size estimates whether a person's skeletal frame is relatively small, medium or large using height and wrist circumference, with sex-specific thresholds.",
    formula: "A common method uses height ÷ wrist circumference and compares the resulting ratio with sex-specific reference thresholds.",
    method: ["Measure height without shoes.", "Measure wrist circumference at the specified location.", "Use the same length unit for both.", "Divide height by wrist circumference and compare with the appropriate threshold."],
    meaning: "Frame size describes skeletal proportions rather than body fat or muscle. It can add context when considering body-size estimates such as ideal-weight formulas.",
    limits: "Frame-size categories are approximate and threshold systems differ. Wrist circumference does not capture every aspect of skeletal structure.",
    example: "At 175 cm height and a 17 cm wrist, the height-to-wrist ratio is about 10.3; the calculator compares that ratio with the selected sex-specific thresholds.",
    related: ["/ideal-body-weight-calculator", "/healthy-weight-range-calculator", "/bmi-calculator", "/ponderal-index-calculator"],
    faqs: [["What is body frame size?","It is an estimate of skeletal build, commonly categorized as small, medium or large."],["How is frame size calculated?","A common approach divides height by wrist circumference and applies sex-specific thresholds."],["Does frame size measure muscle?","No."],["Does frame size measure body fat?","No."],["Why does sex matter in the formula?","Reference thresholds differ because average body proportions vary between sexes."],["Can frame size change?","Adult skeletal frame size is generally stable, although measurement technique can vary."],["Does frame size determine ideal weight?","No. It is only one contextual factor in some weight-estimation formulas."],["Can two people with the same height have different frame sizes?","Yes, because skeletal proportions can differ."],["Is frame size a medical diagnosis?","No."]]
  },
  "total-body-water": {
    title: "Total Body Water Calculator: Estimate Body Water",
    quick: "Total body water (TBW) is the amount of water contained in the body. Formula-based estimates commonly use body weight with age- and sex-related assumptions.",
    formula: "A common simplified estimate uses a sex- and age-dependent fraction of body weight; the exact coefficient depends on the equation used.",
    method: ["Enter body weight and the demographic inputs required by the equation.", "The calculator selects the appropriate body-water fraction.", "Multiply body weight by that fraction.", "Treat the result as an estimate of total body water, not a measurement of current hydration status."],
    meaning: "TBW is a major component of body composition and is distributed between intracellular and extracellular compartments. It is not identical to the amount of water you should drink each day.",
    limits: "Body composition, age, sex, pregnancy, illness and hydration status can all affect the true value. A simple formula cannot capture every individual difference.",
    example: "If an equation estimates total body water as 60% of a 70 kg person's body weight, the estimate is 42 L. The coefficient is only an assumption and differs among people.",
    related: ["/water-intake-calculator", "/body-fat-calculator", "/lean-body-mass-calculator", "/bmi-calculator"],
    faqs: [["What is total body water?","It is the total amount of water contained in the body."],["Is TBW the same as daily water needs?","No. TBW describes body water; daily intake depends on fluid losses and many other factors."],["How is TBW estimated?","Many equations estimate it as a fraction of body weight based on demographic and body-composition assumptions."],["Does muscle contain water?","Yes. Lean tissues generally contain more water than fat tissue."],["Can TBW change?","Yes. Hydration, exercise, illness, diet and body composition can change body water."],["Is a calculator enough to diagnose dehydration?","No. Dehydration requires appropriate clinical assessment when significant."],["Why do men and women have different estimates?","Average body-composition differences affect water distribution assumptions."],["Can older adults have different TBW?","Yes. Average body-water fraction can change with age and body composition."],["Should I use TBW to set a drinking target?","No. Use an appropriate fluid-intake guide and consider individual circumstances."]]
  },
  "skeletal-muscle-mass": {
    title: "Skeletal Muscle Mass Calculator: What It Estimates",
    quick: "Skeletal muscle mass (SMM) is an estimate of the amount of skeletal muscle in the body. Formula-based calculators should be treated as approximations, not direct measurements.",
    formula: "The equation depends on the selected model and commonly uses variables such as height, weight, age, sex and/or body-composition estimates.",
    method: ["Enter all required demographic and body measurements.", "The calculator applies its published estimation equation.", "The result represents estimated skeletal muscle mass in the selected unit.", "Compare measurements using the same method and conditions over time."],
    meaning: "SMM is more specific than lean body mass because it focuses on skeletal muscle rather than all non-fat tissues. It can be useful for tracking resistance-training progress when the method is consistent.",
    limits: "Anthropometric equations can have individual error. Hydration and measurement conditions can also influence estimates. Direct methods such as imaging can provide different information.",
    example: "A 175 cm, 70 kg adult's SMM estimate depends on the exact equation and demographic inputs used; the calculator should be interpreted as an estimate rather than a laboratory measurement.",
    related: ["/lean-body-mass-calculator", "/fat-free-mass-calculator", "/ffmi-calculator", "/body-fat-calculator", "/strength-to-weight-ratio-calculator"],
    faqs: [["What is skeletal muscle mass?","It is the amount of skeletal muscle tissue, which is responsible for voluntary movement."],["Is SMM the same as lean body mass?","No. Lean body mass includes muscle plus bone, organs, water and other non-fat tissues."],["How accurate is an SMM calculator?","It is an estimate and can have meaningful individual error."],["Can SMM increase with resistance training?","Yes, progressive resistance training can stimulate muscle growth, although estimates also fluctuate for other reasons."],["Why can SMM change quickly?","Hydration and glycogen changes can affect some estimation methods."],["Is more muscle always healthier?","Not automatically; health depends on many factors including fitness, mobility, nutrition and medical status."],["Can SMM be used for athletes?","It can be a useful trend metric, but performance and validated measurements add important context."],["What should I track with SMM?","Consider strength, body weight, waist measurements, body-fat estimates and training performance."],["Is SMM a diagnosis?","No. It is an educational body-composition estimate."]]
  }
};

const labels = {
  "body-fat": "Body Fat Percentage", "lean-body-mass": "Lean Body Mass", "fat-mass": "Fat Mass", "fat-free-mass": "Fat-Free Mass",
  "relative-fat-mass": "Relative Fat Mass", "body-adiposity-index": "Body Adiposity Index", "fat-mass-index": "Fat Mass Index", "fat-free-mass-index": "Fat-Free Mass Index",
  "waist-to-hip-ratio": "Waist-to-Hip Ratio", "waist-to-height-ratio": "Waist-to-Height Ratio", "a-body-shape-index": "A Body Shape Index", "body-roundness-index": "Body Roundness Index",
  "conicity-index": "Conicity Index", "ponderal-index": "Ponderal Index", "body-density": "Body Density", "body-surface-area": "Body Surface Area",
  "body-frame-size": "Body Frame Size", "total-body-water": "Total Body Water", "skeletal-muscle-mass": "Skeletal Muscle Mass"
};

export default function CompositionSEOContent({ slug }) {
  const page = PAGES[slug];
  if (!page) return null;
  return (
    <article className="border-t border-border pt-10 mt-2 space-y-10" aria-label={`${labels[slug]} complete guide`}>
      <section>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)] mb-2">Complete Calculator Guide</div>
        <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter">{page.title}</h2>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-8">This original guide explains the definition, formula, inputs, calculation method, interpretation, limitations and practical uses of the {labels[slug]} calculator.</p>
      </section>

      <section className="border border-border bg-card p-6 sm:p-7">
        <h3 className="font-display text-xl uppercase tracking-tight mb-3">Quick Answer</h3>
        <p className="text-sm sm:text-base leading-8 text-muted-foreground"><strong className="text-foreground">{page.quick}</strong></p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">What Is {labels[slug]}?</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">{page.meaning}</p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Formula</h3>
        <div className="border border-border bg-card p-5 font-mono-data text-sm sm:text-base leading-8">{page.formula}</div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">How It Is Calculated</h3>
        <ol className="space-y-4 text-sm sm:text-base text-muted-foreground leading-8">{page.method.map((item, i) => <li key={item}><strong className="text-foreground">{i + 1}.</strong> {item}</li>)}</ol>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Worked Example</h3>
        <div className="border border-border bg-card p-6 text-sm sm:text-base text-muted-foreground leading-8">{page.example}</div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">What Your Result Can Tell You</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">Use the result to understand a particular aspect of body size or composition, then compare it with complementary measures. A number is more useful when the inputs are measured consistently and the same method is used over time.</p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Accuracy and Limitations</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">{page.limits} Mathematical precision should not be confused with biological precision: an equation can return several decimal places even when the underlying estimate has substantial uncertainty.</p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Better Measurements and Tracking</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-8">Measure under similar conditions, use reliable equipment, record units carefully and avoid comparing values collected with different techniques. For body-composition tracking, trends over several weeks are generally more informative than a single reading.</p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Related FitMe Pro Calculators</h3>
        <div className="grid sm:grid-cols-2 gap-2">{page.related.map((path) => <Link key={path} to={path} className="border border-border px-4 py-3 text-sm font-bold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors">{path.replace(/^\//, "").replace(/-calculator$/, "").split("-").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ")}</Link>)}</div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Frequently Asked Questions</h3>
        <div className="space-y-5">{page.faqs.map(([q, a]) => <div key={q} className="border-b border-border pb-5"><h4 className="font-bold text-sm sm:text-base">{q}</h4><p className="mt-2 text-sm text-muted-foreground leading-7">{a}</p></div>)}</div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-4">Scientific and Health References</h3>
        <ul className="space-y-2 text-sm text-muted-foreground leading-7">
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noreferrer">World Health Organization — Obesity and Overweight</a></li>
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.cdc.gov/healthy-weight-growth/about/index.html" target="_blank" rel="noreferrer">CDC — Healthy Weight and Growth</a></li>
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm" target="_blank" rel="noreferrer">NHLBI — Assessing Your Weight and Health Risk</a></li>
        </ul>
      </section>

      <section className="border border-border p-6 bg-card">
        <h3 className="font-display text-xl uppercase tracking-tight mb-3">Important Health Note</h3>
        <p className="text-sm text-muted-foreground leading-7">FitMe Pro calculators provide estimates for educational and informational purposes. They do not diagnose, treat, cure or prevent disease and do not replace professional medical assessment. If a result is concerning or is being used to make a medical decision, consult a qualified healthcare professional.</p>
      </section>
    </article>
  );
}
