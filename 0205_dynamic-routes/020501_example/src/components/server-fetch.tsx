type Product = {
  id: number;
  nome: string;
};

export default async function ServerFetch() {
  const response = await fetch('https://api.origamid.online/produtos');

  const data = (await response.json()) as Product[];

  return (
    <>
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.nome}</li>
        ))}
      </ul>
    </>
  );
}
