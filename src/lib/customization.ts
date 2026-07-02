import type {
  PostcardBrightness,
  PostcardCorners,
  PostcardOverlay,
  PostcardPhotoFrame,
  PostcardShadow,
  PostcardTextFx,
  PostcardTweaks,
  PostcardWarmth,
} from "./types";
import type { Postcard } from "./types";

export const DEFAULT_TWEAKS: PostcardTweaks = {
  warmth: "neutral",
  brightness: "normal",
  overlay: "medium",
  corners: "soft",
  shadow: "lifted",
  photoFrame: "none",
  textFx: "shadow",
  showStamp: true,
  showTape: true,
};

export function tweaksFromPostcard(postcard?: Partial<Postcard> | null): PostcardTweaks {
  return {
    warmth: postcard?.warmth ?? DEFAULT_TWEAKS.warmth,
    brightness: postcard?.brightness ?? DEFAULT_TWEAKS.brightness,
    overlay: postcard?.overlay_depth ?? DEFAULT_TWEAKS.overlay,
    corners: postcard?.corners ?? DEFAULT_TWEAKS.corners,
    shadow: postcard?.card_shadow ?? DEFAULT_TWEAKS.shadow,
    photoFrame: postcard?.photo_frame ?? DEFAULT_TWEAKS.photoFrame,
    textFx: postcard?.text_fx ?? DEFAULT_TWEAKS.textFx,
    showStamp: postcard?.show_stamp ?? DEFAULT_TWEAKS.showStamp,
    showTape: postcard?.show_tape ?? DEFAULT_TWEAKS.showTape,
  };
}

export function tweaksToPayload(tweaks: PostcardTweaks) {
  return {
    warmth: tweaks.warmth,
    brightness: tweaks.brightness,
    overlay_depth: tweaks.overlay,
    corners: tweaks.corners,
    card_shadow: tweaks.shadow,
    photo_frame: tweaks.photoFrame,
    text_fx: tweaks.textFx,
    show_stamp: tweaks.showStamp,
    show_tape: tweaks.showTape,
  };
}

export const WARMTH_FILTER: Record<PostcardWarmth, string> = {
  cool: "hue-rotate-[-10deg] saturate-90 brightness-[1.02]",
  neutral: "",
  warm: "sepia-[0.14] saturate-110 hue-rotate-[8deg] brightness-[1.03]",
};

export const BRIGHTNESS_FILTER: Record<PostcardBrightness, string> = {
  dim: "brightness-[0.88] contrast-105",
  normal: "",
  bright: "brightness-[1.12] contrast-[0.98]",
};

export const OVERLAY_GRADIENT: Record<PostcardOverlay, string> = {
  light: "bg-gradient-to-t from-black/30 via-black/5 to-transparent",
  medium: "bg-gradient-to-t from-black/50 via-black/15 to-transparent",
  deep: "bg-gradient-to-t from-black/70 via-black/35 to-black/10",
};

export const CORNER_CLASS: Record<PostcardCorners, string> = {
  sharp: "rounded-none",
  soft: "rounded-md",
  round: "rounded-2xl",
};

export const SHADOW_CLASS: Record<PostcardShadow, string> = {
  flat: "shadow-none border border-primary/15",
  soft: "postcard-shadow border border-primary/8",
  lifted: "postcard-shadow-lg border border-primary/10",
};

export const PHOTO_FRAME_CLASS: Record<PostcardPhotoFrame, string> = {
  none: "",
  white: "ring-[6px] ring-inset ring-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]",
  dark: "ring-[5px] ring-inset ring-black/85",
  vintage: "ring-[4px] ring-inset ring-amber-900/35 sepia-[0.15]",
};

export const TEXT_FX_CLASS: Record<PostcardTextFx, string> = {
  plain: "",
  shadow: "drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]",
  glow: "drop-shadow-[0_0_10px_rgba(255,255,255,0.75)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]",
  outline:
    "[text-shadow:_-1px_-1px_0_rgba(0,0,0,0.9),_1px_-1px_0_rgba(0,0,0,0.9),_-1px_1px_0_rgba(0,0,0,0.9),_1px_1px_0_rgba(0,0,0,0.9)]",
};

export const TWEAK_OPTIONS = {
  warmth: [
    { id: "cool" as const, label: "Cool", description: "Crisp & blue-toned" },
    { id: "neutral" as const, label: "Neutral", description: "True to photo" },
    { id: "warm" as const, label: "Warm", description: "Golden hour glow" },
  ],
  brightness: [
    { id: "dim" as const, label: "Dim", description: "Moody & subdued" },
    { id: "normal" as const, label: "Normal", description: "Balanced" },
    { id: "bright" as const, label: "Bright", description: "Airy & lifted" },
  ],
  overlay: [
    { id: "light" as const, label: "Light", description: "Subtle fade" },
    { id: "medium" as const, label: "Medium", description: "Readable text" },
    { id: "deep" as const, label: "Deep", description: "Dramatic contrast" },
  ],
  corners: [
    { id: "sharp" as const, label: "Sharp", description: "Clean edges" },
    { id: "soft" as const, label: "Soft", description: "Gentle radius" },
    { id: "round" as const, label: "Round", description: "Pillowy corners" },
  ],
  shadow: [
    { id: "flat" as const, label: "Flat", description: "No lift" },
    { id: "soft" as const, label: "Soft", description: "Light float" },
    { id: "lifted" as const, label: "Lifted", description: "Deep shadow" },
  ],
  photoFrame: [
    { id: "none" as const, label: "None", description: "Full bleed" },
    { id: "white" as const, label: "White mat", description: "Gallery border" },
    { id: "dark" as const, label: "Dark", description: "Bold inset frame" },
    { id: "vintage" as const, label: "Vintage", description: "Sepia matting" },
  ],
  textFx: [
    { id: "plain" as const, label: "Plain", description: "No effects" },
    { id: "shadow" as const, label: "Shadow", description: "Classic depth" },
    { id: "glow" as const, label: "Glow", description: "Soft halo" },
    { id: "outline" as const, label: "Outline", description: "Bold legibility" },
  ],
} as const;
