import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-10">
          <h1 className="mb-4 text-3xl font-bold">Contact FitMe Pro</h1>

          <p className="mb-8 text-gray-600">
            We'd love to hear from you. Contact FitMe Pro if you have
            feedback, find an error in one of our calculators, have a
            question about the website, or are interested in business or
            collaboration opportunities.
          </p>

          <h2 className="mb-3 text-2xl font-semibold">
            What can you contact us about?
          </h2>

          <ul className="mb-8 list-disc space-y-2 pl-6 text-gray-600">
            <li>Website feedback</li>
            <li>Calculator errors or corrections</li>
            <li>Questions about FitMe Pro</li>
            <li>Business and collaboration inquiries</li>
          </ul>

          <div className="mb-8 rounded-xl border p-5">
            <h2 className="mb-2 text-xl font-semibold">Important</h2>
            <p className="text-gray-600">
              Please do not send sensitive medical information, passwords,
              financial information, or other private information through
              the contact page.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/privacy-policy"
              className="font-medium underline"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="font-medium underline"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
