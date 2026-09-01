import React from "react";
import { Link } from "react-router-dom";
import { getExpansionSections } from "@/lib/longFormExpansion";
import { CALCULATORS } from "@/lib/calculators";

const HEADINGS = [
  "What Is {name}?",
  "Why This Calculation Matters",
  "Inputs and Measurement Guide",
  "The Formula Explained",
  "How to Interpret Your Result",
  "Accuracy and What Can Affect It",
  "Common Mistakes to Avoid",
  "Using the Result for Fitness Planning",
  "Related Health and Body-Composition Measures",
  "Tracking Changes Over Time",
  "When to Seek Professional Guidance",
  "Key Takeaways",
  "Understanding the Calculation as a Model",
  "Getting Better Inputs",
  "Units and Conversion",
  "Why Trends Matter More Than One Reading",
  "Understanding Reference Ranges",
  "Combining Complementary Measures",
  "What Changes During Weight Loss",
  "What Changes During Weight Gain",
  "Mathematical Precision vs Biological Precision",
  "Why Different Equations Disagree",
  "Turning the Number Into a Practical Decision",
  "Using Numbers Without Obsessing Over Them",
  "What to Look for in a Quality Calculator",
  "Final Takeaways",
];

function formatHeading(template, name) {
  return template.replace("{name}", name);
}

export default function LongFormArticle({ content, calc }) {
  if (!content) return null;

  const sections = [
    ...(content.sections || []),
    ...getExpansionSections(content),
  ];

  const relatedNames = content.related || [];
  const relatedLinks = relatedNames
    .map((name) => {
      const found = CALCULATORS.find((item) => item.name === name);
      return found ? { name, slug: found.slug } : null;
    })
    .filter(Boolean);

  return (
    <article className="border-t border-border pt-10 mt-2 space-y-8" data-testid="long-form-seo-content">
      <header>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)] mb-2">
          Complete Guide
        </div>
        <h2 className="font-display text-3xl uppercase tracking-tighter leading-tight">
          {content.name || calc?.name}
        </h2>
        <p className="mt-4 text-base text-muted-foreground leading-8">
          This guide explains how the calculation works, what the result can tell you, how to measure inputs consistently, and how to use the number responsibly.
        </p>
      </header>

      <div className="space-y-8">
        {sections.map((text, index) => {
          const heading = formatHeading(
            HEADINGS[index % HEADINGS.length],
            content.name || calc?.name || "This Calculator"
          );
          return (
            <section key={`${index}-${heading}`}>
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight mb-3">
                {heading}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-8">
                {text}
              </p>
            </section>
          );
        })}
      </div>

      {relatedLinks.length > 0 && (
        <section className="border border-border bg-card p-6">
          <h3 className="font-display text-xl uppercase tracking-tight mb-4">
            Related Calculators
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {relatedLinks.map((item) => (
              <Link
                key={item.slug}
                to={`/${item.slug}-calculator`}
                className="border border-border px-4 py-3 text-sm font-bold hover:text-[var(--brand-lime)] hover:border-[var(--brand-lime)] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border border-border p-6 bg-card">
        <h3 className="font-display text-xl uppercase tracking-tight mb-3">
          Important Health Note
        </h3>
        <p className="text-sm text-muted-foreground leading-7">
          FitMe Pro calculators provide educational estimates. They do not diagnose disease, replace clinical assessment, or guarantee a particular health or fitness outcome. If a result is unexpected, concerning, or relevant to a medical condition, discuss it with a qualified healthcare professional.
        </p>
      </section>
    </article>
  );
}
