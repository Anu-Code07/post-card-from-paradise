"use client";

import { LayoutPhoto } from "./LayoutPhoto";
import { cn } from "@/lib/utils";

interface BackCenterPhotoProps {
  imageUrl: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "max-w-[55%] max-h-[45%]",
  md: "max-w-[65%] max-h-[55%]",
  lg: "max-w-[75%] max-h-[65%]",
};

/** Optional centered photo on the back — crisp glass frame, no backdrop blur */
export function BackCenterPhoto({ imageUrl, className, size = "md" }: BackCenterPhotoProps) {
  if (!imageUrl) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none z-[1]",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] w-full rounded-sm overflow-hidden",
          "border border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.1)]",
          "ring-1 ring-inset ring-white/30",
          SIZE[size]
        )}
      >
        <LayoutPhoto src={imageUrl} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/5" />
      </div>
    </div>
  );
}
