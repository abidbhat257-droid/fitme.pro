import { CALCULATORS, CATEGORIES } from "./calculators";
import { computeAll } from "@/hooks/useAllResults";

// ---------- Serialize a result set to plain rows ----------
export function toRows(state) {
  const results = computeAll(state);
  return CALCULATORS.map((c) => {
    const r = results[c.id];
    return {
      id: c.id,
      name: c.name,
      category: CATEGORIES[c.category].label,
      value: r?.ready ? (typeof r.result?.value === "string" ? r.result.value : String(r.result?.value ?? "")) : "",
      unit: r?.result?.unit || "",
      status: r?.result?.category || "",
      formula: c.formula,
      interpretation: r?.result?.interpretation || "",
    };
  });
}

// ---------- JSON export ----------
export function downloadJSON(state) {
  const payload = {
    generatedAt: new Date().toISOString(),
    unit: state.unit,
    inputs: state,
    results: toRows(state),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  triggerDownload(blob, `fitmepro-results-${dateStamp()}.json`);
}

// ---------- CSV export ----------
export function downloadCSV(state) {
  const rows = toRows(state);
  const header = ["Category", "Calculator", "Result", "Unit", "Status", "Formula"];
  const lines = [header.map(csvCell).join(",")];
  for (const r of rows) {
    lines.push([r.category, r.name, r.value, r.unit, r.status, r.formula].map(csvCell).join(","));
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  triggerDownload(blob, `fitmepro-results-${dateStamp()}.csv`);
}

// ---------- Shareable PNG (canvas, no external lib) ----------
export function downloadShareCard(state) {
  const results = computeAll(state);
  const W = 1200, H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#0A0A0A";
  ctx.fillRect(0, 0, W, H);

  // Lime accent strip
  ctx.fillStyle = "#CCFF00";
  ctx.fillRect(0, 0, 12, H);

  // Brand
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 32px 'Clash Display', system-ui, sans-serif";
  ctx.fillText("FITME", 60, 90);
  ctx.fillStyle = "#CCFF00";
  ctx.fillText(".PRO", 175, 90);

  // Tagline
  ctx.fillStyle = "#94A3B8";
  ctx.font = "500 20px 'Manrope', system-ui, sans-serif";
  ctx.fillText("MY BODY BY THE NUMBERS", 60, 130);

  // Featured metrics
  const featured = [
    { id: "bmi", label: "BMI" },
    { id: "body-fat", label: "Body Fat" },
    { id: "tdee", label: "TDEE" },
    { id: "waist-hip-ratio", label: "Waist/Hip" },
  ];
  const boxW = (W - 60 - 60 - 40) / 4;
  const y = 200;
  featured.forEach((f, i) => {
    const x = 60 + i * (boxW + 40 / 3);
    const r = results[f.id]?.result;
    ctx.strokeStyle = "#262626";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, boxW, 260);
    // Label
    ctx.fillStyle = "#CCFF00";
    ctx.font = "700 14px 'Manrope', system-ui, sans-serif";
    ctx.fillText(f.label.toUpperCase(), x + 24, y + 40);
    // Value
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 56px 'JetBrains Mono', ui-monospace, monospace";
    const v = r?.value ? String(r.value).slice(0, 8) : "—";
    ctx.fillText(v, x + 24, y + 130);
    // Unit
    ctx.fillStyle = "#94A3B8";
    ctx.font = "500 16px 'Manrope', system-ui, sans-serif";
    ctx.fillText(r?.unit || "", x + 24, y + 160);
    // Status
    ctx.fillStyle = "#F8FAFC";
    ctx.font = "600 14px 'Manrope', system-ui, sans-serif";
    if (r?.category) ctx.fillText(String(r.category).toUpperCase().slice(0, 22), x + 24, y + 220);
  });

  // Footer
  ctx.fillStyle = "#94A3B8";
  ctx.font = "500 18px 'Manrope', system-ui, sans-serif";
  ctx.fillText("30 body-composition calculators · fitme.pro", 60, H - 40);

  canvas.toBlob((blob) => {
    triggerDownload(blob, `fitmepro-share-${dateStamp()}.png`);
  }, "image/png", 0.95);
}

// ---------- helpers ----------
function csvCell(v) {
  const s = String(v ?? "").replace(/"/g, '""');
  return /[",\n]/.test(s) ? `"${s}"` : s;
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function dateStamp() {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
}
