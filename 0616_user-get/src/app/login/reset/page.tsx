import LoginResetForm from '@/components/Login/login-reset-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset your password.',
  description: 'Reset your password.',
};

type ResetSearchParams = {
  searchParams: {
    key: string;
    login: string;
  };
};

export default async function ResetPage({ searchParams }: ResetSearchParams) {

  return (
    <div className="animeLeft">
      <h1 className="title">Reset your password</h1>
      <LoginResetForm keyToken={searchParams.key} login={searchParams.login} />
    </div>
  );
}
