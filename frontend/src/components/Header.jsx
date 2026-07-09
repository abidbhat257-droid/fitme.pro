import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Printer, ArrowCounterClockwise, Barbell, Camera, DownloadSimple, ShareNetwork, GitDiff, CaretDown, Target } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";
import { useMeasurements } from "@/context/MeasurementContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SnapshotDialog from "@/components/SnapshotDialog";
import GoalDialog from "@/components/GoalDialog";
import { downloadCSV, downloadJSON, downloadShareCard } from "@/lib/exports";
import { toast } from "sonner";
import { NAV } from "@/constants/testIds";

export default function Header() {
  const { theme, toggle } = useTheme();
  const { state, setUnit, reset } = useMeasurements();
  const location = useLocation();

  const doExport = (fn, label) => {
    try {
      fn(state);
      toast.success(`${label} exported`);
    } catch {
      toast.error(`${label} export failed`);
    }
  };

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
          aria-label="Fitme Pro home"
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
            role="group"
            aria-label="Unit system"
          >
            <button
              data-testid="unit-metric"
              onClick={() => setUnit("metric")}
              aria-pressed={state.unit === "metric"}
              className={`px-3 py-2 transition-colors ${state.unit === "metric" ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
            >
              Metric
            </button>
            <button
              data-testid="unit-imperial"
              onClick={() => setUnit("imperial")}
              aria-pressed={state.unit === "imperial"}
              className={`px-3 py-2 transition-colors ${state.unit === "imperial" ? "bg-[var(--brand-lime)] text-black" : "hover:bg-muted"}`}
            >
              Imperial
            </button>
          </div>

          {/* Actions dropdown (Export, Share, Snapshots, Compare) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                data-testid="nav-actions-trigger"
                className="hidden sm:inline-flex items-center gap-1.5 border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] font-bold hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)] transition-colors"
              >
                Actions <CaretDown size={12} weight="bold" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none border-2 border-border w-56">
              <DropdownMenuItem
                data-testid="action-share-png"
                onClick={() => doExport(downloadShareCard, "Share card")}
                className="uppercase text-xs tracking-wider font-bold cursor-pointer"
              >
                <ShareNetwork size={14} weight="duotone" className="mr-2" /> Share Image (PNG)
              </DropdownMenuItem>
              <DropdownMenuItem
                data-testid="action-download-json"
                onClick={() => doExport(downloadJSON, "JSON")}
                className="uppercase text-xs tracking-wider font-bold cursor-pointer"
              >
                <DownloadSimple size={14} weight="duotone" className="mr-2" /> Download JSON
              </DropdownMenuItem>
              <DropdownMenuItem
                data-testid="action-download-csv"
                onClick={() => doExport(downloadCSV, "CSV")}
                className="uppercase text-xs tracking-wider font-bold cursor-pointer"
              >
                <DownloadSimple size={14} weight="duotone" className="mr-2" /> Download CSV
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <SnapshotDialog
                trigger={
                  <DropdownMenuItem
                    data-testid="action-snapshots"
                    onSelect={(e) => e.preventDefault()}
                    className="uppercase text-xs tracking-wider font-bold cursor-pointer"
                  >
                    <Camera size={14} weight="duotone" className="mr-2" /> Snapshots
                  </DropdownMenuItem>
                }
              />
              <GoalDialog
                trigger={
                  <DropdownMenuItem
                    data-testid="action-new-goal"
                    onSelect={(e) => e.preventDefault()}
                    className="uppercase text-xs tracking-wider font-bold cursor-pointer"
                  >
                    <Target size={14} weight="duotone" className="mr-2" /> New Goal
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuItem asChild className="uppercase text-xs tracking-wider font-bold cursor-pointer">
                <Link to="/compare" data-testid="action-compare-link">
                  <GitDiff size={14} weight="duotone" className="mr-2" /> Compare
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
            aria-label="Print or save as PDF"
          >
            <Printer size={18} weight="duotone" />
          </Button>

          <Button
            data-testid={NAV.resetBtn}
            variant="outline"
            size="icon"
            onClick={() => { reset(); toast("Reset"); }}
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
