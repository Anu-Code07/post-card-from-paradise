"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BrandHeroStamp } from "./BrandHeroStamp";
import { BRAND_BYLINE, BRAND_NAME } from "@/lib/brand";
import { STYLES, STYLE_CLASSES } from "@/lib/styles";
import type { PostcardStyle } from "@/lib/types";
import { DESTINATIONS } from "@/lib/destinations";
import { cn } from "@/lib/utils";

/** Curated moods for hero — not all 15 */
const HERO_STYLE_IDS: PostcardStyle[] = [
  "retro",
  "vintage",
  "nordic",
  "golden",
  "cinematic",
  "coastal",
];

const HERO_STYLES = HERO_STYLE_IDS.map((id) => STYLES.find((s) => s.id === id)!);

const STACK = [
  { key: "left" as const, rotate: -4, x: -18, y: 4, z: 1, scale: 0.88 },
  { key: "center" as const, rotate: 0, x: 0, y: 0, z: 3, scale: 1 },
  { key: "right" as const, rotate: 4, x: 18, y: 4, z: 2, scale: 0.9 },
] as const;

interface HeroImageSet {
  center: { url: string; alt: string };
  left: { url: string; alt: string };
  right: { url: string; alt: string };
}

interface HeroSectionProps {
  ctaHref: string;
  heroImages: HeroImageSet;
}

function EditorialHeroCard({
  image,
  styleConfig,
  styleLabel,
}: {
  image: string;
  styleConfig: (typeof STYLE_CLASSES)[PostcardStyle];
  styleLabel: string;
}) {
  return (
    <div className="relative w-full h-full paper-bento paper-bento--linen rounded-lg p-3 sm:p-4 flex flex-col shadow-none border-primary/20">
      <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-center font-sans font-semibold text-primary/80 mb-2 sm:mb-3 shrink-0">
        A postcard from paradise
      </p>

      <div className="relative flex-1 min-h-0 mx-0.5 sm:mx-1 border border-primary overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          className={cn("object-cover transition-all duration-700", styleConfig.filter)}
          priority
          sizes="(max-width: 640px) 70vw, 280px"
        />
        <div className={cn("absolute inset-0 transition-all duration-700", styleConfig.overlay)} />
      </div>

      <div className="flex items-end justify-between gap-2 mt-2 sm:mt-3 px-0.5 shrink-0">
        <div>
          <p className="text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-on-surface-variant mb-0.5">
            {styleLabel}
          </p>
          <p className="font-bebas text-2xl sm:text-[1.75rem] leading-none tracking-wide text-primary">
            PARADISE
          </p>
        </div>
        <div
          className={cn(
            "w-9 h-11 sm:w-10 sm:h-12 border-2 border-dashed rounded-full flex items-center justify-center bg-[#f5f0e6] shrink-0",
            styleConfig.stamp
          )}
        >
          <span className="text-[6px] sm:text-[7px] font-bold text-primary/80 text-center leading-tight rotate-[-12deg] uppercase">
            Air
            <br />
            Mail
          </span>
        </div>
      </div>

      <span className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 text-[6px] sm:text-[7px] tracking-[0.2em] uppercase text-primary/40 font-sans select-none pointer-events-none">
        {BRAND_NAME}
      </span>
      <span className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-[6px] sm:text-[7px] tracking-[0.15em] uppercase text-primary/40 font-sans select-none pointer-events-none max-h-[55%] truncate">
        {BRAND_BYLINE}
      </span>
    </div>
  );
}

