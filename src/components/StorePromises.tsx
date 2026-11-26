const promises = [
  { title: "Accra delivery", detail: "Free from GH₵500" },
  { title: "Nationwide", detail: "2–5 days across Ghana" },
  { title: "Sizes S–XL", detail: "Chest guide on every polo" },
  { title: "Pay your way", detail: "MoMo, card, or cash on delivery" },
];

export function StorePromises() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
        {promises.map((item) => (
          <div
            key={item.title}
            className="border-border px-4 py-5 sm:px-6 [&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
          >
            <p className="font-display text-sm font-bold sm:text-base">{item.title}</p>
            <p className="mt-1 text-xs text-muted sm:text-sm">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}