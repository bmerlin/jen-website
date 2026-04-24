import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { certifications } from "@/content/certifications";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <section className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground">{site.title}</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{site.name}</h1>
        <p className="text-lg text-muted-foreground">{site.tagline}</p>
        <p className="max-w-2xl text-base leading-7">{site.description}</p>
        <div className="flex gap-3 pt-2">
          <a href={`mailto:${site.email}`} className={buttonVariants({ size: "lg" })}>
            Get in touch
          </a>
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              LinkedIn
            </a>
          )}
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
        <div className="space-y-4">
          {experience.map((role) => (
            <Card key={`${role.company}-${role.startDate}`}>
              <CardHeader>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <CardTitle className="text-lg">
                    {role.role} · {role.company}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {role.startDate} – {role.endDate ?? "Present"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
                  {role.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
        <div className="space-y-2">
          {education.map((e) => (
            <div key={`${e.institution}-${e.startDate}`} className="text-sm leading-6">
              <p className="font-medium">{e.institution}</p>
              <p className="text-muted-foreground">
                {e.credential}
                {e.field ? `, ${e.field}` : ""} · {e.startDate} – {e.endDate ?? "Present"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.category}>
              <p className="font-medium">{s.category}</p>
              <p className="text-sm text-muted-foreground">{s.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      {certifications.length > 0 && (
        <section className="mt-16 space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Certifications</h2>
          <ul className="space-y-2 text-sm leading-6">
            {certifications.map((c) => (
              <li key={`${c.name}-${c.issuer}`}>
                <span className="font-medium">{c.name}</span> · {c.issuer} · {c.issuedDate}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
