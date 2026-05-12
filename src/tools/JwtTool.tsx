import { useMemo, useState } from "react";
import { ErrorBox, MonoArea, PanelHeader } from "@/components/tool-ui";

function b64urlDecode(s: string) {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const base = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(escape(atob(base)));
}

export function JwtTool() {
  const [input, setInput] = useState("");

  const { header, payload, signature, error } = useMemo(() => {
    if (!input.trim()) return { header: "", payload: "", signature: "", error: null as string | null };
    try {
      const parts = input.trim().split(".");
      if (parts.length !== 3) throw new Error("JWT must have 3 segments");
      const h = JSON.stringify(JSON.parse(b64urlDecode(parts[0])), null, 2);
      const p = JSON.stringify(JSON.parse(b64urlDecode(parts[1])), null, 2);
      return { header: h, payload: p, signature: parts[2], error: null };
    } catch (e) {
      return { header: "", payload: "", signature: "", error: e instanceof Error ? e.message : "Invalid JWT" };
    }
  }, [input]);

  return (
    <div className="grid gap-4">
      <div>
        <PanelHeader label="JWT Token" value={input} onClear={() => setInput("")} onPaste={setInput} />
        <MonoArea value={input} onChange={(e) => setInput(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." className="min-h-[120px]" />
        <ErrorBox message={error} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <PanelHeader label="Header" value={header} />
          <MonoArea value={header} readOnly className="min-h-[200px]" />
        </div>
        <div>
          <PanelHeader label="Payload" value={payload} />
          <MonoArea value={payload} readOnly className="min-h-[200px]" />
        </div>
      </div>
      {signature && (
        <div>
          <PanelHeader label="Signature" value={signature} />
          <MonoArea value={signature} readOnly className="min-h-[80px]" />
          <p className="mt-2 text-xs text-muted-foreground">Signature is not verified — JWT decoding is local only.</p>
        </div>
      )}
    </div>
  );
}
