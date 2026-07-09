import React, { useState } from "react";
import { toast } from "sonner";
import { useMeasurements } from "@/context/MeasurementContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, ArrowClockwise, Camera } from "@phosphor-icons/react";

export default function SnapshotDialog({ trigger }) {
  const { snapshots, saveSnapshot, deleteSnapshot, loadSnapshot, state } = useMeasurements();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const anyInput = ["age", "height", "weight", "waist", "hip", "neck", "wrist"]
    .some((k) => state[k] !== "" && state[k] != null);

  const onSave = () => {
    if (!anyInput) {
      toast.error("Enter some measurements first");
      return;
    }
    const snap = saveSnapshot(name);
    toast.success("Snapshot saved", { description: snap.name });
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-none border-2 border-border max-w-lg" data-testid="snapshot-dialog">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-tighter text-2xl flex items-center gap-2">
            <Camera size={22} weight="duotone" className="text-[var(--brand-lime)]" />
            Snapshots
          </DialogTitle>
          <DialogDescription>
            Save your current measurements as a snapshot. Restore or compare them later.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mt-2">
          <input
            data-testid="snapshot-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Baseline · Jan 12"
            className="flex-1 bg-transparent border-2 border-border focus:border-[var(--brand-lime)] focus:outline-none px-3 py-2 text-sm font-mono-data"
          />
          <button
            data-testid="snapshot-save-btn"
            onClick={onSave}
            className="px-4 py-2 bg-[var(--brand-lime)] text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors"
          >
            Save
          </button>
        </div>

        <div className="mt-4 max-h-[300px] overflow-y-auto border border-border divide-y divide-border">
          {snapshots.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No snapshots yet.</div>
          ) : (
            snapshots.map((s) => (
              <div key={s.id} data-testid={`snapshot-item-${s.id}`} className="p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate">{s.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono-data">
                    {new Date(s.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => { loadSnapshot(s.id); toast.success("Snapshot loaded"); setOpen(false); }}
                    className="p-2 border border-border hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)] transition-colors"
                    aria-label="Restore snapshot"
                  >
                    <ArrowClockwise size={14} weight="bold" />
                  </button>
                  <button
                    onClick={() => { deleteSnapshot(s.id); toast("Deleted"); }}
                    className="p-2 border border-border hover:border-red-500 hover:text-red-500 transition-colors"
                    aria-label="Delete snapshot"
                  >
                    <Trash size={14} weight="bold" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {snapshots.length >= 2 && (
          <a
            href="/compare"
            data-testid="snapshot-compare-link"
            className="mt-2 block text-center text-xs uppercase tracking-[0.15em] font-bold text-[var(--brand-lime)] hover:underline"
          >
            → Compare two snapshots
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
