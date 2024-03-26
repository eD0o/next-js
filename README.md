# 5 - Files and Components

## 5.1 - Layout

It's viable to create a `layout.tsx file within a route, thus, its content becomes part of all pages within that route`.

<details>
<summary>Example</summary>

```tsx
// app\courses\layout.tsx
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
```

</details>

## 5.2 - Next CSS

It's possible to use `CSS Modules, Sass, styled-components, CSS-in-JS and Tailwind`. It's up to you.

[CSS Modules Extension](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules) - good extension to autocomplete class selectors.

[Other Docs](https://nextjs.org/docs/app/building-your-application/styling)

> In this course, I'm using Sass as my preference.

[test]
