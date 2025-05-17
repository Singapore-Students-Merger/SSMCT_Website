import Time from './Time';
import Timeline from './Timeline';
import WriteupAwards from './WriteupSection';
import Link from 'next/link';
import {AboutSection} from './Section';
import WhoCanJoin from './WhoCanJoin'
import Categories from './Categories'
import Image from 'next/image';
const aboutUs = {
    header: "What is SSMCTF?",
    description: (
        <>
            The Singapore Students Merger Capture the Flag Competition (SSMCTF) is a <b>36 hour beginner-friendly</b> Online Cybersecurity Capture the Flag (CTF) competition organised by the <b>Singapore Students Merger CTF Team (SSMCT)</b>
        </>
    ),
    imageSrc: "/ctf/images/ssmctf.png",
    imageAlt: "About SSMCTF",
    reverse: false,
    buttonText: "Learn More about SSMCT",
    href: "https://ssmct.org",
}

const lookingForATeam = {
    header: "Looking for a team?",
    description: <>
        Join our <b>Discord server</b> using the link below! We provide a <b>supportive environment</b> to help you connect with teammates and form your ideal squad.
    </>,
    imageSrc: "/ctf/images/team.jpg",
    imageAlt: "Looking for a team?",
    reverse: true,
    href: "https://discord.gg/p5HgEmp7A6",
    buttonText: "Join our Discord",
}
const justStarted = {
    header: "Beginner-friendly CTF",
    description: (
        <>SSMCTF is designed to be <b>beginner-friendly</b> while still offering <b>challenging</b> puzzles for seasoned CTF players.
            <br />
            <br />
            New to CTF or looking to improve? Check out our Resources!
        </>),
    imageSrc: "/ctf/images/beginner.jpeg",
    imageAlt: "Just Started?",
    reverse: false,
    href: "/ctf/resources",
    buttonText: "Resources"

}

const organisers = {
    header: "Organisers",
    description: (
        <>
            The <b>organisers</b> and <b>challenge creators</b> behind SSMCTF have created challenges in several CTFs, such as <b>YBNCTF</b> and <b>ISC2CTF</b>.
        </>),
    imageSrc: "/ctf/images/organisers.webp",
    imageAlt: "Organisers",
    href: "/ctf/organisers",
    buttonText: "Learn more about the team",
}


const writeups = {
    header: "Writeups",
    description: (
        <>
            Participants are <b>heavily encouraged</b> to create writeups on challenges they find interesting. Good writeups may also be posted onto the official <Link className='text-blue-500 underline font-bold' href="https://ssmct.org/writeups">SSMCT website</Link>
        </>),
    imageSrc: "/ctf/images/writeups.png",
    imageAlt: "Writeups",
    reverse: true,
}


const finals = {
    
    header: "Finals",
    description: (
        <>
            The top 10 teams will be invited to the finals of the <b>SSMCTF</b>, where new challenges will be presented for participants to solve. All finalist will receive SSM Stickers and Event Swag!
        </>),
    imageSrc: "/ctf/images/finals.jpg",
    imageAlt: "Finals",
    reverse: true,
}

function SponsorSection() {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-border-color mb-8">
                Sponsors
            </h2>
            <div className="flex flex-row items-center justify-center gap-8 my-4 flex-wrap hover:brightness-75 transition-all duration-300 hover:bg-gray-800 p-8 rounded-xl">
                <Link href="https://www.cybercohesions.com" target="_blank">
                    <Image src="/ctf/logos/cyber_cohesion.jpeg" alt="Cyber Cohesion" width={300} height={300} className="w-48 h-48 border-white border-2 rounded-full" />
                </Link>
            </div>
        </div>
    )
}
export default function AboutPage() {
    return <div className='flex flex-col gap-y-4 py-0 w-full'>
        <AboutSection {...aboutUs} />
        <WhoCanJoin />
        <AboutSection {...lookingForATeam} />
        <AboutSection {...justStarted} />
        <Categories />
        <Time />
        <Timeline />
        <AboutSection {...finals} />
        <AboutSection {...organisers} />
        <WriteupAwards />
        <AboutSection {...writeups} />
        <SponsorSection />
    </div>
}