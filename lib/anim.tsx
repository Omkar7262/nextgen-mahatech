"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/* Shared 3D animation presets + variants. */

export function card3D(delay = 0) {
  return {
    hidden: { opacity: 0, y: 60, rotateX: 18, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.7, delay },
    },
  };
}

export function slide3D(delay = 0) {
  return {
    hidden: { opacity: 0, y: 50, rotateX: 35 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, delay },
    },
  };
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 40, rotateY: -12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: { duration: 0.6 },
  },
};

/* <Reveal3D> — scroll-triggered 3D entrance wrapper. */
export function Reveal3D(props: {
  children: ReactNode;
  className?: string;
  variant?: "card3D" | "slide3D";
  delay?: number;
}) {
  const variant = props.variant === "slide3D" ? slide3D(props.delay) : card3D(props.delay);
  return (
    <motion.div
      className={props.className}
      variants={variant as never}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      style={{ transformPerspective: 1200 }}
    >
      {props.children}
    </motion.div>
  );
}

/* <Tilt> — interactive 3D tilt card that follows the cursor. */
export function Tilt(props: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const max = props.max ?? 14;
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 250, damping: 20 });
  const sry = useSpring(ry, { stiffness: 250, damping: 20 });

  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareX = useTransform(gx, (v) => `${v}%`);
  const glareY = useTransform(gy, (v) => `${v}%`);
  const glareBg = useTransform([glareX, glareY] as never, ([x, y]: string[]) =>
    `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 55%)`
  );

  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={props.className}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {props.children}
        {props.glare !== false && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* <Flip3D> — 3D flip card on hover. */
export function Flip3D(props: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}) {
  return (
    <div className={`[perspective:1400px] ${props.className ?? ""}`}>
      <div className="group relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 [backface-visibility:hidden]">{props.front}</div>
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {props.back}
        </div>
      </div>
    </div>
  );
}
