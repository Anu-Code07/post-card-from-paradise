"use client";

import type { PostcardStyle } from "@/lib/types";
import { STYLES } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface StylePickerProps {
  value: PostcardStyle;
  onChange: (style: PostcardStyle) => void;
}

export function StylePicker({ value, onChange }: StylePickerProps) {
  const active = STYLES.find((s) => s.id === value);

  return (
    <div className="space-y-3">
      <label className="text-label-sm text-on-surface-variant block">Mood &amp; filter</label>
      <div className="grid grid-cols-3 gap-2">
        {STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            className={cn(
              "rounded-xl border overflow-hidden text-left transition-all active:scale-[0.98]",
              value === s.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-primary/10 hover:border-primary/25"
            )}
          >
            <div className={cn("h-10 sm:h-12 bg-gradient-to-br", s.swatch)} />
            <div className="px-2 py-2 sm:px-2.5 sm:py-2 bg-surface-container-low">
              <span className="text-xs sm:text-sm font-medium block leading-tight">{s.label}</span>
              <span className="text-[9px] sm:text-[10px] text-on-surface-variant uppercase tracking-wider">
                {s.era}
              </span>
            </div>
          </button>
        ))}
      </div>
      {active && (
        <p className="text-sm text-on-surface-variant leading-relaxed">{active.description}</p>
      )}
    </div>
  );
}
