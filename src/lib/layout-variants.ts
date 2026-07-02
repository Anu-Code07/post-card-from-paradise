import { cva } from "class-variance-authority";
import type { PostcardLayout } from "./types";

/** Layout shell styles — each layout is its own "frame" aesthetic */
export const layoutShell = cva("relative w-full", {
  variants: {
    layout: {
      editorial: "rounded-md shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
      polaroid:
        "bg-white p-3 sm:p-4 pb-10 sm:pb-12 shadow-[0_8px_32px_rgba(0,0,0,0.14)]",
      journal: "rounded-sm border border-primary/10 shadow-md",
      scrapbook: "rounded-sm shadow-lg",
      vintage: "rounded-sm shadow-[inset_0_0_60px_rgba(139,115,85,0.08)]",
      story: "rounded-xl overflow-hidden shadow-2xl",
    },
  },
  defaultVariants: { layout: "editorial" },
});

export function layoutShellClass(layout: PostcardLayout) {
  return layoutShell({ layout });
}
