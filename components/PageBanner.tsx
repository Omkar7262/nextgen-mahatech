"use client";

import { motion } from "motion/react";

export default function PageBanner({
  kicker,
  title,
  highlight,
  subtitle,
}: {
  kicker: string;
  title: string;
  highlight: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20 bg-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(99,102,241,0.4), transparent 45%), radial-gradient(circle at 85% 30%, rgba(56,189,248,0.25), transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <motion.div
          style={{ perspective: 1000 }}
          initial={{ opacity: 0, y: 60, rotateX: 25 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium text-indigo-200 mb-5">
            {kicker}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl">
            {title}{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
              {highlight}
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
