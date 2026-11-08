# GetGive

**GetGive** is a mobile-friendly wishlist and gift-exchange application. Create personal or collaborative wishlists, import products from different retailers, coordinate surprise gifts, and run configurable gift exchanges such as Secret Santa/Pollyanna and White Elephant.

- **Primary site:** <https://getgive.co> (planned production domain)
- **Secondary domain:** <https://getgive.gifts> (planned permanent redirect to the primary site)
- **Repository:** <https://github.com/Bridger-Labs/getgive.co>
- **Product specification:** [`docs/PRD.md`](docs/PRD.md) (v0.4)

> **Project status — November 8, 2026:** Initial setup in progress. The official Payload blank starter is being generated **locally**. As last checked, the remote GitHub repository contained only `README.md` and `.gitignore`. A functioning app, configured Neon database, Vercel deployment, and integrations have **not** been verified. Do not treat the starter as production-ready. The repository was public when last checked; confirm visibility before committing anything sensitive.

## Technology decisions

| Concern | Decision |
| --- | --- |
| Application | Next.js App Router, React, TypeScript |
| Backend / admin | Payload CMS (official blank starter) |
| Database | **Neon PostgreSQL for local development, preview, and production** (separate database branches / environments) |
| Hosting | **Vercel** (not a Docker-hosted server) |
| UI | Tailwind CSS + shadcn/ui; Lucide icons |
| Drag-and-drop | dnd-kit (when wishlist ordering is implemented) |
| Media | Vercel Blob in production (when uploads are implemented) |
| Email | Resend + React Email (planned) |
| Authentication | Payload authentication with a vetted Google sign-in integration (planned) |
| Testing | Unit/integration tests and Playwright E2E (planned) |
| Monetization | Approved affiliate links; ads disabled by default and considered later |
| Coding agent | Payload skill may be installed for Cursor, Codex, Claude Code, or none; it **does not** affect runtime |

We are **not using Docker for development**. Neon hosts PostgreSQL for all environments; the Next.js/Payload server runs locally during development and on Vercel for deployed environments.

## Getting started locally

### 1. Prerequisites

