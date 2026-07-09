import React from "react";
import { useMeasurements } from "@/context/MeasurementContext";
import { ACTIVITY_LEVELS } from "@/lib/units";
import { Label } from "@/components/ui/label";
import { PANEL } from "@/constants/testIds";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TacticalInput({ id, label, unit, testid, ...rest }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label} {unit ? <span className="text-[var(--brand-lime)]">/ {unit}</span> : null}
      </Label>
      <input
        id={id}
        data-testid={testid}
        type="number"
        inputMode="decimal"
        className="w-full bg-transparent border-b-2 border-border focus:border-[var(--brand-lime)] focus:outline-none py-2 text-lg font-mono-data transition-colors placeholder:text-muted-foreground/40"
        {...rest}
      />
    </div>
  );
}

export default function MeasurementPanel({ compact = false }) {
  const { state, update, setUnit } = useMeasurements();
  const metric = state.unit === "metric";

  return (
    <aside
      data-testid={PANEL.root}
      className={`${compact ? "" : "lg:w-96 lg:sticky lg:top-[73px] lg:self-start lg:h-[calc(100vh-73px)] lg:overflow-y-auto"} border-b lg:border-b-0 lg:border-r border-border bg-card/40 p-6 sm:p-8`}
    >
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl uppercase tracking-tighter">Your Body</h2>
          <p className="text-xs text-muted-foreground mt-1">Enter once. Everything auto-calculates.</p>
        </div>

        {/* Unit switcher */}
        <div className="lg:hidden flex items-center border border-border overflow-hidden text-xs uppercase font-bold tracking-[0.15em]">
          <button
            data-testid={PANEL.unitMetric}
            onClick={() => setUnit("metric")}
            className={`flex-1 py-2 ${metric ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
          >
            Metric
          </button>
          <button
            data-testid={PANEL.unitImperial}
            onClick={() => setUnit("imperial")}
            className={`flex-1 py-2 ${!metric ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
          >
            Imperial
          </button>
        </div>

        {/* GENERAL */}
        <div className="space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">
            ── General
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TacticalInput
              id="age"
              testid={PANEL.age}
              label="Age"
              unit="yrs"
              placeholder="30"
              value={state.age}
              onChange={(e) => update({ age: e.target.value })}
            />
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Sex</Label>
              <Select value={state.sex} onValueChange={(v) => update({ sex: v })}>
                <SelectTrigger
                  data-testid={PANEL.sex}
                  className="rounded-none border-0 border-b-2 border-border bg-transparent focus:border-[var(--brand-lime)] focus:ring-0 h-[42px] px-0 font-mono-data text-lg"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TacticalInput
            id="height"
            testid={PANEL.height}
            label="Height"
            unit={metric ? "cm" : "in"}
            placeholder={metric ? "175" : "69"}
            value={state.height}
            onChange={(e) => update({ height: e.target.value })}
          />
          <TacticalInput
            id="weight"
            testid={PANEL.weight}
            label="Weight"
            unit={metric ? "kg" : "lb"}
            placeholder={metric ? "72" : "160"}
            value={state.weight}
            onChange={(e) => update({ weight: e.target.value })}
          />
        </div>

        {/* CIRCUMFERENCES */}
        <div className="space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">
            ── Circumferences
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TacticalInput
              id="waist"
              testid={PANEL.waist}
              label="Waist"
              unit={metric ? "cm" : "in"}
              placeholder={metric ? "82" : "32"}
              value={state.waist}
              onChange={(e) => update({ waist: e.target.value })}
            />
            <TacticalInput
              id="hip"
              testid={PANEL.hip}
              label="Hip"
              unit={metric ? "cm" : "in"}
              placeholder={metric ? "96" : "38"}
              value={state.hip}
              onChange={(e) => update({ hip: e.target.value })}
            />
            <TacticalInput
              id="neck"
              testid={PANEL.neck}
              label="Neck"
              unit={metric ? "cm" : "in"}
              placeholder={metric ? "38" : "15"}
              value={state.neck}
              onChange={(e) => update({ neck: e.target.value })}
            />
            <TacticalInput
              id="wrist"
              testid={PANEL.wrist}
              label="Wrist"
              unit={metric ? "cm" : "in"}
              placeholder={metric ? "17" : "6.7"}
              value={state.wrist}
              onChange={(e) => update({ wrist: e.target.value })}
            />
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">
            ── Lifestyle & Goals
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Activity Level
            </Label>
            <Select value={state.activity} onValueChange={(v) => update({ activity: v })}>
              <SelectTrigger
                data-testid={PANEL.activity}
                className="rounded-none border-0 border-b-2 border-border bg-transparent focus:border-[var(--brand-lime)] focus:ring-0 h-[42px] px-0 font-mono-data"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none max-w-[350px]">
                {ACTIVITY_LEVELS.map((a) => (
                  <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <TacticalInput
            id="goal"
            testid={PANEL.goalWeight}
            label="Goal Weight (optional)"
            unit={metric ? "kg" : "lb"}
            placeholder={metric ? "68" : "150"}
            value={state.goalWeight}
            onChange={(e) => update({ goalWeight: e.target.value })}
          />
        </div>

        <div className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
          <span className="text-[var(--brand-lime)] font-bold">Tip:</span> All data stays on your device. Nothing is uploaded.
        </div>
      </div>
    </aside>
  );
}
