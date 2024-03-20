export type Product = {
  id?: string;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  importado: 0 | 1;
};

export default async function ProductsPage() {
  const response = await fetch('https://api.origamid.online/produtos', {
    next: {
      revalidate: 5
    }
  });
  const products = (await response.json()) as Product[];

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.nome}: R$ {product.preco}</li>
        ))}
      </ul>
    </main>
  );
}
