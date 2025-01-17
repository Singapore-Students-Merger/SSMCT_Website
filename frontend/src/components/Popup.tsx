"use client"

import { useEffect, useState } from "react";

interface PopupProps {
    children?: React.ReactNode;
    onClose: () => void;
}
const Popup: React.FC<PopupProps> = ({children, onClose}) => {
    const [closed, setClosed] = useState(false);
    const closeHandler = () => {
        setClosed(true);
        setTimeout(() => {
            onClose();
        }, 500);
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])
    return (
        <>
        <div className={`fixed top-0 left-0 w-screen h-screen z-50 animate-duration-500 ${closed ? 'animate-fadeOut opacity-0' : 'animate-fadeIn'}`}>
            <div className="absolute inset-0 bg-black bg-opacity-80 w-screen h-screen top-0 left-0" onClick = {closeHandler}>
                
            </div>
            <div className="absolute w-fit h-fit left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {children}
            </div>
        </div>
        </>
    );
}

export default Popup;