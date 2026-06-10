import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Cpu, Brain, Radio, Wrench, Cloud, Smartphone, Factory, HeartPulse } from "lucide-react";
import { services } from "@/lib/services-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AstroIntelli Technologies — Engineering Intelligent Futures" },
      { name: "description", content: "Embedded systems, Edge AI, and AIoT product development for industrial and healthcare innovation." },
      { property: "og:title", content: "AstroIntelli Technologies — Engineering Intelligent Futures" },
      { property: "og:description", content: "Embedded + AI product development from concept to deployment." },
    ],
  }),
  component: HomePage,
});

const icons = [Cpu, Brain, Radio, Wrench, Cloud, Smartphone, Factory, HeartPulse];

const stats = [
  { value: "8", label: "Service domains" },
  { value: "AIoT", label: "Specialization" },
  { value: "ESP32 · STM32", label: "Hardware stack" },
  { value: "TinyML", label: "On-device AI" },
];

const marqueeItems = [
  "ESP32", "STM32", "TensorFlow Lite", "MQTT", "Django", "Flutter",
  "Edge AI", "TinyML", "PCB Design", "Predictive Maintenance", "Healthcare IoT", "Industrial Automation",
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <div className="absolute -right-32 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-brand/10 blur-3xl md:block" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 md:px-8 md:pt-32 md:pb-36">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground animate-rise">
            <span className="inline-block size-1.5 rounded-full bg-brand animate-blink" />
            Intelligence at the Edge · Est. 2026
          </div>
          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl animate-rise">
            Engineering
            <br />
            <span className="italic font-display">intelligent</span> futures
            <span className="text-brand">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl animate-rise">
            We design embedded systems, deploy Edge AI on microcontrollers, and ship AIoT products for industrial and healthcare innovators — from concept to scaled deployment.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-rise">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 border border-border px-6 py-4 text-sm font-medium hover:border-foreground"
            >
              Explore services
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-6">
                <div className="font-display text-2xl font-semibold md:text-3xl">{s.value}</div>
                <div className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-b border-border bg-foreground py-5 text-background">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8 text-sm font-mono uppercase tracking-widest">
              {t}
              <span className="text-brand">/</span>
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <span className="text-brand">§</span> 02 — Capabilities
              </div>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Full-stack engineering for <span className="text-brand">connected</span> intelligence.
              </h2>
            </div>
            <Link to="/services" className="text-sm font-medium underline-offset-4 hover:underline">
              All services →
            </Link>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = icons[i] ?? Cpu;
              return (
                <Link
                  key={s.slug}
                  to="/services"
                  hash={s.slug}
                  className="group relative flex flex-col gap-6 bg-background p-8 transition-colors hover:bg-foreground hover:text-background"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/60">
                      {s.number}
                    </span>
                    <Icon className="size-5 text-brand" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70">{s.tagline}</p>
                  <span className="mt-auto inline-flex items-center text-sm font-medium">
                    Learn more <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:rotate-45" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <span className="text-brand">§</span> 03 — Why AstroIntelli
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              We sit at the intersection of <span className="text-brand">embedded</span> and <span className="italic font-display">AI</span>.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Most teams do one well. We engineer the whole stack — silicon to cloud to dashboard — so your product ships faster, runs leaner, and learns over time.
            </p>
          </div>
          <ul className="md:col-span-7 divide-y divide-border border-y border-border">
            {[
              ["Embedded + AI Expertise", "Firmware engineers and ML practitioners on the same team."],
              ["End-to-End Product Development", "Hardware, firmware, cloud, app — under one roof."],
              ["Industrial & Healthcare Focus", "Deep domain experience in regulated, mission-critical environments."],
              ["Rapid Prototyping Approach", "Working hardware in weeks, not quarters."],
              ["Scalable AIoT Solutions", "Architectures designed for thousands of devices from day one."],
            ].map(([title, desc], i) => (
              <li key={title} className="grid grid-cols-12 gap-4 py-6">
                <span className="col-span-2 font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <div className="col-span-10">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Have a device in mind?
              <br />
              <span className="text-brand">Let's build it.</span>
            </h2>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 border border-background/30 px-6 py-4 text-sm font-medium hover:bg-brand hover:border-brand"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
