import { useMemo, useState } from "react";
import { MonoArea, PanelHeader } from "@/components/tool-ui";

export function StripSlashesTool() {
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    if (!input) return "";
    return input.replace(/\\(.)/g, (_, ch) => {
      switch (ch) {
        case "n": return "\n";
        case "r": return "\r";
        case "t": return "\t";
        case "\\": return "\\";
        case '"': return '"';
        case "'": return "'";
        case "/": return "/";
        default: return ch;
      }
    });
  }, [input]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <PanelHeader label="Escaped Input" value={input} onClear={() => setInput("")} onPaste={setInput} />
        <MonoArea value={input} onChange={(e) => setInput(e.target.value)} placeholder={'{\\"hello\\": \\"world\\"}'} />
      </div>
      <div>
        <PanelHeader label="Cleaned Output" value={output} onDownload downloadName="stripped.txt" />
        <MonoArea value={output} readOnly placeholder="Cleaned text will appear here…" />
      </div>
    </div>
  );
}
