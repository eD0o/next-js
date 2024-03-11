'use client';

type Product = {
  id: number;
  nome: string;
};

import { useEffect, useState } from 'react';

export default function ClientFetch() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.origamid.online/produtos');

      const json = (await response.json()) as Product[];
      setData(json);
    }
    fetchData();
  }, []);

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
