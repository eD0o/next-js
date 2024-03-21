export type Product = {
  id?: string;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  importado: 0 | 1;
};

export default async function ProductsList() {
  let products: Product[] = [];
  try {
    const response = await fetch('https://api.origamid.online/produtos', {
      cache: 'no-store'
      // next: {
      //   revalidate: 5,
      // },
    });

    if (!response.ok) throw new Error(`It wasn't possible to load products.`);
    products = (await response.json()) as Product[];
  } catch (err) {
    return <p>An error occurred in the list.</p>
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.nome}: R$ {product.preco}
        </li>
      ))}
    </ul>
  );
}
