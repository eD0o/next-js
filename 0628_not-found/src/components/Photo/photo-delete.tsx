'use client';

import { useState } from 'react';
import styles from './photo-delete.module.scss';
import photoDelete from '@/actions/photo-delete';

export default function PhotoDelete({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    const confirm = window.confirm('Are you sure to want to delete it ?');

    if (confirm) {
      await photoDelete(id);
    }

    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Delete
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Delete
        </button>
      )}
    </>
  );
}
