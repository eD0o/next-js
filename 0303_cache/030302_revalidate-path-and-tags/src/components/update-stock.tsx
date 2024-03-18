'use client';

import { revalidatePathAction, revalidateTagAction } from '@/app/actions/revalidatePath';
import { useEffect } from 'react';

export default function UpdateStock() {
  function handleClick() {
    // revalidatePathAction('/stocks');
    revalidateTagAction('stocks')
  }

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     revalidatePathAction('/stocks');
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return <button onClick={handleClick}>Update</button>;
}
