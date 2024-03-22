'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Menu() {
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    console.log(`Route changed to ${pathname}`);
  }, [pathname]);

  return (
    <>
      <ul className="menu">
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/stocks'}>Stocks</Link>
        </li>
      </ul>
      {params.stock ? <p>Current currency: {params.stock}</p> : null}
    </>
  );
}
