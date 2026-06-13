import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ArrowLeft, Cpu, Radio, Activity, Zap } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState } from "react";
import { ServicesSidebar } from "@/components/services-sidebar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const SITE_URL = "https://astrointelli.com";
const s = services.find((x) => x.slug === "embedded-systems")!;

export const Route = createFileRoute("/services/embedded-systems")({
  head: () => {
    const title = `${s.title} — AstroIntelli Tech`;
    const description = s.overview;
    const url = `${SITE_URL}/services/embedded-systems`;
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
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        },
      ],
    };
  },
  component: EmbeddedSystemsDetail,
});

function EmbeddedSystemsDetail() {
  const [activeComponent, setActiveComponent] = useState<string>("mcu");

  const componentDetails: Record<string, { title: string; desc: string; code: string }> = {
    mcu: {
      title: "Core Microcontroller (ESP32 / STM32)",
      desc: "Dual-core or ARM Cortex-M architecture with integrated RTOS (FreeRTOS/Zephyr). Hard real-time task scheduling for time-critical industrial processes.",
      code: "xTaskCreatePinnedToCore(\n  telemetryTask,\n  \"Telemetry\",\n  4096,\n  NULL,\n  2,\n  &tHandle,\n  1\n);",
    },
    sensor: {
      title: "I2C/SPI Sensor Bus",
      desc: "DMA-enabled communication interfaces with hardware sensors. Ring buffers and low-power interrupts isolate CPU execution from bus speeds.",
      code: "HAL_SPI_Transmit_DMA(\n  &hspi1,\n  pTxData,\n  dataLength\n);",
    },
    power: {
      title: "Ultra Low Power Management",
      desc: "Deep sleep cycles down to 10µA. Configured to wake up on hardware interrupt thresholds or internal timers to maximize battery operating lifetime.",
      code: "esp_sleep_enable_ext0_wakeup(\n  GPIO_NUM_33,\n  1\n);\nesp_deep_sleep_start();",
    },
    ota: {
      title: "Secure OTA & Wi-Fi/BLE Radio",
      desc: "Secure Wi-Fi/BLE communication layer. Rolling-key encryption, signature verification, and redundant memory partition rollback for fail-safe updates.",
      code: "if (verify_signature(fw_bin)) {\n  esp_ota_set_boot_partition(\n    next_partition\n  );\n}",
    },
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
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Firmware stack</div>
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

          {/* INTERACTIVE SCHEMATIC EXPLORER */}
          <div className="bg-black text-white p-6 md:p-8 rounded-lg relative overflow-hidden border border-gray-800">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
            <div className="relative">
              <div className="text-xs font-mono uppercase tracking-widest text-brand">§ Interactive PCB schematic</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Explore the silicon architecture</h2>

              <div className="mt-8 grid gap-8 lg:grid-cols-12">
                {/* PCB representation */}
                <div className="lg:col-span-7 flex items-center justify-center p-6 bg-gray-950 border border-gray-900 rounded-md relative min-h-[300px]">
                  <div className="w-full aspect-video border border-emerald-500/30 bg-emerald-950/10 rounded p-4 flex flex-col justify-between relative shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/20" />
                    <div className="absolute top-0 bottom-0 left-1/3 w-px bg-emerald-500/20" />
                    <div className="absolute top-0 bottom-0 left-2/3 w-px bg-emerald-500/20" />

                    <div className="flex justify-between items-start z-10">
                      <button
                        onClick={() => setActiveComponent("mcu")}
                        className={`size-16 border rounded flex flex-col items-center justify-center cursor-pointer transition-all ${activeComponent === "mcu"
                          ? "bg-brand/20 border-brand shadow-[0_0_15px_rgba(239,68,68,0.4)] text-white"
                          : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
                          }`}
                      >
                        <Cpu className="size-5 mb-0.5" />
                        <span className="text-[8px] font-mono">MCU</span>
                      </button>

                      <button
                        onClick={() => setActiveComponent("ota")}
                        className={`size-14 border rounded flex flex-col items-center justify-center cursor-pointer transition-all ${activeComponent === "ota"
                          ? "bg-brand/20 border-brand shadow-[0_0_15px_rgba(239,68,68,0.4)] text-white"
                          : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
                          }`}
                      >
                        <Radio className="size-4 mb-0.5" />
                        <span className="text-[8px] font-mono">RF / BLE</span>
                      </button>
                    </div>

                    <div className="flex justify-between items-end z-10">
                      <button
                        onClick={() => setActiveComponent("power")}
                        className={`size-14 border rounded flex flex-col items-center justify-center cursor-pointer transition-all ${activeComponent === "power"
                          ? "bg-brand/20 border-brand shadow-[0_0_15px_rgba(239,68,68,0.4)] text-white"
                          : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
                          }`}
                      >
                        <Zap className="size-4 mb-0.5" />
                        <span className="text-[8px] font-mono">PMIC</span>
                      </button>

                      <button
                        onClick={() => setActiveComponent("sensor")}
                        className={`size-14 border rounded flex flex-col items-center justify-center cursor-pointer transition-all ${activeComponent === "sensor"
                          ? "bg-brand/20 border-brand shadow-[0_0_15px_rgba(239,68,68,0.4)] text-white"
                          : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
                          }`}
                      >
                        <Activity className="size-4 mb-0.5" />
                        <span className="text-[8px] font-mono">SENSORS</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info details */}
                <div className="lg:col-span-5 flex flex-col justify-between border border-gray-800 bg-gray-950/60 p-5 font-mono">
                  <div>
                    <div className="text-[10px] text-brand uppercase tracking-widest">[Component Module]</div>
                    <h3 className="mt-2 text-base font-semibold text-white">{componentDetails[activeComponent].title}</h3>
                    <p className="mt-3 text-xs text-gray-400 leading-relaxed">{componentDetails[activeComponent].desc}</p>
                  </div>
                  <div className="mt-6 border-t border-gray-900 pt-4">
                    <div className="text-[9px] text-gray-500 uppercase">Driver Logic (C/C++)</div>
                    <pre className="mt-2 p-3 bg-black border border-gray-900 text-[10px] text-emerald-400 overflow-x-auto rounded">
                      <code>{componentDetails[activeComponent].code}</code>
                    </pre>
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

          {/* FAQ SECTION */}
          {s.faqs && s.faqs.length > 0 && (
            <div className="border-t border-border pt-10">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ FAQ</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="mt-8 w-full border-t border-border">
                {s.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                    <AccordionTrigger className="text-base font-semibold hover:text-brand transition-colors py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

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
