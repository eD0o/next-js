'use client';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <h1>Error</h1>
        <p>Description: {error.message}</p>
      </body>
    </html>
  );
}
