import photosGet from '@/actions/photos-get';
import Feed from '@/components/Feed/feed';

export default async function Home() {
  const {data} = await photosGet();

  return (
    <section className="container mainContainer">
      {data && <Feed photos={data} />}
    </section>
  );
}
