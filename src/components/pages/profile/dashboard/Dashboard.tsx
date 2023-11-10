'use client';
import React from 'react';
import s from './dashboard.module.scss';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/pages/auth/signin/signout_button/SignOutButton';


const Dashboard = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/dashboard');
    },
  });

  return <div className={s.dashboard}>Dashboard
  {session && <div>{session.user?.name}</div>}
  <SignOutButton />
  
  </div>;
};

export default Dashboard;
