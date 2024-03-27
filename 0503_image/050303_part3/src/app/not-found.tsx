import Link from 'next/link';

export default async function NotFound() {
  return (
    <main>
      <h1>Not Found Page</h1>
      <Link href={'/'}>Back to home</Link>
    </main>
  );
}
