alter table public.postcards drop constraint if exists postcards_font_check;

alter table public.postcards
  add constraint postcards_font_check check (font in (
    'caslon', 'cormorant', 'playfair', 'lora', 'fraunces', 'italiana',
    'garamond', 'crimson', 'bodoni', 'baskerville', 'yeseva',
    'caveat', 'sacramento', 'alex', 'dancing', 'vibes', 'parisienne', 'satisfy',
    'bebas', 'abril', 'oswald', 'cinzel', 'anton',
    'space', 'raleway', 'outfit', 'syne', 'montserrat', 'manrope', 'jost'
  ));
