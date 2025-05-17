"use client"
import { useSection } from './Section';

export default function WriteupAwards() {
    const { SectionElement, inView } = useSection();
    return (
        <SectionElement className='px-8 md:px-32'>
            <h2 className={`text-4xl font-bold order-1 mb-4 text-center text-border-color ${inView?"fade-in-text-border":"remove-text-border"}`}>CTF Prizes</h2>
            <p className="text-center">Take note that only teams with <b>full Singaporean members</b> are elligible for prizes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-36 gap-y-12 mt-16">
                <div className="md:col-span-2 flex flex-col justify-center items-center h-full gap-4">
                    <h3 className={`text-4xl font-bold first-place ${inView?"fade-in-text-border":"remove-text-border"}`}>1st Place</h3>
                    <p className="text-4xl font-bold header-border text-center ">300$ Cash Prize</p>
                </div> 
                <div className="flex flex-col justify-center items-center h-full gap-4">
                    <h3 className={`text-4xl font-bold second-place text-center ${inView?"fade-in-text-border":"remove-text-border"}`}>2nd Place</h3>
                    <p className="text-4xl font-bold header-border text-center ">200$ Cash Prize</p>
                </div >
                <div className="flex flex-col justify-center items-center h-full gap-4">
                    <h3 className={`text-4xl font-bold third-place text-center ${inView?"fade-in-text-border":"remove-text-border"}`}>3rd Place</h3>
                    <p className="text-4xl font-bold header-border text-center ">100$ Cash Prize</p>
                </div>
            </div>
        </SectionElement>
    )
}