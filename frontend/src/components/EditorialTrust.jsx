import React from "react";
import { Link } from "react-router-dom";

export default function EditorialTrust({ compact = false }) {
  return <section className={compact ? "mt-4 border-t border-border pt-4" : "mt-8 border border-border bg-card p-5 sm:p-6"}>
    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">Editorial &amp; evidence</div>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">
      <strong className="text-foreground">FitMe Pro Editorial Team</strong> · AI-assisted content and review checked against authoritative public-health and scientific sources. No medical credentials are claimed for the team.
    </p>
    <p className="mt-2 text-xs leading-5 text-muted-foreground">
      Last reviewed October 5, 2026. Sources and methodology are available in our <Link className="underline" to="/journal/evidence-sources">Evidence Sources</Link> and <Link className="underline" to="/journal/editorial-standards">Editorial Standards</Link>.
    </p>
  </section>;
}
