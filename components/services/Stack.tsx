"use client";

import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";

const stack = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Python",
];

export default function ServicesStack() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Our technology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Modern tools,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              proven in production
            </span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg">
            We build with a modern, battle-tested stack — so your product stays
            maintainable, secure and scalable.
          </p>
        </Reveal3D>

        <div className="flex flex-wrap justify-center gap-4" style={{ perspective: 1000 }}>
          {stack.map((t, i) => (
            <motion.span
              key={t}
              className="px-6 py-3 rounded-full border border-slate-200 bg-slate-50 font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              initial={{ opacity: 0, rotateX: 60, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
