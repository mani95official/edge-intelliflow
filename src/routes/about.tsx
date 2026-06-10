import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AstroIntelli Technologies" },
      { name: "description", content: "AstroIntelli engineers embedded + AI products with a focus on industrial and healthcare innovation." },
      { property: "og:title", content: "About — AstroIntelli Technologies" },
      { property: "og:description", content: "Embedded + AI under one roof. Intelligence at the Edge." },
    ],
  }),
  component: AboutPage,
});

const principles = [
  { n: "01", t: "Edge-first thinking", d: "We assume bandwidth is finite and intelligence belongs near the sensor." },
  { n: "02", t: "Whole-stack ownership", d: "Firmware, ML, backend, app — one team, one accountability." },
  { n: "03", t: "Ship working hardware", d: "We optimise for working prototypes, not slide decks." },
  { n: "04", t: "Designed to scale", d: "Every architecture is sized for thousands of devices, not ten." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-20 md:px-8 md:pt-32 md:pb-28">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="text-brand">§</span> About
          </div>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            We engineer the <span className="text-brand">connected</span> intelligent world.
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-muted-foreground md:text-xl">
            AstroIntelli Technologies is an embedded + AI product company. We help industrial and healthcare innovators turn sensors into systems, and systems into intelligent products that learn in the field.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Mission</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Intelligence at the Edge. Innovation Everywhere.</h2>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-muted-foreground">
            We exist for the engineers who don't want their PCB to be the last thing they own. From the moment a sensor's signal becomes interesting, we follow it — through firmware, models, gateways, and dashboards — and make sure the product feels coherent end-to-end. We work best with teams who think in atoms <span className="text-brand">and</span> bits.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Principles</div>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">How we operate.</h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.n} className="bg-background p-8">
                <div className="font-mono text-sm text-brand">{p.n}</div>
                <h3 className="mt-4 text-xl font-semibold">{p.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-end md:px-8">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Work with us<span className="text-brand">.</span>
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-2 border border-background/30 px-6 py-4 text-sm font-medium hover:bg-brand hover:border-brand">
            Start a project →
          </Link>
        </div>
      </section>
    </>
  );
}