import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Printer, ArrowCounterClockwise, Ruler, Barbell } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useMeasurements } from "@/context/MeasurementContext";
import { Button } from "@/components/ui/button";
import { NAV } from "@/constants/testIds";

export default function Header() {
  const { theme, toggle } = useTheme();
  const { state, setUnit, reset } = useMeasurements();
  const location = useLocation();

  return (
    <header
      data-testid={NAV.root}
      className="no-print sticky top-0 z-40 border-b border-border backdrop-blur-xl bg-background/80"
    >
      <div className="mx-auto max-w-[1600px] flex items-center justify-between px-4 sm:px-8 py-4">
        <Link
          to="/"
          data-testid={NAV.logo}
          className="flex items-center gap-2.5 group"
        >
          <div className="h-9 w-9 grid place-items-center bg-[var(--brand-lime)] text-black">
            <Barbell size={22} weight="duotone" />
          </div>
          <div className="font-display text-xl tracking-tighter uppercase">
            <span className="text-foreground">fitme</span>
            <span className="text-[var(--brand-lime)]">.pro</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit toggle */}
          <div
            data-testid={NAV.unitToggle}
            className="hidden sm:flex items-center border border-border overflow-hidden text-xs uppercase font-bold tracking-[0.15em]"
          >
            <button
              data-testid="unit-metric"
              onClick={() => setUnit("metric")}
              className={`px-3 py-2 transition-colors ${state.unit === "metric" ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
            >
              Metric
            </button>
            <button
              data-testid="unit-imperial"
              onClick={() => setUnit("imperial")}
              className={`px-3 py-2 transition-colors ${state.unit === "imperial" ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
            >
              Imperial
            </button>
          </div>

          <Button
            data-testid={NAV.themeToggle}
            variant="outline"
            size="icon"
            onClick={toggle}
            className="rounded-none border-border hover:border-[var(--brand-lime)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} weight="duotone" /> : <Moon size={18} weight="duotone" />}
          </Button>

          <Button
            data-testid={NAV.printBtn}
            variant="outline"
            size="icon"
            onClick={() => window.print()}
            className="rounded-none border-border hover:border-[var(--brand-lime)] hidden sm:inline-flex"
            aria-label="Print / Save PDF"
          >
            <Printer size={18} weight="duotone" />
          </Button>

          <Button
            data-testid={NAV.resetBtn}
            variant="outline"
            size="icon"
            onClick={reset}
            className="rounded-none border-border hover:border-red-500 hover:text-red-500 hidden sm:inline-flex"
            aria-label="Reset all inputs"
          >
            <ArrowCounterClockwise size={18} weight="duotone" />
          </Button>

          {location.pathname !== "/" && (
            <Link
              to="/"
              data-testid={NAV.dashboardLink}
              className="hidden md:inline-block px-4 py-2 bg-[var(--brand-lime)] text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
