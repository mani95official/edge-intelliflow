import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft, Layers, PenTool, Layout, Factory } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState } from "react";
import { ServicesSidebar } from "@/components/services-sidebar";

const SITE_URL = "https://astrointelli.com";
const s = services.find((x) => x.slug === "product-development")!;

export const Route = createFileRoute("/services/product-development")({
  head: () => {
    const title = `${s.title} — AstroIntelli Tech`;
    const description = s.overview;
    const url = `${SITE_URL}/services/product-development`;
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
      scripts: [
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
      ],
    };
  },
  component: ProductDevDetail,
});

function ProductDevDetail() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      title: "1. Schematics & Sourcing",
      subtitle: "Component selection & netlist definition",
      duration: "Week 1 - 2",
      icon: PenTool,
      desc: "Selecting MCU, PMIC, radios, and peripherals under constraints of certification, cost, lead times, and power budgets.",
      deliverables: ["Bill of Materials (BOM) validation", "KiCad hardware schematic sheets", "Power budget calculations sheet"],
    },
    {
      title: "2. Breadboard & Firmware PoC",
      subtitle: "First firmware integration testing",
      duration: "Week 2 - 4",
      icon: Layers,
      desc: "Wiring up development boards to sensors to build early logic. Validating pin multiplexing, SPI/I2C speeds, and driver modules.",
      deliverables: ["Working firmware proof-of-concept", "Validated hardware signal levels", "Sensor driver baseline logic"],
    },
    {
      title: "3. PCB Layout & Routing",
      subtitle: "Custom board design & copper layers",
      duration: "Week 4 - 6",
      icon: Layout,
      desc: "Designing a custom 4-layer or 6-layer board. Sizing power traces, layout decoupling capacitors, shielding RF sections, and creating gerber packages.",
      deliverables: ["Gerber & drill packages", "3D STEP file of PCB layout", "Impedance calculations documentation"],
    },
    {
      title: "4. DFM & Manufacturing Bring-up",
      subtitle: "Fabrication & assembly handoff",
      duration: "Week 6 - 8",
      icon: Factory,
      desc: "Liaising with PCB fabrication houses for board stencil and pick-and-place assembly. Designing physical fixtures and board test rigs.",
      deliverables: ["DFM optimization edits", "Centroid placement sheets", "Factory test firmware code"],
    },
  ];

  const StageIcon = stages[activeStage].icon;

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-16">
      <div className="grid gap-10 md:grid-cols-12">
        {/* Sidebar Column */}
        <div className="md:col-span-3">
          <ServicesSidebar />
        </div>

        {/* Main Content Column */}
        <div className="md:col-span-9 space-y-16 md:space-y-20">

          {/* BACK TO SERVICES & HERO */}
          <div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="size-4" /> All services
            </Link>
            <div className="font-mono text-sm text-brand">{s.number} — Service Domain</div>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {s.title}
            </h1>
            <p className="mt-4 font-display italic text-muted-foreground md:text-lg">{s.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{s.overview}</p>

            {/* Tech stack & Industries inline details */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 border-t border-b border-border py-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Prototyping tools</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <li key={t} className="border border-border bg-secondary px-3 py-1 text-xs font-mono">{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Sectors</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.industries.map((t) => (
                    <li key={t} className="text-xs text-muted-foreground">/ {t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* LIFE CYCLE BLUEPRINT EXPLORER */}
          <div className="bg-black text-white p-6 md:p-8 rounded-lg relative overflow-hidden border border-gray-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#78350f_1px,transparent_1px),linear-gradient(to_bottom,#78350f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15" />
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-500">§ Prototyping Roadmap</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Interactive Blueprint</h2>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                Click through the stages of hardware prototyping to see the step-by-step process of converting an idea into silicon and PCBs.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-12">
                {/* Phase Selector tabs */}
                <div className="lg:col-span-4 flex flex-col gap-1.5 font-mono">
                  {stages.map((st, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStage(idx)}
                      className={`text-left p-3 border transition-all cursor-pointer ${activeStage === idx
                        ? "border-amber-500 bg-amber-500/10 text-white"
                        : "border-gray-800 text-gray-500 hover:border-gray-700 hover:text-white"
                        }`}
                    >
                      <div className="text-[9px] text-amber-450/80 mb-0.5">{st.duration}</div>
                      <div className="text-xs font-semibold">{st.title}</div>
                    </button>
                  ))}
                </div>

                {/* Stage Showcase Blueprint */}
                <div className="lg:col-span-8 border border-gray-800 bg-gray-950 p-5 font-mono flex flex-col justify-between relative rounded">
                  <div className="absolute top-3 right-3 text-[9px] text-amber-500/40 border border-amber-500/20 px-1.5 py-0.5 rounded">
                    STAGE_0{activeStage + 1}
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded">
                      <StageIcon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{stages[activeStage].title}</h3>
                      <p className="text-[10px] text-gray-550 mt-0.5">{stages[activeStage].subtitle}</p>
                    </div>
                  </div>

                  <div className="my-6 border-y border-gray-900 py-4">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">Phase Summary</div>
                    <p className="mt-2 text-xs text-gray-305 leading-relaxed">{stages[activeStage].desc}</p>
                  </div>

                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">Deliverables</div>
                    <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                      {stages[activeStage].deliverables.map((del, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="size-1 bg-amber-500 rounded-full" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CAPABILITIES SECTION */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Capabilities</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">What's included</h2>
            <ul className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-background p-5">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* OUTCOMES SECTION */}
          <div className="bg-secondary/45 p-6 md:p-8 rounded-lg border border-border">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Outcomes</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">What you walk away with</h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {s.outcomes.map((o, i) => (
                <li key={o} className="grid grid-cols-12 gap-4 py-4">
                  <span className="col-span-1 font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <p className="col-span-11 text-sm">{o}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* PROCESS SECTION */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Process</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">How we work</h2>
            <ol className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {s.process.map((p, i) => (
                <li key={p.step} className="bg-background p-5">
                  <div className="font-mono text-xs text-brand">0{i + 1}</div>
                  <h3 className="mt-2 text-base font-semibold">{p.step}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA SECTION */}
          <div className="bg-foreground text-background p-8 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h2 className="max-w-md text-2xl font-semibold tracking-tight md:text-3xl">
              Start your <span className="text-brand">{s.title.split(" ")[0].toLowerCase()}</span> project.
            </h2>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-background/30 px-5 py-3 text-xs font-medium hover:bg-brand hover:border-brand shrink-0">
              Talk to engineering <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
