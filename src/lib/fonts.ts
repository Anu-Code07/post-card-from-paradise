import type { PostcardFont } from "./types";

export type FontCategory = "Serif" | "Script" | "Display" | "Sans";

export const POSTCARD_FONTS: {
  id: PostcardFont;
  label: string;
  vibe: string;
  category: FontCategory;
  className: string;
  featured?: boolean;
}[] = [
  // — Serif: editorial, vintage, literary —
  { id: "caslon", label: "Libre Caslon", vibe: "Editorial classic", category: "Serif", className: "font-caslon", featured: true },
  { id: "playfair", label: "Playfair Display", vibe: "High-contrast elegance", category: "Serif", className: "font-playfair", featured: true },
  { id: "cormorant", label: "Cormorant", vibe: "Refined vintage", category: "Serif", className: "font-cormorant", featured: true },
  { id: "fraunces", label: "Fraunces", vibe: "Soft & expressive", category: "Serif", className: "font-fraunces", featured: true },
  { id: "garamond", label: "EB Garamond", vibe: "Timeless bookish", category: "Serif", className: "font-garamond" },
  { id: "crimson", label: "Crimson Pro", vibe: "Literary warmth", category: "Serif", className: "font-crimson" },
  { id: "bodoni", label: "Bodoni Moda", vibe: "Fashion editorial", category: "Serif", className: "font-bodoni" },
  { id: "baskerville", label: "Baskerville", vibe: "Traditional grace", category: "Serif", className: "font-baskerville" },
  { id: "lora", label: "Lora", vibe: "Warm storybook", category: "Serif", className: "font-lora" },
  { id: "italiana", label: "Italiana", vibe: "Art deco lines", category: "Serif", className: "font-italiana" },
  { id: "yeseva", label: "Yeseva One", vibe: "Ornate display serif", category: "Serif", className: "font-yeseva" },

  // — Script: handwritten, personal —
  { id: "caveat", label: "Caveat", vibe: "Casual pen", category: "Script", className: "font-caveat", featured: true },
  { id: "dancing", label: "Dancing Script", vibe: "Lively handwriting", category: "Script", className: "font-dancing", featured: true },
  { id: "sacramento", label: "Sacramento", vibe: "Flowing script", category: "Script", className: "font-sacramento" },
  { id: "alex", label: "Alex Brush", vibe: "Elegant strokes", category: "Script", className: "font-alex" },
  { id: "vibes", label: "Great Vibes", vibe: "Luxurious flourish", category: "Script", className: "font-vibes" },
  { id: "parisienne", label: "Parisienne", vibe: "Parisian chic", category: "Script", className: "font-parisienne" },
  { id: "satisfy", label: "Satisfy", vibe: "Retro marker", category: "Script", className: "font-satisfy" },

  // — Display: bold headlines, posters —
  { id: "bebas", label: "Bebas Neue", vibe: "Bold retro caps", category: "Display", className: "font-bebas", featured: true },
  { id: "abril", label: "Abril Fatface", vibe: "Dramatic headline", category: "Display", className: "font-abril", featured: true },
  { id: "oswald", label: "Oswald", vibe: "Condensed poster", category: "Display", className: "font-oswald" },
  { id: "cinzel", label: "Cinzel", vibe: "Roman inscription", category: "Display", className: "font-cinzel" },
  { id: "anton", label: "Anton", vibe: "Impact sans", category: "Display", className: "font-anton" },

  // — Sans: modern, clean, travel —
  { id: "space", label: "Space Grotesk", vibe: "Modern geometric", category: "Sans", className: "font-space", featured: true },
  { id: "outfit", label: "Outfit", vibe: "Friendly minimal", category: "Sans", className: "font-outfit", featured: true },
  { id: "syne", label: "Syne", vibe: "Avant-garde", category: "Sans", className: "font-syne" },
  { id: "raleway", label: "Raleway", vibe: "Light & airy", category: "Sans", className: "font-raleway" },
  { id: "montserrat", label: "Montserrat", vibe: "Urban versatile", category: "Sans", className: "font-montserrat" },
  { id: "manrope", label: "Manrope", vibe: "Rounded modern", category: "Sans", className: "font-manrope" },
  { id: "jost", label: "Jost", vibe: "Futura-inspired", category: "Sans", className: "font-jost" },
];

export const FONT_BY_STYLE: Record<string, PostcardFont> = {
  modern: "outfit",
  retro: "bebas",
  vintage: "cormorant",
  nordic: "raleway",
  noir: "oswald",
  golden: "fraunces",
  tropical: "montserrat",
  pastel: "dancing",
  cinematic: "cinzel",
  desert: "lora",
  dream: "parisienne",
  coastal: "jost",
  sunbleach: "raleway",
  midnight: "syne",
  blossom: "parisienne",
};

export const FONT_CATEGORIES: FontCategory[] = ["Serif", "Script", "Display", "Sans"];

export const FEATURED_FONTS = POSTCARD_FONTS.filter((f) => f.featured);

export function getFontClass(font: PostcardFont): string {
  return POSTCARD_FONTS.find((f) => f.id === font)?.className ?? "font-caslon";
}

export function getFontMeta(font: PostcardFont) {
  return POSTCARD_FONTS.find((f) => f.id === font);
}
