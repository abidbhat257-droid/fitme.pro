import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "fitmepro:measurements:v1";

const DEFAULTS = {
  unit: "metric",
  age: "",
  sex: "male",
  height: "",
  weight: "",
  waist: "",
  hip: "",
  neck: "",
  wrist: "",
  goalWeight: "",
  activity: "moderate",
};

const MeasurementContext = createContext(null);

export function MeasurementProvider({ children }) {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return DEFAULTS;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULTS;
      return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setState(DEFAULTS), []);

  const setUnit = useCallback((unit) => {
    setState((prev) => (prev.unit === unit ? prev : { ...prev, unit }));
  }, []);

  return (
    <MeasurementContext.Provider value={{ state, update, reset, setUnit }}>
      {children}
    </MeasurementContext.Provider>
  );
}

export function useMeasurements() {
  const ctx = useContext(MeasurementContext);
  if (!ctx) throw new Error("useMeasurements outside provider");
  return ctx;
}
