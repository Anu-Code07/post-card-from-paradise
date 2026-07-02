-- Catch-up migration: run in Supabase Dashboard → SQL Editor
-- Fixes: "Could not find the 'back_image_url' column" on publish/share

-- 004 — back image, layout, text positions
alter table public.postcards add column if not exists back_image_url text;
alter table public.postcards add column if not exists layout text default 'editorial';
alter table public.postcards add column if not exists title_x numeric;
alter table public.postcards add column if not exists title_y numeric;
alter table public.postcards add column if not exists location_x numeric;
alter table public.postcards add column if not exists location_y numeric;

-- 002 — font
alter table public.postcards add column if not exists font text default 'caslon';

-- 005 / 006 — surfaces & finish
alter table public.postcards add column if not exists color_mode text default 'paper';
alter table public.postcards add column if not exists vignette text default 'none';
alter table public.postcards add column if not exists grain boolean default false;

-- 007 — customization tweaks
alter table public.postcards add column if not exists warmth text default 'neutral';
alter table public.postcards add column if not exists brightness text default 'normal';
alter table public.postcards add column if not exists overlay_depth text default 'medium';
alter table public.postcards add column if not exists corners text default 'soft';
alter table public.postcards add column if not exists card_shadow text default 'lifted';
alter table public.postcards add column if not exists photo_frame text default 'none';
alter table public.postcards add column if not exists text_fx text default 'shadow';
alter table public.postcards add column if not exists show_stamp boolean default true;
alter table public.postcards add column if not exists show_tape boolean default true;

-- Expand style presets (15 moods)
alter table public.postcards drop constraint if exists postcards_style_check;
alter table public.postcards
  add constraint postcards_style_check check (style in (
    'modern', 'retro', 'vintage', 'nordic', 'noir', 'golden',
    'tropical', 'pastel', 'cinematic', 'desert', 'dream', 'coastal',
    'sunbleach', 'midnight', 'blossom'
  ));

-- Expand font list
alter table public.postcards drop constraint if exists postcards_font_check;
alter table public.postcards
  add constraint postcards_font_check check (font in (
    'caslon', 'cormorant', 'playfair', 'lora', 'fraunces', 'italiana',
    'garamond', 'crimson', 'bodoni', 'baskerville', 'yeseva',
    'caveat', 'sacramento', 'alex', 'dancing', 'vibes', 'parisienne', 'satisfy',
    'bebas', 'abril', 'oswald', 'cinzel', 'anton',
    'space', 'raleway', 'outfit', 'syne', 'montserrat', 'manrope', 'jost'
  ));

-- Surface color modes
alter table public.postcards drop constraint if exists postcards_color_mode_check;
alter table public.postcards
  add constraint postcards_color_mode_check check (color_mode in (
    'paper', 'kraft', 'blush', 'slate', 'ocean', 'image'
  ));

-- Layout frames
alter table public.postcards drop constraint if exists postcards_layout_check;
alter table public.postcards
  add constraint postcards_layout_check check (layout in (
    'editorial', 'polaroid', 'journal', 'scrapbook', 'vintage', 'story'
  ));

-- Finish options
alter table public.postcards drop constraint if exists postcards_vignette_check;
alter table public.postcards
  add constraint postcards_vignette_check check (vignette in ('none', 'soft', 'moody'));

alter table public.postcards drop constraint if exists postcards_warmth_check;
alter table public.postcards
  add constraint postcards_warmth_check check (warmth in ('cool', 'neutral', 'warm'));

alter table public.postcards drop constraint if exists postcards_brightness_check;
alter table public.postcards
  add constraint postcards_brightness_check check (brightness in ('dim', 'normal', 'bright'));

alter table public.postcards drop constraint if exists postcards_overlay_depth_check;
alter table public.postcards
  add constraint postcards_overlay_depth_check check (overlay_depth in ('light', 'medium', 'deep'));

alter table public.postcards drop constraint if exists postcards_corners_check;
alter table public.postcards
  add constraint postcards_corners_check check (corners in ('sharp', 'soft', 'round'));

alter table public.postcards drop constraint if exists postcards_card_shadow_check;
alter table public.postcards
  add constraint postcards_card_shadow_check check (card_shadow in ('flat', 'soft', 'lifted'));

alter table public.postcards drop constraint if exists postcards_photo_frame_check;
alter table public.postcards
  add constraint postcards_photo_frame_check check (photo_frame in ('none', 'white', 'dark', 'vintage'));

alter table public.postcards drop constraint if exists postcards_text_fx_check;
alter table public.postcards
  add constraint postcards_text_fx_check check (text_fx in ('plain', 'shadow', 'glow', 'outline'));

-- Refresh PostgREST schema cache
notify pgrst, 'reload schema';
