"use client";

import { motion } from "motion/react";

const steps = [
  { n: "01", t: "Discover", d: "We listen. Deep-dive workshops help us understand your goals, users, and constraints before proposing anything." },
  { n: "02", t: "Design", d: "Architecture, UX and system design come together into a clear, buildable blueprint reviewed with your team." },
  { n: "03", t: "Develop", d: "Agile sprints, transparent progress, and continuous demos so you see value delivered every two weeks." },
  { n: "04", t: "Deploy & Support", d: "Secure rollout, training, and long-term managed support — so your solution keeps evolving with your business." },
];

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-96 w-[80%] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 text-indigo-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            How we work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            A proven 4-step delivery process
          </h2>
          <p className="mt-5 text-slate-300 text-lg">
            Structured enough to be predictable, agile enough to adapt — our
            engagement model is designed for outcomes, not hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative" style={{ perspective: 1400 }}>
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="relative"
              initial={{ opacity: 0, y: 80, rotateX: 40, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <motion.div
                className="relative h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-xl shadow-indigo-500/40 mb-6 ring-4 ring-white/5"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateX: [0, -12, 0], rotateY: [0, 10, 0], y: [0, -6, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-white font-bold">{s.n}</span>
              </motion.div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{s.t}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
