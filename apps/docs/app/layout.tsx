import type { Metadata } from "next";
import "@skillforge/ui/styles.css";

export const metadata: Metadata = {
  title: "Skillforge Docs",
  description: "Curated docs for a public registry of production-grade Skills for ChatGPT and Codex."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
