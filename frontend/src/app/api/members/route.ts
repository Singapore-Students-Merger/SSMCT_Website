import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(){
    try{
        const members = await prisma.user.findMany({
            select: {
                name: true,
                realName: true,
                _count:{
                    select:{
                        ctfs:true
                    }
                }
            }
        })
        return NextResponse.json(members)
    }
    catch (error){
        console.error(error.message)
        return NextResponse.json({error:true})
    }

}