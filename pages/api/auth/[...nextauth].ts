import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@mail.com' },
        password: { label: 'Password', type: 'password', placeholder: '******' }
      },
      async authorize(credentials) {
        return await dbUsers.checkUserCredentials(credentials!.email, credentials!.password);
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  // Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  // Session configurations
  session: {
    maxAge: 2592000, // 30 days
    strategy: 'jwt',
    updateAge: 86400
  },
  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        
        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;
            
            case 'oauth':
              token.user = await dbUsers.OAuthToDbUser(user?.name || '', user?.email || '');
              break;
            }
          }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      
      return session;
    }
  }
})