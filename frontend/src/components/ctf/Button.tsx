import Link from "next/link";
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {   
    animate?: boolean;
    href: string; // URL to navigate to
}
export default function Button({ children, className, animate, href }: ButtonProps) {
    return (
        <Link href={href} className="contents">
        <button className={`color-changing w-fit text-2xl bg-black text-white 
            font-bold py-3 px-12 rounded ${className} ${animate? "color-changing-animation":""}
            hover:bg-gray-800 cursor-pointer transition-colors duration-300`} 
        >
            {children}
        </button>
        </Link>
    );
}