import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";

const SITE_URL = "https://astrointelli.com";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AstroIntelli" },
      { name: "description", content: "Privacy Policy and data protection terms for AstroIntelli Technologies." },
      { property: "og:title", content: "Privacy Policy — AstroIntelli" },
      { property: "og:description", content: "Privacy Policy and data protection terms." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/privacy" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/privacy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 text-brand" />
            Back to Home
          </Link>
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Legal / Privacy
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-5 py-12 md:py-20 md:px-8 space-y-8 text-muted-foreground leading-relaxed font-light">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-widest">
            <Shield className="size-4" />
            <span>Effective: June 13, 2026</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Privacy Policy
          </h1>
        </header>

        <p className="text-lg text-foreground/80">
          At AstroIntelli, we take data privacy and security seriously. This Privacy Policy details how we collect, process, and protect client, workshop participant, and website visitor data.
        </p>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you fill out a contact form, request a custom syllabus, register for a training cohort, or email hello@astrointelli.com. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name, email address, job title, and organization.</li>
            <li>Inquiry details regarding project specifications, budget, and timelines.</li>
            <li>Billing details and payment information for training cohorts or custom workshops.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">2. How We Use Information</h2>
          <p>We process collected data to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Review project requirements and construct accurate engineering bids.</li>
            <li>Deliver structured training, access to lab materials, and direct mentor support.</li>
            <li>Send strategy insights, strategy updates, and promotional content (which you can opt-out of at any time).</li>
            <li>Ensure the security, stability, and integrity of our edge-to-cloud systems.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">3. Edge AI & Telemetry Privacy</h2>
          <p>
            For client projects incorporating Edge AI and AIoT architectures, AstroIntelli adheres to strict raw data localization principles. Raw sensor data (such as voice, audio, or vibration waveforms) processed locally by edge nodes is never collected or stored on our cloud systems unless explicitly requested by the client for model training purposes under a specific Non-Disclosure Agreement (NDA).
          </p>
        </section>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">4. Data Sharing & Security</h2>
          <p>
            We do not sell, rent, or trade your personal or operational data to third parties. We utilize industry-standard cryptographic tools, full-disk database encryption, and secure HTTPS/TLS data transit to protect all processed files.
          </p>
        </section>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">5. Contact Information</h2>
          <p>
            For questions about this policy or to request data erasure, please contact us at:
            <br />
            <strong>Email:</strong> hello@astrointelli.com
            <br />
            <strong>Address:</strong> Ramanys Mayuri, Saravanampatti, Coimbatore - 641035, Tamil Nadu, India.
          </p>
        </section>
      </main>
    </div>
  );
}
