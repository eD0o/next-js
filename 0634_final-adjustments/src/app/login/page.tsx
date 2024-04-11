import LoginForm from "@/components/Login/login-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login Dogs',
  description: 'Login in your account.'
}

export default async function LoginPage() {
  return (
    <section className="animeLeft">
      <h1 className="title" >Login</h1>
      <LoginForm/>
    </section>
  );
}
