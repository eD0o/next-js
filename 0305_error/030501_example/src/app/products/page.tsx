import ProductsList from "@/components/products-list";

export default async function ProductsPage() {
  return (
    <main>
      <h1>Products</h1>
      <p>Products list:</p>
      <ProductsList/>
    </main>
  );
}
