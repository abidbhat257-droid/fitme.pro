import React from "react";
import { useLocation } from "react-router-dom";
import { useMeasurements } from "@/context/MeasurementContext";
import { ACTIVITY_LEVELS } from "@/lib/units";
import { getBounds, validateField } from "@/lib/validation";
import { Label } from "@/components/ui/label";
import { PANEL } from "@/constants/testIds";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCalculator } from "@/lib/calculators";
import { getSpecializedCalculator } from "@/lib/specializedCalculators";
import { NEW_CALCULATORS } from "@/lib/newSpecializedCalculators";

const DEFINITIONS = {
  age: "Your age in completed years.",
  sex: "Sex used by equations that have sex-specific coefficients or reference ranges.",
  height: "Your standing height without shoes. Keep the measurement consistent between readings.",
  weight: "Your current body weight. Use a reliable scale and the selected unit system.",
  waist: "Waist circumference measured at the location specified by the calculator's method.",
  hip: "Hip circumference measured around the widest part of the hips or buttocks, when required by the method.",
  neck: "Neck circumference measured consistently around the neck, following the method used by the calculator.",
  wrist: "Wrist circumference measured around the wrist at the specified measurement point.",
  goalWeight: "The target body weight you want to reach. Only use this when the calculator asks for a goal weight.",
  activity: "Your usual activity level. Choose the level that best represents your typical activity, not a single unusually active day.",
};

const LABELS = {
  age: "Age",
  sex: "Sex",
  height: "Height",
  weight: "Weight",
  waist: "Waist circumference",
  hip: "Hip circumference",
  neck: "Neck circumference",
  wrist: "Wrist circumference",
  goalWeight: "Goal weight",
  activity: "Activity level",
};

