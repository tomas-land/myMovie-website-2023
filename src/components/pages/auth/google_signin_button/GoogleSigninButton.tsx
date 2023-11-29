'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import s from './google_signin_button.module.scss';
import { useState } from 'react';

const GoogleSigninButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: '/dashboard' });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button className={s.google_signin_btn} onClick={handleClick}>
      <span>
        <FcGoogle />
      </span>
      {isLoading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  );
};

export default GoogleSigninButton;
