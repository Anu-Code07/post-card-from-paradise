import type { ReactNode } from "react";
import type { ImagePalette } from "@/lib/image-colors";
import type { PostcardFont, PostcardColorMode, PostcardLayout, PostcardStyle, PostcardTweaks, PostcardVignette } from "@/lib/types";
import { getFontClass } from "@/lib/fonts";

export interface LayoutRenderProps {
  imageUrl: string | null;
  title: string;
  location: string;
  message: string;
  style: PostcardStyle;
  font: PostcardFont;
  palette: ImagePalette;
  colorMode: PostcardColorMode;
  vignette?: PostcardVignette;
  grain?: boolean;
  tweaks: PostcardTweaks;
  editable?: boolean;
  isLarge?: boolean;
  titleX: number;
  titleY: number;
  locationX: number;
  locationY: number;
  onTitleChange?: (v: string) => void;
  onLocationChange?: (v: string) => void;
  onMessageChange?: (v: string) => void;
  onTitlePositionChange?: (x: number, y: number) => void;
  onLocationPositionChange?: (x: number, y: number) => void;
  renderDraggableText: (opts: {
    titleX: number;
    titleY: number;
    locationX: number;
    locationY: number;
    variant: "light" | "dark" | "ink" | "ig";
    showFrom?: boolean;
  }) => ReactNode;
}

export function backMessageFont(layout: PostcardLayout): string {
  switch (layout) {
    case "polaroid":
    case "scrapbook":
      return "font-caveat";
    case "journal":
      return "font-space";
    case "vintage":
      return "font-crimson";
    case "story":
      return "font-outfit";
    default:
      return getFontClass("caveat" as PostcardFont);
  }
}
