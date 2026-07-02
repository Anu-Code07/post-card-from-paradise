"use client";

import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
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

const CONFETTI_COLORS = ["#d7c3b0", "#f5f0e6", "#171818", "#c4a882", "#e8d5c4"];

function blastConfettiFromTop() {
  const base = {
    origin: { x: 0.5, y: 0 },
    colors: CONFETTI_COLORS,
    gravity: 1.1,
    ticks: 160,
    zIndex: 9999,
    disableForReducedMotion: true,
  };

  confetti({
    ...base,
    particleCount: 70,
    spread: 100,
    startVelocity: 38,
    scalar: 0.92,
  });

  window.setTimeout(() => {
    confetti({
      ...base,
      particleCount: 45,
      spread: 120,
      startVelocity: 32,
      scalar: 0.8,
    });
  }, 140);
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
    blastConfettiFromTop();

    window.setTimeout(() => {
      setRevealed(true);
      sessionStorage.setItem(storageKey, "1");
    }, 1300);
  }, [opening, revealed, storageKey]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEnvelope();
      }
    },
    [openEnvelope]
  );

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
          <motion.div
            key="sealed"
            role="button"
            tabIndex={0}
            onClick={openEnvelope}
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4 }}
            className="group w-full max-w-md mx-auto cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-2xl"
            aria-label="Open postcard envelope"
          >
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[22rem] sm:max-w-[26rem]">
              <motion.div
                className="absolute inset-0"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-x-[10%] bottom-[14%] top-[22%] rounded-sm shadow-[0_20px_50px_rgba(23,24,24,0.18)] border border-[#b8a088]/45 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(165deg, #e8d5c4 0%, #d7c3b0 48%, #c4aa92 100%)",
                  }}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 h-[38%]"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(160,130,105,0.35) 0%, transparent 100%)",
                      clipPath: "polygon(0 100%, 50% 18%, 100% 100%)",
                    }}
                  />
                </div>

                <div
                  className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-[#9a7b62]/50 flex items-center justify-center shadow-md"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #c45c4a, #8f3d32 70%, #6d2e26)",
                  }}
                >
                  <Mail size={18} className="text-white/90" strokeWidth={2.2} />
                </div>
              </motion.div>
            </div>

            <p className="mt-6 text-center font-serif text-lg text-primary">
              You&apos;ve got mail
            </p>
            <p className="mt-1 text-center text-sm text-on-surface-variant group-hover:text-primary transition-colors">
              Tap the envelope to open your postcard
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            className="relative w-full max-w-md mx-auto aspect-[5/4]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-x-[10%] bottom-[14%] top-[22%] rounded-sm border border-[#b8a088]/40"
              style={{
                background:
                  "linear-gradient(165deg, #e8d5c4 0%, #d7c3b0 45%, #c9b29a 100%)",
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.55, ease: "easeIn" }}
            />

            <motion.div
              className="absolute inset-x-[4%] top-[8%] bottom-[8%] z-10"
              initial={{ y: 56, scale: 0.82, opacity: 0.4 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pointer-events-none">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
