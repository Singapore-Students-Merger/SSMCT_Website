"use client"
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
interface Info {
    title: string;
    description: string;
    src: string;
    date: string;
    category: "CTF" | "Bonding";
}

interface GalleryItemProps {
    info: Info;
    className?: string;
    ref?: React.RefObject<HTMLDivElement | null>;
    disableClick?: boolean;
    setSelectedImage: React.Dispatch<React.SetStateAction<Info | null>>;
}

interface GalleryProps {
    data: Info[];
    setSelectedImage: React.Dispatch<React.SetStateAction<Info | null>>;
}
const GalleryItem: React.FC<GalleryItemProps> = ({info, className, ref, setSelectedImage, disableClick=false}) => {
    const clickHandler = () => {
        if (disableClick) return;
        setSelectedImage(info)
    }
    return (
        <div draggable = {false} ref = { ref } className={twMerge(`select-none cursor-pointer relative group aspect-video`,className)} onMouseUp={clickHandler}>
            <Image
                width = {500}
                height = {300}
                src={info.src}
                alt={info.description}
                draggable = {false}
                className="select-none h-full w-full object-cover rounded-lg shadow-md transition duration-300 group-hover:blur-sm"
            />  
            <div className={`px-4 absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center opacity-0 transition duration-300 group-hover:opacity-100 rounded-lg`}>
                <h3 className="text-white font-bold text-lg shrink-0 mt-3">{info.title}</h3>
                <p className="text-sm mb-1 shrink-0">{info.date}</p>
                <p className="text-white grow mt-4">{info.description}</p>
            </div>
        </div>
    );
}

const Gallery: React.FC<GalleryProps> = ({data, setSelectedImage}) => {
    return (
        <div className='px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data.map((info, idx) => <GalleryItem key={idx} info = {info} setSelectedImage = {setSelectedImage}/>)}
        </div>
    );
}

export type { Info }
export { GalleryItem, Gallery };