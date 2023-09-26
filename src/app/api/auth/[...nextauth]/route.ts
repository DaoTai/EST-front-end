import {
  checkExistEmailAndProvider,
  signIn,
  signInByFetch,
  signUpWithFetch,
} from "@/services/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;
        const res = await signInByFetch({ email, password });

        if (res.ok) {
          const user = await res.json();
          return { user } as any;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (trigger === "update") {
        token.user = session;
      }

      if (account?.provider && account?.provider !== "credentials" && user) {
        try {
          const existUser = await checkExistEmailAndProvider(
            user?.email as string,
            account?.provider as string
          );

          if (existUser) {
            const loginUser = await signIn({
              email: user.email as string,
              provider: account.provider,
            });
            if (loginUser) token.user = loginUser;
          } else {
            const createdUser = await signUpWithFetch({
              email: user.email as string,
              avatar: user.image as string,
              fullName: user.name as string,
              provider: account.provider as string,
            });
            if (createdUser && createdUser.provider) {
              const loginUser = await signIn({
                email: createdUser.email,
                provider: createdUser.provider,
              });
              if (loginUser) token.user = loginUser;
            }
          }
        } catch (error) {
          Promise.reject(error);
        }
      }

      const payload = { ...token, ...user };

      return payload;
    },

    async session({ session, token, newSession }) {
      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});

export { handler as GET, handler as POST };
