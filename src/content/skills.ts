import type { SkillGroup } from "./schema";

// Skills organized to mirror what pharma hiring managers scan for.
export const skills: SkillGroup[] = [
  {
    category: "Sales & Relationship Building",
    items: [
      "Consultative selling",
      "Account & territory management",
      "Stakeholder & VIP relations",
      "Cross-functional team leadership",
    ],
  },
  {
    category: "Healthcare & Clinical Foundation",
    items: [
      "Health Science (BS)",
      "Biology coursework",
      "Licensed Addiction Counseling (in progress)",
      "Patient-centered communication",
    ],
  },
  {
    category: "Commercial Strategy",
    items: [
      "Brand positioning & storytelling",
      "Multi-channel campaign execution",
      "Budget ownership ($2M+) & ROI optimization",
      "Customer acquisition & retention",
    ],
  },
  {
    category: "Tools",
    items: [
      "Google Analytics & Workspace",
      "Meta Business Suite",
      "Salesforce-class CRM workflows",
      "Adobe Creative Suite",
    ],
  },
];
