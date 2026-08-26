"use client";

import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";

const milestones = [
  { year: "2018", t: "The beginning", d: "A small team of engineers starts building custom software for local Nashik businesses." },
  { year: "2020", t: "Going full-service", d: "We expand into web, mobile and cloud — becoming a one-stop technology partner." },
  { year: "2022", t: "Security & scale", d: "Cybersecurity, networking and managed services join the mix, along with enterprise clients." },
  { year: "2024", t: "AI & automation", d: "We add AI, data and analytics capabilities to help clients automate smarter." },
  { year: "Today", t: "150+ projects", d: "A trusted delivery team serving SMEs, startups and enterprises across India." },
];

export default function AboutTimeline() {
  return (
    <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="mx-auto max-w-5xl px-5 md:px-8 relative">
        <Reveal3D variant="slide3D" className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 text-indigo-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Our journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Milestones that shaped NextGen Mahatech
          </h2>
        </Reveal3D>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-400/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className={`relative flex md:justify-${i % 2 ? "start" : "end"} ${
                  i % 2 ? "md:pr-[50%] md:text-left" : "md:pl-[50%] md:text-left"
                } pl-8 md:pl-0 ml-8 md:ml-0`}
                initial={{ opacity: 0, x: i % 2 ? 60 : -60, rotateY: i % 2 ? -15 : 15, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 1000 }}
              >
                <div className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_12px_3px_rgba(103,232,249,0.6)]" />
                <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 backdrop-blur">
                  <div className="text-cyan-300 font-bold text-sm tracking-widest mb-1">{m.year}</div>
                  <h3 className="text-lg font-bold">{m.t}</h3>
                  <p className="mt-1 text-slate-300 text-sm leading-relaxed">{m.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
