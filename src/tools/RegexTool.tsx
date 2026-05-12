import { useMemo, useState } from "react";
import { ErrorBox, MonoArea, PanelHeader } from "@/components/tool-ui";

const FLAGS = ["g", "i", "m", "s", "u", "y"] as const;

export function RegexTool() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState("Email me at hello@dev.tools or admin@example.com — quick test.");

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern) return { matches: [] as string[], error: null as string | null, highlighted: text };
    try {
      const re = new RegExp(pattern, flags);
      const found: string[] = [];
      let html = "";
      let last = 0;
      const escape = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
      if (flags.includes("g")) {
        let m;
        while ((m = re.exec(text)) !== null) {
          if (m.index === re.lastIndex) re.lastIndex++;
          found.push(m[0]);
          html += escape(text.slice(last, m.index)) + `<mark class="rounded bg-primary/30 text-foreground">${escape(m[0])}</mark>`;
          last = m.index + m[0].length;
        }
        html += escape(text.slice(last));
      } else {
        const m = re.exec(text);
        if (m) {
          found.push(m[0]);
          html = escape(text.slice(0, m.index)) + `<mark class="rounded bg-primary/30 text-foreground">${escape(m[0])}</mark>` + escape(text.slice(m.index + m[0].length));
        } else {
          html = escape(text);
        }
      }
      return { matches: found, error: null, highlighted: html };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : "Invalid regex", highlighted: text };
    }
  }, [pattern, flags, text]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2 font-mono text-sm">
          <span className="text-muted-foreground">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
            className="flex-1 bg-transparent outline-none"
            placeholder="pattern"
          />
          <span className="text-muted-foreground">/</span>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value.split("").filter((c) => (FLAGS as readonly string[]).includes(c)).join(""))}
            spellCheck={false}
            className="w-16 bg-transparent outline-none"
            placeholder="flags"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {FLAGS.map((f) => (
            <button
              key={f}
              onClick={() => setFlags(flags.includes(f) ? flags.replace(f, "") : flags + f)}
              className={`h-9 w-9 rounded-md border text-xs font-mono ${flags.includes(f) ? "border-primary/50 bg-primary/15 text-foreground" : "border-border/60 bg-card/60 text-muted-foreground"}`}
            >{f}</button>
          ))}
        </div>
      </div>
      <ErrorBox message={error} />

      <div>
        <PanelHeader label="Test String" value={text} onClear={() => setText("")} onPaste={setText} />
        <MonoArea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[160px]" />
      </div>

      <div>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Highlighted Matches ({matches.length})</span>
        <div
          className="min-h-[120px] whitespace-pre-wrap rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        {matches.length > 0 && (
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((m, i) => (
              <li key={i} className="truncate rounded-md border border-border/60 bg-card/60 px-2 py-1 font-mono text-xs">{m}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
