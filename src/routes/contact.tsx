import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
          telephone: "+91-87546-33465",
        }),
      },
    ],
  }),
  component: ContactPage,
});

const interestsList = ["Embedded", "Edge AI / TinyML", "AIoT", "Cloud / Backend", "Mobile / Web", "Training"];

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  interests: z.array(z.string()).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interests: [] as string[],
      message: "",
    },
  });

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);
    setErrorMsg(null);

    const nameParts = values.name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const selectedInterests = values.interests || [];
    const interestsStr = selectedInterests.join(", ");
    const fullMessage = interestsStr
      ? `[Areas of Interest: ${interestsStr}]\n\n${values.message}`
      : values.message;

    const payload = {
      email: values.email,
      firstname,
      lastname,
      company: values.company,
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
                <Phone className="mt-1 size-4 text-brand" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Phone</div>
                  <a href="tel:+918754633465" className="text-lg font-medium hover:text-brand">+91 87546 33465</a>
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
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-6"
                noValidate
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      disabled={isSubmitting}
                      className={`w-full border bg-background p-4 text-base outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground ${
                        errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-brand"
                      }`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1 block font-mono">{errors.name.message}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@company.com"
                      disabled={isSubmitting}
                      className={`w-full border bg-background p-4 text-base outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground ${
                        errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-brand"
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs mt-1 block font-mono">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    placeholder="Company / Organisation"
                    disabled={isSubmitting}
                    className="w-full border border-border bg-background p-4 text-base outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground"
                    {...register("company")}
                  />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Interested in</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {interestsList.map((i) => (
                      <label key={i} className="cursor-pointer">
                        <input
                          type="checkbox"
                          value={i}
                          className="peer sr-only"
                          disabled={isSubmitting}
                          {...register("interests")}
                        />
                        <span className="inline-block border border-border px-4 py-2 text-sm transition-colors peer-checked:bg-brand peer-checked:text-white peer-checked:border-brand hover:border-foreground peer-disabled:opacity-50 text-foreground bg-background">
                          {i}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">Project brief *</label>
                  <textarea
                    id="message"
                    rows={6}
                    disabled={isSubmitting}
                    placeholder="Tell us about the product, problem, or workshop you have in mind."
                    className={`w-full border bg-background p-4 text-base outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground ${
                      errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-brand"
                    }`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <span className="text-red-500 text-xs mt-1 block font-mono">{errors.message.message}</span>
                  )}
                </div>

                {errorMsg && (
                  <div className="border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 animate-fade-in font-mono">
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