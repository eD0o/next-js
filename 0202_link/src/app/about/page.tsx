import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

export default function AboutPage() {
  return (
    <main>
      <h2>About</h2>
      <Link href={'/about/#enterprise'} >Enterprise</Link>
      <h3 style={{ margin: '2000px 0' }} id="enterprise">
        About the enterprise
      </h3>
    </main>
  );
}
