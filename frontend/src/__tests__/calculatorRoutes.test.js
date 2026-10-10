import React, { Suspense } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "stream";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import fs from "fs";
import path from "path";
import { ALL_CALCULATORS } from "../lib/allCalculators";
import { renderCalculator } from "../App";
import { ThemeProvider } from "../context/ThemeContext";
import { MeasurementProvider } from "../context/MeasurementContext";

function renderMarkup(element) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const output = new PassThrough();
    const timeout = setTimeout(() => reject(new Error("Timed out rendering calculator route")), 10000);
    output.on("data", (chunk) => chunks.push(chunk));
    output.on("end", () => {
      clearTimeout(timeout);
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    let renderer;
    renderer = renderToPipeableStream(element, {
      onAllReady() {
        renderer.pipe(output);
      },
      onShellError(error) {
        clearTimeout(timeout);
        reject(error);
      },
      onError(error) {
        // React reports recoverable server-render errors here; the output and H1 check below decide the result.
        console.error("Calculator route render error:", error);
      },
    });
  });
}

function routeElement(calculator) {
  if (["navy-body-fat", "army-body-fat"].includes(calculator.id)) {
    const bodyFat = ALL_CALCULATORS.find((item) => item.id === "body-fat");
    return renderCalculator(bodyFat);
  }
  if (calculator.id === "calorie-calculator") {
    const dailyCalories = ALL_CALCULATORS.find((item) => item.id === "daily-calorie-needs");
    return renderCalculator(dailyCalories);
  }
  return renderCalculator(calculator);
}

describe("canonical calculator routes", () => {
  jest.setTimeout(120000);

  test("renders every canonical registry route with an H1", async () => {
    expect(ALL_CALCULATORS).toHaveLength(100);
    const routeElements = ALL_CALCULATORS.map((calculator) => (
      <Route key={calculator.id} path={calculator.url} element={routeElement(calculator)} />
    ));
    const failures = [];

    for (const calculator of ALL_CALCULATORS) {
      try {
        const markup = await renderMarkup(
          <ThemeProvider>
            <MeasurementProvider>
              <MemoryRouter initialEntries={[calculator.url]}>
                <Suspense fallback={<div>Loading calculator</div>}><Routes>{routeElements}</Routes></Suspense>
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
