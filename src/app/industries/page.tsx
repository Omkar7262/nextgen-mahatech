"use client";

import { useEffect, useState } from "react";
import PageBanner from "../../components/PageBanner";
import Industries from "../../components/Industries";
import IndustriesWhy from "../../components/industries/Why";

export default function IndustriesPage() {
  const [content, setContent] = useState<any>({
    kicker: "Industries we serve",
    title: "Domain expertise across",
    highlight: "every vertical",
    subtitle: "We combine technical skill with deep sector knowledge to deliver solutions that fit the way your industry operates.",
  });

  useEffect(() => {
    fetch("/api/content/industries")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.header) {
          setContent({
            kicker: data.data.header.kicker || content.kicker,
            title: data.data.header.title || content.title,
            highlight: data.data.header.highlight || content.highlight,
            subtitle: data.data.header.subtitle || content.subtitle,
          });
        }
      });
  }, []);

  return (
    <>
      <PageBanner
        kicker={content.kicker}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
      />
      <Industries />
      <IndustriesWhy />
    </>
  );
}
