import type { ReactNode } from "react";
import { AppShell, Brand, NavLinks } from "@skillforge/ui";

const navItems = [
  { href: "/", label: "Catalog" },
  { href: "/compare", label: "Compare" }
];

export function StudioShell({ children }: { children: ReactNode }) {
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
