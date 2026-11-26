const reviews = [
  {
    quote:
      "The navy stripe sits clean and the knit does not lose its shape after a wash.",
    meta: "Verified buyer · Accra",
    stars: "5.0",
  },
  {
    quote:
      "Ordered the cream cable on Thursday and it was in East Legon the next afternoon.",
    meta: "Verified buyer · Accra",
    stars: "5.0",
  },
  {
    quote:
      "Size guide was accurate. The forest band is the one I keep reaching for.",
    meta: "Verified buyer · Kumasi",
    stars: "4.8",
  },
];

export function Reviews() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Customer reviews
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Worn, then written about
            </h2>
          </div>
          <p className="font-display text-3xl font-extrabold">
            4.9<span className="text-lg text-muted">/5</span>
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.quote}
              className="rounded-3xl border border-border bg-surface p-6"
            >
              <p className="text-sm font-semibold text-accent">{review.stars} ★</p>
              <blockquote className="mt-3 text-sm leading-relaxed">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-4 text-xs font-medium uppercase tracking-wider text-muted">
                {review.meta}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}