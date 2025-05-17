"use client"
import CTFCategories from '@/components/ctf/CTFCategories';
import { useSection } from './Section';
export default function Categories(){
    const {SectionElement,inView} = useSection();
    return <SectionElement className="flex flex-col px-8 md:px-32 py-16 gap-x-12 gap-y-8">
        <div>
            <h2 className={`text-4xl font-bold order-1 mb-4 text-center text-border-color ${inView?"fade-in-text-border":"remove-text-border"}`}>CTF Categories</h2>
            <p className='text-center'>Hover over any category for more info</p>
        </div>
        <CTFCategories glow = {inView}/>
    </SectionElement>
}
