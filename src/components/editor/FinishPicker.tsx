"use client";

import { Aperture, Film } from "lucide-react";
import type { PostcardVignette } from "@/lib/types";
import { VIGNETTE_STYLES } from "@/components/editor/layouts/PhotoEffects";
import { cn } from "@/lib/utils";

interface FinishPickerProps {
  vignette: PostcardVignette;
  grain: boolean;
  onVignetteChange: (v: PostcardVignette) => void;
  onGrainChange: (v: boolean) => void;
}

const VIGNETTE_OPTIONS = (["none", "soft", "moody"] as const).map((id) => ({
  id,
  ...VIGNETTE_STYLES[id],
}));

export function FinishPicker({
  vignette,
  grain,
  onVignetteChange,
  onGrainChange,
}: FinishPickerProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="text-label-sm text-on-surface-variant flex items-center gap-2">
          <Aperture size={14} />
          Vignette
        </label>
        <div className="grid grid-cols-3 gap-2">
          {VIGNETTE_OPTIONS.map(({ id, label, description }) => (
            <button
              key={id}
              type="button"
              onClick={() => onVignetteChange(id)}
              className={cn(
                "rounded-xl border px-2 py-2.5 text-center transition-all active:scale-[0.99]",
                vignette === id
                  ? "border-primary bg-secondary-container/40 ring-2 ring-primary/15"
                  : "border-primary/10 bg-surface-container-low hover:border-primary/25"
              )}
            >
              <span className="text-xs sm:text-sm font-medium block">{label}</span>
              <span className="text-[10px] text-on-surface-variant mt-0.5 block leading-tight">
                {description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-label-sm text-on-surface-variant flex items-center gap-2">
          <Film size={14} />
          Film grain
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: false, label: "Off", description: "Crisp & clean" },
            { id: true, label: "On", description: "Analog texture" },
          ].map(({ id, label, description }) => (
            <button
              key={String(id)}
              type="button"
              onClick={() => onGrainChange(id)}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left transition-all active:scale-[0.99]",
                grain === id
                  ? "border-primary bg-secondary-container/40 ring-2 ring-primary/15"
                  : "border-primary/10 bg-surface-container-low hover:border-primary/25"
              )}
            >
              <span className="text-sm font-medium block">{label}</span>
              <span className="text-[10px] text-on-surface-variant">{description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
