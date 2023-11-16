import s from '@/components/layouts/dashboard/layout.module.scss'
import DashboardMenu from '@/components/layouts/dashboard_menu/DashboardMenu'
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth/authOptions';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
      redirect('/signin');
  }
  return (
    <div className={s.layout}>
      {/* // user info */}
      <DashboardMenu />
      <div  >
        {children}
      </div>
    </div>

  )
}
