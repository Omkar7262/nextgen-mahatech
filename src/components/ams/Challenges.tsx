"use client";

import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";
import { amsChallenges, amsIcons } from "../../lib/ams-data";

export default function AMSChallenges() {
  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Why associations need it
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Digital transformation is no longer{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              an option — it's a necessity
            </span>
          </h2>
        </Reveal3D>

        <h3 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-500 mb-8">
          Challenges Associations Face Without Digital Solutions
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 1200 }}>
          {amsChallenges.map((c, i) => (
            <motion.div
              key={c.t}
              className="rounded-2xl bg-white border border-slate-200/70 p-6 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50, rotateX: 20, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <div className="h-11 w-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  {amsIcons[c.icon]}
                </svg>
              </div>
              <h4 className="mt-4 font-bold text-slate-900">{c.t}</h4>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
