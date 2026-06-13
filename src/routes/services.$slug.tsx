import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { services, type Service } from "@/lib/services-data";

const SITE_URL = "https://astrointelli.com";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} — AstroIntelli Tech` : "Service — AstroIntelli";
    const description = s ? s.overview : "Service detail.";
    const url = `${SITE_URL}/services/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: s
        ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: s.title,
              description: s.overview,
              provider: { "@type": "Organization", name: "AstroIntelli Tech", url: SITE_URL },
              serviceType: s.title,
              areaServed: s.industries,
              url,
            }),
          },
        ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="text-4xl font-semibold">Service not found</h1>
      <Link to="/services" className="mt-6 inline-block text-brand underline">Back to all services</Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 pt-16 pb-16 md:px-8 md:pt-24">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All services
          </Link>
          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="font-mono text-sm text-brand">{s.number} — Service</div>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {s.title}
              </h1>
              <p className="mt-4 font-display italic text-muted-foreground md:text-xl">{s.tagline}</p>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{s.overview}</p>
            </div>
            <aside className="md:col-span-4">
              <div className="border border-border p-6">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Tech stack</div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <li key={t} className="border border-border bg-secondary px-3 py-1 text-xs font-mono">{t}</li>
                  ))}
                </ul>
                <div className="mt-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">Industries</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.industries.map((t) => (
                    <li key={t} className="text-xs text-muted-foreground">/ {t}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Capabilities</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">What's included</h2>
          <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {s.items.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-background p-6">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Outcomes</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">What you walk away with</h2>
            </div>
            <ul className="md:col-span-7 divide-y divide-border border-y border-border">
              {s.outcomes.map((o, i) => (
                <li key={o} className="grid grid-cols-12 gap-4 py-5">
                  <span className="col-span-2 font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <p className="col-span-10 text-base">{o}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Process</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">How we work</h2>
          <ol className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((p, i) => (
              <li key={p.step} className="bg-background p-6">
                <div className="font-mono text-sm text-brand">0{i + 1}</div>
                <h3 className="mt-3 text-lg font-semibold">{p.step}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-end md:px-8">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Start your <span className="text-brand">{s.title.split(" ")[0].toLowerCase()}</span> project.
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-2 border border-background/30 px-6 py-4 text-sm font-medium hover:bg-brand hover:border-brand">
            Talk to engineering <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}