"use client";

import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";
import { amsIcons, amsPillars, amsWhyChoose } from "../../lib/ams-data";

export default function AMSWhy() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal3D variant="slide3D">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
              Why Choose NextGen MahaTech?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              A partner built for{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                associations, not everyone
              </span>
            </h2>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {amsWhyChoose.map((w, i) => (
                <motion.li
                  key={w}
                  className="flex items-start gap-3 text-slate-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <span className="mt-0.5 shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-medium">{w}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal3D>

          <div className="grid grid-cols-2 gap-4" style={{ perspective: 1200 }}>
            {amsPillars.map((p, i) => (
              <motion.div
                key={p.t}
                className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-6 hover:shadow-xl transition"
                initial={{ opacity: 0, y: 40, rotateY: i % 2 ? 30 : -30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {amsIcons[p.icon]}
                  </svg>
                </div>
                <div className="mt-4 font-bold text-slate-900">{p.t}</div>
                <div className="mt-1 text-sm text-slate-600 leading-relaxed">{p.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
