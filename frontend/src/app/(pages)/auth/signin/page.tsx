"use client"
import Button from "@/components/Button";
import { signIn } from "next-auth/react"
import GradientBg from "@/components/GradientBg";
import DiscordLogo from "@/components/logos/DiscordLogo";
import Logo from "@/components/logos/SSMLogo";
import { useSearchParams } from "next/navigation";
export default function Login() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    return (
        <>
            <GradientBg gradientPosition="center" className="h-screen flex items-center flex-col gap-8 justify-center pb-20">
                <Logo className="w-64 h-64"/>
                <h1 className="text-white font-bold text-5xl">Login</h1>
                <div className = "flex gap-4 items-center flex-col">
                <Button version="secondary"
                className="w-96 rounded-lg max-w-[90vw]"
                shadow={false}
                beforeIcon = {
                    <DiscordLogo
                    fill = "#BAEAFF"
                    className="w-8 h-8"/>
                }
                onClick={() => signIn("discord")}
                >Login with Discord</Button>
                {error && <p className="text-red-500 font-bold">{error}</p>}
                </div>
            </GradientBg>
        </>
    )

}