import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      to="/tools/$slug"
      params={{ slug: tool.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <h3 className="text-base font-semibold tracking-tight">{tool.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
      <span className="mt-4 inline-flex w-fit rounded-full border border-border/60 bg-secondary/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {tool.category}
      </span>
    </Link>
  );
}
