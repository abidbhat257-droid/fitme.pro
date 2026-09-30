import { CALCULATORS } from "./calculators";
import { ALL_CALCULATORS } from "./allCalculators";

const state = {
  unit: "metric",
  height: "175",
  weight: "70",
  age: "30",
  sex: "male",
  waist: "80",
  neck: "40",
  hip: "95",
  wrist: "17",
  goalWeight: "65",
  activity: "moderate",
};

const calculator = (id) => {
  const item = CALCULATORS.find((entry) => entry.id === id);
  if (!item) throw new Error(`Missing calculator: ${id}`);
  return item;
};

describe("calculator registry integrity", () => {
  test("publishes exactly 100 canonical calculators", () => {
    expect(ALL_CALCULATORS).toHaveLength(100);
    expect(new Set(ALL_CALCULATORS.map((item) => item.id)).size).toBe(100);
    expect(new Set(ALL_CALCULATORS.map((item) => item.url)).size).toBe(100);
  });

  test("every canonical calculator has the minimum executable contract", () => {
    for (const item of ALL_CALCULATORS) {
      expect(item.id).toEqual(expect.any(String));
      expect(item.url).toMatch(/^\/[a-z0-9-]+$/);
      expect(item.name).toEqual(expect.any(String));
      expect(Array.isArray(item.requires)).toBe(true);
    }
  });
});

describe("reference formula calculations", () => {
  test("BMI", () => {
    const result = calculator("bmi").compute(state);
    expect(result.raw).toBeCloseTo(22.8571428571, 8);
    expect(result.value).toBe("22.9");
  });

  test("Mifflin-St Jeor BMR", () => {
    const result = calculator("bmr").compute(state);
    expect(result.raw).toBeCloseTo(1648.75, 8);
  });

  test("Deurenberg body-fat estimate", () => {
    const result = calculator("body-fat").compute(state);
    expect(result.raw).toBeCloseTo(18.1285714286, 8);
    expect(result.value).toBe("18.1%");
  });

  test("US Navy male body-fat estimate", () => {
    const result = calculator("navy-body-fat").compute(state);
    expect(result.raw).toBeCloseTo(11.1261454303, 8);
    expect(result.value).toBe("11.1%");
  });

  test("Relative Fat Mass", () => {
    const result = calculator("relative-fat-mass").compute(state);
    expect(result.raw).toBeCloseTo(20.25, 8);
    expect(result.value).toBe("20.3%");
  });

  test("unit conversion produces the same BMI", () => {
    const metric = calculator("bmi").compute(state);
    const imperial = calculator("bmi").compute({
      ...state,
      unit: "imperial",
      height: String(175 / 2.54),
      weight: String(70 / 0.45359237),
    });
    expect(imperial.raw).toBeCloseTo(metric.raw, 6);
  });
});
