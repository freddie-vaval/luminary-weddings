import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luminary Weddings — Curated Luxury Wedding Planners in the UK",
  description:
    "Connect with the UK's most exceptional wedding planners. Luminary Weddings matches you with the perfect planner for your vision, style, and budget.",
  openGraph: {
    title: "Luminary Weddings — Curated Luxury Wedding Planners",
    description: "The UK's most exceptional wedding planners, curated for you.",
    url: "https://luminaryweddings.com",
    siteName: "Luminary Weddings",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Didot&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}