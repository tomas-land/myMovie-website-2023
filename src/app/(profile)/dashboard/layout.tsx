import DashboardMenu from '@/components/layouts/dashboard_menu/DashboardMenu'
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth/authOptions';
import UserInfo from '@/components/pages/profile/user_info/UserInfo';
import { getUserByEmail } from '@/lib/requests/user';
import s from '@/components/pages/profile/dashboard/dashboard.module.scss'

// export const revalidate = 0;
// export const dynamic = 'force-dynamic'

 
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/signin');
  }

  const userEmail = session.user?.email;
  if (!userEmail) {
    throw new Error('User email not found in session');
  }
  
  const user = await getUserByEmail(userEmail);

  return (
    <div className={s.dashboard}>
      <UserInfo user={user} session={session} />
      <DashboardMenu />
      <div>
        {children}
      </div>
    </div>

  )
}
