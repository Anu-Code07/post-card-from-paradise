import type { ImagePalette } from "./image-colors";
import type { PostcardColorMode } from "./types";

export type PaperSurface = Exclude<PostcardColorMode, "image">;

/** Fixed paper surface palettes — not derived from the photo */
export const SURFACE_PALETTES: Record<PaperSurface, ImagePalette> = {
  paper: {
    primary: "#e8dcc8",
    secondary: "#f5f0e6",
    accent: "#c4a882",
    textOnPrimary: "#2a2520",
    textOnSecondary: "#3d3429",
  },
  kraft: {
    primary: "#c9b08a",
    secondary: "#ebe0cc",
    accent: "#8b6914",
    textOnPrimary: "#2a2218",
    textOnSecondary: "#4a3d2e",
  },
  blush: {
    primary: "#f0d4d8",
    secondary: "#fdf5f6",
    accent: "#c9a0a8",
    textOnPrimary: "#3d2a2e",
    textOnSecondary: "#5c4048",
  },
  slate: {
    primary: "#94a3b8",
    secondary: "#e8ecf0",
    accent: "#64748b",
    textOnPrimary: "#1e293b",
    textOnSecondary: "#334155",
  },
  ocean: {
    primary: "#7eb8c9",
    secondary: "#e8f4f8",
    accent: "#2d6a7a",
    textOnPrimary: "#0f2d3a",
    textOnSecondary: "#1e4a5f",
  },
};

/** @deprecated use SURFACE_PALETTES.paper */
export const PAPER_PALETTE = SURFACE_PALETTES.paper;

export function activePalette(
  extracted: ImagePalette,
  mode: PostcardColorMode
): ImagePalette {
  if (mode === "image") return extracted;
  return SURFACE_PALETTES[mode];
}

export function isPaperSurface(mode: PostcardColorMode): boolean {
  return mode !== "image";
}
