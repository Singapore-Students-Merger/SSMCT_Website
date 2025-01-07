"use client"
import { useState } from "react";
import { twMerge } from "tailwind-merge";
interface SelectChipProps {
    className?: string;
    children?: React.ReactNode;
    beforeIcon?: React.ReactNode;
    afterIcon?: React.ReactNode;
    onClick?: () => void;
    beforeIconClickHandler?: () => void;
    afterIconClickHandler?: () => void;
    selected?: boolean;
}

const SelectChip: React.FC<SelectChipProps> = ({ selected, className, children, beforeIcon, afterIcon, onClick, beforeIconClickHandler, afterIconClickHandler }) => {
    const [isSelected, setIsSelected] = useState(selected);
    const clickHandler = () => {
        if (onClick) {
            onClick();
        }
        setIsSelected((prev) => !prev);
    }
    
    return (
        <div onClick={clickHandler} className={twMerge(`bg-tertiary text-primary w-fit text-lg px-4 py-2 rounded-full cursor-pointer hover:brightness-50 transition-[filter] duration-200`
        ,isSelected?`brightness-75 outline-primary outline-2 outline`:`brightness-100`,className)}>
            {beforeIcon && <div onClick={beforeIconClickHandler}>{beforeIcon}</div>}
            <div>{children}</div>
            {afterIcon && <div onClick={afterIconClickHandler}>{afterIcon}</div>}
        </div>
    );
}

export default SelectChip;