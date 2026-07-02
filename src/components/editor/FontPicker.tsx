"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { PostcardFont } from "@/lib/types";
import {
  FEATURED_FONTS,
  FONT_CATEGORIES,
  POSTCARD_FONTS,
} from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface FontPickerProps {
  value: PostcardFont;
  onChange: (font: PostcardFont) => void;
}

export function FontPicker({ value, onChange }: FontPickerProps) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return POSTCARD_FONTS;
    return POSTCARD_FONTS.filter(
      (f) =>
        f.label.toLowerCase().includes(q) ||
        f.vibe.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [query]);

  const displayFonts = showAll || query ? filtered : FEATURED_FONTS;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-label-sm text-on-surface-variant block mb-2">
          Typography · {POSTCARD_FONTS.length} curated fonts
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fonts…"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-primary/10 bg-surface-container-low text-sm focus:outline-none focus:border-primary/30"
          />
        </div>
      </div>

      {!query && !showAll && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-secondary mb-2">
            Staff picks
          </p>
          <div className="grid grid-cols-2 gap-2">
            {FEATURED_FONTS.map((f) => (
              <FontCard key={f.id} font={f} active={value === f.id} onSelect={onChange} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-3 w-full py-2.5 text-sm text-primary border border-primary/15 rounded-lg hover:bg-surface-container transition-colors"
          >
            Browse all {POSTCARD_FONTS.length} fonts
          </button>
        </div>
      )}

      {(showAll || query) &&
        FONT_CATEGORIES.map((cat) => {
          const fonts = displayFonts.filter((f) => f.category === cat);
          if (fonts.length === 0) return null;
          return (
            <div key={cat}>
              <p className="text-[10px] uppercase tracking-widest text-secondary mb-2">
                {cat}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {fonts.map((f) => (
                  <FontCard
                    key={f.id}
                    font={f}
                    active={value === f.id}
                    onSelect={onChange}
                  />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}

function FontCard({
  font: f,
  active,
  onSelect,
}: {
  font: (typeof POSTCARD_FONTS)[number];
  active: boolean;
  onSelect: (id: PostcardFont) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(f.id)}
      className={cn(
        "px-3 py-2.5 rounded-lg border text-left transition-all active:scale-[0.99]",
        active
          ? "border-primary bg-secondary-container/60 ring-1 ring-primary/20"
          : "border-primary/10 bg-surface-container-low hover:border-primary/25"
      )}
    >
      <span className={cn("block text-[15px] leading-tight truncate", f.className)}>
        {f.label}
      </span>
      <span className="text-[10px] text-on-surface-variant mt-0.5 block truncate">
        {f.vibe}
      </span>
    </button>
  );
}
