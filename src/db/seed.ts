import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with ALL previous data...");

  // Admin
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: { password: hashedPassword },
    create: { username: "admin", password: hashedPassword },
  });

  // Page Content
  const contents = [
    // Home Page
    { page: "home", section: "hero", key: "title", value: "Engineering the Next Generation of Business Technology", type: "text" },
    { page: "home", section: "hero", key: "subtitle", value: "Innovate · Build · Elevate. We build smart digital solutions for modern associations and growing businesses.", type: "text" },
    { page: "home", section: "vision_mission", key: "vision", value: "To become India's most trusted technology partner for associations by delivering innovative, scalable, and user-friendly digital solutions.", type: "text" },
    { page: "home", section: "vision_mission", key: "mission", value: "To empower associations with modern technology that simplifies operations, strengthens member engagement, and accelerates digital growth.", type: "text" },
    { page: "home", section: "vision_mission", key: "why_list", value: "Association-Focused Expertise,Cloud-Based Solutions,Mobile & Web Platform,Secure & Scalable Architecture,Dedicated Technical Support,Customized Development", type: "text" },
    { page: "home", section: "cta", key: "title", value: "Let's build something remarkable together.", type: "text" },
    { page: "home", section: "cta", key: "description", value: "Whether you're modernising legacy systems or launching something brand new — our team is ready to help you plan, build and grow.", type: "text" },
    
    // About Page
    { page: "about", section: "header", key: "title", value: "The team behind smart technology", type: "text" },
    { page: "about", section: "header", key: "kicker", value: "About NextGen Mahatech", type: "text" },
    { page: "about", section: "header", key: "subtitle", value: "A modern IT partner built on engineering excellence, honest advice and a genuine commitment to your business outcomes.", type: "text" },
    { page: "about", section: "about", key: "title", value: "About NextGen MahaTech", type: "text" },
    { page: "about", section: "about", key: "description", value: "NextGen MahaTech is a technology-driven software company specializing in Association Management Systems. We help associations and organizations streamline their operations through smart mobile applications, powerful admin dashboards, and cloud-based digital solutions.", type: "text" },
    
    // AMS Product
    { page: "ams", section: "hero", key: "title", value: "Association Management Solution", type: "text" },
    { page: "ams", section: "hero", key: "description", value: "One platform for complete association management. From members and events to communications, renewals, vendors and reports — everything streamlined in one secure and intelligent system.", type: "text" },
    
    // Contact Page
    { page: "contact", section: "info", key: "address", value: "Shree Ganesh Park, Near Patil Park, Nashik – 422010, Maharashtra, India", type: "text" },
    { page: "contact", section: "info", key: "phone", value: "+91 95794 95373", type: "text" },
    { page: "contact", section: "info", key: "email", value: "nextgenmahatech@gmail.com", type: "text" },
    { page: "contact", section: "info", key: "hours", value: "Mon – Sat: 9:30 AM – 7:00 PM\nSunday: Closed", type: "text" },

    // Industries Page
    { page: "industries", section: "header", key: "kicker", value: "Industries we serve", type: "text" },
    { page: "industries", section: "header", key: "title", value: "Domain expertise across", type: "text" },
    { page: "industries", section: "header", key: "highlight", value: "every vertical", type: "text" },
    { page: "industries", section: "header", key: "subtitle", value: "We combine technical skill with deep sector knowledge to deliver solutions that fit the way your industry operates.", type: "text" },
  ];

  for (const c of contents) {
    await prisma.pageContent.upsert({
      where: { id: `seed-${c.page}-${c.section}-${c.key}` },
      update: c,
      create: { id: `seed-${c.page}-${c.section}-${c.key}`, ...c },
    });
  }

  // Services
  const services = [
    { slug: "custom-software-development", title: "Custom Software Development", tagline: "Tailor-made systems", description: "Tailor-made web, desktop and SaaS applications engineered to fit the way your business actually works.", icon: "code", sortOrder: 1 },
    { slug: "website-design-development", title: "Website Design & Development", tagline: "Websites that convert", description: "High-performing corporate sites, e-commerce and web platforms with modern UX and rock-solid SEO foundations.", icon: "monitor", sortOrder: 2 },
    { slug: "mobile-app-development", title: "Mobile App Development", tagline: "Native & cross-platform", description: "Native and cross-platform iOS & Android apps built for scale, performance and delightful user experiences.", icon: "phone", sortOrder: 3 },
    { slug: "cloud-devops", title: "Cloud & DevOps", tagline: "AWS · Azure · GCP", description: "Migration, architecture and CI/CD on AWS, Azure & GCP.", icon: "cloud", sortOrder: 4 },
    { slug: "erp-crm-systems", title: "ERP, CRM & Business Systems", tagline: "Run leaner", description: "Streamline sales, HR, inventory and finance with integrated ERP, CRM and workflow automation solutions.", icon: "grid", sortOrder: 5 },
    { slug: "it-support-amc", title: "IT Support & AMC", tagline: "Always-on support", description: "Reliable on-site and remote IT support, annual maintenance contracts and managed services that keep you running.", icon: "wrench", sortOrder: 6 },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // Team Members
  const team = [
    { name: "Rohit Pawar", role: "Founder & Director", bio: "Rohit Pawar is the Director of NextGen Mahatech, focused on driving business growth through innovation, technology, and strategic partnerships.", image: "/Rohit_Pawar.png", sortOrder: 1 },
    { name: "Kailash Wagh", role: "Founder & Director", bio: "As the Founder and Director of NextGen Maha Tech, I am excited to build next-generation, technology-driven solutions.", image: "/Kailash.png", sortOrder: 2 },
  ];

  for (const t of team) {
    await prisma.teamMember.upsert({
        where: { id: `seed-team-${t.name.replace(/\s+/g, '-').toLowerCase()}` },
        update: t,
        create: { id: `seed-team-${t.name.replace(/\s+/g, '-').toLowerCase()}`, ...t },
    });
  }

  // Portfolio
  const portfolio = [
    { 
      title: "Building a smarter association ecosystem", 
      client: "Nashik Industries & Manufacturers Association", 
      category: "Association Management", 
      description: "From manual workflows to a digital-first association.", 
      content: "<p>NextGen Mahatech proudly partnered with NIMA to develop a comprehensive Association Management System that streamlined operations, improved member engagement, and digitized day-to-day association activities.</p>", 
      sortOrder: 1 
    },
  ];

  for (const p of portfolio) {
    await prisma.portfolio.upsert({
        where: { id: `seed-port-${p.client.replace(/\s+/g, '-').toLowerCase()}` },
        update: p,
        create: { id: `seed-port-${p.client.replace(/\s+/g, '-').toLowerCase()}`, ...p },
    });
  }

  // Testimonials
  const testimonials = [
    { client: "Rahul Deshmukh", role: "Operations Director, Manufacturing SME", quote: "NextGen Mahatech rebuilt our order-management platform from scratch. Delivery was on-time, communication was excellent, and our operations run 40% faster today.", rating: 5 },
    { client: "Sneha Patil", role: "CEO, Retail Chain (Nashik)", quote: "Their team designed and deployed our entire IT and network infrastructure across three branches. Truly a one-stop technology partner.", rating: 5 },
    { client: "Amit Joshi", role: "Founder, Logistics Startup", quote: "From ERP customisation to ongoing AMC support, they handle it all. Response times are quick and the engineers actually understand our business.", rating: 5 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
        where: { id: `seed-test-${t.client.replace(/\s+/g, '-').toLowerCase()}` },
        update: t,
        create: { id: `seed-test-${t.client.replace(/\s+/g, '-').toLowerCase()}`, ...t },
    });
  }

  // AMS Features
  const amsFeatures = [
    { title: "Member Management", description: "Add, manage & connect members effortlessly with detailed profiles.", icon: "users", tone: "from-indigo-500 to-blue-600", sortOrder: 1 },
    { title: "Vendor Management", description: "Onboard vendors, manage categories & approvals in one place.", icon: "shop", tone: "from-rose-500 to-red-600", sortOrder: 2 },
    { title: "Events Management", description: "Create, manage & promote events with easy registration.", icon: "calendar", tone: "from-sky-500 to-blue-600", sortOrder: 3 },
    { title: "Renewals Management", description: "Track renewals, send reminders & manage payments seamlessly.", icon: "renew", tone: "from-emerald-500 to-teal-600", sortOrder: 4 },
    { title: "News & Notices", description: "Publish updates, announcements & important notices instantly.", icon: "megaphone", tone: "from-rose-500 to-pink-600", sortOrder: 5 },
    { title: "Committee Management", description: "Manage committee members, designations & responsibilities.", icon: "committee", tone: "from-cyan-500 to-blue-600", sortOrder: 6 },
    { title: "Certification & Verification", description: "Verify & certify vendors and members with digital certificates.", icon: "badge", tone: "from-amber-500 to-orange-600", sortOrder: 7 },
    { title: "Push Notifications", description: "Send targeted notifications & alerts in real-time.", icon: "bell", tone: "from-pink-500 to-rose-600", sortOrder: 8 },
    { title: "Gallery Management", description: "Upload & manage event photos and association albums.", icon: "image", tone: "from-teal-500 to-cyan-600", sortOrder: 9 },
    { title: "Reports & Analytics", description: "Get real-time reports & insights for better decision making.", icon: "chart", tone: "from-blue-500 to-indigo-600", sortOrder: 10 },
    { title: "System Management", description: "Manage roles, permissions & application settings securely.", icon: "settings", tone: "from-emerald-500 to-green-600", sortOrder: 11 },
    { title: "Data Export", description: "Export data & reports in multiple formats (PDF, Excel, CSV).", icon: "database", tone: "from-rose-500 to-fuchsia-600", sortOrder: 12 },
  ];

  for (const f of amsFeatures) {
    await prisma.aMSFeature.upsert({
        where: { id: `seed-ams-${f.title.replace(/\s+/g, '-').toLowerCase()}` },
        update: f,
        create: { id: `seed-ams-${f.title.replace(/\s+/g, '-').toLowerCase()}`, ...f },
    });
  }

  console.log("Seeding completed.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
