// Home page — Next.js App Router Server Component.
// Interactive sections opt into client rendering via "use client".

import Hero from "../components/Hero";
// import TrustBar from "../components/TrustBar";
import AMSHighlight from "../components/AMSHighlight";
import About from "../components/About";
import VisionMission from "../components/VisionMission";
import Services from "../components/Services";
import Process from "../components/Process";
import Industries from "../components/Industries";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
// import Contact from "../components/Contact";

export const metadata = {
  title: "NextGen MahaTech — Association Management Solution & IT Services",
  description:
    "Innovate. Build. Elevate. NextGen MahaTech builds smart digital solutions for modern associations — Association Management Solution, software development, cloud, and IT support from Nashik, Maharashtra.",
};

import AboutTeam from "../components/about/Team";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AMSHighlight />
      <About />
      <AboutTeam />
      <VisionMission />
      <Services />
      <Process />
      <Industries />
      <Testimonials />
      <CTA />
     
    </main>
  );
}
