// Data extracted from the NextGen MahaTech Association Management Solution brochure.

export const amsChallenges = [
  { t: "Manual Processes", d: "Time-consuming paperwork and repetitive tasks lead to errors and inefficiencies.", icon: "file" },
  { t: "Scattered Information", d: "Member data, documents, and records stored in multiple places cause confusion and delays.", icon: "server" },
  { t: "Poor Member Engagement", d: "Limited communication and engagement lead to reduced member participation.", icon: "users" },
  { t: "Event Registration Challenges", d: "Complex registrations and poor tracking affect event success and member experience.", icon: "calendar" },
  { t: "Inefficient Communication", d: "Important updates don't reach members on time through the right channels.", icon: "mail" },
  { t: "Payment & Tracking Issues", d: "Difficult to track payments, renewals, and event registrations manually.", icon: "rupee" },
];

export const amsBenefits = [
  { t: "Streamlined Operations", d: "Automate tasks and save valuable time.", tone: "from-indigo-500 to-blue-600" },
  { t: "Better Member Engagement", d: "Keep members informed and involved.", tone: "from-fuchsia-500 to-pink-600" },
  { t: "Centralized Data Management", d: "Access all information in one secure place.", tone: "from-amber-500 to-orange-600" },
  { t: "Real-time Insights", d: "Make data-driven decisions with ease.", tone: "from-sky-500 to-cyan-600" },
  { t: "Effective Communication", d: "Reach the right people with the right message.", tone: "from-emerald-500 to-teal-600" },
  { t: "Smart Payments & Tracking", d: "Simplify transactions and track everything seamlessly.", tone: "from-violet-500 to-purple-600" },
];

export const amsFeatures = [
  { t: "Member Management", d: "Add, manage & connect members effortlessly with detailed profiles.", tone: "from-indigo-500 to-blue-600", icon: "users" },
  { t: "Vendor Management", d: "Onboard vendors, manage categories & approvals in one place.", tone: "from-rose-500 to-red-600", icon: "shop" },
  { t: "Events Management", d: "Create, manage & promote events with easy registration.", tone: "from-sky-500 to-blue-600", icon: "calendar" },
  { t: "Renewals Management", d: "Track renewals, send reminders & manage payments seamlessly.", tone: "from-emerald-500 to-teal-600", icon: "renew" },
  { t: "News & Notices", d: "Publish updates, announcements & important notices instantly.", tone: "from-rose-500 to-pink-600", icon: "megaphone" },
  { t: "Committee Management", d: "Manage committee members, designations & responsibilities.", tone: "from-cyan-500 to-blue-600", icon: "committee" },
  { t: "Certification & Verification", d: "Verify & certify vendors and members with digital certificates.", tone: "from-amber-500 to-orange-600", icon: "badge" },
  { t: "Push Notifications", d: "Send targeted notifications & alerts in real-time.", tone: "from-pink-500 to-rose-600", icon: "bell" },
  { t: "Gallery Management", d: "Upload & manage event photos and association albums.", tone: "from-teal-500 to-cyan-600", icon: "image" },
  { t: "Reports & Analytics", d: "Get real-time reports & insights for better decision making.", tone: "from-blue-500 to-indigo-600", icon: "chart" },
  { t: "System Management", d: "Manage roles, permissions & application settings securely.", tone: "from-emerald-500 to-green-600", icon: "settings" },
  { t: "Data Export", d: "Export data & reports in multiple formats (PDF, Excel, CSV).", tone: "from-rose-500 to-fuchsia-600", icon: "database" },
];

export const amsWhyChoose = [
  "Association-Focused Expertise",
  "Cloud-Based Solutions",
  "Mobile & Web Platform",
  "Secure & Scalable Architecture",
  "Dedicated Technical Support",
  "Customized Development",
];

export const amsPillars = [
  { t: "Experience", d: "Industry-focused software solutions", icon: "medal" },
  { t: "Platform", d: "Mobile + Cloud + Web + iOS", icon: "devices" },
  { t: "Support", d: "Dedicated Support whenever you need", icon: "headset" },
  { t: "Technology", d: "Modern, Secure & Scalable", icon: "shield" },
];

export const amsIcons: Record<string, React.ReactNode> = {
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
  server: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" /></>,
  rupee: <><path d="M6 3h12M6 8h12M14 21l-8-9h4a5 5 0 0 0 0-10" /></>,
  shop: <><path d="M3 3h18l-2 8H5L3 3z" /><path d="M5 11v10h14V11" /></>,
  renew: <><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>,
  megaphone: <><path d="M3 11l18-7v16L3 13z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>,
  committee: <><circle cx="9" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M15 21v-2a4 4 0 0 0-3-3.87" /></>,
  badge: <><circle cx="12" cy="8" r="6" /><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88" /></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>,
  chart: <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
  medal: <><circle cx="12" cy="15" r="6" /><path d="M8 9l-2-7h12l-2 7" /></>,
  devices: <><rect x="2" y="4" width="14" height="10" rx="2" /><rect x="16" y="8" width="6" height="12" rx="2" /><line x1="9" y1="18" x2="9" y2="18" /></>,
  headset: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z" /></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};
