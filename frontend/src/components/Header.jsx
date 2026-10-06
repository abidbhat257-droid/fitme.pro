import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@/components/HomeIcon";
import { useTheme } from "@/context/ThemeContext";
import { useMeasurements } from "@/context/MeasurementContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SnapshotDialog from "@/components/SnapshotDialog";
import GoalDialog from "@/components/GoalDialog";
import { downloadCSV, downloadJSON, downloadShareCard } from "@/lib/exports";
import { toast } from "sonner";
import { NAV } from "@/constants/testIds";

export default function Header() {
  const { theme, toggle } = useTheme();
  const { state, setUnit, reset } = useMeasurements();
  const location = useLocation();
  const doExport = (fn, label) => { try { fn(state); toast.success(`${label} exported`); } catch { toast.error(`${label} export failed`); } };
  const doReset = () => { reset(); toast("All inputs reset"); };

  return <header data-testid={NAV.root} className="no-print sticky top-0 z-40 border-b border-border backdrop-blur-xl bg-background/80">
    <div className="mx-auto max-w-[1600px] flex items-center justify-between px-4 sm:px-8 py-3 pl-16 sm:pl-20">
      <Link to="/" data-testid={NAV.logo} className="flex items-center gap-2.5 group" aria-label="FitMe Pro home" title="FitMe Pro — Health & Fitness Calculators">
        <img src="/fitme-pro-logo.svg" srcSet="/fitme-pro-logo.svg 40w, /fitme-pro-logo.svg 80w" sizes="40px" width="40" height="40" loading="eager" fetchPriority="high" decoding="async" className="h-10 w-10 object-contain shrink-0" alt="FitMe Pro health and fitness calculator logo" />
        <span className="font-display text-xl tracking-tighter uppercase"><span className="text-foreground">fitme</span><span className="text-[var(--brand-lime)]">.pro</span></span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link to="/journal" className="inline-flex sm:hidden items-center justify-center min-h-11 min-w-11 border border-border hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)] transition-colors" aria-label="FitMe Pro Journal" title="Journal"><HomeIcon name="book" size={18} /></Link>
        <Link to="/journal" className="hidden sm:inline-flex items-center gap-1.5 min-h-11 border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] font-bold hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)] transition-colors" aria-label="FitMe Pro Journal"><HomeIcon name="book" size={15} /> Journal</Link>
        <Button data-testid={NAV.resetBtn} variant="outline" size="icon" onClick={doReset} className="min-h-11 min-w-11 rounded-none border-border hover:border-red-500 hover:text-red-500" aria-label="Reset all inputs" title="Reset all inputs"><HomeIcon name="reset" size={18} /></Button>
        <div data-testid={NAV.unitToggle} className="hidden sm:flex items-center border border-border overflow-hidden text-xs uppercase font-bold tracking-[0.15em]" role="group" aria-label="Unit system"><button data-testid="unit-metric" onClick={() => setUnit("metric")} aria-pressed={state.unit === "metric"} className={`min-h-11 px-3 py-2 transition-colors ${state.unit === "metric" ? "bg-[var(--brand-lime)] text-white" : "hover:bg-muted"}`}>Metric</button><button data-testid="unit-imperial" onClick={() => setUnit("imperial")} aria-pressed={state.unit === "imperial"} className={`min-h-11 px-3 py-2 transition-colors ${state.unit === "imperial" ? "bg-[var(--brand-lime)] text-white" : "hover:bg-muted"}`}>Imperial</button></div>
        <DropdownMenu><DropdownMenuTrigger asChild><button data-testid="nav-actions-trigger" className="hidden sm:inline-flex items-center gap-1.5 min-h-11 border border-border px-3 py-2 text-xs uppercase tracking-[0.15em] font-bold hover:border-[var(--brand-lime)] hover:text-[var(--brand-lime)] transition-colors">Actions <HomeIcon name="chevron" size={12} /></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="rounded-none border-2 border-border w-56"><DropdownMenuItem data-testid="action-share-png" onClick={() => doExport(downloadShareCard, "Share card")} className="uppercase text-xs tracking-wider font-bold cursor-pointer"><HomeIcon name="share" size={14} className="mr-2" /> Share Image (PNG)</DropdownMenuItem><DropdownMenuItem data-testid="action-download-json" onClick={() => doExport(downloadJSON, "JSON")} className="uppercase text-xs tracking-wider font-bold cursor-pointer"><HomeIcon name="download" size={14} className="mr-2" /> Download JSON</DropdownMenuItem><DropdownMenuItem data-testid="action-download-csv" onClick={() => doExport(downloadCSV, "CSV")} className="uppercase text-xs tracking-wider font-bold cursor-pointer"><HomeIcon name="download" size={14} className="mr-2" /> Download CSV</DropdownMenuItem><DropdownMenuSeparator /><SnapshotDialog trigger={<DropdownMenuItem data-testid="action-snapshots" onSelect={(e) => e.preventDefault()} className="uppercase text-xs tracking-wider font-bold cursor-pointer"><HomeIcon name="camera" size={14} className="mr-2" /> Snapshots</DropdownMenuItem>} /><GoalDialog trigger={<DropdownMenuItem data-testid="action-new-goal" onSelect={(e) => e.preventDefault()} className="uppercase text-xs tracking-wider font-bold cursor-pointer"><HomeIcon name="target" size={14} className="mr-2" /> New Goal</DropdownMenuItem>} /><DropdownMenuItem asChild className="uppercase text-xs tracking-wider font-bold cursor-pointer"><Link to="/compare" data-testid="action-compare-link"><HomeIcon name="git" size={14} className="mr-2" /> Compare</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        <Button data-testid={NAV.themeToggle} variant="outline" size="icon" onClick={toggle} className="min-h-11 min-w-11 rounded-none border-border hover:border-[var(--brand-lime)]" aria-label="Toggle theme">{theme === "dark" ? <HomeIcon name="sun" size={18} /> : <HomeIcon name="moon" size={18} />}</Button>
        <Button data-testid={NAV.printBtn} variant="outline" size="icon" onClick={() => window.print()} className="min-h-11 min-w-11 rounded-none border-border hover:border-[var(--brand-lime)] hidden sm:inline-flex" aria-label="Print or save as PDF"><HomeIcon name="printer" size={18} /></Button>
        {location.pathname !== "/" && <Link to="/" data-testid={NAV.dashboardLink} className="hidden md:inline-flex min-h-11 items-center px-4 py-2 bg-[var(--brand-lime)] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-emerald-700 transition-colors">Dashboard</Link>}
      </div>
    </div>
  </header>;
}
