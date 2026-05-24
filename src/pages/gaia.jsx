// import React from 'react'

// function gaia() {
//   return (
//     <div>
//         Gaia

// 

// • 

// • 

// • 

// • 

// • 
//     </div>
//   )
// }

// export default gaia

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gaia from "../assets/gaia.jpeg"

// ── Floating leaf shapes (decorative) ──
const LEAVES = [
  { top: "4%",  left: "2%",  rotate: -30, scale: 0.9, opacity: 0.7 },
  { top: "12%", right: "3%", rotate: 20,  scale: 0.7, opacity: 0.5 },
  { top: "38%", left: "1%",  rotate: 50,  scale: 0.6, opacity: 0.6 },
  { top: "55%", right: "2%", rotate: -40, scale: 0.8, opacity: 0.5 },
  { top: "72%", left: "3%",  rotate: 15,  scale: 0.7, opacity: 0.65 },
  { top: "88%", right: "4%", rotate: -20, scale: 0.9, opacity: 0.6 },
];

function Leaf({ style }) {
  return (
    <motion.div
      style={style}
      animate={{ y: [0, -12, 0], rotate: [style.rotate, style.rotate + 8, style.rotate] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute pointer-events-none select-none z-0"
    >
      <svg width="38" height="52" viewBox="0 0 38 52" fill="none">
        <path
          d="M19 2C19 2 36 14 36 28C36 40.15 28.27 50 19 50C9.73 50 2 40.15 2 28C2 14 19 2 19 2Z"
          fill="url(#lf)"
          opacity="0.85"
        />
        <line x1="19" y1="50" x2="19" y2="10" stroke="#0287fd" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="lf" x1="19" y1="2" x2="19" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0287fd" />
            <stop offset="100%" stopColor="#95cbfa" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
// bg-gradient-to-br from-[#0287fd] to-[#95cbfa] text-black

// ── Highlight span ──
function Hi({ children, color = "text-sky-500" }) {
  return <span className={`font-bold ${color}`}>{children}</span>;
}

// ── Bullet item ──
function Bullet({ children, delay = 0, inView }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className="flex gap-3 text-[15px] leading-relaxed text-white/70"
    >
      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
      <span>{children}</span>
    </motion.li>
  );
}

// ── Tilted image card ──
function TiltCard({ src, alt, tilt = -6 }) {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{ rotate: tilt }}
      className="relative w-[200px] sm:w-[240px] md:w-[260px] shrink-0 mx-auto md:mx-0"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-4 rounded-2xl bg-sky-500/20 blur-2xl z-0" />
      <div className="relative z-10 rounded-2xl overflow-hidden ring-2 ring-sky-500/30 shadow-2xl">
        <img
          src={src}
          alt={alt}
          className="w-full object-cover object-center "
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </motion.div>
  );
}

// ── Project block ──
function ProjectBlock({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-10 flex flex-col gap-10 md:gap-16 items-center
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* Image */}
      <div className="md:w-[38%] flex justify-center">
        <TiltCard src={project.image} alt={project.title} tilt={isEven ? -5 : 5} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-3xl sm:text-4xl font-black text-sky-400 tracking-tight"
        >
          {project.title}
        </motion.h2>

        <ul className="flex flex-col gap-5">
          {project.bullets.map((b, i) => (
            <Bullet key={i} delay={0.15 + i * 0.09} inView={inView}>
              {b}
            </Bullet>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ── Data ──
const projects = [
  {
    title: "Gaia Project",
    image: gaia,
    bullets: [
      <>
        Served as a Regional Moderator within the Gaia ecosystem, 
        supporting community engagement, moderation activities, 
        and ecosystem participation across regional channels.
      </>,
      <>
        Organized and executed community-focused events designed 
        to increase participation, interaction, and awareness 
        within the Gaia community, earning performance-based 
        recognition for execution quality and engagement impact.
      </>,
      <>
        Actively participated in Gaia community discussions, helping sustain engagement, encourage conversations, and strengthen relationships among community members.
      </>,
      <>
        Assisted new members with onboarding and problem-solving support, helping improve the experience for first-time users within the ecosystem.
      </>,
      <>
        Initiated and supported governance-style community activities, including proposals and voting efforts for the creation of local language channels to improve accessibility and regional inclusion.
      </>,
      <>
        Initiated and supported governance-style community activities, including proposals and voting efforts for the creation of local language channels to improve accessibility and regional inclusion.
      </>,
    ],
  },
];

// ── Main export ──
export default function Gaia() {
  return (
    <section className="relative min-h-screen bg-black px-5 sm:px-8 py-24 overflow-hidden">
      {/* Noise grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        // style={{
        //   backgroundImage:
        //     "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        // }}
      />

      {/* Ambient purple radials */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-sky-500/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-sky-400/15 blur-[100px] pointer-events-none z-0" />

      {/* Floating leaves */}
      {LEAVES.map((l, i) => (
        <Leaf key={i} style={{ position: "absolute", ...l }} />
      ))}

      {/* Divider line top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl flex flex-col gap-24 sm:gap-32">
        {projects.map((project, i) => (
          <ProjectBlock key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* Divider line bottom */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent z-10" />
    </section>
  );
}