import { useMemo, useState } from "react";
import { ErrorBox, MonoArea, PanelHeader } from "@/components/tool-ui";
import { Button } from "@/components/ui/button";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [minify, setMinify] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null as string | null };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, minify ? 0 : indent), error: null };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const m = /position (\d+)/.exec(msg);
      let line = "";
      if (m) {
        const pos = parseInt(m[1], 10);
        const lineNum = input.slice(0, pos).split("\n").length;
        line = ` (line ${lineNum})`;
      }
      return { output: "", error: msg + line };
    }
  }, [input, indent, minify]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <PanelHeader
          label="JSON Input"
          value={input}
          onClear={() => setInput("")}
          onPaste={setInput}
          extra={
            <div className="flex items-center gap-1.5">
              <Button size="sm" variant={!minify ? "default" : "ghost"} onClick={() => setMinify(false)} className="h-7 px-3 text-xs">Beautify</Button>
              <Button size="sm" variant={minify ? "default" : "ghost"} onClick={() => setMinify(true)} className="h-7 px-3 text-xs">Minify</Button>
              {!minify && (
                <select
                  value={indent}
                  onChange={(e) => setIndent(parseInt(e.target.value, 10))}
                  className="h-7 rounded-md border border-border/60 bg-background px-2 text-xs"
                  aria-label="Indent"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                </select>
              )}
            </div>
          }
        />
        <MonoArea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"hello": "world"}' />
        <ErrorBox message={error} />
      </div>
      <div>
        <PanelHeader label="Formatted" value={output} onDownload downloadName="formatted.json" />
        <MonoArea value={output} readOnly placeholder="Formatted JSON will appear here…" />
        {output && !error && (
          <p className="mt-2 text-xs text-muted-foreground">✓ Valid JSON • {output.length.toLocaleString()} characters</p>
        )}
      </div>
    </div>
  );
}
