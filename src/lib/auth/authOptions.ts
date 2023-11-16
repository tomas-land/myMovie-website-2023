import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';

const authOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days

  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { name: 'email', type: 'email', label: 'Email' },
        password: { name: 'password', type: 'password', label: 'Password' },
      },
      async authorize(credentials: any): Promise<any> {
        // find if user exists with email that user entered
        const registeredUser = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        // compare password that user entered with hashed password in database
        const passwordIsValid = await bcrypt.compare(credentials.password, registeredUser?.password ?? '');
        // if user exists and password is valid, authorize user
        if (credentials.email === registeredUser?.email && passwordIsValid) {
          return {
            email: registeredUser?.email,
            name: registeredUser?.name,
            image: registeredUser?.image,
            id: registeredUser?.id,
          }
        } else {
          return null;
        }
      },
    }),
  ],
};

export default authOptions;
