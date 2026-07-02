"use client";

import { MapPin, Mountain, Plane } from "lucide-react";
import type { PostcardLayout } from "@/lib/types";
import type { LayoutRenderProps } from "./types";
import { LayoutPhoto } from "./LayoutPhoto";
import { PhotoEffects } from "./PhotoEffects";
import { STYLE_CLASSES } from "@/lib/styles";
import { isPaperSurface } from "@/lib/palettes";
import {
  BRIGHTNESS_FILTER,
  OVERLAY_GRADIENT,
  PHOTO_FRAME_CLASS,
  WARMTH_FILTER,
} from "@/lib/customization";
import { getFontClass } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const editableClass =
  "bg-transparent border-0 outline-none placeholder:text-white/50 focus:ring-0 w-full";

export function PostcardFront({
  layout,
  props,
}: {
  layout: PostcardLayout;
  props: LayoutRenderProps;
}) {
  const {
    imageUrl,
    title,
    location,
    palette,
    font,
    colorMode,
    editable,
    onTitleChange,
    onLocationChange,
    isLarge,
    renderDraggableText,
    titleX,
    titleY,
    locationX,
    locationY,
    style,
    vignette,
    grain,
    tweaks,
  } = props;
  const styleConfig = STYLE_CLASSES[style];
  const fontClass = getFontClass(font);

  const Photo = ({ className }: { className?: string }) =>
    imageUrl ? (
      <div className="relative w-full h-full">
        <LayoutPhoto
          src={imageUrl}
          className={cn(
            styleConfig.filter,
            WARMTH_FILTER[tweaks.warmth],
            BRIGHTNESS_FILTER[tweaks.brightness],
            PHOTO_FRAME_CLASS[tweaks.photoFrame],
            className
          )}
        />
        <PhotoEffects
          vignette={vignette}
          grain={grain}
          styleGrain={!grain ? styleConfig.grain : undefined}
        />
      </div>
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-surface-variant via-surface-container to-secondary-container/40 flex items-center justify-center">
        <Mountain className="text-on-surface-variant/35" size={40} />
      </div>
    );

  if (layout === "editorial") {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <div className="relative w-full h-full">
          <Photo />
          <div className={cn("absolute inset-0", OVERLAY_GRADIENT[tweaks.overlay])} />
        </div>
        {renderDraggableText({ titleX, titleY, locationX, locationY, variant: "light", showFrom: true })}
        {tweaks.showStamp && (
          <div className="absolute top-4 right-4 w-11 h-13 border border-dashed border-white/60 rounded-sm flex flex-col items-center justify-center bg-white/25 ring-1 ring-white/30 pointer-events-none">
            <Mountain size={14} className="text-white/90" />
            <span className="text-[5px] text-white/90 font-bold tracking-wider mt-0.5">POSTAGE</span>
          </div>
        )}
      </div>
    );
  }

  const captionInputClass =
    "w-full text-center bg-transparent border-0 outline-none font-caveat text-primary placeholder:text-primary/40 focus:ring-0";

  if (layout === "polaroid") {
    return (
      <div className="w-full h-full bg-white flex flex-col p-3 sm:p-4">
        {tweaks.showTape && <div className="layout-tape-top mb-2 shrink-0" />}
        <div className="relative flex-1 overflow-hidden rounded-sm min-h-0">
          <Photo />
        </div>
        <div className="relative flex flex-col justify-center gap-0.5 px-2 py-2 min-h-[3.5rem] mt-2 z-20">
          {editable ? (
            <>
              <input
                value={title}
                onChange={(e) => onTitleChange?.(e.target.value)}
                placeholder="Postcard"
                className={cn(captionInputClass, fontClass, "text-base")}
              />
              <input
                value={location}
                onChange={(e) => onLocationChange?.(e.target.value)}
                placeholder="the Carpathian Mountains"
                className={cn(captionInputClass, fontClass, "text-lg font-medium")}
              />
            </>
          ) : (
            <>
              <p className={cn(fontClass, "text-base text-center text-primary")}>{title || "Postcard"}</p>
              <p className={cn(fontClass, "text-lg text-center font-medium text-primary")}>{location}</p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (layout === "journal") {
    const usePaper = isPaperSurface(colorMode);
    return (
      <div
        className={cn(
          "w-full h-full p-4 sm:p-5 flex flex-col border border-primary/10 relative overflow-hidden",
          usePaper && "layout-journal-paper layout-journal-lines"
        )}
        style={usePaper ? undefined : { backgroundColor: palette.secondary }}
      >
        {usePaper && tweaks.showTape && (
          <>
            <div className="absolute top-2 left-5 w-14 h-5 layout-washi -rotate-6 z-10 pointer-events-none" />
            <div className="absolute top-3 right-6 w-11 h-4 layout-washi rotate-12 z-10 pointer-events-none" />
          </>
        )}
        <div className="relative mb-3 min-h-[1.5rem] z-[2]">
          {renderDraggableText({
            titleX: 4,
            titleY: 0,
            locationX: 18,
            locationY: 0,
            variant: "dark",
            showFrom: false,
          })}
          <Plane size={14} className="absolute left-0 top-1 text-primary/60" />
        </div>
        <div className="relative flex-1 overflow-hidden rounded border border-primary/10 min-h-0 z-[2]">
          <Photo />
        </div>
        <div
          className={cn(
            "mt-3 font-space text-[10px] sm:text-xs uppercase tracking-wider space-y-0.5 z-[2]",
            usePaper ? "text-primary/55" : "opacity-60"
          )}
          style={usePaper ? undefined : { color: palette.textOnSecondary }}
        >
          <p>Weather 26°C</p>
          <p>Distance 7,800 km</p>
          <p>{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        </div>
      </div>
    );
  }

  if (layout === "scrapbook") {
    return (
      <div className="relative w-full h-full p-4 bg-[#f5f0e8]">
        {tweaks.showTape && (
          <>
            <div className="absolute top-2 left-6 w-14 h-5 layout-washi rotate-[-6deg] opacity-90" />
            <div className="absolute top-2 right-8 w-10 h-5 layout-washi rotate-[8deg] opacity-80" />
          </>
        )}
        <div className="relative flex gap-3 h-full pt-6">
          <div className="w-[58%] relative border-2 border-dashed border-primary/25 rounded-sm overflow-hidden layout-torn-paper">
            <Photo />
          </div>
          <div className="flex-1 flex flex-col justify-end pb-2">
            <p className="text-base mb-2">✈️ 🌴 ❤️</p>
            {renderDraggableText({ titleX, titleY, locationX, locationY, variant: "dark", showFrom: false })}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "vintage") {
    return (
      <div className="relative w-full h-full layout-vintage-paper overflow-hidden">
        <div className="relative w-full h-[72%]">
          <Photo className="sepia-[0.2]" />
          <div className={cn("absolute inset-0", OVERLAY_GRADIENT[tweaks.overlay])} />
        </div>
        {tweaks.showStamp && (
          <div className="absolute top-3 left-3 border-2 border-dashed border-stone-600/40 w-10 h-12 flex items-center justify-center bg-white/30">
            <Mountain size={12} className="text-stone-600/60" />
          </div>
        )}
        {renderDraggableText({ titleX, titleY, locationX, locationY, variant: "light", showFrom: true })}
      </div>
    );
  }

  /* Instagram — full-bleed photo, draggable header text */
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Photo />
      </div>

      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />

      {renderDraggableText({
        titleX,
        titleY,
        locationX,
        locationY,
        variant: "ig",
        showFrom: false,
      })}

      {/* bottom location sticker */}
      <div className="absolute bottom-4 left-3 right-3 z-20 flex items-center gap-1">
        <MapPin size={12} className="text-white drop-shadow-sm shrink-0" />
        {editable ? (
          <input
            value={location}
            onChange={(e) => onLocationChange?.(e.target.value)}
            placeholder="Location"
            className={cn(
              editableClass,
              fontClass,
              "text-white text-sm font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
            )}
          />
        ) : (
          <span
            className={cn(
              fontClass,
              "text-white text-sm font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
            )}
          >
            {location || "Location"}
          </span>
        )}
      </div>
    </div>
  );
}
