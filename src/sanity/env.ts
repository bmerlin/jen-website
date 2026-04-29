// Sanity connection settings. Project ID comes from sanity.io/manage after
// project creation. Dataset is "production" by convention.
//
// Set these in `.env.local` (gitignored) for local builds, and in Cloudflare's
// Worker env vars for production builds.

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing env var NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  "Missing env var NEXT_PUBLIC_SANITY_DATASET"
);

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-28";

function assertValue<T>(v: T | undefined, message: string): T {
  if (v === undefined || v === "") {
    throw new Error(message);
  }
  return v;
}
