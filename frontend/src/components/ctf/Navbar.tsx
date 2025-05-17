"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname(); 
    // Dynamic styles for active links

    const getLinkClasses = (path: string) =>
        `hover:text-blue-500 px-4 flex items-center transition-colors duration-200 h-full block ${
            pathname === path ? "bg-gray-700/50" : ""
        }`;

    return (
        <nav className="bg-gray-900/80 shadow-md fixed w-full z-50 text-white font-bold top-0">
            <div className="container mx-auto flex justify-between items-center px-4 h-full">
                {/* Logo */}
                <Link href="/" className="hover:brightness-75 transition-all duration-300">
                    <Image src="/logo.png" width={64} height={64} className="w-12 h-12" alt="Logo" />
                </Link>

                {/* Desktop Menu */}
                <div className="flex gap-6 text-xl items-center h-16">
                    <ul className="hidden lg:flex h-full">
                        <li>
                            <Link href="/ctf" className={getLinkClasses("/ctf")}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/ctf/organisers" className={getLinkClasses("/ctf/organisers")}>
                                Organisers
                            </Link>
                        </li>
                        <li>
                            <Link href="/ctf/resources" className={getLinkClasses("/ctf/resources")}>
                                Resources
                            </Link>
                        </li>
                        <li>
                            <Link href="https://tinyurl.com/SSMCTF2025" className={getLinkClasses("/signup")}>
                                Signup
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>

            
        </nav>
    );
}
