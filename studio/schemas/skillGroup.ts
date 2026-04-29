import { defineField, defineType } from "sanity";

export const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill group",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category name",
      description: "e.g., 'Sales & Relationship Building'.",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "items",
      title: "Skills in this group",
      type: "array",
      of: [{ type: "string" }],
      validation: (R) => R.min(1),
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
    select: { title: "category", items: "items" },
    prepare({ title, items }) {
      const itemsArray = items as string[] | undefined;
      return {
        title: title as string,
        subtitle: itemsArray?.join(" · "),
      };
    },
  },
});
