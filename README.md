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

```ts
//layout.tsx
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

```ts
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

```ts
 <Link href="/" prefetch={true}> // (true is the default).
```

> Prefetch behavior `can only be analyzed in production`.

### 2.2.3 - Internal Link and Scroll

```ts
// what is typed in front '#' will determine what will be scrolled
 <Link href="/about#enterprise" prefetch={true}>

// to avoid this behavior, just use scroll={false} to direct to the beginning of the page
 <Link href="/about#enterprise" prefetch={true} scroll={false}>
```

## 2.3 - Server and Client Component

---

## 2.X - Observations

- The '@' in the beginning of some import path is a shortcut for the src folder.
