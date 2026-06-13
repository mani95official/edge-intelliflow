import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Cpu, Brain, Radio, Wrench, Cloud, Smartphone, Factory, HeartPulse, ArrowLeft, ArrowRight } from "lucide-react";
import { services } from "@/lib/services-data";
import { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine } from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Logo } from "@/components/logo";

const SITE_URL = "https://astrointelli.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AstroIntelli — Engineering Intelligent Futures" },
      { name: "description", content: "Embedded systems, Edge AI, and AIoT product development for industrial and healthcare innovation." },
      { property: "og:title", content: "AstroIntelli — Engineering Intelligent Futures" },
      { property: "og:description", content: "Embedded + AI product development from concept to deployment." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AstroIntelli — Engineering Intelligent Futures" },
      { name: "twitter:description", content: "Embedded + AI product development from concept to deployment." },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AstroIntelli Tech",
          url: SITE_URL,
          slogan: "Intelligence at the Edge. Innovation Everywhere.",
          description: "Embedded systems, Edge AI, and AIoT product development.",
          sameAs: [],
        }),
      },
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

const homeArticles = [
  {
    slug: "tinyml-hardware-selection-guide",
    title: "Choosing the Right Hardware for TinyML: ESP32 vs. STM32 vs. Nordic nRF52",
    category: "Edge AI",
    date: "June 13, 2026",
    summary: "Choosing the wrong microcontroller for your Edge AI product can delay shipping by months or drive unit costs to unsustainable levels. Here is a technical breakdown of the top 3 silicon choices."
  },
  {
    slug: "python-to-cpp-firmware-migration",
    title: "Porting Python ML Models to C++ for Embedded Microcontrollers",
    category: "Edge AI",
    date: "June 13, 2026",
    summary: "Most machine learning models are designed in Python using float32 operations. Learn the exact step-by-step pipeline to translate these prototypes into static C++ arrays."
  },
  {
    slug: "edge-ai-unlocking-efficiency",
    title: "Why Cloud-Only AI is Failing Your Hardware Products",
    category: "Edge AI",
    date: "June 12, 2026",
    summary: "Discover why sending raw sensor streams to the cloud is unsustainable for modern hardware products, and how running deep learning inference locally on microcontrollers saves costs."
  },
  {
    slug: "enterprise-aiot-architecture",
    title: "Architectural Blueprints for Enterprise AIoT",
    category: "AIoT",
    date: "June 08, 2026",
    summary: "Discover how to design and build scalable, secure, and resilient Artificial Intelligence of Things (AIoT) systems incorporating stream processing and real-time operations dashboards."
  },
  {
    slug: "aiot-in-healthcare-continuous-monitoring",
    title: "Scaling Patient Care Safely: AIoT in Medical Devices",
    category: "Healthcare",
    date: "June 05, 2026",
    summary: "Medical device manufacturers face high hurdles: data privacy (HIPAA) and life-critical latency. Learn how embedding machine learning classifiers directly on medical wearables solves these."
  },
  {
    slug: "industrial-aiot-predictive-maintenance",
    title: "Stopping Catastrophic Downtime: The ROI of Industrial AIoT",
    category: "Industrial",
    date: "May 28, 2026",
    summary: "Discover how industrial operations leads are utilizing Edge AI vibration sensors to detect mechanical bearing anomalies 48 hours before failure, boosting OEE."
  }
];

