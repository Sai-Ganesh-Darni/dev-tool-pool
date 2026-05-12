import {
  Braces, Code2, FileJson, FileText, Hash, KeyRound, Link2, Regex, Slash, Clock,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: "Encoding" | "Formatting" | "Conversion" | "Developer" | "Time";
  icon: LucideIcon;
  keywords: string[];
};

export const TOOLS: Tool[] = [
  { slug: "base64", title: "Base64 Encoder / Decoder", description: "Encode and decode Base64 strings instantly in your browser.", category: "Encoding", icon: Hash, keywords: ["base64", "encode", "decode"] },
  { slug: "json-formatter", title: "JSON Formatter & Validator", description: "Beautify, minify, and validate JSON with helpful error messages.", category: "Formatting", icon: Braces, keywords: ["json", "format", "validate", "pretty"] },
  { slug: "base64-to-pdf", title: "Base64 to PDF", description: "Convert a Base64 string to a downloadable PDF file.", category: "Conversion", icon: FileText, keywords: ["base64", "pdf", "convert"] },
  { slug: "pdf-to-base64", title: "PDF to Base64", description: "Upload a PDF and convert it into a Base64-encoded string.", category: "Conversion", icon: FileText, keywords: ["pdf", "base64"] },
  { slug: "strip-slashes", title: "Strip Slashes", description: "Remove escape backslashes from strings, JSON, or shell output.", category: "Formatting", icon: Slash, keywords: ["strip", "escape", "slashes"] },
  { slug: "url", title: "URL Encoder / Decoder", description: "Percent-encode and decode URLs and query parameters.", category: "Encoding", icon: Link2, keywords: ["url", "encode", "decode", "percent"] },
  { slug: "jwt", title: "JWT Decoder", description: "Decode JSON Web Tokens locally — header and payload, no server.", category: "Developer", icon: KeyRound, keywords: ["jwt", "token", "decode"] },
  { slug: "regex", title: "Regex Tester", description: "Test regular expressions against input with live match highlighting.", category: "Developer", icon: Regex, keywords: ["regex", "regular expression", "match"] },
  { slug: "html-formatter", title: "HTML Formatter", description: "Beautify and minify HTML with one click.", category: "Formatting", icon: Code2, keywords: ["html", "format", "minify"] },
  { slug: "timestamp", title: "Timestamp Converter", description: "Convert between Unix timestamps and human-readable dates.", category: "Time", icon: Clock, keywords: ["unix", "timestamp", "date", "epoch"] },
];

export const CATEGORIES = Array.from(new Set(TOOLS.map((t) => t.category)));

export function findTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
