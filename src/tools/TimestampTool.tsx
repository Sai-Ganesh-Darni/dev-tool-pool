import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function pad(n: number) { return n.toString().padStart(2, "0"); }
function toLocal(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function TimestampTool() {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  const [unix, setUnix] = useState<string>(String(Math.floor(Date.now() / 1000)));
  const [date, setDate] = useState<string>(toLocal(new Date()));

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const fromUnix = (() => {
    const n = Number(unix);
    if (!unix || Number.isNaN(n)) return null;
    const ms = unix.length > 10 ? n : n * 1000;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  })();

  const fromDate = (() => {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return null;
    return Math.floor(d.getTime() / 1000);
  })();

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-border/60 bg-card/60 p-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Current Unix timestamp</div>
        <div className="mt-1 font-mono text-2xl text-gradient">{now}</div>
        <div className="text-xs text-muted-foreground">{new Date(now * 1000).toUTCString()}</div>
        <Button size="sm" variant="secondary" className="mt-3" onClick={() => setUnix(String(now))}>Use now</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card/60 p-4">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Unix Timestamp → Date</label>
          <Input value={unix} onChange={(e) => setUnix(e.target.value)} placeholder="1700000000" className="mt-2 font-mono" />
          {fromUnix && (
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><span className="text-muted-foreground">Local:</span> <span className="font-mono">{fromUnix.toString()}</span></li>
              <li><span className="text-muted-foreground">UTC:</span> <span className="font-mono">{fromUnix.toUTCString()}</span></li>
              <li><span className="text-muted-foreground">ISO:</span> <span className="font-mono">{fromUnix.toISOString()}</span></li>
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-4">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Date → Unix Timestamp</label>
          <Input type="datetime-local" step="1" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 font-mono" />
          {fromDate !== null && (
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><span className="text-muted-foreground">Seconds:</span> <span className="font-mono">{fromDate}</span></li>
              <li><span className="text-muted-foreground">Milliseconds:</span> <span className="font-mono">{fromDate * 1000}</span></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
