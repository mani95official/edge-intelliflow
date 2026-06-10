import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/services-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AstroIntelli Technologies" },
      { name: "description", content: "Embedded systems, Edge AI, AIoT, cloud, mobile, industrial automation, and healthcare technology services." },
      { property: "og:title", content: "Services — AstroIntelli Technologies" },
      { property: "og:description", content: "Eight capability areas across embedded, AI, IoT and cloud." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-16 md:px-8 md:pt-32">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="text-brand">§</span> Services / 01 — 08
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Capabilities for <span className="text-brand">intelligent</span> products.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Eight focused practice areas — combined, they take an idea from PCB sketch to a fleet of devices learning in the field.
          </p>
        </div>
      </section>

      <section>
        <ul className="mx-auto max-w-7xl divide-y divide-border border-b border-border px-5 md:px-8">
          {services.map((s) => (
            <li key={s.slug} id={s.slug} className="scroll-mt-24 py-16 md:py-24">
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-5">
                  <div className="font-mono text-sm text-brand">{s.number}</div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{s.title}</h2>
                  <p className="mt-3 font-display italic text-muted-foreground md:text-lg">{s.tagline}</p>
                  <p className="mt-6 text-muted-foreground">{s.description}</p>
                  <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Discuss this service <ArrowUpRight className="size-4" />
                  </Link>
                </div>
                <ul className="md:col-span-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 bg-background p-5">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-end md:px-8">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Not sure which fits? <span className="text-brand">Tell us the problem.</span>
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-2 border border-background/30 px-6 py-4 text-sm font-medium hover:bg-brand hover:border-brand">
            Talk to engineering →
          </Link>
        </div>
      </section>
    </>
  );
}