import { toMetric, getActivityFactor, formatWeight, formatLength, formatNumber } from "./units";
import { validateField } from "./validation";

// Categories
export const CATEGORIES = {
  basic: { key: "basic", label: "Basic", color: "#3B82F6" },
  composition: { key: "composition", label: "Body Composition", color: "#F97316" },
  shape: { key: "shape", label: "Body Shape", color: "#EC4899" },
  metabolism: { key: "metabolism", label: "Metabolism", color: "#EAB308" },
  advanced: { key: "advanced", label: "Advanced", color: "#EF4444" },
};

const ok = (...args) => args.every((a) => Number.isFinite(a));

// --------- helpers ---------
function bmiValue(w, hCm) {
  const m = hCm / 100;
  return w / (m * m);
}
function bmiCategory(bmi) {
  if (!Number.isFinite(bmi)) return null;
  if (bmi < 18.5) return { label: "Underweight", tone: "warn" };
  if (bmi < 25) return { label: "Normal", tone: "good" };
  if (bmi < 30) return { label: "Overweight", tone: "warn" };
  if (bmi < 35) return { label: "Obese Class I", tone: "bad" };
  if (bmi < 40) return { label: "Obese Class II", tone: "bad" };
  return { label: "Obese Class III", tone: "bad" };
}

function bodyFatDeurenberg(bmi, age, sex) {
  if (!ok(bmi, age)) return NaN;
  const s = sex === "male" ? 1 : 0;
  return 1.2 * bmi + 0.23 * age - 10.8 * s - 5.4;
}

function usNavyBF(sex, waist, neck, hip, height) {
  if (sex === "male") {
    if (!ok(waist, neck, height) || waist - neck <= 0) return NaN;
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  }
  if (!ok(waist, hip, neck, height) || waist + hip - neck <= 0) return NaN;
  return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
}

function ibwDevine(sex, hCm) {
  if (!ok(hCm)) return NaN;
  const inches = hCm / 2.54;
  const over5ft = Math.max(0, inches - 60);
  return sex === "male" ? 50 + 2.3 * over5ft : 45.5 + 2.3 * over5ft;
}

function bmrMifflin(w, h, a, sex) {
  if (!ok(w, h, a)) return NaN;
  return 10 * w + 6.25 * h - 5 * a + (sex === "male" ? 5 : -161);
}

function bodyFrame(sex, hCm, wristCm) {
  if (!ok(hCm, wristCm) || wristCm === 0) return null;
  const r = hCm / wristCm;
  if (sex === "male") {
    if (r > 10.4) return "Small";
    if (r >= 9.6) return "Medium";
    return "Large";
  }
  if (r > 11) return "Small";
  if (r >= 10.1) return "Medium";
  return "Large";
}

