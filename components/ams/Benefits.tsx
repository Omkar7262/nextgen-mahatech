"use client";

import { motion } from "motion/react";
import { Reveal3D, Tilt } from "../../lib/anim";
import { amsBenefits } from "../../lib/ams-data";

export default function AMSBenefits() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            How our AMS helps
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Turn every association challenge into{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              a growth opportunity
            </span>
          </h2>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1400 }}>
          {amsBenefits.map((b, i) => (
            <motion.div
              key={b.t}
              initial={{ opacity: 0, y: 60, rotateY: i % 2 ? 20 : -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <Tilt max={10} className="h-full">
                <div className={`h-full rounded-2xl bg-gradient-to-br ${b.tone} p-8 text-white shadow-2xl shadow-indigo-500/10`}>
                  <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h4 className="mt-5 font-bold text-lg">{b.t}</h4>
                  <p className="mt-2 text-sm text-white/90 leading-relaxed">{b.d}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
