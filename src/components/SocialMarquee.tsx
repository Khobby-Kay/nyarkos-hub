const phrases = [
  "Premium knit polos only",
  "Quarter zip & button placket",
  "Limited hub drops",
  "Studio quality pieces",
  "Delivery across Ghana",
  "Nyarko's Hub",
];

export function SocialMarquee() {
  const items = [...phrases, ...phrases];

  return (
    <div className="overflow-hidden border-y border-border bg-[#eef2f6] py-3">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/80"
          >
            {text}
            <span className="mx-10 text-[#1e3a5f]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}