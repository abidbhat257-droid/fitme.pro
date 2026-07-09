import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { cmToIn, inToCm, kgToLb, lbToKg } from "@/lib/units";
import { getStorage } from "@/lib/storage";

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

function round2(v) { return Math.round(v * 100) / 100; }

// Synchronous hydration from LocalStorageAdapter's underlying store. Kept sync
// to prevent a first-paint flicker; async adapters (cloud) can hydrate via effect.
function hydrateMeasurements() {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem("fitmepro:measurements:v1");
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch { return DEFAULTS; }
}
function hydrateSnapshots() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("fitmepro:snapshots:v1");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function MeasurementProvider({ children }) {
  const storage = getStorage();

  const [state, setState] = useState(hydrateMeasurements);
  const [snapshots, setSnapshots] = useState(hydrateSnapshots);

  useEffect(() => { storage.setMeasurements(state); }, [state, storage]);
  useEffect(() => { storage.saveSnapshots(snapshots); }, [snapshots, storage]);

  const update = useCallback((patch) => setState((prev) => ({ ...prev, ...patch })), []);
  const reset = useCallback(() => setState(DEFAULTS), []);

  // Convert existing numeric input values when switching unit systems.
  const setUnit = useCallback((unit) => {
    setState((prev) => {
      if (prev.unit === unit) return prev;
      const next = { ...prev, unit };
      const cvtLen = unit === "imperial" ? cmToIn : inToCm;
      const cvtWt = unit === "imperial" ? kgToLb : lbToKg;
      for (const f of LENGTH_FIELDS) {
        const n = parseFloat(prev[f]);
        if (Number.isFinite(n) && n > 0) next[f] = String(round2(cvtLen(n)));
      }
      for (const f of WEIGHT_FIELDS) {
        const n = parseFloat(prev[f]);
        if (Number.isFinite(n) && n > 0) next[f] = String(round2(cvtWt(n)));
      }
      return next;
    });
  }, []);

  const saveSnapshot = useCallback((name) => {
    const snap = {
      id: (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
      name: name?.trim() || `Snapshot ${new Date().toLocaleDateString()}`,
      createdAt: new Date().toISOString(),
      state: { ...state },
    };
    setSnapshots((prev) => [snap, ...prev].slice(0, 100));
    return snap;
  }, [state]);

  const deleteSnapshot = useCallback((id) => {
    setSnapshots((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const loadSnapshot = useCallback((id) => {
    const snap = snapshots.find((s) => s.id === id);
    if (snap) setState({ ...DEFAULTS, ...snap.state });
  }, [snapshots]);

  const value = { state, update, reset, setUnit, snapshots, saveSnapshot, deleteSnapshot, loadSnapshot };

  return <MeasurementContext.Provider value={value}>{children}</MeasurementContext.Provider>;
}

export function useMeasurements() {
  const ctx = useContext(MeasurementContext);
  if (!ctx) throw new Error("useMeasurements outside provider");
  return ctx;
}
