// Shared, plain TypeScript types used across the Next.js app (server + client).

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  icon: string | null;
  image?: string | null;
  active?: boolean;
  sortOrder?: number;
};

export type TestimonialItem = {
  id: string;
  client: string;
  role: string | null;
  quote: string;
  rating: number;
  image?: string | null;
  active?: boolean;
};

export type EnquiryInput = {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
};

export type ApiResponse<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };
