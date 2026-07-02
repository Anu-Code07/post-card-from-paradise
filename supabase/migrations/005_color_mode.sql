alter table public.postcards add column if not exists color_mode text default 'paper'
  check (color_mode in ('paper', 'image'));
