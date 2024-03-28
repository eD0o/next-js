import type { Metadata } from 'next';
import './globals.scss';
import Menu from '@/components/menu';
import { font_body, font_external } from './fonts';

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Created by eD0o',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${font_body.className} ${font_body.variable} ${font_external.variable}`}
      >
        <Menu />
        {children}
      </body>
    </html>
  );
}
