import React from "react";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FitMe Pro",
  "url": "https://fitme-pro.vercel.app/",
  "logo": "https://fitme-pro.vercel.app/fitme-pro-logo.svg",
  "sameAs": [
    "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ffitme-pro.vercel.app%2F",
    "https://twitter.com/intent/tweet?url=https%3A%2F%2Ffitme-pro.vercel.app%2F&text=FitMe%20Pro%20health%20and%20fitness%20calculators",
    "https://github.com/abidbhat257-droid/fitme.pro"
  ]
};

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <div className="rounded-2xl border border-border bg-background p-6 sm:p-10">
        <h1 className="mb-6 text-3xl font-bold">About FitMe Pro</h1>

        <p className="mb-8 leading-relaxed text-muted-foreground">
          FitMe Pro is a free health and fitness calculator platform designed
          to help people understand common body-composition, fitness, and
          health measurements. It is run under the FitMe Pro brand. This page
          does not claim named staff members or medical credentials for the team.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">What FitMe Pro provides</h2>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          FitMe Pro provides 100 calculators covering areas such as body
          composition, weight, calories, metabolism, nutrition, running,
          strength, fitness, and related health and fitness measurements. Each
          calculator is designed to provide an estimate based on the information
          entered by the user.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">How calculators are built and checked</h2>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          Each calculator explains its inputs, method, result, and important
          limitations. Calculations use defined formulas and the values entered
          by the user. Content and methodology are reviewed at a brand level by
          the FitMe Pro Editorial Team. No individual medical qualifications are
          claimed. Results can differ when formulas use different assumptions,
          units, or reference populations, so the method and limits matter.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">Sources policy</h2>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          FitMe Pro uses public-health and scientific sources where relevant to
          explain methods and health context. Sources should be appropriate to
          the topic, and the explanations should distinguish an estimate from
          clinical advice. Read the{" "}
          <a href="/journal/evidence-sources" className="font-medium underline">Evidence Sources</a>
          {" "}page for source information and the{" "}
          <a href="/journal/editorial-standards" className="font-medium underline">Editorial Standards</a>
          {" "}page for the content and review approach.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">Important limitations</h2>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          FitMe Pro calculators provide estimates and general educational
          information. Results may vary depending on the formula and the
          information provided. They are not a substitute for professional
          medical advice, diagnosis, or treatment. For health concerns, symptoms,
          medication decisions, pregnancy, eating disorders, or other individual
          circumstances, consult a qualified healthcare professional.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">Report an error or correction</h2>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          If a formula, result, explanation, or link appears incorrect, please
          describe the issue and the page where you found it. Use the{" "}
          <a href="/contact" className="font-medium underline">Contact page</a>
          {" "}to send feedback or request a correction.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">Last updated</h2>
        <p className="mb-8 leading-relaxed text-muted-foreground">
          <time dateTime="2026-10-11">October 11, 2026</time>
        </p>
      </div>
    </main>
  );
}
