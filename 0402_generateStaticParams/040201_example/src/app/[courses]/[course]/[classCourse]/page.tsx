import { getClass } from '@/api/api';
import Link from 'next/link';

type PageParams = {
  params: {
    course: string;
    classCourse: string;
  };
};

export default async function ClassPage({ params }: PageParams) {
  const classCourse = await getClass(params.course, params.classCourse);
  return (
    <main>
      <Link href={`/courses/${params.course}`}>Go back to - {params.course}</Link>
      <h1>Class: {classCourse.nome}</h1>
      <p>{classCourse.descricao}</p>
      <p>Time: {classCourse.tempo}</p>
    </main>
  );
}
