
#!/bin/bash
set -euo pipefail

REPO="Bridger-Labs/getgive.co"

issue() {
  local title="$1"
  local body
  body="$(cat)"
  gh issue create --repo "$REPO" \
    --title "$title" \
    --body "$body"
}

issue "[M2][P0] Complete member authentication and account security" <<'EOF'
## Scope
Finish the existing Payload member authentication implementation.

## Acceptance criteria
- [ ] Registration, login, and logout work
- [ ] Member accounts remain separate from CMS administrators
- [ ] Members can only access their own private information
- [ ] Email verification and password recovery work
- [ ] Protected routes reject unauthenticated users
- [ ] Authentication and authorization tests pass
EOF

issue "[M2][P1] Implement Google OAuth sign-in" <<'EOF'
## Scope
Allow members to register and sign in using Google.

## Acceptance criteria
- [ ] Google OAuth configured securely
- [ ] Existing accounts can link Google credentials safely
- [ ] Duplicate member accounts are prevented
- [ ] OAuth callbacks and error states are tested
EOF

issue "[M2][P1] Complete member profiles and account settings" <<'EOF'
## Scope
Support public/private profiles, biography, contact information, and shipping addresses.

## Acceptance criteria
- [ ] Members can edit their profiles
- [ ] Profile visibility is configurable
- [ ] Contact details and addresses are private by default
- [ ] Updates are validated and persisted
EOF

issue "[M3][P0] Create wishlist and wishlist-item collections" <<'EOF'
## Scope
Implement the Payload collections, relationships, and permissions.

## Acceptance criteria
- [ ] Members can create multiple wishlists
- [ ] Lists support names, descriptions, and event dates
- [ ] Items support titles, URLs, images, prices, and notes
- [ ] Priority, quantity, and product variants are supported
- [ ] Ownership and access permissions are tested
EOF

issue "[M3][P0] Build wishlist dashboard and product-card UI" <<'EOF'
## Scope
Build responsive wishlist management screens.

## Acceptance criteria
- [ ] Users can create, edit, and delete lists and items
- [ ] Product image and title link to the retailer
- [ ] Edit/delete icons appear on hover and keyboard focus
- [ ] Controls remain accessible on mobile devices
- [ ] Items support drag-and-drop priority ordering
EOF

issue "[M3][P0] Implement wishlist privacy and sharing" <<'EOF'
## Scope
Add private, group-only, unlisted, and public list visibility.

## Acceptance criteria
- [ ] Each visibility mode enforces server-side permissions
- [ ] Shareable URLs work
- [ ] Private lists cannot be accessed through shared URLs
- [ ] Public URLs never expose private contact information
EOF

issue "[M3][P1] Import products from retailer URLs" <<'EOF'
## Scope
Create a retailer-independent product metadata importer.

## Acceptance criteria
- [ ] URL input supports common retailer links
- [ ] Metadata extraction attempts title, price, image, and description
- [ ] Users can manually correct or enter every field
- [ ] Original product URLs are preserved
- [ ] SSRF protections and URL validation are implemented
EOF

issue "[M4][P0] Implement secret gift reservations" <<'EOF'
## Scope
Prevent duplicate gift purchases while preserving surprises.

## Acceptance criteria
- [ ] Shoppers can reserve and mark items as purchased
- [ ] Wishlist owners cannot see reservation spoilers
- [ ] Other shoppers see reserved/purchased status
- [ ] Guest reservations use secure tokens
- [ ] Concurrent reservation attempts are handled safely
EOF

issue "[M4][P1] Implement groups and member invitations" <<'EOF'
## Scope
Support persistent families, groups, and collaborative lists.

## Acceptance criteria
- [ ] Members can create and manage groups
- [ ] Groups support owners, editors, and viewers
- [ ] Invitations work through secure links
- [ ] Group membership can be revoked
- [ ] Permission checks prevent unauthorized editing
EOF

issue "[M5][P0] Build customizable event templates and rule engine" <<'EOF'
## Scope
Implement configurable gift-exchange rules with built-in templates.

## Acceptance criteria
- [ ] Templates support Christmas, birthdays, weddings, showers, and custom events
- [ ] Price limits, dates, exclusions, and written rules are supported
- [ ] White Elephant supports configurable stealing and turn rules
- [ ] Organizers can save and reuse custom templates
- [ ] Structured rules are validated server-side
EOF

issue "[M5][P1] Implement gift-exchange assignments" <<'EOF'
## Scope
Support Secret Santa, Pollyanna, and White Elephant game mechanics.

## Acceptance criteria
- [ ] Random recipient assignments work
- [ ] Assignment exclusions are enforced
- [ ] Assignments remain secret
- [ ] White Elephant supports randomized turn order
- [ ] Organizers can handle participant changes safely
EOF

issue "[M6][P1] Build notifications and affiliate monetization foundation" <<'EOF'
## Scope
Introduce event reminders and approved retailer referral links.

## Acceptance criteria
- [ ] Email invitations and reminder schedules work
- [ ] Members can manage notification preferences
- [ ] Merchant-specific affiliate links are supported
- [ ] Original retailer URLs are preserved
- [ ] Affiliate disclosures appear where required
- [ ] Ad placements remain disabled until a later phase
EOF

echo "GetGive roadmap issues created."

