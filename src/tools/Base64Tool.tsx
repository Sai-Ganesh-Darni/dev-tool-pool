import { useMemo, useState } from "react";
import { ErrorBox, MonoArea, PanelHeader } from "@/components/tool-ui";
import { Button } from "@/components/ui/button";

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: null as string | null };
    try {
      if (mode === "encode") {
        const enc = btoa(unescape(encodeURIComponent(input)));
        return { output: enc, error: null };
      }
      const dec = decodeURIComponent(escape(atob(input.trim())));
      return { output: dec, error: null };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Invalid input" };
    }
  }, [input, mode]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <PanelHeader
          label={mode === "encode" ? "Plain Text" : "Base64"}
          value={input}
          onClear={() => setInput("")}
          onPaste={setInput}
          extra={
            <div className="mr-1 inline-flex rounded-lg border border-border/60 bg-background/60 p-0.5">
              {(["encode", "decode"] as const).map((m) => (
                <Button
                  key={m}
                  size="sm"
                  variant={mode === m ? "default" : "ghost"}
                  onClick={() => setMode(m)}
                  className="h-7 px-3 text-xs capitalize"
                >{m}</Button>
              ))}
            </div>
          }
        />
        <MonoArea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Type or paste text…" : "Paste a Base64 string…"} />
      </div>
      <div>
        <PanelHeader label="Output" value={output} onDownload downloadName="base64-output.txt" />
        <MonoArea value={output} readOnly placeholder="Output will appear here…" />
        <ErrorBox message={error} />
      </div>
    </div>
  );
}
