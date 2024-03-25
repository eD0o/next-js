import { Class, getClass, getCourse, getCourses } from '@/api/api';
import Link from 'next/link';

type PageParams = {
  params: {
    course: string;
    classCourse: string;
  };
};

export async function generateStaticParams() {
  const courses = await getCourses();
  const classes = await Promise.all(
    courses.map((course) => getCourse(course.slug)),
  );
  return classes
    .reduce((acc: Class[], course) => acc.concat(course.aulas), [])
    .map((classCourse) => ({
      course: courses.find((course) => course.id === classCourse.curso_id)
        ?.slug,
      classCourse: classCourse.slug,
    }));
}

export default async function ClassPage({ params }: PageParams) {
  const classCourse = await getClass(params.course, params.classCourse);
  return (
    <main>
      <Link href={`/courses/${params.course}`}>
        Go back to - {params.course}
      </Link>
      <h1>Class: {classCourse.nome}</h1>
      <p>{classCourse.descricao}</p>
      <p>Time: {classCourse.tempo}</p>
    </main>
  );
}
