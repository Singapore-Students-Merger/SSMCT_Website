"use client"
import { useEffect, useState } from "react";
import { useSection } from "./Section";
interface TimePanelProps {
    value: string;
    label: string;
    inView?: boolean;
}
function TimePanel({ value, label, inView }: TimePanelProps) {
    return <div className="flex flex-col gap-4 text-center">
        <div className={`text-3xl md:text-4xl font-bold special-border-sm ${inView ? "fade-in-special-border" : "remove-special-border"} bg-transparent py-5 md:py-4`}>{value}</div>
        <div className={`${inView ? "fade-in-text-border" : "remove-text-border"} text-lg md:text-2xl font-semibold text-border-color text-white!`}>{label}</div>
    </div>
}
function getTimeLeft(ctfTime: Date, now: Date) {
    const diff = ctfTime.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString();
    const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString();
    return { days, hours, minutes, seconds };
}
function TimeLeft({ inView }: { inView: boolean }) {
    const ctfTime = new Date(process.env.NEXT_PUBLIC_CTF_TIME as string);
    const now = new Date();
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(ctfTime, now));
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTimeLeft(getTimeLeft(ctfTime, now));
        }
            , 1000);
        return () => clearInterval(interval);
    })
    return <div className="grid grid-cols-4 max-w-full md:max-w-[50vw] gap-4 md:gap-8 mx-auto">
        <TimePanel value={timeLeft.days} label="Days" inView={inView} />
        <TimePanel value={timeLeft.hours} label="Hours" inView={inView} />
        <TimePanel value={timeLeft.minutes} label="Minutes" inView={inView} />
        <TimePanel value={timeLeft.seconds} label="Seconds" inView={inView} />
    </div>
}
export default function Time() {

    const { SectionElement, inView } = useSection();

    return <SectionElement className="flex flex-col px-8 md:px-48 py-16 gap-x-36 gap-y-8">
        <h2 className={`${inView ? "fade-in-text-border" : "remove-text-border"} text-5xl font-extrabold mb-4 text-center text-border-color`}>When?</h2>
        <TimeLeft inView={inView} />
        <div className="flex flex-row items-center justify-center gap-8 md:gap-24 text-center">
            <h3 className="font-bold text-4xl text-center">7th June <br />0900</h3>
            <h3 className="font-bold text-border text-4xl text-center">TO</h3>
            <h3 className="font-bold text-4xl text-center">8th June <br />2100</h3>
        </div>
    </SectionElement>
}