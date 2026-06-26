import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HUBSPOT_CONFIG, submitHubSpotForm } from "@/lib/hubspot-service";

interface TrainingEnquiryFormProps {
  courseTitle: string;
  courseSlug: string;
}

const enquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid work email address." }),
  company: z.string().min(2, { message: "Organization name must be at least 2 characters." }),
  teamSize: z.string().min(1, { message: "Please select an estimated cohort size." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export function TrainingEnquiryForm({ courseTitle, courseSlug }: TrainingEnquiryFormProps) {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      teamSize: "1",
      message: "",
    },
  });

  const onSubmit = async (values: EnquiryFormData) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    const nameParts = values.name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const fullMessage = `[Training Enquiry: ${courseTitle} (${courseSlug})]\n[Team Size: ${values.teamSize}]\n\nNotes:\n${values.message}`;

    const payload = {
      email: values.email,
      firstname,
      lastname,
      company: values.company,
      message: fullMessage,
      course_slug: courseSlug,
      course_title: courseTitle,
      team_size: values.teamSize,
    };

    const success = await submitHubSpotForm(HUBSPOT_CONFIG.trainingFormId, payload);
    setIsSubmitting(false);
    if (success) {
      setSent(true);
    } else {
      setErrorMsg("Failed to send enquiry. Please check your network connection or email hello@astrointelli.com.");
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="enquiry-name" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
              Full Name *
            </label>
            <input
              id="enquiry-name"
              type="text"
              disabled={isSubmitting}
              placeholder="Your name"
              className={`w-full border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground ${
                errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-brand"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1 block font-mono">{errors.name.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="enquiry-email" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
              Work Email *
            </label>
            <input
              id="enquiry-email"
              type="email"
              disabled={isSubmitting}
              placeholder="you@company.com"
              className={`w-full border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground ${
                errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-brand"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block font-mono">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="enquiry-company" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
              Organization *
            </label>
            <input
              id="enquiry-company"
              disabled={isSubmitting}
              placeholder="Company / University"
              className={`w-full border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground ${
                errors.company ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-brand"
              }`}
              {...register("company")}
            />
            {errors.company && (
              <span className="text-red-500 text-xs mt-1 block font-mono">{errors.company.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="enquiry-team-size" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
              Estimated Cohort Size *
            </label>
            <select
              id="enquiry-team-size"
              disabled={isSubmitting}
              className={`w-full border bg-background px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground cursor-pointer ${
                errors.teamSize ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-brand"
              }`}
              {...register("teamSize")}
            >
              <option value="1">Just Me (1 Person)</option>
              <option value="2-5">Small Team (2-5 Cohort members)</option>
              <option value="6-15">Mid Team (6-15 Cohort members)</option>
              <option value="16-50">Large Team (16-50 Cohort members)</option>
              <option value="50+">Enterprise (50+ Cohort members)</option>
            </select>
            {errors.teamSize && (
              <span className="text-red-500 text-xs mt-1 block font-mono">{errors.teamSize.message}</span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="enquiry-message" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
            Custom requests / timeline *
          </label>
          <textarea
            id="enquiry-message"
            rows={4}
            disabled={isSubmitting}
            placeholder="Describe your learning goals, background expertise, hardware kit shipping needs, or specific timeline constraints."
            className={`w-full border bg-background p-4 text-sm outline-none transition-colors focus:ring-1 focus:ring-brand disabled:opacity-50 text-foreground ${
              errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-border focus:border-brand"
            }`}
            {...register("message")}
          />
          {errors.message && (
            <span className="text-red-500 text-xs mt-1 block font-mono">{errors.message.message}</span>
          )}
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
