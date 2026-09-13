import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import { MeasurementProvider } from "@/context/MeasurementContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Dashboard from "@/pages/Dashboard";
import CalculatorPage from "@/pages/CalculatorPage";
import SpecializedCalculatorPage from "@/pages/SpecializedCalculatorPage";
import NewCalculatorPage from "@/pages/NewCalculatorPage";
import MissingCalculatorPage from "@/pages/MissingCalculatorPage";
import CalculatorsDirectory from "@/pages/CalculatorsDirectory";
import CalculatorCategoryHub from "@/pages/CalculatorCategoryHub";
import { SPECIALIZED_CALCULATORS } from "@/lib/specializedCalculators";
import { NEW_CALCULATORS } from "@/lib/newSpecializedCalculators";
import { ALL_CALCULATORS } from "@/lib/allCalculators";
import About from "./pages/about";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/terms";
import Contact from "./pages/contact";
import Compare from "@/pages/Compare";
import Journal from "@/pages/Journal";
import JournalCategory from "@/pages/JournalCategory";
import JournalArticle from "@/pages/JournalArticle";
import EditorialStandards from "@/pages/EditorialStandards";
import EvidenceSources from "@/pages/EvidenceSources";
import NotFoundPage from "@/pages/NotFoundPage";

function humanizeHeading(text) {
  return String(text)
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

function HeadingSpacingManager() {
  const location = useLocation();

  useEffect(() => {
    const normalizeHeadings = () => {
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
        const text = heading.textContent || "";
        const normalized = humanizeHeading(text);
        if (normalized !== text) heading.textContent = normalized;
      });
    };

    normalizeHeadings();
    const observer = new MutationObserver(normalizeHeadings);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.key]);

  return null;
}

