import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft, Terminal, Send } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState } from "react";
import { ServicesSidebar } from "@/components/services-sidebar";

const SITE_URL = "https://edge-intelliflow.lovable.app";
const s = services.find((x) => x.slug === "cloud-backend")!;

export const Route = createFileRoute("/services/cloud-backend")({
  head: () => {
    const title = `${s.title} — AstroIntelli Technologies`;
    const description = s.overview;
    const url = `${SITE_URL}/services/cloud-backend`;
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
            provider: { "@type": "Organization", name: "AstroIntelli Technologies", url: SITE_URL },
            serviceType: s.title,
            areaServed: s.industries,
            url,
          }),
        },
      ],
    };
  },
  component: CloudBackendDetail,
});

function CloudBackendDetail() {
  const [deviceId, setDeviceId] = useState("esp32_flow_8b");
  const [valRPM, setValRPM] = useState(2400);
  const [valTemp, setValTemp] = useState(42.5);
  const [isSending, setIsSending] = useState(false);
  const [responseLog, setResponseLog] = useState<string | null>(null);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      const response = {
        status: 202,
        statusText: "Accepted",
        timestamp: new Date().toISOString(),
        data: {
          message: "Telemetry packet queued successfully",
          queue_id: `q_idx_${Math.floor(Math.random() * 900000 + 100000)}`,
          pipeline_stats: {
            broker_received: "0.2ms",
            timescaledb_write: "4.8ms",
            rule_engine_eval: "1.1ms",
            total_duration: "6.1ms"
          }
        }
      };
      setResponseLog(JSON.stringify(response, null, 2));
      setIsSending(false);
    }, 800);
  };

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
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Backend stack</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <li key={t} className="border border-border bg-secondary px-3 py-1 text-xs font-mono">{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Target Sectors</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.industries.map((t) => (
                    <li key={t} className="text-xs text-muted-foreground">/ {t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CLOUD API INGESTION SANDBOX */}
          <div className="bg-black text-white p-6 md:p-8 rounded-lg relative overflow-hidden border border-gray-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e81_1px,transparent_1px),linear-gradient(to_bottom,#312e81_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">§ Telemetry Ingestion API Test</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">API Request Sandbox</h2>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                Adjust the sliders below to modify telemetry parameters, hit send, and see how the FastAPI cloud pipeline digests the packet into TimescaleDB.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-12 font-mono">
                {/* Request parameters panel */}
                <div className="lg:col-span-5 flex flex-col justify-between border border-gray-800 bg-gray-950/60 p-5 rounded">
                  <div className="space-y-4">
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-900 pb-2 flex items-center gap-1.5">
                      <Terminal className="size-3.5 text-indigo-400" /> HTTP POST
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-gray-500 block">DEVICE_ID</span>
                      <input
                        type="text"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                        className="w-full bg-black border border-gray-850 px-2 py-1.5 text-xs text-white rounded focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">RPM</span>
                        <span className="text-indigo-400">{valRPM} RPM</span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={6000}
                        value={valRPM}
                        onChange={(e) => setValRPM(Number(e.target.value))}
                        className="w-full accent-indigo-500 bg-gray-800 cursor-pointer h-1 rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">TEMP</span>
                        <span className="text-indigo-400">{valTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={120}
                        step={0.5}
                        value={valTemp}
                        onChange={(e) => setValTemp(Number(e.target.value))}
                        className="w-full accent-indigo-500 bg-gray-800 cursor-pointer h-1 rounded"
                      />
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-900 pt-4">
                    <button
                      onClick={handleSend}
                      disabled={isSending}
                      className="w-full bg-indigo-650 hover:bg-indigo-600 text-white font-semibold py-2.5 text-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSending ? "POSTING..." : "SEND TELEMETRY"} <Send className="size-3" />
                    </button>
                  </div>
                </div>

                {/* Simulated Terminal console */}
                <div className="lg:col-span-7 border border-gray-800 bg-black flex flex-col p-5 min-h-[300px] rounded">
                  <div className="text-[10px] text-gray-400 border-b border-gray-900 pb-3 flex justify-between">
                    <span>FastAPI Ingest Output</span>
                    <span className="text-indigo-400">POST /api/v1/telemetry/</span>
                  </div>
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase mb-1">Payload JSON</div>
                      <pre className="p-3 bg-gray-950 border border-gray-900 text-[10px] text-gray-300 rounded overflow-x-auto">
                        <code>{`{\n  "device_id": "${deviceId}",\n  "metrics": {\n    "rpm": ${valRPM},\n    "temperature": ${valTemp}\n  }\n}`}</code>
                      </pre>
                    </div>

                    <div className="mt-4">
                      <div className="text-[9px] text-gray-500 uppercase mb-1">Server Response</div>
                      {responseLog ? (
                        <pre className="p-3 bg-gray-950 border border-emerald-900/30 text-[10px] text-emerald-400 rounded overflow-x-auto max-h-32 overflow-y-auto">
                          <code>{responseLog}</code>
                        </pre>
                      ) : (
                        <div className="p-3 border border-gray-900 bg-gray-950/20 text-[10px] text-gray-600 rounded">
                          [Console idle. Trigger send payload to verify.]
                        </div>
                      )}
                    </div>
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
