import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, Shield, Zap, ArrowRight } from "lucide-react";
import { TOOLS } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevTools Hub — Fast developer utilities, in your browser" },
      { name: "description", content: "Free, fast, privacy-first developer tools: JSON formatter, Base64, JWT decoder, regex tester and more. No sign-up. No tracking." },
      { property: "og:title", content: "DevTools Hub — Fast developer utilities" },
      { property: "og:description", content: "10+ developer tools that run entirely in your browser." },
    ],
  }),
  component: Home,
});

function Home() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return TOOLS;
    return TOOLS.filter((t) =>
      [t.title, t.description, t.category, ...t.keywords].join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-hero" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground glass">
              <Sparkles className="h-3 w-3 text-primary" /> 10 tools — 100% client-side
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              The developer toolbox <span className="text-gradient">that just works.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Format JSON, decode JWTs, encode Base64, test regex — without leaving your browser. No sign up. No upload.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl border border-border/60 bg-card/60 p-1.5 shadow-card glass focus-within:border-primary/50 focus-within:shadow-glow">
              <Search className="ml-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tools — try 'json' or 'base64'…"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <Link to="/tools" className="hidden items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 sm:inline-flex">
                Browse all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{q ? "Results" : "Featured tools"}</h2>
            <p className="text-sm text-muted-foreground">{filtered.length} tool{filtered.length === 1 ? "" : "s"}</p>
          </div>
          <Link to="/tools" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center text-sm text-muted-foreground">
            No tools match "{q}". Try another keyword.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        )}
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Shield, title: "Privacy-first", body: "Everything runs locally. Your data never leaves the browser." },
            { icon: Zap, title: "Lightning fast", body: "No round-trips, no waiting. Format, encode, decode in real time." },
            { icon: Sparkles, title: "Beautifully simple", body: "Each tool is focused and built for daily developer use." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
