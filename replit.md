# Sahabat International

A first-phase Coventry nonprofit community landing page with event interest registration.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Landing page and form: `artifacts/sahabat-international/src/`
- Public API routes: `artifacts/api-server/src/routes/community.ts`
- API contract: `lib/api-spec/openapi.yaml`
- Event and interest database tables: `lib/db/src/schema/community.ts`

## Architecture decisions

- The next event has one editable row (`next_event`, id 1); date and venue start as null. Update this row only once details are confirmed. Never enter a private residential address as a public venue.
- Interest registrations are stored in `event_interest` for manual follow-up; the site does not send email or claim to do so. Keep access to names/emails limited to trusted organisers.
- A public event-editing endpoint is intentionally omitted so anonymous visitors cannot change event details.

## Product

- Welcoming overview of gatherings and pilot family learning.
- Interest registration with an optional before/after-event volunteering choice.
- Optional expressions of interest in sharing skills, teaching, mentoring, resources and partnership.

## Public content boundaries

- Use the approved text brief as the content source for this phase; source document uploads are not required.
- Sahabat is independent, rooted in an Islamic moral and spiritual foundation, and welcomes people of different faiths, cultures and backgrounds.
- Coventry and Warwick are its base. The grassroots journey began January 2024; the September 2026 working profile records company-limited-by-guarantee incorporation on 3 September 2026. Do not claim charity registration or invent a company number.
- January 2024–September 2026 impact figures are approximate grassroots records, not all delivery by the newly incorporated company. Omit financial totals.
- Keep current activities, pilot/emerging programmes, and international ambitions distinct. The physical/digital Sahabat Centre is planned, not operational.
- G-Hive is an independent collaborating social enterprise. Bee-Bright, Spice Journey and Golden Generation Fellowship must not be portrayed as Sahabat-owned. Individual contributions do not establish institutional endorsement.
- Never promise funding, scholarships, admissions, employment or immigration outcomes. Keep internal governance, vendor choices and sensitive administrative details off the public page.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Do not show the example event of 19 September 2026 as upcoming.
- An expired `next_event.date` is hidden by the API so past events never appear upcoming.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
