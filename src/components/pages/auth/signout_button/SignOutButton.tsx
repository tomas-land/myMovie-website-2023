'use client';
import { signOut } from 'next-auth/react';
import s from './signout_button.module.scss';

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return <button className={s.button} onClick={handleSignOut}>Sign Out</button>;
}
