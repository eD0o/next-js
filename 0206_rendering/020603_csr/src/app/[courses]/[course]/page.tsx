import { getCourse } from '@/api/api';
import Link from 'next/link';

type PageParams = {
  params: {
    course: string;
  };
};

export default async function CoursePage({ params }: PageParams) {
  const course = await getCourse(params.course);

  return (
    <main>
      <h1>Course: {course.nome}</h1>
      <p> Hours: {course.total_horas}</p>
      <h2>Classes ({course.total_aulas}):</h2>
      <ul>
        {course.aulas.map((classCourse) => (
          <li key={classCourse.id}>
            <Link
              key={classCourse.id}
              href={`/courses/${params.course}/${classCourse.slug}`}
            >
              {classCourse.nome}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
