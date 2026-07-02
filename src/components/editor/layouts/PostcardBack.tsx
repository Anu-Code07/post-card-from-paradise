"use client";

import { Heart, MapPin, Mountain } from "lucide-react";
import type { PostcardColorMode, PostcardLayout } from "@/lib/types";
import type { ImagePalette } from "@/lib/image-colors";
import { BackCenterPhoto } from "./BackCenterPhoto";
import { BackRightPhoto } from "./BackRightPhoto";
import { isPaperSurface } from "@/lib/palettes";
import { backMessageFont } from "./types";
import { cn } from "@/lib/utils";

interface PostcardBackProps {
  layout: PostcardLayout;
  message: string;
  location: string;
  backImageUrl?: string | null;
  palette: ImagePalette;
  colorMode?: PostcardColorMode;
  editable?: boolean;
  onMessageChange?: (v: string) => void;
  onBackImageChange?: (url: string | null, file: File | null) => void;
  onLocationChange?: (v: string) => void;
}

function MessageArea({
  message,
  editable,
  onMessageChange,
  className,
  style,
  placeholder,
}: {
  message: string;
  editable?: boolean;
  onMessageChange?: (v: string) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}) {
  if (editable) {
    return (
      <textarea
        value={message}
        onChange={(e) => onMessageChange?.(e.target.value.slice(0, 280))}
        placeholder={placeholder ?? "Wish you were here…"}
        className={cn("w-full flex-1 bg-transparent resize-none outline-none leading-relaxed", className)}
        style={style}
      />
    );
  }
  return (
    <p className={cn("flex-1 whitespace-pre-wrap leading-relaxed", className)} style={style}>
      {message || "Flip to write your message…"}
    </p>
  );
}

