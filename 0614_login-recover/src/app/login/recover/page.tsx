import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Forgot your password?',
  description: 'Recover your password.'
}


export default async function RecoverPage() {
  return (
    <main>
      <h1>Recover</h1>
    </main>
  );
}
