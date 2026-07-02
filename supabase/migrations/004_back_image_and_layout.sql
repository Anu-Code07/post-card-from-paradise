alter table public.postcards add column if not exists back_image_url text;
alter table public.postcards add column if not exists layout text default 'editorial';
alter table public.postcards add column if not exists title_x numeric;
alter table public.postcards add column if not exists title_y numeric;
alter table public.postcards add column if not exists location_x numeric;
alter table public.postcards add column if not exists location_y numeric;
