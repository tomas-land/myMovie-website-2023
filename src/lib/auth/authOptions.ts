import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';

interface User {
  id: string;
  name: string | null;
  username: string | null;
  password: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

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
          return registeredUser;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {  // sign up with google
      const registeredUser = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });
      if (registeredUser) {
        return true;
      } else {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
        return true;
      }

      //   //   } else {
      //   //     const newUser = await prisma.user.create({
      //   //       data: {
      //   //         email: user.user.email,
      //   //         name: user.user.name,
      //   //         image: user.user.image,
      //   //       },
      //   //     });
      //   //     return true;
      //   //   }
      //   // }
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default authOptions;
