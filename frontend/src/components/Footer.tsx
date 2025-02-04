import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
export default function Footer() {
    return (
        <footer className="bg-background text-white bg-secondary-tier3/80 text-xl font-bold py-4">
            <div className="flex gap-8 justify-center">
                <Link href="https://www.instagram.com/singaporestudentsmerger/" className='cursor-pointer hover:brightness-75 transition-all duration-500 flex gap-2 justify-center items-center'>
                    <SocialIcon network="instagram" url="https://www.instagram.com/singaporestudentsmerger/" />
                        @singaporestudentsmerger
                </Link>
                <Link href="https://discord.gg/SWAwuFVQ6M" className='cursor-pointer hover:brightness-75 transition-all duration-500 flex gap-2 justify-center items-center'>
                    <SocialIcon network="discord" url="https://discord.gg/SWAwuFVQ6M" />
                        Recruitment Discord
                </Link>
                <Link href="https://www.linkedin.com/company/ssmctsg/" className='cursor-pointer hover:brightness-75 transition-all duration-500 flex gap-2 justify-center items-center'>
                    <SocialIcon network="linkedin" url="https://www.linkedin.com/company/ssmctsg/" />
                    Singapore Students Merger
                </Link>
            </div>
        </footer>
    )
}