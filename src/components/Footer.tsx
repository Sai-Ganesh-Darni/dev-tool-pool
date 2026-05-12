import { Link } from "@tanstack/react-router";
import { Github, Twitter, Wrench } from "lucide-react";
import { TOOLS } from "@/lib/tools";

export function Footer() {
  const top = TOOLS.slice(0, 6);
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
              <Wrench className="h-4 w-4" />
            </span>
            DevTools<span className="text-primary">Hub</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A fast, privacy-first collection of developer utilities. Everything runs in your browser.
          </p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Popular Tools</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {top.map((t) => (
              <li key={t.slug}>
                <Link to="/tools/$slug" params={{ slug: t.slug }} className="hover:text-foreground">{t.title.split(" ")[0]}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/tools" className="hover:text-foreground">All Tools</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} DevTools Hub. Built for developers.
        </div>
      </div>
    </footer>
  );
}
