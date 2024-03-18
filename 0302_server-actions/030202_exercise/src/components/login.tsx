'use client';

import { login } from '@/actions/login';

export default function Login() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    await login(username, password);
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
