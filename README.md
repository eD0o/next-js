# 2 - Fundamentals

## 2.1 - App Router

There is also another route system called `Pages Router, which was the default before version 13`.

> Nowadays it is recommended to use the App Router.

### 2.1.2 - Routes

In Next.js, `each page.tsx file inside the app folder is a route`. The app/page.tsx file is the '/'route and the app/about/page.tsx file is the '/about' route.

> `When app/page.tsx is renamed/excluded, '/' directory will show 404 error`, so it must have the page.tsx name.

### 2.1.3 - layout.tsx

The layout.tsx file is the `default layout for all pages`. It is automatically imported by Next.js and can be `used to add elements that are repeated across pages`, such as navigation.

> At the root it is necessary to add <html> and <body>. However, on other routes it is optional.

<details>
<summary>Example</summary>

```tsx
// layout.tsx
import type { Metadata } from 'next';
import './globals.scss';
import Menu from '@/components/menu';

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Created by eD0o',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Menu/> // -> content that will be seen in every page
        {children}
      </body>
    </html>
  );
}
```

</details>

### 2.1.4 - metadata

Exporting a const metadata object will `add meta tags to the page`. It can be exported from any route file such as page.tsx or layout.tsx.

<details>
<summary>Example</summary>

```tsx
// /app/about/page.tsx
import { Metadata } from 'next';

// use the Metadata inferface to see what are the correct values
export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

export default function AboutPage() {
  return (
    <main>
      <h2>About</h2>
    </main>
  );
}
```

