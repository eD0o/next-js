# 3 - Fetch and Cache

## 3.1 - Route Handlers

### 3.1.1 - route.ts

It's `possible to create JSON api routes` in Next.js. For that, just create a `file route.ts within a route, example: api/route.ts`.

It has the methods GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS.

It can be `used to hide API keys`.

> It is not possible to have page.tsx and route.ts on the same route.

<details>
<summary>Example route.ts</summary>

```tsx
// app/api/route.ts
export async function GET() {
  const response = await fetch('https://api.origamid.online/vendas', {
    headers: {
      apikey: 'ORIGAMID123456', //this part will be hidden in the site
    },
  });

  const sales = await response.json();

  return Response.json(sales);
}
```

</details>

### 3.1.2 - Server/Web API's

Access to the server's web api's such as `cookies (also httpOnly cookies), headers and others`.

<details>
<summary>Example using cookies</summary>

```tsx
// app/api/route.ts
import { cookies } from 'next/headers';

export async function GET() {
  const response = await fetch('https://api.origamid.online/conta/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'dog',
      password: 'dog',
    }),
  });

  if (!response.ok) {
    return Response.json({ error: 'Error in the API.' });
  }

  const data = await response.json();

  // setting this way turns possible to see the cookies by the console using document.cookie
  // cookies().set('token', data.token);

  // this way is safer and won't be showed in the console
  cookies().set('token', data.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
  return Response.json(data);
}
```

</details>

### 3.1.3 - Request

Access to the server's request object.

```tsx
// app/api/route.ts
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET() {
  const response = await fetch('https://api.origamid.online/conta/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'dog',
      password: 'dog',
    }),
  });

  if (!response.ok) {
    return Response.json({ error: 'Error in the API.' });
  }

  const data = await response.json();

  // setting this way turns possible to see the cookies by the console using document.cookie
  // cookies().set('token', data.token);

  // this way is safer and won't be showed in the console
  cookies().set('token', data.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
  return Response.json(data);
}

//NextRequest is the dependency, all the params/methods can be seen in the docs.
export async function POST(request: NextRequest) {
  const param = request.nextUrl.searchParams.get('busca');

  const body = await request.json();

  return Response.json({ body });
}
```

### 3.1.3.1 - Rest Client Extension

An useful VSCode `extension to test the API locally in the repo`, just create a .http to try the methods created and send the request.

```
GET http://localhost:3000/api

###

POST http://localhost:3000/api?busca=camisa

{
  "username": "dog",
  "password": "dog"
}
```

