import type { Metric } from "./schema";

// Metrics translated from marketing/hospitality outcomes into the
// percentile-and-denominator format pharma hiring managers parse quickly.
export const metrics: Metric[] = [
  {
    value: "30%",
    label: "Sales growth driven",
    context: "Across multiple restaurant brands through full-funnel campaign work.",
  },
  {
    value: "$2M+",
    label: "Annual budget owned",
    context: "Allocated, deployed, and reported on for ROI across cross-functional teams.",
  },
  {
    value: "40%",
    label: "Digital engagement lift",
    context: "From integrated SEO, SEM, and CRM strategy.",
  },
  {
    value: "100+",
    label: "Large-scale events produced",
    context: "Driving customer acquisition, loyalty, and earned media.",
  },
  {
    value: "$25M",
    label: "Municipal assets managed",
    context: "Oversight of facility-backed marketing and tourism strategy in El Dorado, KS.",
  },
  {
    value: "10+",
    label: "Years leading commercial teams",
    context: "Marketing, sales, PR, and partnership functions across four organizations.",
  },
];
