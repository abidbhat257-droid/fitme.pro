import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ALL_CALCULATORS } from "../lib/allCalculators";
import { renderCalculator } from "../App";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("canonical calculator routes", () => {
  jest.setTimeout(120000);

  test("all 100 registry routes render a real page heading", async () => {
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
        await act(async () => {
          root.render(
            <MemoryRouter key={calculator.id} initialEntries={[calculator.url]}>
              <Routes>{routeElements}</Routes>
            </MemoryRouter>
          );
          await wait(80);
        });

        let heading = container.querySelector("h1");
        for (let attempt = 0; !heading && attempt < 25; attempt += 1) {
          await act(async () => wait(80));
          heading = container.querySelector("h1");
        }

        const headingText = (heading?.textContent || "").trim();
        if (!heading || !headingText || /calculator not found/i.test(container.textContent || "")) {
          failures.push({
            id: calculator.id,
            url: calculator.url,
            heading: headingText || null,
            notFound: /calculator not found/i.test(container.textContent || ""),
          });
        }
      }
    } finally {
      await act(async () => root.unmount());
      container.remove();
    }

    if (failures.length) {
      throw new Error("Calculator route verification failed: " + failures.length + "/" + ALL_CALCULATORS.length + "\n" + JSON.stringify(failures, null, 2));
    }

    console.log("Calculator route verification: " + ALL_CALCULATORS.length + "/" + ALL_CALCULATORS.length + " routes rendered an H1; no \"Calculator not found\" messages.");
  });
});
