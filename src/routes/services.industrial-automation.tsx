import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft, Thermometer, Disc, Heart } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from "recharts";
import { ServicesSidebar } from "@/components/services-sidebar";

const SITE_URL = "https://astrointelli.com";
const s = services.find((x) => x.slug === "industrial-automation")!;

export const Route = createFileRoute("/services/industrial-automation")({
  head: () => {
    const title = `${s.title} — AstroIntelli Tech`;
    const description = s.overview;
    const url = `${SITE_URL}/services/industrial-automation`;
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
  component: IndustrialAutomationDetail,
});

function IndustrialAutomationDetail() {
  const [motorLoad, setMotorLoad] = useState(45);
  const [isAnomaly, setIsAnomaly] = useState(false);
  const [vibeHistory, setVibeHistory] = useState<{ tick: number; val: number }[]>([]);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVibeHistory((prev) => {
        const next = [...prev];
        if (next.length > 20) next.shift();

        const baseVibe = (motorLoad / 100) * 2.2;
        const noise = (Math.random() - 0.5) * 0.4;
        const anomalyAdditive = isAnomaly ? 4.5 + Math.random() * 2.0 : 0;
        const finalVibe = parseFloat(Math.max(0.1, baseVibe + noise + anomalyAdditive).toFixed(2));

        next.push({ tick: count, val: finalVibe });
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [motorLoad, isAnomaly]);

  const currentVibe = vibeHistory[vibeHistory.length - 1]?.val || 1.2;
  const currentTemp = parseFloat((38.0 + (motorLoad * 0.4) + (isAnomaly ? 18.0 : 0)).toFixed(1));
  const currentOEE = isAnomaly ? 42 : Math.max(70, 98 - Math.round(motorLoad * 0.15));

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
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Automation stack</div>
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

          {/* INDUSTRIAL HEALTH DIAGNOSTICS */}
          <div className="bg-black text-white p-6 md:p-8 rounded-lg relative overflow-hidden border border-gray-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#7c2d12_1px,transparent_1px),linear-gradient(to_bottom,#7c2d12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15" />
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-500">§ SCADA Edge Diagnostics</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Vibration Monitoring</h2>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                Adjust the simulated motor load slider, trigger anomalies, and monitor real-time vibration velocity changes and OEE readings.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-12 font-mono">
                {/* Interactive Control Panel */}
                <div className="lg:col-span-5 flex flex-col justify-between border border-gray-800 bg-gray-950/60 p-5 rounded">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-900 pb-2">Controls</div>

                    {/* Motor Load Slider */}
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500">Motor Load</span>
                        <span className="text-amber-500 font-semibold">{motorLoad}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={motorLoad}
                        onChange={(e) => setMotorLoad(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-gray-850 h-1 cursor-pointer rounded"
                      />
                    </div>

                    {/* Status Readouts */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="border border-gray-900 bg-gray-900/40 p-3">
                        <span className="text-[8px] text-gray-500 block uppercase">Temperature</span>
                        <div className="mt-0.5 flex items-center gap-1">
                          <Thermometer className={`size-3.5 ${currentTemp > 75 ? "text-red-500 animate-pulse" : "text-amber-400"}`} />
                          <span className="text-xs font-semibold">{currentTemp}°C</span>
                        </div>
                      </div>

                      <div className="border border-gray-900 bg-gray-900/40 p-3">
                        <span className="text-[8px] text-gray-500 block uppercase">OEE Rate</span>
                        <div className="mt-0.5 flex items-center gap-1">
                          <Disc className={`size-3.5 ${currentOEE < 60 ? "text-red-500 animate-spin" : "text-emerald-400"}`} style={{ animationDuration: isAnomaly ? "1.5s" : "4s" }} />
                          <span className="text-xs font-semibold">{currentOEE}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-900">
                    <button
                      onClick={() => setIsAnomaly(!isAnomaly)}
                      className={`w-full font-semibold py-2 text-[10px] border cursor-pointer transition-colors ${isAnomaly
                        ? "bg-red-500/20 border-red-500 text-red-400 font-semibold animate-pulse"
                        : "border-gray-850 text-gray-500 hover:text-white"
                        }`}
                    >
                      {isAnomaly ? "RESET" : "TRIGGER BEARING FAULT"}
                    </button>
                  </div>
                </div>

                {/* Simulated Grafana/Oscilloscope Chart */}
                <div className="lg:col-span-7 border border-gray-800 bg-black flex flex-col p-5 min-h-[300px] rounded">
                  <div className="text-[10px] text-gray-400 border-b border-gray-900 pb-3 flex justify-between">
                    <span>Vibration Waveform (mm/s RMS)</span>
                    <span className="text-amber-500 flex items-center gap-0.5"><Heart className="size-3 animate-pulse" /> Edge Node #92</span>
                  </div>

                  <div className="h-60 my-4 flex-1 relative flex items-center justify-center">
                    {vibeHistory.length === 0 ? (
                      <div className="text-gray-600 text-sm">LOADING MODBUS...</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={vibeHistory}>
                          <defs>
                            <linearGradient id="colorVibe" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={isAnomaly ? "#ef4444" : "#f59e0b"} stopOpacity={0.25} />
                              <stop offset="95%" stopColor={isAnomaly ? "#ef4444" : "#f59e0b"} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="tick" hide />
                          <YAxis domain={[0, 8.5]} hide />
                          <Area type="monotone" dataKey="val" stroke={isAnomaly ? "#ef4444" : "#f59e0b"} fillOpacity={1} fill="url(#colorVibe)" strokeWidth={1.5} isAnimationActive={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}

                    {isAnomaly && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] px-1.5 py-0.5 uppercase tracking-widest font-semibold border border-red-500 animate-pulse">
                        OVER_VIBRATION
                      </div>
                    )}
                  </div>

                  <div className="mt-auto border-t border-gray-900 pt-3 grid grid-cols-3 gap-1.5 text-[11px]">
                    <div>
                      <span className="text-gray-500 block uppercase text-[9px]">RMS Velocity</span>
                      <span className={`font-semibold ${isAnomaly ? "text-red-500" : "text-amber-500"}`}>
                        {currentVibe} mm/s
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase text-[9px]">OPC-UA Server</span>
                      <span className="text-white font-semibold">ONLINE</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase text-[9px]">State</span>
                      <span className={`font-semibold ${isAnomaly ? "text-red-500" : "text-emerald-400"}`}>
                        {isAnomaly ? "CRITICAL" : "OPTIMAL"}
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
