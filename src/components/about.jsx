import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Code2, Lightbulb, Rocket, Users, Sparkles } from "lucide-react";
import { FaCode, FaLightbulb, FaRocket, FaUser, } from "react-icons/fa"
import { IoSparkles } from "react-icons/io5";
import Background from "../assets/bg-1.jpg";
import Profile from "../assets/profile.png";

// ─── Data ─────────────────────────────────────────────────────────────────────
const highlights = [
  {
    icon: FaCode,
    title: "Clean & Scalable Code",
    description: "I write maintainable, scalable and performant frontend code using modern tools.",
  },
  {
    icon: FaLightbulb,
    title: "Creative Problem Solving",
    description: "I approach design and development with creativity and strategic thinking.",
  },
  {
    icon: FaRocket,
    title: "Fast & Optimized",
    description: "I build fast-loading, optimized applications with smooth user experience.",
  },
  {
    icon: FaUser,
    title: "User-Centered Design",
    description: "I focus on intuitive interfaces that improve usability and engagement.",
  },
];

// stable particle positions
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 6.8 + 4) % 100}%`,
  top: `${(i * 13.2 + 7) % 100}%`,
  delay: i * 0.3,
  duration: 3.5 + (i % 5),
}));

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, delay: 0.1 + i * 0.13, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Highlight Card ───────────────────────────────────────────────────────────
function HighlightCard({ item, idx }) {
  return (
    <motion.div
      custom={idx}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-transparent via-[#ffe998]/25 to-transparent hover:via-[#ffe998]/55 transition-all duration-500"
    >
      {/* Card body */}
      <div className="h-full bg-black/40 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4 shadow-md group-hover:shadow-[0_14px_40px_rgba(255,233,152,0.12)] transition-shadow duration-500">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
          className="w-fit p-3 rounded-xl bg-gradient-to-br from-[#ffe998]/20 to-[#57370d]/30"
        >
          <item.icon size={22} className="text-[#ffe998]" />
        </motion.div>

        <div>
          <h3 className="text-base font-semibold group-hover:text-[#ffe998] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Glow behind card */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl bg-gradient-to-br from-[#ffe998]/15 to-[#57370d]/15 -z-10 transition-opacity duration-500" />
    </motion.div>
  );
}

// ─── Profile Image with parallax tilt ────────────────────────────────────────
function ProfileImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  return (
    <motion.div ref={ref} style={{ y: springY }} className="relative flex justify-center">
      {/* Ambient glow */}
      <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-[#ffe998]/25 to-[#57370d]/25 opacity-70 rounded-full scale-75" />

      {/* Decorative ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-12px] rounded-2xl border border-dashed border-[#ffe998]/15"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <img
          src={Profile}
          alt="Samuel Ntekim"
          className="w-[220px] sm:w-[260px] md:w-[300px] aspect-[4/5] object-cover rounded-2xl border border-[#ffe998]/25 shadow-2xl"
        />

        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, transparent 0%, rgba(255,233,152,0.08) 50%, transparent 100%)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-4 -right-4 flex gap-2 items-center bg-gradient-to-br from-[#ffe998]/20 to-[#57370d]/30 border border-[#ffe998]/25 backdrop-blur-md px-3 py-2 rounded-xl text-xs shadow-lg"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <span className="text-white/90 font-medium">Available for work</span>
        </motion.div>

        {/* Experience Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-4 -left-4 px-3 py-2 rounded-xl bg-gradient-to-br from-[#ffe998] to-[#57370d] text-black text-center shadow-lg shadow-[#ffe998]/20"
        >
          <div className="text-xl font-black leading-none">4+</div>
          <div className="text-[9px] font-semibold tracking-wider uppercase mt-0.5">Years Exp.</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── About 
function About() {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-12 py-20 min-h-screen overflow-hidden text-white z-30 bg-black"
    >
      {/* Parallax background */}
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img src={Background} alt="" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: p.left, top: p.top, backgroundColor: "#ffe998" }}
            animate={{ y: [0, -16, 0], opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#ffe998]/6 blur-[90px] rounded-full pointer-events-none" />

      {/* ── Header ── */}
      <motion.div
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        className="relative z-10 text-center max-w-2xl mx-auto mb-16"
      >
        <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ffe998]/30 bg-white/5 backdrop-blur-md mb-5">
          <IoSparkles size={13} className="text-[#ffe998]" />
          <span className="text-[11px] tracking-widest uppercase text-gray-300">About Me</span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Passionate{" "}
          <span className="italic font-normal" style={{ color: "#ffe998" }}>
            About Building the Web
          </span>
        </motion.h2>

        <motion.p custom={2} variants={fadeUp} className="text-gray-400 leading-relaxed">
          I specialise in responsive, high-performance websites and web apps that are
          both visually striking and genuinely user-friendly.
        </motion.p>
      </motion.div>

      {/* ── Two-column: text + image ── */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center max-w-5xl mx-auto mb-20">
        {/* Left: bio details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5"
        >
          {[
            "I'm Samuel Ntekim — a frontend developer who's obsessed with the intersection of great design and clean engineering.",
            "Over the past 4+ years I've helped startups and individuals ship polished digital products. I care deeply about performance, accessibility, and the tiny details that make a product feel alive.",
            "When I'm not coding, you'll find me exploring design systems, learning new tools, or sketching UI ideas.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`leading-relaxed ${i === 0 ? "text-white text-lg font-medium" : "text-gray-400 text-sm"}`}
            >
              {text}
            </motion.p>
          ))}

          {/* Stat row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex gap-8 mt-3 pt-5 border-t border-[#ffe998]/10"
          >
            {[["4+", "Years"], ["20+", "Projects"], ["100%", "Dedication"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-black" style={{ color: "#ffe998" }}>{num}</div>
                <div className="text-xs text-gray-500 tracking-wider uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: profile image */}
        <ProfileImage />
      </div>

      {/* ── Highlight Cards ── */}
      <div className="relative z-10 max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {highlights.map((item, idx) => (
          <HighlightCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </section>
  );
}

export default About;