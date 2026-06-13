import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft, Lightbulb, Fan, Battery } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState } from "react";
import { ServicesSidebar } from "@/components/services-sidebar";

const SITE_URL = "https://edge-intelliflow.lovable.app";
const s = services.find((x) => x.slug === "mobile-web")!;

export const Route = createFileRoute("/services/mobile-web")({
  head: () => {
    const title = `${s.title} — AstroIntelli Technologies`;
    const description = s.overview;
    const url = `${SITE_URL}/services/mobile-web`;
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
  component: MobileWebDetail,
});

function MobileWebDetail() {
  const [brightness, setBrightness] = useState(60);
  const [fanSpeed, setFanSpeed] = useState<"OFF" | "LOW" | "HIGH">("LOW");

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
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">App framework</div>
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

          {/* MOBILE DEVICE CONTROLLER SHOWCASE */}
          <div className="bg-black text-white p-6 md:p-8 rounded-lg relative overflow-hidden border border-gray-800">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#831843_1px,transparent_1px),linear-gradient(to_bottom,#831843_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-pink-400">§ Real-time Mobile Controller</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Responsive App UI</h2>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                Interact with the simulated smartphone interface below. Adjust sliders and toggles to see immediate changes over WebSocket/MQTT channels.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-12">
                {/* Explanatory text */}
                <div className="lg:col-span-5 flex flex-col justify-center border border-gray-800 bg-gray-950/60 p-5 font-mono">
                  <h3 className="text-base font-semibold text-white">Full-Stack UX Engineering</h3>
                  <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                    Modern control surfaces require zero-latency status reports. We utilize high-frequency WebSockets channels and light JSON exchanges to achieve instantaneous visual feedback.
                  </p>
                  <div className="mt-4 border-t border-gray-900 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <span className="size-1.5 bg-emerald-500 rounded-full" /> Sub-50ms roundtrip
                    </div>
                    <div className="flex items-center gap-2 text-xs text-pink-400">
                      <span className="size-1.5 bg-pink-500 rounded-full" /> BLE/Wi-Fi Provisioning
                    </div>
                  </div>
                </div>

                {/* Smart Phone Shell Container */}
                <div className="lg:col-span-7 flex items-center justify-center p-6 bg-gray-900/40 border border-gray-850 rounded-lg">
                  <div className="w-56 border-[5px] border-gray-800 bg-gray-950 rounded-[24px] overflow-hidden shadow-2xl relative">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-gray-800 rounded-full z-20 flex justify-center items-center">
                      <span className="w-5 h-0.5 bg-gray-950 rounded-full" />
                    </div>
                    
                    <div className="pt-6 pb-3 px-3 bg-gray-950 min-h-[350px] flex flex-col justify-between font-sans">
                      <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono">
                        <span>9:41</span>
                        <span className="flex items-center gap-0.5"><Battery className="size-2.5 text-emerald-400" /> 84%</span>
                      </div>

                      <div className="my-4 space-y-3">
                        <div className="text-[9px] font-semibold text-gray-450 font-mono uppercase tracking-widest">Controller</div>

                        {/* Lamp controller widget */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-md p-3 rounded-lg relative overflow-hidden">
                          <div 
                            className="absolute inset-0 bg-yellow-400 transition-opacity duration-150 pointer-events-none" 
                            style={{ opacity: brightness * 0.0018 }}
                          />
                          <div className="relative flex items-center justify-between z-10">
                            <div className="flex items-center gap-2">
                              <Lightbulb className={`size-4 transition-colors ${brightness > 0 ? "text-yellow-400" : "text-gray-500"}`} />
                              <div>
                                <span className="text-[10px] font-semibold block text-white">Chamber Light</span>
                                <span className="text-[9px] text-gray-400 font-mono">{brightness}%</span>
                              </div>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={brightness}
                              onChange={(e) => setBrightness(Number(e.target.value))}
                              className="w-16 accent-yellow-400 bg-gray-800 h-1 cursor-pointer rounded"
                            />
                          </div>
                        </div>

                        {/* Fan speed controller widget */}
                        <div className="border border-white/10 bg-white/5 backdrop-blur-md p-3 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Fan className={`size-4 text-indigo-400 ${fanSpeed !== "OFF" ? "animate-spin" : ""}`} style={{ animationDuration: fanSpeed === "HIGH" ? "0.6s" : "1.5s" }} />
                            <div>
                              <span className="text-[10px] font-semibold block text-white">Ventilation</span>
                              <span className="text-[9px] text-gray-400 font-mono">{fanSpeed}</span>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {(["OFF", "LOW", "HIGH"] as const).map((spd) => (
                              <button
                                key={spd}
                                onClick={() => setFanSpeed(spd)}
                                className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-semibold cursor-pointer transition-colors ${
                                  fanSpeed === spd ? "bg-indigo-650 text-white" : "bg-white/10 text-gray-400 hover:text-white"
                                }`}
                              >
                                {spd}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[9px] text-gray-500 font-mono">
                        <span>Gateway: OK</span>
                        <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      </div>
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
