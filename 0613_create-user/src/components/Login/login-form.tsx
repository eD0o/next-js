'use client';

import login from '@/actions/login';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components//Forms/button';
import Input from '../Forms/input';
import ErrorMessage from '../Helper/error-message';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './login-form.module.scss';

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

  useEffect(() => {
    if (state.ok) window.location.href = '/account';
  }, [state.ok]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="Username" name="username" type="text" />
        <Input label="Password" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <Link className={styles.recover} href="/login/recover">
        Forgot your password?
      </Link>
      <div className={styles.signin}>
        <h2 className={styles.subtitle}>Sign In</h2>
        <p>Still doesnt have an account?</p>
        <Link className="button" href="/login/create">
          Sign In
        </Link>
      </div>
    </>
  );
}
