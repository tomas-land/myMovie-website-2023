import '@styles/globals.scss';
import { montserrat } from '@/lib/fonts';
import Header from '@/components/layouts/header/Header';
import { ContextProviders } from '@/context/ContextProviders';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'MyMovie',
  description: 'My movies collection',
  icons: {
    icon: '/icon.png',
  },
  
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <ContextProviders>
          <Header />
          <ToastContainer />
          <main>{children}</main>
        </ContextProviders>
      </body>
    </html>
  );
}
