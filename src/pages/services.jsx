import { useEffect, useState, useRef } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

const services = [
  {
      icon: IoNewspaperOutline,
      title: "Writing & Content",
      desc: "Authentic content crafted to convert audiences into loyal customers.",
      gradient: "from-sky-500/20 to-cyan-400/5",
    },
      {
      icon: FaProjectDiagram,
      title: "Community management",
      desc: "Efficient project planning and execution to deliver results on time.",
      gradient: "from-blue-500/20 to-sky-400/5",
    },
    {
      icon: FaChildReaching,
      title: " Marketing & Growth",
      desc: "Building meaningful connections with your audience and community.",
      gradient: "from-cyan-500/20 to-blue-400/5",
    },
    {
      icon: FaChildReaching,
      title: " Communication",
      desc: "Building meaningful connections with your audience and community.",
      gradient: "from-sky-500/20 to-cyan-400/5",
    }

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

function Services() {
  return (
    <section id="services" className="relative bg-black px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle small="What I Offer" title="Services" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <FadeUp key={service.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group h-full rounded-3xl border border-white/[0.07] bg-gradient-to-br ${service.gradient} p-8 relative overflow-hidden cursor-default`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  className="mb-6 text-4xl text-sky-400 inline-block"
                >
                  <service.icon />
                </motion.div>
                <h3 className="mb-3 text-lg font-bold text-white tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {service.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                  Learn more <span>→</span>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Services;