
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { TestimonialItem } from "../lib/types";
import { Tilt } from "../lib/anim";

const fallback: TestimonialItem[] = [
  {
    id: "t1",
    client: "Rahul Deshmukh",
    role: "Operations Director, Manufacturing SME",
    quote:
      "NextGen Mahatech rebuilt our order-management platform. Delivery was on-time and our operations run 40% faster today.",
    rating: 5,
  },
  {
    id: "t2",
    client: "Sneha Patil",
    role: "CEO, Retail Chain (Nashik)",
    quote:
      "Their team deployed our entire IT and network infrastructure across three branches. Truly a one-stop partner.",
    rating: 5,
  },
  {
    id: "t3",
    client: "Amit Joshi",
    role: "Founder, Logistics Startup",
    quote:
      "From ERP customisation to AMC support, response times are quick and the engineers understand our business.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [items, setItems] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    let active = true;

    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((res) => {
        if (active) {
          setItems(Array.isArray(res?.data) ? res.data : fallback);
        }
      })
      .catch(() => active && setItems(fallback));

    return () => {
      active = false;
    };
  }, []);

  /*
   * Duplicate testimonials so the horizontal marquee
   * can loop continuously without a visible gap.
   */
  const marqueeItems = [...items, ...items];

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Client stories
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Trusted by leaders who value{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              results over jargon
            </span>
          </h2>
        </div>

        {/* Horizontal Auto Scroll */}
        <div className="relative overflow-hidden">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-slate-50 to-transparent" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-slate-50 to-transparent" />

          <motion.div
            className="flex gap-8 w-max py-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                duration: Math.max(items.length * 7, 20),
                ease: "linear",
                repeat: Infinity,
              },
            }}
            whileHover={{
              animationPlayState: "paused",
            }}
            style={{
              perspective: 1400,
            }}
          >
            {marqueeItems.map((t, i) => (
              <motion.div
                key={`${t.id}-${i}`}
                className="
                  w-[85vw]
                  sm:w-[420px]
                  md:w-[430px]
                  lg:w-[450px]
                  shrink-0
                "
                initial={{
                  opacity: 0,
                  y: 40,
                  rotateX: 15,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  duration: 0.6,
                  delay: (i % items.length) * 0.08,
                }}
              >
                <Tilt max={9} className="h-full">
                  <div className="group relative h-full rounded-[2.5rem] bg-white p-8 md:p-10 transition-all duration-500">
                    {/* Background */}
                    <div
                      className="
                        absolute inset-0 rounded-[2.5rem]
                        bg-gradient-to-b from-slate-50 to-white
                        border border-slate-100
                        group-hover:border-indigo-100
                        group-hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.1)]
                        transition-all duration-500
                      "
                    />

                    <div className="relative z-10">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-6 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, r) => (
                          <svg
                            key={r}
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-slate-700 text-lg leading-relaxed italic font-medium line-clamp-6 min-h-[9rem]">
                        “{t.quote}”
                      </blockquote>

                      {/* Client */}
                      <div className="mt-8 flex items-center gap-4 pt-8 border-t border-slate-100">
                        <div className="relative h-14 w-14 shrink-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 animate-pulse opacity-20" />

                          <div className="relative h-full w-full rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-bold flex items-center justify-center border-2 border-white shadow-lg overflow-hidden">
                            {t.image ? (
                              <img
                                src={t.image}
                                alt={t.client}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-black uppercase tracking-tighter">
                                {t.client
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="overflow-hidden">
                          <div className="font-bold text-slate-900 text-base truncate">
                            {t.client}
                          </div>

                          <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider truncate">
                            {t.role ?? ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
