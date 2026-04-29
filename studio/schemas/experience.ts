import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "role",
      title: "Role title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "City, ST",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      description: "Format: YYYY-MM (e.g., 2021-06).",
      type: "string",
      validation: (R) => R.required().regex(/^\d{4}(-\d{2})?(-\d{2})?$/),
    }),
    defineField({
      name: "endDate",
      title: "End date (leave blank if current)",
      description: "Format: YYYY-MM (e.g., 2022-05). Leave blank for current role.",
      type: "string",
      validation: (R) => R.regex(/^\d{4}(-\d{2})?(-\d{2})?$/).custom((v) => v !== ""),
    }),
    defineField({
      name: "summary",
      title: "Role summary",
      description: "One sentence describing the role overall.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      description: "Bullet points under the role. Each one is one bullet.",
      type: "array",
      of: [{ type: "string" }],
      validation: (R) => R.min(1),
    }),
  ],
  preview: {
    select: { title: "company", subtitle: "role" },
  },
});
