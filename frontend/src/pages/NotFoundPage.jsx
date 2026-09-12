import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found | FitMe Pro";
    const robots = document.head.querySelector('meta[name="robots"]') || document.head.appendChild(document.createElement("meta"));
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex,follow");
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)]">404</p>
      <h1 className="mt-3 font-display text-4xl uppercase tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        This FitMe Pro page does not exist or may have moved. Explore the calculator directory to find the right tool.
      </p>
      <Link to="/calculators" className="mt-8 inline-flex border border-border px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:border-[var(--brand-lime)]">
        Browse calculators
      </Link>
    </main>
  );
}