export function PostcardBack({
  layout,
  message,
  location,
  backImageUrl,
  palette,
  colorMode = "paper",
  editable,
  onMessageChange,
  onBackImageChange,
  onLocationChange,
}: PostcardBackProps) {
  const usePaper = isPaperSurface(colorMode);
  const msgFont = backMessageFont(layout);
  const textColor = usePaper ? "#3d3429" : palette.textOnSecondary;

  const paperBg = usePaper
    ? undefined
    : {
        background: `linear-gradient(160deg, ${palette.secondary} 0%, ${palette.primary} 55%, ${palette.accent}cc 100%)`,
        color: textColor,
      };

  const surfaceClass = usePaper ? "layout-journal-paper text-[#3d3429]" : "";

  if (layout === "editorial") {
    return (
      <div className="w-full h-full flex">
        <div
          className={cn(
            "w-[58%] p-5 sm:p-6 flex flex-col border-r border-black/10 relative z-[2]",
            usePaper && "layout-journal-lines",
            surfaceClass
          )}
          style={usePaper ? undefined : { backgroundColor: palette.secondary, color: textColor }}
        >
          <p className="text-[9px] uppercase tracking-[0.25em] opacity-60 mb-3 font-sans">Message</p>
          <MessageArea
            message={message}
            editable={editable}
            onMessageChange={onMessageChange}
            className={cn(msgFont, "text-xl sm:text-2xl")}
            style={{ color: textColor }}
          />
          {editable && <p className="text-[10px] opacity-50 mt-2 font-sans">{message.length}/280</p>}
        </div>
        <div
          className={cn("flex-1 p-5 flex flex-col relative min-w-0", surfaceClass)}
          style={
            usePaper
              ? undefined
              : {
                  background: `linear-gradient(180deg, ${palette.secondary} 0%, ${palette.primary}99 100%)`,
                  color: textColor,
                }
          }
        >
          <BackRightPhoto
            imageUrl={backImageUrl ?? null}
            editable={editable}
            onImageChange={onBackImageChange}
          />
          <div className="stamp-scallop w-12 h-14 flex items-center justify-center self-end bg-white/30 border border-white/40 relative z-[2]">
            <Heart size={16} style={{ color: palette.accent }} fill="currentColor" />
          </div>
          <div className="mt-auto space-y-3 opacity-55 relative z-[2]">
            <div className="h-px bg-current w-full" />
            <div className="h-px bg-current w-4/5" />
            <div className="h-px bg-current w-3/5" />
          </div>
        </div>
      </div>
    );
  }

  if (layout === "polaroid") {
    return (
      <div className="w-full h-full bg-white flex flex-col p-3 sm:p-4 relative">
        <div className="layout-tape-top mb-2 shrink-0" />
        <div
          className={cn(
            "flex-1 rounded-sm p-4 sm:p-5 flex flex-col relative overflow-hidden",
            usePaper && "layout-journal-paper"
          )}
          style={
            usePaper
              ? { backgroundColor: "#f5f0e6", color: textColor }
              : { backgroundColor: palette.secondary, color: textColor }
          }
        >
          <BackCenterPhoto imageUrl={backImageUrl ?? null} size="sm" />
          <MessageArea
            message={message}
            editable={editable}
            onMessageChange={onMessageChange}
            className={cn("font-caveat text-2xl sm:text-3xl text-center relative z-[2]")}
            style={{ color: textColor }}
            placeholder="Santorini · July 2026"
          />
        </div>
        {editable ? (
          <input
            value={location}
            onChange={(e) => onLocationChange?.(e.target.value)}
            placeholder="Location"
            className="w-full text-center font-caveat text-lg mt-3 bg-transparent border-0 outline-none opacity-80 relative z-[2]"
            style={{ color: usePaper ? "#8b7355" : palette.accent }}
          />
        ) : (
          <p
            className="text-center font-caveat text-lg mt-3 opacity-60 relative z-[2]"
            style={usePaper ? { color: "#8b7355" } : { color: palette.accent }}
          >
            {location}
          </p>
        )}
      </div>
    );
  }

  if (layout === "journal") {
    return (
      <div
        className={cn("w-full h-full p-4 sm:p-5 relative", usePaper ? "layout-journal-paper layout-journal-lines" : "layout-journal-lines")}
        style={paperBg}
      >
        <BackCenterPhoto imageUrl={backImageUrl ?? null} size="sm" className="opacity-40" />
        <div className="relative z-[2]">
          <div className="flex items-center gap-2 mb-4 opacity-70 font-space text-xs uppercase tracking-widest">
            <span>✈</span>
            <span>Field notes ·</span>
            {editable ? (
              <input
                value={location}
                onChange={(e) => onLocationChange?.(e.target.value)}
                placeholder="Location"
                className="flex-1 min-w-0 bg-transparent border-0 border-b border-current/30 outline-none font-space text-xs uppercase tracking-widest"
                style={{ color: textColor }}
              />
            ) : (
              <span>{location}</span>
            )}
          </div>
          <MessageArea
            message={message}
            editable={editable}
            onMessageChange={onMessageChange}
            className={cn("font-space text-sm sm:text-base")}
            style={{ color: textColor }}
          />
          <div className="mt-4 pt-3 border-t border-current/20 font-space text-[10px] uppercase tracking-wider opacity-50 space-y-1">
            <p>Weather — warm</p>
            <p>Date — {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "scrapbook") {
    return (
      <div
        className={cn("relative w-full h-full p-4", usePaper ? "layout-torn-paper" : "layout-torn-paper")}
        style={paperBg}
      >
        <div className="absolute top-3 left-8 w-12 h-5 layout-washi opacity-80 rotate-[-8deg] z-[2]" />
        <div className="absolute top-3 right-10 w-12 h-5 layout-washi opacity-80 rotate-[12deg] z-[2]" />
        <BackCenterPhoto imageUrl={backImageUrl ?? null} size="md" />
        <div className="relative z-[2] h-full flex flex-col p-3">
          <p className="text-lg mb-2">✈️ 🌴 ❤️</p>
          <MessageArea
            message={message}
            editable={editable}
            onMessageChange={onMessageChange}
            className={cn("font-caveat text-xl sm:text-2xl")}
            style={{ color: textColor }}
            placeholder="Best trip ever…"
          />
        </div>
      </div>
    );
  }

  if (layout === "vintage") {
    return (
      <div
        className={cn("w-full h-full p-5 sm:p-6 flex flex-col relative", usePaper ? "layout-vintage-paper" : "layout-vintage-paper")}
        style={usePaper ? { color: textColor, fontFamily: "var(--font-crimson), Georgia, serif" } : { ...paperBg, fontFamily: "var(--font-crimson), Georgia, serif" }}
      >
        <div className="flex justify-between items-start mb-4 relative z-[2]">
          <div className="border-2 border-dashed border-current/40 w-12 h-14 flex items-center justify-center opacity-70">
            <Mountain size={14} />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">Postcard</p>
        </div>
        <div className="flex-1 flex gap-4 relative">
          <div className="w-[55%] flex flex-col relative z-[2]">
            <MessageArea
              message={message}
              editable={editable}
              onMessageChange={onMessageChange}
              className="font-crimson text-base sm:text-lg italic"
              style={{ color: textColor }}
            />
          </div>
          <div className="flex-1 relative min-w-0">
            <BackRightPhoto
              imageUrl={backImageUrl ?? null}
              editable={editable}
              onImageChange={onBackImageChange}
            />
            <div className="flex flex-col justify-end h-full space-y-4 opacity-50 text-sm relative z-[2]">
              <div>
                <p className="uppercase tracking-widest text-[10px] mb-1">To:</p>
                <div className="h-px bg-current w-full" />
                <div className="h-px bg-current w-full mt-3" />
              </div>
              <div>
                <p className="uppercase tracking-widest text-[10px] mb-1">From:</p>
                <div className="h-px bg-current w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* story back */
  return (
    <div
      className={cn("w-full h-full flex flex-col p-5 sm:p-6 relative", usePaper && "layout-journal-paper")}
      style={
        usePaper
          ? { color: textColor }
          : {
              background: `linear-gradient(180deg, ${palette.secondary} 0%, ${palette.primary} 100%)`,
              color: palette.textOnSecondary,
            }
      }
    >
      <BackCenterPhoto imageUrl={backImageUrl ?? null} size="md" />
      <p className="text-[9px] uppercase tracking-[0.2em] opacity-50 mb-3 font-sans relative z-[2]">Your note</p>
      <MessageArea
        message={message}
        editable={editable}
        onMessageChange={onMessageChange}
        className={cn("font-outfit text-base sm:text-lg relative z-[2]")}
        style={{ color: palette.textOnSecondary }}
        placeholder="Write your story…"
      />
      {editable && (
        <p className="text-[10px] opacity-40 mt-2 font-sans relative z-[2]">{message.length}/280</p>
      )}
      <div className="font-outfit text-xs mt-auto opacity-50 relative z-[2] flex items-center gap-1">
        <MapPin size={10} className="shrink-0" />
        {editable ? (
          <input
            value={location}
            onChange={(e) => onLocationChange?.(e.target.value)}
            placeholder="Location"
            className="flex-1 bg-transparent border-0 outline-none font-outfit text-xs"
            style={{ color: palette.textOnSecondary }}
          />
        ) : (
          <span>{location}</span>
        )}
      </div>
    </div>
  );
}
