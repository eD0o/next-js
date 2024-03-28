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
deviceSizes: [600, 800, 1200, 2400, 3600] -> possible values to the `width of the image according to the current screen size`.

default values: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

---

BrowserWidth: 900px - Image rendered: 1200px.
BrowserWidth: 1800px - Image rendered: 2400px.

> Changes according to screen pixel density [4k (2x)]:

BrowserWidth: 900px (1800px), Image: 2400px.

### 5.3.4 - Media Queries

It's possible to define `media queries inside sizes props to change the image size according to the scree`n size.

Example:

```tsx
// until 600px - 100vw, else 50vw (according to the applied css)
<Image sizes="(max-width: 600px) 100vw, 50vw" />
```

deviceSizes:
[600, 800, 1200, 2400, 3600]

(max-width: 600px) 100vw
BrowserWidth = 500px, Image = 600px.

, 50vw = Otherwise, load an image that takes up 50% of the viewport.
BrowserWidth = 1300px, Image = 800px (1300/2 = 650 -> 800).

### 5.3.5 - Priority

`Defines the fetch priority` of the rendered images.

```tsx
<ul className={styles.animals}>
  {animals.map((animal, i) => (
    <li key={animal.id}>
      <h2>{animal.nome}</h2>
      <Image
        src={animal.imagem}
        width={2400}
        height={1600}
        alt={animal.descricao}
        quality={75}
        sizes="(max-width: 600px) 100vw, 50vw"
        priority={i < 2} // Thus, just the two first images will have this priority to be loaded
      />
    </li>
  ))}
</ul>
```

## 5.4 - Fonts

Next.js `automatically imports fonts from Google Fonts` in an optimized way.

```tsx
//app/fonts.ts
import { Roboto } from 'next/font/google';

export const font_body = Roboto({
  weight: ['400', '700'], // font weight
  style: ['normal'], // font style, italic/normal
  subsets: ['latin'], // choose the subset, decrease the file size
  variable: '--font-body', // defines a css variable
  display: 'swap', // shows the backup source while the main one loads
});
```

### 5.4.1 - Local Fonts

It's possible to use `font files through the localFont` function.

```tsx
import localFont from 'next/font/local';

export const font_mono = localFont({
  src: '../fonts/IBMPlexMono-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-mono',
  display: 'swap',
});
```

## 5.5 - Scripts

The Script component (import Script from 'next/script') is `used to load scripts within Next.js`.

The `strategy attribute will define if the script will be loaded before or after the site is loaded` and interactive.

```tsx
import Script from 'next/script';

export default async function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      {/* Examples */}
      <Script
        id="legal-age"
        strategy="beforeInteractive"
        src="https://api.origamid.online/scripts/idade-legal.min.js"
      />
      <Script
        id="google-tag-script"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"
      />
      <Script id="google-tag">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXX');
        `}
      </Script>
    </main>
  );
}
```

## 5.6 - Middleware

It is `a function that runs before the page loads, it intercepts the request and has access` to the request object: `NextRequest and NextResponse` response.

It can be `used for authentication, logging, redirection`, etc.

### 5.6.1 - Redirect

Used to `redirect the user to another page`. Just return NextResponse.redirect().

```tsx
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(`${request.nextUrl.pathname}`);
  return NextResponse.redirect(new URL('/login', request.url));
}

// if this route is used, will be redirected to /login
export const config = {
  matcher: '/signin',
};
```

### 5.6.2 - Protecting Routes

Protects routes and check if the used is authenticated.

> Not so used, usually JWT is more recommended.