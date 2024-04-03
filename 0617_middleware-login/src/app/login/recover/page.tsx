import LoginRecoverForm from '@/components/Login/login-recover-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot your password?',
  description: 'Recover your password.',
};

// one solution to avoid window is not defined from LoginRecoverForm
// export const dynamic = 'force-dynamic';

export default async function RecoverPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Forgot your password?</h1>
      <LoginRecoverForm />
    </div>
  );
}
