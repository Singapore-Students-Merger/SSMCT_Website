import Button from "@/components/Button";
import { signIn } from "next-auth/react"
import GradientBg from "@/components/GradientBg";
import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import TextInput from "@/components/TextInput";
export default async function Login() {
    const session = await auth();
    if (!session) {
        redirect("/auth/signin");
    }
    return (
        <>
            <GradientBg gradientPosition="center" className="min-h-screen flex items-center flex-col gap-8 justify-start py-20">
                <h1 className="text-5xl font-bold"> Welcome {session?.user!.name}</h1>
                <p>Before we begin, please tell us more about yourself</p>
                <TextInput placeholder="Real Name (optional)" />
            </GradientBg>
        </>
    )

}