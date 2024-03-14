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
      apikey: 'ORIGAMID123456',
    },
  });

  const sales = await response.json();

  return Response.json(sales);
}
```

</details>
