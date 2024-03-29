import type { Metadata } from 'next';
import './globals.scss';
import { type_second } from '@/functions/fonts';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Dogs - Next.js',
  description: 'Social Media for Dogs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
