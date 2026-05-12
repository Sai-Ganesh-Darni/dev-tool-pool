import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, TOOLS } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "All Tools — DevTools Hub" },
      { name: "description", content: "Browse all developer utilities. Encoding, formatting, conversion, and more." },
      { property: "og:title", content: "All Tools — DevTools Hub" },
      { property: "og:description", content: "Browse the full developer toolbox." },
    ],
  }),
  component: ToolsList,
});

function ToolsList() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return TOOLS.filter((t) => {
      if (cat !== "All" && t.category !== cat) return false;
      if (!s) return true;
      return [t.title, t.description, ...t.keywords].join(" ").toLowerCase().includes(s);
    });
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">All Tools</h1>
      <p className="mt-2 text-sm text-muted-foreground">{TOOLS.length} fast, client-side developer utilities.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card/60 p-1.5 glass">
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools…" className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${cat === c ? "border-primary/50 bg-primary/15 text-foreground" : "border-border/60 bg-card/60 text-muted-foreground hover:text-foreground"}`}
            >{c}</button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => <ToolCard key={t.slug} tool={t} />)}
      </div>
      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center text-sm text-muted-foreground">
          No tools match your filters.
        </div>
      )}
    </div>
  );
}
