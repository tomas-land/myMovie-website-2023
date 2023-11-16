import React from 'react';
import s from '@/components/pages/auth/signin/signin_page.module.scss';
import GoogleSigninButton from '@/components/pages/auth/google_signin_button/GoogleSigninButton';
import CredentialsForm from '@/components/pages/auth/signin/signin_form/SigninForm';
import Link from 'next/link';


const SignInPage = () => {
  return (
    <div className={s.signin_page}>
      <div className={s.container}>
        <h1 className={s.title}>Sign in</h1>
        <GoogleSigninButton />
        <div className={s.divider}>
          <span></span>
          <span>or</span>
          <span></span>
        </div>
        <CredentialsForm />
        <span className={s.signup_ref}>
          Don&apos;t have an account ? <Link href="/signup">Sign up !</Link>
        </span>
      </div>
    </div>
  );
};

export default SignInPage;