[![](https://i.imgur.com/SdsQgq6m.jpg)](https://i.imgur.com/SdsQgq6.png)

</details>

## 2.2 - Link

### 2.2.1 - Link Component

Next.js has the Link component that `allows navigation between pages without the page being reloaded` (client side).

### 2.2.2 - Prefetch

Link automatically prefetch static pages, that is, `Next.js already loads the page in the background so that it is available when the user clicks on the link`.

```tsx
 <Link href="/" prefetch={true}> // (true is the default).
```

> Prefetch behavior `can only be analyzed in production`.

### 2.2.3 - Internal Link and Scroll

```tsx
// what is typed in front '#' will determine what will be scrolled
 <Link href="/about#enterprise" prefetch={true}>

// to avoid this behavior, just use scroll={false} to direct to the beginning of the page
 <Link href="/about#enterprise" prefetch={true} scroll={false}>
```

## 2.3 - Server and Client Component

When a component is created, they can have some types:

### 2.3.1 - Server Components

- `Have access to the server API` (Node) such as fs, path, and others implemented by Next.js such as fetch and cookies. `Render on the server`.
- `By default, all components are Server Components`.
- Can be async.

### 2.3.2 - Client Components

- `Has access to web APIs such as window and document`, as well as Next.js and React APIs, such as useState and useEffect. They continue to be `pre-rendered on the server, but are "hydrated" (Hydration) on the client`.
- To define a component as a Client Component, simply `add 'use client' to the first line of the component`.
- Always `avoid placing client components in the app folder`.

```tsx
// /app/about/page.tsx

'use client';

import Width from '@/components/width';

export default function AboutPage() {
  return (
    <>
      {/* won't run if 'use client' is not declared */}
      <button onClick={() => console.log('test')}>test</button>
      <Width />
    </>
  );
}
```

### 2.3.3 - Nested Component

`Server Components can contain both` type Components, but `Client Components cannot contain Server Components`.

> `Avoid defining pages (page.tsx) as Client Components`, always keep them as Server Components, `so they can receive Server and Client Components`.

### 2.3.4 - Pre-rendering

Client Components are pre-rendered on the server, `during pre-rendering, it's not possible to access web APIs such as window and document`. This is why errors such as `document is not defined can occur`.

> If the code is inside `useEffect, it will only be activated on the client`, so we won't have any problems. But `code outside useEffect can cause errors`.

<details>
<summary>Example</summary>

```tsx
// /components/width.tsx
'use client';

import { useEffect, useState } from 'react';

export default function Width() {
  //on this case, the document declared outside useEffect will show an error
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <p style={{ color: active ? '#680' : '#b00' }}>Screen width: {width}</p>
      <button onClick={() => setActive((b) => !b)}>Active</button>
    </>
  );
}
```

</details>

So, to solute this, you `can import some component dynamically` to avoid pre-rendering using dynamic():

```tsx
const Component = dynamic(() => import('@/components/Component'), {
  ssr: false,
});
```

<details>
<summary>Example</summary>

```tsx
// /app/about/page.tsx
import dynamic from 'next/dynamic';

// Now, the component will run properly.
const Width = dynamic(() => import('@/components/width'), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <p>About</p>
      <Width />
    </>
  );
}
```

Even the renderization is different.
[![](https://i.imgur.com/kwRC7i6m.jpg)](https://i.imgur.com/kwRC7i6.png)

</details>

## 2.4 - Fetch

### 2.4.1 - Server Fetch

Server Components can be defined as `asynchronous functions`, so they `fetch data from the server and return the component with the data` already available.

When creating a Full-Stack application, `it's possible to access the database directly in the component`.

> The `pre-rendered cache won't update according to the API changes without the proper configuration` that will be showed later in the course.

<details>
<summary>Example server-fetch</summary>

```tsx
// /components/server-fetch.tsx
type Product = {
  id: number;
  nome: string;
};

export default async function ServerFetch() {
  const response = await fetch('https://api.origamid.online/produtos');

  const data = (await response.json()) as Product[];

  return (
    <>
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.nome}</li>
        ))}
      </ul>
    </>
  );
}
```

</details>

### 2.4.2 - Client Fetch

It's also `possible to fetch data from the client, using useEffect and useState`.

> However, this data `will not be pre-rendered` on the server.

<details>
<summary>Example client-fetch</summary>

```tsx
// /components/client-fetch.tsx
'use client';

type Product = {
  id: number;
  nome: string;
};

import { useEffect, useState } from 'react';

export default function ClientFetch() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.origamid.online/produtos');

      const json = (await response.json()) as Product[];
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <>
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.nome}</li>
        ))}
      </ul>
    </>
  );
}
```

</details>

## 2.5 - Dynamic Routes

### 2.5.1 - id

It's a folder with a name in square brackets `**[id]** indicates that the route is dynamic and the name of the passed parameter`.

The `parameter is inside the params property`.

[![](https://i.imgur.com/6chokD0m.jpg)](https://i.imgur.com/6chokD0.png)

### 2.5.2 - Slugs

If the folder name contains ... before the parameter name, you can access routes such as: /course/course-name/class/class-name. Automatically `an array with the parameters will be passed to the page`.

[![](https://i.imgur.com/3yC3Xlzm.jpg)](https://i.imgur.com/3yC3Xlz.png)

### 2.5.3 - Others

[Other options](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

## 2.6 - Rendering

### 2.6.1 - Build

Next.js has two environments, development and production.

Development: `npm run dev` | Production: `npm run build` and `npm run start`

During the build, it `checks for errors, generates routes and pre-renders static pages` (SSG).

> It automatically `decides which type of rendering will be used`, this will `depend on the type of page, api's used and settings`.

○ - (Static): prerendered as static content.

- Pre-render static pages.
- Generates a .html file for each page.
- Loading faster.

λ - (Dynamic): server-rendered on demand using Node.js.

- Dynamic routes.
- Running dynamic apis (like useSearchParams).
- When fetch has no cache.

> If necessary, to force a page to be dynamic, use `export const dynamic = 'force-dynamic'`.

---

## 2.X - Observations

- The '@' in the beginning of some import path is a shortcut for the src folder.
- A server component can be async.
- consle.log() inside a Server Component will be showed up in the terminal.
