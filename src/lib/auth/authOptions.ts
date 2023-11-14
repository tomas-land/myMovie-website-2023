import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';

const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        console.log(credentials)
        const registeredUser = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        console.log(registeredUser)
        const passwordIsValid = await bcrypt.compare(credentials.password, registeredUser?.password ?? '');
        console.log(passwordIsValid)
        if (credentials.email === registeredUser?.email && passwordIsValid) {
          return registeredUser;
        } else {
          return null;
        }
      },
    }),
  ],
  // pages: {
  //   signIn: '/signin',
  //   signOut: '/signout',
  //   error: '/error', // Error code passed in query string as ?error=
  // },
};

export default authOptions;
