"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="font-display text-3xl font-bold">Contact</h1>
      <p className="mt-3 text-sm text-muted">
        Send an order question and include your reference if you have one.
      </p>
      {sent ? (
        <p className="mt-8 text-sm font-semibold">
          Message noted on this device. For a live reply, include your phone
          number when you check out.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <input name="name" required placeholder="Name" className="field" />
          <input name="email" type="email" required placeholder="Email" className="field" />
          <textarea name="message" required placeholder="Message" className="field min-h-28" />
          <button
            type="submit"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}