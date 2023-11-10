import React from 'react';
import s from '@/components/pages/auth/signin/signin_page.module.scss';
import GoogleSigninButton from '@/components/pages/auth/signin/google_signin_button/GoogleSigninButton';
import CredentialsForm from '@/components/pages/auth/signin/credentials_form/CredentialsForm';

const SignInPage = () => {
  return (
    <div className={s.signin_page}>
      <div className={s.container}>
        <h1 className={s.title}>Sign in</h1>
        <GoogleSigninButton/>
        <div className={s.divider}>
          <span></span>
          <span>or</span>
          <span></span>
        </div>
        <CredentialsForm />
      </div>
    </div>
  );
};

export default SignInPage;
