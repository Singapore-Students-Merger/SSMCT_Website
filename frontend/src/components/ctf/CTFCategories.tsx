"use client"
import {useState} from 'react';
import Image from 'next/image';
interface Category {
  name: string;
  description: string;
  image: string;
  link?: string;
}

const categories: Category[] = [
    {
        name:"Web",
        description:"Web-based challenges that test your understanding of web technologies.",
        image:"/ctf/logos/web.png",
        link:"/categories/web"
    },
    {
        name:"Pwn",
        description:"Binary exploitation challenges that test your understanding of low-level programming.",
        image:"/ctf/logos/pwn.png",
        link:"/categories/pwn"
    },
    {
        name:"Rev",
        description:"Reverse engineering challenges that test your understanding of compiled code.",
        image:"/ctf/logos/rev.png",
        link:"/categories/re"
    },
    {
        name:"Crypto",
        description:"Cryptography challenges that test your understanding of encryption and decryption.",
        image:"/ctf/logos/crypto.png",
        link:"/categories/crypto"
    },
    {
        name: "Forens",
        description: "Forensics challenges that test your understanding of digital forensics.",
        image: "/ctf/logos/forens.png",
        link: "/categories/forens"
    },
    {
        name: "Programming",
        description: "Programming challenges that test your understanding of algorithms and data structures.",
        image: "/ctf/logos/programming.png",
        link: "/categories/prog"
    },

    {
        name: "OSINT",
        description: "Open Source Intelligence challenges that test your understanding of information gathering.",
        image: "/ctf/logos/osint.png",
        link: "/categories/osint"
    },
    {
        name: "Misc",
        description: "Miscellaneous challenges that test your understanding of various topics, like AI.",
        image: "/ctf/logos/misc.png",
        link: "/categories/misc"
    }
]
const CategoryItem = ({ category, glow }: { category: Category, glow: boolean }) => {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked((clicked) => !clicked);
    };
    return <div onClick = {handleClick}
                className={`flex flex-col items-center gap-y-4 group 
                hover hover:backdrop-brightness-200 ${clicked?"backdrop-brightness-200":""} 
                py-4 px-4 transition-all duration-150 rounded-xl`}>
        <div className={`relative flex justify-center items-center special-border-sm border-2! aspect-square w-40 rounded-xl ${glow?"fade-in-special-border":"remove-special-border"}`}>
        <Image src={category.image} alt={category.name} fill={true} className='rounded-xl' />
            <div className={`text-sm md:text-md rounded-md text-center 
            ${clicked?"opacity-100":""}
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 
            flex absolute top-1/2 left-0 -translate-y-1/2 w-full bg-black/50 h-full 
            justify-center items-center backdrop-blur-sm `}>
                <p className='w-full h-full py-4 px-2 overflow-auto'>
                    {category.description}

                </p>
            </div>
        </div>
        <h3 className='text-2xl md:text-3xl font-bold text-center'>
            {category.name}
        </h3>
        
    </div>
}

const CTFCategories = ({glow}:{glow:boolean}) => {
    return <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 md:gap-y-16 gap-x-4 md:gap-x-8 justify-around">
        {categories.map((category, index) => (
            <CategoryItem key={index} category={category} glow = {glow} />
        ))}
    </section>
}

export default CTFCategories;