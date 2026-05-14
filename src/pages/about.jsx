import { useRef } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import Profile from "../assets/profile.jpeg"
// import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { FaReact, FaFigma, FaGithub, FaPython, FaNodeJs, FaArrowDown } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiJavascript } from "react-icons/di";
import { IoSparkles } from "react-icons/io5";

// Skills Data 
const skills = [
  { label: "Copywriting",       Icon: FaReact  },
  { label: "Documentation",Icon: RiTailwindCssFill  },
  { label: "Moderation",      Icon: FaGithub },
  { label: "Ambassador Marketing",       Icon: FaFigma  },
  { label: "Web3 Education",  Icon: DiJavascript  },
  { label: "Community Onboarding",      Icon: FaPython  },
  { label: "Event Hosting.",     Icon: FaNodeJs  },
  { label: "Growth Marketing",     Icon: FaNodeJs  },
  { label: "User Advocacy",     Icon: FaNodeJs  },
  { label: "Ambassador Marketing",     Icon: FaNodeJs  },
];

// Floating Particle (stable positions via index)
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + 5) % 100}%`,
  top:  `${(i * 11.7 + 3) % 100}%`,
  delay: i * 0.4,
  duration: 4 + (i % 4),
}));



function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "2+", label: "Years Exp." },
    { value: "25+", label: "Clients" },
    { value: "200k+", label: "Reach" },
  ];

  return (
    <section id="about" className="relative bg-[#030303] px-6 py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div ref={ref} className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl border border-white/[0.08] bg-gradient-to-br from-sky-500/15 via-black to-black overflow-hidden">
            <img src={Profile}>
            </img>
          </div>


          {/* Floating stats cards */}
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5, ease: "backOut" }}
              className={`absolute rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl px-5 py-4 shadow-2xl ${
                i === 0 ? "-bottom-5 -right-5 bg-sky-500" :
                i === 1 ? "-top-5 -right-5" : "-top-5 left-4"
              }`}
            >
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              <p className="text-xs uppercase tracking-widest text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sky-400 font-medium">
            About Me
          </p>
          <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl tracking-tight">
            Turning ideas<br />
            <span className="text-white/40">into impact</span>
          </h2>
          <p className="mb-8 leading-relaxed text-white/50 text-[15px]">
            {/* I help brands connect with audiences through storytelling,
            aesthetics, and strategic content creation. Every piece of content
            I craft is designed with intention — to move people, inspire action,
            and build lasting brand equity. */}
                I have 2+ years of hands-on experience in Web3, 
                specializing in simplifying complex DeFi concepts into 
                engaging educational content that drives user adoption 
                and community growth. Skilled in content writing, ambassador 
                roles, community management, moderation, and growth-focused 
                storytelling for early-stage projects.

          </p>
          {/* <div className="flex flex-wrap gap-2.5">
            {["UGC Content", "TikTok", "Brand Strategy", "Copywriting", "Video Editing"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="rounded-full border border-sky-500/25 bg-sky-500/8 px-4 py-2 text-xs uppercase tracking-widest text-sky-400 hover:bg-sky-500/20 hover:border-sky-400/50 transition-all duration-200 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div> */}
        </motion.div>
      </div>
      <Slide />
    </section>
  );
}

// Skills Marquee 
function SkillsMarquee() {
  const doubled = [...skills, ...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-[#95cbfa]/10">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-45 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-45 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Row 1 — left */}
      <motion.div
        className="flex gap-10 mb-3"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 58, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {doubled.map(({ label, Icon }, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-sky-500/25 bg-sky-500/8 backdrop-blur-sm whitespace-nowrap"
          >
            {/* rounded-full border border-sky-500/25 bg-sky-500/8 px-4 py-2 text-xs uppercase tracking-widest text-sky-400 hover:bg-sky-500/20 hover:border-sky-400/50 transition-all duration-200 cursor-default */}
            <Icon size={14} className="text-[#95cbfa]" />
            <span className="text-sm font-semibold text-white/80 tracking-wide">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2 — right (opposite direction) */}
      <motion.div
        className="flex gap-10"
        animate={{ x: ["-33.33%", "0%"] }}
        transition={{ duration: 58, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {doubled.map(({ label, Icon }, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-sky-500/25 bg-sky-500/8 backdrop-blur-sm whitespace-nowrap"
          >
            <Icon size={14} className="text-white/40" />
            <span className="text-sm font-medium text-white/50 tracking-wide">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Slide() {
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
    <div className="relative bg-black min-h-s overflow-hidden flex flex-col items-center px-4 pt-20 pb-10 z-10">

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#95cbfa]/5 blur-[100px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: p.left, top: p.top, backgroundColor: "#95cbfa" }}
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
        
      </motion.div>

      {/* Skills marquee */}
      <div className="relative w-full max-w-5xl z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] tracking-widest uppercase text-gray-600 mb-5"
        >
          
        </motion.p>
        <SkillsMarquee />
      </div>
    </div>
  );
}


export default About;