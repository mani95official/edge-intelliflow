import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft, Shield, ShieldCheck, Heart } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import { ServicesSidebar } from "@/components/services-sidebar";

const SITE_URL = "https://astrointelli.com";
const s = services.find((x) => x.slug === "healthcare")!;

export const Route = createFileRoute("/services/healthcare")({
  head: () => {
    const title = `${s.title} — AstroIntelli Tech`;
    const description = s.overview;
    const url = `${SITE_URL}/services/healthcare`;
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
  component: HealthcareDetail,
});

function HealthcareDetail() {
  const [bpm, setBpm] = useState(72);
  const [condition, setCondition] = useState<"normal" | "anomaly">("normal");
  const [ekgHistory, setEkgHistory] = useState<{ tick: number; val: number }[]>([]);

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      setEkgHistory((prev) => {
        const next = [...prev];
        if (next.length > 25) next.shift();

        const bpmFactor = bpm / 72;
        const cycleTicks = Math.max(5, Math.round(12 / bpmFactor));
        const targetCycle = condition === "anomaly" ? Math.round(cycleTicks * (1.2 + Math.random() * 0.3)) : cycleTicks;
        const pos = tick % targetCycle;

        let val = 0;
        if (pos === 0) val = 0;
        else if (pos === 1) val = 0.15;
        else if (pos === 3) val = -0.4;
        else if (pos === 4) val = 3.2;
        else if (pos === 5) val = -0.9;
        else if (pos === 7) val = 0.45;
        else val = 0;

        val += (Math.random() - 0.5) * 0.08;

        next.push({ tick, val: parseFloat(val.toFixed(2)) });
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [bpm, condition]);

  const spo2 = condition === "anomaly" ? 94 : 98;

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
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">MedTech stack</div>
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

          {/* PATIENT VITAL MONITOR SIMULATOR */}
          <div className="bg-black text-white p-6 md:p-8 rounded-lg relative overflow-hidden border border-gray-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d9488_1px,transparent_1px),linear-gradient(to_bottom,#0d9488_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15" />
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-teal-400">§ Clinical Vital Monitor</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Live EKG Signal</h2>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                Simulate cardiac vitals on the virtual patient monitor. Toggle condition presets to verify how the Edge AI flags arrhythmias in real-time.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-12 font-mono">
                {/* Interactive Control Panel */}
                <div className="lg:col-span-5 flex flex-col justify-between border border-gray-800 bg-gray-950/60 p-5 rounded">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-900 pb-2">Vitals Configuration</div>

                    {/* BPM Slider */}
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Heart Rate</span>
                        <span className="text-teal-400 font-semibold">{bpm} BPM</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={150}
                        value={bpm}
                        onChange={(e) => setBpm(Number(e.target.value))}
                        className="w-full accent-teal-500 bg-gray-855 h-1 cursor-pointer rounded"
                      />
                    </div>

                    {/* Condition Presets */}
                    <div className="mt-6 space-y-1.5">
                      <span className="text-[9px] text-gray-500 block uppercase">Cardiac Profile</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCondition("normal")}
                          className={`flex-1 text-center py-2 text-[10px] border cursor-pointer transition-colors ${condition === "normal" ? "border-teal-500 bg-teal-500/10 text-white" : "border-gray-800 text-gray-500 hover:text-white"
                            }`}
                        >
                          Normal
                        </button>
                        <button
                          onClick={() => setCondition("anomaly")}
                          className={`flex-1 text-center py-2 text-[10px] border cursor-pointer transition-colors ${condition === "anomaly" ? "border-red-500 bg-red-500/10 text-red-400 animate-pulse" : "border-gray-800 text-gray-500 hover:text-white"
                            }`}
                        >
                          Arrhythmia
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Regulatory standard validation block */}
                  <div className="mt-6 border-t border-gray-900 pt-4 space-y-2">
                    <div className="text-[9px] text-gray-555 uppercase">Privacy & Safety</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                      <ShieldCheck className="size-3.5 shrink-0" /> FHIR schema compatible
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-teal-400">
                      <Shield className="size-3.5 shrink-0" /> TLS/DTLS encrypted radio
                    </div>
                  </div>
                </div>

                {/* EKG Screen Panel */}
                <div className="lg:col-span-7 border border-gray-800 bg-black flex flex-col p-5 min-h-[300px] rounded">
                  <div className="text-[10px] text-gray-400 border-b border-gray-900 pb-3 flex justify-between">
                    <span>Electrocardiogram Channel I</span>
                    <span className="text-teal-400 flex items-center gap-0.5"><Heart className="size-3 animate-pulse" /> Bed #04</span>
                  </div>

                  <div className="h-60 my-4 flex-1 relative flex items-center justify-center">
                    {ekgHistory.length === 0 ? (
                      <div className="text-gray-600 text-sm">LOADING VITAL PROBES...</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={ekgHistory}>
                          <XAxis dataKey="tick" hide />
                          <YAxis domain={[-1.5, 4.0]} hide />
                          <Line type="monotone" dataKey="val" stroke={condition === "anomaly" ? "#ef4444" : "#14b8a6"} strokeWidth={2} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}

                    {condition === "anomaly" && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] px-1.5 py-0.5 uppercase tracking-widest font-semibold border border-red-500 animate-pulse">
                        ARRHYTHMIA_DETECTED
                      </div>
                    )}
                  </div>

                  <div className="mt-auto border-t border-gray-900 pt-3 grid grid-cols-3 gap-1.5 text-[11px]">
                    <div>
                      <span className="text-gray-500 block uppercase text-[9px]">Pulse Rate</span>
                      <span className={`font-semibold ${condition === "anomaly" ? "text-red-500" : "text-teal-400"}`}>
                        {bpm} BPM
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase text-[9px]">SpO2 Level</span>
                      <span className="text-white font-semibold">{spo2}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase text-[9px]">Signal State</span>
                      <span className={`font-semibold ${condition === "anomaly" ? "text-red-500" : "text-emerald-400"}`}>
                        {condition === "anomaly" ? "ARRHYTHMIA" : "SINUS"}
                      </span>
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
