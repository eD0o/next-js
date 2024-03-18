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
