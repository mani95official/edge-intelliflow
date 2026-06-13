import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft, Wifi, AlertTriangle } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";
import { ServicesSidebar } from "@/components/services-sidebar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";


const SITE_URL = "https://astrointelli.com";
const s = services.find((x) => x.slug === "aiot")!;

export const Route = createFileRoute("/services/aiot")({
  head: () => {
    const title = `${s.title} — AstroIntelli Tech`;
    const description = s.overview;
    const url = `${SITE_URL}/services/aiot`;
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
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a }
            }))
          })
        },
      ],
    };
  },
  component: AiotDetail,
});

interface Device {
  id: string;
  name: string;
  temp: number;
  vibe: number;
  status: "ONLINE" | "OFFLINE" | "ERROR";
}

function AiotDetail() {
  const [devices, setDevices] = useState<Device[]>([
    { id: "node-1", name: "ESP32-Flow-01", temp: 34.2, vibe: 1.2, status: "ONLINE" },
    { id: "node-2", name: "ESP32-Flow-02", temp: 36.8, vibe: 1.5, status: "ONLINE" },
    { id: "node-3", name: "STM32-Flow-03", temp: 41.1, vibe: 4.8, status: "ONLINE" },
    { id: "node-4", name: "STM32-Flow-04", temp: 32.5, vibe: 0.9, status: "ONLINE" },
  ]);
  const [telemetryHistory, setTelemetryHistory] = useState<{ time: number; rate: number }[]>([]);
  const [isAlertActive, setIsAlertActive] = useState(false);

  // Run telemetry background update
  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      setDevices((prev) =>
        prev.map((d) => {
          if (d.status === "OFFLINE") return d;
          const tempDelta = (Math.random() - 0.5) * 0.8;
          const vibeDelta = (Math.random() - 0.5) * 0.2;
          const status = d.id === "node-3" && isAlertActive ? "ERROR" : "ONLINE";
          return {
            ...d,
            temp: parseFloat(Math.max(20, Math.min(85, d.temp + tempDelta)).toFixed(1)),
            vibe: parseFloat(Math.max(0.1, Math.min(10, d.vibe + vibeDelta)).toFixed(2)),
            status,
          };
        })
      );

      setTelemetryHistory((prev) => {
        const next = [...prev];
        if (next.length > 20) next.shift();
        const onlineCount = devices.filter((d) => d.status === "ONLINE").length;
        const errorCount = devices.filter((d) => d.status === "ERROR").length;
        const msgRate = (onlineCount * 10) + (errorCount * 5);
        next.push({ time: tick, rate: msgRate });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [devices, isAlertActive]);

  const toggleAlert = () => {
    setIsAlertActive(!isAlertActive);
  };

  const simulatePowerOutage = () => {
    setDevices((prev) =>
      prev.map((d, i) => (i % 2 === 0 ? { ...d, status: "OFFLINE", temp: 0, vibe: 0 } : d))
    );
  };

  const restoreAll = () => {
    setIsAlertActive(false);
    setDevices([
      { id: "node-1", name: "ESP32-Flow-01", temp: 34.2, vibe: 1.2, status: "ONLINE" },
      { id: "node-2", name: "ESP32-Flow-02", temp: 36.8, vibe: 1.5, status: "ONLINE" },
      { id: "node-3", name: "STM32-Flow-03", temp: 41.1, vibe: 1.8, status: "ONLINE" },
      { id: "node-4", name: "STM32-Flow-04", temp: 32.5, vibe: 0.9, status: "ONLINE" },
    ]);
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
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">AIoT stack</div>
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

          {/* DYNAMIC TELEMETRY FLEET DASHBOARD */}
          <div className="bg-black text-white p-6 md:p-8 rounded-lg relative overflow-hidden border border-gray-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">§ Real-time Fleet IoT Simulator</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Connected Edge Fleet</h2>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                Trigger custom outages or mock fault conditions to see how the edge nodes communicate telemetry over secure MQTT backbones.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-12">
                {/* Devices grid */}
                <div className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
                  {devices.map((d) => (
                    <div key={d.id} className="border border-gray-800 bg-gray-950 p-4 font-mono flex flex-col justify-between rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-semibold">{d.name}</span>
                        <span className={`flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded border ${d.status === "ONLINE"
                          ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                          : d.status === "ERROR"
                            ? "border-red-500/20 bg-red-500/5 text-red-400 animate-pulse"
                            : "border-gray-800 bg-gray-900/50 text-gray-500"
                          }`}>
                          <span className={`size-1 rounded-full ${d.status === "ONLINE"
                            ? "bg-emerald-500"
                            : d.status === "ERROR"
                              ? "bg-red-500 animate-ping"
                              : "bg-gray-600"
                            }`} />
                          {d.status}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-[9px] text-gray-500">MCU TEMP</div>
                          <div className="text-xs font-semibold text-white">{d.status === "OFFLINE" ? "--" : `${d.temp}°C`}</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-gray-500">VIBE RMS</div>
                          <div className="text-xs font-semibold text-white">{d.status === "OFFLINE" ? "--" : `${d.vibe} g`}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ingestion Monitor panel */}
                <div className="lg:col-span-5 border border-gray-800 bg-gray-950/60 p-5 font-mono flex flex-col justify-between rounded">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-900 pb-2 flex items-center justify-between">
                      <span>Ingestion Pipeline</span>
                      <span className="text-emerald-400 flex items-center gap-0.5"><Wifi className="size-3" /> AWS IoT Core</span>
                    </div>
                    <div className="h-28 mt-4 relative">
                      {telemetryHistory.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">BUFFERING...</div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={telemetryHistory}>
                            <defs>
                              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="rate" stroke="#10b981" fillOpacity={1} fill="url(#colorRate)" strokeWidth={1} isAnimationActive={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>

                    {isAlertActive && (
                      <div className="mt-3 border border-red-500/30 bg-red-500/5 p-2 flex gap-2 items-start text-[10px] text-red-400 rounded">
                        <AlertTriangle className="size-3.5 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block uppercase">ANOMALY DETECTED</span>
                          Anomaly triggered on node STM32-Flow-03.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-900 grid grid-cols-3 gap-1.5">
                    <button
                      onClick={toggleAlert}
                      className={`text-center py-1.5 text-[10px] border cursor-pointer font-mono ${isAlertActive ? "border-red-500 bg-red-500/10 text-red-400" : "border-gray-800 text-gray-500 hover:text-white"
                        }`}
                    >
                      {isAlertActive ? "MUTE" : "FAULT"}
                    </button>
                    <button
                      onClick={simulatePowerOutage}
                      className="text-center py-1.5 text-[10px] border border-gray-800 text-gray-500 hover:text-white font-mono cursor-pointer"
                    >
                      CUT
                    </button>
                    <button
                      onClick={restoreAll}
                      className="text-center py-1.5 text-[10px] border border-gray-800 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-mono cursor-pointer"
                    >
                      RECOVER
                    </button>
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
              Start your <span className="text-brand">{s.title.split(" ")[0].toLocaleLowerCase()}</span> project.
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
