import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "jen-website",
  title: "Jen Brewster — Website",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: there's only one Site doc.
            S.listItem()
              .title("Site settings")
              .id("site")
              .child(
                S.document().schemaType("site").documentId("site").title("Site settings")
              ),
            S.divider(),
            S.documentTypeListItem("metric").title("Metrics"),
            S.documentTypeListItem("experience").title("Experience"),
            S.documentTypeListItem("education").title("Education"),
            S.documentTypeListItem("skillGroup").title("Skill groups"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Hide the "Site" type from the global "create new" menu — singleton only.
    templates: (templates) => templates.filter((t) => t.schemaType !== "site"),
  },

  document: {
    // Disable "Duplicate" and "Delete" actions on the Site singleton.
    actions: (input, context) =>
      context.schemaType === "site"
        ? input.filter(
            ({ action }) => action !== "duplicate" && action !== "delete"
          )
        : input,
  },
});
