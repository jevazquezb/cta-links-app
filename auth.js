import NextAuth from "next-auth";
import Sendgrid from "next-auth/providers/sendgrid";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongo";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // trustHost: true,
  providers: [
    Sendgrid({
      // If your environment variable is named differently than default
      apiKey: process.env.SENDGRID_KEY,
      from: "no-reply@email.zappyvid.com",
      name: "email",
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // authorization: {
      // url: "https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login",
      // params: {
      //   prompt: "consent",
      //   access_type: "offline",
      //   response_type: "code",
      // },
      // },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  theme: {
    colorScheme: "light",
  },
});
