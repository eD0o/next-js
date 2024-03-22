'use client';

import Link from 'next/link';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Suspense, useEffect } from 'react';

function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  return <p>Search: {search}</p>;
}

export default function Menu() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, [router]);

  useEffect(() => {
    console.log(`Route changed to ${pathname}`);
  }, [pathname]);

  return (
    <>
      <Suspense>
        <Search />
      </Suspense>
      <ul className="menu">
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/stocks'}>Stocks</Link>
        </li>
        <li>
          <Link href={'/stocks/?search=xpt'}>Search example</Link>
        </li>
      </ul>
      {params.stock ? <p>Current currency: {params.stock}</p> : null}
    </>
  );
}
