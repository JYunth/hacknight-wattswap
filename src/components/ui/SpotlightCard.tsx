import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.15)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={divRef}
      className={`relative rounded-3xl border border-neutral-800 bg-[#1E1E24] overflow-hidden p-8 shadow-xl transition-all ${className}`}
    >
      {/* Infinite Moving Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${spotlightColor}, transparent 80%)`,
            `radial-gradient(circle at 80% 70%, ${spotlightColor}, transparent 80%)`,
            `radial-gradient(circle at 50% 50%, ${spotlightColor}, transparent 80%)`,
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {children}

      {/* Floating Animated Particles */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full opacity-50"
        animate={{
          x: ["0%", "40%", "0%"],
          y: ["0%", "-30%", "0%"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "10%", top: "12%" }}
      />

      <motion.div
        className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-40"
        animate={{
          x: ["0%", "-50%", "0%"],
          y: ["0%", "40%", "0%"],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: "15%", bottom: "20%" }}
      />

      <motion.div
        className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-30"
        animate={{
          x: ["0%", "30%", "-30%", "0%"],
          y: ["0%", "-20%", "30%", "0%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "30%", top: "25%" }}
      />
    </div>
  );
};

export default SpotlightCard;
