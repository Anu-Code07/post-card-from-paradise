import type { PostcardVignette } from "@/lib/types";
import { cn } from "@/lib/utils";

export const VIGNETTE_STYLES: Record<
  PostcardVignette,
  { label: string; description: string; className: string }
> = {
  none: {
    label: "None",
    description: "Clean edges",
    className: "",
  },
  soft: {
    label: "Soft",
    description: "Gentle edge fade",
    className:
      "bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.4)_100%)]",
  },
  moody: {
    label: "Moody",
    description: "Dramatic dark corners",
    className:
      "bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.62)_100%)]",
  },
};

interface PhotoEffectsProps {
  vignette?: PostcardVignette;
  grain?: boolean;
  styleGrain?: string;
  className?: string;
}

export function PhotoEffects({
  vignette = "none",
  grain = false,
  styleGrain,
  className,
}: PhotoEffectsProps) {
  const vignetteStyle = VIGNETTE_STYLES[vignette];

  return (
    <>
      {vignette !== "none" && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-[1]",
            vignetteStyle.className,
            className
          )}
        />
      )}
      {(grain || styleGrain) && (
        <div
          className={cn(
            "absolute inset-0 hero-grain pointer-events-none z-[1] mix-blend-overlay",
            grain ? "opacity-[0.18]" : styleGrain
          )}
        />
      )}
    </>
  );
}
