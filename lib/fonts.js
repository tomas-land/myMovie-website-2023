import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({ 
  subsets: ['latin'],
  fallback: ['Montserrat', 'sans-serif'],
  variable:'--font-montserrat',
  display:"swap"

})