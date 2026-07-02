"use client";

import { useCallback, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { Hand, RotateCcw } from "lucide-react";
import type { PostcardFont, PostcardLayout, PostcardStyle, PostcardTweaks, PostcardVignette } from "@/lib/types";
import { CORNER_CLASS, DEFAULT_TWEAKS, SHADOW_CLASS, TEXT_FX_CLASS } from "@/lib/customization";
import { getFontClass } from "@/lib/fonts";
import {
  DEFAULT_POSITIONS,
  LAYOUT_ASPECT,
  LAYOUT_MAX_WIDTH,
} from "@/lib/layouts";
import { layoutShellClass } from "@/lib/layout-variants";
import { STYLE_CLASSES } from "@/lib/styles";
import { useImagePalette } from "@/hooks/useImagePalette";
import { activePalette } from "@/lib/palettes";
import type { PostcardColorMode } from "@/lib/types";
import { FlipCard } from "@/components/motion/FlipCard";
import { DraggablePercent } from "@/components/motion/DraggablePercent";
import { PostcardFront } from "./layouts/PostcardFront";
import { PostcardBack } from "./layouts/PostcardBack";
import { cn } from "@/lib/utils";

export interface PostcardPreviewProps {
  imageUrl: string | null;
  title: string;
  location: string;
  message: string;
  style: PostcardStyle;
  layout?: PostcardLayout;
  font?: PostcardFont;
  className?: string;
  size?: "default" | "large";
  editable?: boolean;
  flippable?: boolean;
  flipped?: boolean;
  onFlip?: () => void;
  titleX?: number;
  titleY?: number;
  locationX?: number;
  locationY?: number;
  onTitleChange?: (value: string) => void;
  onLocationChange?: (value: string) => void;
  onMessageChange?: (value: string) => void;
  onTitlePositionChange?: (x: number, y: number) => void;
  onLocationPositionChange?: (x: number, y: number) => void;
  backImageUrl?: string | null;
  onBackImageChange?: (url: string | null, file: File | null) => void;
  colorMode?: PostcardColorMode;
  vignette?: PostcardVignette;
  grain?: boolean;
  tweaks?: PostcardTweaks;
}

const editableClass =
  "bg-transparent border-0 outline-none placeholder:text-white/60 focus:ring-0 focus:bg-white/10 rounded px-1 min-w-[4rem]";

const textShadow = "drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]";

export function PostcardPreview({
  imageUrl,
  title,
  location,
  message,
  style,
  layout = "editorial",
  font = "caslon",
  className,
  size = "default",
  editable = false,
  flippable = false,
  flipped: flippedProp,
  onFlip,
  titleX: titleXProp,
  titleY: titleYProp,
  locationX: locationXProp,
  locationY: locationYProp,
  onTitleChange,
  onLocationChange,
  onMessageChange,
  onTitlePositionChange,
  onLocationPositionChange,
  backImageUrl,
  onBackImageChange,
  colorMode = "paper",
  vignette = "none",
  grain = false,
  tweaks = DEFAULT_TWEAKS,
}: PostcardPreviewProps) {
  const defaults = DEFAULT_POSITIONS[layout];
  const titleX = titleXProp ?? defaults.titleX;
  const titleY = titleYProp ?? defaults.titleY;
  const locationX = locationXProp ?? defaults.locationX;
  const locationY = locationYProp ?? defaults.locationY;

  const [internalFlipped, setInternalFlipped] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const flipped = flippedProp ?? internalFlipped;
  const toggleFlip = onFlip ?? (() => setInternalFlipped((f) => !f));
  const gestureFlip = flippable && !editable;

  const handleFlip = useCallback(() => {
    toggleFlip();
    setHintDismissed(true);
  }, [toggleFlip]);

  const handlePanEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (Math.abs(info.offset.x) > 48 || Math.abs(info.velocity.x) > 350) {
        handleFlip();
      }
    },
    [handleFlip]
  );

  const extractedPalette = useImagePalette(imageUrl);
  const palette = activePalette(extractedPalette, colorMode);
  const styleConfig = STYLE_CLASSES[style];
  const fontClass = getFontClass(font);
  const isLarge = size === "large";
  const displayTitle = title || "Postcard";
  const displayLocation = location || "Paradise";

  const renderDraggableText = useCallback(
    (opts: {
      titleX: number;
      titleY: number;
      locationX: number;
      locationY: number;
      variant: "light" | "dark" | "ink" | "ig";
      showFrom?: boolean;
    }) => {
      const isIg = opts.variant === "ig";
      const isLight = opts.variant === "light" || isIg;
      const textFxClass = isLight || isIg ? TEXT_FX_CLASS[tweaks.textFx] : "";
      const textColor = isIg
        ? cn("text-white", textFxClass || "drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]")
        : opts.variant === "light"
          ? cn("text-white", textFxClass || textShadow)
          : opts.variant === "ink"
            ? cn("text-stone-800", tweaks.textFx === "outline" ? TEXT_FX_CLASS.outline : "")
            : "text-primary";

      const titleSize = isIg
        ? "text-[13px] font-semibold"
        : isLarge
          ? "text-base sm:text-lg md:text-xl"
          : "text-sm sm:text-base";
      const locSize = isIg
        ? "text-[13px] font-normal opacity-90"
        : isLarge
          ? "text-lg sm:text-xl md:text-2xl"
          : "text-base sm:text-lg";

      const titleEl = editable ? (
        <input
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          placeholder="Postcard"
          className={cn(editableClass, titleSize, "opacity-90 w-full", textColor)}
          onPointerDown={(e) => e.stopPropagation()}
        />
      ) : (
        <p className={cn(titleSize, "opacity-90 leading-tight")}>{displayTitle}</p>
      );

      const locationEl = editable ? (
        <div className={cn("flex flex-wrap items-baseline gap-x-1 leading-tight", locSize, !isIg && "font-bold")}>
          {opts.showFrom !== false && !isIg && <span className="shrink-0">from</span>}
          <input
            value={location}
            onChange={(e) => onLocationChange?.(e.target.value)}
            placeholder="Vacation"
            className={cn(editableClass, "flex-1 font-bold", textColor)}
            onPointerDown={(e) => e.stopPropagation()}
          />
        </div>
      ) : (
        <p className={cn(locSize, !isIg && "font-bold", "leading-tight break-words text-balance")}>
          {opts.showFrom !== false && !isIg ? `from ${displayLocation}` : displayLocation}
        </p>
      );

      return (
        <>
          <DraggablePercent
            x={opts.titleX}
            y={opts.titleY}
            editable={editable}
            onPositionChange={onTitlePositionChange}
          >
            <div className={cn(fontClass, styleConfig.title, textColor)}>{titleEl}</div>
          </DraggablePercent>
          <DraggablePercent
            x={opts.locationX}
            y={opts.locationY}
            editable={editable}
            onPositionChange={onLocationPositionChange}
          >
            <div className={cn(fontClass, styleConfig.title, textColor)}>{locationEl}</div>
          </DraggablePercent>
        </>
      );
    },
    [
      displayLocation,
      displayTitle,
      editable,
      fontClass,
      isLarge,
      location,
      onLocationChange,
      onLocationPositionChange,
      onTitleChange,
      onTitlePositionChange,
      styleConfig.title,
      title,
      tweaks.textFx,
    ]
  );

  const layoutProps = {
    imageUrl,
    title,
    location,
    message,
    style,
    font,
    palette,
    colorMode,
    vignette,
    grain,
    tweaks,
    editable,
    isLarge,
    titleX,
    titleY,
    locationX,
    locationY,
    onTitleChange,
    onLocationChange,
    onMessageChange,
    onTitlePositionChange,
    onLocationPositionChange,
    renderDraggableText,
  };

  return (
    <div className={cn("relative w-full", className)}>
      {isLarge && (
        <div
          className="hidden sm:block absolute inset-0 rounded-md pointer-events-none border border-primary/5"
          style={{
            transform: "rotate(1deg) translate(6px, 6px)",
            boxShadow: "0 8px 24px rgba(23,24,24,0.06)",
            background: "rgba(255,255,255,0.6)",
          }}
        />
      )}

      {(flippable || editable) && !gestureFlip && (
        <div className="flex justify-center gap-1.5 mb-2 sm:mb-4">
          <button
            type="button"
            onClick={() => flipped && toggleFlip()}
            className={cn(
              "px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors",
              !flipped ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"
            )}
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => !flipped && toggleFlip()}
            className={cn(
              "px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors flex items-center gap-1",
              flipped ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"
            )}
          >
            <RotateCcw size={12} />
            Back
          </button>
        </div>
      )}

      {gestureFlip ? (
        <div className="relative">
          <motion.button
            type="button"
            onClick={handleFlip}
            onPanEnd={handlePanEnd}
            whileTap={{ scale: 0.985 }}
            className="relative w-full text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
            aria-label={flipped ? "Show postcard front" : "Show postcard message on back"}
          >
            <FlipCard
              flipped={flipped}
              mode="flip"
              aspectClass={LAYOUT_ASPECT[layout]}
              maxWidthClass={LAYOUT_MAX_WIDTH[layout]}
              shellClass={layoutShellClass(layout)}
              cornerClass={CORNER_CLASS[tweaks.corners]}
              shadowClass={SHADOW_CLASS[tweaks.shadow]}
              front={<PostcardFront layout={layout} props={layoutProps} />}
              back={
                <PostcardBack
                  layout={layout}
                  message={message}
                  location={location}
                  backImageUrl={backImageUrl}
                  palette={palette}
                  colorMode={colorMode}
                  editable={editable}
                  onMessageChange={onMessageChange}
                  onBackImageChange={onBackImageChange}
                  onLocationChange={onLocationChange}
                />
              }
            />

            {!hintDismissed && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-primary/90 text-on-primary px-3 py-1.5 text-[11px] font-medium shadow-lg pointer-events-none"
              >
                <motion.span
                  animate={{ rotate: [0, -18, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <RotateCcw size={12} />
                </motion.span>
                Flip me
              </motion.span>
            )}
          </motion.button>

          <p className="mt-4 text-center text-sm text-on-surface-variant px-2">
            <Hand size={14} className="inline -mt-0.5 mr-1 opacity-70" aria-hidden />
            {flipped
              ? "Tap or swipe to see the photo side again"
              : "Tap or swipe the card to read the message on back"}
          </p>
        </div>
      ) : (
        <FlipCard
          flipped={flipped}
          mode={editable ? "swap" : "flip"}
          aspectClass={LAYOUT_ASPECT[layout]}
          maxWidthClass={LAYOUT_MAX_WIDTH[layout]}
          shellClass={layoutShellClass(layout)}
          cornerClass={CORNER_CLASS[tweaks.corners]}
          shadowClass={SHADOW_CLASS[tweaks.shadow]}
          front={<PostcardFront layout={layout} props={layoutProps} />}
          back={
            <PostcardBack
              layout={layout}
              message={message}
              location={location}
              backImageUrl={backImageUrl}
              palette={palette}
              colorMode={colorMode}
              editable={editable}
              onMessageChange={onMessageChange}
              onBackImageChange={onBackImageChange}
              onLocationChange={onLocationChange}
            />
          }
        />
      )}

      {editable && !flipped && layout !== "polaroid" && (
        <p className="text-center text-[10px] sm:text-[11px] text-on-surface-variant mt-3 sm:mt-4 font-sans px-2">
          Tap text to edit · use grip to drag · flip for message
        </p>
      )}
      {editable && flipped && (
        <p className="text-center text-[11px] text-on-surface-variant mt-4 font-sans">
          Tap any text to edit · Message area is on the back
        </p>
      )}
    </div>
  );
}
