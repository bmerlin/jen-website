import { defineField, defineType } from "sanity";

export const site = defineType({
  name: "site",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Your name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      title: "Eyebrow / role title",
      description: "Shown above your name in the hero (e.g., 'Pharmaceutical Sales Representative').",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Hero tagline",
      description: "The big serif sentence under your name.",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "pivotStatement",
      title: "Pivot statement (pull quote)",
      description: "The italicized quote at the top of the Story section.",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Story paragraph",
      description: "The paragraph after the pull quote — the 'why pharma' explanation.",
      type: "text",
      rows: 6,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (R) => R.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone (optional)",
      type: "string",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL (optional)",
      type: "url",
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume PDF URL (optional)",
      description: "Public URL to a downloadable resume PDF.",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title" },
  },
});
