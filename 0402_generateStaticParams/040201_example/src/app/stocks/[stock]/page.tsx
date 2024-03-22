type Stock = {
  nome: string;
  preco: number;
  atualizada: string;
};

type PageParams = {
  params: {
    stock: string;
  };
};

export default async function StockPage({ params }: PageParams) {
  const response = await fetch(
    `https://api.origamid.online/acoes/${params.stock}`,
    {
      next: {
        revalidate: 5,
      },
    },
  );

  const stock = (await response.json()) as Stock;

  return (
    <main>
      <h1>Stocks</h1>
      <h2>{stock.nome}</h2>
      <p>Price: {stock.preco}</p>
      <p>Updated: {stock.atualizada}</p>
    </main>
  );
}
