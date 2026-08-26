"use client";

import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";

export default function AboutStory() {
  const stats = [
    { n: "150+", l: "Projects delivered" },
    { n: "50+", l: "Active clients" },
    { n: "10+", l: "Years combined expertise" },
    { n: "98%", l: "Client retention" },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal3D className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
              Who we are
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              From Nashik, serving{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                businesses everywhere
              </span>
            </h2>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed">
              NextGen Mahatech started with a simple belief: technology should
              be an enabler, not an obstacle. What began as a team of engineers
              building software for local businesses in Nashik has grown into a
              full-service IT company helping SMEs and enterprises across India
              automate, secure and scale.
            </p>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Today we bring together developers, designers, cloud architects
              and security specialists under one roof — giving our clients the
              reliability of a single accountable partner and the depth of a
              multi-disciplinary team.





            </p>
  
          </Reveal3D>

          <Reveal3D delay={0.15} className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4" style={{ perspective: 1200 }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  className="rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-8 shadow-sm"
                  initial={{ opacity: 0, y: 40, rotateX: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-br from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    {s.n}
                  </div>
                  <div className="mt-2 text-slate-500 text-sm">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </Reveal3D>
        </div>
      </div>
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
    <div>
      <p>
        
        </p>

    
      </div>
      
    </section>
  );
}