function HomePage() {
  const [profile, setProfile] = useState<"vibration" | "ecg" | "gas">("vibration");
  const [anomaly, setAnomaly] = useState(false);
  const [sliderVal, setSliderVal] = useState(1800);
  const [chartData, setChartData] = useState<{ time: number; val: number }[]>([]);

  useEffect(() => {
    if (profile === "vibration") {
      setSliderVal(1800);
    } else if (profile === "ecg") {
      setSliderVal(72);
    } else {
      setSliderVal(50);
    }
    setAnomaly(false);
  }, [profile]);

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      setChartData((prev) => {
        const next = [...prev];
        if (next.length > 25) next.shift();

        let val = 0;
        if (profile === "vibration") {
          const baseFreq = (sliderVal / 1000) * 0.5;
          const noise = (Math.random() - 0.5) * 0.3;
          const anomalySpike = anomaly && tick % 4 === 0 ? (Math.random() > 0.5 ? 2.5 : -2.5) : 0;
          val = Math.sin(tick * baseFreq) + noise + anomalySpike;
        } else if (profile === "ecg") {
          const bpmFactor = sliderVal / 72;
          const cycleTicks = Math.max(5, Math.round(12 / bpmFactor));
          const pos = tick % (anomaly ? Math.round(cycleTicks * (1.2 + Math.random() * 0.4)) : cycleTicks);

          if (pos === 0) val = 0;
          else if (pos === 1) val = 0.1;
          else if (pos === 3) val = -0.3;
          else if (pos === 4) val = 3.0;
          else if (pos === 5) val = -0.8;
          else if (pos === 7) val = 0.4;
          else val = 0;
          val += (Math.random() - 0.5) * 0.1;
        } else {
          const targetGas = sliderVal + (anomaly ? 400 : 0);
          val = targetGas + (Math.random() - 0.5) * (targetGas * 0.05);
        }

        next.push({ time: tick, val: parseFloat(val.toFixed(2)) });
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [profile, anomaly, sliderVal]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute -right-32 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-brand/30 blur-3xl md:block" aria-hidden />
        <div className="absolute -left-40 -top-40 hidden h-[420px] w-[420px] rounded-full bg-brand/20 blur-3xl md:block" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 md:px-8 md:pt-25 md:pb-28">
          <div className="mt-4 mb-4 animate-rise">
            <Logo className="h-10 md:h-10 w-auto text-foreground" repeat={true} />
          </div>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl animate-rise">
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

          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden border border-brand-tint bg-brand-tint/60 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-6">
                <div className="font-display text-2xl font-semibold md:text-3xl text-brand">{s.value}</div>
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
          <div className="mt-16 grid gap-px overflow-hidden border border-brand-tint bg-brand-tint/60 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = icons[i] ?? Cpu;
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}` as any}
                  className="group relative flex flex-col gap-6 bg-background p-8 border border-brand-tint last:border-r-0 hover:border-brand hover:bg-brand hover:text-background"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-brand group-hover:text-background/80">
                      {s.number}
                    </span>
                    <Icon className="size-5 text-brand group-hover:text-background" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70">{s.tagline}</p>
                  <span className="mt-auto inline-flex items-center text-sm font-medium">
                    View {s.title} details <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:rotate-45" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PLAYGROUND */}
      <section className="border-b border-border bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="text-xs font-mono uppercase tracking-widest text-brand">
            § 03 — TinyML Playground
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            See our <span className="text-brand">Edge AI</span> in action.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-sm md:text-base">
            Toggle anomaly modes and change inputs on simulated STM32/ESP32 microcontrollers to see real-time inference on the edge.
          </p>

          <div className="mt-16 grid gap-8 lg:grid-cols-12">
            {/* Controls Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-gray-800 bg-gray-950/85 p-6 md:p-8 backdrop-blur-sm">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Select model profile</div>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => setProfile("vibration")}
                    className={`flex items-center justify-between border px-4 py-3 text-left transition-all ${profile === "vibration"
                      ? "border-brand bg-brand/10 text-white animate-pulse"
                      : "border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                      }`}
                  >
                    <span className="font-semibold text-sm">Industrial Vibration</span>
                    <span className="font-mono text-xs text-brand">Anomaly Detection</span>
                  </button>
                  <button
                    onClick={() => setProfile("ecg")}
                    className={`flex items-center justify-between border px-4 py-3 text-left transition-all ${profile === "ecg"
                      ? "border-brand bg-brand/10 text-white animate-pulse"
                      : "border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                      }`}
                  >
                    <span className="font-semibold text-sm">Cardiac ECG Monitor</span>
                    <span className="font-mono text-xs text-brand">Arrhythmia Classify</span>
                  </button>
                  <button
                    onClick={() => setProfile("gas")}
                    className={`flex items-center justify-between border px-4 py-3 text-left transition-all ${profile === "gas"
                      ? "border-brand bg-brand/10 text-white animate-pulse"
                      : "border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                      }`}
                  >
                    <span className="font-semibold text-sm">Environment Monitor</span>
                    <span className="font-mono text-xs text-brand">Gas Leakage</span>
                  </button>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-6">
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Model specifications</div>
                  <div className="mt-4 grid grid-cols-2 gap-4 font-mono">
                    <div className="border border-gray-900 bg-gray-900/40 p-3">
                      <div className="text-[10px] text-gray-500 uppercase">Latency</div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        {profile === "vibration" ? "12 ms" : profile === "ecg" ? "34 ms" : "2 ms"}
                      </div>
                    </div>
                    <div className="border border-gray-900 bg-gray-900/40 p-3">
                      <div className="text-[10px] text-gray-500 uppercase">RAM Usage</div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        {profile === "vibration" ? "8.4 KB" : profile === "ecg" ? "16.2 KB" : "1.2 KB"}
                      </div>
                    </div>
                    <div className="border border-gray-900 bg-gray-900/40 p-3">
                      <div className="text-[10px] text-gray-500 uppercase">Flash Footprint</div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        {profile === "vibration" ? "24 KB" : profile === "ecg" ? "48 KB" : "8 KB"}
                      </div>
                    </div>
                    <div className="border border-gray-900 bg-gray-900/40 p-3">
                      <div className="text-[10px] text-gray-500 uppercase">Accuracy</div>
                      <div className="mt-1 text-sm font-semibold text-brand">
                        {profile === "vibration" ? "98.2%" : profile === "ecg" ? "97.5%" : "99.1%"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-800 pt-6">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-gray-400">
                  <span>Parameter Controls</span>
                  <span className="text-brand font-semibold">
                    {profile === "vibration" ? `${sliderVal} RPM` : profile === "ecg" ? `${sliderVal} BPM` : `${sliderVal} ppm`}
                  </span>
                </div>
                <div className="mt-4">
                  <input
                    type="range"
                    min={profile === "vibration" ? 1000 : profile === "ecg" ? 50 : 10}
                    max={profile === "vibration" ? 5000 : profile === "ecg" ? 150 : 1000}
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full accent-brand bg-gray-800 cursor-pointer h-1 rounded-lg"
                  />
                </div>
                <div className="mt-6 flex items-center justify-between border border-gray-900 bg-gray-900/40 p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Trigger Anomaly State</span>
                    <span className="text-[10px] font-mono text-gray-500">Simulate fault conditions</span>
                  </div>
                  <button
                    onClick={() => setAnomaly(!anomaly)}
                    className={`px-4 py-2 text-xs font-mono transition-colors border cursor-pointer ${anomaly
                      ? "bg-red-500/20 border-red-500 text-red-400 font-semibold"
                      : "border-gray-700 hover:border-gray-600 text-gray-300"
                      }`}
                  >
                    {anomaly ? "ACTIVE" : "INACTIVE"}
                  </button>
                </div>
              </div>
            </div>

            {/* Display / Oscilloscope Panel */}
            <div className="lg:col-span-7 border border-gray-800 bg-black flex flex-col p-6 font-mono">
              <div className="flex items-center justify-between border-b border-gray-900 pb-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-400">DEVICE_STATE:</span>
                  <span className="text-green-400 font-semibold">ONLINE</span>
                </div>
                <div className="text-gray-500">TARGET: ARM CORTEX-M4</div>
              </div>

              <div className="h-64 my-6 bg-gray-950/40 border border-gray-900 p-2 relative flex items-center justify-center">
                {chartData.length === 0 ? (
                  <div className="text-gray-600 text-sm">CALIBRATING EDGE NODE...</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="time" hide />
                      <YAxis domain={profile === "gas" ? [0, 1200] : [-3.5, 3.5]} hide />
                      <Line
                        type="monotone"
                        dataKey="val"
                        stroke={anomaly ? "#ef4444" : "#10b981"}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                      {profile === "gas" && (
                        <ReferenceLine y={800} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "THRESHOLD", fill: "#ef4444", fontSize: 10, position: "top" }} />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {anomaly && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] px-2 py-1 uppercase tracking-widest font-semibold border border-red-400 animate-pulse">
                    [!] ANOMALY_ALERT
                  </div>
                )}
              </div>

              <div className="mt-auto border-t border-gray-900 pt-4 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-gray-500 block uppercase text-[10px]">ML Inference</span>
                  <span className={`font-semibold text-sm ${anomaly ? "text-red-500 animate-pulse" : "text-brand"}`}>
                    {profile === "vibration"
                      ? (anomaly ? "FAULT_DETECTED" : "BEARING_STABLE")
                      : profile === "ecg"
                        ? (anomaly ? "ARRHYTHMIA" : "SINUS_RHYTHM")
                        : (anomaly ? "GAS_LEAK_ALERT" : "AIR_QUALITY_OK")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase text-[10px]">CPU Load</span>
                  <span className="text-white text-sm font-semibold">
                    {profile === "vibration" ? (anomaly ? "14.2%" : "8.1%") : profile === "ecg" ? "18.5%" : "2.1%"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block uppercase text-[10px]">Confidence</span>
                  <span className="text-white text-sm font-semibold">
                    {anomaly ? "99.4%" : "97.8%"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
          <div className="md:col-span-5">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <span className="text-brand">§</span> 04 — Why AstroIntelli
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

      {/* FEATURED BLOG SLIDER */}
      <section className="border-b border-border bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <span className="text-brand">§</span> 05 — Strategy & Insights
              </div>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Featured <span className="text-brand">Strategy</span> Articles.
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/blog" className="text-sm font-medium underline-offset-4 hover:underline">
                All articles →
              </Link>
              <div className="flex items-center gap-2">
                <button className="swiper-button-prev-custom flex size-10 items-center justify-center border border-border hover:border-brand hover:text-brand transition-colors cursor-pointer text-foreground">
                  <ArrowLeft className="size-4" />
                </button>
                <button className="swiper-button-next-custom flex size-10 items-center justify-center border border-border hover:border-brand hover:text-brand transition-colors cursor-pointer text-foreground">
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mt-12 !pb-14"
          >
            {homeArticles.map((article) => (
              <SwiperSlide key={article.slug} className="h-auto">
                <Link
                  to={`/blog/${article.slug}` as any}
                  className="group flex h-full flex-col justify-between border border-border bg-secondary/20 p-8 transition-all hover:border-brand hover:bg-secondary/40"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      <span>{article.category}</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center text-sm font-medium text-foreground group-hover:text-brand">
                    <span>Read Article</span>
                    <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:rotate-45" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-custom-pagination flex justify-center gap-2 mt-4" />
        </div>

        <style>{`
          .swiper-custom-pagination .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: var(--muted-foreground);
            opacity: 0.3;
            border-radius: 0;
            transition: all 0.3s ease;
          }
          .swiper-custom-pagination .swiper-pagination-bullet-active {
            width: 24px;
            background: #000DFF !important;
            opacity: 1;
          }
        `}</style>
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
