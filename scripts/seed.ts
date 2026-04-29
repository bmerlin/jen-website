/**
 * Seed Sanity with the content currently in src/content/*.ts. Run once after
 * the Sanity project is created and the env vars are set.
 *
 * Usage:
 *   pnpm tsx scripts/seed.ts
 *
 * Required env (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET     (defaults to "production")
 *   SANITY_WRITE_TOKEN             (write-access API token from sanity.io/manage)
 */

import { config } from "dotenv";
import { createClient } from "@sanity/client";

import { education } from "../src/content/education";
import { experience } from "../src/content/experience";
import { metrics } from "../src/content/metrics";
import { site } from "../src/content/site";
import { skills } from "../src/content/skills";
import { testimonials } from "../src/content/testimonials";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required");
if (!token) throw new Error("SANITY_WRITE_TOKEN is required");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-28",
  token,
  useCdn: false,
});

async function main() {
  console.log(`Seeding project ${projectId} / dataset ${dataset}...`);

  // Site singleton — fixed _id so subsequent runs upsert.
  await client.createOrReplace({
    _id: "site",
    _type: "site",
    name: site.name,
    title: site.title,
    tagline: site.tagline,
    pivotStatement: site.pivotStatement,
    description: site.description,
    location: site.location,
    email: site.email,
    phone: site.phone,
    linkedin: site.linkedin,
    resumeUrl: site.resumeUrl,
  });
  console.log("✓ site");

  for (const [i, m] of metrics.entries()) {
    await client.createOrReplace({
      _id: `metric.${slug(m.label)}`,
      _type: "metric",
      value: m.value,
      label: m.label,
      context: m.context,
      order: (i + 1) * 10,
    });
  }
  console.log(`✓ ${metrics.length} metrics`);

  for (const e of experience) {
    await client.createOrReplace({
      _id: `experience.${slug(e.company)}.${e.startDate}`,
      _type: "experience",
      company: e.company,
      role: e.role,
      location: e.location,
      startDate: e.startDate,
      endDate: e.endDate,
      summary: e.summary,
      highlights: e.highlights,
    });
  }
  console.log(`✓ ${experience.length} experience entries`);

  for (const e of education) {
    await client.createOrReplace({
      _id: `education.${slug(e.credential)}.${e.endDate ?? "n"}`,
      _type: "education",
      institution: e.institution,
      credential: e.credential,
      field: e.field,
      startDate: e.startDate,
      endDate: e.endDate,
      status: e.status,
    });
  }
  console.log(`✓ ${education.length} education entries`);

  for (const [i, g] of skills.entries()) {
    await client.createOrReplace({
      _id: `skillGroup.${slug(g.category)}`,
      _type: "skillGroup",
      category: g.category,
      items: g.items,
      order: (i + 1) * 10,
    });
  }
  console.log(`✓ ${skills.length} skill groups`);

  for (const [i, t] of testimonials.entries()) {
    await client.createOrReplace({
      _id: `testimonial.${slug(t.attribution)}`,
      _type: "testimonial",
      quote: t.quote,
      attribution: t.attribution,
      relationship: t.relationship,
      order: (i + 1) * 10,
    });
  }
  console.log(`✓ ${testimonials.length} testimonials`);

  console.log("\nDone.");
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
