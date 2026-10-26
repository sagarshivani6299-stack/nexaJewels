
import { motion } from "framer-motion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const offsets = {
    up: { x: 0, y: 35 },
    down: { x: 0, y: -35 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
