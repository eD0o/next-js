'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components//Forms/button';
import Input from '../Forms/input';
import ErrorMessage from '../Helper/error-message';
import styles from './login-form.module.scss';
import userPost from '@/actions/user-post';
import { useEffect } from 'react';

function FormButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>{pending ? 'Loading' : 'Sign Up'}</Button>;
}

export default function LoginCreateForm() {
  const [state, action] = useFormState(userPost, {
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
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
    </>
  );
}
