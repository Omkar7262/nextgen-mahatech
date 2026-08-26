"use client";

import { motion } from "motion/react";

export default function TrustBar() {
  const items = [
    "Microsoft Azure",
    "AWS Cloud",
    "Google Cloud",
    "Oracle",
    "SAP",
    "Salesforce",
    "Cisco",
    "Fortinet",
  ];
  return (
    <section className="border-y border-slate-100 bg-white py-8">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
          Working with leading platforms & technologies
        </p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          style={{ perspective: 800 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {items.map((i) => (
            <motion.span
              key={i}
              className="text-slate-400 hover:text-indigo-600 transition-colors text-sm md:text-base font-semibold tracking-tight"
              variants={{
                hidden: { opacity: 0, rotateX: 60, y: 30 },
                visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.5 } },
              }}
            >
              {i}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
