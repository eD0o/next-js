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
