// Content schemas. Keep fields flat and typed so the shape maps cleanly to a
// headless CMS (Sanity, Payload, Contentful) if we migrate later.

export type SiteConfig = {
  name: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  linkedin?: string;
  phone?: string;
};

export type Experience = {
  company: string;
  role: string;
  location?: string;
  startDate: string; // ISO "YYYY-MM" or "YYYY-MM-DD"
  endDate?: string; // omit for current role
  highlights: string[];
};

export type Education = {
  institution: string;
  credential: string;
  field?: string;
  startDate: string;
  endDate?: string;
  honors?: string[];
};

export type Skill = {
  category: string;
  items: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  issuedDate: string;
  expiresDate?: string;
  credentialUrl?: string;
};
