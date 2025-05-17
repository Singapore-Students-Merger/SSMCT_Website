import OrganisersSection from "./OrganisersSection";

const admin = [
    {
        name: "Ashley",
        nickname: "...idk",
        socials: "https://www.linkedin.com/in/ashley-goh-aa7b352a5/",
        image: "/ctf/organisers/ashley.png"
    },
    {
        name: "Ravin",
        nickname: "P3RPL3X",
        socials: "https://www.linkedin.com/in/ravin-nagpal/",
        image: "/ctf/organisers/ravin.png"
    },
    {
        name: "Cane Frued",
        nickname: "dustcovers",
        image: "/ctf/organisers/dustcovers.png",
    },
    {
        name: "David",
        nickname: "Gr0undUp",
        socials:"https://www.linkedin.com/in/chan-si-yu-david/",
        image: "/ctf/organisers/david.png"
    }
]
const author = [
    {
        name: "E-Ket",
        nickname: ".justkitkat",
        socials: "https://www.linkedin.com/in/seaheket/",
        image: "/ctf/organisers/kitkat.png"
    },
    {
        name:"Chen Xiyuan",
        nickname:"kanniwandie",
        socials: "https://www.linkedin.com/in/xi",
        image: "/ctf/organisers/xi.png"
    },
    {
        name: "Gabriel",
        nickname: "duck",
        socials: "https://www.linkedin.com/in/gabriel-kee/",
        image: "/ctf/organisers/duck.png"
    },
    {
        name: "Ng Jun Hao",
        nickname: "mini_ware",
        socials: "https://www.linkedin.com/in/ngjhsg/",
        image: "/ctf/organisers/mini_ware.png"

    },
    {
        name: "Chua Zhong Ding",
        nickname:"Baba",
        socials:"https://www.linkedin.com/in/chua-zhong-ding-94412728b/",
        image: "/ctf/organisers/baba.png"
    }
]

const infra = [
    {
        name: "Chua Zhong Ding",
        nickname:"Baba",
        socials:"https://www.linkedin.com/in/chua-zhong-ding-94412728b/",
        image: "/ctf/organisers/baba.png"
    }
]
export default function OrganisersPage() {
    return (
        <>
        <div className="flex flex-col gap-8 my-16">
            <h1 className={`text-5xl md:text-6xl font-bold text-center text-border`}>
            Our Organisers
          </h1>
        </div>
        <OrganisersSection 
            title="Admin Team"
            organisers={admin}
            />
        <OrganisersSection
            title="Challenge Authors"
            organisers={author}
            />
        <OrganisersSection
            title="Infra & Web Team"
            organisers={infra}
            />
        </>
    )
}