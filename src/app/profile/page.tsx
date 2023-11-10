import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Dashboard from '@/components/pages/profile/dashboard/Dashboard';
import s from '@/components/pages/auth/signin/signin_page.module.scss';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin?callbackUrl=/profile');
  }

  return (
    <div className={s.signin_page}>
      <Dashboard />
    </div>
  );
};

export default ProfilePage;
