alter table public.postcards
  add column if not exists font text default 'caslon'
  check (font in ('caslon', 'caveat', 'playfair', 'bebas', 'cormorant', 'space', 'italiana'));
