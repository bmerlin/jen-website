import Image from "next/image";

import {
  getEducation,
  getExperience,
  getMetrics,
  getSite,
  getSkills,
  getTestimonials,
} from "@/sanity/queries";
import type {
  Education,
  Experience,
  Metric,
  SiteConfig,
  SkillGroup,
  Testimonial,
} from "@/sanity/types";

const formatRange = (start?: string, end?: string) => {
  const startLabel = start ? formatMonth(start) : "";
  const endLabel = end ? formatMonth(end) : "Present";
  return startLabel ? `${startLabel} – ${endLabel}` : endLabel;
};

function formatMonth(value: string) {
  // Accepts "YYYY", "YYYY-MM", or "YYYY-MM-DD".
  const parts = value.split("-");
  if (parts.length === 1) return parts[0];
  const [year, month] = parts;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export default async function Home() {
  const [site, metrics, experience, education, skills, testimonials] =
    await Promise.all([
      getSite(),
      getMetrics(),
      getExperience(),
      getEducation(),
      getSkills(),
      getTestimonials(),
    ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav site={site} />
      <Hero site={site} />
      <PivotNarrative site={site} />
      <MetricsBand metrics={metrics} />
      <ExperienceSection experience={experience} />
      <EducationSection education={education} />
      <SkillsSection skills={skills} />
      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
      <ContactSection site={site} />
      <Footer site={site} />
    </div>
  );
}

function Nav({ site }: { site: SiteConfig }) {
  return (
    <nav className="sticky top-0 z-10 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-serif text-lg tracking-tight">
          {site.name}
        </a>
        <ul className="hidden gap-7 text-sm text-muted-foreground sm:flex">
          <li>
            <a href="#story" className="hover:text-foreground">
              Story
            </a>
          </li>
          <li>
            <a href="#experience" className="hover:text-foreground">
              Experience
            </a>
          </li>
          <li>
            <a href="#education" className="hover:text-foreground">
              Education
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Hero({ site }: { site: SiteConfig }) {
  return (
    <section id="top" className="border-b border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {site.title}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            {site.name}
          </h1>
          <p className="mt-8 max-w-xl font-serif text-2xl leading-snug text-foreground/90 sm:text-3xl">
            {site.tagline}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in touch
            </a>
            <a
              href="#story"
              className="inline-flex h-11 items-center rounded-md border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Read the pivot story
            </a>
          </div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-foreground/5 lg:aspect-auto lg:min-h-[560px]">
          <Image
            src="/portrait-jen.jpg"
            alt={`${site.name}, ${site.title}`}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

function PivotNarrative({ site }: { site: SiteConfig }) {
  return (
    <section id="story" className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:grid-cols-[1fr_2fr] sm:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            The Story
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            Why pharmaceutical sales. Why now.
          </h2>
        </div>
        <div className="space-y-6 text-base leading-7 text-foreground/85">
          <p className="font-serif text-2xl italic leading-snug text-foreground">
            &ldquo;{site.pivotStatement}&rdquo;
          </p>
          <p>{site.description}</p>
          <p>
            Pharmaceutical sales asks for a specific intersection: scientific
            literacy a clinician will respect, and the discipline of
            consultative, relationship-driven selling. I&rsquo;ve been
            building both ends of that intersection for the better part of a
            decade — first by training, then by practice, and now by choice.
          </p>
        </div>
      </div>
    </section>
  );
}

function MetricsBand({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          By the Numbers
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
          A track record of revenue, relationships, and reach.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => (
            <div key={m._id} className="bg-card p-6">
              <p className="font-serif text-5xl leading-none tracking-tight text-primary">
                {m.value}
              </p>
              <p className="mt-3 text-sm font-medium">{m.label}</p>
              {m.context && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {m.context}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Experience
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
          Ten years of commercial leadership.
        </h2>
        <ol className="mt-12 space-y-10">
          {experience.map((role) => (
            <li
              key={role._id}
              className="grid gap-6 border-t border-border/70 pt-8 sm:grid-cols-[1fr_2fr]"
            >
              <div>
                <p className="font-serif text-xl leading-tight">{role.company}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {role.location}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {formatRange(role.startDate, role.endDate)}
                </p>
              </div>
              <div>
                <p className="text-base font-medium">{role.role}</p>
                {role.summary && (
                  <p className="mt-3 text-sm leading-7 text-foreground/85">
                    {role.summary}
                  </p>
                )}
                <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/85">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 inline-block size-1 shrink-0 rounded-full bg-primary"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" className="border-b border-border/60">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:grid-cols-[1fr_2fr] sm:py-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Education
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            A clinical foundation, not a career-change crash course.
          </h2>
        </div>
        <ul className="space-y-6">
          {education.map((e) => (
            <li key={e._id} className="border-t border-border/70 pt-6">
              <p className="font-serif text-xl leading-tight">{e.credential}</p>
              {e.field && (
                <p className="mt-1 text-sm text-foreground/85">{e.field}</p>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                {e.institution}
                {e.endDate ? ` · ${formatMonth(e.endDate)}` : ""}
                {e.status === "in-progress" ? " · In progress" : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <section className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Capabilities
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
          What I bring to a territory.
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group._id}>
              <p className="font-serif text-xl">{group.category}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/85">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          References
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
          What collaborators say.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t._id}
              className="rounded-lg border border-border bg-card p-6"
            >
              <blockquote className="font-serif text-lg italic leading-snug">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                {t.attribution}
                {t.relationship ? ` · ${t.relationship}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ site }: { site: SiteConfig }) {
  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
          Contact
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">
          Ready to talk territory.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 opacity-90">
          For recruiters, hiring managers, and district managers — the fastest
          way to reach me is email. I respond within one business day.
        </p>
        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
              Email
            </dt>
            <dd className="mt-2 text-base">
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </dd>
          </div>
          {site.phone && (
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                Phone
              </dt>
              <dd className="mt-2 text-base">
                <a href={`tel:${site.phone.replace(/[^\d]/g, "")}`} className="hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
          )}
          {site.linkedin && (
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                LinkedIn
              </dt>
              <dd className="mt-2 text-base">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {prettifyLinkedinUrl(site.linkedin)}
                </a>
              </dd>
            </div>
          )}
        </dl>
        <p className="mt-12 text-sm opacity-70">Based in {site.location}.</p>
      </div>
    </section>
  );
}

function prettifyLinkedinUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "");
}

function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-border/60 bg-background py-8 text-center text-xs text-muted-foreground">
      <p>
        © {new Date().getFullYear()} {site.name}. {site.location}.
      </p>
    </footer>
  );
}
