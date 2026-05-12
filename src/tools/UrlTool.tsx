import { useMemo, useState } from "react";
import { ErrorBox, MonoArea, PanelHeader } from "@/components/tool-ui";
import { Button } from "@/components/ui/button";

export function UrlTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: null as string | null };
    try {
      return {
        output: mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input),
        error: null,
      };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Invalid URL" };
    }
  }, [input, mode]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <PanelHeader
          label="Input"
          value={input}
          onClear={() => setInput("")}
          onPaste={setInput}
          extra={
            <div className="mr-1 inline-flex rounded-lg border border-border/60 bg-background/60 p-0.5">
              {(["encode", "decode"] as const).map((m) => (
                <Button key={m} size="sm" variant={mode === m ? "default" : "ghost"} onClick={() => setMode(m)} className="h-7 px-3 text-xs capitalize">{m}</Button>
              ))}
            </div>
          }
        />
        <MonoArea value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://example.com/?q=hello world" />
      </div>
      <div>
        <PanelHeader label="Output" value={output} />
        <MonoArea value={output} readOnly />
        <ErrorBox message={error} />
      </div>
    </div>
  );
}
