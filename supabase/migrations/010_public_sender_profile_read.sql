drop policy if exists "Public can read sender names for published postcards" on public.profiles;

create policy "Public can read sender names for published postcards"
  on public.profiles for select
  using (
    exists (
      select 1 from public.postcards
      where postcards.user_id = profiles.id
        and postcards.status = 'published'
    )
  );
