"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * AppLink — framework-portable navigation link.
 *
 * Renders a plain anchor so the same component tree works under the Next.js
 * App Router (server + client rendering) and inside the static preview build.
 * Keeps the exact same call signature as `next/link`.
 */
export default function AppLink({
  href,
  children,
  ...rest
}: { href: string; children: ReactNode } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
