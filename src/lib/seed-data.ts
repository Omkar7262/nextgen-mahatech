// Curated fallback data used by route handlers when the live PostgreSQL
// database is not reachable (e.g. the static preview environment).

export const services = [
  {
    id: "svc-custom-software",
    slug: "custom-software-development",
    title: "Custom Software Development",
    tagline: "Tailor-made systems",
    description:
      "Tailor-made web, desktop and SaaS applications engineered to fit the way your business actually works.",
    icon: "code",
    active: true,
    sortOrder: 1,
  },
  {
    id: "svc-web",
    slug: "website-design-development",
    title: "Website Design & Development",
    tagline: "Websites that convert",
    description:
      "High-performing corporate sites, e-commerce and web platforms with modern UX and rock-solid SEO foundations.",
    icon: "monitor",
    active: true,
    sortOrder: 2,
  },
  {
    id: "svc-mobile",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Native & cross-platform",
    description:
      "Native and cross-platform iOS & Android apps built for scale, performance and delightful user experiences.",
    icon: "phone",
    active: true,
    sortOrder: 3,
  },
  // {
  //   id: "svc-cloud",
  //   slug: "cloud-devops",
  //   title: "Cloud & DevOps",
  //   tagline: "AWS · Azure · GCP",
  //   description:
  //     "Cloud migration, architecture and CI/CD automation on AWS, Azure & GCP — reliable, secure and cost-optimised.",
  //   icon: "cloud",
  //   active: true,
  //   sortOrder: 4,
  // },
  // {
  //   id: "svc-security",
  //   slug: "cybersecurity-networking",
  //   title: "Cybersecurity & Networking",
  //   tagline: "Protect and connect",
  //   description:
  //     "End-to-end network design, firewall configuration, endpoint security and 24/7 threat monitoring for peace of mind.",
  //   icon: "shield",
  //   active: true,
  //   sortOrder: 5,
  // },
  {
    id: "svc-erp",
    slug: "erp-crm-systems",
    title: "ERP, CRM & Business Systems",
    tagline: "Run leaner",
    description:
      "Streamline sales, HR, inventory and finance with integrated ERP, CRM and workflow automation solutions.",
    icon: "grid",
    active: true,
    sortOrder: 6,
  },
  // {
  //   id: "svc-ai",
  //   slug: "ai-data-analytics",
  //   title: "AI, Data & Analytics",
  //   tagline: "Decisions from data",
  //   description:
  //     "Turn data into decisions with dashboards, machine learning pipelines and AI-powered automation tailored to your KPIs.",
  //   icon: "chart",
  //   active: true,
  //   sortOrder: 7,
  // },
  // {
  //   id: "svc-support",
  //   slug: "it-support-amc",
  //   title: "IT Support & AMC",
  //   tagline: "Always-on support",
  //   description:
  //     "Reliable on-site and remote IT support, annual maintenance contracts and managed services that keep you running.",
  //   icon: "wrench",
  //   active: true,
  //   sortOrder: 8,
  // },
];

export const testimonials = [
  {
    id: "t1",
    client: "Rahul Deshmukh",
    role: "Operations Director, Manufacturing SME",
    quote:
      "NextGen Mahatech rebuilt our order-management platform from scratch. Delivery was on-time, communication was excellent, and our operations run 40% faster today.",
    rating: 5,
  },
  {
    id: "t2",
    client: "Sneha Patil",
    role: "CEO, Retail Chain (Nashik)",
    quote:
      "Their team designed and deployed our entire IT and network infrastructure across three branches. Truly a one-stop technology partner.",
    rating: 5,
  },
  {
    id: "t3",
    client: "Amit Joshi",
    role: "Founder, Logistics Startup",
    quote:
      "From ERP customisation to ongoing AMC support, they handle it all. Response times are quick and the engineers actually understand our business.",
    rating: 5,
  },
];
