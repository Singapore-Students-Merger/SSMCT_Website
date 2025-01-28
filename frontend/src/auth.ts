import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession, type DefaultSession } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      discordId?: string;
    } & DefaultSession["user"];
  }
}

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
const userIsInSSM = async (access_token: string) => {
  const guildId = process.env.DISCORD_GUILD_ID; // Your Discord guild ID
    const apiUrl = "https://discord.com/api/v10/users/@me/guilds";

    // Fetch user's guilds
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user's Discord guilds");
      throw new Error("Failed to fetch user's Discord guilds");
    }
    interface Guild {
      id: string;
    }

    const guilds: Guild[] = await response.json();
    const isInGuild: boolean = guilds.some((guild: Guild) => guild.id === guildId);
    if (!isInGuild) {
      console.error("User is not in the required Discord guild");
      return false
    }
    return true;
}


export const config = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/',
    signOut: '/auth/signout',
    error: '/auth/signin', // Error code passed in query string as ?error=
    newUser: '/auth/new_user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "database"
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify guilds guilds.members.read' }},
      token: "https://discord.com/api/oauth2/token",
      userinfo: "https://discord.com/api/users/@me",
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.username,
          image: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : null,
        }
      } 
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (!account || !user) {
        return false;
      }
      if (account.provider === "discord") {
        console.log(account)
        const discordId = account.providerAccountId;
        if (!account.access_token) {
          return false;
        }
        const fromSSM = await userIsInSSM(account.access_token);
        if (!fromSSM) {
          throw new Error("User is not in the required Discord guild");
        }
        await prisma.user.update({
          where: { id: user.id },
          data: {
            discordId,
          },
        });
        

      }

      return true; // Allow sign-in
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
        // session.user.discordId = user.discordId; // Include Discord ID in the session
      }
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