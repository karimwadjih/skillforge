import type { Metadata } from "next";
import "@skillforge/ui/styles.css";

const socialImage = "https://raw.githubusercontent.com/karimwadjih/skillforge/main/apps/docs/public/social/skillforge-launch-preview.png";

export const metadata: Metadata = {
  title: "Skillforge Studio",
  description: "Browse, compare, and scaffold portable skill packages from the Skillforge catalog.",
  openGraph: {
    title: "Skillforge Studio",
    description: "Browse, compare, and scaffold portable skill packages from the Skillforge catalog.",
    images: [socialImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillforge Studio",
    description: "Browse, compare, and scaffold portable skill packages from the Skillforge catalog.",
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
