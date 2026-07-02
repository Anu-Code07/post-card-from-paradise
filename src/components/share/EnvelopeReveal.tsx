"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnvelopeRevealProps {
  slug: string;
  children: ReactNode;
  className?: string;
}

export function EnvelopeReveal({ slug, children, className }: EnvelopeRevealProps) {
  const storageKey = `postcard-envelope-${slug}`;
  const [revealed, setRevealed] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === "1") {
      setRevealed(true);
    }
  }, [storageKey]);

  const openEnvelope = useCallback(() => {
    if (opening || revealed) return;
    setOpening(true);

    confetti({
      particleCount: 48,
      spread: 72,
      startVelocity: 28,
      origin: { y: 0.62, x: 0.5 },
      colors: ["#d7c3b0", "#f5f0e6", "#171818", "#c4a882"],
      ticks: 120,
      gravity: 0.9,
      scalar: 0.85,
    });

    window.setTimeout(() => {
      setRevealed(true);
      sessionStorage.setItem(storageKey, "1");
    }, 1300);
  }, [opening, revealed, storageKey]);

  if (revealed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn("relative w-full flex flex-col items-center", className)}>
      <AnimatePresence mode="wait">
        {!opening ? (
          <motion.button
            key="sealed"
            type="button"
            onClick={openEnvelope}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4 }}
            className="group w-full max-w-md mx-auto text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-2xl"
            aria-label="Open postcard envelope"
          >
            <div
              className="relative mx-auto aspect-[4/3] w-full max-w-[22rem] sm:max-w-[26rem]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                  <div
                    className="absolute inset-x-[8%] bottom-[12%] top-[28%] rounded-sm shadow-[0_20px_50px_rgba(23,24,24,0.18)] border border-[#b8a088]/40"
                    style={{
                      background:
                        "linear-gradient(165deg, #e8d5c4 0%, #d7c3b0 45%, #c9b29a 100%)",
                    }}
                  />

                  <div
                    className="absolute inset-x-[10%] bottom-[14%] top-[30%] overflow-hidden rounded-sm opacity-90"
                    style={{ transform: "translateZ(1px)" }}
                  >
                    <div className="w-full h-full scale-[0.72] origin-top opacity-80 pointer-events-none blur-[0.3px]">
                      {children}
                    </div>
                  </div>

                  <div
                    className="absolute inset-x-[8%] bottom-[12%] h-[42%] rounded-b-sm"
                    style={{
                      background:
                        "linear-gradient(0deg, #c4aa92 0%, #d7c3b0 70%, transparent 100%)",
                      clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                      transform: "translateZ(8px)",
                    }}
                  />

                  <motion.div
                    className="absolute inset-x-[8%] top-[12%] h-[46%] origin-top"
                    style={{
                      transformStyle: "preserve-3d",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(180deg, #efe0d2 0%, #dcc7b5 55%, #cdb59f 100%)",
                      boxShadow: "inset 0 -2px 8px rgba(0,0,0,0.06)",
                    }}
                    animate={{ rotateX: [0, -4, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div
                    className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border-2 border-[#9a7b62]/50 flex items-center justify-center shadow-md"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 30%, #c45c4a, #8f3d32 70%, #6d2e26)",
                    }}
                  >
                    <Mail size={16} className="text-white/90" strokeWidth={2.2} />
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="mt-6 text-center font-serif text-lg text-primary">
              You&apos;ve got mail
            </p>
            <p className="mt-1 text-center text-sm text-on-surface-variant group-hover:text-primary transition-colors">
              Tap the envelope to open your postcard
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="opening"
            className="relative w-full max-w-md mx-auto aspect-[4/3] max-w-[26rem]"
            style={{ perspective: 1400 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                className="absolute inset-x-[8%] bottom-[12%] top-[28%] rounded-sm border border-[#b8a088]/40"
                style={{
                  background:
                    "linear-gradient(165deg, #e8d5c4 0%, #d7c3b0 45%, #c9b29a 100%)",
                }}
                animate={{ scale: [1, 1.02, 0.98], opacity: [1, 1, 0] }}
                transition={{ duration: 1.2, times: [0, 0.35, 1] }}
              />

              <motion.div
                className="absolute inset-x-[8%] top-[12%] h-[46%] origin-top z-10"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background:
                    "linear-gradient(180deg, #efe0d2 0%, #dcc7b5 55%, #cdb59f 100%)",
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -168 }}
                transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
              />

              <motion.div
                className="absolute inset-x-[6%] bottom-[8%] top-[18%] z-20"
                initial={{ y: 40, scale: 0.78, opacity: 0.5 }}
                animate={{ y: -20, scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pointer-events-none">{children}</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
