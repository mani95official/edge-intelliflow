import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const data = blogPosts[params.slug];
    if (!data) {
      throw notFound();
    }
    return data;
  },
  head: ({ loaderData }) => {
    const SITE_URL = "https://astrointelli.com";
    if (!loaderData) {
      return {
        meta: [
          { title: "Insights & Articles — AstroIntelli" },
          { name: "description", content: "Technical deep-dives, industry perspectives, and engineering guides." },
        ],
      };
    }
    return {
      meta: [
        { title: `${loaderData.title} — AstroIntelli Insights` },
        { name: "description", content: loaderData.subtitle },
        { property: "og:title", content: `${loaderData.title} — AstroIntelli Insights` },
        { property: "og:description", content: loaderData.subtitle },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE_URL}/blog/${loaderData.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${loaderData.title} — AstroIntelli Insights` },
        { name: "twitter:description", content: loaderData.subtitle },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${loaderData.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": loaderData.title,
            "description": loaderData.summary,
            "datePublished": "2026-06-13T00:00:00Z",
            "author": {
              "@type": "Person",
              "name": loaderData.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "AstroIntelli",
              "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/favicon.ico`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${SITE_URL}/blog/${loaderData.slug}`
            }
          }),
        },
      ],
    };
  },
  component: BlogPostComponent,
});

function BlogPostComponent() {
  const article = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      {/* Blog Post Navigation Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 text-brand" />
            Back to strategy blog
          </Link>
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            {article.category} / Strategy
          </div>
        </div>
      </div>

      {/* Main Blog Post Content Area */}
      <article className="mx-auto max-w-4xl px-5 py-12 md:py-20 md:px-8">

        {/* Post Metadata Headers */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono">
            <span className="bg-brand/10 text-brand px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl text-foreground">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed border-l-2 border-brand/60 pl-4 py-1">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-2 pt-2 border-b border-border pb-6">
            <div className="size-8 rounded-full bg-brand/20 flex items-center justify-center font-mono text-xs font-semibold text-brand">
              AI
            </div>
            <div className="text-xs">
              <div className="font-semibold text-foreground">{article.author}</div>
              <div className="text-muted-foreground">Engineering Intelligence Advisory</div>
            </div>
          </div>
        </header>

        {/* Dynamic content paragraphs */}
        <div className="mt-8 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed font-light">
          {article.content.map((p, idx) => (
            <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-border" />

        {/* High-Intent Conversion CTA Card */}
        <section className="rounded-xl border border-brand/30 bg-foreground text-background p-8 md:p-10 space-y-6 shadow-lg">
          <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-widest">
            <ShieldCheck className="size-5" />
            <span>AstroIntelli Engineering Engagement</span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl leading-tight text-white">
            {article.ctaTitle}
          </h2>

          <p className="text-sm md:text-base text-background/80 leading-relaxed font-light">
            {article.ctaText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to={article.ctaLink}
              className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-4 transition-transform hover:scale-[1.02]"
            >
              {article.ctaButtonText}
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-background/20 text-background hover:bg-background/10 font-semibold text-sm px-6 py-4"
            >
              <Mail className="size-4" />
              Inquire via Hello@astrointelli.com
            </Link>
          </div>
        </section>

      </article>
    </div>
  );
}
