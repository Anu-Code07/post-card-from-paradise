import { Vibrant } from "node-vibrant/browser";

export interface ImagePalette {
  primary: string;
  secondary: string;
  accent: string;
  textOnPrimary: string;
  textOnSecondary: string;
}

const FALLBACK: ImagePalette = {
  primary: "#c4a882",
  secondary: "#e8dcc8",
  accent: "#8b7355",
  textOnPrimary: "#1b1c1b",
  textOnSecondary: "#3d3429",
};

function luminance(hex: string) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function textOn(bg: string) {
  return luminance(bg) > 0.55 ? "#2a2520" : "#fbf9f7";
}

export async function extractImagePalette(url: string): Promise<ImagePalette> {
  if (typeof window === "undefined") return FALLBACK;

  try {
    const palette = await Vibrant.from(url).getPalette();
    const vibrant = palette.Vibrant?.hex ?? FALLBACK.primary;
    const muted = palette.Muted?.hex ?? palette.LightMuted?.hex ?? FALLBACK.secondary;
    const dark = palette.DarkVibrant?.hex ?? palette.DarkMuted?.hex ?? FALLBACK.accent;

    return {
      primary: vibrant,
      secondary: muted,
      accent: dark,
      textOnPrimary: textOn(vibrant),
      textOnSecondary: textOn(muted),
    };
  } catch {
    return FALLBACK;
  }
}
