"use client";

import { useEffect, useState } from "react";
import { extractImagePalette, type ImagePalette } from "@/lib/image-colors";

const DEFAULT_PALETTE: ImagePalette = {
  primary: "#c4a882",
  secondary: "#e8dcc8",
  accent: "#8b7355",
  textOnPrimary: "#1b1c1b",
  textOnSecondary: "#3d3429",
};

export function useImagePalette(imageUrl: string | null) {
  const [palette, setPalette] = useState<ImagePalette>(DEFAULT_PALETTE);

  useEffect(() => {
    if (!imageUrl) {
      setPalette(DEFAULT_PALETTE);
      return;
    }
    let cancelled = false;
    extractImagePalette(imageUrl).then((p) => {
      if (!cancelled) setPalette(p);
    });
    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  return palette;
}
