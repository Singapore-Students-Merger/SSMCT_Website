import Image from 'next/image';
import Link from 'next/link';
interface CardProps {
    info: {
        link: string;
        thumbnail?: string;
        category: string;
        title: string;
        description: string;
        date: string;
        author: string;
        difficulty: string;
        event: string;
    }
}

export function Card({info: {link, thumbnail, category, title, description, date, author, difficulty, event}}: CardProps) {
    return (
        <Link href={link}>
        <div className="flex flex-col w-full  rounded-lg shadow-[0_0_5px_1px_#5BC2D9] overflow-hidden border-2 border-black hover:brightness-125 backdrop:brightness-125 transition duration-200">
            <div className="h-48 w-full relative bg-secondary3">
                <Image src={thumbnail??'/assets/record.png'} objectFit="cover" alt={title} className="object-cover" fill = {true}/>
            </div>
            <div className="p-4">
                <div className='flex justify-between'>
                <p className="text-md text-primary font-bold">{author}</p>
                <p className="text-md text-primary">{date}</p>
                </div>
                <div className='flex justify-between'>
                <p className="text-md text-accent1">{event}</p>
                <p className="text-md text-accent1">{category}({difficulty})</p>
                </div>
                <h3 className="text-xl font-bold mt-1 text-white">{title}</h3>
                <p className="text-lg mt-2 text-white">{description}</p>
            </div>
        </div>
        </Link>
    );

}