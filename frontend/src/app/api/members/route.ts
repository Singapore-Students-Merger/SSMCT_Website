import { NextResponse } from "next/server";
import { getCachedMembers } from "@/utils/getMembers";


export async function GET(){
    try{
        const members = await getCachedMembers()
        return NextResponse.json(members)
    }
    catch (error){
        if (error instanceof Error)
            console.error(error.message)
        
        return NextResponse.json({error:true})
    }

}