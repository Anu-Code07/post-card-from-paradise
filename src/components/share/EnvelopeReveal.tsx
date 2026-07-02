"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface EnvelopeRevealProps {
  slug: string;
  senderName: string;
  children: ReactNode;
  className?: string;
}

const CONFETTI_COLORS = ["#d7c3b0", "#f5f0e6", "#171818", "#c4a882", "#e8d5c4"];

const POCKET_CLASS =
  "absolute inset-x-[10%] bottom-[14%] top-[30%] rounded-sm shadow-[0_20px_50px_rgba(23,24,24,0.18)] border border-[#b8a088]/45";

const POCKET_BG =
  "linear-gradient(165deg, #e8d5c4 0%, #d7c3b0 48%, #c4aa92 100%)";

const FLAP_BG =
  "linear-gradient(180deg, #efe0d2 0%, #dcc7b5 55%, #cdb59f 100%)";

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

function EnvelopeFromLabel({ name }: { name: string }) {
  const displayName = name.length > 22 ? `${name.slice(0, 20)}…` : name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-[51%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-[82%] max-w-[15rem]"
    >
      <div
        className="relative mx-auto rounded-[2rem] px-5 py-4 sm:px-7 sm:py-5 border border-[#c4a882]/25"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 38%, rgba(255,252,248,0.72) 0%, rgba(245,232,218,0.35) 55%, transparent 100%)",
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -3px 12px rgba(120,88,62,0.1), 0 8px 24px rgba(61,38,24,0.08)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-2 rounded-[1.5rem] border border-dashed border-[#b8956f]/20"
        />

        <div className="relative flex items-center justify-center gap-2.5 sm:gap-3 mb-1.5">
          <span className="h-px w-7 sm:w-9 bg-gradient-to-r from-transparent via-[#a08060]/55 to-[#c4a882]/35" />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.42em] text-[#8b6a52] font-sans font-semibold pl-[0.42em]">
            from
          </span>
          <span className="h-px w-7 sm:w-9 bg-gradient-to-l from-transparent via-[#a08060]/55 to-[#c4a882]/35" />
        </div>

        <p
          className="font-parisienne text-[clamp(1.85rem,8.5vw,2.5rem)] leading-[0.95] text-center text-[#3a2418] -rotate-[2.5deg] group-hover:rotate-[-1deg] transition-transform duration-500"
          style={{
            textShadow:
              "0 1px 0 rgba(255,255,255,0.45), 0 2px 8px rgba(58,36,24,0.12)",
          }}
        >
          {displayName}
        </p>

        <div aria-hidden className="mt-2 flex items-center justify-center gap-1.5 opacity-70">
          <span className="h-px w-3 bg-[#b8956f]/35" />
          <span className="w-1 h-1 rotate-45 border border-[#a08060]/45" />
          <span className="h-px w-3 bg-[#b8956f]/35" />
        </div>
      </div>
    </motion.div>
  );
}

export function EnvelopeReveal({ slug, senderName, children, className }: EnvelopeRevealProps) {
  const storageKey = `postcard-envelope-${slug}`;
  const [revealed, setRevealed] = useState(false);
  const [opening, setOpening] = useState(false);
  const [skipRevealEntrance, setSkipRevealEntrance] = useState(false);
  const revealTriggered = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === "1") {
      setRevealed(true);
    }
  }, [storageKey]);

  const finishReveal = useCallback(() => {
    if (revealTriggered.current) return;
    revealTriggered.current = true;
    setSkipRevealEntrance(true);
    setRevealed(true);
    sessionStorage.setItem(storageKey, "1");
  }, [storageKey]);

  const openEnvelope = useCallback(() => {
    if (opening || revealed) return;
    setOpening(true);
    blastConfettiFromTop();
  }, [opening, revealed]);

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
        initial={skipRevealEntrance ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn("relative w-full flex flex-col items-center group", className)}>
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
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="group w-full max-w-md mx-auto cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-2xl"
            aria-label="Open postcard envelope"
          >
            <div
              className="relative mx-auto aspect-[5/4] w-full max-w-[22rem] sm:max-w-[26rem]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className={POCKET_CLASS} style={{ background: POCKET_BG }} />

                <div
                  className="absolute inset-x-[10%] top-[22%] h-[50%] z-20"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: FLAP_BG,
                    boxShadow: "inset 0 -3px 10px rgba(0,0,0,0.06)",
                    transformOrigin: "top center",
                  }}
                />

                <EnvelopeFromLabel name={senderName} />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="opening"
            className="relative w-full max-w-md mx-auto aspect-[5/4] overflow-hidden"
            style={{ perspective: 1400 }}
          >
            <motion.div
              className={cn(POCKET_CLASS, "border-[#b8a088]/40")}
              style={{ background: POCKET_BG }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.45, duration: 0.5, ease: "easeIn" }}
            />

            <motion.div
              className="absolute inset-x-[10%] top-[22%] h-[50%] z-20"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: FLAP_BG,
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              initial={{ rotateX: 0, opacity: 1 }}
              animate={{ rotateX: -165, opacity: 0 }}
              transition={{
                rotateX: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
                opacity: { delay: 0.22, duration: 0.28, ease: "easeIn" },
              }}
            />

            <motion.div
              className="absolute inset-x-[4%] top-[10%] bottom-[6%] z-30"
              initial={{ y: 48, scale: 0.84, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={finishReveal}
            >
              <div className="pointer-events-none">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!opening && !revealed && (
          <motion.div
            key="envelope-cta"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, height: 0, marginTop: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full overflow-hidden"
          >
            <p className="mt-6 text-center font-serif text-lg text-primary">
              You&apos;ve got mail
            </p>
            <p className="mt-1 text-center text-sm text-on-surface-variant group-hover:text-primary transition-colors">
              Tap the envelope to open your postcard
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
