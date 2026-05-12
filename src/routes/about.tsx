import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DevTools Hub" },
      { name: "description", content: "About DevTools Hub: a fast, privacy-first toolbox for developers." },
      { property: "og:title", content: "About — DevTools Hub" },
      { property: "og:description", content: "Why we built DevTools Hub." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">About DevTools Hub</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        DevTools Hub is a focused collection of tools that developers reach for every day —
        formatters, encoders, decoders, and converters. Every tool runs entirely in your browser.
      </p>
      <div className="prose prose-invert mt-8 max-w-none text-foreground/90">
        <h2 className="mt-8 text-xl font-semibold">Why another tools site?</h2>
        <p className="mt-2 text-muted-foreground">
          Most online utilities are slow, ad-heavy, or send your data to a server. We built DevTools Hub to be
          minimal, private, and instant. No accounts, no tracking, no uploads.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Built with</h2>
        <p className="mt-2 text-muted-foreground">
          React, TypeScript, Tailwind CSS — deployed on the edge. Open to feedback and pull requests.
        </p>
        <p className="mt-8">
          <Link to="/tools" className="text-primary underline-offset-4 hover:underline">Browse the tools →</Link>
        </p>
      </div>
    </article>
  );
}