function ScrollManager(){const location=useLocation();const navigationType=useNavigationType();useLayoutEffect(()=>{if("scrollRestoration" in window.history)window.history.scrollRestoration="auto"},[]);useEffect(()=>{const onClick=e=>{const t=e.target instanceof Element?e.target.closest("a"):null;if(t&&(t.textContent||"").trim().toLowerCase().includes("back to dashboard")){e.preventDefault();if(window.history.length>1)window.history.back();else window.location.assign("/")}};document.addEventListener("click",onClick,true);return()=>document.removeEventListener("click",onClick,true)},[]);useEffect(()=>{if(navigationType!=="PUSH"&&navigationType!=="REPLACE")return;const f=requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:"auto"}));return()=>cancelAnimationFrame(f)},[location.key,navigationType]);return null}
function LegacyCalculatorRedirect(){const {slug}=useParams();return <Navigate to={slug?`/${slug}-calculator`:"/"} replace/>}
function renderCalculator(c){if(["navy-body-fat","army-body-fat"].includes(c.id))return <Navigate to="/body-fat-calculator" replace/>;if(c.id==="calorie-calculator")return <Navigate to="/daily-calorie-needs-calculator" replace/>;if(c.source==="core")return <CalculatorPage seoSlug={c.id}/>;if(c.source==="missing")return <MissingCalculatorPage/>;return c.computeExtra?<NewCalculatorPage calculatorId={c.id}/>:<SpecializedCalculatorPage calculatorId={c.id}/>;}
function App(){return <div className="App"><ThemeProvider><MeasurementProvider><BrowserRouter><ScrollManager/><HeadingSpacingManager/><Sidebar/><Header/><Routes><Route path="/" element={<Dashboard/>}/><Route path="/calculators" element={<CalculatorsDirectory/>}/><Route path="/calculator-category/:hub" element={<CalculatorCategoryHub/>}/><Route path="/about" element={<About/>}/><Route path="/privacy-policy" element={<PrivacyPolicy/>}/><Route path="/terms" element={<Terms/>}/><Route path="/contact" element={<Contact/>}/><Route path="/compare" element={<Compare/>}/><Route path="/journal" element={<Journal/>}/><Route path="/journal/editorial-standards" element={<EditorialStandards/>}/><Route path="/journal/evidence-sources" element={<EvidenceSources/>}/><Route path="/journal/:categorySlug" element={<JournalCategory/>}/><Route path="/journal/:categorySlug/:slug" element={<JournalArticle/>}/><Route path="/calculator/:slug" element={<LegacyCalculatorRedirect/>}/>{ALL_CALCULATORS.map(c=><Route key={c.id} path={c.url} element={renderCalculator(c)}/>)}<Route path="/bmi-calculator" element={<CalculatorPage seoSlug="bmi"/>}/><Route path="/bmi-prime-calculator" element={<CalculatorPage seoSlug="bmi-prime"/>}/><Route path="/healthy-weight-range-calculator" element={<CalculatorPage seoSlug="healthy-weight-range"/>}/><Route path="/ideal-body-weight-calculator" element={<CalculatorPage seoSlug="ideal-body-weight"/>}/><Route path="/body-fat-calculator" element={<CalculatorPage seoSlug="body-fat"/>}/><Route path="/relative-fat-mass-calculator" element={<CalculatorPage seoSlug="relative-fat-mass"/>}/><Route path="/body-adiposity-index-calculator" element={<CalculatorPage seoSlug="body-adiposity-index"/>}/><Route path="/lean-body-mass-calculator" element={<CalculatorPage seoSlug="lean-body-mass"/>}/><Route path="/fat-mass-calculator" element={<CalculatorPage seoSlug="fat-mass"/>}/><Route path="/fat-free-mass-calculator" element={<CalculatorPage seoSlug="fat-free-mass"/>}/><Route path="/ffmi-calculator" element={<CalculatorPage seoSlug="ffmi"/>}/><Route path="/waist-hip-ratio-calculator" element={<CalculatorPage seoSlug="waist-hip-ratio"/>}/><Route path="/waist-height-ratio-calculator" element={<CalculatorPage seoSlug="waist-height-ratio"/>}/><Route path="/absi-calculator" element={<CalculatorPage seoSlug="absi"/>}/><Route path="/bri-calculator" element={<CalculatorPage seoSlug="bri"/>}/><Route path="/conicity-index-calculator" element={<CalculatorPage seoSlug="conicity-index"/>}/><Route path="/body-frame-size-calculator" element={<CalculatorPage seoSlug="body-frame-size"/>}/><Route path="/bmr-calculator" element={<CalculatorPage seoSlug="bmr"/>}/><Route path="/tdee-calculator" element={<CalculatorPage seoSlug="tdee"/>}/><Route path="/daily-calorie-needs-calculator" element={<CalculatorPage seoSlug="daily-calorie-needs"/>}/><Route path="/calorie-deficit-calculator" element={<CalculatorPage seoSlug="calorie-deficit"/>}/><Route path="/calorie-surplus-calculator" element={<CalculatorPage seoSlug="calorie-surplus"/>}/><Route path="/body-surface-area-calculator" element={<CalculatorPage seoSlug="body-surface-area"/>}/><Route path="/ponderal-index-calculator" element={<CalculatorPage seoSlug="ponderal-index"/>}/><Route path="/adjusted-body-weight-calculator" element={<CalculatorPage seoSlug="adjusted-body-weight"/>}/><Route path="/body-density-calculator" element={<CalculatorPage seoSlug="body-density"/>}/><Route path="/obesity-class-calculator" element={<CalculatorPage seoSlug="obesity-class"/>}/><Route path="/weight-loss-goal-calculator" element={<Navigate to="/weight-loss-timeline-calculator" replace/>}/><Route path="/weight-gain-goal-calculator" element={<Navigate to="/weight-gain-calorie-calculator" replace/>}/><Route path="/navy-body-fat-calculator" element={<Navigate to="/body-fat-calculator" replace/>}/><Route path="/army-body-fat-calculator" element={<Navigate to="/body-fat-calculator" replace/>}/><Route path="/calorie-calculator" element={<Navigate to="/daily-calorie-needs-calculator" replace/>}/><Route path="*" element={<NotFoundPage/>}/></Routes><Footer/><Toaster position="top-right" richColors closeButton theme="dark"/></BrowserRouter></MeasurementProvider></ThemeProvider></div>}
export default App;
