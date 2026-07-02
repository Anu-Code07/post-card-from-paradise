/** Landing page photography — hosted URLs (update here only) */

export const LANDING_PHOTOS = {
  heroCover: {
    url: "https://iili.io/CY5nbeI.jpg",
    alt: "European building with climbing roses — Ireland Rogers / Unsplash",
  },
  heroLeft: {
    url: "https://iili.io/CY5o21f.jpg",
    alt: "Taj Mahal viewed through a sandstone arch — Sylwia Bartyzel / Unsplash",
  },
  heroRight: {
    url: "https://iili.io/CY5oHss.jpg",
    alt: "Coastal promenade — Pascal Debrunner / Unsplash",
  },
  courtyard: {
    url: "https://iili.io/CY5nQgR.jpg",
    alt: "European courtyard with climbing roses — Mihai Moisa / Unsplash",
  },
  mountains: {
    url: "https://iili.io/CY5nD5N.jpg",
    alt: "Mountain landscape — Jean Carlo Emer / Unsplash",
  },
  cityNight: {
    url: "https://iili.io/CY5o3g4.jpg",
    alt: "City waterfront at night — Zhang Xupeng / Unsplash",
  },
  styleCopenhagen: {
    url: "https://iili.io/CY5nmbt.jpg",
    alt: "Ivy-covered European building — Jazmin Quaynor / Unsplash",
  },
  styleRetro: {
    url: "https://iili.io/CY5odqG.jpg",
    alt: "Nighttime waterfront — Q. Zhang / Unsplash",
  },
  styleVintage: {
    url: "https://iili.io/CY5nbeI.jpg",
    alt: "European building with climbing roses — Ireland Rogers / Unsplash",
  },
} as const;

/** Hero postcard stack (center card + two behind) */
export const HERO_IMAGES = {
  center: LANDING_PHOTOS.heroCover,
  left: LANDING_PHOTOS.heroLeft,
  right: LANDING_PHOTOS.heroRight,
} as const;

/** How-it-works bento + mobile steps */
export const STEP_IMAGES = {
  design: LANDING_PHOTOS.courtyard,
  capture: LANDING_PHOTOS.courtyard,
  write: LANDING_PHOTOS.mountains,
  share: LANDING_PHOTOS.cityNight,
  brand: LANDING_PHOTOS.heroLeft,
} as const;

/** Curated style cards */
export const STYLE_IMAGES = {
  copenhagen: LANDING_PHOTOS.styleCopenhagen,
  retro: LANDING_PHOTOS.styleRetro,
  vintage: LANDING_PHOTOS.styleVintage,
} as const;
