"use client";

import { useRef, useState, useCallback } from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  magneticPull?: number;
}

export function MagneticButton({
  children,
  magneticPull = 0.3,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current || prefersReducedMotion) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * magneticPull, y: middleY * magneticPull });
    },
    [magneticPull, prefersReducedMotion],
  );

  const reset = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onHoverStart={() => {
        // Promote to compositor layer ONLY during active hover.
        // Using style.willChange avoids the React controlled-style overhead.
        if (ref.current) ref.current.style.willChange = "transform";
      }}
      onHoverEnd={() => {
        // Remove will-change after animation settles — reclaims VRAM.
        if (ref.current) ref.current.style.willChange = "auto";
      }}
      animate={{ x: position.x, y: position.y }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
      }
      className={`relative inline-flex items-center justify-center ${className || ""}`}
      {...props}
    >
      {/* Inner span provides a subtle parallax shift relative to the button */}
      <motion.span
        animate={
          prefersReducedMotion
            ? {}
            : { x: position.x * 0.4, y: position.y * 0.4 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
        }
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
