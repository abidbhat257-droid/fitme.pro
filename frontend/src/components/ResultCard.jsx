import React from "react";
import { Link } from "react-router-dom";
import { Copy, ArrowUpRight } from "@phosphor-icons/react";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/calculators";
import GaugeBar from "./GaugeBar";
import { CARD } from "@/constants/testIds";

const TONE = {
  good: "#CCFF00",
  warn: "#EAB308",
  bad: "#EF4444",
  neutral: "#94A3B8",
};

// Choose a gauge for known calculators
function buildGauge(calc, res) {
  if (!res || !Number.isFinite(res.raw)) return null;
  const v = res.raw;
  if (calc.id === "bmi") {
    return {
      segments: [
        { label: "Under", color: "#60A5FA" },
        { label: "Normal", color: "#CCFF00" },
        { label: "Over", color: "#EAB308" },
        { label: "Obese", color: "#EF4444" },
      ],
      position: Math.min(1, Math.max(0, (v - 15) / (40 - 15))),
    };
  }
  if (calc.id === "waist-height-ratio") {
    return {
      segments: [
        { label: "Slim", color: "#60A5FA" },
        { label: "Healthy", color: "#CCFF00" },
        { label: "Over", color: "#EAB308" },
        { label: "Obese", color: "#EF4444" },
      ],
      position: Math.min(1, Math.max(0, (v - 0.3) / (0.75 - 0.3))),
    };
  }
  if (calc.id === "waist-hip-ratio") {
    return {
      segments: [
        { label: "Low", color: "#CCFF00" },
        { label: "Moderate", color: "#EAB308" },
        { label: "High", color: "#EF4444" },
      ],
      position: Math.min(1, Math.max(0, (v - 0.7) / (1.1 - 0.7))),
    };
  }
  if (calc.id === "body-fat" || calc.id === "navy-body-fat" || calc.id === "relative-fat-mass") {
    return {
      segments: [
        { label: "Lean", color: "#60A5FA" },
        { label: "Fit", color: "#CCFF00" },
        { label: "Avg", color: "#EAB308" },
        { label: "High", color: "#EF4444" },
      ],
      position: Math.min(1, Math.max(0, v / 45)),
    };
  }
  return null;
}

export default function ResultCard({ calc, result, ready, index = 0 }) {
  const cat = CATEGORIES[calc.category];
  const gauge = ready ? buildGauge(calc, result) : null;
  const tone = ready ? TONE[result?.tone || "neutral"] : "#333";

  const onCopy = async () => {
    try {
      const text = `${calc.name}: ${result?.value ?? "—"} (${result?.category ?? ""})`;
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard", { description: text });
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <article
      data-testid={CARD.root(calc.id)}
      className="card-in group relative bg-card border border-border p-6 brut-hover flex flex-col"
      style={{
        animationDelay: `${Math.min(index, 20) * 30}ms`,
        borderTop: `3px solid ${cat.color}`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          data-testid={CARD.category(calc.id)}
          className="text-[10px] font-bold uppercase tracking-[0.25em] px-2 py-1"
          style={{ color: cat.color, borderLeft: `2px solid ${cat.color}` }}
        >
          {cat.label}
        </div>
        <button
          data-testid={CARD.copyBtn(calc.id)}
          onClick={onCopy}
          className="text-muted-foreground hover:text-[var(--brand-lime)] transition-colors"
          aria-label="Copy result"
        >
          <Copy size={16} weight="duotone" />
        </button>
      </div>

      <h3 className="font-display text-xl uppercase tracking-tight leading-tight mb-4">
        {calc.name}
      </h3>

      <div className="flex-1">
        {ready ? (
          <>
            <div
              data-testid={CARD.value(calc.id)}
              className="font-mono-data text-3xl sm:text-4xl font-black tracking-tight"
              style={{ color: tone }}
            >
              {result?.value ?? "—"}
              {result?.unit ? (
                <span className="text-sm ml-1.5 text-muted-foreground font-normal">{result.unit}</span>
              ) : null}
            </div>
            {result?.category ? (
              <div className="text-xs mt-1.5 font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {result.category}
              </div>
            ) : null}
            {gauge ? <div className="mt-4">{<GaugeBar {...gauge} />}</div> : null}
            {result?.range ? (
              <div className="text-[11px] mt-3 text-muted-foreground">
                Reference: <span className="font-mono-data text-foreground">{result.range}</span>
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-[var(--brand-lime)] font-bold">→</span> Enter missing measurements to unlock.
            <div className="text-[10px] uppercase tracking-widest mt-2">
              Needs: {calc.requires.join(" · ")}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono-data">
          {calc.formula.length > 34 ? calc.formula.slice(0, 34) + "…" : calc.formula}
        </div>
        <Link
          to={`/${calc.slug}-calculator`}
          data-testid={CARD.detailsLink(calc.id)}
          className="text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-1 hover:text-[var(--brand-lime)] transition-colors"
        >
          Details <ArrowUpRight size={12} weight="bold" />
        </Link>
      </div>
    </article>
  );
}
