import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/CopyButton";
import { ClipboardPaste, Download, Eraser } from "lucide-react";
import { toast } from "sonner";

export function PanelHeader({
  label,
  value,
  onClear,
  onPaste,
  onDownload,
  downloadName,
  extra,
}: {
  label: string;
  value?: string;
  onClear?: () => void;
  onPaste?: (text: string) => void;
  onDownload?: boolean;
  downloadName?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center justify-between gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="flex flex-wrap items-center gap-1.5">
        {extra}
        {onPaste && (
          <Button
            size="sm"
            variant="ghost"
            onClick={async () => {
              try {
                const text = await navigator.clipboard.readText();
                onPaste(text);
              } catch {
                toast.error("Clipboard read denied");
              }
            }}
          >
            <ClipboardPaste className="h-3.5 w-3.5" /> Paste
          </Button>
        )}
        {onClear && (
          <Button size="sm" variant="ghost" onClick={onClear}>
            <Eraser className="h-3.5 w-3.5" /> Clear
          </Button>
        )}
        {onDownload && value && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const blob = new Blob([value], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = downloadName ?? "output.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
        )}
        {value !== undefined && <CopyButton value={value} />}
      </div>
    </div>
  );
}

export function MonoArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      spellCheck={false}
      {...props}
      className={
        "min-h-[280px] w-full resize-y rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-sm leading-relaxed text-foreground shadow-inner outline-none transition-colors focus:border-primary/50 " +
        (props.className ?? "")
      }
    />
  );
}

export function ErrorBox({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <div className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
      {message}
    </div>
  );
}
