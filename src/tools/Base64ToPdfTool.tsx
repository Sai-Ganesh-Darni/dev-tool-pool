import { useState } from "react";
import { ErrorBox, MonoArea, PanelHeader } from "@/components/tool-ui";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { toast } from "sonner";

export function Base64ToPdfTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const convert = () => {
    setError(null);
    try {
      let raw = input.trim();
      if (raw.startsWith("data:")) raw = raw.split(",")[1] ?? "";
      const binary = atob(raw);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "decoded.pdf";
      a.click();
      toast.success("PDF generated");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid Base64");
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <PanelHeader label="Base64 String" value={input} onClear={() => { setInput(""); setPreviewUrl(null); }} onPaste={setInput} />
        <MonoArea value={input} onChange={(e) => setInput(e.target.value)} placeholder="JVBERi0xLjQKJ…" />
        <div className="mt-3 flex gap-2">
          <Button onClick={convert} disabled={!input.trim()}>
            <FileDown className="h-4 w-4" /> Convert & Download PDF
          </Button>
        </div>
        <ErrorBox message={error} />
      </div>
      <div>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Preview</span>
        <div className="h-[420px] overflow-hidden rounded-xl border border-border/60 bg-background/60">
          {previewUrl ? (
            <iframe src={previewUrl} title="PDF preview" className="h-full w-full" />
          ) : (
            <div className="grid h-full place-items-center p-6 text-center text-sm text-muted-foreground">
              Convert a Base64 string to preview the resulting PDF here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
