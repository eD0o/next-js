'use server';

import { USER_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import login from './login';

export default async function userPost(state: {}, formData: FormData) {
  const username = formData.get('username') as string | null;
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  try {
    if (!username || !password || !email) throw new Error('Fullfill the data.');

    if (password.length < 6)
      throw new Error('The password must have more than 6 caracteres.');

    const { url } = USER_POST();
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('E-mail or user already used.');

    const { ok } = await login({ ok: true, error: '' }, formData);

    if (!ok) throw new Error('Error logging.');

    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
