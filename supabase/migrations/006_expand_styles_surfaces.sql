-- Expand style presets
alter table public.postcards drop constraint if exists postcards_style_check;

alter table public.postcards
  add constraint postcards_style_check check (style in (
    'modern', 'retro', 'vintage', 'nordic', 'noir', 'golden',
    'tropical', 'pastel', 'cinematic', 'desert', 'dream', 'coastal'
  ));

-- Expand surface color modes
alter table public.postcards drop constraint if exists postcards_color_mode_check;

alter table public.postcards
  add constraint postcards_color_mode_check check (color_mode in (
    'paper', 'kraft', 'blush', 'slate', 'ocean', 'image'
  ));

-- Photo finish options
alter table public.postcards
  add column if not exists vignette text default 'none'
    check (vignette in ('none', 'soft', 'moody'));

alter table public.postcards
  add column if not exists grain boolean default false;
