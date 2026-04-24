import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Factory, X, Lamp, MessageCircle, Sparkles, ArrowUpRight, Heart } from "lucide-react";
import { FaTwitter, FaGithub, FaLinkedin, FaWhatsapp, FaArrowRight, FaHeart} from "react-icons/fa"
import { IoSparkles } from "react-icons/io5";

import Background from "../assets/bg-2.jpg"

// Social links 
const socials = [
  { icon: FaGithub,        label: "GitHub",    href: "#" },
  { icon: FaTwitter,       label: "Twitter",   href: "#" },
  { icon: FaLinkedin,      label: "LinkedIn",  href: "#" },
  { icon: FaWhatsapp, label: "WhatsApp",  href: "#" },
];


const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

//  Footer
export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-black text-white border-t border-white/[0.06]"
    >
      <div
          // style={{ scale: springScale, filter: blurFilter }}
          className="absolute inset-0 will-change-transform origin-center opacity-20"
        >
          <img
        src={Background}
        alt="Samuel Ntekim"
        className="w-full h-full object-cover"
      />

        </div>
      

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] bg-[#ffe998]/6 blur-[90px] rounded-full pointer-events-none" />
      
      {/* Thin gold top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-px bg-gradient-to-r from-transparent via-[#ffe998]/60 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">

        {/*  Top row  */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12"
        >
          {/* Brand */}
          <motion.div custom={0} variants={fadeUp} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <IoSparkles size={15} className="text-[#ffe998]" />
              <span
                className="text-2xl font-black tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Samuel <span style={{ color: "#ffe998" }}>Ntekim</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-[220px] leading-relaxed">
              Frontend engineer building fast, beautiful, and user-centred web experiences.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.a
            custom={2} variants={fadeUp}
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-gradient-to-br from-[#ffe998] to-[#57370d] shadow-lg shadow-[#ffe998]/15 hover:shadow-[#ffe998]/30 transition-shadow whitespace-nowrap"
          >
            <motion.span
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ x: "-100%", skewX: -15 }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            Hire Me
            <FaArrowRight size={13} />
          </motion.a>
        </motion.div>

        {/*  Divider  */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="w-full h-px bg-gradient-to-r from-[#ffe998]/30 via-white/10 to-transparent mb-8"
        />

        {/*  Bottom row  */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row justify-between items-center gap-5"
        >
          {/* Copyright */}
          <motion.p custom={3} variants={fadeUp} className="text-xs text-gray-600 order-2 sm:order-1">
            © {new Date().getFullYear()} Samuel Ntekim. All rights reserved.
          </motion.p>

          {/* Built with */}
          <motion.p
            custom={4} variants={fadeUp}
            className="text-xs text-gray-600 flex items-center gap-1.5 order-3 sm:order-2"
          >
            Built with React, Tailwind & 
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <FaHeart size={11} className="text-[#ffe998] fill-[#ffe998]" />
            </motion.span>
          </motion.p>

          {/* Social icons */}
          <motion.div custom={5} variants={fadeUp} className="flex items-center gap-3 order-1 sm:order-3">
            {socials.map(({ icon: Icon, label, href }, i) => (
              <motion.a
                key={i}
                href={href}
                aria-label={label}
                whileHover={{ y: -3, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-500 hover:text-[#ffe998] hover:border-[#ffe998]/30 hover:bg-[#ffe998]/8 transition-colors duration-300"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}