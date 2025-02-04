import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
export default function Footer() {
    return (
        <footer className="bg-background text-white bg-secondary-tier3/80 text-xl font-bold py-4 w-full">
            <div className="flex gap-8 justify-start md:justify-center w-full flex-wrap px-4">
                <Link target ="_blank" href="https://www.instagram.com/singaporestudentsmerger/" className='cursor-pointer hover:brightness-75 transition-all duration-500 flex gap-2 justify-center items-center'>
                    <SocialIcon as="div" network="instagram" url="https://www.instagram.com/singaporestudentsmerger/" />
                        @singaporestudentsmerger
                </Link>
                <Link target ="_blank" href="https://discord.gg/SWAwuFVQ6M" className='cursor-pointer hover:brightness-75 transition-all duration-500 flex gap-2 justify-center items-center'>
                    <SocialIcon as="div" network="discord" url="https://discord.gg/SWAwuFVQ6M" />
                        Recruitment Discord
                </Link>
                <Link target ="_blank" href="https://www.linkedin.com/company/ssmctsg/" className='cursor-pointer hover:brightness-75 transition-all duration-500 flex gap-2 justify-center items-center'>
                    <SocialIcon as="div" network="linkedin" url="https://www.linkedin.com/company/ssmctsg/" />
                    Singapore Students Merger
                </Link>
            </div>
        </footer>
    )
}