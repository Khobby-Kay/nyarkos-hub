"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-ink text-center text-[11px] tracking-wide text-white sm:text-xs">
      <div className="mx-auto flex items-center justify-center px-10 py-2">
        <span className="font-medium">
          Free Accra delivery from GH₵500 · Sizes S–XL
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