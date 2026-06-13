import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, ArrowUpRight, Loader2 } from "lucide-react";
import { HUBSPOT_CONFIG, submitHubSpotForm } from "@/lib/hubspot-service";

const SITE_URL = "https://astrointelli.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AstroIntelli Tech" },
      { name: "description", content: "Start a project, request a workshop, or talk to our engineering team." },
      { property: "og:title", content: "Contact — AstroIntelli Tech" },
      { property: "og:description", content: "Let's build intelligent products together." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — AstroIntelli Tech" },
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
          email: "hello@astrointelli.com",
        }),
      },
    ],
  }),
  component: ContactPage,
});

const interests = ["Embedded", "Edge AI / TinyML", "AIoT", "Cloud / Backend", "Mobile / Web", "Training"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;
    const selectedInterests = formData.getAll("interest") as string[];

    const nameParts = name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const interestsStr = selectedInterests.join(", ");
    const fullMessage = interestsStr
      ? `[Areas of Interest: ${interestsStr}]\n\n${message}`
      : message;

    const payload = {
      email,
      firstname,
      lastname,
      company,
      message: fullMessage,
      interests: selectedInterests,
    };

    const success = await submitHubSpotForm(HUBSPOT_CONFIG.contactFormId, payload);
    setIsSubmitting(false);
    if (success) {
      setSent(true);
    } else {
      setErrorMsg("Failed to send message. Please check your connection or contact us directly at hello@astrointelli.com.");
    }
  }

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
                  <a href="mailto:hello@astrointelli.com" className="text-lg font-medium hover:text-brand">hello@astrointelli.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 text-brand" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Location</div>
                  <div className="text-lg font-medium">Ramanys Mayuri, Saravanampatti, Coimbatore - 641035, Tamil Nadu, India</div>
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
                onSubmit={handleSubmit}
                className="grid gap-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" required disabled={isSubmitting} />
                  <Field label="Email" name="email" type="email" placeholder="you@company.com" required disabled={isSubmitting} />
                </div>
                <Field label="Company" name="company" placeholder="Company / Organisation" disabled={isSubmitting} />

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Interested in</label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {interests.map((i) => (
                      <label key={i} className="cursor-pointer">
                        <input type="checkbox" name="interest" value={i} className="peer sr-only" disabled={isSubmitting} />
                        <span className="inline-block border border-border px-4 py-2 text-sm transition-colors peer-checked:bg-brand peer-checked:text-white peer-checked:border-brand hover:border-foreground peer-disabled:opacity-50">
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
                    disabled={isSubmitting}
                    placeholder="Tell us about the product, problem, or workshop you have in mind."
                    className="mt-2 w-full border border-border bg-background p-4 text-base outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50"
                  />
                </div>

                {errorMsg && (
                  <div className="border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 animate-fade-in">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex w-fit items-center gap-3 bg-foreground px-6 py-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <Loader2 className="size-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required, disabled }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; disabled?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="mt-2 w-full border border-border bg-background p-4 text-base outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50"
      />
    </div>
  );
}