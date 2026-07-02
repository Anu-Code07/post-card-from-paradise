-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Postcards
create table if not exists public.postcards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  slug text unique not null,
  title text default '',
  message text default '',
  location text default '',
  style text default 'retro' check (style in ('modern', 'retro', 'vintage')),
  image_url text,
  status text default 'draft' check (status in ('draft', 'published')),
  views int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists postcards_updated_at on public.postcards;
create trigger postcards_updated_at
  before update on public.postcards
  for each row execute procedure public.update_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.postcards enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Postcards policies
create policy "Anyone can view published postcards"
  on public.postcards for select
  using (status = 'published' or auth.uid() = user_id);

create policy "Users can insert own postcards"
  on public.postcards for insert
  with check (auth.uid() = user_id);

create policy "Users can update own postcards"
  on public.postcards for update
  using (auth.uid() = user_id);

create policy "Users can delete own postcards"
  on public.postcards for delete
  using (auth.uid() = user_id);

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('postcard-images', 'postcard-images', true)
on conflict (id) do nothing;

create policy "Anyone can view postcard images"
  on storage.objects for select
  using (bucket_id = 'postcard-images');

create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'postcard-images'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update own images"
  on storage.objects for update
  using (
    bucket_id = 'postcard-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete own images"
  on storage.objects for delete
  using (
    bucket_id = 'postcard-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Increment views function (callable by anyone for published postcards)
create or replace function public.increment_postcard_views(postcard_slug text)
returns void as $$
begin
  update public.postcards
  set views = views + 1
  where slug = postcard_slug and status = 'published';
end;
$$ language plpgsql security definer;
