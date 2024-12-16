import NextAuth from "next-auth";
import DiscordProvider from "@auth/discord";

const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account.provider === "discord") {
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
          return false;
        }

        const guilds = await response.json();
        const isInGuild = guilds.some((guild) => guild.id === guildId);

        if (!isInGuild) {
          console.error("User is not in the required Discord guild");
          return false;
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
