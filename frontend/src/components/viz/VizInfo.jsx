import React from "react";
import { Info } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getTooltip } from "@/lib/vizTooltips";

export default function VizInfo({ slug }) {
  const t = getTooltip(slug);
  if (!t) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          data-testid={`viz-info-${slug}`}
          aria-label="Methodology & sources"
          className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-[var(--brand-lime)] transition-colors"
        >
          <Info size={14} weight="duotone" />
          <span>Methodology</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="rounded-none border-2 border-border w-[320px] p-4 space-y-3"
      >
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)] mb-1">What it measures</div>
          <p className="text-xs leading-relaxed">{t.what}</p>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 mb-1">Caveats</div>
          <p className="text-xs leading-relaxed text-muted-foreground">{t.caveat}</p>
        </div>
        <div className="border-t border-border pt-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-1">Source</div>
          <p className="text-[11px] font-mono-data text-foreground/80 leading-relaxed">{t.source}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
