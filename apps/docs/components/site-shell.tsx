import type { ReactNode } from "react";
import { AppShell, Brand, NavLinks } from "@skillforge/ui";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/getting-started", label: "Getting Started" },
  { href: "/library", label: "Library" },
  { href: "/collections", label: "Collections" },
  { href: "/flagships", label: "Flagships" },
  { href: "/contributing", label: "Contributing" },
  { href: "/benchmark-methodology", label: "Benchmarks" },
  { href: "/packaging-guide", label: "Packaging" }
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      nav={
        <>
          <Brand />
          <NavLinks items={navItems} />
        </>
      }
    >
      {children}
    </AppShell>
  );
}
