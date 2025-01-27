import { Client, Events, GatewayIntentBits } from "discord.js"
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { connect } from "http2";
const token = process.env.DISCORD_BOT_TOKEN
if (!token) throw new Error("No token provided")
const guildId = process.env.DISCORD_GUILD_ID || "";
if (!guildId) throw new Error("No guild ID provided")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
})

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

async function getGuildMemberRoles(guildId: string) {
    try {
        const guild = await client.guilds.fetch(guildId); // Fetch the guild
        if (!guild) {
            throw new Error("Guild not found");
        }

        const members = await guild.members.fetch(); // Fetch all members
        const memberRoles = members.map((member) => {
            const roles = member.roles.cache.map((role) => ({ "name": role.name, "id": role.id })); // Get role names
            return {
                member: member.user.tag,
                id: member.user.id,
                discriminator: member.user.discriminator,
                roles,
            };
        });

        return memberRoles;
    } catch (error) {
        console.error("Error fetching guild member roles:", error);
        return [];
    }
}

interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    roles: { title: string; id: string }[];
}

async function addUserToDb(user: DiscordUser) {
    console.log(user)
    
    // return
    // const rolesPayload = user.roles?.map((role) => ({
    //     discordRole: {
    //         connectOrCreate: {
    //             where: { id: role.id },
    //             create: { id: role.id, title: role.title },
    //         },
    //     },
    // })) || [];

    const rolesPayload = {
        connectOrCreate: user.roles.map((role) => ({
            where: {
                discordId_discordRoleId: {
                    discordId: user.id,
                    discordRoleId: role.id
                }
            },
            create: {
                discordRole: {
                    connectOrCreate: {
                        where: { id: role.id },
                        create: { id: role.id, title: role.title },
                    }
                },
            }
        })),
    }
    await prisma.$transaction([
        prisma.discordusers.upsert({
            where: { id: user.id },
            update: {
                username: user.username,
                discriminator: user.discriminator,
                discordRoles: rolesPayload
                // connectOrCreate: 
                //     [
                //         {
                //             where: { discordId_discordRoleId: { discordId: user.id, discordRoleId: user.roles[0].id } },
                //             create: { discordRole:{
                //                 connectOrCreate: {
                //                     where: { id: user.roles[0].id },
                //                     create: { id: user.roles[0].id, title: user.roles[0].title },
                //                 }
                //             } 
                //         }
                //         }
                //     ],
                // where: { 
                //     discordId_discordRoleId: {
                //         discordId: user.id,
                //         discordRoleId: user.roles[0].id
                //     }
                // },
                // create: {
                //     discordRole: {
                //         connectOrCreate: {
                //             where: { id: user.roles[0].id },
                //             create: { id: user.roles[0].id, title: user.roles[0].title },
                //         }
                //     },
                // }


            },
            create: {
                id: user.id,
                username: user.username,
                discriminator: user.discriminator,
                discordRoles: rolesPayload
            },
        }),
    ]);
}



export async function GET() {
    await client.login(token)
    // client.destroy()

    const roles = await getGuildMemberRoles(guildId);
    for (const member of roles) {
        await addUserToDb({
            id: member.id,
            username: member.member,
            discriminator: member.discriminator,
            roles: member.roles.map(role => ({ title: role.name, id: role.id }))
        })
    
    }
    return NextResponse.json({ roles: {} })
}