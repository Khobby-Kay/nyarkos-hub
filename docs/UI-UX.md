# Nyarko's Hub UI specification

Version 1.0 · 26 November 2026  
Companion to [PRD.md](PRD.md)

Visual system already in the prototype:

- Background `#faf8f6`, ink `#141414`, muted `#6b6560`, border `#e8e2dc`, surface `#ffffff`
- Accent `#e63946` until the client confirms a brand colour
- Display: Syne. Body: DM Sans
- Max content width 1400px
- Buttons are full pills. Product photography sits on `#e8ecf0`

Do not copy Fashion Nova's logo, photography, or page layout.

## Breakpoints

| Name | Width | Layout |
| --- | --- | --- |
| Phone | under 640px | 2-column product grid, drawer nav, stacked checkout |
| Tablet | 640–1023px | 3-column grid, drawer or compact nav |
| Desktop | 1024px and up | 4-column grid, inline nav, two-column hero and checkout |

Mobile is the primary design. Touch targets are at least 44px. Filters open in a sheet. The product page keeps price and add-to-cart visible at the bottom of the screen.

## Global chrome

**Announcement bar (HP-01).** One line, dismissible. Admin can change the text and schedule it.

**Header (HP-02, HP-03).** Logo links home. Desktop links come from the menu config. Search opens a panel. Account and cart are icon buttons. Cart shows a count. Phone uses a left drawer.

**Footer (HP-14).** Shop, help, and about columns, social links, privacy, and terms. Content is editable.

**WhatsApp.** Fixed button, bottom right, above the mobile add-to-cart bar. Hidden when it would cover checkout payment actions.

**Toasts.** Success, error, and stock warnings. They do not cover the primary button.

## Page inventory

| Route | Status in prototype | Required behaviour |
| --- | --- | --- |
| `/` | Built | Live sections from admin, not hard-coded only |
| `/shop` | Built | Filters, sort, pagination |
| `/shop/[category]` | Built | Category banner and description |
| `/product/[slug]` | Missing | Full product page |
| `/cart` | Static preview | Real cart |
| `/checkout` | Missing | Guest and account checkout |
| `/order/[reference]` | Missing | Confirmation and guest tracking |
| `/account` | Placeholder | Profile, addresses, orders, wishlist |
| `/account/orders/[id]` | Missing | Order detail and invoice |
| `/search` | Missing | Results and empty state |
| `/wishlist` | Missing | Saved products |
| `/about`, `/faq`, `/contact`, `/policies/*`, `/journal` | Missing | CMS pages |
| `/admin` | Missing | Dashboard and management |

## Homepage

Order, top to bottom. Admin can hide or reorder every block except header and footer.

1. Hero (HP-04). Image or muted video, eyebrow, headline, two actions. Phone stacks copy above the image.
2. Marquee of short promises.
3. Category scroller (HP-07).
4. Product rails: new arrivals (HP-05), best sellers (HP-06), trending (HP-08). Same product card.
5. Promo banner (HP-09).
6. Shop the look (HP-10). Phase 2 can stay as a styled lookbook until outfits are real products.
7. Reviews (HP-11). Phase 2 if there are no verified reviews yet. Hide the section when empty.
8. Social gallery (HP-12).
9. Newsletter (HP-13). Email field, success state, no fake subscription persistence.

## Product card

Image ratio 3:4. Contain the studio polo shots with padding. Cover is allowed for lifestyle images later.

Show name, current price, struck original price, discount badge, colour dots, and a badge such as New or Sale. Heart and quick add appear on hover on desktop and are always available on touch, because hover does not exist there.

Quick add asks for size when more than one size exists. If the only variant is in stock, it adds immediately.

The whole card links to `/product/[slug]`. The heart and quick add do not follow that link.

## Catalogue

Toolbar: result count, sort, and a Filters button. Active filters appear as removable chips.

Filter groups: category, price range, size, colour, in stock only. Phone shows them in a full-height sheet with Apply and Clear.

Sort: newest, price low to high, price high to low, popularity.

Pagination is numbered on desktop and a load-more button on phones. Empty state names the filters and offers a clear action.

## Product page

Desktop: gallery left, buy box right. The buy box stays in view while the gallery scrolls.

Phone: gallery, then title, price, colour, size, quantity, delivery note, and a sticky bar with price and Add to cart.

Gallery supports swipe and thumbnails. Sold-out variants stay visible and cannot be selected. The add button reads "Out of stock" when the chosen variant is unavailable.

Size guide opens a dialog. Share uses the device share sheet, with copy-link as fallback.

Below the buy box: description, fabric, care, delivery, returns, reviews, related products, and recently viewed.

## Cart

Line items with image, name, variant, quantity stepper, line price, and remove. Summary shows subtotal, discount, shipping, and total. Shipping shows "Calculated at checkout" until an address exists.

Discount code field with applied and error states. Save for later moves a line out of the payable cart.

Empty cart links back to `/shop`.

## Checkout

One column on the phone. On desktop, the form is on the left and the summary is on the right.

Steps are visible but the form can be one page with clear groups, which is faster on mobile:

1. Contact
2. Delivery address
3. Delivery method, with price on each option
4. Payment

Pay is disabled until required fields are valid. After pay, the button shows a processing state and ignores extra taps. Success goes to `/order/[reference]`. Failure stays on checkout with the cart intact and a retry action.

## Account

Sign in, create account, and reset password. Google button sits with the email form. After sign-in: orders, addresses, profile, wishlist. Order rows show reference, date, total, payment, and fulfilment.

## Admin

Desktop-first, still usable on a tablet. Left navigation. Top bar with search and the signed-in staff member.

Dashboard cards match PRD section 5.1. Charts use a simple bar or line, not decoration.

Product editor: details, media, price, variants table, and publish state on one page. The variant table is the stock control. Low stock is amber. Zero is red.

Order detail: customer, address, lines, payment timeline, fulfilment timeline, internal note, tracking, cancel, and refund. Status changes are confirmed before they send a customer message.

## States

Every data view needs loading, empty, error, and success. Loading uses skeletons that match the card size so the page does not jump. Images reserve their aspect ratio.

## Accessibility

Visible focus, labels on inputs, colour is not the only sold-out signal, dialogs trap focus, and motion respects reduced-motion preferences.
