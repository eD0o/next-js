'use client'

import Width from '@/components/width';

export default function AboutPage() {
  return (
    <>
      {/* won't run if 'use client' is not declared */}
      <button onClick={() => console.log('test')}>test</button>
      <Width />
    </>
  );
}
