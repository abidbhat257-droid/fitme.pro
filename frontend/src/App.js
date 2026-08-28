import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import { MeasurementProvider } from "@/context/MeasurementContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dashboard from "@/pages/Dashboard";
import CalculatorPage from "@/pages/CalculatorPage";
import About from "./pages/about";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/terms";
import Contact from "./pages/Contact";
import Compare from "@/pages/Compare";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
          <BrowserRouter>
            <Header />
            <Routes>
    <Route path="/contact" element={<Contact />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/calculator/:slug" element={<CalculatorPage />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
            <Footer />
            <Toaster position="top-right" richColors closeButton theme="dark" />
          </BrowserRouter>
        </MeasurementProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
