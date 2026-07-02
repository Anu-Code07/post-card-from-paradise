"use client";

import {
  Frame,
  Layers,
  Sun,
  Type,
} from "lucide-react";
import type { PostcardTweaks } from "@/lib/types";
import { TWEAK_OPTIONS } from "@/lib/customization";
import { cn } from "@/lib/utils";

interface TweaksPickerProps {
  value: PostcardTweaks;
  onChange: (tweaks: PostcardTweaks) => void;
}

function OptionGrid<T extends string>({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  cols = 3,
}: {
  label: string;
  icon: typeof Sun;
  options: readonly { id: T; label: string; description: string }[];
  value: T;
  onChange: (v: T) => void;
  cols?: 2 | 3 | 4;
}) {
  return (
    <div className="space-y-2.5">
      <label className="text-label-sm text-on-surface-variant flex items-center gap-2">
        <Icon size={14} />
        {label}
      </label>
      <div
        className={cn(
          "grid gap-2",
          cols === 2 && "grid-cols-2",
          cols === 3 && "grid-cols-3",
          cols === 4 && "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "rounded-xl border px-2 py-2 text-center transition-all active:scale-[0.99]",
              value === opt.id
                ? "border-primary bg-secondary-container/40 ring-2 ring-primary/15"
                : "border-primary/10 bg-surface-container-low hover:border-primary/25"
            )}
          >
            <span className="text-xs sm:text-sm font-medium block leading-tight">{opt.label}</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5 block leading-tight line-clamp-2">
              {opt.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full rounded-xl border px-3 py-2.5 flex items-center justify-between gap-3 transition-all active:scale-[0.99]",
        checked
          ? "border-primary bg-secondary-container/40 ring-2 ring-primary/15"
          : "border-primary/10 bg-surface-container-low hover:border-primary/25"
      )}
    >
      <div className="text-left min-w-0">
        <span className="text-sm font-medium block">{label}</span>
        <span className="text-[10px] text-on-surface-variant">{description}</span>
      </div>
      <span
        className={cn(
          "shrink-0 w-10 h-6 rounded-full relative transition-colors",
          checked ? "bg-primary" : "bg-outline-variant/60"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}

export function TweaksPicker({ value, onChange }: TweaksPickerProps) {
  const patch = (partial: Partial<PostcardTweaks>) => onChange({ ...value, ...partial });

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-secondary font-medium">Photo tone</p>
        <OptionGrid
          label="Warmth"
          icon={Sun}
          options={TWEAK_OPTIONS.warmth}
          value={value.warmth}
          onChange={(warmth) => patch({ warmth })}
        />
        <OptionGrid
          label="Brightness"
          icon={Sun}
          options={TWEAK_OPTIONS.brightness}
          value={value.brightness}
          onChange={(brightness) => patch({ brightness })}
        />
        <OptionGrid
          label="Overlay depth"
          icon={Layers}
          options={TWEAK_OPTIONS.overlay}
          value={value.overlay}
          onChange={(overlay) => patch({ overlay })}
        />
      </div>

      <div className="space-y-4 pt-1 border-t border-primary/5">
        <p className="text-[10px] uppercase tracking-widest text-secondary font-medium pt-2">
          Card &amp; frame
        </p>
        <OptionGrid
          label="Corners"
          icon={Frame}
          options={TWEAK_OPTIONS.corners}
          value={value.corners}
          onChange={(corners) => patch({ corners })}
        />
        <OptionGrid
          label="Shadow"
          icon={Layers}
          options={TWEAK_OPTIONS.shadow}
          value={value.shadow}
          onChange={(shadow) => patch({ shadow })}
        />
        <OptionGrid
          label="Photo frame"
          icon={Frame}
          options={TWEAK_OPTIONS.photoFrame}
          value={value.photoFrame}
          onChange={(photoFrame) => patch({ photoFrame })}
          cols={4}
        />
      </div>

      <div className="space-y-4 pt-1 border-t border-primary/5">
        <p className="text-[10px] uppercase tracking-widest text-secondary font-medium pt-2">
          Text &amp; decor
        </p>
        <OptionGrid
          label="Text on photo"
          icon={Type}
          options={TWEAK_OPTIONS.textFx}
          value={value.textFx}
          onChange={(textFx) => patch({ textFx })}
          cols={4}
        />
        <div className="grid grid-cols-1 gap-2">
          <ToggleRow
            label="Postage stamp"
            description="Show stamp on editorial layouts"
            checked={value.showStamp}
            onChange={(showStamp) => patch({ showStamp })}
          />
          <ToggleRow
            label="Washi tape"
            description="Tape accents on polaroid & journal"
            checked={value.showTape}
            onChange={(showTape) => patch({ showTape })}
          />
        </div>
      </div>
    </div>
  );
}
