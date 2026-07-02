import type { PostcardLayout } from "./types";

export const LAYOUTS: {
  id: PostcardLayout;
  label: string;
  description: string;
  ratio: string;
  defaultFont: string;
}[] = [
  {
    id: "editorial",
    label: "Editorial",
    description: "Large photo, soft shadows, stamp & bold type",
    ratio: "3:2",
    defaultFont: "playfair",
  },
  {
    id: "polaroid",
    label: "Polaroid",
    description: "White mat, tape accent, handwritten caption",
    ratio: "4:5",
    defaultFont: "caveat",
  },
  {
    id: "journal",
    label: "Travel Journal",
    description: "Location pin, center image, travel metadata",
    ratio: "3:2",
    defaultFont: "space",
  },
  {
    id: "scrapbook",
    label: "Scrapbook",
    description: "Stickers, washi tape, torn-paper collage",
    ratio: "3:2",
    defaultFont: "caveat",
  },
  {
    id: "vintage",
    label: "Vintage",
    description: "Paper texture, ink lines, classic postal",
    ratio: "3:2",
    defaultFont: "crimson",
  },
  {
    id: "story",
    label: "Instagram Story",
    description: "Full-bleed vertical with IG-style header",
    ratio: "9:16",
    defaultFont: "outfit",
  },
];

export const LAYOUT_ASPECT: Record<PostcardLayout, string> = {
  editorial: "aspect-[3/2]",
  polaroid: "aspect-[4/5]",
  journal: "aspect-[3/2]",
  scrapbook: "aspect-[3/2]",
  vintage: "aspect-[3/2]",
  story: "aspect-[9/16]",
};

export const LAYOUT_MAX_WIDTH: Record<PostcardLayout, string> = {
  editorial: "max-w-full",
  polaroid: "max-w-[min(100%,20rem)]",
  journal: "max-w-full",
  scrapbook: "max-w-full",
  vintage: "max-w-full",
  story: "max-w-[min(100%,14rem)] sm:max-w-[min(100%,16rem)]",
};

export const LAYOUT_WRAPPER: Record<PostcardLayout, string> = {
  editorial: "layout-wrap-editorial",
  polaroid: "layout-wrap-polaroid",
  journal: "layout-wrap-journal",
  scrapbook: "layout-wrap-scrapbook",
  vintage: "layout-wrap-vintage",
  story: "layout-wrap-story",
};

export const DEFAULT_POSITIONS: Record<
  PostcardLayout,
  { titleX: number; titleY: number; locationX: number; locationY: number }
> = {
  editorial: { titleX: 6, titleY: 58, locationX: 6, locationY: 72 },
  polaroid: { titleX: 8, titleY: 82, locationX: 8, locationY: 90 },
  journal: { titleX: 6, titleY: 8, locationX: 22, locationY: 8 },
  scrapbook: { titleX: 6, titleY: 78, locationX: 6, locationY: 88 },
  vintage: { titleX: 8, titleY: 12, locationX: 8, locationY: 22 },
  story: { titleX: 4, titleY: 3, locationX: 32, locationY: 3 },
};
