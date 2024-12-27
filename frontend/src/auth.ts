import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/signin', // Error code passed in query string as ?error=
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify guilds' }} 
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account.provider === "discord") {
        console.log("Discord account:", account);
        const guildId = process.env.DISCORD_GUILD_ID; // Your Discord guild ID
        const apiUrl = "https://discord.com/api/v10/users/@me/guilds";

        // Fetch user's guilds
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user's Discord guilds");
          throw new Error("Failed to fetch user's Discord guilds");
        }

        const guilds = await response.json();
        const isInGuild = guilds.some((guild) => guild.id === guildId);
        if (!isInGuild) {
          console.error("User is not in the required Discord guild");
          throw new Error("You must be in the SSMCTF Discord Server as a member to sign in");
        }
      }

      return true; // Allow sign-in
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}