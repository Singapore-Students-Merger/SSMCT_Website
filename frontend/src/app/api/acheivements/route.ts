import { AchievementDetails } from "@/types/acheivements";
import { NextRequest, NextResponse } from 'next/server';
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
  const formattedData = data.map((row) => {
    const participantingMembers: {
      [discordId: string]: {
        name?: string,
        realName?: string,
      }
    } = {}
    for (const member of row.members) {
      if (!member.user.discordId) continue;
      participantingMembers[member.user.discordId] = {
        name: member.user.name ?? undefined,
        realName: member.user.realName ?? undefined,
      };
    }
    for (const member of row.event.roles[0]?.linkedDiscordRole?.userDiscordRoles ?? []) {
      if (!member.discordUser.id) continue;
      participantingMembers[member.discordUser.id] = {
        name: member.discordUser.username ?? undefined,
        realName: member.discordUser.user?.realName ?? undefined,
      };
    }
    for (const member of row.event.roles[0]?.userRoles ?? []) {
      if (!member.user.discordId) continue;
      participantingMembers[member.user.discordId] = {
        name: member.user.name ?? undefined,
        realName: member.user.realName ?? undefined,
      };
    }
    return {
      link: row.link,
      logo: row.logo,
      points: row.points,
      placing: row.placing,
      ctfId: row.ctfId,
      title: row.event.title,
      description: row.event.description,
      participants: Object.values(participantingMembers),
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
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fields = searchParams.get("fields");
  // const showAll = searchParams.get("all");
  try {
    if (fields === "names") {
      // Fetch only eventId and eventName
      const ctfs = await prisma.ctf.findMany({
        select: {
          eventId: true,
          event: {
            select: {
              title: true,
            },
          },
        },
      });
      const formattedCtfs = ctfs.map(ctf => ({
        id: ctf.eventId,
        title: ctf.event.title,
      }));

      return NextResponse.json(formattedCtfs);
    }
    const achievementDetails = await getAllCtfs()
    return NextResponse.json(achievementDetails);
  }
  catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Failed to fetch event names" }, { status: 500 });
  }




}