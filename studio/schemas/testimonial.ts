import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      description: "Person's name (and title/company if appropriate).",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "relationship",
      title: "Relationship (optional)",
      description: "e.g., 'Former manager', 'Physician collaborator', 'District Manager'.",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "attribution", subtitle: "quote" },
  },
});
