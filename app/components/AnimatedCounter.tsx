"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const [mounted, setMounted] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    setMounted(true);
    const controls = animate(count, value, { duration });
    return () => controls.stop();
  }, [value, duration, count]);

  if (!mounted) return <span>0</span>;

  return (
    <motion.span
      style={{ fontSize: 48, color: "#4f46e5" }}
      className={className}
    >
      {rounded}
    </motion.span>
  );
}
