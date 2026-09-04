import React from "react";

const DATA = {
  "weight-change": {
    title: "Weight Change Calculator",
    quick: "A weight-change calculator shows the difference between a starting weight and a current or target weight. It can express the change in kilograms or pounds and as a percentage.",
    formula: "Weight Change = Current Weight − Starting Weight; Change % = (Current − Starting) ÷ Starting × 100",
    method: ["Enter the starting weight.", "Enter the current or ending weight.", "Subtract starting weight from ending weight.", "Divide the change by starting weight when a percentage is needed."],
    inputs: ["Starting Weight", "Current Weight"],
    meaning: "A negative result means weight decreased; a positive result means weight increased. The number describes scale-weight change and does not identify what tissue changed.",
    example: "If weight changes from 85 kg to 80 kg, the change is −5 kg, which is a 5.9% decrease from the starting weight.",
    factors: "Hydration, glycogen, food contents, fat mass, lean tissue, activity, nutrition, medications, and measurement timing can all affect scale weight.",
    limitations: "A scale cannot determine from weight alone whether a change came from fat, muscle, water, glycogen, or other tissue. Short-term changes can be noisy, so trends are more useful than isolated readings.",
    faqs: [
      ["How is weight change calculated?", "Subtract the starting weight from the ending or current weight."],
      ["What does a negative weight change mean?", "It means the ending weight is lower than the starting weight."],
      ["Does weight change equal fat loss?", "No. Scale weight includes water, glycogen, lean tissue, fat, and other mass."],
      ["How do I calculate percentage weight change?", "Divide the weight change by the starting weight and multiply by 100."],
      ["Why can my weight change quickly?", "Fluid balance, glycogen, food volume, and measurement conditions can cause short-term changes."],
      ["Should I compare weights taken at different times of day?", "For useful trend tracking, use reasonably consistent conditions, such as similar time and clothing."],
      ["Can I use this for muscle gain?", "Yes, but pair scale weight with strength, measurements, and body-composition indicators because weight alone cannot identify muscle gain."],
      ["How often should I track weight?", "Choose a schedule you can follow consistently and evaluate the trend rather than reacting to every individual reading."]
    ],
    related: ["Weight Loss Percentage", "Weight Gain Percentage", "Target Weight", "Weight Loss Timeline"],
    guides: "Use weight change alongside FitMe Pro's weight-goal, calorie, body-composition, and nutrition tools rather than treating one scale measurement as a complete health assessment.",
    references: "CDC and WHO describe body weight and BMI as useful population-level measures but emphasize that weight-related assessment is broader than one number."
  },
  "weight-loss-timeline": {
    title: "Weight Loss Timeline Calculator",
    quick: "A weight-loss timeline estimates how long it could take to move from a starting weight to a target weight at a chosen average rate of loss. It is a planning estimate, not a guaranteed date.",
    formula: "Estimated Time = Weight to Lose ÷ Planned Average Weekly Loss",
    method: ["Enter starting and target weight.", "Calculate the amount of weight to lose.", "Enter an assumed average weekly rate of loss.", "Divide the planned weight change by the weekly rate and convert the result into weeks or an estimated date."],
    inputs: ["Starting Weight", "Target Weight", "Planned Weekly Weight Loss"],
    meaning: "The result is the number of weeks implied by the assumptions. Real progress rarely follows a perfectly straight line because energy needs and body weight change over time.",
    example: "If 10 kg must be lost and the planning rate is 0.5 kg per week, the simple estimate is 20 weeks.",
    factors: "Starting body size, energy intake, activity, metabolic adaptation, adherence, water balance, illness, medications, sleep, and changes in energy expenditure can affect the actual timeline.",
    limitations: "The calculator cannot predict an exact completion date. A constant weekly rate is a simplification, and aggressive targets may be inappropriate for some people. Pregnancy, eating disorders, medical conditions, and other clinical situations require individualized guidance.",
    faqs: [
      ["Can a weight-loss calculator predict my exact goal date?", "No. It provides a mathematical estimate based on an assumed average rate."],
      ["Why does real weight loss slow down?", "As body weight and energy needs change, the same food intake and activity can produce a different energy balance."],
      ["Is losing the same amount every week realistic?", "Not always. Weekly changes naturally fluctuate because of water, glycogen, food contents, and changing energy expenditure."],
      ["What rate should I enter?", "Use a realistic rate appropriate to your circumstances rather than choosing the fastest possible number."],
      ["Does the timeline measure fat loss?", "No. It is based on scale-weight change and cannot determine the composition of that change."],
      ["Should I recalculate the timeline?", "Yes, periodically reviewing the estimate with updated weight trends can make planning more realistic."],
      ["Why did I lose more or less than the estimate?", "The assumed rate is only a model; real energy intake, expenditure, water balance, and adherence vary."],
      ["When should I seek professional advice?", "Seek qualified guidance when weight change is medically important, unusually rapid, difficult to control, or associated with symptoms or a medical condition."]
    ],
    related: ["Weight Loss Percentage", "Weekly Weight Loss", "Calorie Deficit", "Target Weight"],
    guides: "Pair a timeline estimate with FitMe Pro's calorie-deficit and weight-change calculators and review actual trends over time.",
    references: "Weight-management guidance from major health organizations emphasizes sustainable, individualized approaches rather than treating a fixed mathematical timeline as a guarantee."
  },
  "goal-weight-date": {
    title: "Goal Weight Date Calculator",
    quick: "A goal-weight date calculator estimates when a target weight could be reached using a starting weight, target weight, and assumed average weekly rate of change. The date is an estimate rather than a promise.",
    formula: "Weeks to Goal = |Target Weight − Current Weight| ÷ Average Weekly Change; Estimated Date = Start Date + Weeks to Goal",
    method: ["Enter current and target weight.", "Calculate the total planned weight change.", "Enter an assumed average weekly change.", "Divide total change by weekly change and add the estimated weeks to the starting date."],
    inputs: ["Current Weight", "Target Weight", "Average Weekly Change", "Start Date"],
    meaning: "The displayed date is the calendar date implied by your assumptions. Actual progress can be earlier or later because body weight and energy requirements change over time.",
    example: "If 8 kg separates current and target weight and the assumed average change is 0.5 kg per week, the model gives 16 weeks; the date is 16 weeks after the selected start date.",
    factors: "Weekly rate, starting weight, target weight, adherence, activity, nutrition, fluid balance, metabolic changes, illness, and other circumstances can alter the real timeline.",
    limitations: "Calendar precision can make an uncertain biological process look more exact than it is. The calculated date should be used for planning, not as a deadline or medical target.",
    faqs: [
      ["How does the goal-weight date calculator work?", "It divides the planned weight change by an assumed average weekly rate and adds the resulting time to the chosen start date."],
      ["Is the goal date accurate?", "It is only as realistic as the assumptions. Actual weight change rarely follows a perfectly constant rate."],
      ["Can I use it for weight gain?", "Yes. The same time-based method can be used when the target weight is higher than current weight."],
      ["Why does the date change when I change weekly rate?", "A faster assumed rate produces fewer estimated weeks, while a slower rate produces more."],
      ["Should I treat the date as a deadline?", "No. It is better used as a planning reference than a rigid deadline."],
      ["Why can my actual date differ?", "Energy expenditure, adherence, water balance, body-composition changes, and normal fluctuations can shift the real trajectory."],
      ["How often should I update the estimate?", "Review it when your longer-term trend or target changes rather than recalculating from every daily fluctuation."],
      ["What if my weight stops changing?", "Review measurement consistency, the assumptions behind the plan, and relevant health factors; seek professional guidance when appropriate."]
    ],
    related: ["Weight Loss Timeline", "Weight Change", "Weekly Weight Loss", "Target Weight"],
    guides: "Use the date estimate with FitMe Pro's weight-change and timeline tools, while evaluating progress from longer-term trends.",
    references: "The date is a mathematical projection. Individual weight-management decisions should account for health status, nutrition, activity, and professional advice when needed."
  },
  "weekly-weight-loss": {
    title: "Weekly Weight Loss Calculator",
    quick: "A weekly weight-loss calculator estimates an average weekly change from total weight loss over a selected period, or estimates time from a chosen weekly rate. It helps describe pace without assuming every week will be identical.",
    formula: "Average Weekly Weight Loss = Total Weight Lost ÷ Number of Weeks",
    method: ["Determine starting and ending weight.", "Calculate total scale-weight loss.", "Determine the number of weeks in the period.", "Divide total loss by the number of weeks."],
    inputs: ["Starting Weight", "Current Weight", "Time Period"],
    meaning: "The result is an average rate across the selected period. Individual weekly weigh-ins may be above or below that average.",
    example: "If weight decreases from 90 kg to 84 kg over 12 weeks, the average weekly loss is 6 ÷ 12 = 0.5 kg per week.",
    factors: "Water and glycogen shifts, food intake, activity, energy expenditure, adherence, sleep, stress, illness, medications, and measurement timing can change weekly scale readings.",
    limitations: "An average weekly rate does not reveal body composition and should not be interpreted as a guaranteed future rate. Very rapid or unexplained weight changes warrant appropriate professional attention.",
    faqs: [
      ["How do I calculate weekly weight loss?", "Divide total weight lost by the number of weeks in the measurement period."],
      ["Should I lose the same amount every week?", "No. Normal fluctuations mean individual weeks can differ substantially from the average."],
      ["Does weekly weight loss equal weekly fat loss?", "No. Scale weight includes water, glycogen, lean tissue, fat, and other mass."],
      ["Why did I gain weight during a weight-loss week?", "Short-term water and food-volume changes can temporarily outweigh underlying fat-loss trends on the scale."],
      ["Is a faster weekly rate always better?", "No. A faster rate is not automatically safer or more appropriate and can be difficult to sustain."],
      ["How should I measure weekly progress?", "Use consistent measurement conditions and focus on the trend over several weeks."],
      ["Can I use this during weight gain?", "This calculator is designed to describe loss; a weight-change calculation can describe increases."],
      ["When should I update my rate?", "Reassess the average rate after enough consistent data has accumulated to show a meaningful trend."]
    ],
    related: ["Weight Loss Timeline", "Weight Loss Percentage", "Calorie Deficit", "Weight Change"],
    guides: "Combine weekly-rate tracking with FitMe Pro calorie and weight-change tools, using trends rather than single-week fluctuations.",
    references: "Weekly weight change is a descriptive mathematical metric. Appropriate goals depend on individual health and circumstances."
  },
  "calories-to-lose-1-kg": {
    title: "Calories to Lose 1 kg Calculator",
    quick: "This calculator estimates the cumulative energy deficit associated with losing 1 kg using a simplified energy-equivalent model. It is a planning estimate, not a promise that a fixed calorie deficit will produce exactly 1 kg of fat loss.",
    formula: "Estimated Deficit = Weight to Lose × Assumed Energy Equivalent per kg",
    method: ["Enter the amount of weight to lose, defaulting to 1 kg.", "Apply the calculator's assumed energy equivalent per kilogram.", "Use the result as an estimated cumulative deficit rather than a daily calorie target.", "Compare it with estimated maintenance calories when planning an overall approach."],
    inputs: ["Weight to Lose", "Assumed Energy Equivalent"],
    meaning: "The result represents a simplified energy-equivalent estimate. It does not mean that all of the weight lost will be body fat or that the same deficit will produce a fixed outcome in every person.",
    example: "Using a simplified 7,700 kcal-per-kg assumption, 1 kg corresponds to about 7,700 kcal of cumulative energy deficit in the model.",
    factors: "Body composition, adaptive changes in energy expenditure, water and glycogen shifts, food intake, activity, metabolic differences, and the duration of the deficit affect real-world weight change.",
    limitations: "The commonly used calorie-per-kilogram rule is a simplification. Human weight change is dynamic, and the energy content of tissue gained or lost is not identical in every situation. Do not use this number as a reason to create an extreme calorie deficit.",
    faqs: [
      ["How many calories are in 1 kg of fat?", "A commonly used planning approximation is about 7,700 kcal per kg, but real-world weight loss is more complex than this fixed conversion."],
      ["Does a 7,700 calorie deficit always mean 1 kg lost?", "No. It is a simplified model; actual scale and fat-mass changes vary over time."],
      ["Is this 7,700 kcal number scientifically exact?", "No. It is a useful approximation for simple calculations, not a universal biological constant."],
      ["Can I create a 7,700 calorie deficit in one day?", "That would be an extreme approach and should not be treated as a safe weight-loss strategy. Deficits should be planned conservatively and individually."],
      ["Does the calculator measure fat loss?", "No. It estimates an energy equivalent for weight change and cannot determine tissue composition."],
      ["Why does weight loss slow over time?", "As body weight and energy expenditure change, the same intake can produce a different energy balance."],
      ["Should I combine this with a TDEE calculator?", "TDEE can provide an estimate of maintenance energy, but it should be used as an estimate and adjusted using real-world trends."],
      ["Why is my actual weight change different?", "Water, glycogen, food contents, lean tissue, adaptive changes, and differences between estimated and actual energy expenditure can all contribute."]
    ],
    related: ["Calorie Deficit", "TDEE", "Weight Loss Timeline", "Weight Loss Percentage"],
    guides: "For planning, pair this estimate with FitMe Pro's TDEE, maintenance-calorie, calorie-deficit, and weight-loss timeline calculators.",
    references: "Energy-balance models are useful for estimation, but body-weight regulation is dynamic. FitMe Pro presents this calculation as an educational approximation rather than a fixed physiological law."
  }
};

