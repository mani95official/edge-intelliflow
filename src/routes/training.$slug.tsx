import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Award, BookOpen, Layers, Users, Check } from "lucide-react";

import { trainingCourses } from "@/lib/training-data";

export const Route = createFileRoute("/training/$slug")({
  loader: ({ params }) => {
    const data = trainingCourses[params.slug as keyof typeof trainingCourses];
    if (!data) {
      throw notFound();
    }
    return data;
  },
  head: ({ loaderData }) => {
    const SITE_URL = "https://astrointelli.com";
    if (!loaderData) {
      return {
        meta: [
          { title: "Training & Workshops — AstroIntelli" },
          { name: "description", content: "Professional engineering training courses." },
        ],
      };
    }
    return {
      meta: [
        { title: `${loaderData.title} — AstroIntelli Training` },
        { name: "description", content: loaderData.subtitle },
        { property: "og:title", content: `${loaderData.title} — AstroIntelli Training` },
        { property: "og:description", content: loaderData.subtitle },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/training/${loaderData.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${loaderData.title} — AstroIntelli Training` },
        { name: "twitter:description", content: loaderData.subtitle },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/training/${loaderData.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": loaderData.title,
            "description": loaderData.description,
            "provider": {
              "@type": "EducationalOrganization",
              "name": "AstroIntelli",
              "url": SITE_URL
            },
            "educationalCredentialAwarded": loaderData.credential,
            "offers": {
              "@type": "Offer",
              "category": "Paid/Corporate",
              "priceCurrency": "INR"
            }
          }),
        },
      ],
    };
  },
  component: TrainingDetailComponent,
});

function TrainingDetailComponent() {
  const course = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Breadcrumb & Back Link */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            to="/training"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 text-brand" />
            Back to training
          </Link>
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Syllabus / {course.slug}
          </div>
        </div>
      </div>

      {/* Hero Landing Page Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-secondary/20 to-background py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span className="inline-block size-2 rounded-full bg-brand animate-pulse" />
            {course.duration}
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl text-foreground">
            {course.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-4xl">
            {course.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-brand" />
              <span>{course.duration} Hands-on Labs</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="size-4 text-brand" />
              <span>{course.credential} Awarded</span>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page Content Grid */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Main Syllabus & Covering Areas (Left 7 Columns) */}
          <main className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-brand" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Training Covering Area
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base">
                {course.description}
              </p>
            </div>

            {/* Modules / Syllabus Accordion List */}
            <div className="space-y-6">
              {course.syllabus.map((module, mIdx) => (
                <div
                  key={module.module}
                  className="rounded-lg border border-border bg-secondary/10 p-6 md:p-8 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-brand bg-brand/10 px-2.5 py-1 rounded">
                      0{mIdx + 1}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {module.module}
                    </h3>
                  </div>
                  <ul className="grid gap-3 pl-10 text-sm md:text-base text-muted-foreground">
                    {module.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-3">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand/60" />
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </main>

          {/* Features, Meta & Sidebar CTA (Right 4 Columns) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">

            {/* Highlights Box */}
            <div className="rounded-lg border border-border p-6 md:p-8 space-y-6 bg-background shadow-sm">
              <div className="flex items-center gap-2">
                <Layers className="size-5 text-brand" />
                <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider font-mono text-xs">
                  Course Highlights
                </h3>
              </div>
              <ul className="space-y-5 text-sm">
                {course.features.map((feature, fIdx) => (
                  <li key={fIdx} className="space-y-1">
                    <div className="flex items-start gap-2 font-semibold text-foreground">
                      <Check className="size-4 shrink-0 mt-0.5 text-brand" />
                      <span>{feature.title}</span>
                    </div>
                    <p className="pl-6 text-muted-foreground text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audience Profile */}
            <div className="rounded-lg border border-border p-6 bg-secondary/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <Users className="size-4 text-brand" />
                <span>Audience Profile</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed font-light">
                {course.audience}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
