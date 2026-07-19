export type RiskBand = "Very Low" | "Low" | "Moderate" | "High" | "Very High" | "Critical";
export type RiskTrend = "Improving" | "Stable" | "Deteriorating" | "Rapidly deteriorating";

export type Borrower = {
  id: string;
  name: string;
  customerId: string;
  branch: string;
  region: string;
  industry: string;
  product: string;
  exposure: string;
  pd: number;
  previousPd: number;
  band: RiskBand;
  trend: RiskTrend;
  alerts: number;
  dpd: number;
  officer: string;
  assessed: string;
  driver: string;
};

export type EarlyWarning = {
  id: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  title: string;
  borrower: string;
  time: string;
  source: string;
  impact: string;
  status: "New" | "Under review" | "Action assigned";
};

export const riskBandConfig: Array<{ label: RiskBand; range: string; color: string }> = [
  { label: "Very Low", range: "< 2%", color: "#187a5a" },
  { label: "Low", range: "2–5%", color: "#3b9b75" },
  { label: "Moderate", range: "5–10%", color: "#d39b2f" },
  { label: "High", range: "10–20%", color: "#e4773a" },
  { label: "Very High", range: "20–35%", color: "#d44a3a" },
  { label: "Critical", range: "35%+", color: "#9c2533" },
];

export const borrowers: Borrower[] = [
  { id: "arvind-precision", name: "Arvind Precision Components", customerId: "CIF 0048217", branch: "Pune Camp", region: "West", industry: "Auto components", product: "Working capital", exposure: "₹18.4 Cr", pd: 0.238, previousPd: 0.174, band: "Very High", trend: "Deteriorating", alerts: 4, dpd: 12, officer: "R. Kulkarni", assessed: "18 Jul 2026", driver: "Operating cash flow down 27%" },
  { id: "sri-lakshmi-foods", name: "Sri Lakshmi Foods", customerId: "CIF 0019384", branch: "Hyderabad Main", region: "South", industry: "Food processing", product: "Cash credit", exposure: "₹9.8 Cr", pd: 0.184, previousPd: 0.141, band: "High", trend: "Deteriorating", alerts: 3, dpd: 7, officer: "P. Reddy", assessed: "17 Jul 2026", driver: "GST turnover down 3 months" },
  { id: "narmada-textiles", name: "Narmada Textiles Pvt Ltd", customerId: "CIF 0036721", branch: "Surat Ring Road", region: "West", industry: "Textiles", product: "Term loan", exposure: "₹14.2 Cr", pd: 0.121, previousPd: 0.126, band: "High", trend: "Improving", alerts: 1, dpd: 0, officer: "A. Shah", assessed: "15 Jul 2026", driver: "Receivable days remain elevated" },
  { id: "mehta-engineering", name: "Mehta Engineering Works", customerId: "CIF 0072490", branch: "Ahmedabad SG Road", region: "West", industry: "Engineering", product: "Equipment finance", exposure: "₹6.7 Cr", pd: 0.086, previousPd: 0.079, band: "Moderate", trend: "Stable", alerts: 1, dpd: 0, officer: "N. Joshi", assessed: "14 Jul 2026", driver: "Working-capital utilization 88%" },
  { id: "bluewave-logistics", name: "Bluewave Logistics LLP", customerId: "CIF 0051182", branch: "Chennai Anna Nagar", region: "Logistics", industry: "Transport", product: "Commercial vehicle", exposure: "₹11.6 Cr", pd: 0.064, previousPd: 0.071, band: "Moderate", trend: "Improving", alerts: 0, dpd: 0, officer: "S. Iyer", assessed: "12 Jul 2026", driver: "Debt service coverage improved" },
  { id: "kaveri-pharma", name: "Kaveri Pharma Distributors", customerId: "CIF 0064108", branch: "Bengaluru Indiranagar", region: "South", industry: "Pharmaceuticals", product: "Overdraft", exposure: "₹4.2 Cr", pd: 0.041, previousPd: 0.044, band: "Low", trend: "Stable", alerts: 0, dpd: 0, officer: "M. Rao", assessed: "10 Jul 2026", driver: "Stable account conduct" },
  { id: "eastline-packaging", name: "Eastline Packaging", customerId: "CIF 0028817", branch: "Kolkata Park Street", region: "East", industry: "Packaging", product: "Working capital", exposure: "₹7.3 Cr", pd: 0.029, previousPd: 0.034, band: "Low", trend: "Improving", alerts: 0, dpd: 0, officer: "T. Banerjee", assessed: "09 Jul 2026", driver: "Collections improved 18%" },
];

export const earlyWarnings: EarlyWarning[] = [
  { id: "ew-1049", severity: "Critical", title: "Two EMI payments delayed", borrower: "Arvind Precision Components", time: "18 min ago", source: "Core banking", impact: "+4.8 pp PD impact", status: "New" },
  { id: "ew-1048", severity: "High", title: "GST turnover declined for 3 months", borrower: "Sri Lakshmi Foods", time: "42 min ago", source: "GST network", impact: "+3.1 pp PD impact", status: "Under review" },
  { id: "ew-1047", severity: "High", title: "Utilization above 94% for 30 days", borrower: "Arvind Precision Components", time: "2 hrs ago", source: "Core banking", impact: "+2.6 pp PD impact", status: "Action assigned" },
  { id: "ew-1046", severity: "Medium", title: "Auditor qualification detected", borrower: "Narmada Textiles Pvt Ltd", time: "4 hrs ago", source: "Auditor report", impact: "+1.8 pp PD impact", status: "Under review" },
  { id: "ew-1045", severity: "Medium", title: "Receivable days increased to 94", borrower: "Mehta Engineering Works", time: "Yesterday", source: "Financial evidence", impact: "+1.2 pp PD impact", status: "Action assigned" },
];

export const pdTrend = [7.2, 7.6, 7.4, 8.1, 8.6, 8.4, 8.9];

export const migrationMatrix = [
  ["—", "18", "7", "2", "0"],
  ["11", "126", "24", "4", "1"],
  ["2", "19", "381", "42", "6"],
  ["0", "3", "28", "92", "18"],
  ["0", "0", "4", "21", "36"],
];

export const navGroups = [
  {
    label: "Risk operations",
    items: [
      { label: "Overview", href: "/app/overview", icon: "grid" },
      { label: "MSME Portfolio", href: "/app/portfolio", icon: "building" },
      { label: "Early Warning", href: "/app/early-warning", icon: "pulse", badge: "12" },
      { label: "Risk Assessments", href: "/app/risk-assessments", icon: "shield" },
      { label: "Loan Accounts", href: "/app/loans", icon: "card" },
    ],
  },
  {
    label: "Evidence & action",
    items: [
      { label: "Documents", href: "/app/documents", icon: "file" },
      { label: "Cases & Actions", href: "/app/cases", icon: "case", badge: "8" },
      { label: "Reports", href: "/app/reports", icon: "chart" },
    ],
  },
  {
    label: "Control plane",
    items: [
      { label: "Model Governance", href: "/app/model-governance", icon: "sliders" },
      { label: "Data Sources", href: "/app/data-sources", icon: "database" },
      { label: "Administration", href: "/app/administration", icon: "users" },
    ],
  },
] as const;
