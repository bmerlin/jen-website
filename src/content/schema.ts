// Content schemas. Flat and typed so the shape maps cleanly to a headless
// CMS (Sanity, Payload, Contentful) if we migrate later.

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
  value: string;
  label: string;
  context?: string;
};

export type Experience = {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights: string[];
};

export type Education = {
  institution: string;
  credential: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  status?: "completed" | "in-progress";
  honors?: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Testimonial = {
  quote: string;
  attribution: string;
  relationship?: string;
};
