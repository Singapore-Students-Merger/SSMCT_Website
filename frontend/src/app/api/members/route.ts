import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Members } from "@/types/members";
/* 
To whomever it may concern:
I apologise in advance if you are attempting to edit this code, for I have no idea 
how it got to this point. 

If you attempt to optimise this code, I would reccomend to give up now, for you will surely
have gone insane by the time you finish.

Sincerely,
Baba
*/

let cachedMembers: Members[]|null = null;
let lastFetchedTime = 0; // Track when the cache was last updated
const CACHE_DURATION = 60 * 60 * 1000; // Cache duration in milliseconds (e.g., 1 hour)



export async function getCachedMembers() : Promise<Members[]> {
    const currentTime = Date.now();
  
    if (!cachedMembers || currentTime - lastFetchedTime > CACHE_DURATION) {
      cachedMembers = await getMembers();
      lastFetchedTime = currentTime;
    }
  
    return cachedMembers;
  }

async function getMembers() : Promise<Members[]>{
    const data = await prisma.discordusers.findMany({
        select: {
            username:true, 
            discordRoles: {
                where: {
                    NOT: {
                        discordRole: {
                            linkedRole: null
                        }
                    } 
                },
                select: {
                    discordRole: {
                        select: {
                            linkedRole: {
                                select: {
                                    title: true,
                                    type: true,
                                    linkedEvent: {
                                        select: {
                                            ctf: {
                                                select: {
                                                    ctfId: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            user: {
                select: {
                    name: true,
                    realName: true,
                    userroles: {
                        select: {
                            role: {
                                
                                select: {
                                    
                                    title: true,
                                    type: true,
                                    linkedEvent: {
                                        select: {
                                            ctf: {
                                                select: {
                                                    ctfId: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    ctfs: {
                        select:{
                            ctfId: true
                        }
                    }
                }
            }
        }
    })
    const formattedData: Members[] = data.map((member) => {
        const roles: string[] = []
        const ctfs = new Set();
        if (member.user){
            for (const role of member.user.userroles){
                const roleObj = role.role
                if (roleObj.type == "organiser" || 
                    roleObj.type == "admin" || 
                    roleObj.type == "developer"){
                roles.push(roleObj.title)
                }
                if (roleObj.linkedEvent?.ctf){
                    ctfs.add(roleObj.linkedEvent.ctf.ctfId)
                }
            }
            for (const ctf of member.user.ctfs){
                ctfs.add(ctf.ctfId)
            }
        }
        
        for (const role of member.discordRoles??[]){
            const roleObj = role.discordRole.linkedRole
            if (!roleObj){
                continue
            }
            if (roleObj.type == "organiser" || 
                roleObj.type == "admin" || 
                roleObj.type == "developer"){
            roles.push(roleObj.title)
            }
            if (roleObj.linkedEvent?.ctf){
                ctfs.add(roleObj.linkedEvent.ctf.ctfId)
            }
        }
        if (member.user){
            return {
                username: member.user.name!,
                realName: member.user.realName??member.user.name!,
                roles: roles,
                ctfCount: ctfs.size
            }
        }
        else{
            return {
                username: member.username,
                realName: member.username,
                roles: roles,
                ctfCount: ctfs.size
            }
        }
        
    })
    formattedData.sort((a,b) => {
        return b.ctfCount! - a.ctfCount! 
    })
    return formattedData
}
export async function GET(){
    try{
        const members = await getMembers()
        return NextResponse.json(members)
    }
    catch (error){
        console.error(error.message)
        return NextResponse.json({error:true})
    }

}