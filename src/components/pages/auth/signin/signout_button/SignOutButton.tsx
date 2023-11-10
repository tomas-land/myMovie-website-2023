'use client';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // Perform any additional cleanup or actions after sign out
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
}