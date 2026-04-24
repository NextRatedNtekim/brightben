import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowDown, Sparkles, Code2, XCircleIcon, VanIcon, Globe } from "lucide-react";
import { FaReact, FaFigma, FaGithub, FaPython, FaNodeJs, FaArrowDown } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiJavascript } from "react-icons/di";
import { IoSparkles } from "react-icons/io5";
// import Background from "../assets/portait.jpg";
import Background from "../assets/profile.png"

// Skills Data 
const skills = [
  { label: "React",       Icon: FaReact  },
  { label: "Tailwind CSS",Icon: RiTailwindCssFill  },
  { label: "GitHub",      Icon: FaGithub },
  { label: "Figma",       Icon: FaFigma  },
  { label: "JavaScript",  Icon: DiJavascript  },
  { label: "Python",      Icon: FaPython  },
  { label: "Node.js",     Icon: FaNodeJs  },
];

// Floating Particle (stable positions via index)
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + 5) % 100}%`,
  top:  `${(i * 11.7 + 3) % 100}%`,
  delay: i * 0.4,
  duration: 4 + (i % 4),
}));

// ScrollZoom Intro
function ScrollZoomIntro() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image zooms IN as you scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const springScale = useSpring(scale, { stiffness: 80, damping: 30 });

  // Content fades + drifts upward
  const contentY       = useTransform(scrollYProgress, [0, 0.6], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const springContentY = useSpring(contentY, { stiffness: 80, damping: 30 });

  // Blur intensifies on scroll
  const blurPx     = useTransform(scrollYProgress, [0, 0.7], [0, 10]);
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`);

  // Word-by-word stagger on mount
  const titleVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const wordVariant = {
    hidden:  { opacity: 0, y: 50, rotateX: -25 },
    visible: { opacity: 1, y: 0,  rotateX: 0,
               transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    // Tall scroll runway — gives the zoom room to breathe
    <div ref={containerRef} className="relative h-screen">

      {/* Sticky viewport pin */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Background image layer ── */}
        <motion.div
          style={{ scale: springScale, filter: blurFilter }}
          className="absolute inset-0 will-change-transform origin-center"
        >
          <img
            src={Background}
            alt="Samuel Ntekim"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── Gradient vignette (static) ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75 pointer-events-none" />

        {/* ── Grain overlay ── */}
        <div
          className="absolute inset-0 opacity-[0.055] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* ── Foreground content ── */}
        <motion.div
          style={{ y: springContentY, opacity: contentOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ffe998]/25 bg-white/5 backdrop-blur-md mb-8"
          >
            <IoSparkles size={13} className="text-[#ffe998]" />
            <span className="text-[11px] tracking-widest uppercase text-[#ffe998]/80 font-medium">
              Full‑Stack Developer
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-[clamp(2.8rem,8vw,7rem)] font-black leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {["Meet", "Samuel", "Ntekim"].map((word, i) => (
              <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.25em]">
                {i === 1 ? (
                  <span className="italic" style={{ color: "#ffe998" }}>{word}</span>
                ) : word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-6 text-[clamp(0.9rem,2vw,1.15rem)] text-gray-300 max-w-lg leading-relaxed"
          >
            Crafting performant web experiences with precision and care.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <FaArrowDown size={16} className="text-[#ffe998]" />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}


// Skills Marquee 
function SkillsMarquee() {
  const doubled = [...skills, ...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-[#ffe998]/10">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Row 1 — left */}
      <motion.div
        className="flex gap-10 mb-3"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {doubled.map(({ label, Icon }, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#ffe998]/15 bg-white/[0.03] backdrop-blur-sm whitespace-nowrap"
          >
            <Icon size={14} className="text-[#ffe998]" />
            <span className="text-sm font-semibold text-white/80 tracking-wide">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2 — right (opposite direction) */}
      <motion.div
        className="flex gap-10"
        animate={{ x: ["-33.33%", "0%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {doubled.map(({ label, Icon }, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-sm whitespace-nowrap"
          >
            <Icon size={14} className="text-white/40" />
            <span className="text-sm font-medium text-white/50 tracking-wide">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Hero (main content panel) 
function HeroContent() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="relative bg-black min-h-screen overflow-hidden flex flex-col items-center px-4 pt-20 pb-10 z-10">

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#ffe998]/5 blur-[100px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: p.left, top: p.top, backgroundColor: "#ffe998" }}
            animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ffe998]/30 bg-white/5 backdrop-blur-md mb-6">
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-gradient-to-br from-[#ffe998] to-[#57370d]"
          />
          <span className="text-[12px] sm:text-[13px] tracking-wider uppercase text-gray-300">
            Turning Ideas into Code
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={item}
          className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-white mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Building Interactive{" "}
          <span className="italic font-normal" style={{ color: "#ffe998" }}>
            Web Experiences.
          </span>
        </motion.h2>

        {/* Body */}
        <motion.p variants={item} className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          I specialise in responsive, high-performance websites and web apps
          that are both visually striking and user‑friendly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <CosButton content="View Projects" primary onClick={() => navigate("/projects")} />
          <CosButton content="Contact Me" onClick={() => navigate("/contact")} />
        </motion.div>
      </motion.div>

      {/* Skills marquee */}
      <div className="relative w-full max-w-5xl mt-20 z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] tracking-widest uppercase text-gray-600 mb-5"
        >
          Tech Stack
        </motion.p>
        <SkillsMarquee />
      </div>
    </div>
  );
}

// Button 
const CosButton = ({ content, primary, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 350, damping: 20 }}
    className={`relative px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide overflow-hidden transition-shadow duration-300 ${
      primary
        ? "bg-gradient-to-br from-[#ffe998] to-[#57370d] text-black shadow-lg shadow-[#ffe998]/20 hover:shadow-[#ffe998]/40"
        : "border border-[#ffe998]/35 text-[#ffe998] hover:bg-[#ffe998]/8"
    }`}
  >
    {primary && (
      <motion.span
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ x: "-100%", skewX: -15 }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />
    )}
    {content}
  </motion.button>
);

// Root Export 
export default function Hero() {
  return (
    <>
      <ScrollZoomIntro />
      <HeroContent />
    </>
  );
}