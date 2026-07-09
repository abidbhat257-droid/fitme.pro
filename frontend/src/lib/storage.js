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
const THEME_KEY = "fitmepro:theme";

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

  async getTheme(fallback = "dark") {
    try { return window.localStorage.getItem(THEME_KEY) || fallback; } catch { return fallback; }
  }
  async setTheme(theme) {
    try { window.localStorage.setItem(THEME_KEY, theme); } catch { /* ignore */ }
  }
}

let _adapter = null;

/** Returns the singleton storage adapter. Later this can inspect a flag/user
 *  session and return CloudStorageAdapter instead. */
export function getStorage() {
  if (!_adapter) _adapter = new LocalStorageAdapter();
  return _adapter;
}

/** Public for tests / future migration. */
export const StorageKeys = { MEASUREMENTS_KEY, SNAPSHOTS_KEY, THEME_KEY };
