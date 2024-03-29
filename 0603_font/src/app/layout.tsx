import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Dogs - Next.js",
  description: "Social Media for Dogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
