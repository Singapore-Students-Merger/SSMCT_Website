"use client"
import { useSection } from "./Section"
interface TimelineItemProps {
    date: string
    title: string
    className?: string
    topBottom?: 'top' | 'bottom'
    delay?: string
}
const TimelineItem = ({
    date,
    title,
    topBottom,
    className,
    delay
}: TimelineItemProps) => {
    return <div className={`flex justify-center items-center w-full col-span-2 relative 
    ${topBottom === "top" ? "timeline-item-top" : "timeline-item-bottom"} 
    ${delay}`}>
        <div className={`skew-x-12 w-full h-fit absolute l-0 flex ${topBottom === 'top' ? 'flex-col-reverse' : 'flex-col'} ${className}`}>
            <div className={`w-full border-l-4 ${topBottom == "bottom" ? "h-40" : "h-32"}`}></div>
            <div className="border-4 border-w w-full h-fit grow-0
                                flex flex-col items-center px-2 py-4
                                ">

                <h3 className="text-2xl font-bold text-center text-border">{date}</h3>
                <h4 className="text-2xl font-bold text-center">{title}</h4>
            </div>

        </div>
    </div>
}

const TimelineItemMobile = ({
    date,
    title,
    className,
    delay
}: TimelineItemProps) => {
    return (
        <div className={`flex ${className} ${delay} w-[90vw] timeline-item-mobile`}>
            <div className="border-t-4 border-white w-auto grow-1 skew-x-12">

            </div>
            <div className="skew-x-12 border-4 border-white px-4 py-4 w-9/12">
                <h3 className="text-2xl font-bold text-center text-border">{date}</h3>
                <h4 className="text-2xl font-bold text-center">{title}</h4>
            </div>
        </div>

    )
}

const events = [
    {
        date: "13th June 2025 (2359)",
        title: "SSMCTF 2025 Registration Closes",
        delay: "animation-delay-200!"
    },
    {
        date: "14th June 2025 (0900)",
        title: "Online Qualifying Competition Starts",
        delay: "animation-delay-300!"
    },
    {
        date: "15th June 2025 (2100)",
        title: "Online Qualifying Competition Ends",
        delay: "animation-delay-400!"
    },
    {
        date: "21st June 2025",
        title: "Physical Finals Competition",
        delay: "animation-delay-500!"
    },
    {
        date: "30th June 2025 (2359)",
        title: "Writeup Submission Deadline",
        delay: "animation-delay-600!"
    },
]
const Timeline = () => {
    const { SectionElement, inView } = useSection()
    
    return <SectionElement className='h-fit lg:py-48 md:py-52 w-full flex items-center justify-start'>
        <div className="md:hidden flex flex-col timeline-mobile w-1/10 gap-y-8 py-8 glow">
            <div className="timeline-decor-mobile absolute w-full h-full left-0 top-0 py-8">

            </div>
            <TimelineItemMobile
                date={events[0].date}
                title={events[0].title}
                delay="animation-delay-200!"
            />
            <TimelineItemMobile
                date={events[1].date}
                title={events[1].title}
                 delay="animation-delay-300!"
            />
            <TimelineItemMobile
                date={events[2].date}
                title={events[2].title}
                delay="animation-delay-400!"
            />
            <TimelineItemMobile
                date={events[3].date}
                title={events[3].title}
                delay="animation-delay-500!"
            />
            <TimelineItemMobile
                date={events[4].date}
                title={events[4].title}
                delay="animation-delay-600!"
            />

        </div>
        {/* PC timeline */}
        <div className={`${inView ? "timeline" : "opacity-0"} hidden w-full md:block overflow-x-clip h-full`}>
            <div className="h-[20vh] relative w-screen glow">
                <div className="timeline-top grid grid-cols-8 px-12">
                    <div className="triangle-decor-top">

                    </div>
                    <div></div>
                    <TimelineItem
                        date={events[1].date}
                        title={events[1].title}
                        topBottom="top"
                        className="bottom-0"
                        delay="animation-delay-1250! animation-duration-2750!"
                    />
                    <div></div>
                    <TimelineItem
                        date={events[3].date}
                        title={events[3].title}
                        topBottom="top"
                        className="bottom-8"
                        delay="animation-delay-1750! animation-duration-2250!"
                    />
                </div>
                <div className="timeline-bottom grid grid-cols-8 px-12">
                    <div className="triangle-decor-bottom">
                    </div>
                    <TimelineItem
                        date={events[0].date}
                        title={events[0].title}
                        topBottom="bottom"
                        className="top-8"
                        delay="animation-delay-1000! animation-duration-3000!"
                    />
                    <div></div>
                    <TimelineItem
                        date={events[2].date}
                        title={events[2].title}
                        topBottom="bottom"
                        className="top-4"
                        delay="animation-delay-1500! animation-duration-2500!"
                    />
                    <div></div>
                    <TimelineItem
                        date={events[4].date}
                        title={events[4].title}
                        topBottom="bottom"
                        className="-top-10"
                        delay="animation-delay-2000! animation-duration-2000!"
                    />
                </div>
            </div>
        </div>
    </SectionElement>
}
export default Timeline