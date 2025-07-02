import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      console.log("in middleware", token);
      return token?.isSystemAdmin === true;
    },
  },
});

export const config = { matcher: ["/admin/:path*"] };
