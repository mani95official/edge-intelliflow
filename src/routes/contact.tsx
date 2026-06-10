import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const SITE_URL = "https://edge-intelliflow.lovable.app";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AstroIntelli Technologies" },
      { name: "description", content: "Start a project, request a workshop, or talk to our engineering team." },
      { property: "og:title", content: "Contact — AstroIntelli Technologies" },
      { property: "og:description", content: "Let's build intelligent products together." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — AstroIntelli Technologies" },
      { name: "twitter:description", content: "Let's build intelligent products together." },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact AstroIntelli",
          url: SITE_URL + "/contact",
          email: "hello@astrointelli.tech",
        }),
      },
    ],
  }),
  component: ContactPage,
});

const interests = ["Embedded", "Edge AI / TinyML", "AIoT", "Cloud / Backend", "Mobile / Web", "Training"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-16 md:px-8 md:pt-32">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="text-brand">§</span> Contact
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Let's build something <span className="text-brand">intelligent</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Tell us about your product, problem or idea. We typically respond within one business day.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border-x border-border bg-border md:grid-cols-12">
          <div className="bg-background p-8 md:col-span-4 md:p-12">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">§ Direct</div>
            <ul className="mt-8 space-y-8">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 size-4 text-brand" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</div>
                  <a href="mailto:hello@astrointelli.tech" className="text-lg font-medium hover:text-brand">hello@astrointelli.tech</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 text-brand" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Location</div>
                  <div className="text-lg font-medium">India · Remote-first</div>
                </div>
              </li>
            </ul>
            <div className="mt-12 border-t border-border pt-8">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Response time</div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="inline-block size-1.5 rounded-full bg-brand animate-blink" />
                Within 1 business day
              </div>
            </div>
          </div>

          <div className="bg-background p-8 md:col-span-8 md:p-12">
            {sent ? (
              <div className="flex h-full flex-col items-start justify-center">
                <div className="font-mono text-xs uppercase tracking-widest text-brand">Sent ✓</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Thanks — we'll be in touch.</h2>
                <p className="mt-4 text-muted-foreground">We've received your message and a member of the team will reply shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="grid gap-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" required />
                  <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <Field label="Company" name="company" placeholder="Company / Organisation" />

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Interested in</label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {interests.map((i) => (
                      <label key={i} className="cursor-pointer">
                        <input type="checkbox" name="interest" value={i} className="peer sr-only" />
                        <span className="inline-block border border-border px-4 py-2 text-sm transition-colors peer-checked:bg-brand peer-checked:text-white peer-checked:border-brand hover:border-foreground">
                          {i}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project brief</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us about the product, problem, or workshop you have in mind."
                    className="mt-2 w-full border border-border bg-background p-4 text-base outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-fit items-center gap-3 bg-foreground px-6 py-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  Send message
                  <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border border-border bg-background p-4 text-base outline-none focus:border-brand focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}