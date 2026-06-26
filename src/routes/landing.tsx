import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Cpu, Brain, Radio, ShieldCheck, ArrowUpRight, Loader2, CheckCircle2, ChevronRight } from "lucide-react";
import { HUBSPOT_CONFIG, submitHubSpotForm } from "@/lib/hubspot-service";
import { Logo } from "@/components/logo";

const SITE_URL = "https://astrointelli.com";

const landingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid work email address." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  timeline: z.string().min(1, { message: "Please select an estimated project timeline." }),
  message: z.string().min(10, { message: "Project brief must be at least 10 characters." }),
});

type LandingFormData = z.infer<typeof landingSchema>;

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Specialist Edge AI & Embedded Systems Development — AstroIntelli" },
      { name: "description", content: "Accelerate your hardware project. On-device TinyML models, ESP32/STM32 firmware, and secure IoT engineering." },
      { property: "og:title", content: "Specialist Edge AI & Embedded Systems Development — AstroIntelli" },
      { property: "og:description", content: "Accelerate your hardware project. On-device TinyML models, ESP32/STM32 firmware, and secure IoT engineering." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/landing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/landing" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LandingFormData>({
    resolver: zodResolver(landingSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      timeline: "1-3 months",
      message: "",
    },
  });

  const onSubmit = async (values: LandingFormData) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    const nameParts = values.name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const fullMessage = `[Marketing Lead Capture]\n[Project Timeline: ${values.timeline}]\n\nBrief:\n${values.message}`;

    const payload = {
      email: values.email,
      firstname,
      lastname,
      company: values.company,
      message: fullMessage,
      project_timeline: values.timeline,
    };

    const success = await submitHubSpotForm(HUBSPOT_CONFIG.contactFormId, payload);
    setIsSubmitting(false);
    if (success) {
      setSent(true);
    } else {
      setErrorMsg("Submission failed. Please check your network connection or email hello@astrointelli.com.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans relative overflow-hidden selection:bg-brand selection:text-white">
      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
      <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-brand/10 blur-3xl opacity-60" aria-hidden />
      <div className="absolute bottom-1/4 -left-48 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-3xl opacity-40" aria-hidden />

      {/* Minimal Landing Page Header */}
      <header className="relative z-10 border-b border-gray-900 bg-gray-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <Link to="/" className="outline-none focus:ring-1 focus:ring-brand">
            <Logo className="h-8 w-auto text-white" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            Back to main site <ChevronRight className="size-3 text-brand" />
          </Link>
        </div>
      </header>

      {/* Main Campaign Hero & Lead Card */}
      <main className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Value Prop & Bullet Points */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/5 px-3 py-1 text-[10px] font-mono text-brand uppercase tracking-widest">
              <span className="inline-block size-1.5 rounded-full bg-brand animate-pulse" />
              Specialist Hardware + AI Consulting
            </div>
            
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl text-white">
              Specialized engineering.<br />
              <span className="text-brand">On-device intelligence.</span>
            </h1>
            
            <p className="max-w-2xl text-base md:text-lg text-gray-400 font-light leading-relaxed">
              We design robust embedded hardware, train and quantize TinyML models, and build cloud-connected enterprise AIoT systems that run securely on the edge.
            </p>

            {/* Core Pillars List */}
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 border border-gray-800">
                  <Brain className="size-4 text-brand" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">On-Device Machine Learning (TinyML)</h3>
                  <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                    Execute high-frequency sensor signal processing and neural network inference locally on microcontrollers (ESP32/STM32) under 10ms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 border border-gray-800">
                  <Cpu className="size-4 text-brand" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Production-Grade Firmware Engineering</h3>
                  <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                    Write multitasking C++ application logic directly using Espressif's ESP-IDF or ARM Cortex hardware registers with full RTOS scheduling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 border border-gray-800">
                  <Radio className="size-4 text-brand" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Secure Ingestion Pipelines</h3>
                  <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                    Establish resilient, TLS-encrypted MQTT/WebSocket connections to cloud brokers, caching timeseries telemetry data.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="pt-8 border-t border-gray-900 grid grid-cols-3 gap-4 font-mono text-center md:text-left">
              <div>
                <div className="text-2xl font-semibold text-brand">75%</div>
                <div className="mt-1 text-[10px] text-gray-500 uppercase tracking-wider">Flash Footprint Saved</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-brand">&lt;10ms</div>
                <div className="mt-1 text-[10px] text-gray-500 uppercase tracking-wider">Inference Latency</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-brand">100%</div>
                <div className="mt-1 text-[10px] text-gray-500 uppercase tracking-wider">Offline Autonomy</div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Box */}
          <div className="lg:col-span-5 relative">
            {/* Glowing Accent Border around the Card */}
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-brand to-teal-500 opacity-20 blur" />
            
            <div className="relative rounded-xl border border-gray-800 bg-gray-950/90 p-8 shadow-2xl backdrop-blur-sm">
              {sent ? (
                <div className="flex flex-col items-center text-center py-10 space-y-4 animate-rise">
                  <div className="flex size-14 items-center justify-center rounded-full bg-brand/10 border border-brand/30">
                    <CheckCircle2 className="size-8 text-brand" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white tracking-tight">Lead Captured successfully!</h2>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                    Thank you. We have received your project details. An engineering lead will contact you within 24 hours to schedule an initial scoping session.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-xs font-mono uppercase tracking-widest text-brand hover:underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-white tracking-tight">Accelerate Your Project</h2>
                    <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                      Scoping a new hardware design or looking to implement on-device intelligence? Let's align on hardware selections and architectures.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                      <label htmlFor="landing-name" className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="landing-name"
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Your name"
                        className={`w-full border bg-gray-900 px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-white placeholder-gray-600 ${
                          errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-800 focus:border-brand"
                        }`}
                        {...register("name")}
                      />
                      {errors.name && (
                        <span className="text-red-500 text-xs mt-1 block font-mono">{errors.name.message}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="landing-email" className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1.5">
                        Work Email *
                      </label>
                      <input
                        id="landing-email"
                        type="email"
                        disabled={isSubmitting}
                        placeholder="you@company.com"
                        className={`w-full border bg-gray-900 px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-white placeholder-gray-600 ${
                          errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-800 focus:border-brand"
                        }`}
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs mt-1 block font-mono">{errors.email.message}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="landing-company" className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1.5">
                        Company *
                      </label>
                      <input
                        id="landing-company"
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Organization / Company"
                        className={`w-full border bg-gray-900 px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-white placeholder-gray-600 ${
                          errors.company ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-800 focus:border-brand"
                        }`}
                        {...register("company")}
                      />
                      {errors.company && (
                        <span className="text-red-500 text-xs mt-1 block font-mono">{errors.company.message}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="landing-timeline" className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1.5">
                        Project Timeline *
                      </label>
                      <select
                        id="landing-timeline"
                        disabled={isSubmitting}
                        className="w-full border border-gray-800 bg-gray-900 px-4 py-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 text-white cursor-pointer"
                        {...register("timeline")}
                      >
                        <option value="immediate">Immediate (Within 1 Month)</option>
                        <option value="1-3 months">Soon (1-3 Months)</option>
                        <option value="3-6 months">Scoping (3-6 Months)</option>
                        <option value="exploring">Just Exploring Options</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="landing-message" className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1.5">
                        Project Brief *
                      </label>
                      <textarea
                        id="landing-message"
                        rows={4}
                        disabled={isSubmitting}
                        placeholder="Briefly describe your hardware stack, sensors, target battery life, or AI requirements..."
                        className={`w-full border bg-gray-900 p-4 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-white placeholder-gray-600 ${
                          errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-800 focus:border-brand"
                        }`}
                        {...register("message")}
                      />
                      {errors.message && (
                        <span className="text-red-500 text-xs mt-1 block font-mono">{errors.message.message}</span>
                      )}
                    </div>

                    {errorMsg && (
                      <div className="border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400 animate-fade-in font-mono">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-3 bg-brand py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          Submitting...
                          <Loader2 className="size-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Submit Project Brief
                          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Trust Footer */}
      <footer className="relative z-10 border-t border-gray-900 bg-gray-950/80 py-10">
        <div className="mx-auto max-w-7xl px-5 text-center text-xs text-gray-600 font-mono">
          &copy; {new Date().getFullYear()} AstroIntelli Tech. All rights reserved. | Security: Flash Encrypted & TLS Socket Handshakes.
        </div>
      </footer>
    </div>
  );
}
