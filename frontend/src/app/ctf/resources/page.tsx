import Button from "@/components/ctf/Button";
import CTFCategories from "@/components/ctf/CTFCategories";
import Link from "next/link";
const resources = [
    {
        "category":"Web",
        resources: [
            {
                name: "HackTricks - Web Pentesting",
                link: "https://book.hacktricks.xyz/pentesting-web/web-vulnerabilities-methodology"
            },
            {
                name: "CTF101 - Web Exploitation",
                link: "https://ctf101.org/web-exploitation/overview/"
            },
            {
                name:"PortSwigger - Web Security Academy",
                link:"https://portswigger.net/web-security/all-topics"
            }
        ]
    },
    {
        "category":"Crypto",
        resources: [
            {
                name: "CryptoPals",
                link: "https://cryptopals.com/"
            },
            {
                name: "CTF101 - Crypto",
                link: "https://ctf101.org/crypto/overview/"
            },
            {
                name:"Cryptography Stack Exchange",
                link:"https://crypto.stackexchange.com/"
            },
            {
                name: "CryptoHack",
                link: "https://cryptohack.org/"
            }
        ]
    },
    {
        "category":"Pwn",
        resources: [
            {
                name: "Pwnable.kr",
                link: "http://pwnable.kr/"
            },
            {
                name: "Pwnable.tw",
                link: "http://pwnable.tw/"
            },
            {
                name:"Pwn.college",
                link:"https://pwn.college/"
            }
        ]
    },
    {
        "category":"Reversing",
        resources: [
            {
                name: "CrackMes",
                link: "https://crackmes.one/"
            },
            {
                name: "Reversing.kr",
                link: "https://reversing.kr/"
            },
            {
                name: "Begin Re",
                link: "https://www.begin.re/"
            },
            {
                name: "Awesome Reverse Engineering",
                link:"https://github.com/ReversingID/Awesome-Reversing"
            }
        ]
    },
    {
        "category": "Forensics",
        resources: [
            {
                name: "CTF101 - Forensics",
                link: "https://ctf101.org/forensics/overview/"
            },
            {
                name: "Forensics Wiki",
                link: "https://forensics.wiki/"
            },
            {
                name: "CTF Field Guide",
                link: "https://trailofbits.github.io/ctf/forensics/"
            }
        ]
    },
    {
        category:"Programming",
        resources: [
            {
                name: "CTF101 - Programming",
                link: "https://ctf101.org/programming/overview/"
            },
            {
                name: "Leetcode",
                link: "https://leetcode.com/"
            },
            {
                name: "Codewars",
                link: "https://www.codewars.com/"
            }
        ]
    },
    {
        category: "Osint",
        resources: [
            {
                name: "OSINT Framework",
                link: "https://osintframework.com/"
            },
            {
                name: "OSINT Dojo",
                link: "https://osintdojo.com/"
            },
            {
                name: "OSINT Wiki",
                link: "https://osint.wiki/"
            },
        ]
    },
    {
        category: "Misc",
        resources: [
            {
                name: "Misc CTF Guide",
                link: "https://ctfs.github.io/resources/topics/miscellaneous/README.html"
            },
            {
                name: "CTF Wiki",
                link: "https://ctf-wiki.mahaloz.re/misc/introduction/"
            },
            {
                name: "Exploring The World of AI Security through ML Challenges",
                link:"https://medium.com/@nikhil-1e9/unveiling-the-world-of-ai-security-my-ctf-journey-815b531240c7"
            }
        ]
    }
]
function ResourceSection({category, resources}: {category: string, resources: {name: string, link: string}[]}) {
    return (
        <div className="flex flex-col items-start justify-start py-2 border-2 p-8 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-border my-8">
                {category}
            </h2>
            <div className="flex flex-col items-start justify-start gap-2 mb-4">
                {resources.map((resource, index) => (
                    <Link key={index} href={resource.link} target="_blank" className="text-lg text-blue-400 hover:underline">
                        {resource.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default function ResourcesPage() {
    return (
        <div className="px-32">

            <section className="flex flex-col items-center justify-center py-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-border-color my-8">
                    General CTF Challenges & Writeups
                </h2>
                <div className="flex flex-row items-center justify-center gap-8 mb-4 flex-wrap">
                <Button href ="/ctf/resources/sample-ctf" target="_blank">
                    SSMCT Writeups
                </Button>
                <Button href ="https://ctftime.org/writeups" target="_blank">
                    Writeups on CTFtime
                </Button>
                <Button href ="https://github.com/ISC2SG-YW/ISC2CTF-Public" target="_blank">
                    ISC2CTF Chall Repo
                </Button>
                <Button href = "https://picoctf.com/" target="_blank">
                    PicoCTF Challenges
                </Button>
                </div>
            </section>
                
            <section className="flex flex-col items-center justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-border-color mb-8">
                    Category Resources
                </h2>
            <CTFCategories glow={true}/>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 px-8 py-12">
            {resources.map((resource, index) => (
                <ResourceSection
                    key={index}
                    category={resource.category}
                    resources={resource.resources}
                />
            ))}
            </div>
        </div>
    )
}