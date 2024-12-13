import Button from "@/components/Button";
import GradientBg from "@/components/GradientBg";
import DiscordLogo from "@/components/logos/DiscordLogo";
import Logo from "@/components/logos/SSMLogo";
export default function Login() {
    return (
        <>
            <GradientBg gradientPosition="center" className="h-screen flex items-center flex-col gap-8 justify-center pb-20">
                <Logo className="w-64 h-64"/>
                <h1 className="text-white font-bold text-5xl">Login</h1>
                <Button version="secondary"
                className="w-96 rounded-lg max-w-[90vw]"
                shadow={false}
                beforeIcon = {
                    <DiscordLogo
                    fill = "#BAEAFF"
                    className="w-8 h-8"/>
                }
                >Login with Discord</Button>
            </GradientBg>
        </>
    )

}