import { createFileRoute } from "@tanstack/react-router";
import type { } from "@tanstack/react-start";
import { services } from "@/lib/services-data";
import { blogArticles } from "@/lib/blog-data";
import { trainingCourses } from "@/lib/training-data";

const BASE_URL = "https://astrointelli.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0" },
          { path: "/services", priority: "0.9" },
          ...services.map((s) => ({ path: `/services/${s.slug}`, priority: "0.8" })),
          { path: "/training", priority: "0.8" },
          ...Object.keys(trainingCourses).map((slug) => ({ path: `/training/${slug}`, priority: "0.8" })),
          { path: "/blog", priority: "0.8" },
          ...blogArticles.map((a) => ({ path: `/blog/${a.slug}`, priority: "0.8" })),
          { path: "/about", priority: "0.7" },
          { path: "/contact", priority: "0.7" },
          { path: "/landing", priority: "0.8" },
          { path: "/privacy", priority: "0.5" },
          { path: "/terms", priority: "0.5" },
        ];
        const urls = entries
          .map(
            (e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});