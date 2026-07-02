"use client";

import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { LayoutPhoto } from "./LayoutPhoto";
import { cn } from "@/lib/utils";

interface BackRightPhotoProps {
  imageUrl: string | null;
  editable?: boolean;
  onImageChange?: (url: string | null, file: File | null) => void;
}

/** Centered photo slot on the right side of the postcard back (after the divider) */
export function BackRightPhoto({ imageUrl, editable, onImageChange }: BackRightPhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    onImageChange?.(URL.createObjectURL(file), file);
  }

  if (imageUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6 pointer-events-none z-[1]">
        <div
          className={cn(
            "relative w-full max-w-[85%] aspect-[4/3] rounded-sm overflow-hidden",
            "border border-white/55 shadow-[0_2px_10px_rgba(0,0,0,0.08)]",
            "ring-1 ring-inset ring-white/35"
          )}
        >
          <LayoutPhoto src={imageUrl} />
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
        </div>
        {editable && (
          <button
            type="button"
            onClick={() => onImageChange?.(null, null)}
            className="absolute top-3 left-3 z-[3] text-[10px] px-2 py-1 rounded-full bg-black/40 text-white pointer-events-auto hover:bg-black/55"
          >
            Remove
          </button>
        )}
      </div>
    );
  }

  if (!editable) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6 z-[1]">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full max-w-[85%] aspect-[4/3] rounded-sm flex flex-col items-center justify-center gap-2",
          "border-2 border-dashed border-current/25 bg-white/15",
          "hover:bg-white/25 hover:border-current/40 transition-colors cursor-pointer"
        )}
      >
        <ImagePlus size={22} className="opacity-50" />
        <span className="text-[11px] uppercase tracking-wider opacity-50 font-sans">
          Add photo
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
