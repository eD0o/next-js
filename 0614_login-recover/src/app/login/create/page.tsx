import LoginCreateForm from '@/components/Login/login-create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create you account',
  description: 'Create your account in the Dogs site',
};

export default async function CreatePage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Sign up</h1>
      <LoginCreateForm/>
    </div>
  );
}
