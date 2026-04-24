import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
// import { Sparkles, Briefcase, MapPin } from "lucide-react";
import { FaBriefcase, FaMapPin } from "react-icons/fa"
import { IoSparkles } from "react-icons/io5";
import Background from "../assets/bg-2.jpg";

// ─── Data
const experiences = [
  {
    period: "2025 — Present",
    role: "Senior Frontend Engineer",
    company: "Genesis NG.",
    location: "Lagos, Nigeria",
    description:
      "Leading frontend architecture for a suite of fintech products. Reduced bundle size by 40% and mentored a team of developers.",
    technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
    current: true,
  },
  {
    period: "2025",
    role: "Frontend Engineer",
    company: "Freelance",
    location: "Remote",
    description:
      "Built scalable React apps and introduced testing practices that measurably improved code quality and delivery speed.",
    technologies: ["React", "Framer Motion", "Node.js"],
    current: false,
  },
  {
    period: "2023 — 2024",
    role: "Junior Developer",
    company: "Roothub NG.",
    location: "Akwa Ibom, Nigeria",
    description:
      "Completed an intensive internship at Roothub, earning a certificate in frontend development while shipping real-world features.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    current: false,
  },
  {
    period: "2022 — 2023",
    role: "Freelance Developer",
    company: "Self-Employed",
    location: "Remote",
    description:
      "Built and deployed 15+ websites for clients, handling full frontend development from design handoff to production launch.",
    technologies: ["JavaScript", "CSS", "HTML"],
    current: false,
  },
];

// stable particles
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 7.9 + 5) % 100}%`,
  top:  `${(i * 12.4 + 8) % 100}%`,
  delay: i * 0.3,
  duration: 3.5 + (i % 4),
}));

// Variants
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

//  Animated Timeline Line
function TimelineLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <div ref={ref} className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 overflow-hidden">
      {/* track */}
      <div className="absolute inset-0 bg-white/5" />
      {/* fill */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-[#ffe998] via-[#ffe998]/60 to-transparent"
      />
    </div>
  );
}

//  Experience Card 
function ExpCard({ exp, idx }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const isLeft = idx % 2 === 0;

  return (
    <div ref={ref} className="relative grid md:grid-cols-2 gap-6 items-start">

      {/*  Timeline Dot  */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
        className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-20 mt-6"
      >
        <div className="w-4 h-4 rounded-full bg-[#ffe998] ring-4 ring-black shadow-lg shadow-[#ffe998]/30 flex items-center justify-center">
          {exp.current && (
            <motion.span
              animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-4 h-4 rounded-full bg-[#ffe998]"
            />
          )}
        </div>
      </motion.div>

      {/*  Card  */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.1 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={`pl-14 md:pl-0 ${
          isLeft
            ? "md:col-start-1 md:pr-14 md:text-right"
            : "md:col-start-2 md:pl-14"
        }`}
      >
        <motion.div
          whileHover={{ y: -5, transition: { type: "spring", stiffness: 280, damping: 20 } }}
          className="group relative p-[1px] rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,233,152,0.18) 0%, transparent 50%, rgba(87,55,13,0.15) 100%)",
          }}
        >
          {/* Card body */}
          <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-6 overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_12px_40px_rgba(255,233,152,0.1)]">

            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#ffe998]/8 to-transparent rounded-bl-full pointer-events-none" />

            {/* Period + current badge */}
            <div className={`flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#ffe998]/80">
                {exp.period}
              </span>
              {exp.current && (
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[9px] px-2 py-0.5 rounded-full bg-[#ffe998]/15 border border-[#ffe998]/35 text-[#ffe998] font-semibold tracking-wider uppercase"
                >
                  Current
                </motion.span>
              )}
            </div>

            {/* Role */}
            <h3
              className="text-xl font-black text-white group-hover:text-[#ffe998] transition-colors duration-300 leading-snug"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {exp.role}
            </h3>

            {/* Company + location */}
            <div className={`flex items-center gap-3 mt-1.5 ${isLeft ? "md:justify-end" : ""}`}>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <FaBriefcase size={11} className="text-[#ffe998]/60" />
                <span>{exp.company}</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                <FaMapPin size={11} />
                <span>{exp.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">{exp.description}</p>

            {/* Tech pills */}
            <div className={`flex flex-wrap gap-2 mt-5 ${isLeft ? "md:justify-end" : ""}`}>
              {exp.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-[#ffe998]/25 text-[#ffe998]/80 bg-[#ffe998]/5 font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl bg-gradient-to-br from-[#ffe998]/15 to-[#57370d]/15 -z-10 transition-opacity duration-500" />
        </motion.div>
      </motion.div>
    </div>
  );
}

//  Experience 
const Experience = () => {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-8%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 18 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-12 py-24 text-white overflow-hidden bg-black"
    >
      {/* Parallax bg */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: springBgY }}>
        <img src={Background} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </motion.div>

      {/* Centre glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#ffe998]/10 to-[#57370d]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: p.left, top: p.top, backgroundColor: "#ffe998" }}
            animate={{ y: [0, -14, 0], opacity: [0.2, 0.55, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.div
            custom={0} variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ffe998]/30 bg-white/5 backdrop-blur-md mb-5"
          >
            <IoSparkles size={13} className="text-[#ffe998]" />
            <span className="text-[11px] tracking-widest uppercase text-gray-300">Experience</span>
          </motion.div>

          <motion.h2
            custom={1} variants={fadeUp}
            className="text-3xl md:text-5xl font-black leading-tight text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Proven{" "}
            <span className="italic font-normal" style={{ color: "#ffe998" }}>
              Front-End Development Experience
            </span>
          </motion.h2>

          <motion.p custom={2} variants={fadeUp} className="text-gray-400 leading-relaxed">
            From internships to leading fintech frontends — here's the journey that
            shaped how I build for the web.
          </motion.p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          <TimelineLine />

          <div className="space-y-16 pt-2">
            {experiences.map((exp, idx) => (
              <ExpCard key={idx} exp={exp} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;


