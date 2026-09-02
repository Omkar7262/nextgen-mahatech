"use client";

import { motion } from "motion/react";

export default function AMSSlogan() {
  return (
    <section className="py-14 bg-gradient-to-r from-indigo-600 via-blue-700 to-slate-900 text-white text-center">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <motion.h3
          className="text-2xl md:text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, rotateX: 40 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ perspective: 800 }}
        >
          Go Digital. Go Efficient.{" "}
          <span className="bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
            Go NextGen.
          </span>
        </motion.h3>
        <p className="mt-3 text-indigo-100">
          Everything Your Association Needs — In One Powerful Platform.
        </p>
      </div>
    </section>
  );
}
