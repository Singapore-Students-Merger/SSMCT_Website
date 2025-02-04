"use client"
import { twMerge } from "tailwind-merge";
import JoinLogo from "./logos/JoinLogo";
import Image from 'next/image';
import Logo from "./logos/SSMLogo";
import Button from "./Button";
import Link from "next/link";
import { useState, useEffect } from "react";
interface HeroProps {
    className?: string;
    bgImage: string;
    bgImageMobile?: string;
    title: string;
}

const Hero: React.FC<HeroProps> = ({ className, bgImage, title, bgImageMobile }) => {
    const [isPortrait, setIsPortrait] = useState(false);
    useEffect(() => {
        const updateOrientation = () => {
            setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
        };

        updateOrientation(); // Check initial state
        window.addEventListener('resize', updateOrientation);

        return () => {
            window.removeEventListener('resize', updateOrientation);
        };
    }, []);

    return (
        <div className={twMerge('w-full h-screen bg-center bg-cover bg-no-repeat',className)}>
            <div className="absolute w-full h-full -z-10">
                { isPortrait && bgImageMobile && <Image width = {720} height = {1280} src={bgImageMobile} alt="background" className="animate-bgFade opacity-30 absolute top-0 left-0 w-full h-full object-cover"/>}
                { (!isPortrait || !bgImageMobile) && <Image width = {1920} height = {1080} src={bgImage} alt="background" className="animate-bgFade opacity-30 absolute top-0 left-0 w-full h-full object-cover"/>}
                <div className="absolute bg-gradient-to-t from-background w-full h-full top-0 left-0 animate-fadeIn"></div>
            </div>
            <div className="flex flex-col items-center justify-center h-full pb-20 gap-10">
                <Logo className="animate-fadeIn-top animate-delay-200 w-60 md:w-72 "/>
                <div className="flex items-center flex-col gap-6">
                    <div className = "flex justify-center relative animate-fadeIn-bottom animate-delay-200">
                        <p className="w-full animate-delay-1500 animate-title-br text-4xl font-bold text-center absolute left-1/2 -translate-x-1/2 mx-1 my-0.5 text-[#FF1818] ">{title}</p>
                        <p className="animate-delay-1500 animate-title-tl text-4xl font-bold text-center w-full absolute left-1/2 -translate-x-1/2 -mx-1 -my-0.5 text-transparent [text-fill-color:transparent] [-webkit-text-stroke:1px_#00FEFC;] ">{title}</p>
                        <h1 className="z-10 text-white text-4xl font-bold text-center w-full">{title}</h1>
                    </div>
                    <Link href="https://discord.gg/SWAwuFVQ6M">
                        <Button beforeIcon = {
                            <JoinLogo fill = "#BAEAFF"/>
                        } version="primary" className="text-2xl w-64 animate-fadeIn-bottom animate-delay-1500">Join Us
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;