function TacticalInput({ id, label, unit, testid, field, unitSystem, value, onChange, definition }) {
  const b = getBounds(field, unitSystem);
  const error = validateField(field, value, unitSystem);
  const errorId = `${id}-error`;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {label} {unit ? <span className="text-[var(--brand-lime)]">/ {unit}</span> : null}
        </Label>
        {definition ? <span title={definition} aria-label={`${label} definition`} className="cursor-help text-[10px] font-bold text-muted-foreground/60">ⓘ</span> : null}
      </div>
      <input
        id={id}
        data-testid={testid}
        type="number"
        inputMode="decimal"
        min={b?.min}
        max={b?.max}
        step={b?.step}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full bg-transparent border-b-2 py-2 text-lg font-mono-data transition-colors placeholder:text-muted-foreground/40 focus:outline-none ${error ? "border-red-500 focus:border-red-500" : "border-border focus:border-[var(--brand-lime)]"}`}
      />
      {definition ? <p className="text-[10px] leading-4 text-muted-foreground/70">{definition}</p> : null}
      {error ? <div id={errorId} data-testid={`${testid}-error`} className="text-[10px] text-red-500 font-mono-data">{error}</div> : null}
    </div>
  );
}

function getPageCalculator(pathname) {
  if (pathname === "/" || pathname.startsWith("/journal") || pathname === "/calculators" || pathname.startsWith("/calculator-category") || pathname === "/compare" || pathname === "/about" || pathname === "/privacy-policy" || pathname === "/terms" || pathname === "/contact") return null;
  const raw = pathname.replace(/^\//, "").replace(/-calculator$/, "");
  const legacy = getCalculator(raw);
  if (legacy) return { type: "shared", calc: legacy };
  const specialized = getSpecializedCalculator(pathname.replace(/^\//, ""));
  if (specialized) return { type: "specialized", calc: specialized };
  const modern = NEW_CALCULATORS.find(c => c.slug === pathname.replace(/^\//, ""));
  if (modern) return { type: "new", calc: modern };
  return null;
}

function requiredFields(calc) {
  const fields = Array.isArray(calc?.requires) ? [...calc.requires] : [];
  if (calc?.id === "navy-body-fat" && calc?.requires?.includes("sex")) fields.push("hip");
  return [...new Set(fields)];
}

function fieldToStateKey(field) {
  return ({ heightCm: "height", weightKg: "weight", waistCm: "waist", hipCm: "hip", neckCm: "neck", wristCm: "wrist", goalWeightKg: "goalWeight" }[field] || field);
}

export default function MeasurementPanel({ compact = false }) {
  const location = useLocation();
  const { state, update, setUnit } = useMeasurements();
  const metric = state.unit === "metric";
  const pageCalc = getPageCalculator(location.pathname);
  const calculatorFields = pageCalc ? requiredFields(pageCalc.calc) : [];
  const showDashboard = !pageCalc && location.pathname === "/";
  const fields = pageCalc ? calculatorFields : ["age", "sex", "height", "weight", "waist", "hip", "neck", "wrist", "activity", "goalWeight"];
  if (!showDashboard && !pageCalc) return null;

  const set = field => e => update({ [fieldToStateKey(field)]: e.target.value });
  const unitFor = field => {
    const key = fieldToStateKey(field);
    if (["height", "waist", "hip", "neck", "wrist"].includes(key)) return metric ? "cm" : "in";
    if (["weight", "goalWeight"].includes(key)) return metric ? "kg" : "lb";
    if (key === "age") return "yrs";
    return "";
  };

  const title = pageCalc ? "Calculator Inputs" : "Your Body";
  const subtitle = pageCalc ? "Enter only the data this calculator needs." : "Enter once. Everything auto-calculates.";

  return (
    <aside data-testid={PANEL.root} aria-label={title} className={`${compact ? "" : "lg:w-96 lg:sticky lg:top-[73px] lg:self-start lg:h-[calc(100vh-73px)] lg:overflow-y-auto"} border-b lg:border-b-0 lg:border-r border-border bg-card/40 p-6 sm:p-8`}>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl uppercase tracking-tighter">{title}</h2>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center border border-border overflow-hidden text-xs uppercase font-bold tracking-[0.15em]">
          <button data-testid={PANEL.unitMetric} onClick={() => setUnit("metric")} aria-pressed={metric} className={`flex-1 py-2 ${metric ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}>Metric</button>
          <button data-testid={PANEL.unitImperial} onClick={() => setUnit("imperial")} aria-pressed={!metric} className={`flex-1 py-2 ${!metric ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}>Imperial</button>
        </div>

        {pageCalc ? (
          <div className="space-y-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">── Required data</div>
            {fields.map(field => {
              const key = fieldToStateKey(field);
              if (key === "sex") {
                return (
                  <div key={field} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Sex</Label>
                      <span title={DEFINITIONS.sex} className="cursor-help text-[10px] font-bold text-muted-foreground/60">ⓘ</span>
                    </div>
                    <Select value={state.sex} onValueChange={v => update({ sex: v })}>
                      <SelectTrigger data-testid={PANEL.sex} aria-label="Sex" className="rounded-none border-0 border-b-2 border-border bg-transparent focus:border-[var(--brand-lime)] focus:ring-0 h-[42px] px-0 font-mono-data text-lg"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-none"><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                    </Select>
                    <p className="text-[10px] leading-4 text-muted-foreground/70">{DEFINITIONS.sex}</p>
                  </div>
                );
              }
              if (key === "activity") {
                return (
                  <div key={field} className="space-y-1.5">
                    <div className="flex items-center justify-between"><Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Activity level</Label><span title={DEFINITIONS.activity} className="cursor-help text-[10px] font-bold text-muted-foreground/60">ⓘ</span></div>
                    <Select value={state.activity} onValueChange={v => update({ activity: v })}>
                      <SelectTrigger data-testid={PANEL.activity} aria-label="Activity level" className="rounded-none border-0 border-b-2 border-border bg-transparent focus:border-[var(--brand-lime)] focus:ring-0 h-[42px] px-0 font-mono-data"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-none max-w-[350px]">{ACTIVITY_LEVELS.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}</SelectContent>
                    </Select>
                    <p className="text-[10px] leading-4 text-muted-foreground/70">{DEFINITIONS.activity}</p>
                  </div>
                );
              }
              return <TacticalInput key={field} id={`calc-${key}`} testid={`${PANEL.root}-${key}`} label={LABELS[key] || LABELS[field] || field} unit={unitFor(field)} field={key} unitSystem={state.unit} value={state[key]} onChange={set(field)} definition={DEFINITIONS[key] || `Enter your ${LABELS[key]?.toLowerCase() || key}.`} />;
            })}
            <div className="border-t border-border pt-4 text-[10px] leading-5 text-muted-foreground">
              <span className="font-bold text-[var(--brand-lime)]">Why these inputs?</span> This section is generated from the calculator's required data fields, so unrelated body measurements are not requested.
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">── General</div>
              <div className="grid grid-cols-2 gap-4">
                <TacticalInput id="age" testid={PANEL.age} label="Age" unit="yrs" field="age" unitSystem={state.unit} value={state.age} onChange={set("age")} definition={DEFINITIONS.age} />
                <div className="space-y-1.5"><div className="flex items-center justify-between"><Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Sex</Label><span title={DEFINITIONS.sex} className="cursor-help text-[10px] font-bold text-muted-foreground/60">ⓘ</span></div><Select value={state.sex} onValueChange={v => update({ sex: v })}><SelectTrigger data-testid={PANEL.sex} aria-label="Sex" className="rounded-none border-0 border-b-2 border-border bg-transparent focus:border-[var(--brand-lime)] focus:ring-0 h-[42px] px-0 font-mono-data text-lg"><SelectValue /></SelectTrigger><SelectContent className="rounded-none"><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select></div>
              </div>
              <TacticalInput id="height" testid={PANEL.height} label="Height" unit={metric ? "cm" : "in"} field="height" unitSystem={state.unit} value={state.height} onChange={set("height")} definition={DEFINITIONS.height} />
              <TacticalInput id="weight" testid={PANEL.weight} label="Weight" unit={metric ? "kg" : "lb"} field="weight" unitSystem={state.unit} value={state.weight} onChange={set("weight")} definition={DEFINITIONS.weight} />
            </div>
            <div className="space-y-4"><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">── Circumferences</div><div className="grid grid-cols-2 gap-4"><TacticalInput id="waist" testid={PANEL.waist} label="Waist" unit={metric ? "cm" : "in"} field="waist" unitSystem={state.unit} value={state.waist} onChange={set("waist")} definition={DEFINITIONS.waist} /><TacticalInput id="hip" testid={PANEL.hip} label="Hip" unit={metric ? "cm" : "in"} field="hip" unitSystem={state.unit} value={state.hip} onChange={set("hip")} definition={DEFINITIONS.hip} /><TacticalInput id="neck" testid={PANEL.neck} label="Neck" unit={metric ? "cm" : "in"} field="neck" unitSystem={state.unit} value={state.neck} onChange={set("neck")} definition={DEFINITIONS.neck} /><TacticalInput id="wrist" testid={PANEL.wrist} label="Wrist" unit={metric ? "cm" : "in"} field="wrist" unitSystem={state.unit} value={state.wrist} onChange={set("wrist")} definition={DEFINITIONS.wrist} /></div></div>
            <div className="space-y-4"><div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">── Lifestyle & Goals</div><div className="space-y-1.5"><div className="flex items-center justify-between"><Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Activity Level</Label><span title={DEFINITIONS.activity} className="cursor-help text-[10px] font-bold text-muted-foreground/60">ⓘ</span></div><Select value={state.activity} onValueChange={v => update({ activity: v })}><SelectTrigger data-testid={PANEL.activity} aria-label="Activity level" className="rounded-none border-0 border-b-2 border-border bg-transparent focus:border-[var(--brand-lime)] focus:ring-0 h-[42px] px-0 font-mono-data"><SelectValue /></SelectTrigger><SelectContent className="rounded-none max-w-[350px]">{ACTIVITY_LEVELS.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}</SelectContent></Select><p className="text-[10px] leading-4 text-muted-foreground/70">{DEFINITIONS.activity}</p></div><TacticalInput id="goal" testid={PANEL.goalWeight} label="Goal Weight (optional)" unit={metric ? "kg" : "lb"} field="goalWeight" unitSystem={state.unit} value={state.goalWeight} onChange={set("goalWeight")} definition={DEFINITIONS.goalWeight} /></div>
            <div className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4"><span className="text-[var(--brand-lime)] font-bold">Tip:</span> All data stays on your device. Nothing is uploaded.</div>
          </>
        )}
      </div>
    </aside>
  );
}
