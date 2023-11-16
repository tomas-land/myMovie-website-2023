'use client';
import { signOut } from 'next-auth/react';
import PrimaryButton from '@/components/shared/buttons/primary_button/PrimaryButton';
import { FiLogOut } from "react-icons/fi";



export default function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return <PrimaryButton label="sign out" handleClick={handleSignOut} icon={<FiLogOut />} />;
}
