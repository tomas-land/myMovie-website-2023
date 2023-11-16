'use client';
import s from '../../signin/signin_form/signin_form.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { credentialsSchema } from '@/lib/zod/user/signupSchema';
import PrimaryButton from '@/components/shared/buttons/primary_button/PrimaryButton';

interface Credentials {
  username: string;
  email: string;
  password: string;
}
//tosasitfy

const CredentialsForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      const credentials: Credentials = {  // validating form data
        username: data.get('username') as string,
        email: data.get('email') as string,
        password: data.get('password') as string,
      };
      credentialsSchema.parse(credentials); // if invalid inputs, throws error

      const response = await fetch('/api/auth/signup', {  // if valid inputs, send request to server
        method: 'POST',
        body: JSON.stringify({
          username: data.get('username'),
          email: data.get('email'),
          password: data.get('password'),
        }),
      });
      const responseMessage = await response.json(); // get response from server, if error, set error, else redirect to signin page
      if (response.ok) {
        router.push('/signin');
      } else {
        setError(responseMessage.error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        console.log(error);
      }
    }
    handleResetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleResetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <form className={s.cred_form} onSubmit={handleSubmit}>
      <div className={s.error}>{error}</div>
      <div className={s.text_fields}>
        <input className={s.input} type="text" name="username" placeholder="username" autoComplete="off" value={formData.username} onChange={handleChange} />
        <input className={s.input} type="text" name="email" placeholder="email" autoComplete="off" value={formData.email} onChange={handleChange} />
        <input className={s.input} type="password" name="password" placeholder="password" autoComplete="off" value={formData.password} onChange={handleChange} />
      </div>
      <PrimaryButton label="sign up" type={'submit'} />
    </form>
  );
};

export default CredentialsForm;
