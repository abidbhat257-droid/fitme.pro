import React from "react";
import { toast } from "sonner";
import { Plus, Trash, Target, PencilSimple } from "@phosphor-icons/react";
import { useMeasurements } from "@/context/MeasurementContext";
import { computeGoalProgress, GOAL_METRICS, STATUS_COLORS, STATUS_LABELS } from "@/lib/goals";
import ProgressRing from "@/components/viz/ProgressRing";
import GoalDialog from "@/components/GoalDialog";

function GoalCard({ goal }) {
  const { state, deleteGoal } = useMeasurements();
  const meta = GOAL_METRICS[goal.metric];
  const prog = computeGoalProgress(goal, state);
  const color = STATUS_COLORS[prog.status] || "#94A3B8";
  const label = STATUS_LABELS[prog.status] || "—";
  const unit = meta?.unit(state.unit) || "";
  const pct = prog.ratio != null && Number.isFinite(prog.ratio) ? Math.round(prog.ratio * 100) : 0;
  const ringValue = Math.max(0, Math.min(150, pct));

  return (
    <div
      data-testid={`goal-card-${goal.id}`}
      className="border border-border bg-card p-5 relative"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color }}>
            <Target size={12} weight="duotone" /> {label}
          </div>
          <div className="font-display text-lg uppercase tracking-tighter mt-1 truncate">
            {meta?.label ?? goal.metric}
          </div>
          <div className="text-[10px] font-mono-data text-muted-foreground mt-0.5">
            {goal.direction === "down" ? "▼" : "▲"} {goal.amountPerWeek}{unit}/wk
            {goal.note ? <span className="ml-2 text-foreground/70">· {goal.note}</span> : null}
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <GoalDialog
            initial={goal}
            trigger={
              <button className="p-1.5 border border-border hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)] transition-colors" aria-label="Edit goal">
                <PencilSimple size={12} weight="bold" />
              </button>
            }
          />
          <button
            onClick={() => { deleteGoal(goal.id); toast("Goal removed"); }}
            className="p-1.5 border border-border hover:border-red-500 hover:text-red-500 transition-colors"
            aria-label="Delete goal"
          >
            <Trash size={12} weight="bold" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ProgressRing
          value={ringValue}
          color={color}
          label={`${pct}%`}
          subLabel={"progress"}
          size={104}
        />
        <div className="flex-1 space-y-1.5 text-xs">
          <Row label="Start" value={fmt(goal.startValue, unit)} />
          <Row label="Now"   value={fmt(prog.currentValue, unit)} />
          <Row label="Change" value={fmt(prog.actualChange, unit, true)} valueColor={sign(prog.actualChange, goal.direction) ? "#CCFF00" : "#EF4444"} />
          <Row label="Weeks" value={Number.isFinite(prog.weeksElapsed) ? prog.weeksElapsed.toFixed(1) : "—"} />
          {goal.targetValue != null && (
            <Row label="Target" value={fmt(goal.targetValue, unit)} valueColor="#3B82F6" />
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueColor }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="font-mono-data" style={valueColor ? { color: valueColor } : {}}>{value}</span>
    </div>
  );
}

function fmt(v, unit, sign = false) {
  if (!Number.isFinite(v)) return "—";
  const s = sign ? (v > 0 ? "+" : "") : "";
  return `${s}${v.toFixed(2)}${unit || ""}`;
}
function sign(change, direction) {
  if (!Number.isFinite(change)) return true;
  return direction === "down" ? change <= 0 : change >= 0;
}

export default function GoalsWidget() {
  const { goals } = useMeasurements();

  return (
    <section data-testid="goals-widget" className="px-6 sm:px-10 py-10 border-b border-border">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-[var(--brand-lime)]" />
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tighter flex items-center gap-2">
            <Target size={22} weight="duotone" className="text-[var(--brand-lime)]" />
            Weekly Goals
          </h2>
          <span className="font-mono-data text-xs text-muted-foreground">
            {goals.length} active
          </span>
        </div>
        <GoalDialog
          trigger={
            <button
              data-testid="goal-add-btn"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-lime)] text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors"
            >
              <Plus size={14} weight="bold" /> Add Goal
            </button>
          }
        />
      </div>

      {goals.length === 0 ? (
        <div className="border border-dashed border-border p-8 text-center max-w-2xl">
          <div className="text-sm text-muted-foreground leading-relaxed">
            No goals yet. Set a realistic weekly rate — e.g., <span className="text-[var(--brand-lime)] font-bold">waist −1 cm/wk</span> or <span className="text-[var(--brand-lime)] font-bold">FFMI +0.1/wk</span> — and watch progress in real time.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {goals.map((g) => <GoalCard key={g.id} goal={g} />)}
        </div>
      )}
    </section>
  );
}
