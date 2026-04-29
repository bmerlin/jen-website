import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

// Build-time read token — used only on the server during `next build`. The
// fetched data is embedded into the static HTML; the token never reaches the
// browser. Generate at sanity.io/manage → API → Tokens (Viewer role).
const token = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: "published",
});
