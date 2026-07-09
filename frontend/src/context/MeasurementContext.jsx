import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { cmToIn, inToCm, kgToLb, lbToKg } from "@/lib/units";

const STORAGE_KEY = "fitmepro:measurements:v1";
const SNAP_KEY = "fitmepro:snapshots:v1";

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

const LENGTH_FIELDS = ["height", "waist", "hip", "neck", "wrist"];
const WEIGHT_FIELDS = ["weight", "goalWeight"];

const MeasurementContext = createContext(null);

function safeParseJSON(raw, fallback) {
  try { return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}

function round1(v) { return Math.round(v * 10) / 10; }

export function MeasurementProvider({ children }) {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return DEFAULTS;
    return { ...DEFAULTS, ...safeParseJSON(window.localStorage.getItem(STORAGE_KEY), {}) };
  });

  const [snapshots, setSnapshots] = useState(() => {
    if (typeof window === "undefined") return [];
    return safeParseJSON(window.localStorage.getItem(SNAP_KEY), []);
  });

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_e) { /* ignore */ }
  }, [state]);

  useEffect(() => {
    try { window.localStorage.setItem(SNAP_KEY, JSON.stringify(snapshots)); } catch (_e) { /* ignore */ }
  }, [snapshots]);

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setState(DEFAULTS), []);

  // Setting the unit converts existing numeric field values.
  const setUnit = useCallback((unit) => {
    setState((prev) => {
      if (prev.unit === unit) return prev;
      const next = { ...prev, unit };
      const cvtLen = unit === "imperial" ? cmToIn : inToCm;
      const cvtWt = unit === "imperial" ? kgToLb : lbToKg;
      for (const f of LENGTH_FIELDS) {
        const n = parseFloat(prev[f]);
        if (Number.isFinite(n) && n > 0) next[f] = String(round1(cvtLen(n)));
      }
      for (const f of WEIGHT_FIELDS) {
        const n = parseFloat(prev[f]);
        if (Number.isFinite(n) && n > 0) next[f] = String(round1(cvtWt(n)));
      }
      return next;
    });
  }, []);

  // Snapshot API
  const saveSnapshot = useCallback((name) => {
    const snap = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: name?.trim() || `Snapshot ${new Date().toLocaleDateString()}`,
      createdAt: new Date().toISOString(),
      state: { ...state },
    };
    setSnapshots((prev) => [snap, ...prev].slice(0, 20));
    return snap;
  }, [state]);

  const deleteSnapshot = useCallback((id) => {
    setSnapshots((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const loadSnapshot = useCallback((id) => {
    const snap = snapshots.find((s) => s.id === id);
    if (snap) setState({ ...DEFAULTS, ...snap.state });
  }, [snapshots]);

  const value = {
    state,
    update,
    reset,
    setUnit,
    snapshots,
    saveSnapshot,
    deleteSnapshot,
    loadSnapshot,
  };

  return <MeasurementContext.Provider value={value}>{children}</MeasurementContext.Provider>;
}

export function useMeasurements() {
  const ctx = useContext(MeasurementContext);
  if (!ctx) throw new Error("useMeasurements outside provider");
  return ctx;
}
