"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setDone(true);
  }

  return (
    <section className="border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Get first dibs on drops
        </h2>
        <p className="mt-3 text-muted">
          Join the list for early access, exclusive codes, and style edits from
          the Nyarko&apos;s team.
        </p>
        {done ? (
          <p className="mt-8 text-sm font-semibold text-accent">
            You&apos;re in — watch your inbox.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-0"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border border-border bg-surface px-5 py-3.5 text-sm outline-none transition focus:border-foreground/30 sm:rounded-r-none"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-ink/90 sm:rounded-l-none"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}