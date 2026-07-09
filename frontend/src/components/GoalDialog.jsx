import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { useMeasurements } from "@/context/MeasurementContext";
import { GOAL_METRICS, GOAL_METRIC_KEYS } from "@/lib/goals";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Target } from "@phosphor-icons/react";

export default function GoalDialog({ trigger, initial }) {
  const { state, saveGoal, updateGoal } = useMeasurements();
  const [open, setOpen] = useState(false);
  const editing = !!initial;

  const [metric, setMetric] = useState(initial?.metric || "weight");
  const [direction, setDirection] = useState(initial?.direction || GOAL_METRICS.weight.defaultDirection);
  const [amount, setAmount] = useState(initial?.amountPerWeek?.toString() || "");
  const [target, setTarget] = useState(initial?.targetValue?.toString() || "");
  const [note, setNote] = useState(initial?.note || "");

  const meta = GOAL_METRICS[metric];
  const unit = meta.unit(state.unit);
  const currentValue = useMemo(() => meta.getValue(state), [meta, state]);
  const defaultRate = meta.defaultRate(state.unit);

  const onMetricChange = (m) => {
    setMetric(m);
    const nextMeta = GOAL_METRICS[m];
    setDirection(nextMeta.defaultDirection);
    setAmount("");
    setTarget("");
  };

  const onSubmit = () => {
    const parsedAmount = parseFloat(amount || String(defaultRate));
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      toast.error("Enter a positive weekly rate");
      return;
    }
    if (!Number.isFinite(currentValue)) {
      toast.error("Fill your measurements first — no current value for " + meta.label);
      return;
    }
    const data = {
      metric,
      direction,
      amountPerWeek: parsedAmount,
      startValue: currentValue,
      startDate: initial?.startDate || new Date().toISOString(),
      targetValue: target ? parseFloat(target) : undefined,
      note: note.trim() || undefined,
    };
    if (editing) {
      updateGoal(initial.id, data);
      toast.success("Goal updated");
    } else {
      saveGoal(data);
      toast.success("Goal added", { description: `${meta.label} ${direction} ${parsedAmount}${unit}/wk` });
    }
    setOpen(false);
    setAmount(""); setTarget(""); setNote("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-none border-2 border-border max-w-md" data-testid="goal-dialog">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-tighter text-2xl flex items-center gap-2">
            <Target size={22} weight="duotone" className="text-[var(--brand-lime)]" />
            {editing ? "Edit Goal" : "New Weekly Goal"}
          </DialogTitle>
          <DialogDescription>
            Set a realistic weekly rate. Progress tracks from today's value.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Metric */}
          <div>
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Metric</Label>
            <Select value={metric} onValueChange={onMetricChange}>
              <SelectTrigger data-testid="goal-metric" className="rounded-none border-2 border-border mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {GOAL_METRIC_KEYS.map((k) => (
                  <SelectItem key={k} value={k}>{GOAL_METRICS[k].label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Direction */}
          <div>
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Direction</Label>
            <div className="mt-1.5 flex border-2 border-border overflow-hidden text-xs uppercase font-bold tracking-[0.15em]">
              <button
                data-testid="goal-dir-down"
                onClick={() => setDirection("down")}
                aria-pressed={direction === "down"}
                className={`flex-1 py-2 ${direction === "down" ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
              >
                Decrease ▼
              </button>
              <button
                data-testid="goal-dir-up"
                onClick={() => setDirection("up")}
                aria-pressed={direction === "up"}
                className={`flex-1 py-2 ${direction === "up" ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
              >
                Increase ▲
              </button>
            </div>
          </div>

          {/* Weekly amount */}
          <div>
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Per Week <span className="text-[var(--brand-lime)]">/ {unit || "value"}</span>
            </Label>
            <input
              data-testid="goal-amount"
              type="number"
              inputMode="decimal"
              step={meta.step}
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`e.g. ${defaultRate}`}
              className="w-full mt-1.5 bg-transparent border-2 border-border focus:border-[var(--brand-lime)] focus:outline-none px-3 py-2 text-lg font-mono-data"
            />
            <div className="text-[10px] text-muted-foreground mt-1">
              Current {meta.label}: <span className="font-mono-data text-foreground">
                {Number.isFinite(currentValue) ? `${currentValue.toFixed(2)}${unit}` : "—"}
              </span>
            </div>
          </div>

          {/* Optional target */}
          <div>
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Overall Target (optional) <span className="text-muted-foreground">/ {unit || "value"}</span>
            </Label>
            <input
              data-testid="goal-target"
              type="number"
              inputMode="decimal"
              step={meta.step}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 68"
              className="w-full mt-1.5 bg-transparent border-2 border-border focus:border-[var(--brand-lime)] focus:outline-none px-3 py-2 text-lg font-mono-data"
            />
          </div>

          {/* Note */}
          <div>
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Note (optional)</Label>
            <input
              data-testid="goal-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Spring cut · powerlifting prep · …"
              className="w-full mt-1.5 bg-transparent border-2 border-border focus:border-[var(--brand-lime)] focus:outline-none px-3 py-2 text-sm"
            />
          </div>

          <button
            data-testid="goal-submit"
            onClick={onSubmit}
            className="w-full py-3 bg-[var(--brand-lime)] text-black font-bold uppercase tracking-[0.15em] text-sm hover:bg-white transition-colors"
          >
            {editing ? "Save Changes" : "Add Goal"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
