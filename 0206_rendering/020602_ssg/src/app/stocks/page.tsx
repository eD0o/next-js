export default async function StocksPage() {
  const response = await fetch('https://api.origamid.online/acoes/lua', {
    next: {
      revalidate: 5,
    },
  });
  const stock = (await response.json()) as {
    simbolo: string;
    atualizada: string;
  };

  return (
    <main>
      <h1>{stock.simbolo}</h1>
      <h1>{stock.atualizada}</h1>
    </main>
  );
}
