"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { ServiceItem } from "../lib/types";
import { Tilt } from "../lib/anim";

const iconPaths: Record<string, React.ReactNode> = {
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  grid: (
    <>
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  chart: (
    <>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
};

const tones = [
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-red-600",
  "from-lime-500 to-green-600",
];

const fallback: ServiceItem[] = [
  { id: "s1", slug: "custom", title: "Custom Software Development", tagline: "Tailor-made systems", description: "Web, desktop and SaaS applications engineered to fit your business.", icon: "code", sortOrder: 1 },
  { id: "s2", slug: "web", title: "Website Design & Development", tagline: "Websites that convert", description: "Corporate sites and platforms with modern UX and solid SEO.", icon: "monitor", sortOrder: 2 },
];

export default function Services({ detailed = false }: { detailed?: boolean }) {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/services")
      .then((r) => r.json())
      .then((res) => {
        if (active) setServices(Array.isArray(res?.data) ? res.data : fallback);
      })
      .catch(() => active && setServices(fallback));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="services" className={`py-24 md:py-32 ${detailed ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {!detailed && (
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
              What we do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              End-to-end IT services that{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                move your business forward
              </span>
            </h2>
            <p className="mt-5 text-slate-600 text-lg">
              From strategy and design to development, deployment and lifetime
              support — one accountable partner for every layer of your tech stack.
            </p>
          </div>
        )}

        <div className={`grid gap-6 ${detailed ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4'}`} style={{ perspective: 1200 }}>
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              className="h-full"
              initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Tilt max={detailed ? 5 : 12} className="h-full">
                <div className={`group relative h-full rounded-3xl bg-white transition-all duration-500 hover:-translate-y-2 ${detailed ? 'p-8 md:p-12' : 'p-7'}`}>
                  {/* Subtle background gradient on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 to-white opacity-100 group-hover:from-indigo-50/50 group-hover:to-cyan-50/50 transition-colors duration-500 border border-slate-100 group-hover:border-indigo-100/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.15)]" />
                  
                  <div className={`relative z-10 ${detailed ? 'md:flex gap-10 items-start' : ''}`}>
                    <div className={`shrink-0 ${detailed ? 'h-20 w-20' : 'h-14 w-14'} rounded-2xl bg-gradient-to-br ${tones[i % tones.length]} flex items-center justify-center shadow-lg shadow-indigo-200/50 group-hover:shadow-indigo-300/50 transition-all duration-500 group-hover:scale-110 overflow-hidden`}>
                      {s.image ? (
                        <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                      ) : (
                        <svg className={`${detailed ? 'h-10 w-10' : 'h-7 w-7'} text-white`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          {iconPaths[s.icon ?? "code"]}
                        </svg>
                      )}
                    </div>
                    
                    <div className="flex-1">
                        <h3 className={`font-bold text-slate-900 group-hover:text-indigo-600 transition-colors ${detailed ? 'text-3xl mt-6 md:mt-0' : 'text-xl mt-6 line-clamp-2 min-h-[3.5rem]'}`}>
                        {s.title}
                        </h3>
                        
                        {s.tagline && (
                        <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-indigo-500/80 truncate">
                            {s.tagline}
                        </div>
                        )}
                        
                        <p className={`mt-4 text-slate-600 leading-relaxed ${detailed ? 'text-lg' : 'text-sm line-clamp-4 min-h-[5rem]'}`}>
                        {s.description}
                        </p>
                        
                        {!detailed && (
                            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-indigo-600">
                            <span className="relative">
                                Explore
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 group-hover:w-full transition-all duration-300" />
                            </span>
                            <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                            </div>
                        )}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
