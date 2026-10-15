-- GDPR za webinar mailove: odjava, verzija privole, marketinska privola i
-- zapis privola (povijesni dokaz).
--
-- NE izvrsava se automatski. Pokreni JEDNOM rucno u Supabase SQL editoru,
-- PRIJE deploya koda s grane gdpr-odjava. Skripta je idempotentna (if not
-- exists / where not exists), pa ponovno pokretanje ne radi stetu.

begin;

-- 1. Novi stupci na prijavama
alter table public.prijave
  add column if not exists consent_version text,
  add column if not exists marketing_opt_in boolean not null default false,
  add column if not exists marketing_opt_in_ts timestamptz,
  add column if not exists odjava_ts timestamptz,
  add column if not exists odjava_izvor text;

alter table public.prijave
  drop constraint if exists prijave_odjava_izvor_check;
alter table public.prijave
  add constraint prijave_odjava_izvor_check
  check (odjava_izvor is null or odjava_izvor in ('link', 'one-click', 'resend', 'rucno'));

-- Postojeci retci: privola dana uz tekst iz srpnja 2026 ("Prihvacam da
-- aiprobaj (Fraviz Studio) obradi moje podatke radi prijave na webinar i
-- slanja detalja."). Marketinske privole nije bilo, pa marketing_opt_in
-- ostaje false (default).
update public.prijave
  set consent_version = '2026-07'
  where consent_version is null and consent = true;

-- 2. Zapis privola i odjava (append-only). Ponovna prijava na prijavama
--    prepise consent_ts / consent_ip / consent_version, a ovdje ostaje svaki
--    dogadjaj s verzijom teksta, vremenom i IP adresom.
create table if not exists public.privole_log (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  email text not null,
  dogadjaj text not null check (dogadjaj in ('privola', 'odjava')),
  consent_version text,
  marketing_opt_in boolean,
  izvor text,
  ip text
);

create index if not exists privole_log_email_idx on public.privole_log (email);

-- Deny-all kao prijave: bez policyja anon/authenticated nemaju pristup,
-- service_role (server) zaobilazi RLS.
alter table public.privole_log enable row level security;

-- Povijesni dokaz za postojece prijave, prije nego ih ponovna prijava prepise.
insert into public.privole_log (created_at, email, dogadjaj, consent_version, marketing_opt_in, izvor, ip)
select coalesce(p.consent_ts, p.created_at), p.email, 'privola', '2026-07', false, p.izvor, p.consent_ip::text
from public.prijave p
where p.consent = true
  and not exists (
    select 1 from public.privole_log l
    where l.email = p.email and l.dogadjaj = 'privola' and l.consent_version = '2026-07'
  );

commit;
