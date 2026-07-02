import type { PostcardStyle } from "./types";

export const STYLES: {
  id: PostcardStyle;
  label: string;
  era: string;
  description: string;
  swatch: string;
}[] = [
  {
    id: "modern",
    label: "Modern",
    era: "20s",
    description: "Clean contrast & crisp tones",
    swatch: "from-slate-800 to-slate-950",
  },
  {
    id: "retro",
    label: "Retro",
    era: "70s",
    description: "Warm grain & sun-faded amber",
    swatch: "from-amber-600 to-orange-900",
  },
  {
    id: "vintage",
    label: "Vintage",
    era: "30s",
    description: "Soft sepia & muted romance",
    swatch: "from-stone-500 to-stone-800",
  },
  {
    id: "nordic",
    label: "Nordic",
    era: "60s",
    description: "Cool blues & Scandinavian calm",
    swatch: "from-sky-200 to-slate-600",
  },
  {
    id: "noir",
    label: "Noir",
    era: "40s",
    description: "High-contrast black & silver",
    swatch: "from-zinc-700 to-black",
  },
  {
    id: "golden",
    label: "Golden",
    era: "50s",
    description: "Sunset glow & honey highlights",
    swatch: "from-amber-300 to-rose-700",
  },
  {
    id: "tropical",
    label: "Tropical",
    era: "80s",
    description: "Vivid greens & punchy saturation",
    swatch: "from-emerald-400 to-teal-800",
  },
  {
    id: "pastel",
    label: "Pastel",
    era: "90s",
    description: "Soft candy hues & airy light",
    swatch: "from-pink-200 to-violet-300",
  },
  {
    id: "cinematic",
    label: "Cinematic",
    era: "10s",
    description: "Teal shadows & filmic contrast",
    swatch: "from-cyan-900 to-orange-900",
  },
  {
    id: "desert",
    label: "Desert",
    era: "00s",
    description: "Dusty terracotta & sun-baked warmth",
    swatch: "from-orange-300 to-red-900",
  },
  {
    id: "dream",
    label: "Dream",
    era: "20s",
    description: "Ethereal bloom & soft glow",
    swatch: "from-indigo-300 to-fuchsia-400",
  },
  {
    id: "coastal",
    label: "Coastal",
    era: "60s",
    description: "Seafoam blues & breezy highlights",
    swatch: "from-sky-300 to-blue-700",
  },
  {
    id: "sunbleach",
    label: "Sunbleach",
    era: "00s",
    description: "Faded beach & overexposed charm",
    swatch: "from-amber-100 to-orange-300",
  },
  {
    id: "midnight",
    label: "Midnight",
    era: "20s",
    description: "Deep indigo & moonlit hush",
    swatch: "from-indigo-950 to-violet-900",
  },
  {
    id: "blossom",
    label: "Blossom",
    era: "10s",
    description: "Cherry pink & spring softness",
    swatch: "from-pink-300 to-rose-400",
  },
];

export const STYLE_CLASSES: Record<
  PostcardStyle,
  { overlay: string; title: string; stamp: string; filter: string; grain?: string }
> = {
  modern: {
    overlay: "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
    title: "tracking-tight not-italic",
    stamp: "border-white/40",
    filter: "saturate-110 contrast-105",
  },
  retro: {
    overlay: "bg-gradient-to-t from-amber-950/80 via-orange-900/30 to-transparent",
    title: "italic",
    stamp: "border-amber-200/50",
    filter: "sepia-[0.35] saturate-125 contrast-105",
    grain: "opacity-[0.12]",
  },
  vintage: {
    overlay: "bg-gradient-to-t from-stone-900/60 via-stone-800/15 to-transparent",
    title: "tracking-wide",
    stamp: "border-stone-200/40",
    filter: "sepia-[0.2] saturate-90 brightness-105",
  },
  nordic: {
    overlay: "bg-gradient-to-t from-slate-900/65 via-sky-900/15 to-transparent",
    title: "tracking-tight not-italic",
    stamp: "border-sky-100/40",
    filter: "saturate-75 contrast-110 brightness-105 hue-rotate-[-8deg]",
  },
  noir: {
    overlay: "bg-gradient-to-t from-black/85 via-black/40 to-black/10",
    title: "uppercase tracking-widest not-italic",
    stamp: "border-white/30",
    filter: "grayscale contrast-125 brightness-90",
  },
  golden: {
    overlay: "bg-gradient-to-t from-rose-950/75 via-amber-900/25 to-transparent",
    title: "italic",
    stamp: "border-amber-100/50",
    filter: "sepia-[0.15] saturate-130 brightness-105",
    grain: "opacity-[0.08]",
  },
  tropical: {
    overlay: "bg-gradient-to-t from-emerald-950/70 via-teal-900/20 to-transparent",
    title: "not-italic tracking-tight",
    stamp: "border-emerald-200/50",
    filter: "saturate-140 contrast-105 hue-rotate-[8deg]",
  },
  pastel: {
    overlay: "bg-gradient-to-t from-violet-900/40 via-pink-200/10 to-transparent",
    title: "not-italic tracking-wide",
    stamp: "border-pink-100/60",
    filter: "saturate-90 brightness-110 contrast-95",
  },
  cinematic: {
    overlay: "bg-gradient-to-t from-black/80 via-cyan-950/30 to-transparent",
    title: "uppercase tracking-widest not-italic",
    stamp: "border-cyan-100/40",
    filter: "contrast-115 saturate-90 hue-rotate-[-12deg]",
    grain: "opacity-[0.1]",
  },
  desert: {
    overlay: "bg-gradient-to-t from-red-950/75 via-orange-800/25 to-transparent",
    title: "italic tracking-wide",
    stamp: "border-orange-100/50",
    filter: "sepia-[0.25] saturate-115 brightness-105",
  },
  dream: {
    overlay: "bg-gradient-to-t from-fuchsia-900/50 via-indigo-400/15 to-transparent",
    title: "italic tracking-wide",
    stamp: "border-fuchsia-100/50",
    filter: "saturate-110 brightness-110 contrast-95 hue-rotate-[6deg]",
  },
  coastal: {
    overlay: "bg-gradient-to-t from-blue-950/65 via-sky-600/15 to-transparent",
    title: "not-italic tracking-tight",
    stamp: "border-sky-100/50",
    filter: "saturate-105 brightness-105 contrast-105 hue-rotate-[-6deg]",
  },
  sunbleach: {
    overlay: "bg-gradient-to-t from-orange-900/35 via-amber-100/10 to-transparent",
    title: "not-italic tracking-wide",
    stamp: "border-amber-50/60",
    filter: "brightness-115 saturate-75 contrast-90",
  },
  midnight: {
    overlay: "bg-gradient-to-t from-indigo-950/85 via-violet-900/40 to-indigo-950/15",
    title: "tracking-widest not-italic",
    stamp: "border-violet-200/35",
    filter: "saturate-80 brightness-90 contrast-115 hue-rotate-[15deg]",
  },
  blossom: {
    overlay: "bg-gradient-to-t from-rose-900/45 via-pink-300/15 to-transparent",
    title: "italic tracking-wide",
    stamp: "border-pink-100/55",
    filter: "saturate-105 brightness-108 hue-rotate-[4deg]",
  },
};
