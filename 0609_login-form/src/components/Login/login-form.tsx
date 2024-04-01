import login from '@/actions/login';

export default async function LoginForm() {
  return (
    <>
      <form action={login}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
        <button>Login</button>
      </form>
    </>
  );
}
