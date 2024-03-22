# 4 - Hooks and Functions

## 4.1 - Router Hooks ('use client')

### 4.1.1 - useParams

Returns an `object with the URL parameters`. 

Usually used in components, since the {params} don't work on them.

Example: /courses/[course]/[class] returns {course: 'react', class: 'hooks'}.

```tsx
'use client';
import { useParams } from 'next/navigation';

const params = useParams();
params.course; // 'react'
params.class; // 'hooks'
```

### 4.1.2 - usePathname

`Returns the current URL`, can be `used to identify changes in the route` (navigation).

```tsx
'use client';
import { usePathname } from 'next/navigation';

const pathname = usePathname();

React.useEffect(() => {
  console.log('Route changed!');
}, [pathname]);
```

### 4.1.3 - useRouter

Gives access to the Next.js router object, which has `methods for navigation, preloading, back, forward, and page reload`.

> Use the import { useRouter } from 'next/navigation' (at least until the last update).

```tsx
'use client';
// disclaimer: it's not - import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

const router = useRouter();

router.push('/products'); //navigate to the products page (in the client-side)
router.prefetch('/products'); // preload the products page
router.back(); // back (history)
router.forward(); // advance (history)
router.refresh(); // reload the route, fetch data again from the server (revalidate: 5)
```

### 4.1.4 - useSearchParams

`Returns an object with the URL's search parameters`. /products/?search=shirt returns {search: 'shirt'}.

> Need to be inside a <Suspense> wrapper component.

```tsx
'use client';
import { useSearchParams } from 'next/navigation';

export function Search() {
   const searchParams = useSearchParams();
   const search = searchParams.get('search');
   return <div>Search: {search}</div>;
}

// needs to be suspended, because during pre-rendering we do not have access to the search values
<Suspense fallback={'Loading...'}>
   <Search />
</Suspense>;
```


## 4.2 - generateStaticParams

Generates `dynamic route parameters, allowing the pre-rendering` of these pages at build time.

### 4.2.1 - Async

It's `possible to pull the list from an external API` to generate the parameters.