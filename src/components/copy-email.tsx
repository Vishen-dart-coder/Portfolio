"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="group inline-flex h-9 items-center gap-2 rounded-lg border bg-background px-3 text-sm font-medium text-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-muted active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={copied ? "Email copied" : `Copy ${email}`}
    >
      <span className="relative size-4">
        <Copy
          className={`absolute inset-0 size-4 text-muted-foreground transition-[opacity,transform] duration-200 ease-out ${copied ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
          aria-hidden
        />
        <Check
          className={`absolute inset-0 size-4 text-blue-700 dark:text-blue-400 transition-[opacity,transform] duration-200 ease-out ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
          aria-hidden
        />
      </span>
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
