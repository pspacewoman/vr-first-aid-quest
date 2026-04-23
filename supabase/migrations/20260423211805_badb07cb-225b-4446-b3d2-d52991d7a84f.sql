create table if not exists public.prototype_access_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  score integer not null default 0,
  message text,
  created_at timestamptz not null default now()
);

alter table public.prototype_access_requests enable row level security;

create policy "Anyone can submit a prototype access request"
  on public.prototype_access_requests
  for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can read requests"
  on public.prototype_access_requests
  for select
  to authenticated
  using (true);

create index if not exists prototype_access_requests_created_at_idx
  on public.prototype_access_requests (created_at desc);