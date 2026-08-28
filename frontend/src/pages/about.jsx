import React from "react";

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
      <div className="rounded-2xl border border-border bg-background p-6 sm:p-10">
        <h1 className="mb-6 text-3xl font-bold">
          About FitMe Pro
        </h1>

        <p className="mb-8 leading-relaxed text-muted-foreground">
          FitMe Pro is a free health and fitness calculator platform designed
          to help people understand common body-composition, fitness, and
          health measurements.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">
          What FitMe Pro provides
        </h2>

        <p className="mb-8 leading-relaxed text-muted-foreground">
          FitMe Pro provides 30 calculators covering areas such as body
          composition, weight, calories, metabolism, and related health and
          fitness measurements. Each calculator is designed to provide a
          simple estimate based on the information entered by the user.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">
          Our purpose
        </h2>

        <p className="mb-8 leading-relaxed text-muted-foreground">
          Our goal is to make health and fitness calculations easier to
          understand and accessible to everyone. The calculators are intended
          to help users learn more about their measurements and fitness goals.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">
          Important limitations
        </h2>

        <p className="mb-8 leading-relaxed text-muted-foreground">
          FitMe Pro calculators provide estimates and general educational
          information. Results may vary depending on the formula and the
          information provided. They are not a substitute for professional
          medical advice, diagnosis, or treatment.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">
          Professional advice
        </h2>

        <p className="mb-8 leading-relaxed text-muted-foreground">
          If you have concerns about your health, weight, nutrition, or
          fitness, consult a qualified healthcare or fitness professional
          before making important health decisions.
        </p>

        <h2 className="mb-3 text-2xl font-semibold">
          Contact FitMe Pro
        </h2>

        <p className="leading-relaxed text-muted-foreground">
          Have feedback or found an issue with one of our calculators?
          Visit our{" "}
          <a href="/contact" className="font-medium underline">
            Contact page
          </a>{" "}
          to get in touch.
        </p>
      </div>
    </main>
  );
}
