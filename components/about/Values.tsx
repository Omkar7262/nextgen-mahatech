"use client";

import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";

const values = [
  {
    t: "Customer first",
    d: "Every architecture, demo and decision starts with the outcome you need.",
    icon: "user",
    tone: "from-indigo-500 to-blue-600",
  },
  {
    t: "Excellence",
    d: "We sweat the details — clean code, airtight security and polished UX.",
    icon: "spark",
    tone: "from-fuchsia-500 to-pink-600",
  },
  {
    t: "Transparency",
    d: "Clear timelines, honest estimates and open communication at every step.",
    icon: "eye",
    tone: "from-amber-500 to-orange-600",
  },
  {
    t: "Innovation",
    d: "We stay ahead of the curve so you don't have to — cloud, AI, automation.",
    icon: "bulb",
    tone: "from-emerald-500 to-teal-600",
  },
  {
    t: "Partnership",
    d: "We're invested in your growth, not just the project handover.",
    icon: "handshake",
    tone: "from-sky-500 to-cyan-600",
  },
  {
    t: "Reliability",
    d: "SLA-backed support and maintenance that keeps your business running.",
    icon: "shield",
    tone: "from-violet-500 to-purple-600",
  },
];

const icons: Record<string, React.ReactNode> = {
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  spark: <path d="M12 3l1.9 5.8L19 11l-5.1 2.2L12 19l-1.9-5.8L5 11l5.1-2.2z" />,
  eye: (
    <>
      <path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18 18 0 0 1 5.06-5.94" />
      <circle cx="12" cy="12" r="3" />
      <path d="M1 1l22 22" />
    </>
  ),
  bulb: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.7V17H8v-2.3A7 7 0 0 1 12 2z" />,
  handshake: <path d="M12 2a5 5 0 0 1 5 5c0 .9-.3 1.7-.7 2.4L22 16l-2 2-3-3-2 2 3 3 2-2 1 1-2 2h-5l-4-4-3 3L2 17l5-5-1.3-3.6A5 5 0 0 1 12 2z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};

export default function AboutValues() {
  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Our values
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            The principles behind{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              every engagement
            </span>
          </h2>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
          {values.map((v, i) => (
            <motion.div
              key={v.t}
              className="rounded-2xl bg-white border border-slate-200/70 p-8 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${v.tone} flex items-center justify-center shadow-lg`}>
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  {icons[v.icon]}
                </svg>
              </div>
              <h3 className="mt-5 font-bold text-slate-900 text-lg">{v.t}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
