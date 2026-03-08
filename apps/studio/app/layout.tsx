import type { Metadata } from "next";
import "@skillforge/ui/styles.css";

export const metadata: Metadata = {
  title: "Skillforge Studio",
  description: "Browse, compare, and scaffold portable skill packages from the Skillforge catalog."
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
