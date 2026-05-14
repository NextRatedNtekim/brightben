
import { FaDiscord, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── Data ─────────────────────────────────────────────────────────────────────

// stable particles
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 9.1 + 4) % 100}%`,
  top:  `${(i * 13.7 + 6) % 100}%`,
  delay: i * 0.32,
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

// ─── Animated Input ───────────────────────────────────────────────────────────
function Field({ label, id, children, inView, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <label htmlFor={id} className="block text-xs tracking-widest uppercase text-gray-500 mb-2 font-medium">
        {label}
      </label>
      {children}
    </motion.div>
  );
}

const socialLinks = [
  { name: "Twitter", url: "https://x.com/brightben0", icon: FaXTwitter },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/bright-ben-8085112a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: FaLinkedin },
  { name: "Telegram", url: "https://t.me/brightben0", icon: FaTelegram },
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



const Contact = () => {
  const sectionRef = useRef(null);
  const formRef   = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-8%" });
  const formInView   = useInView(formRef,    { once: true, margin: "-6%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 18 });

  const [formData, setFormData]     = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading]   = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });
  const [focused, setFocused]       = useState(null);

  const inputClass = (field) =>
    `w-full px-4 py-3 text-sm bg-white/[0.04] rounded-xl border outline-none transition-all duration-300 placeholder:text-gray-600 text-white ${
      focused === field
        ? "border-[#ffe998]/60 ring-1 ring-[#ffe998]/30 bg-[#ffe998]/5"
        : "border-white/10 hover:border-white/20"
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) throw new Error("EmailJS configuration is missing.");
      await emailjs.send(serviceId, templateId, { ...formData }, publicKey);
      setSubmitStatus({ type: "success", message: "Message sent! I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitStatus({ type: "error", message: err.text || err.message || "Failed to send. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-black text-white"
    >
      {/* Parallax bg glow */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: springBgY }}>
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#95cbfa]/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#95cbfa]/15 rounded-full blur-[80px]" />
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ left: p.left, top: p.top, backgroundColor: "#95cbfa" }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div
            custom={0} variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#95cbfa]/30 bg-white/5 backdrop-blur-md mb-5"
          >
            <Sparkles size={13} className="text-[#95cbfa]" />
            <span className="text-[11px] tracking-widest uppercase text-gray-300">Get in touch</span>
          </motion.div>

          <motion.h2
            custom={1} variants={fadeUp}
            className="text-3xl md:text-5xl font-black leading-tight text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let's build{" "}
            <span className="italic font-normal" style={{ color: "#95cbfa" }}>
              something great.
            </span>
          </motion.h2>

          <motion.p custom={2} variants={fadeUp} className="text-gray-400 leading-relaxed">
            Have a project in mind? Drop me a message and let's make it happen.
          </motion.p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* ── Form ── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-[1px] rounded-3xl"
            style={{
  background:
    "linear-gradient(135deg, rgba(125,211,252,0.2) 0%, transparent 50%, rgba(14,116,144,0.15) 100%)",
}}
          >
            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-7 sm:p-8">
              <h3
                className="text-xl font-black text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Send a Message
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <Field label="Your Name" id="name" inView={formInView} idx={0}>
                  <input
                    id="name" type="text" required placeholder="Ben Bright"
                    value={formData.name}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass("name")}
                  />
                </Field>

                <Field label="Email Address" id="email" inView={formInView} idx={1}>
                  <input
                    id="email" type="email" required placeholder="your@email.com"
                    value={formData.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass("email")}
                  />
                </Field>

                <Field label="Message" id="message" inView={formInView} idx={2}>
                  <textarea
                    id="message" rows={5} required placeholder="Tell me about your project..."
                    value={formData.message}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass("message")} resize-none`}
                  />
                </Field>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="relative w-full overflow-hidden py-3.5 rounded-xl bg-gradient-to-br from-[#95cbfa] to-[#0287fd] text-black text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#0287fd]/20 hover:shadow-[#95cbfa]/35 transition-shadow disabled:opacity-60 cusor-pointer"
                >
                  {/* shimmer */}
                  <motion.span
                    className="absolute inset-0 bg-white/25"
                    initial={{ x: "-100%", skewX: -15 }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />
                  {isLoading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full "
                    />
                  ) : (
                    <>
                      Send Message
                      <Send size={15} />
                    </>
                  )}
                </motion.button>

                {/* Status toast */}
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className={`flex items-center gap-3 p-4 rounded-xl text-sm border ${
                        submitStatus.type === "success"
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}
                    >
                      {submitStatus.type === "success"
                        ? <CheckCircle size={16} />
                        : <AlertCircle size={16} />}
                      <p>{submitStatus.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
        {/* ── Social links ── */}
        <FadeUp delay={0.1}>
          <div className="relative mt-6 flex items-center justify-center gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.02] px-8 py-6 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.06),transparent_60%)]" />

            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative flex flex-col items-center gap-2 text-white/30 hover:text-sky-400 transition-colors duration-300 px-6 py-3 rounded-2xl group"
              >
                {/* hover bg pill */}
                <span className="absolute inset-0 rounded-2xl bg-sky-400/0 group-hover:bg-sky-400/[0.07] transition-colors duration-300" />
                <link.icon size={22} className="relative z-10" />
                <span className="relative z-10 text-[11px] font-medium tracking-wider uppercase">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default Contact;