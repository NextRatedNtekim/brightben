import Footer from "../components/footer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

// ── Animation variants 

const logoVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
};

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ctaVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.55, ease: "easeOut" } },
};

const mobileMenuVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: { duration: 0.38, ease: [0.7, 0, 0.84, 0] },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.18 } },
};

// ── Nav links data 

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

// ── Desktop NavLink with animated underline 

function NavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative group text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors duration-300"
    >
      {children}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-white to-white/30 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ width: "100%" }}
      />
    </Link>
  );
}

// ── Main Component 

function Navbar() {
  const navigate = useNavigate();

  // Single source of truth for menu open state
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const rawProgress = useTransform(scrollY, [0, 120], [0, 1]);
  const progress = useSpring(rawProgress, { stiffness: 80, damping: 20 });
  const bgOpacity = useTransform(progress, [0, 1], [0.4, 0.92]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen relative text-white bg-black">

      {/* ── Navbar  */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-black/85 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">

          {/* Hamburger — z-60 so it always floats above the mobile overlay */}
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex flex-col gap-[5px] sm:hidden p-2 -ml-2 z-[60] relative"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-px w-5 bg-white"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-5 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-px w-5 bg-white"
            />
          </button>

          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="select-none"
          >
            <Link
              to="/"
              onClick={closeMenu}
              className="font-serif italic tracking-[0.25em] text-sm text-white/90 hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              PORTFOLIO
            </Link>
          </motion.div>

          {/* Desktop links */}
          <motion.div
            className="hidden sm:flex items-center gap-9"
            variants={linkContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <motion.div key={label} variants={linkVariants}>
                <NavLink to={to}>{label}</NavLink>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA button */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            className="cursor-pointer"
            onClick={() => navigate("/projects")}
          >
            <motion.span
              className="text-[10px] tracking-[0.25em] uppercase border border-white/25 px-5 py-2 rounded-full inline-block text-white/60"
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.65)",
                color: "#ffffff",
                scale: 1.04,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              Projects
            </motion.span>
          </motion.div>

        </div>

        {/* Gradient border bottom — fades in on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            opacity: progress,
          }}
        />
      </motion.nav>

      {/* ── Mobile Menu Overlay ───────────────────────────────────────────── */}
      {/* z-50: sits above page content but below the z-60 hamburger button  */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden fixed inset-0 z-50 flex flex-col"
            style={{
              background: "rgba(0,0,0,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Top accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            />

            {/* Nav links — centred vertically */}
            <nav className="flex flex-col items-center justify-center gap-1 flex-1">
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <Link
                    to={to}
                    onClick={closeMenu}
                    className="group relative flex items-center gap-3 py-4 px-6"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {/* Index number */}
                    <span className="text-[10px] tracking-widest text-white/20 font-mono tabular-nums">
                      0{i + 1}
                    </span>

                    {/* Label */}
                    <span className="text-3xl font-serif italic text-white/80 group-hover:text-white transition-colors duration-300 tracking-wide">
                      {label}
                    </span>

                    {/* Hover arrow */}
                    <motion.span
                      className="text-white/25 text-lg ml-1 group-hover:text-white/60 transition-colors duration-300"
                      initial={{ x: -4, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                    >
                      →
                    </motion.span>
                  </Link>

                  {/* Separator */}
                  {i < NAV_LINKS.length - 1 && (
                    <div className="w-px h-px mx-auto bg-white/8" />
                  )}
                </motion.div>
              ))}

              
            </nav>

            {/* Bottom label */}
            <motion.p
              className="pb-10 text-white/15 text-[9px] tracking-[0.45em] uppercase text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              2026 · Samuel Ntekim
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page content  */}
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Navbar;