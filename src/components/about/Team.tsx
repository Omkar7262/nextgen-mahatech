"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";

export default function AboutTeam() {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then(res => res.json())
      .then(data => {
        if (data.success) setTeam(data.data);
      });
  }, []);

  if (team.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute bottom-20 right-[-120px] h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Leadership
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
            The people who{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              get things done
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Meet the leadership team behind NextGen Maha Tech — driving
            innovation, technology, and meaningful digital transformation.
          </p>
        </Reveal3D>

        <div className="grid items-stretch gap-8 md:grid-cols-2">
          {team.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="flex h-full flex-col"
            >
              <div className="flex h-full min-h-[500px] flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 to-cyan-500" />
                
                <div className="relative mx-auto mt-10 h-72 w-full max-w-[280px] overflow-hidden rounded-[2rem] bg-slate-50 p-1 border border-slate-100 flex-shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="280px"
                      className="object-cover object-top rounded-[1.9rem]"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                        <svg className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                  )}
                </div>

                <div className="px-8 pt-8 text-center">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 truncate px-2">{member.name}</h3>
                  <div className="mt-2 inline-flex rounded-full bg-indigo-50 px-4 py-1 text-xs font-black uppercase tracking-widest text-indigo-600 truncate max-w-full">
                    {member.role}
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-8 pb-10 pt-6">
                   <div className="relative flex-1 rounded-3xl bg-slate-50/50 p-6 border border-slate-100 overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-indigo-600 to-cyan-500" />
                      <p className="text-sm leading-7 text-slate-600 italic line-clamp-[10] overflow-auto max-h-[280px]">
                        {member.bio}
                      </p>
                   </div>
                </div>
                
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 to-cyan-500 opacity-20" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
