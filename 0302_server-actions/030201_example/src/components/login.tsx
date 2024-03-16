'use client';

export default function Login() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) window.location.href = '/';
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">User</label>
      <input type="text" id="uisername" name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <button>Login</button>
    </form>
  );
}
