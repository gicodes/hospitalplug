import User from '@/model/user';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id?: string;
    role?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) throw new Error('Missing email');

        const existing = await User.findOne({ where: { email: user.email } });

        if (!existing) {
          await User.create({
            email: user.email,
            name: user.name || undefined,
            image: user.image || undefined,
            role: 'user',
          });
        }

        return true;
      } catch (err) {
        console.error('Google SignIn Error:', err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
        token.role = 'user';
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token?.email) {
        session.user.email = token.email;
        session.user.role = typeof token.role === 'string' ? token.role : 'user';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/user',
  },
  secret: process.env.NEXTAUTH_SECRET,
};