export function HeroSection({ ctaHref, heroImages }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const style = HERO_STYLES[activeIndex];
  const styleConfig = STYLE_CLASSES[style.id];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 22,
  });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 22,
  });

  const cycleNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % HERO_STYLES.length);
  }, []);

  const cyclePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + HERO_STYLES.length) % HERO_STYLES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(cycleNext, 4500);
    return () => clearInterval(id);
  }, [cycleNext]);

  const handleMove = useCallback(
    (clientX: number, clientY: number, el: HTMLDivElement) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((clientX - rect.left) / rect.width - 0.5);
      mouseY.set((clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const stackScale = useMemo(
    () => ({ mobile: "w-[68%] max-w-[220px]", desktop: "sm:w-[58%] sm:max-w-[280px]" }),
    []
  );

  return (
    <section className="relative overflow-x-clip overflow-y-visible">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-[min(520px,90vw)] h-[min(520px,90vw)] rounded-full bg-secondary-container/45 blur-[100px]"
          animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 hero-grain opacity-[0.28]" />
      </div>

      <div className="container-app relative pt-10 pb-6 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 lg:items-center">
          {/* Postcard stack — first on mobile for visual punch, second on desktop */}
          <motion.div
            className="order-1 lg:order-2 flex flex-col items-center gap-4 sm:gap-6 w-full max-w-md mx-auto lg:max-w-none mt-1 sm:mt-0"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="relative h-[min(54vw,300px)] sm:h-[340px] lg:h-[min(440px,48vh)] w-full px-2 pt-8 pb-3 sm:pt-2 sm:px-0 lg:pt-0"
              style={{ perspective: 1200 }}
              onPointerMove={(e) => handleMove(e.clientX, e.clientY, e.currentTarget)}
              onPointerLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
              }}
            >
              <motion.div
                className="absolute inset-x-0 inset-y-2 sm:inset-y-0 flex items-center justify-center"
                style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
              >
                {STACK.map((card, i) => {
                  const isCenter = card.key === "center";
                  const image = heroImages[card.key].url;
                  return (
                    <motion.div
                      key={i}
                      className={cn(
                        "absolute aspect-[4/5]",
                        stackScale.mobile,
                        stackScale.desktop,
                        isCenter ? "z-30" : "z-10"
                      )}
                      animate={{
                        x: card.x,
                        y: card.y,
                        rotate: card.rotate,
                        scale: card.scale,
                      }}
                      transition={{ type: "spring", stiffness: 90, damping: 20 }}
                      style={{ translateZ: card.z * 16 }}
                    >
                      {isCenter ? (
                        <div className="relative w-full h-full postcard-shadow-lg">
                          <EditorialHeroCard
                            image={image}
                            styleConfig={styleConfig}
                            styleLabel={style.label}
                          />
                        </div>
                      ) : (
                        <div className="relative w-full h-full paper-bento paper-bento--stone rounded-lg overflow-hidden opacity-85 postcard-shadow">
                          <Image
                            src={image}
                            alt={heroImages[card.key].alt}
                            fill
                            className="object-cover grayscale-[0.35] sepia-[0.15]"
                            sizes="200px"
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <motion.div
              className="w-[min(100%,17rem)] sm:w-[min(100%,19rem)] shrink-0"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="paper-link-pill flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span className="text-on-surface-variant font-mono truncate">
                  paperstories/p/<span className="text-primary font-medium">your-link</span>
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Copy + CTAs */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left pt-2 sm:pt-0"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="hidden sm:block">
              <BrandHeroStamp />
            </div>

            <h1 className="text-[clamp(2rem,7.5vw,3.75rem)] font-serif text-primary leading-[1.08] tracking-tight mb-4 sm:mb-5">
              Send a{" "}
              <span className="relative inline-block">
                <span className="italic">memory</span>
                <motion.span
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] sm:h-[3px] bg-secondary-container rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </span>
              <br />
              not just a message.
            </h1>

            <p className="text-sm sm:text-body-lg text-on-surface-variant max-w-md mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              Upload a photo, pick an editorial style, write your note — then share
              a beautiful postcard link with anyone, anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 sm:mb-9">
              <Link
                href={ctaHref}
                className="group inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-7 py-3.5 sm:px-8 sm:py-4 rounded-lg font-medium hover:opacity-90 active:scale-[0.98] transition-all w-full sm:w-auto"
              >
                Start Creating
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 rounded-lg border border-primary/15 text-primary font-medium hover:bg-surface-container transition-colors active:scale-[0.98] w-full sm:w-auto"
              >
                View Gallery
              </Link>
            </div>

            {/* Compact style picker — swatches + label, not 15 pills */}
            <div className="max-w-md mx-auto lg:mx-0">
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">
                Preview a mood
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={cyclePrev}
                  aria-label="Previous style"
                  className="tap-target w-9 h-9 rounded-full paper-chip flex items-center justify-center text-primary hover:bg-surface-container/80 transition-colors shrink-0"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none px-0.5 py-1">
                  {HERO_STYLES.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-label={`${s.label} style`}
                      aria-pressed={i === activeIndex}
                      className={cn(
                        "mood-swatch shrink-0 touch-manipulation w-9 h-9 sm:w-10 sm:h-10",
                        i === activeIndex ? "mood-swatch--active" : "mood-swatch--idle"
                      )}
                    >
                      <div className={cn("mood-swatch-inner bg-gradient-to-br", s.swatch)} />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={cycleNext}
                  aria-label="Next style"
                  className="tap-target w-9 h-9 rounded-full paper-chip flex items-center justify-center text-primary hover:bg-surface-container/80 transition-colors shrink-0"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <motion.p
                key={style.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-on-surface-variant text-center lg:text-left"
              >
                <span className="font-medium text-primary">{style.label}</span>
                <span className="text-on-surface-variant/60"> · {style.era}</span>
                <span className="hidden sm:inline"> — {style.description}</span>
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-y border-primary/5 bg-surface-container-low/50 py-2.5 sm:py-3">
        <Marquee speed={35} gradient={false} pauseOnHover>
          {DESTINATIONS.map((city) => (
            <span
              key={city}
              className="text-label-sm text-on-surface-variant/70 flex items-center gap-8 mx-4"
            >
              {city}
              <span className="text-secondary-container">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
