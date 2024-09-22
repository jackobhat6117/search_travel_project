import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import * as https from "https";


const authOptions: any = {
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        user: { label: "Email:", type: "text" },
        password: { label: "Password:", type: "password" },
      },
      authorize: async (credentials: any) => {
        const { email, password } = credentials;

        console.log('myemail',email, 'passsword', password)

        const data = {
          email: email,
          password: password,
        };

        try {
          const response = await axios.post(
            "https://dev.intraversewebservices.com/api/main/v1/account/login?populate=detail",
            data
          );

          const user = response.data.data;

          if (response.status === 200 || response.status === 201) {
            return {
              BearerToken: user.token,
              id: user.account._id,
              firstName: user.account.firstName,
              lastName: user.account.lastName,
              email: user.account.email,
              phone: user.account.phone,
              userType: user.account.userType,
            };
          } else {
            throw new Error("Authentication failed");
          }
        } catch (error) {
          console.error("Login Error:", error);
          throw new Error("Something went wrong during authentication");
        }
      },
    }),
  ],

  pages: {
  signIn: "/login",
  error: "/auth/error", 
}
,

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phone = user.phone;
        token.userType = user.userType;
        token.accessToken = user.BearerToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          phone: token.phone,
          userType: token.userType,
        };
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
