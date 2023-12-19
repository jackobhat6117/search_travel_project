import NextAuth from "next-auth";
import React from "react";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import * as https from "https";
import { JWT } from "next-auth/jwt";
import uuid from "react-uuid";

interface User {
  BearerToken: string;
  Username: string;
}
const authOptions: any = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        Username: {
          lable: "Username:",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "Password",
        },
      },
      authorize: async (credentials: any, req) => {
        const { username, password } = credentials;

        const additionalInfo = {
          RequestRefID: `AuthenticationReqRefID:-${uuid()}`,
          CommandID: "AuthenticationCmdID:",
          Remark: "",
          Timestamp: new Date().toISOString(),
          SourceSystem: "PORTAL",
          Parameters: [],
          ReferenceData: [
            {
              Key: "AppVersion",
              Value: "v0.2",
            },
          ],
        };

        const data = {
          ...additionalInfo,
          AuthenticationInfo: {
            Username: username,
            Password: password,
          },
        };
        const agent = new https.Agent({
          rejectUnauthorized: false,
        });
        console.log(data);

        try {
          const response = await axios.post(
            `${process.env.API_URL}/login`,
            data,
            { httpsAgent: agent }
          );
          const user = await response.data;
          console.log("users for", user);
          if (response.status === 200 || response.status === 201) {
            //console.log(user)
            return Promise.resolve(user.AuthenticationResponseInfo);
          } else {
            return Promise.reject(
              new Error(user.error || "Authentication failed")
            );
          }
        } catch (error) {
          console.log(error);
          return Promise.reject(new Error("Something went wrong"));
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        const loggedInUser = user as User;

        token.email = loggedInUser.Username;
        token.accessToken = loggedInUser.BearerToken;

        const authToken = token.accessToken;
      }
      return token;
    },
    async session({
      session,
      user,
      token,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      const authToken = token.accessToken;

      if (token) {
        session.user = token;
        const sanitizedToken = Object.keys(token).reduce((p, c) => {
          // strip unnecessary properties
          if (
            c !== "iat" &&
            c !== "exp" &&
            c !== "jti" &&
            c !== "accessToken"
          ) {
            return { ...p, [c]: token[c] };
          } else {
            return p;
          }
        }, {});
        return {
          ...session,
          user: sanitizedToken,
          accessToken: token.accessToken,
        };
      }

      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
