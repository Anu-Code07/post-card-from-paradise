-- Fine-grained style customization
alter table public.postcards
  add column if not exists warmth text default 'neutral'
    check (warmth in ('cool', 'neutral', 'warm'));

alter table public.postcards
  add column if not exists brightness text default 'normal'
    check (brightness in ('dim', 'normal', 'bright'));

alter table public.postcards
  add column if not exists overlay_depth text default 'medium'
    check (overlay_depth in ('light', 'medium', 'deep'));

alter table public.postcards
  add column if not exists corners text default 'soft'
    check (corners in ('sharp', 'soft', 'round'));

alter table public.postcards
  add column if not exists card_shadow text default 'lifted'
    check (card_shadow in ('flat', 'soft', 'lifted'));

alter table public.postcards
  add column if not exists photo_frame text default 'none'
    check (photo_frame in ('none', 'white', 'dark', 'vintage'));

alter table public.postcards
  add column if not exists text_fx text default 'shadow'
    check (text_fx in ('plain', 'shadow', 'glow', 'outline'));

alter table public.postcards
  add column if not exists show_stamp boolean default true;

alter table public.postcards
  add column if not exists show_tape boolean default true;

-- Three more mood presets
alter table public.postcards drop constraint if exists postcards_style_check;

alter table public.postcards
  add constraint postcards_style_check check (style in (
    'modern', 'retro', 'vintage', 'nordic', 'noir', 'golden',
    'tropical', 'pastel', 'cinematic', 'desert', 'dream', 'coastal',
    'sunbleach', 'midnight', 'blossom'
  ));
