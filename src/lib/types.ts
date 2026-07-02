export type PostcardStyle =
  | "modern"
  | "retro"
  | "vintage"
  | "nordic"
  | "noir"
  | "golden"
  | "tropical"
  | "pastel"
  | "cinematic"
  | "desert"
  | "dream"
  | "coastal"
  | "sunbleach"
  | "midnight"
  | "blossom";

export type PostcardVignette = "none" | "soft" | "moody";

export type PostcardWarmth = "cool" | "neutral" | "warm";
export type PostcardBrightness = "dim" | "normal" | "bright";
export type PostcardOverlay = "light" | "medium" | "deep";
export type PostcardCorners = "sharp" | "soft" | "round";
export type PostcardShadow = "flat" | "soft" | "lifted";
export type PostcardPhotoFrame = "none" | "white" | "dark" | "vintage";
export type PostcardTextFx = "plain" | "shadow" | "glow" | "outline";

/** Fine-grained visual tweaks (Style tab) */
export interface PostcardTweaks {
  warmth: PostcardWarmth;
  brightness: PostcardBrightness;
  overlay: PostcardOverlay;
  corners: PostcardCorners;
  shadow: PostcardShadow;
  photoFrame: PostcardPhotoFrame;
  textFx: PostcardTextFx;
  showStamp: boolean;
  showTape: boolean;
}

/** Frame layouts from design spec */
export type PostcardLayout =
  | "editorial"
  | "polaroid"
  | "journal"
  | "scrapbook"
  | "vintage"
  | "story";

export type PostcardFont =
  | "caslon"
  | "cormorant"
  | "playfair"
  | "lora"
  | "fraunces"
  | "italiana"
  | "garamond"
  | "crimson"
  | "bodoni"
  | "baskerville"
  | "caveat"
  | "sacramento"
  | "alex"
  | "dancing"
  | "vibes"
  | "parisienne"
  | "satisfy"
  | "bebas"
  | "abril"
  | "oswald"
  | "cinzel"
  | "yeseva"
  | "anton"
  | "space"
  | "raleway"
  | "outfit"
  | "syne"
  | "montserrat"
  | "manrope"
  | "jost";

export type PostcardStatus = "draft" | "published";

/** Back / journal surface: paper presets or colors pulled from photo */
export type PostcardColorMode =
  | "paper"
  | "kraft"
  | "blush"
  | "slate"
  | "ocean"
  | "image";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Postcard {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  message: string;
  location: string;
  style: PostcardStyle;
  layout?: PostcardLayout;
  font: PostcardFont;
  title_x?: number;
  title_y?: number;
  location_x?: number;
  location_y?: number;
  image_url: string | null;
  back_image_url?: string | null;
  color_mode?: PostcardColorMode;
  vignette?: PostcardVignette;
  grain?: boolean;
  warmth?: PostcardWarmth;
  brightness?: PostcardBrightness;
  overlay_depth?: PostcardOverlay;
  corners?: PostcardCorners;
  card_shadow?: PostcardShadow;
  photo_frame?: PostcardPhotoFrame;
  text_fx?: PostcardTextFx;
  show_stamp?: boolean;
  show_tape?: boolean;
  status: PostcardStatus;
  views: number;
  created_at: string;
  updated_at: string;
}