- Git and npm.
- A Node.js release supported by the installed Payload and Next.js versions. At the time of writing, Payload requires Node.js `^22.23.4` or `>=24.22.1`; **Node 24.22.1+** is a good baseline. See the [Payload installation guide](https://payloadcms.com/docs/getting-started/installation).
- A [Neon](https://console.neon.tech/) project and a **development** database branch; do not point your local `.env` at production.

```bash
node --version
npm --version
```

If using nvm:

```bash
nvm install 24
nvm use 24
```

### 2. Clone the repository

```bash
git clone https://github.com/Bridger-Labs/getgive.co.git
cd getgive.co
```

If you **already generated Payload in this checkout**, do not run the scaffolder again. Continue with the environment setup below.

If it is genuinely uninitialized (no `package.json`), run **from the repository directory**:

```bash
npx create-payload-app@latest . -t blank --use-npm
```

Choose **PostgreSQL** when prompted and provide your **Neon development** connection string if requested. You may also be prompted to install the Payload skill for a coding agent; choose the editor/agent you actually use (e.g., Cursor). That is optional tooling guidance, not a framework dependency.

> **Existing-file caveat:** `create-payload-app` may refuse to initialize in a non-empty directory, even if it has only a README or `.gitignore`. If it does, first preserve the files, then follow the CLI's supported instructions for initializing an existing directory. Do not delete `.git` or overwrite work just to appease the scaffolder.

### 3. Configure Neon and environment variables

In Neon, create a project named `getgive` (or use an existing one) and keep distinct branches for `development` and `production`; a `preview` branch or per-preview branches may be added later. Copy the **development branch** PostgreSQL connection string from Neon.

Payload's scaffold ordinarily uses `DATABASE_URL`, but **check `src/payload.config.ts` (or the generated config path)** to confirm the actual variable name used by the installed template.

Create or edit `.env` in the repository root:

```dotenv
# Local development — use the exact value from Neon, including sslmode=require
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
PAYLOAD_SECRET="<random-long-secret>"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Generate a secret with:

```bash
openssl rand -hex 32
```

`NEXT_PUBLIC_SITE_URL` is a proposed GetGive convention; add or change it in application code when needed. The blank starter may instead use `NEXT_PUBLIC_SERVER_URL` or another value. **Do not rename scaffold environment variables without updating the corresponding config.**

Never commit `.env`, Neon URLs containing passwords, OAuth client secrets, or provider keys. Check that `.gitignore` covers `.env*` while allowing a safe `.env.example`.

### 4. Install, run, and verify

```bash
npm install
npm run dev
```

Visit:

- <http://localhost:3000> — app root (initially the starter UI)
- <http://localhost:3000/admin> — Payload admin; create the first administrator if prompted

**Important:** A blank Payload starter does *not* implement GetGive's end-user registration, Google OAuth, gift reservations, groups, or affiliate links. Those are subsequent milestones.

Review available scripts in your generated `package.json` before using them:

```bash
npm run
```

Typical verification commands (only when scripts exist):

```bash
npm run build
npm run lint
```

If scripts are missing, add them intentionally after reviewing the selected template, rather than assuming the starter has them.

### 5. Git workflow

Check changes and verify secrets are not being tracked:

```bash
git status
git diff --stat
```

For a first local foundation commit:

```bash
git add .
git status                         # inspect the staged paths for secrets
git commit -m "feat: initialize GetGive with Payload and Neon"
git push origin main
```

If preferred, create a `feature/project-foundation` branch and open a pull request. The repo is under the **Bridger-Labs** organization, not the personal `mdefeo/getgive` namespace. If push is blocked by organization access, authenticate Git locally with an authorized GitHub identity or contact the organization owner.

## Deployment outline (not yet completed)

1. Import `Bridger-Labs/getgive.co` into Vercel as a Next.js project.
2. Connect a **production** Neon database branch and configure a distinct `DATABASE_URL` and `PAYLOAD_SECRET` for Vercel Production. Keep Preview/Development isolated from production data and secrets.
3. Use reviewed, committed Payload migrations for production schema changes. Payload's automatic development `db push` is **not** the production migration process.
4. Add persistent file storage (e.g., Vercel Blob) **before** production media uploads; Vercel's local filesystem is not persistent storage.
5. Set the relevant public application URL and trusted origins, and configure email before invitations or account verification are enabled.
6. Assign `getgive.co` as primary and configure `getgive.gifts` as a permanent redirect **after** configuring and verifying DNS. DNS/domain redirects are not active merely because they appear here.
7. Set up CI, error reporting, backups/recovery, rate limits, and access-control tests before public launch.
8. Use a Vercel plan that permits intended commercial use before enabling affiliate revenue or ads; review current provider terms/prices.

For the database adapter and migration guidance, refer to [Payload PostgreSQL documentation](https://payloadcms.com/docs/database/postgres) and [Payload production deployment guidance](https://payloadcms.com/docs/production/deployment).

## Planned app structure

Keep the official Payload-generated directory layout intact. As features are built, introduce clear module boundaries:

```text
getgive.co/
├── src/
│   ├── app/                  # Next.js route groups + Payload routes
│   ├── collections/          # Payload models and access controls
│   ├── components/           # Reusable UI, including product cards
│   ├── features/             # Wishlist, gifts, events, imports, monetization
│   └── payload.config.ts     # Payload configuration (if scaffold uses this path)
├── docs/
│   └── PRD.md               # Product requirements (v0.4)
├── public/
├── .env.example             # Add safe variable names; no secrets
├── package.json            # Generated by official Payload CLI
└── README.md
```

These are **planned paths**, not a claim that all folders have been generated or implemented.

## Product invariants

- Product **image and title are both retailer links**; links use approved affiliate destinations only when compliant, otherwise original product URLs.
- **Edit/Delete** buttons belong in the **top-right of each product card**, appearing on hover/focus and remaining usable on touch screens. Editing uses an explicit action; **no double-click editor**.
- User-created event rules can start from editable presets (including White Elephant), with both app-enforceable structured options and plain-language house rules.
- Secret gift reservations and exchange assignments must never leak to the recipient or unauthorized viewers through the UI **or** an API.
- Groups, events, and wishlists are separate durable entities.
- Private user data defaults private; all ad placements remain off until explicitly approved and enabled.

## Milestones and implementation status

| Milestone | Status |
| --- | --- |
| 0 — Repo and official Payload/Neon foundation | **In progress; local setup not verified** |
| 1 — Accounts and personal wishlists | Not started |
| 2 — Group sharing and secret reservations | Not started |
| 3 — Event templates, custom rules and gift exchange | Not started |
| 4 — Affiliates, security review and launch readiness | Not started |

See [the PRD](docs/PRD.md) for user stories, full scope, data model, acceptance criteria, risks, and launch gate.
