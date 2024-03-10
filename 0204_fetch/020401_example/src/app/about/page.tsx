import dynamic from 'next/dynamic';

const Width = dynamic(() => import('@/components/width'), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <p>About</p>
      <Width />
    </>
  );
}
