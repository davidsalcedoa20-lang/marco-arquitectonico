"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & Omit<MotionProps, "children">;

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  ...rest
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.75, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
