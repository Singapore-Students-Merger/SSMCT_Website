"use client"
import {useSection} from "./Section"
export default function WhoCanJoin(){
    const {SectionElement,inView} = useSection();
    return (
        <SectionElement className="grid grid-cols-1 md:grid-cols-2 px-8 md:px-32 gap-x-48 gap-y-16">
            <div className='col-span-1 md:col-span-2 w-full md:w-1/2 mx-auto flex flex-col items-center gap-y-4'>
                <h2 className={`${inView?"fade-in-text-border":"remove-text-border"} text-4xl font-bold text-center text-border-color`}>Who can participate?</h2>
                <p className='text-center text-lg'>
                    Anyone can participate in <b>groups of up to 4</b>, with <b>2 distinct categories</b>.
                    Only Singaporean teams will be elligible for prizes.
                </p>
            </div>
                <div className='col-span-1 md:col-span-2 grid grid-cols-2 items-center gap-y-8'>
                <div className='col-span-1 flex flex-col items-center gap-y-4'>
                    <h3 className='text-4xl font-bold text-left md:text-center w-full header-border'>
                        Pre-U
                    </h3>
                    <p className='text-lg text-left md:text-center'>
                        Open exclusively to students from Junior Colleges, Polytechnics, Secondary Schools, and below.
                    </p>
                </div>
                <div className='col-span-1 flex flex-col items-center gap-y-4'>
                    <h3 className='text-4xl font-bold w-full text-right md:text-center header-border'>
                        Open
                    </h3>
                    <p className='text-lg text-right md:text-center'>
                        Welcoming participants of all ages and experience levels.
                    </p>
                </div>
            </div>
        </SectionElement>
    );
}
