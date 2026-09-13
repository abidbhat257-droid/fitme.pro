import { CALCULATORS, getCalculator } from "./calculators";
import { buildCalculatorIndex } from "./calculatorSchema";

describe("calculator catalog", () => {
  it("keeps every calculator definition valid", () => {
    const audit = buildCalculatorIndex(CALCULATORS, [
      "basic",
      "composition",
      "shape",
      "metabolism",
      "advanced",
    ]);

    expect(audit.valid).toBe(true);
    expect(audit.errors).toEqual([]);
  });

  it("computes BMI correctly in metric and imperial units", () => {
    const bmi = getCalculator("bmi");
    expect(bmi).toBeTruthy();

    const metricResult = bmi.compute({
      unit: "metric",
      age: "30",
      sex: "male",
      height: "180",
      weight: "80",
      waist: "",
      hip: "",
      neck: "",
      wrist: "",
      goalWeight: "",
      activity: "moderate",
    });

    const imperialResult = bmi.compute({
      unit: "imperial",
      age: "30",
      sex: "male",
      height: "70.9",
      weight: "176.4",
      waist: "",
      hip: "",
      neck: "",
      wrist: "",
      goalWeight: "",
      activity: "moderate",
    });

    expect(Number.parseFloat(metricResult.value)).toBeCloseTo(24.7, 1);
    expect(Number.parseFloat(imperialResult.value)).toBeCloseTo(24.7, 1);
  });
});
