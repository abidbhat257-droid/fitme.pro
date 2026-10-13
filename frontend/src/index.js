import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "./App.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

// The prerendered HTML ships its own JSON-LD in <head>. When React adds the page's
// own (id="fitme-...") schema, drop the static duplicate so each page has one copy.
const dropStaticJsonLd = () => {
  const head = document.head;
  if (!head.querySelector('script[type="application/ld+json"][id^="fitme-"]')) return;
  head
    .querySelectorAll('script[type="application/ld+json"]:not([id]):not([data-fitme-home-schema])')
    .forEach((s) => s.remove());
};
new MutationObserver(dropStaticJsonLd).observe(document.head, { childList: true });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
