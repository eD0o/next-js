'use client';

import { addProduct } from '@/actions/add-product';
import { useFormStatus } from 'react-dom';

function Button() {
  const status = useFormStatus();
  return (
    <button type="submit" disabled={status.pending}>
      Add
    </button>
  );
}

export default function AddProduct() {
  return (
    <form action={addProduct}>
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
      <Button />
    </form>
  );
}
