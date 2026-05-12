import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — DevTools Hub" },
      { name: "description", content: "Privacy policy for DevTools Hub. We don't collect or send your data anywhere." },
      { property: "og:title", content: "Privacy Policy — DevTools Hub" },
      { property: "og:description", content: "Our privacy approach: client-side only." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mt-8 space-y-6 text-muted-foreground">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Local-first by design</h2>
          <p className="mt-2">All tools execute in your browser. Inputs you paste never leave your device.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Cookies & storage</h2>
          <p className="mt-2">We use <code>localStorage</code> only to remember your theme preference.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
          <p className="mt-2">We may add privacy-friendly, anonymous analytics in the future. We will never sell your data.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2">Questions? Reach us via the contact page.</p>
        </div>
      </section>
    </article>
  );
}
