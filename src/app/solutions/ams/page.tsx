import type { Metadata } from "next";
import AMSHero from "../../../components/ams/Hero";
import AMSMetrics from "../../../components/ams/Metrics";
import AMSChallenges from "../../../components/ams/Challenges";
import AMSBenefits from "../../../components/ams/Benefits";
import AMSFeatures from "../../../components/ams/Features";
import AMSWhy from "../../../components/ams/Why";
import AMSSlogan from "../../../components/ams/Slogan";
import CTA from "../../../components/CTA";

export const metadata: Metadata = {
  title: "Association Management Solution",
  description:
    "NextGen MahaTech's Association Management Solution — one platform for members, events, renewals, vendors, communications and reports. Innovate. Build. Elevate.",
};

export default function AMSPageRoute() {
  return (
    <main>
      <AMSHero />
      <AMSMetrics />
      <AMSChallenges />
      <AMSBenefits />
      <AMSFeatures />
      <AMSWhy />
      <AMSSlogan />
      <CTA />
    </main>
  );
}
