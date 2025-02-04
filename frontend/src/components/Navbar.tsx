"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); 
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);
    // Dynamic styles for active links
    const getLinkMenuClasses = (path: string) =>
        `transition-all duration-200 py-4 px-8 block w-full text-right text-xl hover:brightness-75 hover:backdrop-brightness-75 ${
            pathname === path ? "bg-secondary-tier2/50" : ""
        }`;

    const getLinkClasses = (path: string) =>
        `hover:text-blue-500 px-4 flex items-center transition-colors duration-200 h-full block ${
            pathname === path ? "bg-secondary-tier2/50" : ""
        }`;

    return (
        <nav className="bg-secondary-tier3/80 shadow-md fixed w-full z-50 text-white font-bold">
            <div className="container mx-auto flex justify-between items-center px-4 h-full">
                {/* Logo */}
                <Link href="/" className="hover:brightness-75 transition-all duration-300">
                    <Image src="/logo.png" width={64} height={64} className="w-12 h-12" alt="Logo" />
                </Link>

                {/* Desktop Menu */}
                <div className="flex gap-6 text-xl items-center h-16">
                    <ul className="hidden lg:flex h-full">
                        <li>
                            <Link href="/" className={getLinkClasses("/")}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery" className={getLinkClasses("/gallery")}>
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/writeups" className={getLinkClasses("/writeups")}>
                                Writeups
                            </Link>
                        </li>
                        <li>
                            <Link href="/blogs" className={getLinkClasses("/blogs")}>
                                Blogs
                            </Link>
                        </li>
                    </ul>
                    <button className="" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown with Animation */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <ul className="flex flex-col items-start bg-secondary-tier3 shadow-lg font-bold w-full lg:w-1/3 absolute top-full right-0">
                    <div className="contents lg:hidden">
                        <li className="w-full">
                            <Link href="/" className={getLinkMenuClasses("/")}>Home</Link>
                        </li>
                        <li className="w-full">
                            <Link href="/gallery" className={getLinkMenuClasses("/gallery")}>Gallery</Link>
                        </li>
                        <li className="w-full">
                            <Link href="/writeups" className={getLinkMenuClasses("/writeups")}>Writeups</Link>
                        </li>
                        <li className="w-full">
                            <Link href="/blogs" className={getLinkMenuClasses("/blogs")}>Blogs</Link>
                        </li>
                    </div>
                    <li className="w-full">
                        <Link href="/auth/signin" className={getLinkMenuClasses("/auth/login")}>Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
