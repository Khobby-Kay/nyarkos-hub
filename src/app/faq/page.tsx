const faqs = [
  {
    q: "What sizes do you carry?",
    a: "S, M, L, and XL. The size guide on each polo uses chest measurements.",
  },
  {
    q: "Where do you deliver?",
    a: "Accra, nationwide Ghana, and pickup in Accra. Accra delivery is free from GH₵500.",
  },
  {
    q: "How do I pay?",
    a: "Mobile Money, card, or cash on delivery. Mobile Money and card orders are confirmed by the hub before they are packed.",
  },
  {
    q: "Can I return a polo?",
    a: "Unworn polos with tags can be returned within 7 days. Sale items are exchange-only if the size is in stock.",
  },
];

export const metadata = { title: "FAQ | Nyarko's Hub" };

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Questions</h1>
      <div className="mt-8 space-y-6">
        {faqs.map((item) => (
          <div key={item.q}>
            <h2 className="font-semibold">{item.q}</h2>
            <p className="mt-1 text-sm text-muted">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}