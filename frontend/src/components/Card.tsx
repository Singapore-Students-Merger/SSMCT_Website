import Image from 'next/image';

interface CardProps {
    info: {
        thumbnail?: string;
        category: string;
        title: string;
        description: string;
        date: string;
    }
}

export function Card({info: {thumbnail, category, title, description, date}}: CardProps) {
    return (
        <div className="flex flex-col w-full  rounded-lg shadow-[0_0_5px_1px_#5BC2D9] overflow-hidden border-2 border-black">
            <div className="h-48 w-full relative bg-secondary3">
                <Image src={thumbnail??'/assets/record.png'} objectFit="cover" alt={title} className="object-cover" fill = {true}/>
            </div>
            <div className="p-4">
                <div className='flex justify-between'>
                <p className="text-sm text-primary">{category}</p>
                <p className="text-sm text-primary">{date}</p>
                </div>
                
                <h3 className="text-lg font-bold mt-1 text-white">{title}</h3>
                <p className="text-md mt-2 text-white">{description}</p>
            </div>
        </div>
    );

}