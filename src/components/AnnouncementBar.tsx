"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-ink text-white text-center text-xs sm:text-sm tracking-wide">
      <div className="mx-auto flex items-center justify-center gap-2 px-10 py-2.5">
        <span className="font-medium">
          Knit polos only · Free delivery in Accra on orders GH₵500+ · DM to
          order on{" "}
          <span className="text-accent font-semibold">Instagram</span>
        </span>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition hover:opacity-100"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}