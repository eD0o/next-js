import { getCourses } from '@/api/api';
import Link from 'next/link';

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <main>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/courses/${course.slug}`}>{course.nome}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
