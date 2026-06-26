import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, Brain, Activity, Settings, ArrowRight } from "lucide-react";
import { useState } from "react";
import { blogArticles as articles } from "@/lib/blog-data";

const SITE_URL = "https://astrointelli.com";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Edge AI & AIoT Strategy Blog — AstroIntelli" },
      { name: "description", content: "High-intent engineering insights on Edge AI, TinyML, industrial predictive maintenance, and medical IoT architectures." },
      { property: "og:title", content: "Edge AI & AIoT Strategy Blog — AstroIntelli" },
      { property: "og:description", content: "Actionable strategy and technical guides for product directors and engineering leads." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Edge AI & AIoT Strategy Blog — AstroIntelli" },
      { name: "twitter:description", content: "Engineering insights on Edge AI and industrial IoT architectures." },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/blog" }],
  }),
  component: BlogIndexPage,
});

const categories = ["All", "Edge AI", "AIoT", "Healthcare", "Industrial"];

function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Blog Hero Banner */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/30 to-background py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="text-brand">§</span> Strategy & Insights
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Edge AI & <span className="text-brand">AIoT Strategy.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Actionable technology blueprints, architectural insights, and ROI calculations for product leads and engineering directors building connected intelligent systems.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-border bg-secondary/10 py-4">
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all ${activeCategory === cat
                ? "bg-foreground border-foreground text-background"
                : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Post List */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {filteredArticles.map((art) => {
              const Icon = art.icon;
              return (
                <article
                  key={art.slug}
                  className="group relative flex flex-col justify-between border border-border bg-background p-8 transition-all hover:border-brand shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      <span>{art.category}</span>
                      <div className="flex items-center gap-2">
                        <span>{art.date}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight group-hover:text-brand transition-colors leading-snug">
                      <Link to="/blog/$slug" params={{ slug: art.slug }}>
                        {art.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <Icon className="size-4 text-brand" />
                      <span>Authorized Insights</span>
                    </div>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: art.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-brand"
                    >
                      Read Article <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner (Conversion Focused) */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-brand">
              Partner with AstroIntelli
            </div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl max-w-2xl leading-none">
              Need on-device intelligence for your hardware?
            </h2>
            <p className="max-w-xl text-sm text-background/80 leading-relaxed">
              We help manufacturing firms, medical startups, and product leads build, compile, and deploy lightweight algorithms to optimize product performance and reduce cloud margins.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-4 transition-transform hover:scale-[1.03]"
            >
              Consult an AIoT Engineer →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
