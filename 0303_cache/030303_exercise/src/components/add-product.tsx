'use client';

import { addProduct } from '@/actions/add-product';
import { Product } from '@/app/products/page';

export default function AddProduct() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Product = {
      nome: formData.get('name') as string,
      preco: Number(formData.get('price')),
      descricao: formData.get('description') as string,
      estoque: Number(formData.get('stock')),
      importado: formData.get('imported') === 'on' ? 1 : 0,
    };

    await addProduct(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" name="price" />
      <label htmlFor="stock">Stock:</label>
      <input type="text" id="stock" name="stock" />
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" />
      <label htmlFor="imported">
        <input type="checkbox" id="imported" name="imported" />
        Imported
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
