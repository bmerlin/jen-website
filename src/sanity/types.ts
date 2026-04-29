// Hand-written TS types that mirror the GROQ projections in queries.ts. Keep
// these in sync with both the queries and the Sanity schemas.

export type SiteConfig = {
  name: string;
  title: string;
  tagline: string;
  pivotStatement: string;
  description: string;
  location: string;
  email: string;
  phone?: string;
  linkedin?: string;
  resumeUrl?: string;
};

export type Metric = {
  _id: string;
  value: string;
  label: string;
  context?: string;
};

export type Experience = {
  _id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights: string[];
};

export type Education = {
  _id: string;
  institution: string;
  credential: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  status?: "completed" | "in-progress";
};

export type SkillGroup = {
  _id: string;
  category: string;
  items: string[];
};

export type Testimonial = {
  _id: string;
  quote: string;
  attribution: string;
  relationship?: string;
};
