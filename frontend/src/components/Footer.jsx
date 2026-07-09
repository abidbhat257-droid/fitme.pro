import React from "react";
import { Barbell } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="no-print border-t border-border bg-background/60 mt-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 grid place-items-center bg-[var(--brand-lime)] text-black">
              <Barbell size={20} weight="duotone" />
            </div>
            <span className="font-display text-lg uppercase tracking-tighter">fitme<span className="text-[var(--brand-lime)]">.pro</span></span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            A premium suite of 30 body-composition and obesity calculators. Enter your measurements once — get every insight instantly.
          </p>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">Disclaimer</div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Fitme Pro provides educational estimates only. Consult a licensed physician for medical decisions.
          </p>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">Privacy</div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your data stays on your device. Nothing is uploaded, tracked, or shared.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        © {new Date().getFullYear()} Fitme Pro — Built for the health-obsessed.
      </div>
    </footer>
  );
}
