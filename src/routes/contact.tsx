import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DevTools Hub" },
      { name: "description", content: "Get in touch with the DevTools Hub team." },
      { property: "og:title", content: "Contact — DevTools Hub" },
      { property: "og:description", content: "Send us feedback or feature requests." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent — we'll be in touch.");
      setName(""); setEmail(""); setMessage("");
      setSending(false);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Mail className="h-5 w-5" />
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact us</h1>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Have a feature request, bug report, or feedback? We'd love to hear it.</p>

      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            className="mt-1.5 w-full rounded-md border border-border/60 bg-background/60 p-3 text-sm outline-none focus:border-primary/50"
          />
        </div>
        <div>
          <Button type="submit" disabled={sending}>
            <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
