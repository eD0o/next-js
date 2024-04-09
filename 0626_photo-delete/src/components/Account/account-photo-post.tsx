'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components//Forms/button';
import Input from '../Forms/input';
import ErrorMessage from '../Helper/error-message';
import styles from './account-photo-post.module.scss';
import { useState } from 'react';
import photoPost from '@/actions/photo-post';

function FormButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>{pending ? 'Sending' : 'Send'}</Button>;
}

export default function AccountPhotoPost() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: '',
    data: null,
  });

  const [img, setImg] = useState('');

  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  }

  return (
    <>
      <section className={`${styles.photoPost} animeLeft`}>
        <form action={action}>
          <Input label="Name" name="nome" type="text" />
          <Input label="Weight" name="peso" type="number" />
          <Input label="Age" name="idade" type="number" />
          <input
            onChange={handleImgChange}
            type="file"
            name="img"
            id="img"
            className={styles.file}
          />
          <ErrorMessage error={state.error} />
          <FormButton />
        </form>
        <div>
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        </div>
      </section>
    </>
  );
}
