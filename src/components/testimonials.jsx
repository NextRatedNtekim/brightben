import { useEffect, useState, useRef } from "react";
import tes1 from "../assets/tes-1.jpeg";
import tes2 from "../assets/tes-2.jpeg";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Amara Osei",
    role: "Brand Manager",
    initial: "A",
    img: tes1,
    // text: "Working with this team completely transformed how we show up online. The content strategy was sharp, intentional, and delivered results we hadn't seen before.",
  },
  {
    name: "Zara Kimani",
    role: "Founder",
    initial: "Z",
    img: tes2,
    // text: "From community building to ecosystem visibility, every deliverable exceeded expectations. A true partner in growth — highly recommend.",
  },
];

function SectionTitle({ small, title }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-16 text-center">
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

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Auto-advance only when not paused
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  const goTo = (index) => {
    setCurrent(index);
    setPaused(true);
    // Resume auto-play after 8s of manual interaction
    setTimeout(() => setPaused(false), 8000);
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="relative bg-[#030303] px-6 py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-5xl" ref={ref}>
        <SectionTitle small="Testimonials" title="Client Love" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-white/[0.08] bg-[#080808] overflow-hidden backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.06),transparent_60%)] pointer-events-none" />

            <div className="flex flex-col md:flex-row">
              {/* ── Image Panel ── */}
              <div className="relative w-full h-[300px] md:h-[450px] bg-[#0a0a0a] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`img-${current}`}
                    src={t.img}
                    alt={t.name}
                    initial={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.04,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 w-full h-full object-contain p-4"
                  />
                </AnimatePresence>

                {/* subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* ── Content Panel ── */}
              
              
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Testimonials;