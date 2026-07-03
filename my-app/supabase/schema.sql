-- 도토리 (Dotori) issues table
create table if not exists public.issues (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary_1 text not null,
  summary_2 text not null,
  summary_3 text not null,
  category text not null check (category in ('society', 'economy', 'tech', 'culture')),
  source_url text not null,
  source_name text not null,
  published_at date not null,
  created_at timestamptz not null default now()
);

create index if not exists issues_published_at_idx on public.issues (published_at);
create index if not exists issues_category_idx on public.issues (category);
create unique index if not exists issues_source_url_published_at_key
  on public.issues (source_url, published_at);

alter table public.issues enable row level security;

-- Public read access (anon key) for the list/detail pages.
create policy "Issues are publicly readable"
  on public.issues for select
  using (true);

-- Writes only via the service role key (used by /api/cron), so no insert/update
-- policy is granted to anon/authenticated roles.
