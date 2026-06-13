import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ServicesSidebar } from "@/components/services-sidebar";

const SITE_URL = "https://astrointelli.com";
const s = services.find((x) => x.slug === "edge-ai-tinyml")!;

export const Route = createFileRoute("/services/edge-ai-tinyml")({
  head: () => {
    const title = `${s.title} — AstroIntelli Tech`;
    const description = s.overview;
    const url = `${SITE_URL}/services/edge-ai-tinyml`;
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
  component: EdgeAiDetail,
});

function EdgeAiDetail() {
  const [modelType, setModelType] = useState<"audio" | "vision" | "sensor">("vision");
  const [quantLevel, setQuantLevel] = useState<"fp32" | "int8">("int8");

  // Mock data for graphs
  const quantData = {
    vision: [
      { name: "Model Size (KB)", FP32: 340, INT8: 85 },
      { name: "Latency (ms)", FP32: 120, INT8: 22 },
      { name: "Accuracy (%)", FP32: 96, INT8: 94.5 },
    ],
    audio: [
      { name: "Model Size (KB)", FP32: 80, INT8: 20 },
      { name: "Latency (ms)", FP32: 35, INT8: 8 },
      { name: "Accuracy (%)", FP32: 95, INT8: 93.8 },
    ],
    sensor: [
      { name: "Model Size (KB)", FP32: 16, INT8: 4 },
      { name: "Latency (ms)", FP32: 8, INT8: 1.5 },
      { name: "Accuracy (%)", FP32: 98.5, INT8: 98.1 },
    ],
  };

  const activeData = quantData[modelType];

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
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">TinyML stack</div>
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

          {/* MODEL QUANTISATION INTERACTIVE SANDBOX */}
          <div className="bg-black text-white p-6 md:p-8 rounded-lg relative overflow-hidden border border-gray-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-purple-400">§ TinyML Performance Optimizer</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Quantisation Sandbox</h2>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                See how converting model weights from float32 to int8 reduces footprint and latency on MCUs while maintaining accuracy.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-12">
                {/* Control Panel */}
                <div className="lg:col-span-5 flex flex-col justify-between border border-gray-800 bg-gray-950/60 p-5 font-mono">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">1. Choose Model Type</div>
                    <div className="mt-3 flex flex-col gap-1.5">
                      <button
                        onClick={() => setModelType("vision")}
                        className={`text-left px-3 py-2 text-xs border cursor-pointer transition-colors ${modelType === "vision" ? "border-purple-500 bg-purple-500/10 text-white" : "border-gray-800 text-gray-500 hover:text-white"
                          }`}
                      >
                        Image Classification
                      </button>
                      <button
                        onClick={() => setModelType("audio")}
                        className={`text-left px-3 py-2 text-xs border cursor-pointer transition-colors ${modelType === "audio" ? "border-purple-500 bg-purple-500/10 text-white" : "border-gray-800 text-gray-500 hover:text-white"
                          }`}
                      >
                        Keyword Spotting
                      </button>
                      <button
                        onClick={() => setModelType("sensor")}
                        className={`text-left px-3 py-2 text-xs border cursor-pointer transition-colors ${modelType === "sensor" ? "border-purple-500 bg-purple-500/10 text-white" : "border-gray-800 text-gray-500 hover:text-white"
                          }`}
                      >
                        Anomaly Detection
                      </button>
                    </div>

                    <div className="mt-6 border-t border-gray-850 pt-4">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">2. Toggle Precision</div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setQuantLevel("fp32")}
                          className={`flex-1 text-center py-2 text-xs border cursor-pointer transition-colors ${quantLevel === "fp32" ? "border-purple-500 bg-purple-500/10 text-white" : "border-gray-800 text-gray-500 hover:text-white"
                            }`}
                        >
                          Float32
                        </button>
                        <button
                          onClick={() => setQuantLevel("int8")}
                          className={`flex-1 text-center py-2 text-xs border cursor-pointer transition-colors ${quantLevel === "int8" ? "border-purple-500 bg-purple-500/10 text-white" : "border-gray-800 text-gray-500 hover:text-white"
                            }`}
                        >
                          Int8
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-850 pt-4 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-500">Target:</span>
                      <span className="text-white font-semibold">Cortex-M4 @ 80MHz</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-500">Flash required:</span>
                      <span className="text-white font-semibold">
                        {quantLevel === "fp32" ? activeData[0].FP32 : activeData[0].INT8} KB
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-500">Execution time:</span>
                      <span className="text-purple-400 font-semibold">
                        {quantLevel === "fp32" ? activeData[1].FP32 : activeData[1].INT8} ms
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-500">Inference accuracy:</span>
                      <span className="text-emerald-400 font-semibold">
                        {quantLevel === "fp32" ? activeData[2].FP32 : activeData[2].INT8}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recharts Bar Comparison Chart */}
                <div className="lg:col-span-7 border border-gray-800 bg-black flex flex-col p-5 min-h-[300px]">
                  <div className="text-[10px] font-mono text-gray-500 border-b border-gray-900 pb-3 flex justify-between">
                    <span>METRICS COMPARISON: FP32 VS INT8</span>
                    <span className="text-purple-400">TFLITE COMPATIBLE</span>
                  </div>
                  <div className="h-60 my-4 flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} />
                        <YAxis stroke="#6b7280" fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#1f2937", color: "#fff" }} />
                        <Legend wrapperStyle={{ fontSize: 10, paddingTop: 5 }} />
                        <Bar dataKey="FP32" fill="#4b5563" name="Float32" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="INT8" fill="#a855f7" name="Int8 (Quant)" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
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
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-5xl">How we work</h2>
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
