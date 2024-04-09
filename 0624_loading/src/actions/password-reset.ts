'use server';

import { PASSWORD_RESET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { redirect } from 'next/navigation';

export default async function passwordReset(state: {}, formData: FormData) {
  const login = formData.get('login') as string | null;
  const key = formData.get('key') as string | null;
  const password = formData.get('key') as string | null;

  try {
    if (!login || !key || !password) throw new Error('Fullfill the data.');

    const { url } = PASSWORD_RESET();

    // using formData or the body itself is indifferent, but if you formData, don't use content-type together
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Not authorized.');
  } catch (error: unknown) {
    return apiError(error);
  }

  redirect('/login');
}
