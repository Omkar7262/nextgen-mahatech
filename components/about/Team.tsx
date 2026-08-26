"use client";

import { motion } from "motion/react";
import { Tilt, Reveal3D } from "../../lib/anim";

const team = [
  { name: "Arjun Sharma", role: "Founder & Delivery Head", initials: "AS", tone: "from-indigo-500 to-blue-600" },
  { name: "Priya Khanna", role: "Cloud & DevOps Lead", initials: "PK", tone: "from-fuchsia-500 to-pink-600" },
  { name: "Rohit Verma", role: "Full-Stack Architect", initials: "RV", tone: "from-amber-500 to-orange-600" },
  { name: "Sneha Iyer", role: "Product & UX Designer", initials: "SI", tone: "from-emerald-500 to-teal-600" },
];

export default function AboutTeam() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Leadership
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            The people who{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              get things done
            </span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg">
            A senior, hands-on team. Meet the leads who own your experience
            from first call to final handover.
          </p>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: 1200 }}>
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              className="h-full"
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Tilt max={12} className="h-full">
                <div className="group h-full rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-8 text-center hover:shadow-2xl hover:shadow-indigo-500/10 transition-all">
                  <div className={`mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br ${m.tone} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {m.initials}
                  </div>
                  <h3 className="mt-5 font-bold text-slate-900">{m.name}</h3>
                  <div className="mt-1 text-sm text-indigo-600 font-medium">{m.role}</div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