// --------- calculators ---------
export const CALCULATORS = [
  // ---- BASIC ----
  {
    id: "bmi",
    slug: "bmi",
    name: "BMI Calculator",
    category: "basic",
    requires: ["heightCm", "weightKg"],
    formula: "BMI = weight(kg) / height(m)²",
    compute: (s) => {
      const m = toMetric(s);
      const v = bmiValue(m.weightKg, m.heightCm);
      const cat = bmiCategory(v);
      return {
        value: formatNumber(v, 1),
        raw: v,
        unit: "kg/m²",
        category: cat?.label,
        tone: cat?.tone,
        range: "18.5–24.9",
        interpretation:
          "BMI screens weight relative to height. Not a direct body-fat measure but a solid population indicator.",
      };
    },
  },
  {
    id: "bmi-prime",
    slug: "bmi-prime",
    name: "BMI Prime",
    category: "basic",
    requires: ["heightCm", "weightKg"],
    formula: "BMI Prime = BMI / 25",
    compute: (s) => {
      const m = toMetric(s);
      const bmi = bmiValue(m.weightKg, m.heightCm);
      const v = bmi / 25;
      return {
        value: formatNumber(v, 2),
        raw: v,
        unit: "",
        category: v < 0.74 ? "Under" : v <= 1.0 ? "Optimal" : "Above",
        tone: v <= 1.0 && v >= 0.74 ? "good" : "warn",
        range: "0.74–1.00",
        interpretation:
          "BMI expressed as ratio to the upper limit of normal BMI. Values above 1.0 exceed the healthy range.",
      };
    },
  },
  {
    id: "healthy-weight-range",
    slug: "healthy-weight-range",
    name: "Healthy Weight Range",
    category: "basic",
    requires: ["heightCm"],
    formula: "Range = 18.5·h² to 24.9·h² (kg)",
    compute: (s) => {
      const m = toMetric(s);
      const h = m.heightCm / 100;
      const lo = 18.5 * h * h;
      const hi = 24.9 * h * h;
      return {
        value: `${formatWeight(lo, m.unit)} – ${formatWeight(hi, m.unit)}`,
        raw: (lo + hi) / 2,
        unit: "",
        category: "WHO Normal BMI",
        tone: "good",
        interpretation:
          "The weight range that corresponds to a normal BMI (18.5–24.9) for your height.",
      };
    },
  },
  {
    id: "ideal-body-weight",
    slug: "ideal-body-weight",
    name: "Ideal Body Weight",
    category: "basic",
    requires: ["heightCm", "sex"],
    formula: "Devine: male 50 + 2.3·(in-60); female 45.5 + 2.3·(in-60)",
    compute: (s) => {
      const m = toMetric(s);
      const v = ibwDevine(m.sex, m.heightCm);
      return {
        value: formatWeight(v, m.unit),
        raw: v,
        unit: "",
        category: "Devine Formula",
        tone: "good",
        interpretation:
          "Common clinical estimate used for medication dosing. Not a strict target for aesthetics or performance.",
      };
    },
  },
  {
    id: "weight-loss-goal",
    slug: "weight-loss-goal",
    name: "Weight Loss Goal",
    category: "basic",
    requires: ["weightKg", "goalWeightKg"],
    formula: "Δ = current − goal · (500 kcal deficit/day ≈ 0.45 kg/week)",
    compute: (s) => {
      const m = toMetric(s);
      const delta = m.weightKg - m.goalWeightKg;
      if (!Number.isFinite(delta) || delta <= 0) return { value: "—", tone: "neutral", interpretation: "Enter a goal weight lower than current weight." };
      const weeks = delta / 0.45;
      return {
        value: `${formatWeight(delta, m.unit)}`,
        raw: delta,
        category: `~${weeks.toFixed(0)} weeks at 500 kcal/day deficit`,
        tone: "good",
        interpretation:
          "Estimated fat loss timeline at a moderate 500 kcal/day deficit. Actual results vary with adherence.",
      };
    },
  },
  {
    id: "weight-gain-goal",
    slug: "weight-gain-goal",
    name: "Weight Gain Goal",
    category: "basic",
    requires: ["weightKg", "goalWeightKg"],
    formula: "Δ = goal − current · (300 kcal surplus/day ≈ 0.27 kg/week)",
    compute: (s) => {
      const m = toMetric(s);
      const delta = m.goalWeightKg - m.weightKg;
      if (!Number.isFinite(delta) || delta <= 0) return { value: "—", tone: "neutral", interpretation: "Enter a goal weight higher than current weight." };
      const weeks = delta / 0.27;
      return {
        value: `${formatWeight(delta, m.unit)}`,
        raw: delta,
        category: `~${weeks.toFixed(0)} weeks at 300 kcal/day surplus`,
        tone: "good",
        interpretation:
          "Lean gaining is best done slowly — a 300 kcal surplus limits fat gain while supporting muscle growth.",
      };
    },
  },

  // ---- BODY COMPOSITION ----
  {
    id: "body-fat",
    slug: "body-fat",
    name: "Body Fat Percentage",
    category: "composition",
    requires: ["heightCm", "weightKg", "age", "sex"],
    formula: "Deurenberg: 1.2·BMI + 0.23·Age − 10.8·sex − 5.4",
    compute: (s) => {
      const m = toMetric(s);
      const bmi = bmiValue(m.weightKg, m.heightCm);
      const v = bodyFatDeurenberg(bmi, m.age, m.sex);
      const cat = v < 0 ? null : (m.sex === "male"
        ? (v < 8 ? "Essential" : v < 20 ? "Fit" : v < 25 ? "Average" : "High")
        : (v < 14 ? "Essential" : v < 25 ? "Fit" : v < 32 ? "Average" : "High"));
      return {
        value: formatNumber(v, 1) + "%",
        raw: v,
        category: cat,
        tone: cat === "High" ? "bad" : cat === "Fit" ? "good" : "warn",
        range: m.sex === "male" ? "10–20%" : "18–28%",
        interpretation:
          "Estimated total body fat percentage using the Deurenberg equation (BMI-based).",
      };
    },
  },
  {
    id: "navy-body-fat",
    slug: "navy-body-fat",
    name: "US Navy Body Fat",
    category: "composition",
    requires: ["heightCm", "sex", "waistCm", "neckCm", "hipCm"],
    formula: "Uses log10 of waist, neck (± hip) & height",
    compute: (s) => {
      const m = toMetric(s);
      const v = usNavyBF(m.sex, m.waistCm, m.neckCm, m.hipCm, m.heightCm);
      return {
        value: formatNumber(v, 1) + "%",
        raw: v,
        category: m.sex === "male"
          ? (v < 20 ? "Fit" : v < 25 ? "Average" : "High")
          : (v < 25 ? "Fit" : v < 32 ? "Average" : "High"),
        tone: v < (m.sex === "male" ? 20 : 25) ? "good" : v < (m.sex === "male" ? 25 : 32) ? "warn" : "bad",
        range: m.sex === "male" ? "10–20%" : "18–28%",
        interpretation: "US Navy circumference-based body fat estimate — reasonably accurate for most healthy adults.",
      };
    },
  },
  {
    id: "relative-fat-mass",
    slug: "relative-fat-mass",
    name: "Relative Fat Mass",
    category: "composition",
    requires: ["heightCm", "waistCm", "sex"],
    formula: "RFM = 64 − (20·h/waist) + (12·sex_f)",
    compute: (s) => {
      const m = toMetric(s);
      if (!ok(m.heightCm, m.waistCm)) return { value: "—", tone: "neutral" };
      const v = 64 - (20 * m.heightCm) / m.waistCm + (m.sex === "female" ? 12 : 0);
      return {
        value: formatNumber(v, 1) + "%",
        raw: v,
        category: v < 25 ? "Lean" : v < 35 ? "Average" : "High",
        tone: v < 25 ? "good" : v < 35 ? "warn" : "bad",
        interpretation: "RFM estimates body fat using only height and waist. Correlates well with DXA scans.",
      };
    },
  },
  {
    id: "body-adiposity-index",
    slug: "body-adiposity-index",
    name: "Body Adiposity Index",
    category: "composition",
    requires: ["hipCm", "heightCm"],
    formula: "BAI = (hip / height^1.5) − 18",
    compute: (s) => {
      const m = toMetric(s);
      if (!ok(m.hipCm, m.heightCm)) return { value: "—", tone: "neutral" };
      const hM = m.heightCm / 100;
      const v = (m.hipCm / 100) / Math.pow(hM, 1.5) * 100 - 18;
      return {
        value: formatNumber(v, 1) + "%",
        raw: v,
        category: v < 25 ? "Healthy" : v < 33 ? "Overweight" : "Obese",
        tone: v < 25 ? "good" : v < 33 ? "warn" : "bad",
        interpretation: "Alternative body-fat estimate using hip circumference and height only.",
      };
    },
  },
  {
    id: "lean-body-mass",
    slug: "lean-body-mass",
    name: "Lean Body Mass",
    category: "composition",
    requires: ["heightCm", "weightKg", "sex"],
    formula: "Boer: male 0.407·W + 0.267·H − 19.2; female 0.252·W + 0.473·H − 48.3",
    compute: (s) => {
      const m = toMetric(s);
      const v = m.sex === "male"
        ? 0.407 * m.weightKg + 0.267 * m.heightCm - 19.2
        : 0.252 * m.weightKg + 0.473 * m.heightCm - 48.3;
      return {
        value: formatWeight(v, m.unit),
        raw: v,
        category: "Boer formula",
        tone: "good",
        interpretation: "Lean body mass = everything that isn't fat: muscle, bones, organs, water.",
      };
    },
  },
  {
    id: "fat-mass",
    slug: "fat-mass",
    name: "Fat Mass",
    category: "composition",
    requires: ["heightCm", "weightKg", "age", "sex"],
    formula: "Fat Mass = weight · (BF% / 100)",
    compute: (s) => {
      const m = toMetric(s);
      const bmi = bmiValue(m.weightKg, m.heightCm);
      const bf = bodyFatDeurenberg(bmi, m.age, m.sex);
      const v = m.weightKg * (bf / 100);
      return {
        value: formatWeight(v, m.unit),
        raw: v,
        category: "Estimated",
        tone: "warn",
        interpretation: "Total kilograms/pounds of adipose tissue, estimated from body fat %.",
      };
    },
  },
  {
    id: "fat-free-mass",
    slug: "fat-free-mass",
    name: "Fat-Free Mass",
    category: "composition",
    requires: ["heightCm", "weightKg", "age", "sex"],
    formula: "FFM = weight − fat mass",
    compute: (s) => {
      const m = toMetric(s);
      const bmi = bmiValue(m.weightKg, m.heightCm);
      const bf = bodyFatDeurenberg(bmi, m.age, m.sex);
      const v = m.weightKg * (1 - bf / 100);
      return {
        value: formatWeight(v, m.unit),
        raw: v,
        category: "Estimated",
        tone: "good",
        interpretation: "Everything in your body minus fat — muscle, bone, and organs.",
      };
    },
  },
  {
    id: "ffmi",
    slug: "ffmi",
    name: "Fat-Free Mass Index",
    category: "composition",
    requires: ["heightCm", "weightKg", "age", "sex"],
    formula: "FFMI = FFM(kg) / height(m)²",
    compute: (s) => {
      const m = toMetric(s);
      const bmi = bmiValue(m.weightKg, m.heightCm);
      const bf = bodyFatDeurenberg(bmi, m.age, m.sex);
      const ffm = m.weightKg * (1 - bf / 100);
      const hM = m.heightCm / 100;
      const v = ffm / (hM * hM);
      const cat = m.sex === "male"
        ? (v < 18 ? "Below average" : v < 22 ? "Average" : v < 25 ? "Muscular" : "Very muscular")
        : (v < 15 ? "Below average" : v < 18 ? "Average" : v < 20 ? "Muscular" : "Very muscular");
      return {
        value: formatNumber(v, 1),
        raw: v,
        unit: "kg/m²",
        category: cat,
        tone: "good",
        interpretation: "FFMI benchmarks muscularity independent of body fat.",
      };
    },
  },

  // ---- BODY SHAPE ----
  {
    id: "waist-hip-ratio",
    slug: "waist-hip-ratio",
    name: "Waist-to-Hip Ratio",
    category: "shape",
    requires: ["waistCm", "hipCm", "sex"],
    formula: "WHR = waist / hip",
    compute: (s) => {
      const m = toMetric(s);
      const v = m.waistCm / m.hipCm;
      const limit = m.sex === "male" ? 0.9 : 0.85;
      return {
        value: formatNumber(v, 2),
        raw: v,
        category: v < limit ? "Low risk" : v < limit + 0.1 ? "Moderate" : "High risk",
        tone: v < limit ? "good" : v < limit + 0.1 ? "warn" : "bad",
        range: m.sex === "male" ? "< 0.90" : "< 0.85",
        interpretation: "WHR flags central adiposity — an independent risk factor for cardiovascular disease.",
      };
    },
  },
  {
    id: "waist-height-ratio",
    slug: "waist-height-ratio",
    name: "Waist-to-Height Ratio",
    category: "shape",
    requires: ["waistCm", "heightCm"],
    formula: "WHtR = waist / height",
    compute: (s) => {
      const m = toMetric(s);
      const v = m.waistCm / m.heightCm;
      return {
        value: formatNumber(v, 2),
        raw: v,
        category: v < 0.4 ? "Slim" : v < 0.5 ? "Healthy" : v < 0.6 ? "Overweight" : "Obese",
        tone: v < 0.5 ? "good" : v < 0.6 ? "warn" : "bad",
        range: "< 0.50",
        interpretation: "‘Keep your waist under half your height’ — a robust marker across ages and ethnicities.",
      };
    },
  },
  {
    id: "absi",
    slug: "absi",
    name: "A Body Shape Index",
    category: "shape",
    requires: ["waistCm", "heightCm", "weightKg"],
    formula: "ABSI = waist / (BMI^(2/3) · height^(1/2))",
    compute: (s) => {
      const m = toMetric(s);
      const bmi = bmiValue(m.weightKg, m.heightCm);
      const hM = m.heightCm / 100;
      const waistM = m.waistCm / 100;
      const v = waistM / (Math.pow(bmi, 2 / 3) * Math.sqrt(hM));
      return {
        value: formatNumber(v, 4),
        raw: v,
        category: v < 0.079 ? "Low mortality risk" : v < 0.083 ? "Average" : "High mortality risk",
        tone: v < 0.079 ? "good" : v < 0.083 ? "warn" : "bad",
        interpretation: "ABSI captures abdominal obesity independent of BMI. Higher values predict all-cause mortality.",
      };
    },
  },
  {
    id: "bri",
    slug: "bri",
    name: "Body Roundness Index",
    category: "shape",
    requires: ["waistCm", "heightCm"],
    formula: "BRI = 364.2 − 365.5·√(1 − (waist/(2π))² / (0.5·height)²)",
    compute: (s) => {
      const m = toMetric(s);
      const hM = m.heightCm / 100;
      const waistM = m.waistCm / 100;
      const inner = 1 - Math.pow(waistM / (2 * Math.PI), 2) / Math.pow(0.5 * hM, 2);
      const v = inner < 0 ? NaN : 364.2 - 365.5 * Math.sqrt(inner);
      return {
        value: formatNumber(v, 2),
        raw: v,
        category: v < 3.41 ? "Lean" : v < 4.5 ? "Average" : v < 5.46 ? "Overweight" : "Obese",
        tone: v < 4.5 ? "good" : v < 5.46 ? "warn" : "bad",
        interpretation: "BRI models the human body as an ellipse. Higher = rounder = more visceral fat.",
      };
    },
  },
  {
    id: "conicity-index",
    slug: "conicity-index",
    name: "Conicity Index",
    category: "shape",
    requires: ["waistCm", "heightCm", "weightKg"],
    formula: "CI = waist / (0.109·√(weight/height))",
    compute: (s) => {
      const m = toMetric(s);
      const hM = m.heightCm / 100;
      const waistM = m.waistCm / 100;
      const v = waistM / (0.109 * Math.sqrt(m.weightKg / hM));
      return {
        value: formatNumber(v, 2),
        raw: v,
        category: v < 1.25 ? "Healthy" : "Elevated",
        tone: v < 1.25 ? "good" : "warn",
        range: "1.00–1.25",
        interpretation: "Conicity index models body shape as a double cone. Higher values indicate central fat.",
      };
    },
  },
  {
    id: "body-frame-size",
    slug: "body-frame-size",
    name: "Body Frame Size",
    category: "shape",
    requires: ["heightCm", "wristCm", "sex"],
    formula: "r = height / wrist circumference",
    compute: (s) => {
      const m = toMetric(s);
      const frame = bodyFrame(m.sex, m.heightCm, m.wristCm);
      if (!frame) return { value: "—", category: "Enter wrist circumference", tone: "neutral" };
      return {
        value: frame,
        raw: m.heightCm / m.wristCm,
        category: `${frame} frame`,
        tone: "good",
        interpretation: "Frame size affects healthy weight ranges. Requires wrist circumference.",
      };
    },
  },

  // ---- METABOLISM ----
  {
    id: "bmr",
    slug: "bmr",
    name: "Basal Metabolic Rate",
    category: "metabolism",
    requires: ["heightCm", "weightKg", "age", "sex"],
    formula: "Mifflin-St Jeor: 10W + 6.25H − 5A + (male +5, female −161)",
    compute: (s) => {
      const m = toMetric(s);
      const v = bmrMifflin(m.weightKg, m.heightCm, m.age, m.sex);
      return {
        value: formatNumber(v, 0),
        raw: v,
        unit: "kcal/day",
        category: "Mifflin-St Jeor",
        tone: "good",
        interpretation: "Calories your body burns at complete rest to maintain basic functions.",
      };
    },
  },
  {
    id: "tdee",
    slug: "tdee",
    name: "Total Daily Energy Expenditure",
    category: "metabolism",
    requires: ["heightCm", "weightKg", "age", "sex", "activity"],
    formula: "TDEE = BMR × activity factor",
    compute: (s) => {
      const m = toMetric(s);
      const bmr = bmrMifflin(m.weightKg, m.heightCm, m.age, m.sex);
      const v = bmr * getActivityFactor(m.activity);
      return {
        value: formatNumber(v, 0),
        raw: v,
        unit: "kcal/day",
        category: "Maintenance",
        tone: "good",
        interpretation: "Total calories you burn per day including movement and digestion.",
      };
    },
  },
  {
    id: "daily-calorie-needs",
    slug: "daily-calorie-needs",
    name: "Daily Calorie Needs",
    category: "metabolism",
    requires: ["heightCm", "weightKg", "age", "sex", "activity"],
    formula: "Same as TDEE",
    compute: (s) => {
      const m = toMetric(s);
      const bmr = bmrMifflin(m.weightKg, m.heightCm, m.age, m.sex);
      const v = bmr * getActivityFactor(m.activity);
      return {
        value: formatNumber(v, 0),
        raw: v,
        unit: "kcal/day",
        category: "Maintain weight",
        tone: "good",
        interpretation: "Eat this many calories per day to maintain your current weight.",
      };
    },
  },
  {
    id: "calorie-deficit",
    slug: "calorie-deficit",
    name: "Calorie Deficit",
    category: "metabolism",
    requires: ["heightCm", "weightKg", "age", "sex", "activity"],
    formula: "Deficit = TDEE − 500 (moderate); −250 (mild)",
    compute: (s) => {
      const m = toMetric(s);
      const bmr = bmrMifflin(m.weightKg, m.heightCm, m.age, m.sex);
      const tdee = bmr * getActivityFactor(m.activity);
      const mild = tdee - 250;
      const mod = tdee - 500;
      return {
        value: `${mod.toFixed(0)} kcal`,
        raw: mod,
        category: `Mild: ${mild.toFixed(0)} · Moderate: ${mod.toFixed(0)}`,
        tone: "good",
        interpretation: "Suggested calorie intake for fat loss — a 500 kcal daily deficit ≈ 0.45 kg/week loss.",
      };
    },
  },
  {
    id: "calorie-surplus",
    slug: "calorie-surplus",
    name: "Calorie Surplus",
    category: "metabolism",
    requires: ["heightCm", "weightKg", "age", "sex", "activity"],
    formula: "Surplus = TDEE + 300 (lean gain); +500 (aggressive)",
    compute: (s) => {
      const m = toMetric(s);
      const bmr = bmrMifflin(m.weightKg, m.heightCm, m.age, m.sex);
      const tdee = bmr * getActivityFactor(m.activity);
      const lean = tdee + 300;
      const agg = tdee + 500;
      return {
        value: `${lean.toFixed(0)} kcal`,
        raw: lean,
        category: `Lean: ${lean.toFixed(0)} · Aggressive: ${agg.toFixed(0)}`,
        tone: "good",
        interpretation: "Calorie intake for muscle gain. A lean surplus limits fat gain while supporting growth.",
      };
    },
  },

  // ---- ADVANCED ----
  {
    id: "body-surface-area",
    slug: "body-surface-area",
    name: "Body Surface Area",
    category: "advanced",
    requires: ["heightCm", "weightKg"],
    formula: "Du Bois: BSA = 0.007184 · W^0.425 · H^0.725",
    compute: (s) => {
      const m = toMetric(s);
      const v = 0.007184 * Math.pow(m.weightKg, 0.425) * Math.pow(m.heightCm, 0.725);
      return {
        value: formatNumber(v, 2),
        raw: v,
        unit: "m²",
        category: "Du Bois",
        tone: "good",
        range: "1.5–2.0 m²",
        interpretation: "BSA is used clinically for dosing chemotherapy and cardiac index calculations.",
      };
    },
  },
  {
    id: "ponderal-index",
    slug: "ponderal-index",
    name: "Ponderal Index",
    category: "advanced",
    requires: ["heightCm", "weightKg"],
    formula: "PI = weight(kg) / height(m)³",
    compute: (s) => {
      const m = toMetric(s);
      const hM = m.heightCm / 100;
      const v = m.weightKg / (hM * hM * hM);
      return {
        value: formatNumber(v, 1),
        raw: v,
        unit: "kg/m³",
        category: v < 11 ? "Underweight" : v < 15 ? "Healthy" : "Overweight",
        tone: v >= 11 && v < 15 ? "good" : "warn",
        range: "11–15",
        interpretation: "More accurate than BMI for very tall or very short individuals.",
      };
    },
  },
  {
    id: "adjusted-body-weight",
    slug: "adjusted-body-weight",
    name: "Adjusted Body Weight",
    category: "advanced",
    requires: ["heightCm", "weightKg", "sex"],
    formula: "AdjBW = IBW + 0.4·(Actual − IBW)",
    compute: (s) => {
      const m = toMetric(s);
      const ibw = ibwDevine(m.sex, m.heightCm);
      const v = ibw + 0.4 * (m.weightKg - ibw);
      return {
        value: formatWeight(v, m.unit),
        raw: v,
        category: "Clinical dosing",
        tone: "good",
        interpretation: "Used in clinical settings when actual weight is >120% of IBW (e.g., drug dosing).",
      };
    },
  },
  {
    id: "body-density",
    slug: "body-density",
    name: "Body Density",
    category: "advanced",
    requires: ["heightCm", "sex", "waistCm", "neckCm", "hipCm"],
    formula: "Siri: BD = 495 / (BF% + 450)",
    compute: (s) => {
      const m = toMetric(s);
      const bf = usNavyBF(m.sex, m.waistCm, m.neckCm, m.hipCm, m.heightCm);
      const v = 495 / (bf + 450);
      return {
        value: formatNumber(v, 3),
        raw: v,
        unit: "g/mL",
        category: "Siri equation",
        tone: "good",
        range: "1.030–1.100",
        interpretation: "Denser bodies carry more lean tissue relative to fat.",
      };
    },
  },
  {
    id: "obesity-class",
    slug: "obesity-class",
    name: "Obesity Class & Health Risk",
    category: "advanced",
    requires: ["heightCm", "weightKg", "waistCm", "sex"],
    formula: "WHO BMI classes + waist circumference risk",
    compute: (s) => {
      const m = toMetric(s);
      const bmi = bmiValue(m.weightKg, m.heightCm);
      const cat = bmiCategory(bmi);
      const waistThreshold = m.sex === "male" ? 102 : 88;
      const centralRisk = Number.isFinite(m.waistCm) && m.waistCm > waistThreshold;
      const risk = !cat ? "—" :
        cat.label.startsWith("Obese Class III") ? "Extremely high" :
        cat.label.startsWith("Obese Class II") ? "Very high" :
        cat.label.startsWith("Obese Class I") ? "High" :
        cat.label === "Overweight" ? (centralRisk ? "Increased (central)" : "Increased") :
        cat.label === "Normal" ? "Baseline" : "Increased (low weight)";
      return {
        value: cat?.label || "—",
        raw: bmi,
        category: `Risk: ${risk}`,
        tone: cat?.tone,
        interpretation:
          "Combined BMI class and waist circumference to reflect cardiometabolic risk more accurately.",
      };
    },
  },
];

