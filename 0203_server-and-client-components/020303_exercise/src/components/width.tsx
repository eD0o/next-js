'use client';

import { useEffect, useState } from 'react';

export default function Width() {
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <p style={{ color: active ? '#680' : '#b00' }}>Screen width: {width}</p>
      <button onClick={() => setActive((b) => !b)}>Active</button>
    </>
  );
}
