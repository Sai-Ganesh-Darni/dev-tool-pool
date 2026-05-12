import { createFileRoute } from "@tanstack/react-router";
import { TOOLS } from "@/lib/tools";

const STATIC = ["/", "/tools", "/about", "/contact", "/privacy"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = [
          ...STATIC.map((p) => `${origin}${p}`),
          ...TOOLS.map((t) => `${origin}/tools/${t.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>`;
        return new Response(body, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
