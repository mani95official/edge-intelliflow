import { useState } from "react";
import { ArrowUpRight, Loader2, Send } from "lucide-react";
import { HUBSPOT_CONFIG, submitHubSpotForm } from "@/lib/hubspot-service";

interface TrainingEnquiryFormProps {
  courseTitle: string;
  courseSlug: string;
}

export function TrainingEnquiryForm({ courseTitle, courseSlug }: TrainingEnquiryFormProps) {
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
    const teamSize = formData.get("teamSize") as string;
    const message = formData.get("message") as string;

    const nameParts = name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const fullMessage = `[Training Enquiry: ${courseTitle} (${courseSlug})]\n[Team Size: ${teamSize}]\n\nNotes:\n${message}`;

    const payload = {
      email,
      firstname,
      lastname,
      company,
      message: fullMessage,
      course_slug: courseSlug,
      course_title: courseTitle,
      team_size: teamSize,
    };

    const success = await submitHubSpotForm(HUBSPOT_CONFIG.trainingFormId, payload);
    setIsSubmitting(false);
    if (success) {
      setSent(true);
    } else {
      setErrorMsg("Failed to send enquiry. Please check your network connection or email hello@astrointelli.com.");
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-brand/30 bg-secondary/15 p-6 md:p-8 text-left space-y-4 animate-rise">
        <div className="font-mono text-xs uppercase tracking-widest text-brand font-semibold">Enquiry Sent ✓</div>
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">Thank you for your interest.</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We've received your request for <strong>{courseTitle}</strong>. An engineering mentor will reach out to discuss scheduling, cohort pricing, and kit delivery.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-secondary/10 p-6 md:p-8 text-left space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand">Cohort Enquiry</div>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Request Workshop Booking</h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          Fill out the form below to enquire about custom schedules, localized lab equipment kits, or group/corporate cohorts for <strong className="text-foreground">{courseTitle}</strong>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="enquiry-name" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
              Full Name *
            </label>
            <input
              id="enquiry-name"
              name="name"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="Your name"
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground"
            />
          </div>
          <div>
            <label htmlFor="enquiry-email" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
              Work Email *
            </label>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              required
              disabled={isSubmitting}
              placeholder="you@company.com"
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="enquiry-company" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
              Organization *
            </label>
            <input
              id="enquiry-company"
              name="company"
              required
              disabled={isSubmitting}
              placeholder="Company / University"
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground"
            />
          </div>
          <div>
            <label htmlFor="enquiry-team-size" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
              Estimated Cohort Size *
            </label>
            <select
              id="enquiry-team-size"
              name="teamSize"
              required
              disabled={isSubmitting}
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground cursor-pointer"
            >
              <option value="1">Just Me (1 Person)</option>
              <option value="2-5">Small Team (2-5 Cohort members)</option>
              <option value="6-15">Mid Team (6-15 Cohort members)</option>
              <option value="16-50">Large Team (16-50 Cohort members)</option>
              <option value="50+">Enterprise (50+ Cohort members)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="enquiry-message" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
            Custom requests / timeline *
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={4}
            required
            disabled={isSubmitting}
            placeholder="Describe your learning goals, background expertise, hardware kit shipping needs, or specific timeline constraints."
            className="w-full border border-border bg-background p-4 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground"
          />
        </div>

        {errorMsg && (
          <div className="border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400 animate-fade-in">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-3 bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              Submitting...
              <Loader2 className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Submit Enquiry
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
