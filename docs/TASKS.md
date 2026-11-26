# Nyarko's Hub development tasks

Version 1.0 · 26 November 2026  
Companions: [PRD.md](PRD.md), [UI-UX.md](UI-UX.md), [TECHNICAL.md](TECHNICAL.md)

Status key: **Done** in the current prototype, **Next** for the first commerce release, **Later** for phase 2 and 3.

Do not start payment or admin work until Nyarko's Hub confirms the open items in PRD section 17. The launch catalogue is the six knit polos already on the site.

## Already delivered

| ID | Task | Where |
| --- | --- | --- |
| D-01 | Next.js storefront with Tailwind and motion | `src/app`, `src/components` |
| D-02 | Homepage hero, categories, product grid, promo, lookbook, newsletter UI | `src/app/page.tsx` |
| D-03 | Six polo products and studio photos | `src/lib/data.ts`, `public/products` |
| D-04 | Shop and category routes | `src/app/shop` |
| D-05 | Cart and account placeholders | `src/app/cart`, `src/app/account` |
| D-06 | GitHub and Vercel production | https://nyarkos-hub.vercel.app |

These screens are not accepted as commerce features yet. Cart totals, search, checkout, and accounts are still visual.

## Release 1 — store that can sell

### Foundation

| ID | Task | Acceptance |
| --- | --- | --- |
| F-01 | Create the Supabase project and environments | Local and production use separate projects |
| F-02 | Add the tables and constraints in TECHNICAL.md | Foreign keys and unique SKUs exist |
| F-03 | Add row policies for public catalogue and private customer data | A customer cannot read another customer's order |
| F-04 | Seed the six polos, one variant each, prices, and images | The shop renders from the database |
| F-05 | Remove the static catalogue once the seed matches production | No duplicate prices |

### Storefront shopping

| ID | Task | Maps to |
| --- | --- | --- |
| S-01 | Product page with gallery, price, and stock | AC-04 |
| S-02 | Working cart stored for the guest and the signed-in customer | AC-05, AC-06 |
| S-03 | Search by name | AC-02 |
| S-04 | Filters for price, size, colour, and availability, plus sort | AC-03 |
| S-05 | Recently viewed in the browser | PRD section 7 |
| S-06 | Empty, loading, and out-of-stock states | UI spec |
| S-07 | Sitemap, robots, and product metadata | AC-20 |

Quick view, wishlist accounts, and reviews wait until release 2. Quick add may add the only in-stock variant.

### Checkout and payment

Blocked on a Paystack or Hubtel merchant account.

| ID | Task | Acceptance |
| --- | --- | --- |
| C-01 | Checkout form for guest contact and Ghana address | AC-07 |
| C-02 | Delivery methods with prices shown before pay | Delivery charge is visible |
| C-03 | Create a pending order and reserve stock in one transaction | AC-11 starts here |
| C-04 | Start Paystack and verify the webhook signature | AC-08 |
| C-05 | Successful payment confirms the order and reduces stock | AC-09 |
| C-06 | Failed or duplicate callbacks do not create a second paid order | AC-10 |
| C-07 | Confirmation page and email with the order reference | AC-12 |
| C-08 | Guest tracking with reference plus phone | AC-16 |

### Admin, minimum

| ID | Task | Acceptance |
| --- | --- | --- |
| A-01 | Staff sign-in and permission check | AC-18 |
| A-02 | Create and edit products, images, and variants | AC-13 |
| A-03 | Adjust stock with a movement record | AC-14 |
| A-04 | Order list, detail, status, and tracking number | AC-15 |
| A-05 | Edit announcement text and hero content | AC-17, limited |

Dashboard charts, coupons, reports, and extra staff roles are release 2. One super admin is enough for launch.

### Release 1 test gate

Run the payment cases in PRD section 15 against Paystack test keys: success, failure, cancel, and the same webhook twice. Two parallel checkouts of the last unit must leave stock at zero and only one paid order.

## Release 2 — operate the business

| ID | Task |
| --- | --- |
| B-01 | Customer accounts, Google sign-in, addresses, and order history |
| B-02 | Wishlist and restock consent |
| B-03 | Coupon validation on the server |
| B-04 | Reviews limited to verified purchases, with moderation |
| B-05 | Homepage section editor |
| B-06 | Refunds, invoices, and CSV export |
| B-07 | Low-stock list and sales summary on the dashboard |
| B-08 | Abandoned-cart record and one email reminder |
| B-09 | FAQ, policies, contact, and WhatsApp button |
| B-10 | GA4 and Meta Pixel after a consent choice |

## Release 3 — growth

Recommendations, shop-the-look outfits, loyalty, gift cards, WhatsApp and SMS notifications, affiliates, and any AI features. Each one ships behind its own flag so the store keeps working if it is off.

## Suggested build order

1. F-01 to F-05, then point the existing product grid at the database.
2. S-01 and S-02, so every polo has a real page and a real cart.
3. C-01 to C-08 when payment keys exist.
4. A-01 to A-05 so the client can change products without a code deploy.
5. S-03, S-04, and S-07 before calling the storefront complete.
6. Release 2 only after a real order has been placed and fulfilled in test.

## Client inputs still required

- Paystack or Hubtel account and test keys
- Delivery zones and fees
- Return policy text
- Final logo and accent colour
- Whether new categories beyond knit polos are in the first paid launch
- The inbox that should receive order mail
