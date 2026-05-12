import { createFileRoute, notFound } from "@tanstack/react-router";
import { findTool, TOOLS } from "@/lib/tools";
import { ToolShell } from "@/components/ToolShell";
import { Base64Tool } from "@/tools/Base64Tool";
import { JsonFormatterTool } from "@/tools/JsonFormatterTool";
import { Base64ToPdfTool } from "@/tools/Base64ToPdfTool";
import { PdfToBase64Tool } from "@/tools/PdfToBase64Tool";
import { StripSlashesTool } from "@/tools/StripSlashesTool";
import { UrlTool } from "@/tools/UrlTool";
import { JwtTool } from "@/tools/JwtTool";
import { RegexTool } from "@/tools/RegexTool";
import { HtmlFormatterTool } from "@/tools/HtmlFormatterTool";
import { TimestampTool } from "@/tools/TimestampTool";

const COMPONENTS: Record<string, React.FC> = {
  "base64": Base64Tool,
  "json-formatter": JsonFormatterTool,
  "base64-to-pdf": Base64ToPdfTool,
  "pdf-to-base64": PdfToBase64Tool,
  "strip-slashes": StripSlashesTool,
  "url": UrlTool,
  "jwt": JwtTool,
  "regex": RegexTool,
  "html-formatter": HtmlFormatterTool,
  "timestamp": TimestampTool,
};

export const Route = createFileRoute("/tools/$slug")({
  beforeLoad: ({ params }) => {
    if (!findTool(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const tool = findTool(params.slug);
    if (!tool) return {};
    return {
      meta: [
        { title: `${tool.title} — DevTools Hub` },
        { name: "description", content: tool.description },
        { property: "og:title", content: `${tool.title} — DevTools Hub` },
        { property: "og:description", content: tool.description },
      ],
    };
  },
  component: ToolPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">Tool not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Available tools: {TOOLS.map((t) => t.title).join(", ")}.
      </p>
    </div>
  ),
});

function ToolPage() {
  const { slug } = Route.useParams();
  const tool = findTool(slug)!;
  const Component = COMPONENTS[slug];
  return (
    <ToolShell title={tool.title} description={tool.description}>
      {Component ? <Component /> : <p className="text-sm text-muted-foreground">Coming soon.</p>}
    </ToolShell>
  );
}
