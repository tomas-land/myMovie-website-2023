'use client';
import s from './signin_form.module.scss';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { credentialsSchema } from '@/lib/zod/user/signinSchema';
import PrimaryButton from '@/components/shared/buttons/primary_button/PrimaryButton';

const CredentialsForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      const credentials = {
        email: data.get('email') as string,
        password: data.get('password') as string,
      };
      credentialsSchema.parse(credentials);

      const signInResponse = await signIn('credentials', {
        email: data.get('email'),
        password: data.get('password'),
        redirect: false,
      });
      if (signInResponse && !signInResponse.error) {
        router.push(`/dashboard`);
      } else {
        setError('Your Email or Password is wrong!');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={s.cred_form} onSubmit={handleSubmit}>
      <div className={s.error}>{error}</div>
      <div className={s.text_fields}>
        <input className={s.input} type="text" name="email" placeholder="email@gmail.com" autoComplete="on" />
        <input className={s.input} type="password" name="password" placeholder="password" autoComplete="off" />
      </div>
      <PrimaryButton label="sign in" type={'submit'} spinner={loading} />
    </form>
  );
};

export default CredentialsForm;
