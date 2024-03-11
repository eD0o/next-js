type PageParams = {
  params: {
    id: string;
  };
};

type Product = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  importado: number;
};

export default async function ProductPage({ params }: PageParams) {
  const response = await fetch(
    `https://api.origamid.online/produtos/${params.id}`,
  );

  const data = (await response.json()) as Product;

  return (
    <>
      <main>
        <h1>{data.nome}</h1>
        <p>{data.descricao}</p>
        <p>RS$ {data.preco}</p>
      </main>
    </>
  );
}
