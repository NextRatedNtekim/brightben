import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";


const testimonials = [
  {
    name: "Amara Osei",
    role: "Brand Manager",
    text: "Our engagement tripled within weeks of working together.",
    initial: "A",
  },
  {
    name: "Zara Kimani",
    role: "Founder",
    text: "One of the most creative creators I've worked with.",
    initial: "Z",
  },
  {
    name: "Temi Adeyemi",
    role: "CEO",
    text: "Professional, fast, and incredibly talented.",
    initial: "T",
  },
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

/* ── Magnetic cursor glow ── */
function MagneticGlow({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-black px-6 py-28">
      <div className="mx-auto max-w-4xl text-center" ref={ref}>
        <SectionTitle small="Testimonials" title="Client Love" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-white/[0.07] bg-white/[0.02] p-10 md:p-14 overflow-hidden"
          >
            {/* BG glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.05),transparent_60%)]" />

            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-7xl font-black text-sky-400/10 leading-none select-none">&ldquo;</div>

            <p className="relative mb-8 text-lg leading-relaxed text-white/65 md:text-xl font-light italic">
              "{testimonials[current].text}"
            </p>

            <div className="relative flex items-center justify-center gap-4">
              <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">
                {testimonials[current].initial}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white text-sm">{testimonials[current].name}</h4>
                <p className="text-xs text-white/35 uppercase tracking-widest">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full transition-all duration-400 ${
                current === index
                  ? "w-8 h-2 bg-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.6)]"
                  : "w-2 h-2 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Testimonials;