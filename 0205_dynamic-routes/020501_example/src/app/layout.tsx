import type { Metadata } from 'next';
import './globals.scss';
import Menu from '@/components/menu';

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
      <body>
        <Menu/>
        {children}
      </body>
    </html>
  );
}
