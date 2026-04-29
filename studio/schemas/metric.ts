import { defineField, defineType } from "sanity";

export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Headline value",
      description: "The big number — e.g., '30%', '$2M+', '100+'.",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      description: "Short caption — e.g., 'Sales growth driven'.",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "context",
      title: "Context (optional)",
      description: "One sentence of supporting detail.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
