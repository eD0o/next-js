'use server';

import { Product } from '@/app/products/page';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProduct(formData: FormData) {
  console.log(formData);

  const product: Product = {
    nome: formData.get('name') as string,
    descricao: formData.get('description') as string,
    preco: Number(formData.get('price')),
    estoque: Number(formData.get('stock')),
    importado: formData.get('imported') ? 1 : 0,
  };

  const response = await fetch('https://api.origamid.online/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  await response.json();
  revalidatePath('/products');
  redirect('/products');
}
