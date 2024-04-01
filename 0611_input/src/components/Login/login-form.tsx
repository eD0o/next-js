'use client';

import login from '@/actions/login';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components//Forms/button';

function FormButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>{pending ? 'Loading' : 'Login'}</Button>;
}

export default function LoginForm() {
  const [state, action] = useFormState(login, {
    ok: false,
    error: '',
    data: null,
  });

  return (
    <>
      <form action={action}>
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
        <FormButton />
        <p>{state.error}</p>
      </form>
    </>
  );
}
