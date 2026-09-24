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

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Do not show the example event of 19 September 2026 as upcoming.
- An expired `next_event.date` is hidden by the API so past events never appear upcoming.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
