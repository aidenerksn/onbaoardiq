-- ── customers ──────────────────────────────────────────────────────────────
create table if not exists public.customers (
  id                 uuid        primary key default gen_random_uuid(),
  email              text        not null unique,
  stripe_customer_id text,
  plan               text        not null default 'starter',
  created_at         timestamptz not null default now()
);

alter table public.customers enable row level security;

-- Customers can only read/update their own row (matched by auth.uid())
create policy "customers: owner select"
  on public.customers for select
  to authenticated
  using (id = auth.uid());

create policy "customers: owner update"
  on public.customers for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "customers: service role all"
  on public.customers for all
  to service_role
  using (true) with check (true);


-- ── tracked_apps ───────────────────────────────────────────────────────────
create table if not exists public.tracked_apps (
  id           uuid        primary key default gen_random_uuid(),
  customer_id  uuid        not null references public.customers(id) on delete cascade,
  name         text        not null,
  domain       text        not null,
  snippet_key  text        not null unique default gen_random_uuid()::text,
  created_at   timestamptz not null default now()
);

alter table public.tracked_apps enable row level security;

create policy "tracked_apps: owner all"
  on public.tracked_apps for all
  to authenticated
  using (customer_id = auth.uid())
  with check (customer_id = auth.uid());

create policy "tracked_apps: service role all"
  on public.tracked_apps for all
  to service_role
  using (true) with check (true);

create index if not exists tracked_apps_customer_id_idx on public.tracked_apps(customer_id);


-- ── events ─────────────────────────────────────────────────────────────────
create table if not exists public.events (
  id         uuid        primary key default gen_random_uuid(),
  app_id     uuid        not null references public.tracked_apps(id) on delete cascade,
  session_id text        not null,
  event_type text        not null,
  page_url   text,
  element    text,
  metadata   jsonb,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

-- Customers can only see events for their own apps
create policy "events: owner select"
  on public.events for select
  to authenticated
  using (
    app_id in (
      select id from public.tracked_apps where customer_id = auth.uid()
    )
  );

create policy "events: service role all"
  on public.events for all
  to service_role
  using (true) with check (true);

create index if not exists events_app_id_idx       on public.events(app_id);
create index if not exists events_session_id_idx   on public.events(session_id);
create index if not exists events_created_at_idx   on public.events(created_at);


-- ── user_sessions ──────────────────────────────────────────────────────────
create table if not exists public.user_sessions (
  id          uuid        primary key default gen_random_uuid(),
  app_id      uuid        not null references public.tracked_apps(id) on delete cascade,
  session_id  text        not null unique,
  first_seen  timestamptz not null default now(),
  last_seen   timestamptz not null default now(),
  page_count  int         not null default 0,
  score       int         not null default 100,
  rescued_at  timestamptz
);

alter table public.user_sessions enable row level security;

create policy "user_sessions: owner select"
  on public.user_sessions for select
  to authenticated
  using (
    app_id in (
      select id from public.tracked_apps where customer_id = auth.uid()
    )
  );

create policy "user_sessions: service role all"
  on public.user_sessions for all
  to service_role
  using (true) with check (true);

create index if not exists user_sessions_app_id_idx     on public.user_sessions(app_id);
create index if not exists user_sessions_session_id_idx on public.user_sessions(session_id);


-- ── triggers ───────────────────────────────────────────────────────────────
create table if not exists public.triggers (
  id             uuid        primary key default gen_random_uuid(),
  app_id         uuid        not null references public.tracked_apps(id) on delete cascade,
  name           text        not null,
  condition      jsonb       not null,
  action         text        not null,
  email_template text,
  active         boolean     not null default true,
  created_at     timestamptz not null default now()
);

alter table public.triggers enable row level security;

create policy "triggers: owner all"
  on public.triggers for all
  to authenticated
  using (
    app_id in (
      select id from public.tracked_apps where customer_id = auth.uid()
    )
  )
  with check (
    app_id in (
      select id from public.tracked_apps where customer_id = auth.uid()
    )
  );

create policy "triggers: service role all"
  on public.triggers for all
  to service_role
  using (true) with check (true);

create index if not exists triggers_app_id_idx on public.triggers(app_id);
