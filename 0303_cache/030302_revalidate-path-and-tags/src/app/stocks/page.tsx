import UpdateStock from "@/components/update-stock";

type Stock = {
  nome: string;
  preco: number;
  atualizada: string;
};

export default async function StocksPage() {
  const response = await fetch('https://api.origamid.online/acoes/lua', {
    next: {
      // revalidate: 5
      tags: ['stocks']
    }
  });

  const stock = (await response.json()) as Stock;

  return (
    <main>
      <h1>Stocks</h1>
      <UpdateStock/>
      <h2>{stock.nome}</h2>
      <p>Price: {stock.preco} </p>
      <p>Updated: {stock.atualizada} </p>
    </main>
  );
}
