'use client';

import { setCookie } from '@/actions/set-cookie';
import { useState } from 'react';

export default function Home() {
  const [value, setValue] = useState('');

  async function handleClick() {
    const response = await setCookie('secret', '1234');
    setValue(response.value);
    console.log(response);
  }

  return (
    <main>
      <h1>Value: {value}</h1>
      <button onClick={handleClick}>Define Cookie</button>
    </main>
  );
}
