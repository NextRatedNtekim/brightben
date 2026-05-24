import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import p1 from "../assets/gaia.jpeg";
import p2 from "../assets/loyal.jpeg";
import { motion, useInView } from "framer-motion";

const portfolio = [
  {
    id: 2,
    title: "Loyal",
    tag: "Community",
    date: " January 2026-April 2026",
    accent: "from-rose-500/20 via-rose-900/10 to-sky-900/60",
    glowColor: "rgba(244,63,94,0.15)",
    borderColor: "rgba(244,63,94,0.2)",
    tagColor: "text-rose-400",
    image: p2,
    details: `Served as a Regional Moderator within the Gaia ecosystem, supporting community engagement, moderation activities, and ecosystem participation across regional channels.`,
    more: "/loyal"
  },
  {
    id: 1,
    title: "Gaia",
    tag: "Project",
    date: " April 2025-November 2025",
    accent: "from-amber-500/20 via-amber-900/10 to-sky-900/60",
    glowColor: "rgba(245,158,11,0.15)",
    borderColor: "rgba(245,158,11,0.2)",
    tagColor: "text-amber-400",
    image: p1,
    details: `Collaborated with the Loyal team to support community growth and ecosystem visibility through structured engagement, educational content, and audience interaction strategies.`,
    more: "/gaia"
  }
];

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 52 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
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
    <div ref={ref} className="mb-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-3 text-[10px] uppercase tracking-[0.4em] text-sky-400/80 font-semibold"
      >
        {small}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="text-5xl font-black text-white md:text-6xl tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="mx-auto mt-6 h-px w-24 origin-center bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
      />
    </div>
  );
}

function ProjectCard({ item, index, navigate }) {
  return (
    <FadeUp delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: `1px solid ${item.borderColor}`,
          boxShadow: `0 0 0 0 ${item.glowColor}`,
        }}
      >
        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            boxShadow: `inset 0 0 60px ${item.glowColor}`,
          }}
        />

        {/* Image Container — centered */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
          {/* Gradient overlay on top of image */}
          <div
            className={`absolute inset-0 z-10 bg-gradient-to-b ${item.accent} opacity-60 mix-blend-multiply`}
          />
          {/* Centered image */}
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {/* Top shimmer bar */}
          <div className="absolute top-0 left-0 right-0 h-px z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* Tag badge */}
          <div className="absolute top-4 left-4 z-20">
            <span
              className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md bg-black/30 border border-white/10 ${item.tagColor}`}
            >
              {item.tag}
            </span>
          </div>
          {/* Large ghost letter */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-[160px] font-black text-white/[0.04] leading-none select-none">
              {item.title[0]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-7">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
              {item.title}
            </h3>
            {/* Index number */}
            <span className="text-[11px] font-mono text-white/20 mt-1">
              0{item.id}
            </span>
          </div>
          <div className={`text-xs ${item.tagColor} mb-2 pb-2 border-b border-white/[0.06]`}>
            {item.date}
          </div>
          <p className="text-sm text-white/55 leading-relaxed line-clamp-3 flex-1">
            {item.details.trim()}
          </p>

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-white/5 via-white/10 to-white/5" />

          {/* CTA */}
          <motion.div
            onClick={() => navigate(item.more)}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest ${item.tagColor} cursor-pointer group/btn w-fit`}
          >
            <span className="group-hover/btn:underline underline-offset-4 decoration-current/40">
              View Projects
            </span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <FaArrowRight size={9} />
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </FadeUp>
  );
}

function Project() {
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="relative bg-[#030303] px-6 py-32 overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-900/10 blur-[100px] pointer-events-none" />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-5xl">
        <SectionTitle small="Selected Work" title="Portfolio" />

        <div className="grid gap-6 sm:grid-cols-2">
          {portfolio.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} navigate={navigate} />
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeUp delay={0.3}>
          <div className="mt-16 text-center">
            <motion.button
              onClick={() => navigate("/projects")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 bg-white/[0.04] text-white/70 text-sm font-medium tracking-wide hover:border-sky-500/40 hover:text-sky-400 hover:bg-sky-500/5 transition-all duration-300"
            >
              View All Projects
              <FaArrowRight size={11} />
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default Project;