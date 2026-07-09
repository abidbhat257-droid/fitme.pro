import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useMeasurements } from "@/context/MeasurementContext";
import { computeAll } from "@/hooks/useAllResults";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Compare() {
  const { snapshots, state } = useMeasurements();
  const options = useMemo(
    () => [{ id: "__current__", name: "Current (live)", state }, ...snapshots],
    [snapshots, state]
  );

  const [aId, setAId] = useState(options[0]?.id || "__current__");
  const [bId, setBId] = useState(options[1]?.id || options[0]?.id || "__current__");

  useEffect(() => {
    document.title = "Compare Snapshots · Fitme Pro";
  }, []);

  const a = options.find((o) => o.id === aId) || options[0];
  const b = options.find((o) => o.id === bId) || options[0];

  const resA = useMemo(() => computeAll(a?.state || state), [a, state]);
  const resB = useMemo(() => computeAll(b?.state || state), [b, state]);

  return (
    <div data-testid="compare-root" className="min-h-screen">
      <section className="border-b border-border px-6 sm:px-10 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-[var(--brand-lime)] mb-6"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter">
          Compare <span className="text-[var(--brand-lime)]">Snapshots</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          See how your body has changed between two saved snapshots. Deltas highlight progress across all 30 metrics.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">Snapshot A</div>
            <Select value={aId} onValueChange={setAId}>
              <SelectTrigger data-testid="compare-select-a" className="rounded-none border-2 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {options.map((o) => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">Snapshot B</div>
            <Select value={bId} onValueChange={setBId}>
              <SelectTrigger data-testid="compare-select-b" className="rounded-none border-2 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {options.map((o) => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 py-8">
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="p-3 text-[10px] uppercase tracking-widest font-bold">Metric</th>
                <th className="p-3 text-[10px] uppercase tracking-widest font-bold">A</th>
                <th className="p-3 text-[10px] uppercase tracking-widest font-bold">B</th>
                <th className="p-3 text-[10px] uppercase tracking-widest font-bold">Δ</th>
              </tr>
            </thead>
            <tbody>
              {CALCULATORS.map((c) => {
                const rA = resA[c.id];
                const rB = resB[c.id];
                const nA = num(rA?.result?.raw);
                const nB = num(rB?.result?.raw);
                const delta = (Number.isFinite(nA) && Number.isFinite(nB)) ? nB - nA : null;
                const cat = CATEGORIES[c.category];
                return (
                  <tr key={c.id} className="border-t border-border" data-testid={`compare-row-${c.id}`}>
                    <td className="p-3 flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0" style={{ background: cat.color }} />
                      <span className="truncate">{c.name}</span>
                    </td>
                    <td className="p-3 font-mono-data">
                      {rA?.ready ? formatOut(rA.result) : "—"}
                    </td>
                    <td className="p-3 font-mono-data">
                      {rB?.ready ? formatOut(rB.result) : "—"}
                    </td>
                    <td className="p-3 font-mono-data">
                      {delta == null ? "—" : (
                        <span className={delta === 0 ? "text-muted-foreground" : (delta > 0 ? "text-orange-400" : "text-[var(--brand-lime)]")}>
                          {delta > 0 ? "+" : ""}{delta.toFixed(2)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {snapshots.length === 0 && (
          <div className="mt-6 border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No snapshots saved yet. Save one from the header menu.
            <Link to="/" className="ml-2 text-[var(--brand-lime)] font-bold uppercase text-xs inline-flex items-center gap-1">
              Go to dashboard <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function num(v) { return typeof v === "number" ? v : parseFloat(v); }

function formatOut(r) {
  if (!r) return "—";
  const val = r.value ?? "—";
  return `${val}${r.unit ? " " + r.unit : ""}`;
}
