import Image from "next/image"
import Link from "next/link"
interface Organiser {
    name: string
    nickname: string
    image: string
    socials?: string
}
interface OrganisersSectionProps {
    title: string
    organisers: Organiser[]
}

function OrganiserCard({ name, nickname, image, socials }: Organiser) {
    const content = (
        <div className="flex flex-col items-center justify-center py-8 ">
            <div className="rounded-full w-48 h-48 border-4 border-white relative overflow-clip shadow-red-600 shadow-md">
                <div className="absolute bg-gradient-to-b from-0% to-60% from-[#006FFF]/50 to-transparent w-full h-full">

                </div>
                <div className="absolute bg-gradient-to-t from-0% to-60% from-[#E4432F]/50 to-transparent w-full h-full">

                </div>
                <Image
                    src={image}
                    alt={name}
                    fill={true}
                    sizes="100%"
                    className="rounded-full object-cover drop-shadow-blue-600 drop-shadow-lg"
                    />
            </div>
            <h3 className="text-xl font-bold text-center mt-4">{name}</h3>
            <p className="text-lg text-center">{nickname}</p>
        </div>
    )
    return socials ? (
            <Link href={socials} target="_blank" className="flex flex-col items-center justify-center hover:brightness-75 hover:bg-neutral-800 transition-all duration-300">
                {content}
            </Link>
        ): content
    
}
export default function OrganisersSection({ title, organisers }: OrganisersSectionProps) {
    const sortedOrganisers = [...organisers].sort((a, b) => {
        if (a.socials && !b.socials) return -1
        if (!a.socials && b.socials) return 1
        return a.name.localeCompare(b.name)
    })
    return (
        <section>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-border-color my-16">
                {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 px-8 md:px-32">
                {sortedOrganisers.map((organiser, index) => (
                    <OrganiserCard
                        key={index}
                        name={organiser.name}
                        nickname={organiser.nickname}
                        image={organiser.image}
                        socials={organiser.socials}
                    />
                ))}
            </div>
        </section>
    )
}