[![](https://i.imgur.com/pXhxNyGm.jpg)](https://i.imgur.com/pXhxNyG.png)

### 3.1.3.2 - Other docs

[Docs Next.js](https://nextjs.org/docs/app/api-reference/functions/next-request)
[Docs Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/API/Request)

## 3.2 - Server Actions

Functions that `run on the server but can be initiated by the client`. Put it at the beginning of the `'use server' as well as 'use client'` function or at the `beginning of the file`.

They are `activated automatically through a fetch ('POST')`. Basically, `they are automatically API endpoints`.

The function is not exposed on the client, they are `safe for sensitive information`.

They can be `activated by events, useEffect, forms and others`.

> Must be async.

### 3.2.1 - Server Actions vs Route Handlers

Server Actions:

- Automatically configures the endpoint

- It's possible to pass as an action on a form

- Does not expose the endpoint on the client

- Can return JSX

- Allows us to revalidate the cache

Route Handlers:

- We need to configure the endpoint

- Can be used by external services

- Cannot return JSX

### 3.3 - Cache (fetching from the server)

`By default, next uses force-cache`, which will create a `persistent fetch cache`.

### 3.3.1 - revalidate

revalidate is the `time in seconds that next will revalidate the fetch` cache.

Revalidation occurs after the request, so the `new data will only be available on the next request`.

Using `0 will prevent caching`.`

```tsx
// page.tsx
export const revalidate = 5; // -> global const for the fetchs
```

```tsx
// stocks/page.tsx
await fetch('https://api.origamid.online/acoes/lua', {
  next: {
    revalidate: 5, // revalidate each 5 seconds, will ignore global const
  },
});
```

### 3.3.2 - revalidatePath

It is a `function that receives the path of ONE route and revalidates its cache`.

It can be executed on the server, in Route Handlers and Server Actions.

```tsx
// actions/revalidate-path.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function revalidatePathAction(path: string) {
  revalidatePath(path);
}
```

```tsx
// components/update.tsx
'use client';
import { revalidatePathAction } from '@/actions/revalidate-path';

export default function Update() {
  return <button onClick={() => revalidatePathAction('/acoes')}>Update</button>;
}
```

### 3.3.3 - revalidateTag

It's possible to define tags during fetch and `revalidate the cache of MANY routes that have the same tag`.

```tsx
const response = await fetch('https://api.origamid.online/acoes/lua', {
  next: {
    tags: ['actions'],
  },
});
```

```tsx
import { revalidateTag } from 'next/cache';

revalidateTag('actions');
```

### 3.4 - Form Actions

#### 3.4.1 - FormData

FormData in JavaScript `simplifies collecting data from HTML forms`, streamlining sending form data in AJAX requests. It `automatically gathers and organizes form element values`, offering a concise method for data manipulation and server communication.

The `form tag has an attribute called action`, which can be used to send form data through a server action. `The server action now receives a FormData as an argument`.

<details>
<summary>Example using FormData</summary>

```tsx
// actions/add-product.ts
'use server';

import { Product } from '@/app/products/page';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProduct(formData: FormData) {
  console.log(formData);

  const product: Product = {
    nome: formData.get('name') as string,
    descricao: formData.get('description') as string,
    preco: Number(formData.get('price')),
    estoque: Number(formData.get('stock')),
    importado: formData.get('imported') ? 1 : 0,
  };

  const response = await fetch('https://api.origamid.online/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  await response.json();
  revalidatePath('/products');
  redirect('/products');
}
```

```tsx
// components/add-product.tsx
'use client';

import { addProduct } from '@/actions/add-product';
import { useFormStatus } from 'react-dom';

function Button() {
  const status = useFormStatus();
  return (
    <button type="submit" disabled={status.pending}>
      Add
    </button>
  );
}

export default function AddProduct() {
  return (
    <form action={addProduct}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" name="price" />
      <label htmlFor="stock">Stock:</label>
      <input type="text" id="stock" name="stock" />
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" />
      <label htmlFor="imported">
        <input type="checkbox" id="imported" name="imported" />
        Imported
      </label>
      <Button />
    </form>
  );
}
```

</details>

#### 3.4.2 - useFormStatus

Contains the form submission `status such as pending, data, method and action`. The pending is a boolean that indicates whether the form is being submitted.

It's `actually a resource from react`, but well used in next.

> Importantly, useFormStatus `only works if it is part of a component that is inside a form`, also, requires 'use client' (for being a React hook).

<details>
<summary>Example using useFormStatus</summary>

```tsx
function Button() {
  const status = useFormStatus();
  return (
    <button type="submit" disabled={status.pending}>
      Add
    </button>
  );
}
```

Now, just use the <Button/> component created in the form, as it's possible to see in the FormData example.

</details>

#### 3.4.3 - useFormState

With useFormState it's possible to `control the state of the form`. `Returns an array with two values`, the first is the `form state and the second is the server action`. It must receive the original server action as an argument.

> Avoid using redirect() inside a try-catch closure, it'll generate the NEXT_REDIRECT error.

<details>
<summary>Example using useFormState</summary>

```tsx
// /components/add-product.tsx
'use client';

import { addProduct } from '@/actions/add-product';
import { error } from 'console';
import { useFormState, useFormStatus } from 'react-dom';

function Button() {
  const status = useFormStatus();
  return (
    <button type="submit" disabled={status.pending}>
      Add
    </button>
  );
}

export default function AddProduct() {
  const [state, formAction] = useFormState(addProduct, {
    errors: [],
  });

  console.log(state);

  return (
    <form action={formAction}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" name="price" />
      <label htmlFor="stock">Stock:</label>
      <input type="text" id="stock" name="stock" />
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" />
      <label htmlFor="imported">
        <input type="checkbox" id="imported" name="imported" />
        Imported
      </label>
      {state.errors.map((error, index) => (
        <p style={{ color: 'red' }} key={index}>
          {error}
        </p>
      ))}
      <Button />
    </form>
  );
}
```

```tsx
// /actions/add-product.ts
'use server';

import { Product } from '@/app/products/page';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function validateName(name: string) {
  return typeof name === 'string' && name.length > 1;
}

function validatePrice(price: unknown) {
  return typeof price === 'number' && price > 1;
}

export async function addProduct(
  state: { errors: string[] },
  formData: FormData,
) {
  const product: Product = {
    nome: formData.get('name') as string,
    descricao: formData.get('description') as string,
    preco: Number(formData.get('price')),
    estoque: Number(formData.get('stock')),
    importado: formData.get('imported') ? 1 : 0,
  };

  let errors = [];

  if (!validateName(product.nome)) errors.push('Error: Name invalid.');
  if (!validatePrice(product.preco)) errors.push('Error: Price invalid.');
  if (errors.length > 0) return { errors };

  try {
    const response = await fetch('https://api.origamid.online/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Error adding product.');
  } catch (error: unknown) {
    if (error instanceof Error)
      return {
        errors: [error.message],
      };
  }
  revalidatePath('/products');
  redirect('/products');
  // return { errors: [] };
}
```

</details>

### 3.5 - Error