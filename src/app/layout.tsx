import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NextGen Mahatech — Smart Technology. Reliable Solutions. Business Growth.",
    template: "%s · NextGen Mahatech",
  },
  description:
    "NextGen Mahatech is a Nashik-based IT solutions company delivering software development, cloud, cybersecurity, ERP, web & mobile apps for growing businesses.",
  keywords: [
    "IT solutions Nashik",
    "software development",
    "web development",
    "mobile apps",
    "cloud",
    "cybersecurity",
    "ERP CRM",
  ],
  openGraph: {
    title: "NextGen Mahatech",
    description: "Smart Technology. Reliable Solutions. Business Growth.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
