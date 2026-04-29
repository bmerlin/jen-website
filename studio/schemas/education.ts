import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "credential",
      title: "Credential",
      description: "e.g., 'Bachelor of Science', 'Master's Certificate'.",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "field",
      title: "Field / focus (optional)",
      description: "e.g., 'Health Science, Minor in Biology'.",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start date (optional)",
      description: "Format: YYYY or YYYY-MM.",
      type: "string",
    }),
    defineField({
      name: "endDate",
      title: "End / expected date (optional)",
      description: "Format: YYYY or YYYY-MM.",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "In progress", value: "in-progress" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
    }),
  ],
  preview: {
    select: { title: "credential", subtitle: "institution" },
  },
});
