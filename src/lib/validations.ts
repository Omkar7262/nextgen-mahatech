import { z } from "zod";

export const ServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens"),
  tagline: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon: z.string().min(1, "Please select an icon"),
  image: z.string().optional(),
  sortOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const TestimonialSchema = z.object({
  client: z.string().min(2, "Client name is required"),
  role: z.string().optional(),
  quote: z.string().min(5, "Quote must be at least 5 characters"),
  rating: z.number().min(1).max(5),
  image: z.string().optional(),
  active: z.boolean().default(true),
});

export const TeamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  image: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  sortOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const PortfolioSchema = z.object({
  title: z.string().min(5, "Title is required"),
  client: z.string().min(2, "Client name is required"),
  category: z.string().optional(),
  description: z.string().min(10, "Description is required"),
  image: z.string().optional(),
  content: z.string().optional(),
  sortOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const PageContentSchema = z.object({
  page: z.string().min(2, "Page name is required"),
  section: z.string().min(2, "Section name is required"),
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
  type: z.enum(["text", "html", "image"]).default("text"),
});

export const AMSFeatureSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  tone: z.string().min(1, "Tone is required"),
  sortOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});
