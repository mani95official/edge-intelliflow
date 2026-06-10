import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Cpu, Brain, Wifi, Code2, Sigma, CircuitBoard } from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training & Workshops — AstroIntelli" },
      { name: "description", content: "Industry-focused training in ESP32, embedded systems, Edge AI, TinyML, AIoT and Python for IoT." },
      { property: "og:title", content: "Training & Workshops — AstroIntelli" },
      { property: "og:description", content: "Practical, project-based training programs for engineers and students." },
    ],
  }),
  component: TrainingPage,
});

const topics = [
  { icon: Cpu, title: "ESP32 Programming", desc: "Wi-Fi, BLE, peripherals, deep sleep, OTA — production-grade firmware." },
  { icon: CircuitBoard, title: "Embedded Systems", desc: "Architecture, RTOS basics, debugging and embedded best practices." },
  { icon: Brain, title: "Edge AI & TinyML", desc: "Train, quantize, and deploy models that run on microcontrollers." },
  { icon: Wifi, title: "AIoT Development", desc: "End-to-end: device → cloud → dashboard with intelligence at every layer." },
  { icon: Code2, title: "Python for IoT", desc: "Backends, scripting, data pipelines and rapid IoT prototyping." },
  { icon: Sigma, title: "ML on Microcontrollers", desc: "Hands-on projects: anomaly detection, gesture, keyword spotting." },
];

function TrainingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-16 md:px-8 md:pt-32">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="text-brand">§</span> Training & Workshops
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Practical training. <span className="text-brand">Industry depth.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Project-driven workshops for engineering teams, universities, and individual practitioners building real embedded + AI products.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {topics.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="group relative flex flex-col gap-6 bg-background p-8 transition-colors hover:bg-foreground hover:text-background">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/60">
                      0{i + 1}
                    </span>
                    <Icon className="size-5 text-brand" />
                  </div>
                  <h3 className="text-xl font-semibold">{t.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-5">
            <GraduationCap className="size-8 text-brand" />
            <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Built for builders.
            </h2>
          </div>
          <ul className="md:col-span-7 divide-y divide-border border-y border-border">
            {[
              ["Hands-on first", "Every session ends with working code on real hardware."],
              ["Industry projects", "Workshops are built around problems we actually ship in client work."],
              ["For teams & institutions", "Customised cohorts for engineering colleges, R&D teams and startups."],
              ["Mentorship beyond the session", "Continued guidance as your team applies what they learned."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-12 gap-4 py-6">
                <span className="col-span-2 font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <div className="col-span-10">
                  <h3 className="text-lg font-semibold">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-end md:px-8">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Bring a workshop to your <span className="text-brand">team</span>.
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-2 border border-background/30 px-6 py-4 text-sm font-medium hover:bg-brand hover:border-brand">
            Request a syllabus →
          </Link>
        </div>
      </section>
    </>
  );
}