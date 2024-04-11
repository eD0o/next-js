'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components//Forms/button';
import Input from '../Forms/input';
import ErrorMessage from '../Helper/error-message';
import styles from './login-form.module.scss';
import { useEffect, useState } from 'react';
import passwordReset from '@/actions/password-reset';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>{pending ? 'Loading' : 'Reset Password'}</Button>
  );
}

export default function LoginResetForm({
  keyToken,
  login,
}: {
  login: string;
  keyToken: string;
}) {
  const [state, action] = useFormState(passwordReset, {
    ok: false,
    error: '',
    data: null,
  });

  const [url, setUrl] = useState('');
  // another solution to avoid window is not defined
  useEffect(() => {
    setUrl(window.location.href.replace('recover', 'reset'));
  }, []);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label="New password" name="password" type="password" />
        <input type="hidden" name="login" value={login} />
        <input type="hidden" name="key" value={keyToken} />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
    </>
  );
}
