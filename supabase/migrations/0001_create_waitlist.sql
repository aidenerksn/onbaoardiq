create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  created_at  timestamptz not null default now()
);

-- Only the service role can read; anon role can only insert
alter table public.waitlist enable row level security;

create policy "Allow anonymous insert"
  on public.waitlist
  for insert
  to anon
  with check (true);

create policy "Allow service role full access"
  on public.waitlist
  for all
  to service_role
  using (true)
  with check (true);
