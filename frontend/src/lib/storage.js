/**
 * Storage adapter.
 *
 * Public API is designed to be async even though the current backing store is
 * synchronous localStorage. This lets us swap in a cloud-backed adapter later
 * (e.g., Google auth + Firestore) without touching call sites.
 *
 * Anything persisted goes through a single adapter, so a future flag
 * `USE_CLOUD_STORAGE` can switch implementations globally.
 */

const MEASUREMENTS_KEY = "fitmepro:measurements:v1";
const SNAPSHOTS_KEY = "fitmepro:snapshots:v1";
const GOALS_KEY = "fitmepro:goals:v1";
const THEME_KEY = "fitmepro:theme";
const DEFAULT_USER_ID = "local-user";

function getRuntimeApiBaseUrl() {
  if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

class LocalStorageAdapter {
  constructor() {
    this.type = "local";
  }

  _read(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }
  _write(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  }

  async getMeasurements(defaults) {
    return { ...defaults, ...this._read(MEASUREMENTS_KEY, {}) };
  }
  async setMeasurements(value) {
    this._write(MEASUREMENTS_KEY, value);
  }

  async listSnapshots() {
    return this._read(SNAPSHOTS_KEY, []);
  }
  async saveSnapshots(snapshots) {
    this._write(SNAPSHOTS_KEY, snapshots);
  }

  async listGoals() {
    return this._read(GOALS_KEY, []);
  }
  async saveGoals(goals) {
    this._write(GOALS_KEY, goals);
  }

  async getTheme(fallback = "dark") {
    try { return window.localStorage.getItem(THEME_KEY) || fallback; } catch { return fallback; }
  }
  async setTheme(theme) {
    try { window.localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ }
  }
}

class CloudStorageAdapter extends LocalStorageAdapter {
  constructor() {
    super();
    this.type = "cloud";
    this.baseUrl = getRuntimeApiBaseUrl();
  }

  async _request(path, options = {}) {
    const url = `${this.baseUrl}/api${path}`;
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(text || `Request failed for ${path}`);
    }

    if (response.status === 204) return null;
    return response.json();
  }

  async getMeasurements(defaults) {
    try {
      const profile = await this._request(`/profile/${DEFAULT_USER_ID}`);
      if (!profile || !profile.measurements) {
        return { ...defaults, ...this._read(MEASUREMENTS_KEY, {}) };
      }
      return { ...defaults, ...profile.measurements };
    } catch {
      return { ...defaults, ...this._read(MEASUREMENTS_KEY, {}) };
    }
  }

  async setMeasurements(value) {
    try {
      const existing = await this.listGoals();
      await this._request("/profile", {
        method: "POST",
        body: JSON.stringify({ user_id: DEFAULT_USER_ID, measurements: value, goals: existing }),
      });
    } catch {
      super.setMeasurements(value);
    }
  }

  async listGoals() {
    try {
      const profile = await this._request(`/profile/${DEFAULT_USER_ID}`);
      if (!profile || !Array.isArray(profile.goals)) {
        return this._read(GOALS_KEY, []);
      }
      return profile.goals;
    } catch {
      return this._read(GOALS_KEY, []);
    }
  }

  async saveGoals(goals) {
    try {
      const measurements = await this.getMeasurements({});
      await this._request("/profile", {
        method: "POST",
        body: JSON.stringify({ user_id: DEFAULT_USER_ID, measurements, goals }),
      });
    } catch {
      super.saveGoals(goals);
    }
  }
}

let _adapter = null;

/** Returns the singleton storage adapter. Later this can inspect a flag/user
 *  session and return CloudStorageAdapter instead. */
export function getStorage() {
  if (!_adapter) {
    const useCloudStorage =
      typeof process !== "undefined" &&
      process.env &&
      (process.env.REACT_APP_USE_CLOUD_STORAGE === "true" || Boolean(process.env.REACT_APP_API_URL));

    _adapter = useCloudStorage ? new CloudStorageAdapter() : new LocalStorageAdapter();
  }
  return _adapter;
}

/** Public for tests / future migration. */
export const StorageKeys = { MEASUREMENTS_KEY, SNAPSHOTS_KEY, GOALS_KEY, THEME_KEY };
