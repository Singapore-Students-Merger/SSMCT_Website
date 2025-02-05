import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
interface TeamData{
    team_id: number;
    points: string;
    place: number;
}

interface CTFdResponse{
    [ctfId: string]: {
        title: string;
        scores: TeamData[];
    };
}

async function getEventInformation(ctfId: string) {
    const eventURL = `${process.env.CTF_TIME_API_URL}/events/${ctfId}/`;
    const data = await fetch(eventURL);
    if (!data.ok) {
        console.error("Failed to fetch data", data);
        return { error: "Failed to fetch data" };
    }
    const event = await data.json();
    return event;
}
export async function GET(req: Request, { params }: { params: Promise<{ year: string }> }) {
    try{
        const newParams = await params;
        const year = parseInt(newParams.year);
        const session = await auth();
        if (process.env.CTF_TIME_API_URL === undefined || process.env.CTF_TIME_ID === undefined) {
            return NextResponse.json({ error: "CTF Time API URL or CTF ID not set" }, { status: 500 });
        }
        const SSM_CTF_ID = parseInt(process.env.CTF_TIME_ID);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized. Please login." }, { status: 401 });
        }
        const resultsURL = `${process.env.CTF_TIME_API_URL}/results/${year}/`;
        const data = await fetch(resultsURL);
        if (!data.ok) {
            console.error("Failed to fetch data", data);
            return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
        }
        const results:CTFdResponse = await data.json();
        if (results.error) {
            return NextResponse.json({ error: results.message }, { status: 500 });
        }
        const ctfs = [];
        const existingCTFs = await prisma.ctf.findMany();
        for (const [ctfId, ctfData] of Object.entries(results)) {
            const ctfExists = existingCTFs.some((ctf)=>ctf.ctfId == parseInt(ctfId))
            const ctfTitle:string = ctfData.title;
            const teamData = ctfData.scores;
            const SSM = teamData.find((team)=>team.team_id === SSM_CTF_ID);
            if (!SSM) {
                continue;
            }
            const event = await getEventInformation(ctfId);
            if (event.error) {
                continue;
            }
            console.log(event,SSM)
            const {description,start,url,participants,logo} = event;
            const {points,place} = SSM;
            ctfs.push({
                ctfId: ctfId,
                points: points,
                placing: place,
                title: ctfTitle,
                link: url,
                participants: participants,
                logo: logo
            });

            if (ctfExists) {
                await prisma.ctf.update({
                    where: {
                        ctfId: parseInt(ctfId)
                    },
                    data: {
                        points: parseFloat(points),
                        placing: place,
                        link: url,
                        participants: participants,
                        logo: logo
                    }
                });
            } else {
                

                const event = await prisma.events.create({
                    data: {
                        title: ctfTitle,
                        description: description,
                        isCompetition: true,
                        date: new Date(start),
                    }
                })
                await prisma.ctf.create({
                    data: {
                        ctfId: parseInt(ctfId),
                        points: parseFloat(points),
                        placing: placing,
                        link: url,
                        participants: participants,
                        logo: logo,
                        eventId: event.id
                    }
                }
                )
            }
            
        }
        return NextResponse.json({ ctfs });
    }
    catch (error: unknown) {
        console.error("Fetch Error:", error instanceof Error ? error.message : error);
        return NextResponse.json({ error: "Invalid ID provided" }, { status: 400 });
    }
}