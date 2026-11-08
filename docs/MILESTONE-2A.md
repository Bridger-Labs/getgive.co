# GetGive — Milestone 2A: Member accounts & profiles

**Status:** Implementation starter, not yet build-tested. Targets the `dev` branch and Payload `3.93.0` blank starter already in `Bridger-Labs/getgive.co`.

## What this adds

- Keeps `users` as the **Payload administrator** collection, preserving existing admin records.
- Adds `members` as the separate GetGive end-user authentication collection.
- Adds `/register`, `/login`, `/account` and the sign-out action using Payload's built-in REST auth and HTTP-only cookie endpoints.
- Private-by-default profile visibility, bio, contact phone, and shipping address.
- Member records are only readable/updatable by the member themselves and CMS administrators. **No public member data endpoint** is introduced, even when visibility is `public`.
- Basic rate limiting from Payload's built-in `maxLoginAttempts` on both auth collections.
- Small policy unit tests.

## Before copying

1. Commit your current local work on `dev` or create a dedicated feature branch.
2. Confirm the existing Payload Admin login works; **this patch changes the `users` collection access policy**. An admin must already exist before applying the policy, because public admin creation is disabled.
3. Compare the patch with local changes. The zip files match the `dev` branch checked on November 8, 2026, not uncommitted edits.

## Install

From repository root:

```bash
# Extract patch outside the repo first, then copy its contents into the repo.
unzip ~/Downloads/GetGive_Milestone_2A.zip -d /tmp/getgive-milestone-2a
rsync -av /tmp/getgive-milestone-2a/ ./

pnpm generate:types
pnpm build
pnpm test:int
pnpm dev
```

On first startup, Payload may prompt to apply schema changes for the new `members` collection. In Neon, point `.env` to the **development** branch, not production. Generate and review a migration before deploying this schema to Vercel; do not rely on development-time schema push for production.

## Test manually

1. `/admin`: existing CMS admin still logs in; user only admin access.
2. `/register`: register a member; redirect to `/account`.
3. `/login`: member can sign in, and wrong credentials are rejected.
4. `/account`: edit display name, bio, visibility, phone and address; refresh and confirm persisted values.
5. Confirm that two different member accounts cannot read or update one another's profile.
6. As a member, try opening `/admin` and verify the admin panel is unavailable.
7. Sign out, then visit `/account` directly; should redirect to `/login`.

## Known limitations (before public launch)

- Email verification and password reset **are not configured**. Install an email adapter (e.g. Resend) and enable `auth.verify` before opening public registration.
- Google OAuth is **not included** yet. It needs a vetted integration, domain/callback configuration, and secure account linking.
- Registration rate limiting and anti-bot protection need stronger controls than login-attempt limits before production.
- The UI asks for passwords of 12+ characters but a server-side minimum must be enforced separately. Do not rely on client-side checks for security.
- Email-change verification, self-service account deletion/export and contact sharing permissions are future work.
- `visibility: public` only stores the preference. Public profile pages will use **a separate field-limited projection** and must never expose address or phone.
- Product and wishlist features are not implemented in this slice.

## Recommended commit

```bash
git status
git add src/access src/collections src/payload.config.ts 'src/app/(frontend)' tests/unit docs/MILESTONE-2A.md
git commit -m "feat: add member authentication and profile settings"
git push -u origin dev
```
