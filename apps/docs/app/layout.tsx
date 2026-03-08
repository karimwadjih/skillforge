import type { Metadata } from "next";
import "@skillforge/ui/styles.css";

const socialImage = "https://raw.githubusercontent.com/karimwadjih/skillforge/main/apps/docs/public/social/skillforge-launch-preview.png";

export const metadata: Metadata = {
  title: "Skillforge Docs",
  description: "Curated docs for a public registry of production-grade Skills for ChatGPT and Codex.",
  openGraph: {
    title: "Skillforge",
    description: "Production-grade Skills for ChatGPT and Codex.",
    images: [socialImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillforge",
    description: "Production-grade Skills for ChatGPT and Codex.",
    images: [socialImage]
  }
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