export const CALCULATORS_BY_CATEGORY = Object.values(CATEGORIES).map((cat) => ({
  ...cat,
  items: CALCULATORS.filter((c) => c.category === cat.key),
}));

export function getCalculator(slug) {
  return CALCULATORS.find((c) => c.slug === slug);
}

// Check whether inputs required by a calculator are all present as finite numbers
// AND that no raw input violates its range validation.
const RAW_FIELD_MAP = {
  heightCm: "height",
  weightKg: "weight",
  waistCm: "waist",
  hipCm: "hip",
  neckCm: "neck",
  wristCm: "wrist",
  goalWeightKg: "goalWeight",
};

export function hasRequiredInputs(calc, state) {
  const m = toMetric(state);
  return calc.requires.every((k) => {
    if (k === "sex") return m.sex === "male" || m.sex === "female";
    if (k === "activity") return !!m.activity;
    if (k === "age") {
      const err = validateField("age", state.age, state.unit);
      return Number.isFinite(m.age) && m.age > 0 && !err;
    }
    const v = m[k];
    if (!(Number.isFinite(v) && v > 0)) return false;
    const rawField = RAW_FIELD_MAP[k];
    if (rawField) {
      const err = validateField(rawField, state[rawField], state.unit);
      if (err) return false;
    }
    return true;
  });
}
