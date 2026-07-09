export const HOME = {
  emergentLink: "home-emergent-link",
};

export const NAV = {
  root: "nav-root",
  logo: "nav-logo",
  dashboardLink: "nav-dashboard-link",
  themeToggle: "nav-theme-toggle",
  unitToggle: "nav-unit-toggle",
  printBtn: "nav-print-btn",
  resetBtn: "nav-reset-btn",
};

export const PANEL = {
  root: "measurement-panel",
  age: "input-age",
  sex: "input-sex",
  height: "input-height",
  weight: "input-weight",
  waist: "input-waist",
  hip: "input-hip",
  neck: "input-neck",
  wrist: "input-wrist",
  activity: "input-activity",
  goalWeight: "input-goal-weight",
  unitMetric: "unit-metric",
  unitImperial: "unit-imperial",
};

export const DASH = {
  root: "dashboard-root",
  category: (k) => `dash-category-${k}`,
  cardsGrid: "dash-cards-grid",
  search: "dash-search",
};

export const CARD = {
  root: (id) => `calc-card-${id}`,
  value: (id) => `calc-value-${id}`,
  category: (id) => `calc-category-${id}`,
  detailsLink: (id) => `calc-details-${id}`,
  copyBtn: (id) => `calc-copy-${id}`,
};

export const SEO = {
  root: (slug) => `seo-page-${slug}`,
  backLink: "seo-back-link",
  faqItem: (i) => `seo-faq-${i}`,
};
