import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowRight  } from "react-icons/fa"
import { IoSparkles } from "react-icons/io5";
import Background from "../assets/bg-1.jpg";
import Weather from "../assets/Weather.png";
import Music from "../assets/Music.png";
import commerce from "../assets/Market.png";
import AiChat from "../assets/ai.png";
import hotel from "../assets/Hotel-Booking-App.png";
import food from "../assets/Food-Delivery-App.png";

// Data 
const projects = [
  {
    title: "Fintech App",
    description: "A modern fintech solution with seamless transactions and real-time analytics dashboard.",
    image: commerce,
    tags: ["React", "Tailwind", "Node.js"],
    links: "#",
    github: "#",
    accent: "#ffe998",
    status: {
    text: "Developing",
    isLive: false
    }
  },
  {
    title: "Weather App",
    description: "Real-time weather updates with a clean, responsive UI and location-aware forecasting.",
    image: Weather,
    tags: ["React", "API", "Tailwind"],
    links: "#",
    github: "#",
    accent: "#93c5fd",
    status: {
    text: "Developing",
    isLive: false
    }
  },
  {
    title: "Music App",
    description: "Stream and explore music with an intuitive interface and rich playback controls.",
    image: Music,
    tags: ["React", "Firebase", "Tailwind"],
    links: "#",
    github: "#",
    accent: "#f0abfc",
    status: {
    text: "Developing",
    isLive: false
    }
  },
  {
    title: "Hotel Booking App",
    description: "A polished booking experience with smooth search, filtering, and reservation flows.",
    image: hotel,
    tags: ["JavaScript", "CSS", "HTML"],
    links: "#",
    github: "#",
    accent: "#6ee7b7",
    status: {
    text: "Developing",
    isLive: false
    }
  },
  {
    title: "AI Chat Application",
    description: "Conversational AI interface with streaming responses and a sleek modern design.",
    image: AiChat,
    tags: ["JavaScript", "CSS", "HTML"],
    links: "#",
    github: "#",
    accent: "#fda4af",
    status: {
    text: "Developing",
    isLive: false
    }
    
  },
  {
    title: "Food Delivery App",
    description: "End-to-end food ordering experience with live tracking and smooth cart interactions.",
    image: food,
    tags: ["JavaScript", "CSS", "HTML"],
    links: "https://restaurant-demo-nine-opal.vercel.app",
    github: "https://github.com/NextRatedNtekim/restaurant-demo",
    accent: "#fdba74",
    status: {
    text: "Live",
    isLive: true
    }
  },
];

// stable particles
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 8.3 + 6) % 100}%`,
  top:  `${(i * 14.1 + 9) % 100}%`,
  delay: i * 0.35,
  duration: 3.5 + (i % 4),
}));

// ─── Variants 
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.11, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cardVariant = {
  hidden:  { opacity: 0, y: 55, scale: 0.93 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.8, delay: 0.05 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

//  Project Card 
function ProjectCard({ project, idx }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      custom={idx}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-6%" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 20 } }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-xl flex flex-col"
      style={{
        boxShadow: hovered
          ? `0 20px 60px ${project.accent}18, 0 4px 20px rgba(0,0,0,0.5)`
          : "0 4px 30px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Border glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          background: `linear-gradient(135deg, ${project.accent}22 0%, transparent 60%)`,
          border: `1px solid ${project.accent}35`,
        }}
      />

      {/* ── Image ── */}
      <div className="relative overflow-hidden h-52 flex-shrink-0">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Overlay actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 backdrop-blur-[2px]"
            >
              <motion.a
                href={project.links}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.04, type: "spring", stiffness: 300 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-black shadow-lg"
                style={{ background: `linear-gradient(135deg, #ffe998, #57370d)` }}
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </motion.a>
              <motion.a
                href={project.github}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-sm"
              >
                <FaGithub size={12} /> GitHub
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tag strip on image bottom */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md font-medium"
              style={{ background: `${project.accent}22`, color: project.accent, border: `1px solid ${project.accent}40` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-bold text-white leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
            {project.title}
          </h2>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, color: hovered ? project.accent : "#6b7280" }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowRight size={18} />
          </motion.div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>

        {/* Bottom link row */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 pt-3 border-t border-white/5">
          <a
            href={project.links}
            className="flex items-center gap-1.5 text-xs font-semibold text-black px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: `linear-gradient(135deg, #ffe998, #57370d)` }}
          >
            <FaExternalLinkAlt size={11} /> Live
          </a>
          <a
            href={project.github}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#ffe998] px-3 py-1.5 rounded-lg border border-[#ffe998]/30 hover:bg-[#ffe998]/10 transition"
          >
            <FaGithub size={11} /> GitHub
          </a>
          </div>
          <div className="flex gap-2 items-center">

          {project.status.isLive && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-green-400"
            />
          )}

          <div className="text-gray-500 font-sm text-[13px]">
            {project.status.text}
          </div>

        </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Projects 
function Projects() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-8%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 18 });
  const navigate = useNavigate();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-6 py-20 text-white bg-black pt-[130px]"
    >
      {/* Parallax bg */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: springBgY }}>
        <img src={Background} alt="" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#ffe998]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: p.left, top: p.top, backgroundColor: "#ffe998" }}
            animate={{ y: [0, -14, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Header ── */}
      <motion.div
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        className="relative z-10 text-center max-w-2xl mx-auto mb-16"
      >
        <motion.div
          custom={0} variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ffe998]/30 bg-white/5 backdrop-blur-md mb-5"
        >
          <IoSparkles size={13} className="text-[#ffe998]" />
          <span className="text-[11px] tracking-widest uppercase text-gray-300">Projects</span>
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp}
          className="text-3xl md:text-5xl font-black leading-tight text-white mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Showcasing{" "}
          <span className="italic font-normal" style={{ color: "#ffe998" }}>
            Innovative Web Solutions
          </span>
        </motion.h2>

        <motion.p custom={2} variants={fadeUp} className="text-gray-400 leading-relaxed">
          Projects that demonstrate my ability to bring ideas to life through code —
          from concept to polished, deployed product.
        </motion.p>
      </motion.div>

      {/* ── Grid ── */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} idx={idx} />
        ))}
      </div>

      {/* ── See More ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 flex justify-center mt-14"
      >
        <motion.div
          onClick={() => navigate("/projects")}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="relative overflow-hidden flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#ffe998]/35 text-[#ffe998] text-sm font-semibold hover:bg-[#ffe998]/8 transition-colors"
        >
          <motion.span
            className="absolute inset-0 bg-[#ffe998]/10 rounded-full"
            initial={{ x: "-100%", skewX: -15 }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          />
          
          <button content="View Projects" className="cursor-pointer" >View Projects</button>
          
          <FaArrowRight size={15} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;


