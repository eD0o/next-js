import photoGet from '@/actions/photo-get';
import PhotoContent from '@/components/Photo/photo-content';
import { notFound } from 'next/navigation';

type PhotoIdParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PhotoIdParams){
  const { data } = await photoGet(params.id);

  if(!data) return {title: 'Photos'}

  return {
    title: data.photo.title
  }
}

export default async function PhotoIdPage({ params }: PhotoIdParams) {
  const { data } = await photoGet(params.id);

  if (!data) return notFound();

  return (
    <section className="container mainContainer">
      <PhotoContent data={data} single={true} />
      <h1>Photo ID: {data.photo.title}</h1>
    </section>
  );
}
