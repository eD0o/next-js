'use client';

import { getCookie } from '@/actions/get-cookie';
import { useState } from 'react';

export default function Cookie() {
  const [token, setToken] = useState('');

  async function handleClick() {
    const token = await getCookie('token');

    if (token) setToken(token);
  }

  return (
    <>
      <h2>Cookie: {token}</h2>
      <button onClick={handleClick}>Get Cookie</button>
    </>
  );
}
