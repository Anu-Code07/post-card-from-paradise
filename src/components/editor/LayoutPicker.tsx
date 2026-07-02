"use client";

import type { PostcardLayout } from "@/lib/types";
import { LAYOUTS } from "@/lib/layouts";
import { cn } from "@/lib/utils";

interface LayoutPickerProps {
  value: PostcardLayout;
  onChange: (layout: PostcardLayout) => void;
}

const THUMB_SHAPE: Record<PostcardLayout, string> = {
  editorial: "w-full aspect-[3/2]",
  polaroid: "w-2/3 mx-auto aspect-[4/5] bg-white p-1",
  journal: "w-full aspect-[3/2] border border-primary/15",
  scrapbook: "w-full aspect-[3/2] rotate-[-1deg]",
  vintage: "w-full aspect-[3/2] sepia-[0.3]",
  story: "w-1/2 mx-auto aspect-[9/16]",
};

export function LayoutPicker({ value, onChange }: LayoutPickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-label-sm text-on-surface-variant block">Layout</label>
      <div className="grid grid-cols-2 gap-3">
        {LAYOUTS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => onChange(l.id)}
            className={cn(
              "rounded-xl border p-3 text-left transition-all active:scale-[0.98]",
              value === l.id
                ? "border-primary bg-secondary-container/40 ring-2 ring-primary/15"
                : "border-primary/10 bg-surface-container-low hover:border-primary/25"
            )}
          >
            <div className="bg-surface-variant rounded-md overflow-hidden mb-2.5 p-1.5">
              <div
                className={cn(
                  THUMB_SHAPE[l.id],
                  "rounded-sm bg-gradient-to-br from-secondary-container to-primary/30 relative overflow-hidden"
                )}
              >
                {l.id === "polaroid" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-white" />
                )}
                {l.id === "story" && (
                  <div className="absolute top-1 left-1 right-1 flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-0.5 flex-1 bg-white/70 rounded-full" />
                    ))}
                  </div>
                )}
                {l.id === "scrapbook" && (
                  <div className="absolute top-1 left-2 w-4 h-1.5 bg-secondary-container/80 rotate-[-8deg]" />
                )}
              </div>
            </div>
            <span className="text-sm font-medium block">{l.label}</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">
              {l.ratio}
            </span>
          </button>
        ))}
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed">
        {LAYOUTS.find((l) => l.id === value)?.description}
      </p>
    </div>
  );
}
