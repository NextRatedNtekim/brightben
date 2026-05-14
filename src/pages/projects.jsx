import { useEffect, useState, useRef } from "react";
import  p1 from "../assets/p1.jfif"
import  p2 from "../assets/p2.jfif"
import  p3 from "../assets/p3.jfif"
import  p4 from "../assets/p3.jpg"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

const portfolio = [
  { title: "Summer Campaign", tag: "Lifestyle", accent: "from-amber-500/30 to-sky-900/80", image: p1 },
  { title: "Skincare Launch", tag: "Beauty", accent: "from-rose-500/30 to-sky-900/80", image: p2 },
  { title: "OOTDs Series", tag: "Fashion", accent: "from-purple-500/30 to-sky-900/80", image: p3 },
  { title: "App Promo", tag: "Tech", accent: "from-sky-500/30 to-indigo-900/80", image: p4 },
  
];


/* ── Fade-up reveal wrapper ── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ small, title }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-14 text-center">
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={inView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mb-3 text-xs uppercase tracking-[0.3em] text-sky-400 font-medium"
      >
        {small}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="text-4xl font-black text-white md:text-5xl tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="mx-auto mt-5 h-px w-16 origin-left bg-gradient-to-r from-sky-400 to-transparent"
      />
    </div>
  );
}



function Project() {
  return (
    <section id="portfolio" className="relative bg-[#030303] px-6 py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionTitle small="Selected Work" title="Portfolio" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={`group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br ${item.accent} cursor-pointer`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.h3
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    className="text-[120px] font-black text-white/[0.06] leading-none select-none"
                  >
                    {item.title[0]}
                  </motion.h3>
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div>
                  <img src={item.image} alt={item.tag} />
                </div>
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <motion.p className="mb-1.5 text-xs uppercase tracking-widest text-sky-400 font-medium">
                    {item.tag}
                  </motion.p>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    View project <span className="text-sky-400">→</span>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Project;