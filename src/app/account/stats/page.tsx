import statsGet from '@/actions/stats-get';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const AccountStats = dynamic(
  () => import('@/components/Account/account-stats'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: 'Stats',
};

export default async function StatsPage() {
  const { data } = await statsGet();

  console.log(data);

  if (!data) return null;

  return (
    <section>
      <AccountStats data={data} />
    </section>
  );
}
