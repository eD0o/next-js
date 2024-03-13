'use client';

import { useEffect, useState } from 'react';

type Stock = {
  simbolo: string;
  atualizada: string;
};

export default function StocksPage() {
  const [stock, setStock] = useState<Stock | null>(null);

  useEffect(() => {
    fetch('https://api.origamid.online/acoes/lua')
      .then((response) => response.json())
      .then((json) => setStock(json));
  }, []);

  if (stock === null) return null;

  return (
    <main>
      <h1>{stock.simbolo}</h1>
      <h1>{stock.atualizada}</h1>
    </main>
  );
}
