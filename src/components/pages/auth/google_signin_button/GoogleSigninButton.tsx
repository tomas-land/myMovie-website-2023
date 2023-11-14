'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import s from './google_signin_button.module.scss';

const GoogleSigninButton = () => {
  const handleClick = () => {
    signIn('google', { callbackUrl: '/profile' });
  };
  return (
    <button className={s.google_signin_btn} onClick={handleClick}>
      <span>
        <FcGoogle />
      </span>
      Sign in with Google
    </button>
  );
};

export default GoogleSigninButton;
