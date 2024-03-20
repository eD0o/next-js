'use client';

export default function ProductsError({ error }: { error: Error }) {
  return (
    <main>
      <h1>An error occurred.</h1>
      <p>Description: {error.message}</p>
    </main>
  );
}
