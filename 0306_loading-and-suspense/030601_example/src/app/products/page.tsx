import ProductsList from '@/components/products-list';
import { Suspense } from 'react';
import Loading from './loading';

export default async function ProductsPage() {
  return (
    <main>
      <h1>Products</h1>
      <p>Products list:</p>
      <Suspense fallback={<Loading />}>
        <ProductsList />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ProductsList />
      </Suspense>
    </main>
  );
}
