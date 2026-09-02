import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import { MeasurementProvider } from "@/context/MeasurementContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dashboard from "@/pages/Dashboard";
import CalculatorPage from "@/pages/CalculatorPage";
import CalorieCalculator from "@/pages/CalorieCalculator";
import MacroCalculator from "@/pages/MacroCalculator";
import ProteinCalculator from "@/pages/ProteinCalculator";
import CaloriesBurnedCalculator from "@/pages/CaloriesBurnedCalculator";
import PaceCalculator from "@/pages/PaceCalculator";
import CarbohydrateCalculator from "@/pages/CarbohydrateCalculator";
import FatIntakeCalculator from "@/pages/FatIntakeCalculator";
import OneRepMaxCalculator from "@/pages/OneRepMaxCalculator";
import TargetHeartRateCalculator from "@/pages/TargetHeartRateCalculator";
import ArmyBodyFatCalculator from "@/pages/ArmyBodyFatCalculator";
import About from "./pages/about";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/terms";
import Contact from "./pages/contact";
import Compare from "@/pages/Compare";

function LegacyCalculatorRedirect() { const { slug } = useParams(); return <Navigate to={slug ? `/${slug}-calculator` : "/"} replace />; }

function App() {
  return <div className="App"><ThemeProvider><MeasurementProvider><BrowserRouter><Header /><Routes>
    <Route path="/" element={<Dashboard />} /><Route path="/about" element={<About />} /><Route path="/privacy-policy" element={<PrivacyPolicy />} /><Route path="/terms" element={<Terms />} /><Route path="/contact" element={<Contact />} /><Route path="/compare" element={<Compare />} />
    <Route path="/calculator/:slug" element={<LegacyCalculatorRedirect />} />
    <Route path="/calorie-calculator" element={<CalorieCalculator />} /><Route path="/macro-calculator" element={<MacroCalculator />} /><Route path="/protein-calculator" element={<ProteinCalculator />} /><Route path="/calories-burned-calculator" element={<CaloriesBurnedCalculator />} /><Route path="/pace-calculator" element={<PaceCalculator />} />
    <Route path="/carbohydrate-calculator" element={<CarbohydrateCalculator />} /><Route path="/fat-intake-calculator" element={<FatIntakeCalculator />} /><Route path="/one-rep-max-calculator" element={<OneRepMaxCalculator />} /><Route path="/target-heart-rate-calculator" element={<TargetHeartRateCalculator />} /><Route path="/army-body-fat-calculator" element={<ArmyBodyFatCalculator />} />
    <Route path="/bmi-calculator" element={<CalculatorPage seoSlug="bmi" />} /><Route path="/bmi-prime-calculator" element={<CalculatorPage seoSlug="bmi-prime" />} /><Route path="/healthy-weight-range-calculator" element={<CalculatorPage seoSlug="healthy-weight-range" />} /><Route path="/ideal-body-weight-calculator" element={<CalculatorPage seoSlug="ideal-body-weight" />} /><Route path="/weight-loss-goal-calculator" element={<CalculatorPage seoSlug="weight-loss-goal" />} /><Route path="/weight-gain-goal-calculator" element={<CalculatorPage seoSlug="weight-gain-goal" />} /><Route path="/body-fat-calculator" element={<CalculatorPage seoSlug="body-fat" />} /><Route path="/navy-body-fat-calculator" element={<CalculatorPage seoSlug="navy-body-fat" />} /><Route path="/relative-fat-mass-calculator" element={<CalculatorPage seoSlug="relative-fat-mass" />} /><Route path="/body-adiposity-index-calculator" element={<CalculatorPage seoSlug="body-adiposity-index" />} /><Route path="/lean-body-mass-calculator" element={<CalculatorPage seoSlug="lean-body-mass" />} /><Route path="/fat-mass-calculator" element={<CalculatorPage seoSlug="fat-mass" />} /><Route path="/fat-free-mass-calculator" element={<CalculatorPage seoSlug="fat-free-mass" />} /><Route path="/ffmi-calculator" element={<CalculatorPage seoSlug="ffmi" />} /><Route path="/waist-hip-ratio-calculator" element={<CalculatorPage seoSlug="waist-hip-ratio" />} /><Route path="/waist-height-ratio-calculator" element={<CalculatorPage seoSlug="waist-height-ratio" />} /><Route path="/absi-calculator" element={<CalculatorPage seoSlug="absi" />} /><Route path="/bri-calculator" element={<CalculatorPage seoSlug="bri" />} /><Route path="/conicity-index-calculator" element={<CalculatorPage seoSlug="conicity-index" />} /><Route path="/body-frame-size-calculator" element={<CalculatorPage seoSlug="body-frame-size" />} /><Route path="/bmr-calculator" element={<CalculatorPage seoSlug="bmr" />} /><Route path="/tdee-calculator" element={<CalculatorPage seoSlug="tdee" />} /><Route path="/daily-calorie-needs-calculator" element={<CalculatorPage seoSlug="daily-calorie-needs" />} /><Route path="/calorie-deficit-calculator" element={<CalculatorPage seoSlug="calorie-deficit" />} /><Route path="/calorie-surplus-calculator" element={<CalculatorPage seoSlug="calorie-surplus" />} /><Route path="/body-surface-area-calculator" element={<CalculatorPage seoSlug="body-surface-area" />} /><Route path="/ponderal-index-calculator" element={<CalculatorPage seoSlug="ponderal-index" />} /><Route path="/adjusted-body-weight-calculator" element={<CalculatorPage seoSlug="adjusted-body-weight" />} /><Route path="/body-density-calculator" element={<CalculatorPage seoSlug="body-density" />} /><Route path="/obesity-class-calculator" element={<CalculatorPage seoSlug="obesity-class" />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes><Footer /><Toaster position="top-right" richColors closeButton theme="dark" /></BrowserRouter></MeasurementProvider></ThemeProvider></div>;
}
export default App;
