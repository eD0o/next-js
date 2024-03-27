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

## 5.3 - Image

### 5.3.1 - Image Component

Next.js has a component called Image that is used to `load images in an optimized way`.

```tsx
import Image from 'next/image';
<Image
  src="https://api.origamid.online/imagens/lobo_1.jpg"
  width={1200} // use the original value or the maximum value
  height={800} // must be proportional to the width, respecting the proportion
  alt="White wolf sleeping on rocks"
  quality={80} // defines the image quality, 75 is the default
  sizes="100vw" // occupies 100% of the viewport whenever possible.
/>;
```

It's recommended to apply these styles:

```css
img {
  width: auto;
  height: auto;
  max-width: 100%;
  display: block;
}
```

### 5.3.2 - remotePatterns

For security, it's `necessary to inform Next.js of the URLs that can be used for images`. This is done in the next.config.mjs file.

```mjs
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.origamid.online',
        port: '',
        pathname: '/imagens/**',
      },
    ],
  },
};
```
### 5.3.3 - Image Sizes

Next.js `generates images in different sizes` according to the possible screen sizes defined in deviceSizes. The image that will be served is `decided by according to the screen size at the time of loading`.

It just `loads different sizes if settled the **sizes** attribute on the Image component`. A value like `100vw means that Next.js should always load an image that can fill 100% of the viewport` whenever possible.

Example:

(Image Component)
sizes="100vw"

(next.config.mjs)
deviceSizes:
[600, 800, 1200, 2400, 3600] -> possible values to the `width of the image according to the current screen size`.

default values: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

---

BrowserWidth: 900px - Image rendered: 1200px.
BrowserWidth: 1800px - Image rendered: 2400px.

> Changes according to screen pixel density [4k (2x)]:

BrowserWidth: 900px (1800px), Image: 2400px.