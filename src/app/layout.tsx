import '@styles/globals.scss'
import { montserrat } from '@/lib/fonts';
import Header from '@/components/layouts/header/Header';

export const metadata = {
  title: 'MyMovie',
  description: 'My movies collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
