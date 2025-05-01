import Time from './Time';
import Timeline from './Timeline';
import WriteupAwards from './WriteupSection';
import Link from 'next/link';
import {AboutSection} from './Section';
import WhoCanJoin from './WhoCanJoin'
import Categories from './Categories'
const aboutUs = {
    header: "What is SSMCTF?",
    description: (
        <>
            The Singapore Students Merger Capture the Flag Competition (SSMCTF) is a <b>36 hour beginner-friendly</b> Cybersecurity Capture the Flag (CTF) competition organised by the <b>Singapore Students Merger CTF Team (SSMCT)</b>
        </>
    ),
    imageSrc: "/images/ssmctf.png",
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
    imageSrc: "/images/team.jpg",
    imageAlt: "Looking for a team?",
    reverse: true,
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
    imageSrc: "/images/beginner.jpeg",
    imageAlt: "Just Started?",
    reverse: false,
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    buttonText: "Resources"

}

const organisers = {
    header: "Organisers",
    description: (
        <>
            The <b>organisers</b> and <b>challenge creators</b> behind SSMCTF have created challenges in several CTFs, such as <b>YBNCTF</b> and <b>ISC2CTF</b>.
        </>),
    imageSrc: "/images/organisers.webp",
    imageAlt: "Organisers",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    buttonText: "Learn more about the team",
}


const writeups = {
    header: "Writeups",
    description: (
        <>
            Participants are <b>heavily encouraged</b> to create writeups on challenges they find interesting. Good writeups may also be posted onto the official <Link className='text-blue-500 underline font-bold' href="https://ssmct.org">SSMCT website</Link>
        </>),
    imageSrc: "/images/writeups.png",
    imageAlt: "Writeups",
    reverse: true,
}


const finals = {
    
    header: "Finals",
    description: (
        <>
            The top 10 teams will be invited to the finals of the <b>SSMCTF</b>, where new challenges will be presented for participants to solve. 
        </>),
    imageSrc: "/images/finals.jpg",
    imageAlt: "Finals",
    reverse: true,
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
    </div>
}