"use client";

import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";

const steps = [
  { n: "01", t: "Discover", d: "Workshops, audits and scoping to define goals and constraints." },
  { n: "02", t: "Design", d: "Architecture, UX and system design into a buildable blueprint." },
  { n: "03", t: "Develop", d: "Agile sprints with transparent progress and regular demos." },
  { n: "04", t: "Deploy", d: "Secure rollout with CI/CD, monitoring and go-live support." },
  { n: "05", t: "Support", d: "Long-term maintenance, AMC and continuous improvement." },
];

export default function ServicesProcess() {
  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            How we deliver
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            A reliable 5-step engagement model
          </h2>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5" style={{ perspective: 1200 }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="rounded-2xl bg-white border border-slate-200/70 p-6 text-center hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 60, rotateY: i % 2 ? 30 : -30, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-2xl font-bold text-white flex items-center justify-center shadow-lg">
                {s.n}
              </div>
              <h3 className="mt-4 font-bold text-slate-900">{s.t}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
