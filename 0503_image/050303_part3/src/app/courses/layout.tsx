import { getCourses } from '@/api/api';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Origamid Courses',
  description: 'Front End and UI Design online courses.',
  keywords: ['HTML', 'CSS', 'JavaScript', 'UI Design'],
  authors: [{ name: 'Eduardo', url: 'https://github.com/eD0o' }],
};

export default async function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courses = await getCourses();
  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/courses/${course.slug}`}>{course.nome}</Link>
          </li>
        ))}
      </ul>
      <div>{children}</div>
    </div>
  );
}
