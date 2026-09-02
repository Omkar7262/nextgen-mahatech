import type { Metadata } from "next";
import PageBanner from "../../components/PageBanner";
import Services from "../../components/Services";
import ServicesProcess from "../../components/services/Process";
import ServicesStack from "../../components/services/Stack";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end IT services from NextGen Mahatech: custom software, web & mobile apps, cloud & DevOps, cybersecurity, ERP/CRM, AI & analytics and IT support.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        kicker="What we do"
        title="IT services engineered for"
        highlight="business growth"
        subtitle="From strategy to support — one accountable partner for every layer of your technology stack."
      />
      <Services detailed />
      <ServicesProcess />
      <ServicesStack />
    </>
  );
}
