"use client";

import { motion } from "motion/react";

const stats = [
  { n: "2,438", l: "Total Members" },
  { n: "1,897", l: "Active Members" },
  { n: "24", l: "Events" },
  { n: "1,547 / 571 / 320", l: "Regular · Premium · Pending" },
];

export default function AMSMetrics() {
  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ perspective: 1200 }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-6 text-center"
              initial={{ opacity: 0, y: 40, rotateX: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                {s.n}
              </div>
              <div className="mt-1 text-xs md:text-sm text-slate-500">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
