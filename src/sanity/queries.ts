import { groq } from "next-sanity";

import { sanityClient } from "./client";
import type {
  Education,
  Experience,
  Metric,
  SiteConfig,
  SkillGroup,
  Testimonial,
} from "./types";

const SITE_QUERY = groq`*[_type == "site"][0]{
  name, title, tagline, pivotStatement, description, location,
  email, phone, linkedin, resumeUrl
}`;

const METRICS_QUERY = groq`*[_type == "metric"] | order(order asc, _createdAt asc){
  _id, value, label, context
}`;

const EXPERIENCE_QUERY = groq`*[_type == "experience"] | order(startDate desc){
  _id, company, role, location, startDate, endDate, summary, highlights
}`;

const EDUCATION_QUERY = groq`*[_type == "education"] | order(coalesce(endDate, "9999") desc){
  _id, institution, credential, field, startDate, endDate, status
}`;

const SKILLS_QUERY = groq`*[_type == "skillGroup"] | order(order asc, _createdAt asc){
  _id, category, items
}`;

const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(order asc, _createdAt asc){
  _id, quote, attribution, relationship
}`;

export const getSite = () => sanityClient.fetch<SiteConfig>(SITE_QUERY);
export const getMetrics = () => sanityClient.fetch<Metric[]>(METRICS_QUERY);
export const getExperience = () => sanityClient.fetch<Experience[]>(EXPERIENCE_QUERY);
export const getEducation = () => sanityClient.fetch<Education[]>(EDUCATION_QUERY);
export const getSkills = () => sanityClient.fetch<SkillGroup[]>(SKILLS_QUERY);
export const getTestimonials = () => sanityClient.fetch<Testimonial[]>(TESTIMONIALS_QUERY);
