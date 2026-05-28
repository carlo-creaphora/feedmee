import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeedMee",
  description: "Feedback honesto e insights vivos para restaurantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
