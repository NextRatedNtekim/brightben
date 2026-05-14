import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

const DEMO_ITEMS = [
  { id: 1, icon: "🚗", label: "Drive" },
  { id: 2, icon: "📷", label: "Shoot" },
  { id: 3, icon: "🖼️", label: "Gallery" },
  { id: 4, icon: "🎸", label: "Play" },
  { id: 5, icon: "😎", label: "Explore" },
  { id: 6, icon: "🏠", label: "Home" },
  { id: 7, icon: "✨", label: "Magic" },
];

const CARD_WIDTH = 68;
const CARD_HEIGHT = 88;
const SPREAD = 108;
const PAUSE_MS = 900;

export default function FanScrollGallery({ items = DEMO_ITEMS }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 55, damping: 18 });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    smoothProgress.on("change", (v) => setActiveIndex(Math.round(v)));
  }, [smoothProgress]);

  useEffect(() => {
    if (!isInView) return;

    const total = items.length - 1;
    let cancelled = false;

    const runCycle = async () => {
      while (!cancelled) {
        await animate(progress, total, {
          duration: 8,
          ease: "easeInOut",
        });
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, PAUSE_MS));
        await animate(progress, 0, {
          duration: 8,
          ease: "easeInOut",
        });
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, PAUSE_MS));
      }
    };

    runCycle();

    return () => {
      cancelled = true;
    };
  }, [isInView, items.length, progress]);

  const handleCardClick = (index) => {
    animate(progress, index, { duration: 0.5, ease: "easeOut" });
  };

  const total = items.length;
  const centerIndex = (total - 1) / 2;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 120,
        overflow: "visible",
      }}
    >
      {items.map((item, index) => (
        <FanCard
          key={item.id}
          item={item}
          index={index}
          total={total}
          centerIndex={centerIndex}
          progress={smoothProgress}
          isActive={activeIndex === index}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </section>
  );
}

function FanCard({ item, index, centerIndex, progress, isActive, onClick }) {
  const rotate = useTransform(progress, (value) => {
    const norm = (index - value) / Math.max(centerIndex, 1);
    return norm * 20;
  });

  const translateY = useTransform(progress, (value) => {
    const norm = (index - value) / Math.max(centerIndex, 1);
    return norm * norm * 55;
  });

  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(index - value);
    return Math.max(0, 1 - distance / 3.2);
  });

  const scale = useTransform(progress, (value) => {
    const distance = Math.abs(index - value);
    return Math.max(0.8, 1 - distance * 0.065);
  });

  const x = (index - centerIndex) * SPREAD - CARD_WIDTH / 2;

  return (
    <motion.div
      onClick={onClick}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginTop: -CARD_HEIGHT / 2,
        x,
        y: translateY,
        rotate,
        opacity,
        scale,
        transformOrigin: "center bottom",
        zIndex: useTransform(progress, (v) =>
          Math.round(100 - Math.abs(index - v) * 10)
        ),
        cursor: "pointer",
        borderRadius: 10,
        border: isActive
          ? "0.5px solid rgba(0,0,0,0.25)"
          : "0.5px solid rgba(0,0,0,0.1)",
        background: "var(--color-background-primary, #fff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        userSelect: "none",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span
        style={{
          fontSize: 22,
          lineHeight: 1,
          filter: isActive ? "none" : "grayscale(0.4) opacity(0.7)",
          transition: "filter 0.3s ease",
        }}
      >
        {item.icon}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: isActive
            ? "var(--color-text-primary, #111)"
            : "var(--color-text-tertiary, #999)",
          transition: "color 0.3s ease",
        }}
      >
        {item.label}
      </span>
    </motion.div>
  );
}