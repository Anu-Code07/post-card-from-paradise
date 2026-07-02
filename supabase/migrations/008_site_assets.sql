-- Public site imagery (landing page, hero, curated styles)
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "Anyone can view site assets"
  on storage.objects for select
  using (bucket_id = 'site-assets');

create table if not exists public.site_assets (
  id text primary key,
  storage_path text not null,
  url text not null,
  alt_text text not null,
  category text not null,
  credit text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.site_assets enable row level security;

create policy "Anyone can read site assets"
  on public.site_assets for select
  using (true);

-- Seed rows — local /landing paths until upload script pushes to storage
insert into public.site_assets (id, storage_path, url, alt_text, category, credit, sort_order)
values
  (
    'courtyard',
    'landing/courtyard.png',
    '/landing/courtyard.png',
    'European courtyard with climbing roses',
    'travel',
    'Mihai Moisa / Unsplash',
    1
  ),
  (
    'taj-mahal',
    'landing/taj-mahal.png',
    '/landing/taj-mahal.png',
    'Taj Mahal viewed through a sandstone arch',
    'travel',
    'Sylwia Bartyzel / Unsplash',
    2
  ),
  (
    'railway',
    'landing/railway.png',
    '/landing/railway.png',
    'Abandoned railway cutting covered in ivy',
    'travel',
    'Florian Olivo / Unsplash',
    3
  ),
  (
    'city-night',
    'landing/city-night.png',
    '/landing/city-night.png',
    'City waterfront promenade at night',
    'travel',
    'Zhang Xupeng / Unsplash',
    4
  )
on conflict (id) do update set
  storage_path = excluded.storage_path,
  url = excluded.url,
  alt_text = excluded.alt_text,
  category = excluded.category,
  credit = excluded.credit,
  sort_order = excluded.sort_order;
