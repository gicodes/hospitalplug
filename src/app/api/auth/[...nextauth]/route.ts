import NextAuth from 'next-auth';
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

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn() { // {user}
      // Here you can add database checks or whitelist logic if needed
      // Example: Only allow users with emails in a whitelist
      // const allowedEmails = ['user1@example.com', 'user2@example.com'];
      // if (!allowedEmails.includes(user.email!)) {
      // return false;
      // }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token?.sub) {
          session.user.id = token.sub;
        }
        if (typeof token?.role === 'string') {
          session.user.role = token.role;
        }
      }
      return session;
    },
    async jwt({ token }) {
      token.role = 'user'; // default role
      return token;
    },
  },
  pages: {
    signIn: '/auth/user',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
