import { useMemo, useState } from "react";
import { html as beautifyHtml } from "js-beautify";
import { MonoArea, PanelHeader } from "@/components/tool-ui";
import { Button } from "@/components/ui/button";

export function HtmlFormatterTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    if (mode === "beautify") {
      return beautifyHtml(input, { indent_size: 2, wrap_line_length: 120, end_with_newline: true });
    }
    return input
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/>\s+</g, "><")
      .replace(/\s{2,}/g, " ")
      .trim();
  }, [input, mode]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <PanelHeader
          label="HTML Input"
          value={input}
          onClear={() => setInput("")}
          onPaste={setInput}
          extra={
            <div className="inline-flex rounded-lg border border-border/60 bg-background/60 p-0.5">
              {(["beautify", "minify"] as const).map((m) => (
                <Button key={m} size="sm" variant={mode === m ? "default" : "ghost"} onClick={() => setMode(m)} className="h-7 px-3 text-xs capitalize">{m}</Button>
              ))}
            </div>
          }
        />
        <MonoArea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<div><p>Hello</p></div>" />
      </div>
      <div>
        <PanelHeader label="Output" value={output} onDownload downloadName="output.html" />
        <MonoArea value={output} readOnly />
      </div>
    </div>
  );
}
