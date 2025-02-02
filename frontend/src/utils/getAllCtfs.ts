import { AchievementDetails } from "@/types/acheivements";
import prisma from "@/lib/prisma";


export async function getAllCtfs() {
    const data = await prisma.ctf.findMany(
      {
        orderBy: [{
          placing: "asc",
        },
        {
          event: {
            date: "desc"
          }
        }],
        where: {
          NOT: {
            points: null
          }
        },
        select: {
          event: {
            select: {
              title: true,
              description: true,
              date: true,
              roles: {
                where: {
                  type: "ctf participant"
                },
                select: {
                  linkedDiscordRole: {
  
                    select: {
                      userDiscordRoles: {
                        select: {
                          discordUser: {
                            select: {
                              id: true,
                              username: true,
                              user: {
                                select: {
                                  realName: true
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  userRoles: {
                    select: {
                      user: {
                        select: {
                          id: true,
                          name: true,
                          realName: true,
                          discordId: true,
                        }
                      }
                    }
                  }
                }
              }
            },
          },
          members: {
            select: {
              user: {
                select: {
                  name: true,
                  discordId: true,
                  realName: true,
                },
              }
            }
          },
          ctfId: true,
          points: true,
          placing: true,
          link: true,
          logo: true,
          participants: true,
        }
      }
    );
    const formattedData: AchievementDetails[] = data.map((row) => {
      const participantingMembers: {
        [discordId: string]: {
          name: string,
          realName?: string,
        }
      } = {}
      for (const member of row.members) {
        if (!member.user.discordId) continue;
        participantingMembers[member.user.discordId] = {
          name: member.user.name ?? "",
          realName: member.user.realName ?? undefined,
        };
      }
      for (const member of row.event.roles[0]?.linkedDiscordRole?.userDiscordRoles ?? []) {
        if (!member.discordUser.id) continue;
        participantingMembers[member.discordUser.id] = {
          name: member.discordUser.username,
          realName: member.discordUser.user?.realName ?? undefined,
        };
      }
      for (const member of row.event.roles[0]?.userRoles ?? []) {
        if (!member.user.discordId) continue;
        participantingMembers[member.user.discordId] = {
          name: member.user.name ?? "",
          realName: member.user.realName ?? undefined,
        };
      }
      return {
        link: row.link,
        logo: row.logo,
        points: row.points,
        placing: row.placing?.toString() ?? "",
        ctfId: row.ctfId,
        title: row.event.title,
        description: row.event.description,
        members: Object.values(participantingMembers),
        date: row.event.date,
      }
    })
  
    const seperatedByYear: {
      [year: string]: AchievementDetails[]
    } = {}
    for (const row of formattedData) {
      const year = row.date.getFullYear().toString();
      if (!seperatedByYear[year]) {
        seperatedByYear[year] = [];
      }
      seperatedByYear[year].push(row);
    }
    return seperatedByYear;
  }