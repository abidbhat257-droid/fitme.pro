import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import { MeasurementProvider } from "@/context/MeasurementContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dashboard from "@/pages/Dashboard";
import CalculatorPage from "@/pages/CalculatorPage";
import Compare from "@/pages/Compare";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <MeasurementProvider>
          <BrowserRouter>
            <Header />
            <Routes>
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
