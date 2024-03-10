import dynamic from 'next/dynamic';

const ImcCalc = dynamic(() => import('@/components/imcCalc'), { ssr: false });

export default function ImcPage() {
  return (
    <main>
      <ImcCalc />
    </main>
  );
}
