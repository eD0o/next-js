import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container">
      <h1 className="title">Page not found.</h1>
      <Link
        className="button"
        style={{ marginTop: '1rem', display: 'inline-block' }}
        href={'/'}
      >
        Go to home.
      </Link>
    </section>
  );
}
