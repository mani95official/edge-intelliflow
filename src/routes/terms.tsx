import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Scale } from "lucide-react";

const SITE_URL = "https://astrointelli.com";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AstroIntelli" },
      { name: "description", content: "Terms of Service and Conditions for AstroIntelli consulting and workshops." },
      { property: "og:title", content: "Terms & Conditions — AstroIntelli" },
      { property: "og:description", content: "Terms of Service and Conditions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/terms" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
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
            Legal / Terms
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-5 py-12 md:py-20 md:px-8 space-y-8 text-muted-foreground leading-relaxed font-light">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-widest">
            <Scale className="size-4" />
            <span>Updated: June 13, 2026</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Terms & Conditions
          </h1>
        </header>

        <p className="text-lg text-foreground/80">
          Welcome to AstroIntelli. By accessing our website, booking custom consulting services, or enrolling in our training workshops, you agree to comply with and be bound by the following terms.
        </p>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">1. Services & Engagements</h2>
          <p>
            AstroIntelli Tech provides custom firmware development, hardware layout consulting, Edge AI integration, and systems architecture services. Each project is subject to a signed Master Services Agreement (MSA) or Statement of Work (SOW) outlining delivery milestones, licensing rights, and specific payment parameters.
          </p>
        </section>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">2. Workshops & Training</h2>
          <p>
            Enrollment in our workshops (such as ESP32 Programming, TinyML, or AIoT Development) is subject to availability and payment in full before the cohort starts. Course syllabus, hardware kit provisions, and access keys are provided for educational purposes only.
          </p>
          <p>
            All training materials (slide decks, custom example firmware, and project code blocks) are the copyrighted intellectual property of AstroIntelli and cannot be reproduced, resold, or redistributed without written authorization.
          </p>
        </section>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">3. Code Licensing</h2>
          <p>
            Unless explicitly negotiated in a signed project contract, all custom firmware prototypes, PCB schematics, and dashboard templates delivered during discovery phases are provided 'as is' for internal assessment, without warranties of fitness for a particular purpose.
          </p>
        </section>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">4. Limitation of Liability</h2>
          <p>
            AstroIntelli is not liable for hardware damages, data loss, network outages, or production downtime caused by the deployment of raw beta code, firmware prototypes, or experimental models in active production environments. Production deployments must undergo complete engineering verification by the client.
          </p>
        </section>

        <section className="space-y-4 text-sm md:text-base">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts located in Coimbatore, Tamil Nadu, India.
          </p>
        </section>
      </main>
    </div>
  );
}
