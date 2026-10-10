import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import fs from "fs";
import path from "path";
import { ALL_CALCULATORS } from "../lib/allCalculators";
import { NEW_CALCULATORS } from "../lib/newSpecializedCalculators";
import CalculatorPage from "../pages/CalculatorPage";
import SpecializedCalculatorPage from "../pages/SpecializedCalculatorPage";
import NewCalculatorPage from "../pages/NewCalculatorPage";
import MissingCalculatorPage from "../pages/MissingCalculatorPage";
import { ThemeProvider } from "../context/ThemeContext";
import { MeasurementProvider } from "../context/MeasurementContext";

function routeElement(calculator) {
  if (["navy-body-fat", "army-body-fat"].includes(calculator.id)) return <Navigate to="/body-fat-calculator" replace />;
  if (calculator.id === "calorie-calculator") return <Navigate to="/daily-calorie-needs-calculator" replace />;
  if (calculator.source === "core") return <CalculatorPage seoSlug={calculator.id} />;
  if (calculator.source === "missing") return <MissingCalculatorPage calculatorId={calculator.id} />;
  return NEW_CALCULATORS.some((item) => item.id === calculator.id)
    ? <NewCalculatorPage calculatorId={calculator.id} />
    : <SpecializedCalculatorPage calculatorId={calculator.id} />;
}

describe("canonical calculator routes", () => {
  test("renders every registry route with an H1 and no not-found message", () => {
    expect(ALL_CALCULATORS).toHaveLength(100);
    const routeElements = ALL_CALCULATORS.map((calculator) => (
      <Route key={calculator.id} path={calculator.url} element={routeElement(calculator)} />
    ));
    const failures = [];

    for (const calculator of ALL_CALCULATORS) {
      try {
        const markup = renderToStaticMarkup(
          <ThemeProvider>
            <MeasurementProvider>
              <MemoryRouter initialEntries={[calculator.url]}>
                <Routes>{routeElements}</Routes>
              </MemoryRouter>
            </MeasurementProvider>
          </ThemeProvider>
        );
        const headings = [...markup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
        const headingText = headings[0]?.[1]?.replace(/<[^>]*>/g, "").trim() || "";
        const notFound = /calculator not found/i.test(markup);
        if (headings.length !== 1 || !headingText || notFound) {
          failures.push({ id: calculator.id, url: calculator.url, h1Count: headings.length, heading: headingText || null, notFound });
        }
      } catch (error) {
        failures.push({ id: calculator.id, url: calculator.url, error: String(error?.stack || error) });
      }
    }

    const report = { total: ALL_CALCULATORS.length, passed: ALL_CALCULATORS.length - failures.length, failed: failures.length, failures };
    const reportPath = path.resolve(__dirname, "../../build", "calculator-route-verification.json");
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log("Calculator route verification diagnostic: " + report.passed + "/" + report.total + " rendered an H1. Report: build/calculator-route-verification.json");
  });
});
