"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Industries() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(data => {
        if (data.success) setItems(data.data);
      });
  }, []);

  if (items.length === 0) return null;

  return (
    <section
      id="success-story"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-indigo-50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Portfolio & Success Stories
          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Digital transformation that{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              delivers results
            </span>
          </h2>
        </motion.div>

        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            className="group mt-16 overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-2xl shadow-indigo-200/20"
          >
            <div className="grid lg:grid-cols-[0.8fr_1.6fr]">
            <div className="relative overflow-hidden bg-slate-950 p-10 text-white md:p-14 lg:p-16 min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-90 transition-transform duration-700 group-hover:scale-110" />
              
              {item.image && (
                 <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                 </div>
              )}

                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
                    {item.category || "Case Study"}
                  </p>

                  <h3 className="mt-8 text-3xl font-black leading-tight text-white lg:text-4xl">
                    {item.client}
                  </h3>

                  <div className="mt-12 h-1.5 w-12 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />

                  <p className="mt-10 text-lg leading-relaxed text-indigo-100/80">
                    {item.title}
                  </p>
                </div>
              </div>

              <div className="p-10 md:p-14 lg:p-16 bg-gradient-to-br from-white to-slate-50">
                <h3 className="text-3xl font-black text-slate-900 lg:text-4xl leading-tight">
                  {item.description}
                </h3>

                <div className="mt-10 prose prose-slate max-w-none text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content || "" }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
