import { useRef } from "react";
import { Star, Sparkles, Quote } from "lucide-react";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Background from "../assets/bg-1.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "One of the most talented engineers I've worked with. His attention to detail and ability to turn complex ideas into clean solutions is outstanding.",
    author: "Sarah Chen",
    role: "CTO, Tech Innovators",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    quote: "Delivered ahead of schedule with exceptional code quality. He raised the standard of our entire team.",
    author: "Michael Rodriguez",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    quote: "Helped us rebuild our frontend in record time. His architectural decisions continue to benefit us months later.",
    author: "Emily Watson",
    role: "Engineering Lead",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    quote: "Technically brilliant and a great team player. He elevates everyone around him — a rare combination.",
    author: "David Kim",
    role: "CEO, Innovation Hub",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    quote: "Samuel has a gift for translating design vision into pixel-perfect, performant interfaces. A true craftsman.",
    author: "Aisha Okonkwo",
    role: "Head of Design, Finova",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop",
  },
  {
    quote: "His communication and delivery pace are both incredible. We shipped a full redesign in under 3 weeks.",
    author: "James Lawson",
    role: "Founder, Launchpad NG",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

// stable particles
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 8.7 + 5) % 100}%`,
  top:  `${(i * 13.1 + 7) % 100}%`,
  delay: i * 0.3,
  duration: 3.5 + (i % 4),
}));

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Single Testimonial Card ──────────────────────────────────────────────────
function TestimonialCard({ item }) {
  return (
    <div className="relative flex-shrink-0 w-[320px] sm:w-[380px] p-[1px] rounded-2xl"
      style={{ background: "linear-gradient(135deg, rgba(255,233,152,0.2) 0%, transparent 50%, rgba(87,55,13,0.12) 100%)" }}
    >
      <div className="bg-black/55 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col gap-5">

        {/* Quote icon */}
        <Quote size={22} className="text-[#ffe998]/40" />

        {/* Quote text */}
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          "{item.quote}"
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white/8" />

        {/* Author row */}
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.author}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[#ffe998]/20"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white leading-snug truncate">{item.author}</h3>
            <p className="text-xs text-gray-500 truncate">{item.role}</p>
          </div>
          {/* Stars */}
          <div className="flex text-[#ffe998] gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="currentColor" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────
function MarqueeRow({ items, direction = "left", duration = 40 }) {
  // triple for seamless infinite scroll
  const tripled = [...items, ...items, ...items];
  const fromX = direction === "left" ? "0%" : "-33.33%";
  const toX   = direction === "left" ? "-33.33%" : "0%";

  return (
    <div className="overflow-hidden relative">
      {/* fade edges */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-5 py-3"
        style={{ width: "max-content" }}
        animate={{ x: [fromX, toX] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {tripled.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-8%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY       = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 18 });

  // split into two rows
  const rowA = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const rowB = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section
      ref={sectionRef}
      className="relative px-0 py-24 min-h-screen overflow-hidden text-white bg-black"
    >
      {/* Parallax bg */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: springBgY }}>
        <img src={Background} alt="" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/80" />
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ffe998]/6 blur-[120px] rounded-full pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: p.left, top: p.top, backgroundColor: "#ffe998" }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Header ── */}
      <motion.div
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        className="text-center max-w-2xl mx-auto px-6 mb-14"
      >
        <motion.div
          custom={0} variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ffe998]/30 bg-white/5 backdrop-blur-md mb-5"
        >
          <Sparkles size={13} className="text-[#ffe998]" />
          <span className="text-[11px] tracking-widest uppercase text-gray-300">Testimonials</span>
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp}
          className="text-3xl md:text-5xl font-black leading-tight text-white mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Words That Speak{" "}
          <span className="italic font-normal" style={{ color: "#ffe998" }}>
            Louder Than Code
          </span>
        </motion.h2>

        <motion.p custom={2} variants={fadeUp} className="text-gray-400 leading-relaxed">
          People I've worked with — their words mean more than any portfolio piece.
        </motion.p>
      </motion.div>

      {/* ── Marquee rows ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-5"
      >
        <MarqueeRow items={rowA} direction="left"  duration={38} />
        <MarqueeRow items={rowB} direction="right" duration={44} />
      </motion.div>

      {/* ── Bottom stat strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center gap-10 mt-16 px-6"
      >
        {[
          ["20+", "Happy Clients"],
          ["5.0", "Avg. Rating"],
          ["100%", "Satisfaction"],
        ].map(([num, label]) => (
          <div key={label} className="text-center">
            <div className="text-2xl font-black" style={{ color: "#ffe998" }}>{num}</div>
            <div className="text-xs text-gray-500 tracking-wider uppercase mt-1">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;