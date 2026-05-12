import { useState } from "react";
import { MonoArea, PanelHeader } from "@/components/tool-ui";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export function PdfToBase64Tool() {
  const [output, setOutput] = useState("");
  const [name, setName] = useState("");

  const onFile = (file: File) => {
    if (file.type && file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }
    setName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? "";
      setOutput(base64);
      toast.success("Encoded to Base64");
    };
    reader.onerror = () => toast.error("Failed to read file");
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Upload PDF</span>
        <label
          className="flex h-[280px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/60 bg-background/40 text-center transition-colors hover:border-primary/40 hover:bg-card/80"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Upload className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium">Drop a PDF here, or click to browse</p>
            <p className="text-xs text-muted-foreground">Files never leave your browser</p>
          </div>
          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        </label>
        {name && <p className="mt-3 text-xs text-muted-foreground">Selected: <span className="text-foreground">{name}</span></p>}
      </div>
      <div>
        <PanelHeader label="Base64 Output" value={output} onDownload downloadName={(name || "pdf") + ".base64.txt"} onClear={() => { setOutput(""); setName(""); }} />
        <MonoArea value={output} readOnly placeholder="Base64 string will appear here…" />
      </div>
    </div>
  );
}
