"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  flipped: boolean;
  aspectClass: string;
  maxWidthClass?: string;
  shellClass?: string;
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /** swap = instant face toggle (editor); flip = 3D animation (share view) */
  mode?: "flip" | "swap";
  cornerClass?: string;
  shadowClass?: string;
}

export function FlipCard({
  flipped,
  aspectClass,
  maxWidthClass,
  shellClass,
  front,
  back,
  className,
  mode = "flip",
  cornerClass = "rounded-md",
  shadowClass = "postcard-shadow-lg border border-primary/10",
}: FlipCardProps) {
  const faceClass = cn(
    "absolute inset-0 w-full h-full overflow-hidden bg-white",
    cornerClass,
    shadowClass
  );

  if (mode === "swap") {
    return (
      <div className={cn("w-full", shellClass, className)}>
        <div className={cn("relative w-full", aspectClass, maxWidthClass)}>
          <div className={faceClass}>{flipped ? back : front}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", shellClass, className)} style={{ perspective: 1400 }}>
      <motion.div
        className={cn("relative w-full", aspectClass, maxWidthClass)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={faceClass}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg) translateZ(1px)",
          }}
        >
          {front}
        </div>
        <div
          className={faceClass}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
