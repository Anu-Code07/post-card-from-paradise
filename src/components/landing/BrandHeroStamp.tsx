"use client";

import { motion } from "framer-motion";
import { BRAND_BYLINE, BRAND_NAME } from "@/lib/brand";

export function BrandHeroStamp() {
  return (
    <motion.div
      className="relative inline-flex mb-5 sm:mb-7 mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 12, rotate: -6 }}
      animate={{ opacity: 1, y: 0, rotate: -2.5 }}
      transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ rotate: 0, y: -2 }}
    >
      {/* washi tape */}
      <div className="layout-washi absolute -top-2.5 left-1/2 -translate-x-1/2 w-[4.5rem] h-4 opacity-95 -rotate-2 z-20 pointer-events-none" />

      <div className="relative paper-bento paper-bento--linen rounded-xl px-4 py-3 sm:px-5 sm:py-4 min-w-[15rem] sm:min-w-[17rem]">
        <div className="flex items-stretch gap-3 sm:gap-4">
          {/* circular postmark */}
          <motion.div
            className="relative w-12 h-12 sm:w-[3.25rem] sm:h-[3.25rem] shrink-0 self-center"
            animate={{ rotate: [0, 3, 0, -3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 bg-secondary-container/40" />
            <div className="absolute inset-[3px] rounded-full border border-primary/15" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/75">
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.12em] leading-none">
                Air
              </span>
              <span className="text-[7px] sm:text-[8px] uppercase tracking-widest leading-none mt-0.5">
                Mail
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center text-left border-l border-primary/10 pl-3 sm:pl-4 min-w-0">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-on-surface-variant/80 font-sans">
              Welcome to
            </p>
            <p className="font-serif text-lg sm:text-xl font-bold text-primary leading-tight tracking-tight mt-0.5">
              {BRAND_NAME}
            </p>
            <p className="font-caveat text-base sm:text-lg text-secondary leading-tight mt-0.5">
              {BRAND_BYLINE}
            </p>
          </div>
        </div>

        {/* corner perforations */}
        <div className="absolute top-2 right-2 flex gap-0.5 opacity-25 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-primary" />
          ))}
        </div>

        {/* dated postmark */}
        <motion.div
          className="absolute -right-1.5 -bottom-2 w-11 h-11 rounded-full border border-primary/25 flex items-center justify-center bg-[#f8f4ec]/90 rotate-[14deg] pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 18 }}
        >
          <span className="text-[6px] uppercase tracking-wider text-center leading-tight text-primary font-sans">
            Posted
            <br />
            2026
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
