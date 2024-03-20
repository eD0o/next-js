'use server';

import { Product } from '@/app/products/page';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function validateName(name: string) {
  return typeof name === 'string' && name.length > 1;
}

function validatePrice(price: unknown) {
  return typeof price === 'number' && price > 1;
}

export async function addProduct(
  state: { errors: string[] },
  formData: FormData,
) {
  const product: Product = {
    nome: formData.get('name') as string,
    descricao: formData.get('description') as string,
    preco: Number(formData.get('price')),
    estoque: Number(formData.get('stock')),
    importado: formData.get('imported') ? 1 : 0,
  };

  let errors = [];

  if (!validateName(product.nome)) errors.push('Error: Name invalid.');
  if (!validatePrice(product.preco)) errors.push('Error: Price invalid.');
  if (errors.length > 0) return { errors };

  try {
    const response = await fetch('https://api.origamid.online/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Error adding product.');
  } catch (error: unknown) {
    if (error instanceof Error)
      return {
        errors: [error.message],
      };
  }
  revalidatePath('/products');
  redirect('/products');
  // return { errors: [] };
}