function Section({ title, children }) {
  return <section><h3 className="font-display text-2xl uppercase tracking-tight mb-3">{title}</h3>{children}</section>;
}

export default function Phase6SEOContent({ slug }) {
  const d = DATA[slug];
  if (!d) return null;
  return <div className="space-y-8">
    <Section title="What Does My Result Mean?"><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.meaning}</p></Section>
    <Section title="Quick Answer"><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.quick}</p></Section>
    <Section title="Formula"><pre className="font-mono-data text-sm bg-card border border-border p-4 whitespace-pre-wrap">{d.formula}</pre></Section>
    <Section title="How It Is Calculated"><ol className="space-y-3">{d.method.map((x,i)=><li key={i} className="flex gap-3 text-sm sm:text-base text-muted-foreground leading-7"><span className="font-mono-data text-xs bg-[var(--brand-lime)] text-black px-2 py-0.5 h-fit">{String(i+1).padStart(2,"0")}</span><span>{x}</span></li>)}</ol></Section>
    <Section title="Inputs Explained"><div className="grid sm:grid-cols-2 gap-3">{d.inputs.map(x=><div key={x} className="border border-border bg-card p-4"><h4 className="font-bold text-sm">{x}</h4><p className="text-sm text-muted-foreground leading-7 mt-1">This input directly affects the calculation and should be measured consistently.</p></div>)}</div></Section>
    <Section title="Result Interpretation"><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.meaning}</p></Section>
    <Section title="Example"><div className="border border-border bg-card p-5"><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.example}</p></div></Section>
    <Section title="Factors That Affect Your Result"><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.factors}</p></Section>
    <Section title="Accuracy & Limitations"><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.limitations}</p></Section>
    <Section title="Frequently Asked Questions"><div className="space-y-4">{d.faqs.map(([q,a])=><div key={q} className="border-b border-border pb-4"><h4 className="font-bold text-sm mb-2">{q}</h4><p className="text-sm text-muted-foreground leading-7">{a}</p></div>)}</div></Section>
    <Section title="Related Calculators"><div className="grid sm:grid-cols-2 gap-2">{d.related.map(x=><p key={x} className="border border-border bg-card px-4 py-3 text-sm font-bold">{x}</p>)}</div></Section>
    <Section title="Related FitMe Pro Guides"><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.guides}</p></Section>
    <Section title="Scientific / Official References"><p className="text-sm sm:text-base text-muted-foreground leading-8">{d.references}</p></Section>
    <section className="border border-border bg-card p-6"><h3 className="font-display text-xl uppercase tracking-tight mb-3">Medical Disclaimer</h3><p className="text-sm text-muted-foreground leading-7">FitMe Pro calculators provide educational estimates and mathematical projections. They do not diagnose disease, prescribe treatment, or guarantee a specific health or fitness outcome. Do not use calculator results to make medication or extreme diet decisions without qualified professional guidance.</p></section>
  </div>;
}
