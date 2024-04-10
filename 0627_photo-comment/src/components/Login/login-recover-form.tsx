'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components//Forms/button';
import Input from '../Forms/input';
import ErrorMessage from '../Helper/error-message';
import styles from './login-form.module.scss';
import passwordLost from '@/actions/password-lost';
import { useEffect, useState } from 'react';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>{pending ? 'Loading' : 'Send Email'}</Button>
  );
}

export default function LoginRecoverForm() {
  const [state, action] = useFormState(passwordLost, {
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
        <Input label="Email / User" name="login" type="text" />
        <input type="hidden" name="url" value={url} />
        <ErrorMessage error={state.error} />
        {state.ok ? (
          <p style={{ color: '#4c1' }}>Email sent.</p>
        ) : (
          <FormButton />
        )}
      </form>
    </>
  );
}
