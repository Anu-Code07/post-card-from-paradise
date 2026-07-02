"use client";

import { ImageIcon, Palette, Scroll, Sparkles, Waves } from "lucide-react";
import type { PostcardColorMode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ColorModePickerProps {
  value: PostcardColorMode;
  onChange: (mode: PostcardColorMode) => void;
}

const SURFACES: {
  id: PostcardColorMode;
  label: string;
  description: string;
  swatch: string;
  icon: typeof Scroll;
}[] = [
  {
    id: "paper",
    label: "Cream Paper",
    description: "Classic washi & ruled lines",
    swatch: "bg-[#f5f0e6]",
    icon: Scroll,
  },
  {
    id: "kraft",
    label: "Kraft",
    description: "Earthy brown cardstock",
    swatch: "bg-[#ebe0cc]",
    icon: Scroll,
  },
  {
    id: "blush",
    label: "Blush",
    description: "Soft rose-tinted paper",
    swatch: "bg-[#fdf5f6]",
    icon: Sparkles,
  },
  {
    id: "slate",
    label: "Slate",
    description: "Cool grey stationery",
    swatch: "bg-[#e8ecf0]",
    icon: Palette,
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Seafoam travel journal",
    swatch: "bg-[#e8f4f8]",
    icon: Waves,
  },
  {
    id: "image",
    label: "From Photo",
    description: "Colors pulled from your image",
    swatch: "bg-gradient-to-br from-amber-200 via-sky-300 to-rose-300",
    icon: ImageIcon,
  },
];

export function ColorModePicker({ value, onChange }: ColorModePickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-label-sm text-on-surface-variant block">Surface colors</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SURFACES.map(({ id, label, description, swatch, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "rounded-xl border p-2.5 sm:p-3 text-left flex flex-col gap-2 transition-all active:scale-[0.99] min-h-[5.5rem]",
              value === id
                ? "border-primary bg-secondary-container/40 ring-2 ring-primary/15"
                : "border-primary/10 bg-surface-container-low hover:border-primary/25"
            )}
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg border border-primary/10 flex items-center justify-center shrink-0",
                  swatch
                )}
              >
                <Icon size={14} className="text-primary/80" />
              </div>
              <span className="text-xs sm:text-sm font-medium leading-tight">{label}</span>
            </div>
            <span className="text-[10px] sm:text-xs text-on-surface-variant leading-snug line-clamp-2">
              {description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
