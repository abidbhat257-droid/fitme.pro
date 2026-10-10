import React, { Suspense } from "react";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import fs from "fs";
import path from "path";
import { ALL_CALCULATORS } from "../lib/allCalculators";
import { renderCalculator } from "../App";
import { ThemeProvider } from "../context/ThemeContext";
import { MeasurementProvider } from "../context/MeasurementContext";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("canonical calculator routes", () => {
  jest.setTimeout(120000);

  test("diagnose all 100 registry routes", async () => {
    expect(ALL_CALCULATORS).toHaveLength(100);
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const failures = [];
    const routeElements = ALL_CALCULATORS.map((calculator) => (
      <Route key={calculator.id} path={calculator.url} element={renderCalculator(calculator)} />
    ));

    try {
      for (const calculator of ALL_CALCULATORS) {
        try {
          await act(async () => {
            root.render(
              <ThemeProvider><MeasurementProvider><MemoryRouter key={calculator.id} initialEntries={[calculator.url]}>
                <Suspense fallback={<div>Loading calculator</div>}><Routes>{routeElements}</Routes></Suspense>
              </MemoryRouter></MeasurementProvider></ThemeProvider>
            );
            await wait(80);
          });
          let heading = container.querySelector("h1");
          for (let attempt = 0; !heading && attempt < 25; attempt += 1) {
            await act(async () => wait(80));
            heading = container.querySelector("h1");
          }
          const headingText = (heading?.textContent || "").trim();
          const notFound = /calculator not found/i.test(container.textContent || "");
          if (!heading || !headingText || notFound) {
            failures.push({ id: calculator.id, url: calculator.url, heading: headingText || null, notFound });
          }
        } catch (error) {
          failures.push({ id: calculator.id, url: calculator.url, error: String(error?.stack || error) });
        }
      }
    } finally {
      await act(async () => root.unmount());
      container.remove();
    }

    const report = { total: ALL_CALCULATORS.length, passed: ALL_CALCULATORS.length - failures.length, failed: failures.length, failures };
    const reportPath = path.resolve(__dirname, "../../build", "calculator-route-verification.json");
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log("Calculator route verification diagnostic: " + report.passed + "/" + report.total + " passed. Report: build/calculator-route-verification.json");
  });
});
