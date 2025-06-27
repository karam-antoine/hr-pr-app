import { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
      authorization: { params: { scope: "openid profile user.Read email" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 5,
  },
  jwt: {
    maxAge: 60 * 60 * 5,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await prisma.user.findUnique({
          where: { email: profile.email as string },
        });
        console.log("user", user);
        if (user) {
          token.isSystemAdmin = user.isSystemAdmin;
        }

        token.idToken = account.id_token as string;
        token.accessToken = account.access_token as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      session.user!.email = token.email as string;
      session.isSystemAdmin = token.isSystemAdmin as boolean;
      return session;
    },
  },
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    isSystemAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    accessToken?: string;
    idToken?: string;
    isSystemAdmin: boolean;
  }
}
